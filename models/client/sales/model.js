/**
 * Created by Oscar Marquez on 6/3/2017.
 */
"use strict";
var _ = require('lodash');
var runner = require("child_process");
var async = require('async');
var S = require('string');
var dbHelper = require('./../../utils/dbHelper/model.js')
var model = {};

model.get = function (query,callback)
{
    dbHelper.get("SELECT Nombre,Descripcion,Clave FROM Susuarios WHERE Nombre='CAJAXX'",function (err,response) {
        if (err)
            return callback(err);
        callback(null,response);
    })

};

module.exports = model;