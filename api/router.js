"use strict";
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    var now = new Date(Date.now()).toLocaleString();
    console.log('Time: ', now);
    next();
});
// define the home page route
router.get('/', function (req, res) 
{
  res.sendFile('dashboard.html', {root: './views/dashboard'});
});

router.use('/api/data', require('./data'));
router.use('/api/config', require('./config'));

module.exports = router