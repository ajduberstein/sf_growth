from __future__ import print_function

from datetime import datetime
import re
from collections import defaultdict
import json

import pandas as pd

LAT_REGEX = '37\.\d{1,}'
LNG_REGEX = '-122\.\d{1,}'


def normalize_records(record_collection, key_column_name):
    time_based_records = defaultdict(list)
    for record in record_collection:
        key_column_value = record[key_column_name]
        record.pop(key_column_name, None)
        time_based_records[key_column_value].append(record)
    return time_based_records


test_records = [
    {'hey': 1, 'there': 2},
    {'hey': 1, 'there': 2},
    {'there': 3, 'hey': 2}
]
assert normalize_records(test_records, 'there') == {
    2: [{'hey': 1}, {'hey': 1}],
    3: [{'hey': 2}]
}


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
A['business_name'] = A['DBA Name']
A['neighborhood_name'] = A['Neighborhoods - Analysis Boundaries']
A['business_type'] = A['NAICS Code Description']
A['lat'] = pd.to_numeric(A['Business Location'].apply(
    lambda x: extract(x, LAT_REGEX)), errors='coerce')
A['lng'] = pd.to_numeric(A['Business Location'].apply(
    lambda x: extract(x, LNG_REGEX)), errors='coerce')
A['start_year'] = A['Location Start Date'].apply(
    lambda x: recode_date(x))
A['end_date'] = A['Location End Date'].apply(
    lambda x: recode_date(x))

COLUMNS = 'lat lng start_year business_name business_type neighborhood_name'

# SF bounding box from duberste.in/sql_bounding_box/
B = A[A['lat'] > 37.7071832174446]
B = (B[B['lat'] < 37.8396145727521])
B = B[B['lng'] > -122.56072998046875]
B = B[B['lng'] < -122.33413696289064]
B = B[COLUMNS.split(' ')]
B['lps'] = B['business_name'].str.contains('Juice|Pet |Coffee|Apparel|Yoga')
records = B.to_dict(orient='records')
normalized_records = normalize_records(records, 'start_year')
with open('../public/data/business.json', 'w+') as f:
    f.write(json.dumps(normalized_records))
