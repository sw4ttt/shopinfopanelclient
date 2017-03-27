/**
 * Created by Oscar Marquez on 6/3/2017.
 */
"use strict";
var express = require('express');
var router = express.Router();



router.use('/sales', require('./sales'));
router.use('/clients', require('./clients'));


module.exports = router;
