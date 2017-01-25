var express = require('express')
var app = express()
var Stringjs = require('string');
var cron = require('node-schedule');
var http = require('http');
var runner = require("child_process");
var argsString = "userdata,value2,value3";
var phpScriptPath = "testdbism.php";

runner.exec("php " + phpScriptPath + " " +argsString, function(err, stdout, stderr) 
{
    if(stderr) 
    {
        console.log("stderr:"+stderr);
    }
    else
      if(stdout)
      {
          //INFORMACION:
          //  Para la peticion al servidor "shopinfopanel" mandas "stdout" solo.
          //  Para lo demas se necesita JSON.parse.
          //var dataUsableLocal = JSON.parse(stdout);
          console.log(stdout);
          //console.log("--------------------------------");
          //console.log(JSON.stringify(stdout));
          //console.log("--------------------------------");
          //console.log(JSON.parse(stdout));
          //------------------------------------
          ///api/codigo/:codigo/data/:data
          http.get("http://shopinfopanel.herokuapp.com/api/codigo/"+"JtmzAMVx"+"/data/"+stdout, function(res) 
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

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})