// Bring in the db connection and the trip schema
const mongoose = require('./db');
const Trip = require('./travlr'); // Import the Trip model


// read seed data from json file
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json','utf8'));

//delete any existing records, then insert seed data
const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
};

// close the mongodb connection and exit
seedDB().then(async () => {
    await mongoose.connection.close();
    process.exit(0);
});