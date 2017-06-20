var db = connect('localhost:3001/meteor');

var airports = db.UNLocations.find({ isAirport: true });

while (airports.hasNext()) {
  var airport = airports.next();
  airport._id = ObjectId().str;
  db.Airports.insert(airport);
}
