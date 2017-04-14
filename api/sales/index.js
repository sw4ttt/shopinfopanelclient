/**
 * Created by Oscar Marquez on 6/3/2017.
 */
"use strict";
var express = require('express');
var router = express.Router();

var controller = require('./controller.js');


router.get('/', controller.all);
router.get('/docs/today', controller.getDocsToday);
router.get('/docs/date/:date', controller.getDocsDate);
router.get('/docs/date/start/:start/end/:end', controller.getDocsRange);
router.get('/date/test', controller.get);



module.exports = router;
