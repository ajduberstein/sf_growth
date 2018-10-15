import sqlite3

import pandas as pd
from pandas.io import sql

cnx = sqlite3.connect(':memory:')

IDX_QUERY = '''
        WITH pre_idx AS (
          SELECT neighborhood
          , start_date
          , COUNT(*) AS freq
          FROM A
          GROUP BY 1, 2
          UNION
          SELECT 'All SF' AS neighborhood
          , start_date
          , COUNT(*) AS freq
          FROM A
          GROUP BY 1, 2
        )
        , extrema AS (
          SELECT neighborhood
          , MAX(freq) AS mx
          , MIN(freq) AS mn
          FROM pre_idx
          GROUP BY 1
        )
        SELECT pre_idx.neighborhood AS neighborhood
        , start_date
        , freq AS num_opened
        , (1.0*freq - mn) / (1.0*mx - mn) AS num_opened_scaled
        FROM pre_idx
        JOIN extrema
        USING(neighborhood)
        '''


if __name__ == '__main__':
    A = pd.read_csv('../public/data/business.csv')
    sql.to_sql(A, name='A', con=cnx)
    B = sql.read_sql(IDX_QUERY, con=cnx)
    B.to_csv('../public/data/pct_growth.csv', index=False)
    cnx.close()
