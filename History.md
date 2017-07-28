## v.NEXT

## v1.3.0 – Basic Shipping Documents
 
* Bill of lading PDF can be generated from shipment editor
* Long descriptions respect word wrap and continue on next page

## v1.2.0 – Initial Shipment Editor

* Link to shipment from shipment list item
* Abstracted out cargo component so it can be used in both quotes and shipments
* Created modes for cargo component to account for use of containers
* Added cargo editor in shipment editor
* Added description field to cargo editor in shipment
* Added new, save, and archive methods to shipment
* Connected shipment methods to front-end buttons
* Quote data is copied into new shipments
* Added movement editor in shipment editor
* Added date fields to movement editor in shipment

## v1.1.0 – Shipment List Item

* Shipment list items appear below quote list items in the customer view

## v1.0.0 – Quotation

* Ability to quote customers for a variety of freight shipments
* Ability to manage rates which can automatically populate charges in matching quotes
* Ability to create and manage customers

## v0.13.0 – Video Series Preparation

* Replace reducer utilities with lodash where possible
* Make notes full width in read-only quote
* Remove placeholders from customer list items

## v0.12.0 – LCL Quote Scenario

__User Story:__ _As an operator and rate manager, I can create rates and and an LCL quote that defaults all charges as per an existing quote so I don't have to look up rates and manually enter them._

* Density ratio is available in loose cargo
* Chargeable weight is automatically calculated in loose cargo
* Minimum charge amount
* Split export and import customs clearance charges and rates
* Rates can be split by cargo type (loose and containerized)
* Weight ranges can be added to rates and get applied in quotes

## v0.11.0 – FCL Quote Scenario

__User Story:__ _Get a real FCL quote scenario working with as much automation as possible._

* __FCL Quote Scenario:__ Relevant charge populates automatically
* __FCL Quote Scenario:__ Applicable location or carrier rates populate for each charge automatically
* __FCL Quote Scenario:__ Notes default onto quote
* Units default into charges
* Exchange rates default into charges

## v0.10.0 – Simple Rate Management

* All four locations in routing
* Connect routing to rate search
* Add carrier field to quote
* Add rate list to view all rates
* Rate creation form for simple sell rates
* Edit and save changes to existing rates

## v0.9.0 – Simple Rate Database

* Rates have been moved into the Mongo database with a search-efficient index
* Applicability levels which have no rates are now disabled
* Changing the basis, unit price, or currency will change the applicability level to custom

## v0.8.0 – Simple Sell Rates

* Sell rate applicability fallback structure: Supplier => Location => Country => Global
* Automatically pull in most specific rate among those applicable when editing charges
* Ability to change selected rate among applicable rates in charge edit
* Charges and rates are currently hard-coded – this will move to a database editor in a future release 

## v0.7.0 – Charge Defaults

* Rename 'Routing' to 'Movement' in quote
* Add brokerage as a mode
* Add incoterm to movement section of quote
* Incoterm is unavailable for brokerage quotes
* Add commercial party to movement section of quote
* Default a set of charges based on mode + commercial party + incoterm + locations
* Updated list of seaports to all countries

## v0.6.0 – Airports and Seaports

* Script to build reference data now includes airports and some seaports
* Location search goes across airports, seaports, and normal locations
* Ability to select mode in the routing section of a quote
* Movement type displayed in edit quote header screen and in quote output

## v0.5.0 – UN Locations

* Script to import and process UNLocations from .csv files
* Ability to search with or without diacritics and by location code
* Port and airport icons appear next to location options and value
* Fixed issue with special characters in country and location fields

## v0.4.0 – Favorites

* Ability to favorite a customer
* Ability to unfavorite a customer
* Favorite customers appear at the top of the customer list

## v0.3.0 – Charge Defaults

* Defaults units on charge lines based on the rate basis
* Defaults new charge lines rate basis to 'Shipment'
 
## v0.2.0 – Branches

* Create branches (name only)
* Choose customer branch from select component
* Edit customer
* Filter customer list by branch
* Default customer list filter to user branch

## v0.1.0 – Speed Demo

* Create and email an LCL quote that matches an existing Agility quote
* Other quote types partially supported
* Create a customer and apply currency/email defaults to quotes
* Unified design and look
* 60 fps performance, no loading
* Dynamic code splitting to minimize initial bundle size