/**
 * Created by Oscar Marquez on 6/3/2017.
 */
"use strict";
var express = require('express');
var router = express.Router();

var controller = require('./controller.js');


router.get('/', controller.all);
router.get('/today', controller.getToday);
router.get('/docs/today', controller.getDocsToday);
router.get('/date/:date', controller.get);



module.exports = router;
