var db = connect('localhost:3001/meteor');

var airports = db.UNLocations.find({ isAirport: true });

while (airports.hasNext()) {
  var airport = airports.next();
  var id = airport._id;
  airport._id = ObjectId().str;
  db.Airports.insert(airport);
  db.UNLocations.update({ _id: id }, { $set: { isAirport: false } });
}
