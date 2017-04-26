var express = require('express');
var app = express();
var _ = require('lodash');
var S = require('string');
var http = require('http').createServer(app);
var odbcwrapperphp = "./sw4ttt_modules/OdbcWrapperPhp/odbcwrapperphp.php";
// var urlServer = 'https://shopinfopanel.herokuapp.com/api/test';
var config = require('./models/config/model')
var cron = require('./models/utils/cron/model');
var router = require('./api/router');
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
// var nombreTienda = "Tienda001";
// var codigoSeg = "JtmzAMVx";
// var directorioBD = "C:/a2Softway/Empre001/DATA"+"/";//C:\a2Softway\Empre001\Data
// var infoBusqueda = "userdata";
// ----------------------------------------------------------------.



config.checkConfig(function (err,configObject) {
    if (err)
    {
        console.log("SYSTEM-CONFIG-ERROR=",err)
    }
    else
    {
        app.use('/', router);

        io.on('connection', function(socket)
        {
            console.log('User connected');
            socket.on('disconnect', function ()
            {
                console.log('User disconnected');
            });
        });

        http.listen(3000, function(){
            console.log('listening on *:3000');
        });

        var ioClient = require('socket.io-client')(configObject.remoteServer);

        ioClient.on('connect', function(){
            console.log('SOCKET-SERVER: connect')

            ioClient.emit('call', {type:"client",msg:"me conecte desde tienda"});
            ioClient.on('disconnect', function(){
                console.log('SOCKET-SERVER: disconnect')
            });
            ioClient.on('newClient', function(data){
                console.log('SOCKET-SERVER: ',data.msg);
            });
        });

        cron.init(configObject.remoteServer);
        cron.salesCron();
        cron.clearLogs();

    }
})





// console.log("process.env=",process.env)

// cron.init(urlServer);
// cron.salesCron();
// cron.clearLogs();
