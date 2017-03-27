/**
 * Created by Oscar Marquez on 6/3/2017.
 */
"use strict";
var _ = require('lodash');
var runner = require("child_process");

var model = {};

var rutaScript = __dirname + "/../../../sw4ttt_modules/OdbcWrapperPhp/odbcwrapperphp.php";
var paramScript = ["userdata"];
// var paramScript = ["C:/a2Softway/Empre001/Data/","userdata"];
model.get = function (callback)
{
    // return callback(null,"GOOD");
    runner.exec("D:/Web/UniServerZ/core/php56/php.exe " + rutaScript + " " +paramScript, function(err, dataSQL, stderr)
    {
        if(err) callback(err,null);
        console.log("err=",err)
        console.log("stderr=",stderr)
        console.log("dataSQL=",dataSQL)
        if(stderr)
            callback(new Error("PARAM_TYPE"),null);
        else
            if(dataSQL) callback(null,JSON.parse(dataSQL));


        // console.log("dataSQL=",dataSQL)
        // callback(null,"runner.exec cool");
    });

};

module.exports = model;