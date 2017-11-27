var express = require('express')
var app = express()
var _ = require('lodash')
var S = require('string')
var http = require('http').createServer(app)

var config = require('./models/config/model')
var cron = require('./models/utils/cron/model')
var router = require('./api/router')
//var bodyParser = require('body-parser');
// var config = require('./models/config/model.js');
//var confighelper = new confighelper();
io = require('socket.io').listen(http)

app.use(express.static(__dirname + '/public'))
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

// const sql = require('mssql')
// const configSql = {
//   user: 'sa',
//   password: 'boner1991',
//   server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
//   database: 'ICGFRONT2015',
//
//   options: {
//     encrypt: true // Use this if you're on Windows Azure
//   }
// }
//
// sql.connect(configSql,function (err) {
//   if(err)console.log("ERROR SQL=",err);
//   else{
//     var query = "SELECT TOP 10 NUMSERIE,NUMFACTURA,CODCLIENTE,FECHA,HORA,TOTALBRUTO,TOTALIMPUESTOS,TOTALNETO,TOTALCOSTE,TIPODOC FROM ICGFRONT2015.dbo.FACTURASVENTA ORDER BY FECHA DESC";
//     new sql.Request().query(query,function (err, result) {
//
//
//
//       console.log(result)
//     })
//
// // Stored Procedure
//
//     // new sql.Request()
//     //   .input('input_parameter', sql.Int, value)
//     //   .output('output_parameter', sql.VarChar(50))
//     //   .execute('procedure_name', function(err, result){
//     //     // ... error checks
//     //
//     //     console.dir(result)
//     //   })
//   }
//
// })
//
// sql.on('error', function(err){
//   // ... error handler
// })

config.checkConfig(function (err, configObject) {
  if (err) {
    console.log('SYSTEM-CONFIG-ERROR=', err)
  }
  else {
    app.use('/', router)

    io.on('connection', function (socket) {
      console.log('User connected')
      socket.on('disconnect', function () {
        console.log('User disconnected')
      })
    })

    http.listen(3000, function () {
      console.log('listening on *:3000')
    })

    http.on('tlsClientError', function (e, socket) {
      console.log('tlsError')
      console.log(e)
    })

    http.on('clientError', function (e) {
      console.log('clientError')
      console.log(e)
    })

    http.on('resumeSession', function (id, cb) {
      console.log('resumeSess ' + id.toString('hex'))
    })

    var ioClient = require('socket.io-client')(configObject.remoteServer)

    ioClient.on('connect', function () {
      console.log('SOCKET-SERVER: connect')

      ioClient.emit('call', {
        type: 'client',
        msg: 'me conecte desde tienda',
        'idStore': configObject.idStore,
        'nameStore': configObject.nameStore
      }, function (data) {
        console.log('SOCKET-RESPONSE=', data)
      })
      ioClient.on('disconnect', function () {
        console.log('SOCKET-SERVER: disconnect')
      })
    })

    var sales = require('./models/sales/model')

    sales.getDocsIdToday(function (err, response) {
      console.log('getDocsIdToday.err=', JSON.stringify(err))
      console.log('getDocsIdToday.response=', JSON.stringify(response))
      var functions = [];
      _.forEach(response,function(idDoc){
        functions.push(function(callbackAsync) {
          sales.getDocById(idDoc,function(err,response){
            if(err) return callbackAsync(err);
            return callbackAsync(null,response);
          });
        })
      });
      var async = require('async');
      async.series(functions,function(err, docsToSend) {
        if (err)console.log("SALES - CRON - ERROR - async.series.err=",err);
        else{

          console.log("docsToSend=",JSON.stringify(docsToSend));

        }
      });
    })
    // cron.init(configObject.remoteServer);
    // cron.salesCron();
    // cron.clearLogs();

  }
})