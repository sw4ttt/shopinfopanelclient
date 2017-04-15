var express = require('express');
var app = express();
var _ = require('lodash');
var S = require('string');
var http = require('http').createServer(app);
var odbcwrapperphp = "./sw4ttt_modules/OdbcWrapperPhp/odbcwrapperphp.php";
var urlServer = 'https://shopinfopanel.herokuapp.com/api/test';
//var bodyParser = require('body-parser');
// var config = require('./models/config/model.js');
//var confighelper = new confighelper();
io = require('socket.io').listen(http);

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
http.listen(3000, function(){
    console.log('listening on *:3000');
});

var dbHelper = require('./models/utils/dbHelper/model')

dbHelper.test(function (err,response) {
    if (err)
        console.log("dbHelper-err=",err)
    console.log("dbHelper-response=",response)
})

// var cron = require('./models/utils/cron/model');
//
// cron.init(urlServer);
// cron.salesCron({data:"testCron"});

