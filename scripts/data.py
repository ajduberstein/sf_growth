from __future__ import print_function

from datetime import datetime
import re

import pandas as pd

LAT_REGEX = '37\.\d{1,}'
LNG_REGEX = '-122\.\d{1,}'


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


A = pd.read_csv('Registered_Business_Locations_-_San_Francisco.csv')
A = A[(A['City'] == 'San+francisco') |
      (A['City'] == 'San Francisco') |
      (A['City'] == 'Sf')]
# A[A['Street Address'].str.contains('Po Box')]
A['business_name'] = A['DBA Name']
A['neighborhood_name'] = A['Neighborhoods - Analysis Boundaries']
A['business_type'] = A['NAICS Code Description']
A['lat'] = pd.to_numeric(A['Business Location'].apply(
    lambda x: extract(x, LAT_REGEX)), errors='coerce')
A['lng'] = pd.to_numeric(A['Business Location'].apply(
    lambda x: extract(x, LNG_REGEX)), errors='coerce')
A['start_date'] = A['Location Start Date'].apply(
    lambda x: recode_date(x))
A['end_date'] = A['Location End Date'].apply(
    lambda x: recode_date(x))

COLUMNS = 'lat lng start_date business_name business_type neighborhood_name'

B = A[A['lat'] > 37.7071832174446]
B = (B[B['lat'] < 37.8396145727521])
B = B[B['lng'] > -122.56072998046875]
B = B[B['lng'] < -122.33413696289064]
B = B[COLUMNS.split(' ')]
B['vps'] = B['business_name'].str.contains('Juice|Pet|Coffee|Apparel')
B.to_csv('../public/data/business.csv', index=False)
