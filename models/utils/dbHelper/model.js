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

var model = {};

var pathScript = normalize(__dirname + "/odbcWrapper.php");
var paramScript = ["C:/a2Softway/Empre001/Data/"];

/*
    IMPORTANTE:
        -Los campos del select deben estar presente. No puede ser Select *.
 */
model.get = function (query,callback)
{
    if (!query)
    {
        console.log("if-!query");
        return callback({status:400,key:"PARAM_QUERY_MISSING"});
    }
    else
    {
        console.log("else-!query");
        return callback({msg:"algun error sql.",key:"ERROR_SQL"});
    }
};

function prepareQuery(query) {
    var tmp = S(query).replaceAll(' ', '*').s;
    return S(tmp).replaceAll(',', '+').s;
}

module.exports = model;