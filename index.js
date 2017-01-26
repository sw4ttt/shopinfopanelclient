var express = require('express')
var app = express()
var Stringjs = require('string');
var http = require('http');
var odbcwrapperphp = "./sw4ttt_modules/OdbcWrapperPhp/odbcwrapperphp.php"
app.use(express.static(__dirname + '/public'));

// INFORMACION BASICA PARA CONFIGURAR EL CLIENTE DEL SISTEMA LOCAL.
var nombreTienda = "";
var codigoSeg = "JtmzAMVx";
var directorioBD = "C:/a2JEANSWEST/Empre001/DATA/";
var infoBusqueda = "userdata";
// ----------------------------------------------------------------.

var processrunner = require('./sw4ttt_modules/processrunner');
processrunner.callServer("http://shopinfopanel.herokuapp.com/api",codigoSeg,odbcwrapperphp,directorioBD+","+infoBusqueda);

app.get('/', function(req, res)
{
  //res.sendfile('index.html', { root: __dirname + '/views/pages' });
  res.sendFile('config.html', {root: __dirname+ '/views/pages'});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})