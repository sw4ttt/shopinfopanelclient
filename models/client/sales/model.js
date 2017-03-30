/**
 * Created by Oscar Marquez on 6/3/2017.
 */
"use strict";
var _ = require('lodash');
var runner = require("child_process");
var async = require('async');
var S = require('string');
var squel = require('squel');
var dbHelper = require('./../../utils/dbHelper/model.js')
var model = {};

var fields = [
    "Nombre",
    "DescripcionX",
    "Clave"
]

model.get = function (query,callback)
{
    var test = squel.select()
        .fields(fields)
        .from("Susuarios")
        .where("Nombre='CAJA1'")
        .toString();

    dbHelper.get(test,function (err,response) {
        if (err)
            return callback(err);
        callback(null,response);
    })

    // callback(null,{msg:test})

};

module.exports = model;