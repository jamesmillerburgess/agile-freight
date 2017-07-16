#!/usr/bin/env bash

echo ""
echo "[[[[[ Building reference data for agile-freight ]]]]]"

echo ""
echo "[[[[[ Dropping collections ]]]]]"
mongo localhost:3001/meteor private/removeReferenceData.js

echo ""
echo "[[[[[ Importing UNLOCODE1.csv ]]]]]"
mongoimport -h localhost:3001 --db meteor --collection UNLocations --type csv --file /Users/goldfibre/projects/unlocations/UNLOCODE1.csv --headerline

echo ""
echo "[[[[[ Importing UNLOCODE2.csv ]]]]]"
mongoimport -h localhost:3001 --db meteor --collection UNLocations --type csv --file /Users/goldfibre/projects/unlocations/UNLOCODE2.csv --headerline

echo ""
echo "[[[[[ Importing UNLOCODE3.csv ]]]]]"
mongoimport -h localhost:3001 --db meteor --collection UNLocations --type csv --file /Users/goldfibre/projects/unlocations/UNLOCODE3.csv --headerline

echo ""
echo "[[[[[ Processing locations ]]]]]"
mongo localhost:3001/meteor private/importUNLoc.js

echo ""
echo "[[[[[ Processing airports ]]]]]"
mongo localhost:3001/meteor private/importAirports.js

echo ""
echo "[[[[[ Processing seaports ]]]]]"
mongo localhost:3001/meteor private/importSeaports.js

echo ""
echo "[[[[[ Done ]]]]]"
