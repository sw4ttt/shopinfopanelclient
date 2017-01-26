var express = require('express')
var app = express()
var Stringjs = require('string');
var http = require('http');
var odbcwrapperphp = "./sw4ttt_modules/OdbcWrapperPhp/odbcwrapperphp.php"
var bodyParser = require('body-parser')
app.use(express.static(__dirname + '/public'));
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//var sqlite3 = require('sqlite3').verbose();
/*
fs.unlink('config.db', function(err)
{
    if (err) throw err;
    console.log('config.db' + " deleted");
});
*/
/*
var db = new sqlite3.Database('config.db');
db.serialize(function ()
{
  db.run("CREATE TABLE configuracion (ID_TIENDA, NOMBRE_TIENDA, CODIGO_SEGURIDAD)");

  //db.run("INSERT INTO TiendasInfo VALUES (?, ?, ?)", ['001', 'Tienda Prueba 1', 'JtmzAMVx']);

  /*db.each("SELECT * FROM TiendasInfo", function (err, row) {
    console.log(row);
  });*/
  //db.each("SELECT rowid AS id, col1 FROM TiendasInfo", function(err, row) {
      //console.log(row.id + ": " + row.col1);
  //});
//});

//db.close();


// INFORMACION BASICA PARA CONFIGURAR EL CLIENTE DEL SISTEMA LOCAL.
var nombreTienda = "";
var codigoSeg = "JtmzAMVx";
var directorioBD = "C:/a2JEANSWEST/Empre001/DATA"+"/";
var infoBusqueda = "userdata";
// ----------------------------------------------------------------.

var processrunner = require('./sw4ttt_modules/processrunner');
processrunner.callServer("http://shopinfopanel.herokuapp.com/api",codigoSeg,odbcwrapperphp,directorioBD+","+infoBusqueda);

app.get('/', function(req, res)
{
  //res.sendfile('index.html', { root: __dirname + '/views/pages' });
  res.sendFile('config.html', {root: __dirname+ '/views/pages'});
});

app.post('/config', urlencodedParser, function(req, res)
{
  //res.sendfile('index.html', { root: __dirname + '/views/pages' });
  //req.params
  //Stringjs(req.body.rutabd).replaceAll('/', 'X');
  res.send("DATA ENVIADA: ("+req.body.nombre+") - ("+req.body.codigo+") - ("+Stringjs(req.body.rutabd).replaceAll('\\', '/')+")");
});

app.listen(3000, function () {
  console.log('App listening on port 3000!')
})