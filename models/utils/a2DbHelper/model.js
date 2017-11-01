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

var model = {};

var pathScript = normalize(__dirname + "/odbcWrapper.php");
var paramScript = [configObject.a2Path];

/*
    IMPORTANTE:
        -Los campos del select deben estar presente. No puede ser Select *.
 */
model.get = function (query,callback)
{
    if (!query)
    {
        return callback({status:400,key:"PARAM_QUERY_MISSING"});
    }
    else
    {
        paramScript[1] = prepareQuery(query);
        runner.exec("C:/UniServerZ/core/php56/php.exe " + pathScript + " " +paramScript, function(err, dataSQL, stderr)
        {
            // return callbackAsync(null,dataSQL);

            if (S(dataSQL).contains('error'))
                return callback({key:"ERROR_SQL",msg:dataSQL});
            else
            {
                var out = null;
                try {
                    out = JSON.parse(dataSQL);
                }
                catch (e) {
                    out = dataSQL;
                }
                return callback(null,out);
            }
        });
        // console.log("else-!query");
        // return callback({msg:"algun error sql.",key:"ERROR_SQL"});
    }
};

model.checkPath = function (path,callback)
{
    if (!path)
        return callback({status:400,key:"PARAM_PATH_MISSING"});
    fs.open(path+"SOperacionInv.dat", 'a+', function(err, fd){
        if (err)
            return callback(err)
        return callback(null,{success:true});
    });
};

function prepareQuery(query) {
    var tmp = S(query).replaceAll(' ', '*').s;
    return S(tmp).replaceAll(',', '+').s;
}

module.exports = model;