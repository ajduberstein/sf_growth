from __future__ import print_function

import csv
from datetime import datetime
import os
import re

import geopandas as gpd
from geopandas.tools import sjoin
import numpy as np
import pandas as pd
from pandasql import sqldf
from shapely.geometry import Point
import usaddress

dirname = os.path.dirname(os.path.abspath(__file__))

LAT_REGEX = '37\.\d{1,}'
LNG_REGEX = '-122\.\d{1,}'


ORDINALS = ['1ST', '2ND', '3RD'] + [str(x) + 'TH' for x in range(4, 10)]

pd.set_option('display.max_columns', 10)
filepath = '../public/data/neighborhoods.geojson'
neighborhoods_geom = gpd.read_file(filepath)
neighborhoods_geom = neighborhoods_geom.set_geometry('geometry')
A = csv.DictReader(open('Registered_Business_Locations_-_San_Francisco.csv', 'r'))
A = pd.DataFrame([r for r in A])


def get_age_in_years(row):
    """Get year a business establishment has been open
    return null if closed
    """
    if float(row['closed']) == 0:
        return 2018 - float(row['start_date'])
    else:
        return np.nan


def _extract_gpd_field_at_idx(gdf, field, idx):
    poly = gdf.iloc[[idx]]
    return [x[1][field] for x in poly.iterrows()][0]


def get_neighborhood(locations, neighborhoods_geom):
    points = gpd.GeoDataFrame()
    points['geom'] = locations.apply(
        lambda x: Point(x['lng'], x['lat']), axis=1)
    points = points.set_geometry('geom')
    result = sjoin(points, neighborhoods_geom, how='left')
    return result['Name']


def clean_address(x):
    """Standardizes address input
    This allows for a join to the City of SF's address data

    Params:
        x (str): Address to re-format
    Returns:
        str: Address in a standardized format
    """
    try:
        tagged = usaddress.tag(x)
        tagged[0]['AddressNumber']
    except Exception:
        return ''
    if tagged[1] == 'Ambiguous':
        return ''
    tagged = tagged[0]
    an = tagged['AddressNumber']
    if an and an == 'one':
        an = '1'
    if '-' in an:
        an = an.split('-')[0]
    sn = tagged.get('StreetName')
    if sn in ORDINALS:
        sn = '0' + sn
    snpot = tagged.get('StreetNamePostType')
    if snpot:
        if snpot == 'STREET':
            snpot = 'ST'
        elif snpot == 'AVENUE':
            snpot = 'AVE'
        elif snpot == 'BOULEVARD':
            snpot = 'BLVD'
    snpt = tagged.get('StreetNamePreType')
    if snpot:
        return '{} {} {}'.format(an, sn, snpot)
    return '{} {} {}'.format(an, snpt, sn)


assert clean_address('101 1ST STREET APT 4') == '101 01ST ST'
assert clean_address('101 1ST STREET #4') == '101 01ST ST'
assert clean_address('101 AVENUE Q #4') == '101 AVENUE Q'
assert clean_address('101-103 AVENUE Q #4') == '101 AVENUE Q'
assert clean_address('PIER 70') == ''


# Valid SF postal codes as given by Google
SF_ZIPS = ('94151 94159 94158 '
           '94102 94104 94103 '
           '94105 94188 94108 '
           '94177 94107 94110 '
           '94109 94112 94111 '
           '94115 94114 94117 '
           '94116 94118 94121 '
           '94123 94122 94124 '
           '94127 94126 94129 '
           '94131 94133 94132 '
           '94134 94139 94143').split()


def safe_get(lst, idx):
    """Get an item at an index, return null if exception"""
    try:
        return lst[idx]
    except Exception:
        return ''


def extract(x, regex):
    try:
        re_match = re.search(regex, x).group(0)
        return re_match
    except Exception:
        return 0


def recode_date(x):
    """Recodes date to a standardized ISO8601 format. All dates before 1969 are
            re-classified to 1968
    """
    datestr = ''
    try:
        datestr = datetime.strptime(str(x), '%m/%d/%Y').strftime('%Y')
    except ValueError:
        return '1968'
    return '1968' if datestr <= '1968' else datestr


def is_in(haystack, *needles):
    for needle in needles:
        if needle in haystack:
            return True


