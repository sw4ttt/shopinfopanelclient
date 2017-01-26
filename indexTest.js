var express = require('express')
var app = express()
var Stringjs = require('string');
var http = require('http');
var odbcwrapperphp = "./sw4ttt_modules/OdbcWrapperPhp/odbcwrapperphp.php"

// INFORMACION BASICA PARA CONFIGURAR EL CLIENTE DEL SISTEMA LOCAL.
var nombreTienda = "";
var codigoSeg = "JtmzAMVx";
var directorioBD = "D:/Web/a2testbd/DATA";
var infoBusqueda = "userdata";
// ----------------------------------------------------------------.

var processrunner = require('./sw4ttt_modules/processrunner');
processrunner.callServer("http://shopinfopanel.herokuapp.com/api",codigoSeg,odbcwrapperphp,directorioBD+","+infoBusqueda);

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})