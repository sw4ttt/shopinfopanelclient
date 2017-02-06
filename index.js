var express = require('express')
var app = express()
var Stringjs = require('string');
var http = require('http').createServer(app);
var odbcwrapperphp = "./sw4ttt_modules/OdbcWrapperPhp/odbcwrapperphp.php";
var bodyParser = require('body-parser');

io = require('socket.io').listen(http);


app.use(express.static(__dirname + '/public'));
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


// INFORMACION BASICA PARA CONFIGURAR EL CLIENTE DEL SISTEMA LOCAL.
var nombreTienda = "Tienda001";
var codigoSeg = "JtmzAMVx";
var directorioBD = "D:/a2testbd/DATA"+"/";
var infoBusqueda = "userdata";
// ----------------------------------------------------------------.

//var processrunner = require('./sw4ttt_modules/processrunner');
//processrunner.callServer("http://shopinfopanel.herokuapp.com/api",codigoSeg,odbcwrapperphp,directorioBD+","+infoBusqueda);

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
app.get('/potato', function(req, res)
{
  //res.sendfile('index.html', { root: __dirname + '/views/pages' });
  res.send("potato res.");
});

io.on('connection', function(socket){
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