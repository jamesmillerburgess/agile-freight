#!/usr/bin/env bash

# EXAMPLES
# $1 = username
# $2 = password

echo ""
echo "[[[[[ Building reference data for agile-freight ]]]]]"

echo ""
echo "[[[[[ Dropping collections ]]]]]"
mongo ds159880.mlab.com:59880/agility-freight -u $1 -p $2 private/removeReferenceData.js

echo ""
echo "[[[[[ Importing country.csv ]]]]]"
mongoimport -h ds159880.mlab.com:59880 -d agility-freight -u $1 -p $2 --collection Countries --type csv --file /Users/goldfibre/projects/unlocations/country.csv --headerline

echo ""
echo "[[[[[ Importing UNLOCODE1.csv ]]]]]"
mongoimport -h ds159880.mlab.com:59880 -d agility-freight -u $1 -p $2 --collection UNLocations --type csv --file /Users/goldfibre/projects/unlocations/UNLOCODE1UTF8.csv --fieldFile /Users/goldfibre/projects/unlocations/UNLOCODEFIELDS.txt

echo ""
echo "[[[[[ Importing UNLOCODE2.csv ]]]]]"
mongoimport -h ds159880.mlab.com:59880 -d agility-freight -u $1 -p $2 --collection UNLocations --type csv --file /Users/goldfibre/projects/unlocations/UNLOCODE2UTF8.csv --fieldFile /Users/goldfibre/projects/unlocations/UNLOCODEFIELDS.txt

echo ""
echo "[[[[[ Importing UNLOCODE3.csv ]]]]]"
mongoimport -h ds159880.mlab.com:59880 -d agility-freight -u $1 -p $2 --collection UNLocations --type csv --file /Users/goldfibre/projects/unlocations/UNLOCODE3UTF8.csv --fieldFile /Users/goldfibre/projects/unlocations/UNLOCODEFIELDS.txt

echo ""
echo "[[[[[ Processing locations ]]]]]"
mongo ds159880.mlab.com:59880/agility-freight -u $1 -p $2 private/importUNLoc.js

echo ""
echo "[[[[[ Processing airports ]]]]]"
mongo ds159880.mlab.com:59880/agility-freight -u $1 -p $2 private/importAirports.js

echo ""
echo "[[[[[ Processing seaports ]]]]]"
mongo ds159880.mlab.com:59880/agility-freight -u $1 -p $2 private/importSeaports.js

echo ""
echo "[[[[[ Done ]]]]]"
