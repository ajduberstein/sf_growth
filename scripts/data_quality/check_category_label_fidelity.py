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
specs = A.groupby(['year', 'either']).count().reset_index()[['year', 'either', 'Location Id']]
specs.rename(columns={'Location Id': 'n'}, inplace=True)
all = A.groupby(['year']).count().reset_index()[['year', 'n']]
joined = specs.set_index(['year']).join(all.set_index(['year']), rsuffix='_total')
joined['pct overall'] = joined['n'] / joined['n_total']
joined.query('either == True')['pct overall']
# The time series really doesn't vary
