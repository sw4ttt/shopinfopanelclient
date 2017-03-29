/**
 * Created by Oscar Marquez on 6/3/2017.
 */
"use strict";
var _ = require('lodash');
var runner = require("child_process");
var async = require('async');
var fs = require('fs');

var model = {};

var rutaScript = __dirname + "/../../../../sw4ttt_modules/OdbcWrapperPhp/odbcwrapperphp.php";
// var paramScript = ["userdata"];
var paramScript = ["C:/a2Softway/Empre001/Data/"];

model.checkDb = function (dbPath,callback){
    if (fs.existsSync(dbPath))
        return callback(null,true);
    else return callback(false);
}
model.get = function (query,callback)
{
    async.series(
        [
            function(callback1) {
                // do some stuff ...
                // callback1(null,{data:"todo cool1"});
                paramScript[1]=query.toString();
                console.log("paramScript=",paramScript)
                runner.exec("D:/Web/UniServerZ/core/php56/php.exe " + rutaScript + " " +paramScript, function(err, dataSQL, stderr)
                {
                    if(err)
                        return callback1(err);
                    else
                    if(stderr)
                        return callback1(null,{err:stderr});
                    else
                        return callback1(null,JSON.parse(dataSQL));
                });
            }
        ],
        function(err, results) {
            if (err)
            {
                console.log("async.series.err=",err);
                return callback(err);
            }
            else
            {
                // console.log("async.series.results=",results[0])
                return callback(null,results[0]);
            }
        });
};

module.exports = model;