def recode_business_type(x):
    if x is None:
        return ''
    if is_in(x, 'H48', 'H46'):
        return 'Laundry'
    if is_in(x, 'H24', 'H25', 'H26'):
        return 'Restaurant'
    if is_in(x, 'H07', 'H08'):
        return 'Grocery'
    if is_in(x, 'H86', 'H87'):
        return 'Bar'
    return ''


def closed_at_present(x):
    """Get establishments that are currently closed
    Assume that any establishment with undeliverable mail is also closed"""
    b = x['Location End Date'] != '' or x['Mail Address'] == '0000 Undeliverable Mail'
    return int(b)


def add_neighborhood_dimensions():
    neighborhoods_geom = gpd.read_file('../public/data/neighborhoods.geojson')  # noqa
    A = pd.read_csv('../public/data/business.csv')  # noqa
    pysqldf = lambda q: sqldf(q, globals())  # noqa
    # Get percent of businesses in a neighborhood under 20 years of age
    res = pysqldf('''
          SELECT neighborhood
          , SUM(CASE WHEN age_in_years < 20 THEN 1 END) AS num_new_open_businesses
          , SUM(1) AS num_open_businesses
          , SUM(CASE WHEN age_in_years < 20 THEN 1 END)/SUM(1.0) AS pct_under_20
          FROM A
          WHERE 1=1
            AND NOT closed
          GROUP BY neighborhood
          ''')
    merged = pd.merge(
        neighborhoods_geom,
        res, how='left', left_on='neighborhood', right_on='neighborhood')
    return merged


def main():
    # Do a simple first pass--rename some variables for convenince, filter columns
    # Filter to SF-only establishments
    KEEP_COLUMNS = 'start_date business_name type lat lng closed'.split(' ')
    A['business_name'] = A['DBA Name']
    A['lat'] = pd.to_numeric(A['Business Location'].apply(
        lambda x: extract(x, LAT_REGEX)), errors='coerce')
    A['lng'] = pd.to_numeric(A['Business Location'].apply(
        lambda x: extract(x, LNG_REGEX)), errors='coerce')
    A['start_date'] = A['Location Start Date'].apply(
        lambda x: recode_date(x))
    A['end_date'] = A['Location End Date'].apply(
        lambda x: recode_date(x))
    A['StreetAddress'] = A['Street Address'].apply(lambda x: str(x).upper())
    A['type'] = A['LIC Code'].apply(recode_business_type)
    A['closed'] = A.apply(closed_at_present, axis=1)
    A['zip'] = A['Source Zipcode']
    B = A[A['zip'].isin(SF_ZIPS)]

    # Assume that the data set's geocoded addresses are fine
    regex_extract_location = B[B['lat'] != 0]
    # Grab everything that doesn't have a lat/lng
    B = B[B['lat'] == 0]

    # Join it up to the city's addressing
    address_df = pd.read_csv('./Addresses_-_Enterprise_Addressing_System.csv')
    B['StreetAddress'] = B.apply(lambda x: clean_address(x.StreetAddress), axis=1)
    C = B.merge(address_df, left_on='StreetAddress', right_on='Address', how='left', suffixes=['', 'r'])
    C['lng'] = C['Longitude']
    C['lat'] = C['Latitude']
    lookup_extract_location = C[C['lat'].notna()][KEEP_COLUMNS]
    remainder = C[C['lat'].isna()]

    remainder = remainder[['StreetAddress', 'start_date', 'business_name', 'type']]
    # remainder.to_csv('to_geocode.csv', index=False)

    merged = pd.concat([regex_extract_location[KEEP_COLUMNS], lookup_extract_location[KEEP_COLUMNS]])
    print("Doing point in poly calculation")
    merged['neighborhood'] = get_neighborhood(merged, neighborhoods_geom)
    merged['age_in_years'] = merged.apply(get_age_in_years, axis=1)
    print("Before duplicate drop", merged.count())
    KEEP_COLUMNS.extend(['neighborhood', 'age_in_years'])
    merged = merged[KEEP_COLUMNS].drop_duplicates()
    print("After duplicated drop", merged.count())
    fpath = os.path.join(dirname, '../public/data/business.csv')
    print('Writing to ' + fpath)
    merged.to_csv(fpath, index=False)


if __name__ == '__main__':
    main()
