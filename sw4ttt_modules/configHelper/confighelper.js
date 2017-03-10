var sqlite3 = require('sqlite3').verbose();
var rutabd = "config.db";
var httpshop = require('../httpshop');

var confighelper = function () {};

confighelper.prototype.initConfig = function (callback) 
{
    var db = new sqlite3.Database(rutabd);
    db.serialize(function ()
    {
        db.run("DROP TABLE IF EXISTS CONFIGURACION", function (err)
        {
            if (err === null)
            {
                callback(null, "todo bien");
            }
            else
            {
                callback(err, null);
            }
        });
        db.run("CREATE TABLE IF NOT EXISTS CONFIGURACION (ID_TIENDA, NOMBRE_TIENDA, CODIGO_SEGURIDAD, RUTA_A2, NOMBRE_SERVER, SERVER_URL)");   
        //db.run("INSERT INTO configuracion VALUES (?, ?, ?, ?, ?, ?)", 
            //['001', 'Tienda Prueba 1', 'JtmzAMVx', 'XXXX', 'admin server a2', 'http://shopinfopanel.herokuapp.com/api']);

    });
    db.close();
}
confighelper.prototype.getConfigData = function () 
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
            res.json(row);             
        }
        else
        {
            if (err === null)
            {
                res.json({ "error":"Not Found" });                
            }
            else
            {
                res.json({ "error":"Error Query" });
            }
        }
    });
}



module.exports = confighelper;