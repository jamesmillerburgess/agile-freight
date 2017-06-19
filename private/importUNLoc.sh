#!/usr/bin/env bash

echo "Dropping UNLocation collection"
mongo localhost:3001/meteor private/removeUNLoc.js

echo ""
echo "Importing UNLOCODE1.csv"
mongoimport -h localhost:3001 --db meteor --collection UNLocations --type csv --file /Users/goldfibre/projects/unlocations/UNLOCODE1.csv --headerline

echo ""
echo "Importing UNLOCODE2.csv"
mongoimport -h localhost:3001 --db meteor --collection UNLocations --type csv --file /Users/goldfibre/projects/unlocations/UNLOCODE2.csv --headerline

echo ""
echo "Importing UNLOCODE3.csv"
mongoimport -h localhost:3001 --db meteor --collection UNLocations --type csv --file /Users/goldfibre/projects/unlocations/UNLOCODE3.csv --headerline

echo ""
echo "Processing records"
mongo localhost:3001/meteor private/importUNLoc.js

echo ""
echo "Done"
