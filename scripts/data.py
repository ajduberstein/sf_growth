from __future__ import print_function

import csv
from datetime import datetime
import re

import pandas as pd
import usaddress


LAT_REGEX = '37\.\d{1,}'
LNG_REGEX = '-122\.\d{1,}'


ORDINALS = ['1ST', '2ND', '3RD'] + [str(x) + 'TH' for x in range(4, 10)]


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
    b = x['Location End Date'] == '' or x['Mail Address'] == '0000 Undeliverable Mail'
    return int(b)


KEEP_COLUMNS = 'start_date business_name type lat lng closed'.split(' ')

A = csv.DictReader(open('Registered_Business_Locations_-_San_Francisco.csv', 'r'))
A = pd.DataFrame([r for r in A])
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
# First, assume that the data set's geocoded addresses are fine
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
remainder.to_csv('to_geocode.csv', index=False)

merged = pd.concat([regex_extract_location[KEEP_COLUMNS], lookup_extract_location[KEEP_COLUMNS]])
merged = merged.drop_duplicates()
merged.to_csv('merged.csv', index=False)
merged[KEEP_COLUMNS].to_csv('../public/data/business.csv', index=False)
