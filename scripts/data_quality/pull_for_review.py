"""
Pull 200 random locations to see what % of time restaurants are correctly labeled
"""

import pandas as pd


A = pd.read_csv('../Registered_Business_Locations_-_San_Francisco.csv')
A.sample(200)[['NAICS Code Description', 'LIC Code Description']].to_csv('to_manually_label.csv')
