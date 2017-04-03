/**
 * Created by Oscar Marquez on 6/3/2017.
 */
"use strict";
var _ = require('lodash');
var S = require('string');
var squel = require('squel');
var dbHelper = require('./../../utils/dbHelper/model.js')
var model = {};

var fields = [
    "FTI_DOCUMENTO",
    "FTI_TIPO",
    "FTI_FECHAEMISION",
    "FTI_TOTALNETO"
];

model.getToday = function (callback)
{
    //where("table1.id = ?", 2)
    var test = squel.select()
        .fields(fields)
        .from("SOperacionInv")
        // .where("FTI_DOCUMENTO='00049139'")
        .where("FTI_FECHAEMISION = ?", '2017-03-28 00:00')
        .toString();

    dbHelper.get(test,function (err,response) {
        if (err)
            return callback(err);
        else
            return callback(null,response);
    })
};

model.get = function (query,callback)
{
    var test = squel.select()
        .fields(fields)
        .from("SOperacionInv")
        .where("FTI_DOCUMENTO='00049139'")
        .toString();

    dbHelper.get(test,function (err,response) {
        if (err)
            return callback(err);
        else
            return callback(null,response);
    })
};

module.exports = model;