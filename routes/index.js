/**
 * Created by mamol on 16/07/26.
 */
var express = require('express');
var router = express.Router();

// Get home page
router.get('/', function (req, res) {
    res.render('index', { title: 'Express'});
});

module.exports = router;