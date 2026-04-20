const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Correctly import the model

// GET: /trips - lists all the trips
const tripsList = async (req, res) => {
    try {
        const q = await Trip.find({}).exec();  // Use Trip instead of Model
        
        if (!q || q.length === 0) {  // Check if no results
            return res.status(404).json({ message: 'No trips found' });
        } else {
            return res.status(200).json(q);  // Return the list of trips
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving trips', error });
    }
};

// GET: /trips/:code - lists a trip by its code
const tripsFindByCode = async (req, res) => {
    try {
        const q = await Trip.find({ 'code': req.params.tripCode }) // Use Trip here instead of Model
            .exec();

        if (!q || q.length === 0) {  // Check if no result is found
            return res
                .status(404)
                .json({ message: 'Trip not found' });  // Return a meaningful error message
        } else {
            return res
                .status(200)
                .json(q);  // Return the found trip
        }
    } catch (err) {
        return res
            .status(500)
            .json({ message: 'An error occurred while fetching the trip', error: err.message });
    }
};




module.exports = {
    tripsList,
    tripsFindByCode
};
