var sqlite3 = require('sqlite3').verbose();
var rutabd = "config.db";
var httpshop = require('../httpshop');

//console.log(this.checkConfigData("http://shopinfopanel.herokuapp.com/api","JtmzAMVx"));
module.exports = 
{
    initConfig: function (idTienda,nombreTienda,codigoSeguridad,rutaA2) 
    {
        var db = new sqlite3.Database(rutabd);
        db.serialize(function ()
        {
            db.run("DROP TABLE IF EXISTS configuracion");
            db.run("CREATE TABLE IF NOT EXISTS configuracion (ID_TIENDA, NOMBRE_TIENDA, CODIGO_SEGURIDAD, RUTA_A2, SERVER_URL)");   
        });
        db.close();
    }
    ,
    checkConfigData: function () 
    {
        var db = new sqlite3.Database(rutabd);
        var respuesta = false;
        db.serialize(function ()
        {
            db.get("SELECT * FROM configuracion", function (err, row) 
            {
                console.log(row);
                if(typeof row === 'undefined')
                    return false;                
                respuesta = httpshop.checkCodigoTienda(row.SERVER_URL,row.CODIGO_SEGURIDAD);
            });                
        });
        db.close();

        return respuesta;
    }
    ,
    setConfigData: function (idTienda,nombreTienda,codigoSeguridad,rutaA2) 
    {
        //serverURL = typeof serverURL  !== 'undefined' ? serverURL : "http://shopinfopanel.herokuapp.com/api";
        /*db.run("INSERT INTO configuracion VALUES (?, ?, ?, ?, ?)", 
                ['001', 'Tienda Prueba 1', 'JtmzAMVx', 'XXXX', 'http://shopinfopanel.herokuapp.com/api']);*/
    }
    ,
    getConfigData: function (idTienda,nombreTienda,codigoSeguridad,rutaA2) 
    {
        //serverURL = typeof serverURL  !== 'undefined' ? serverURL : "http://shopinfopanel.herokuapp.com/api";
    }
};
/*
var stmt = db.prepare("INSERT INTO clientes VALUES (?,?,?)");
stmt.run(null,userData.nombre,userData.edad);
stmt.finalize();
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