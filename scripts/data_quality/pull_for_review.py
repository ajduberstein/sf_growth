"""
Pull 200 random locations to see what % of time restaurants are correctly labeled
"""

import pandas as pd


A = pd.read_csv('../Registered_Business_Locations_-_San_Francisco.csv')
A.sample(200, random_state=42)[['DBA Name', 'NAICS Code Description', 'LIC Code Description']].to_csv('to_manually_label.csv')

# Manual review -- out of 200, 12 restaurants, 10 of which were identified as restaurants properly
# The NAICS/LIC code descriptions appear to be accurate where provided (high precision)
# However, I'm going to need a larger sample of labeled points

A[A['NAICS Code Description'] == 'Food Services'].sample(200, random_state=44)[['DBA Name', 'NAICS Code Description', 'LIC Code Description']].to_csv('to_manually_label.csv')
# A bit of noise in the restaurant data
# For example, Safeway carry out sushi is listed here
# as are Spoonrocket, a cannibis dispensary and stadium concession stands
# Overall, however, it is mostly restaurants.
# The LIC labels "Restaurant Less Than 1,000 Sqft" and "Restaurant 1,000 - 2,000 Sqft"
# seem mostly accurate
