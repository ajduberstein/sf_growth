import os

import pandas as pd

"""
Converts annotations into JSON for embedding
"""


dirname = os.path.dirname(__file__)
ANNOTATIONS = os.path.join(dirname, 'annotations.csv')
ANNOTATIONS_OUTPUT = os.path.join(dirname, '../src/', 'annotations.json')

annotations = pd.read_csv(ANNOTATIONS)
annotation_json = annotations.to_json(orient='records')

if __name__ == '__main__':
    with open(ANNOTATIONS_OUTPUT, 'w+') as f:
        f.write(annotation_json)
