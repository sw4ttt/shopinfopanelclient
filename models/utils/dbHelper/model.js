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
        callback({status:400,key:"PARAM_QUERY_MISSING"});
    else
    async.series(
        [
            function(callbackAsync) {
                paramScript[1] = prepareQuery(query);
                runner.exec("D:/Web/UniServerZ/core/php56/php.exe " + pathScript + " " +paramScript, function(err, dataSQL, stderr)
                {
                    callbackAsync(null,dataSQL);
                });
            }
        ],
        function(err, response) {
            if (S(response).contains('error'))
                callback({msg:"algun error sql.",key:"ERROR_SQL"});
            else
            {
                var out = null;
                try {
                    out = JSON.parse(response[0]);
                }
                catch (e) {
                    out = response[0];
                }
                callback(null,out);
            }
        });
};

function prepareQuery(query) {
    var tmp = S(query).replaceAll(' ', '*').s;
    return S(tmp).replaceAll(',', '+').s;
}

module.exports = model;