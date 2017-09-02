var altNames = db.UNLocations.find({ ch: '=' });

db.UNLocations.createIndex({ locationCode: 1 });

while (altNames.hasNext()) {
  var doc               = altNames.next();
  var names             = doc.name.split(' = ');
  var namesWoDiacritics = doc.nameWoDiacritics.split(' = ');
  var base              = db.UNLocations.findOne({
    countryCode: doc.countryCode,
    name: {
      $regex: new RegExp(names[1].replace('(', '\\(').replace(')', '\\)'))
    },
  });
  db.UNLocations.update({ _id: base._id },
    {
      $push: {
        altNames: names[0], altNamesWoDiacritics: namesWoDiacritics[0],
      },
    });
  db.UNLocations.remove({ _id: doc._id });
}

printjson('Alternate names processed');

var countriesArray = db.Countries.find({}).toArray();
var countries = {};
for (var i = 0; i < countriesArray.length; i++) {
  countries[countriesArray[i].countryCode] = countriesArray[i].countryName;
}

var c = db.UNLocations.find({ props: { $exists: true } });
var docs = c.toArray();
var newDocs = [];
var i = 1;

for (var i = 0; i < docs.length; i++) {
  var doc = docs[i];
  if (doc.name[0] !== '.' && typeof doc.props !== 'undefined') {
    if (!doc.props) {
      printjson(doc);
    }
    var longitude = '';
    var latitude  = '';
    if (doc.coordinates) {
      longitude = +doc.coordinates.slice(0, 2) +
                  (+doc.coordinates.slice(2, 4) / 100) *
                  (doc.coordinates[4] === 'N' ? 1 : -1);
      latitude  = +doc.coordinates.slice(6, 9) +
                  (+doc.coordinates.slice(9, 11) / 100 ) *
                  (doc.coordinates[11] === 'E' ? 1 : -1);
    }
    var countryName = '';
    if (countries[doc.countryCode]) {
      countryName = countries[doc.countryCode];
    }
    newDocs.push({
      _id: ObjectId().str,
      code: doc.countryCode + doc.locationCode,
      countryCode: doc.countryCode,
      locationCode: doc.locationCode,
      name: doc.name,
      altNames: doc.altNames || [],
      nameWoDiacritics: doc.nameWoDiacritics,
      altNamesWoDiacritics: doc.altNamesWoDiacritics || [],
      subdivision: doc.subdivision,
      isSeaport: false,
      isAirport: doc.props[3] === '4',
      iataCode: doc.iataCode,
      longitude: longitude,
      latitude: latitude,
      search: doc.countryCode +
              doc.locationCode + ' ' +
              doc.name + ' ' +
              doc.nameWoDiacritics + ' ' +
              countryName +
              (doc.subdivision ? ' ' + doc.subdivision : '') +
              (doc.iataCode ? ' ' + doc.iataCode : ''),
    });
  }
  if (i % 10000 === 0) {
    printjson(i + ' locations processed');
  }
}

printjson(i + ' locations processed');

printjson('Uploading ' + newDocs.length + ' locations');

db.UNLocations.remove({});
db.UNLocations.insertMany(newDocs);
