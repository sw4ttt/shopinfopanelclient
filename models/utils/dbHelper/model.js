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
        return callback({status:400,key:"PARAM_QUERY_MISSING"});
    async.series(
        [
            function(callbackAsync) {
                paramScript[1] = prepareQuery(query);
                runner.exec("D:/Web/UniServerZ/core/php56/php.exe " + pathScript + " " +paramScript, function(err, dataSQL, stderr)
                {
                    if(err)
                        return callbackAsync(err);
                    else
                    if(stderr)
                        return callbackAsync({err:stderr});
                    else
                    {
                        // if(_.isString(dataSQL))
                        //     return callbackAsync(null,(dataSQL));
                        // return callbackAsync(null,JSON.parse(dataSQL));
                        //
                        try {
                            return callbackAsync(null,JSON.parse(dataSQL));
                        } catch (e) {
                            return callbackAsync(null,(dataSQL));
                        }

                    }

                });
            }
        ],
        function(err, response) {
            if (err)
            {
                console.log("async.series.err=",err);
                return callback(err);
            }
            return callback(null,response[0]);
        });
};

function prepareQuery(query) {
    var tmp = S(query).replaceAll(' ', '*').s;
    return S(tmp).replaceAll(',', '+').s;
}

module.exports = model;