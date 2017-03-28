/**
 * Created by Oscar Marquez on 6/3/2017.
 */
"use strict";
var _ = require('lodash');
var runner = require("child_process");
var async = require('async');

var model = {};

var rutaScript = __dirname + "/../../../sw4ttt_modules/OdbcWrapperPhp/odbcwrapperphp.php";
// var paramScript = ["userdata"];
var paramScript = ["C:/a2Softway/Empre001/Data/","userdata"];
model.get = function (callback)
{
    async.series(
        [
            function(callback1) {
                // do some stuff ...
                // callback1(null,{data:"todo cool1"});
                runner.exec("D:/Web/UniServerZ/core/php56/php.exe " + rutaScript + " " +paramScript, function(err, dataSQL, stderr)
                {
                    if(err)
                        callback1(err);
                    else
                    if(stderr)
                        callback1(null,{err:"error stderr"});
                    else
                        callback1(null,JSON.parse(dataSQL));
                });
            }
        ],
        function(err, results) {
            if (err)
                console.log("async.series.err=",err)
            else
            {
                console.log("async.series.results=",results[0])
                callback(null,results[0]);
            }

        });
};

module.exports = model;