var express = require('express')
var app = express()
var Stringjs = require('string');
var cron = require('node-schedule');

var http = require('http');

var runner = require("child_process");
var argsString = "value1,value2,value3";
var phpScriptPath = "testdbism.php";

var j = cron.scheduleJob('*/1 * * * *', function()
{
  console.log('CRON: START');  
  //----------------------------------------------------------------------------------------------
  runner.exec("php " + phpScriptPath + " " +argsString, function(err, phpResponse, stderr) 
  {
      if(err) 
      {
        console.log(err);
      }
      if(phpResponse)
      {
        //console.log( phpResponse+"<>>>>> "+ phpResponse.length);
        var dataUsableLocal = JSON.parse(phpResponse);
        console.log(dataUsableLocal);
        //------------------------------------
        http.get("http://shopinfopanel.herokuapp.com/data/"+phpResponse, function(res) 
        {
            var body = ''; // Will contain the final response
            // Received data is a buffer.
            // Adding it to our body
            res.on('data', function(data){
              body += data;
            });
            // After the response is completed, parse it and log it to the console
            res.on('end', function() {
              //var parsed = JSON.parse(body);
              console.log("SERVER SAID: "+body.toString());
            });
        })
        // If any error has occured, log error to console
        .on('error', function(e) {
          console.log("Got error: " + e.message);
        });
        //------------------------------------
        }
    });
  //----------------------------------------------------------------------------------------------
});


app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})