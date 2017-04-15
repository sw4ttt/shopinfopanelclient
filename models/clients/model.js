/**
 * Created by Oscar Marquez on 6/3/2017.
 */
"use strict";
var _ = require('lodash');
var S = require('string');
var squel = require('squel');
var dbHelper = require('././model.js')
var model = {};

var fields = [
    "Nombre",
    "Descripcion",
    "Clave"
]

model.get = function (query,callback)
{
    var test = squel.select()
        .fields(fields)
        .from("Susuarios")
        .where("Nombre='CAJA1X'")
        .toString();

    dbHelper.get(test,function (err,response) {
        if (err)
            return callback(err);
        else
            return callback(null,response);
    })
};

module.exports = model;