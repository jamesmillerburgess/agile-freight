var airports = db.UNLocations.find({ isAirport: true }).toArray();
var newAirports = [];

for (var i = 0; i < airports.length; i++) {
  newAirports.push(airports[i]);
  newAirports[i]._id = ObjectId().str;
}

db.UNLocations.updateMany({ isAirport: true }, { $set: { isAirport: false } });
db.UNLocations.insertMany(newAirports);

