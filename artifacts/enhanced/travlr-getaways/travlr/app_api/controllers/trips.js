const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Assuming this is the correct path for your trips model
const User = require('../models/user'); // Correct path to the User model


// GET: /trips - lists all the trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({}).exec(); // Fetch all trips from the database
        if (!trips || trips.length === 0) {
            return res.status(404).json({ message: 'No trips found' }); // If no trips found
        }
        return res.status(200).json(trips); // Return all trips as JSON
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching trips', error: err });
    }
};

// GET: /trips/:tripCode - fetches a single trip based on tripCode
const tripsFindByCode = async (req, res) => {
    try {
        const trip = await Trip.findOne({ code: req.params.tripCode }).exec(); // Fetch trip by code
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' }); // If no trip found
        }
        return res.status(200).json(trip); // Return the trip details as JSON
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching trip', error: err });
    }
};

// POST: /trips - Adds a new Trip
const tripsAddTrip = async (req, res) => {
    const userId = req.auth._id;
    console.log("userId received:", userId);

    // Check if user exists before proceeding with the trip creation
    try {
        const user = await User.findById(userId).exec(); // Get user by userId
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const trip = new Trip({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description,
            user: userId // Assuming you want to associate the trip with the user
        });

        await trip.save();
        return res.status(201).json(trip); // Successfully created trip
    } catch (err) {
        return res.status(400).json(err); // Bad request if there was an error
    }
};

// PUT: /trips/:tripCode - Updates an existing trip
const tripsUpdateTrip = async (req, res) => {
    const userId = req.auth._id;
    console.log("userId received:", userId);

    try {
        const user = await User.findById(userId).exec(); // Get user by userId
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedTrip = await Trip.findOneAndUpdate(
            { code: req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description,
                user: userId // Associate user with the trip
            },
            { new: true } // Return the updated document
        ).exec();

        if (!updatedTrip) {
            return res.status(404).json({ message: `Trip not found with code ${req.params.tripCode}` });
        }
        return res.status(200).json(updatedTrip); // Return updated trip
    } catch (err) {
        return res.status(500).json({ message: 'Error updating trip', error: err });
    }
};

// DELETE: /trips/:tripCode - Deletes a trip
const tripsDeleteTrip = async (req, res) => {
    try {
        const deletedTrip = await Trip.findOneAndDelete({ code: req.params.tripCode }).exec();

        if (!deletedTrip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        return res.status(204).send(); // No content, delete successful
    } catch (err) {
        return res.status(500).json({ message: 'Error deleting trip', error: err });
    }
};


module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip 
};
