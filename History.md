# v.NEXT

# v0.7.0 – Charge Defaults

* TODO: Add incoterm to routing section of quote
* TODO: Smarter calculation of movement type
* TODO: Way to specify brokerage
* TODO: Default a set of charges based on mode + movement + incoterm

# v0.6.0 – Airports and Seaports

* Script to build reference data now includes airports and some seaports
* Location search goes across airports, seaports, and normal locations
* Ability to select mode in the routing section of a quote
* Movement type displayed in edit quote header screen and in quote output

# v0.5.0 – UN Locations

* Script to import and process UNLocations from .csv files
* Ability to search with or without diacritics and by location code
* Port and airport icons appear next to location options and value
* Fixed issue with special characters in country and location fields

# v0.4.0 – Favorites

* Ability to favorite a customer
* Ability to unfavorite a customer
* Favorite customers appear at the top of the customer list

# v0.3.0 – Charge Defaults

* Defaults units on charge lines based on the rate basis
* Defaults new charge lines rate basis to 'Shipment'
 
# v0.2.0 – Branches

* Create branches (name only)
* Choose customer branch from select component
* Edit customer
* Filter customer list by branch
* Default customer list filter to user branch

# v0.1.0 – Speed Demo

* Create and email an LCL quote that matches an existing Agility quote
* Other quote types partially supported
* Create a customer and apply currency/email defaults to quotes
* Unified design and look
* 60 fps performance, no loading
* Dynamic code splitting to minimize initial bundle size