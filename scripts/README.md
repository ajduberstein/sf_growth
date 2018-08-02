About this directory
===========

Here you can find a series of scripts that generate data for display.
You'll note that they're not in JS, since I take the opinion that
JS is not a good data manipulation/aggregation language.

Annotations to be displayed on the map can be added in a file called `annotations.csv`
in this directory, then built using `generate_json.py`.

`data.py` takes the raw registered business data and reduces it down to the data that I present
in the UI.

`extract_pct_change.py` creates a time series of scaled growth of SF neighborhoods.
As of this commit it's not in active use.

`data_quality/` is a directory with scripts used to describe the data here.
If you want to know more about the accuracy of the data used here,
the `README` there offers more info.


Acknowledgements
============
Registered business location data from the [City of San Francisco](https://data.sfgov.org/Economy-and-Community/Registered-Business-Locations-San-Francisco/g8m3-pdis/data).
