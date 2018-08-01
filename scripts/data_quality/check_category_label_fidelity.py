from datetime import datetime
import pandas as pd

A = pd.read_csv('../Registered_Business_Locations_-_San_Francisco.csv')
A['has_naics'] = pd.notna(A['NAICS Code Description'])
A['has_lic'] = pd.notna(A['LIC Code Description'])
A['both'] = A.apply(lambda x: x['has_naics'] and x['has_lic'], axis=1)
A['either'] = A.apply(lambda x: x['has_naics'] or x['has_lic'], axis=1)


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


A['start_date'] = A['Location Start Date'].apply(lambda x: recode_date(x))
A['year'] = A['start_date'].apply(lambda x: x[:4])


# Get the percentage of businesses with a NAICS or LIC code
# Do a larger percentage of recent businesses have a NAICS or a LIC?
def aggregate(df):
    specs = df.groupby(['year', 'either']).count().reset_index()[['year', 'either', 'Location Id']]
    all = df.groupby(['year']).count().reset_index()[['year', 'Location Id']]
    joined = specs.set_index(['year']).join(all.set_index(['year']), rsuffix='_total')
    joined['pct overall'] = joined['Location Id'] / joined['Location Id_total']
    return joined.query('either == True')['pct overall']


aggregate(A)
# Conclusion: The time series really doesn't vary
# year
# 1968    0.705951
# 1969    0.695804
# 1970    0.750000
# 1971    0.718310
# 1972    0.685430
# ...
# 2014    0.591089
# 2015    0.656272
# 2016    0.765691
# 2017    0.812541
# 2018    0.792411

# We know from previous work that many of the establishments are located outside of SF
# Maybe it's better for establishments located within SF?
SF_ZIPS = [
    '94151', '94159', '94158',
    '94102', '94104', '94103',
    '94105', '94188', '94108',
    '94177', '94107', '94110',
    '94109', '94112', '94111',
    '94115', '94114', '94117',
    '94116', '94118', '94121',
    '94123', '94122', '94124',
    '94127', '94126', '94129',
    '94131', '94133', '94132',
    '94134', '94139', '94143']

B = A[A['Source Zipcode'].isin(SF_ZIPS)]
print(aggregate(B))
# Conclusion: SF-based or not is just as infrequently labeled
#
# 1968    0.711004
# 1969    0.694981
# 1970    0.755906
# 1971    0.724638
# 1972    0.685121
# ...
# 2014    0.619428
# 2015    0.681998
# 2016    0.780527
# 2017    0.814812
# 2018    0.789485

# So, what determines labeling? And, if it's user-reported, how frequently is it right or unreported?
# pull_for_review.py will extract a manual sample, which I'll review for precision/recall
