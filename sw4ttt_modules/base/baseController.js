/**
 * Created by Oscar Marquez on 6/3/2017.
 */
/**
 * Created by Oscar Marquez on 6/3/2017.
 */
"use strict";
var express = require('express');
//var configRouter = express.Router();
//var confighelper = require('../../sw4ttt_modules/confighelper/confighelper.js');
//var confighelper = new confighelper();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var baseController = function () {};
baseController.prototype();

baseController.getconfig = function ()
{
}



module.exports = baseController;