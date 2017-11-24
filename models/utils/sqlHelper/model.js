/**
 * Created by Oscar Marquez on 6/3/2017.
 */
"use strict";
var _ = require('lodash');
var runner = require("child_process");
var async = require('async');
var S = require('string');
var path = require('path');
var normalize = require('normalize-path');
var configObject = require('./../../../config.json')
var fs = require('fs');
var configFile = require('./../../../config.json')
var sql = require('mssql');

var model = {};

var pathScript = normalize(__dirname + "/odbcWrapper.php");
var paramScript = [configObject.a2Path];
/*
    IMPORTANTE:
        -Los campos del select deben estar presente. No puede ser Select *.
 */
model.get = function (query,callback)
{

};

module.exports = model;