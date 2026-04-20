var express = require('express');
var router = express.Router();

/* GET travel page */
router.get('/travel', (req, res) => {
    res.render('travel', { title: 'Travel Page' }); // Ensure 'travel' view exists
});

module.exports = router;
