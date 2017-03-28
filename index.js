var express = require('express');
var app = express();
var _ = require('lodash');
var S = require('string');
var http = require('http').createServer(app);
var odbcwrapperphp = "./sw4ttt_modules/OdbcWrapperPhp/odbcwrapperphp.php";
var databaseHelper = require("./sw4ttt_modules/dbHelper/model.js");
//var bodyParser = require('body-parser');
// var config = require('./models/config/model.js');
//var confighelper = new confighelper();
io = require('socket.io').listen(http);

// config.resetConfig(function (err,response) {
//     if (err)
//         console.log(err);
//     console.log("response=",response);
// })

// var queryTest = "";
// var data = ['data1','data2','data3','data4'];
// // _.forEach(data, function(value) {
// //     queryTest = queryTest + value + ',';
// // });
// var qt = "";
// for (var i = 0; i < data.length; i++) {
//     qt = qt +"?,";
// }
// qt = S(qt).chompRight(',').s;
// var query = "INSERT INTO "+_.toUpper("tabla")+" VALUES ("+qt+")";
// console.log("queryTest=<"+query+">");
// console.log("EXIST- configuration=");
// databaseHelper.getData("configuration",function (err,response) {
//         if (err) console.log("ERR en existTable =",err);
//         if (response)
//         {
//             console.log(response);
//         }
//         else
//             console.log("NOT response");
//
//     })
// databaseHelper.existTable("users",function (err,response) {
//     if (err) console.log("ERR en existTable =",err);
//     if (response)
//         console.log("FOUND");
//     else
//         console.log("NOT FOUND");
//
// })
//config.initConfig();
//confighelper.test();

app.use(express.static(__dirname + '/public'));
// create application/json parser
//var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
//var urlencodedParser = bodyParser.urlencoded({ extended: false })

// INFORMACION BASICA PARA CONFIGURAR EL CLIENTE DEL SISTEMA LOCAL.
var nombreTienda = "Tienda001";
var codigoSeg = "JtmzAMVx";
var directorioBD = "C:/a2Softway/Empre001/DATA"+"/";//C:\a2Softway\Empre001\Data
var infoBusqueda = "userdata";
// ----------------------------------------------------------------.

//var processrunner = require('./sw4ttt_modules/processrunner');
//processrunner.callServer("http://shopinfopanel.herokuapp.com/api",codigoSeg,odbcwrapperphp,directorioBD+","+infoBusqueda);

var router = require('./api/router');
//var configrouter = require('./routers/configrouter');

app.use('/', router);
//app.use('/config', configrouter);

/*
app.get('/', function (req, res) 
{
    
})
*/
io.on('connection', function(socket)
{
    console.log('User connected');
    socket.on('disconnect', function () 
    {
      console.log('User disconnected');
    });
});

/*
app.listen(3000, function () {
  console.log('App listening on port 3000!')
})
*/
http.listen(3333, function(){
    console.log('listening on *:3333');
});