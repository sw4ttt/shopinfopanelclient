/**
 * Created by Oscar Marquez on 6/3/2017.
 */
"use strict";
var express = require('express');
var _ = require('lodash');
var S = require('string');
var shortid = require('shortid');
var a2DbHelper = require('./../utils/a2DbHelper/model')
var serverHelper = require('./../utils/serverHelper/model')
var configFile = require('./../../config.json')

var table = "configuration";
var configKeys = [
    "nameStore",
    "idStore",
    "a2Path",
    "remoteServer"
]

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

var model = {};

model.getConfig = function ()
{
    return configFile;
};

model.checkConfig = function (callback)
{
    var missingValue = false;
    _.forEach(configKeys, function(value) {
        if (!_.has(configFile, value))
            missingValue = true;
    });
    if (missingValue)
        return callback({key:"MISSING_VALUES_ON_CONFIG",msg:"Faltan elementos de configuracion en config.json"})

    var invalidValue = false;
    _.forEach(configFile, function(value, key) {
        if (!_.isString(key) || _.isEmpty(value))
            invalidValue = true;
    });
    if (invalidValue)
        return callback({key:"INVALID_VALUES_ON_CONFIG",msg:"Valores invalidados en elementos de configuracion en config.json"})

    a2DbHelper.checkPath(configFile.a2Path,function (err,response) {
        if (err)
            return callback(err);

        serverHelper.sendData({test:"test"},model.getConfig().remoteServer+"/api/test",function (errSend,respSend) {
            if (errSend)
                return callback(errSend);
            return callback(null,configFile);
        })

    })
};

module.exports = model;