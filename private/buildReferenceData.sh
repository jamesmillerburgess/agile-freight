#!/usr/bin/env bash

# EXAMPLES
# $1 = username
# $2 = password

echo ""
echo "[[[[[ Building reference data for agile-freight ]]]]]"

echo ""
echo "[[[[[ Dropping collections ]]]]]"
mongo $1 private/removeReferenceData.js

echo ""
echo "[[[[[ Importing UNLOCODE1.csv ]]]]]"
mongoimport -h $1 --db meteor --collection UNLocations --type csv --file /Users/goldfibre/projects/unlocations/UNLOCODE1.csv --headerline

echo ""
echo "[[[[[ Importing UNLOCODE2.csv ]]]]]"
mongoimport -h $1 --db meteor --collection UNLocations --type csv --file /Users/goldfibre/projects/unlocations/UNLOCODE2.csv --headerline

echo ""
echo "[[[[[ Importing UNLOCODE3.csv ]]]]]"
mongoimport -h $1 --db meteor --collection UNLocations --type csv --file /Users/goldfibre/projects/unlocations/UNLOCODE3.csv --headerline

echo ""
echo "[[[[[ Processing locations ]]]]]"
mongo $1/meteor private/importUNLoc.js

echo ""
echo "[[[[[ Processing airports ]]]]]"
mongo $1/meteor private/importAirports.js

echo ""
echo "[[[[[ Processing seaports ]]]]]"
mongo $1/meteor private/importSeaports.js

echo ""
echo "[[[[[ Done ]]]]]"
