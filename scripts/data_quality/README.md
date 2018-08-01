Data quality analsis for SF Registered Business Locations
========

This is an analysis of health/accuracy for San Francisco's
[Registered Business Locations](https://data.sfgov.org/Economy-and-Community/Registered-Business-Locations-San-Francisco/g8m3-pdis/data) data.

# What's good about this data

For the faults I'm about to report, I consider this a very impressive data set. The number of business openings
in any given year is correlated with larger market trends (economic booms/busts). The density of business establishments
in any part of SF correlates with population density. More recent data (since 2010) seems to be correct and thorough. Overall,
I'd say it's fine for my purposes--I'm trying to tell a story of general trends.

In its current state, I wouldn't recommend it for formal analysis of the commercial health in San Francisco over time.
I'd love to see the city produce a more thorough historical data set. However, to see the broad strokes of the city's growth,
it's fine.

# Number of observations

Data before 2010 seem to be largely missing.

The number of businesses seems to be underreported up until 2010, judging from external sources like
archival phone books, one of which is [here](https://archive.org/stream/sanfranciscosanf1980rlpo#page/n171).
The business section of that phone book spans [120 pages](https://archive.org/stream/sanfranciscosanf1980rlpo#page/n291). If we assume 100 businesses
per column, multiplied by four columns per page, times 120 pages, it seems we should have 48,000 active businesses in San Francisco in 1980.

Compare to the city's [data](https://san-francisco.datasettes.com/registered-business-locations-3d50679?sql=SELECT+COUNT%28*%29+AS+num_businesses_before_1980%0D%0AFROM+%5BRegistered_Business_Locations_-_San_Francisco%5D%0D%0AWHERE+SUBSTR%28%22Location+Start+Date%22%2C+7%2C+4%29+%3C%3D+%221980%22%0D%0AORDER+BY+1),
which reports a far fewer 6,309 businesses in 1980. This suggests a lot of missing data.

To assume that the reported data is a random sample is [selection bias](https://en.wikipedia.org/wiki/Selection_bias), so it'd be useful to know why this data is missing.

To do this, I reached out to the city and asked:

> Me: I’ve cross-referenced some of these records with historical phone books of San Francisco and have found that some business listings are inaccurate (e.g., incorrect business opening year) or seemingly omitted (the business was never listed). What determines if a business receives a record in this data set?

> SF: This dataset is built off of self-reported information from the business registration form (see here: https://sftreasurer.org/newbizinstructions). It will be as accurate as the data business owners provide (and keep updated)

It seems this data is as good as registration requirements were strict, which means historical data may be scant or inaccurate.
As of 2018, you have to register your company within 15 days of commencing business in SF, with some exceptions for landlords.
The earliest business registration law that I can find for San Francisco is 2001, digging through the [San Francisco Business and Tax Regulations Code](http://library.amlegal.com/nxt/gateway.dll/California/business/article6commonadministrativeprovisions?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_6.9-3).
It may be reasonable to assume that data is rather untrustworthy before 2001-2002.

This is unfortunately hard to verify. It'd be great to cross-reference the number of listings at that time with some other data set (maybe a phone book, though they were probably falling out
of fashion at that point). I can only find library records of a physical copy of the Yellow Pages, which I'd have to request. In the off-chance that you are the
kind of subdirectory-of-a-subdirectory README file reader who digitizes phone books or wants to estimate the number of businesses listed in them, drop me a line.

For some back-of-the-envelope rough quality check, let's use the fact that SF has been spatially saturated for a while and assume (falsely but conservatively) it has maintained at least the estimated 48,000 active
businesses in 1980. Unfortunately, the registration requirement law alone doesn't seem to explain it. The city doesn't break 48,000 establishments until 2010. ([Query](https://san-francisco.datasettes.com/registered-business-locations-3d50679?sql=SELECT+COUNT%28*%29+AS+num_businesses_before_2011%0D%0AFROM+%5BRegistered_Business_Locations_-_San_Francisco%5D%0D%0AWHERE+SUBSTR%28%22Location+Start+Date%22%2C+7%2C+4%29+%3C%3D+%222010%22%0D%0AAND+%28SUBSTR%28%22Location+End+Date%22%2C+7%2C+4%29+IS+NULL+OR%0D%0A+++++SUBSTR%28%22Location+End+Date%22%2C+7%2C+4%29+%3C%3D+%222010%22%29%0D%0AAND+%22City%22+%3D+1%0D%0AORDER+BY+1))
Without digging too much more, it seems that it's very hard to make unbiased claims about San Francisco with this data and It appears to be more accurate for recent years.

# Geolcation

## Business located outside of San Francisco

Plotting this data, we find a fair number of points located outside of San Francisco. It turns out this 
data contains any businesses that do taxable business here. If you have a consultancy based out of Boise and
you've done work for the city, you'll be listed here. I've excluded those from my analysis.

## Businesses with no listed location

It turns out that [a large number of businesses aren't geocoded at all](https://san-francisco.datasettes.com/registered-business-locations-3d50679?sql=SELECT+COUNT%28CASE+WHEN+%22Business+Location%22+IS+NULL+THEN+1+END%29+AS+%22Businesses+with+No+Location%22%0D%0A%2C+COUNT%28*%29+AS+%22All+SF+Business%22%0D%0AFROM+%5BRegistered_Business_Locations_-_San_Francisco%5D%0D%0AWHERE+%22City%22+%3D+1).
The city maintains a lookup table from [addresses to latitude/longitude locations](https://data.sfgov.org/Geographic-Locations-and-Boundaries/Addresses-Enterprise-Addressing-System/sr5d-tnui),
so I decided to clean all the addresses and join them to this lookup table, in order to more thoroughly categorize the data.
There are still about 7,000 businesses that don't have a listed location, and short of using precious Google Places API calls on this project,
I'm out of ideas for geolocating them. I'm excluding them from this analysis.

# Business location closing dates

We don't seem to have a high recall indicator for when establishments closed for most of the last 50 years of SF history. I asked
the city how so many business locations have no end date before 2010. I received the following statement:

> Businesses with with no ending dates have not closed.

This unfortunately doesn't seem to be the case. If we believe the city's data to be accurate,
a disproporationate number of businesses have closed in the last 7 years, roughly since the
data set started getting published. ([Query](https://san-francisco.datasettes.com/registered-business-locations-3d50679?sql=SELECT+SUBSTR%28%22Business+End+Date%22%2C+7%2C+4%29+AS+year%0D%0A%2C+COUNT%28*%29+AS+freq%0D%0AFROM+%5BRegistered_Business_Locations_-_San_Francisco%5D%0D%0AGROUP+BY+1%0D%0AORDER+BY+1))
I'd wager that this information is accurate where reported; if not reported, the business may or may not still be operating.

You may be enthused to know that 'Undeliverable Mail' may be a proxy for detecting closing.
Place Pigalle in Hayes Valley is one a closed establishment, and while it has no business end date, it does have an "Undeliverable Mailing Address,"
which seems to be correlated to whether an estalbishment is active. ([Query.](https://san-francisco.datasettes.com/registered-business-locations-3d50679?sql=SELECT+*%0D%0AFROM+%5BRegistered_Business_Locations_-_San_Francisco%5D%0D%0AWHERE+%22DBA+Name%22+%3D+%22Place+Pigalle%22%0D%0AGROUP+BY+1%2C+2%2C+3%0D%0AORDER+By+1%2C+2%2C+3))
The percentage of businesses to have no mailing address may actually be a good proxy for which businesses have closed,
but it can't be used to substitute for closing year, since we don't know what calendar date the business lost its mailing address. ([Query](https://san-francisco.datasettes.com/registered-business-locations-3d50679?sql=SELECT+SUBSTR%28%22Location+Start+Date%22%2C+7%2C+4%29+AS+year%0D%0A%2C+SUM%28%22Mail+Address%22+%3D+%220000+Undeliverable+Mail%22%29+*+1.0+%2F+COUNT%28*%29+AS+pct_undeliverable%0D%0A%2C+COUNT%28*%29+AS+num_business%0D%0AFROM+%5BRegistered_Business_Locations_-_San_Francisco%5D%0D%0AGROUP+BY+1%0D%0AORDER+By+1).)

A quick manual review of these establishments seems to suggest that "Undeliverable Mail"
is essentially a closed establishment, and that recent location end dates may actually be accurate/comprehensive.
It may be useful to ask the city to provide the calendar date that mail became undeliverable, if they have it.

# Business location opening dates

I was really excited about these, because they seemed to be accurate, until I found a listing in the 1980 Polk's Directory Phone Book.

The Holiday Inn Union Square and Hilton at Mason and O'Farrell were operating in 1980, as proven by this phone book [entry](https://archive.org/stream/sanfranciscosanf1980rlpo#page/n69). 
Indeed, given my city's thriving tourism sector, they're both still operating. However, the Holiday Inn is listed as having opened in 2016,
and the Hilton claims to have opened in 2003. Two prominent brick-and-mortar establishments with incorrect start years
doesn't give me much hope that the data is error-free.

# Type of business

How do we know whether an establishment is lodging or a restaurant or a laundromat? We check the LIC or NAICS code, whichever was listed.
NAICS stands for "North American Industry Classification System," which is used for federal reporting. A lookup table is [here](https://sftreasurer.org/NAICS).
I actually can't find what LIC stands for. Here's the [data dictionary for the associated codes.](https://data.sfgov.org/api/views/g8m3-pdis/files/8f1e59a7-b907-4a18-b3b5-42ee5dea8e8f?download=true&filename=TTX-0013_DataDictionary_registered-businesses.xlsx)

According to an inquiry I placed to the city, NAICS codes are self-reported. I assume the same is true for LIC.

There are two types of business classification codes, NAICS and LIC.
[Associated LIC codes for restaurants are generally H24, H25, and H26](https://san-francisco.datasettes.com/registered-business-locations-3d50679?sql=select+%22LIC+Code%22%0D%0A%2C+COUNT%28*%29%0D%0AFROM+%5BRegistered_Business_Locations_-_San_Francisco%5D%0D%0Awhere+%22LIC+Code+Description%22+LIKE+%22Restaurant%25%22%0D%0AGROUP+BY+1).
A manual review of entries with these labels suggests that they're correct when reported, but most often under-reported.


### Acknowledgments

- [DataSF](https://datasf.org/opendata/) for answering my questions and providing the data itself
- [Datasette](https://github.com/simonw/datasette) for making it easier to publicly analyze this data.
- The San Francisco Public Library provides an online archive of phone books through 1982, [viewable here](https://sfpl.org/index.php?pg=2000540401).
- The [Prelinger Library](http://www.prelingerlibrary.org/home/)
