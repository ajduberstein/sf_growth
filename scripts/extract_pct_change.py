import pandas as pd

if __name__ == '__main__':
    A = pd.read_csv('../public/data/business.csv')
    B = A.groupby(['neighborhood_name', 'start_date']).count()
    # per neighborhood
    B['pct_change'] = (
        (B['business_name'] - B['business_name'].shift(1)) /
        B['business_name'].shift(1))
    B = B.reset_index()
    B = B['neighborhood_name start_date pct_change'.split()]

    # overall
    C = A.groupby(['start_date']).count()
    C['pct_change'] = (
        (C['business_name'] - C['business_name'].shift(1)) /
        C['business_name'].shift(1))
    C = C.reset_index()
    C['neighborhood_name'] = 'All SF'
    C = C['neighborhood_name start_date pct_change'.split()]

    D = pd.concat([B, C])
    D.to_csv('../public/data/pct_growth.csv', index=False)
