from __future__ import print_function

import csv
from datetime import datetime
import re

import pandas as pd

LAT_REGEX = '37\.\d{1,}'
LNG_REGEX = '-122\.\d{1,}'

SF_ZIPS = [
    '94151',
    '94159',
    '94158',
    '94102',
    '94104',
    '94103',
    '94105',
    '94188',
    '94108',
    '94177',
    '94107',
    '94110',
    '94109',
    '94112',
    '94111',
    '94115',
    '94114',
    '94117',
    '94116',
    '94118',
    '94121',
    '94123',
    '94122',
    '94124',
    '94127',
    '94126',
    '94129',
    '94131',
    '94133',
    '94132',
    '94134',
    '94139',
    '94143',
]


def extract(x, regex):
    try:
        re_match = re.search(regex, x).group(0)
        return re_match
    except Exception:
        return 0


def recode_date(x):
    datestr = ''
    try:
        datestr = datetime.strptime(str(x), '%m/%d/%Y').strftime('%Y')
    except ValueError:
        return '1968'
    return '1968' if datestr <= '1968' else datestr


A = csv.DictReader(open('Registered_Business_Locations_-_San_Francisco.csv', 'r'))
A = pd.DataFrame([r for r in A])
# First attempt to geocode using the location in the city's list of registered addresses
# Then resort to using Google Maps
A['business_name'] = A['DBA Name']
# A['neighborhood_name'] = A['Neighborhoods - Analysis Boundaries']
A['business_type'] = A['NAICS Code Description']
A['lat'] = pd.to_numeric(A['Business Location'].apply(
    lambda x: extract(x, LAT_REGEX)), errors='coerce')
A['lng'] = pd.to_numeric(A['Business Location'].apply(
    lambda x: extract(x, LNG_REGEX)), errors='coerce')
A['start_date'] = A['Location Start Date'].apply(
    lambda x: recode_date(x))
A['end_date'] = A['Location End Date'].apply(
    lambda x: recode_date(x))
A['Address'] = A['Street Address'].apply(lambda x: x.upper())
A['zip'] = A['Source Zipcode']
B = A[A['zip'].isin(SF_ZIPS)]
# Assume that the properly geocoded addresses are fine
has_lat_lng = B[B['lat'] != 0]
# Grab everything that doesn't have a lat/lng
B = B[B['lat'] == 0]
# Join it up to the city's addressing
address_df = pd.read_csv('./Addresses_-_Enterprise_Addressing_System.csv')
C = B.merge(addresses_df, B, on='Address', how='left')
# If the addresses are still wrong, take the closest fuzzy match


COLUMNS = 'lat lng start_date zip business_name business_type Address'

# SF bounding box from http://duberste.in/sql_bounding_box/
C = C[COLUMNS.split(' ')]
C['lps'] = C['business_name'].str.contains('Juice|Pet |Coffee|Apparel|Yoga')
C.to_csv('../public/data/business.csv', index=False)
