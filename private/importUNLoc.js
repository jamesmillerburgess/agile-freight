var db = connect('localhost:3001/meteor');

var altNames = db.UNLocations.find({ ch: '=' });

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

printjson('Alt Names Recorded');

var c = db.UNLocations.find({ props: { $exists: true } });
var i = 1;

while (c.hasNext()) {
  var doc = c.next();
  i += 1;
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
    db.UNLocations.insert(
      {
        _id: ObjectId().str,
        countryCode: doc.countryCode,
        locationCode: doc.locationCode,
        name: doc.name,
        altNames: doc.altNames || [],
        nameWoDiacritics: doc.nameWoDiacritics,
        altNamesWoDiacritics: doc.altNamesWoDiacritics || [],
        subdivision: doc.subdivision,
        iataCode: doc.iataCode,
        isPort: doc.props.indexOf('1') !== -1,
        isAirport: doc.props.indexOf('3') !== -1,
        longitude: longitude,
        latitude: latitude,
        search: doc.countryCode +
                doc.locationCode + ' ' +
                doc.name + ' ' +
                doc.nameWoDiacritics +
                (doc.subdivision ? ' ' + doc.subdivision : '') +
                (doc.props.indexOf('1') !== -1 ? ' port' : '') +
                (doc.props.indexOf('3') !== -1 ? ' airport' : '') +
                (doc.iataCode ? ' ' + doc.iataCode : ''),

      }
    );
  }
  if (typeof doc.props !== 'undefined') {
    db.UNLocations.remove(doc);
  }
  if (i % 10000 === 0) {
    printjson(i + ' records processed');
  }
}

printjson(i + ' records processed');
