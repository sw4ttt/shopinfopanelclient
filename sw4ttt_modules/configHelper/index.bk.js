var sqlite3 = require('sqlite3').verbose();
var rutabd = "config.db";
var httpshop = require('../httpshop');

//var events = require('events');
//var eventEmitter = new events.EventEmitter();
//console.log(this.checkConfigData("http://shopinfopanel.herokuapp.com/api","JtmzAMVx"));
/*
    Data de configuracion
        ID_TIENDA -> local
        NOMBRE_TIENDA -> local
        RUTA_A2 -> local
        CODIGO_SEGURIDAD -> local - (se verifica con servidor)
        NOMBRE_SERVER -> servidor
        SERVER_URL -> servidor
*/
module.exports = 
{
    initConfig: function () 
    {
        var db = new sqlite3.Database(rutabd);
        db.serialize(function ()
        {
            db.run("DROP TABLE IF EXISTS CONFIGURACION");
            db.run("CREATE TABLE IF NOT EXISTS CONFIGURACION (ID_TIENDA, NOMBRE_TIENDA, CODIGO_SEGURIDAD, RUTA_A2, NOMBRE_SERVER, SERVER_URL)");   
            //db.run("INSERT INTO configuracion VALUES (?, ?, ?, ?, ?, ?)", 
                //['001', 'Tienda Prueba 1', 'JtmzAMVx', 'XXXX', 'admin server a2', 'http://shopinfopanel.herokuapp.com/api']);

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
        //db.run("INSERT INTO configuracion VALUES (?, ?, ?, ?, ?, ?)", 
                //['001', 'Tienda Prueba 1', 'JtmzAMVx', 'XXXX', 'admin server a2', 'http://shopinfopanel.herokuapp.com/api']);
    }
    ,
    getConfigData: function (res) 
    {
        //idTienda,nombreTienda,codigoSeguridad,rutaA2
        //serverURL = typeof serverURL  !== 'undefined' ? serverURL : "http://shopinfopanel.herokuapp.com/api";
        var db = new sqlite3.Database(rutabd);
        //db.serialize(function ()
        //{
        db.get("SELECT * FROM CONFIGURACION", function (err, row) 
        {
            if (row !== undefined)
            {
                //console.log("1 !== undefined");
                //console.log(row); 
                //return row; 
                //res.send("ROW STUFF");
                res.json(row);
                //eventEmitter.emit('datarow',row);                
            }
            else
            {
                if (err === null)
                {
                    //console.log("ROW !== undefined, ERR === null ");
                    //console.log(err);
                    //res.send("ERROR STUFF");
                    res.json({ "error":"Not Found" });
                    
                }
                else
                {
                    //console.log("ROW !== undefined, ERR !== null ");
                    //console.log(err);
                    res.json({ "error":"Error Query" });
                }
            }
        });
            /*db.each("SELECT rowid AS id, col1 FROM TiendasInfo", function(err, row) {
                console.log(row.id + ": " + row.col1);
            });*/
        //});
    }
};
/*
        if (err === null)
        {
            console.log(row);
        }
        else
        {
            console.log(err);
        }
*/
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