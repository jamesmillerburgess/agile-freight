// mongoimport -h localhost:3001 --db meteor --collection UNLocations --type csv --file /Users/goldfibre/Downloads/unloc.csv --headerline

var db = connect('localhost:3001/meteor');

var c = db.UNLocations.find();

while (c.hasNext()) {
  var doc = c.next();
  db.UNLocations.update(
    { _id: doc._id },
    {
      $set: {
        isPort: doc.isPort === 'TRUE',
        isRailTerminal: doc.isRailTerminal === 'TRUE',
        isRoadTerminal: doc.isRoadTerminal === 'TRUE',
        isAirport: doc.isAirport === 'TRUE',
        isPostalExchange: doc.isPostalExchange === 'TRUE',
        isMultimodal: doc.isMultimodal === 'TRUE',
        isFixedTransport: doc.isFixedTransport === 'TRUE',
        isBorderCrossing: doc.isBorderCrossing === 'TRUE',
      },
    },
  );
}