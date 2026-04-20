var express = require('express');
var router = express.Router();
var controller = require('../Controllers/travel');

/* GET travel page. */
router.get('/', controller.travel);

// Route to display trip details in JSON format by tripCode
router.get('/:tripCode', function(req, res) {
    // Assuming you have a model for trips and it's called 'Trip'
    Trip.findOne({ code: req.params.tripCode }, function(err, trip) {
        if (err) {
            return res.status(500).json({ message: "Error fetching trip data" });
        }
        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }
        res.json(trip); // Return the trip data as JSON
    });
});



module.exports = router;
