var _ = require('lodash');
var sqlite3 = require('sqlite3').verbose();
var _ = require('lodash');
var dbPath = "config.db";
//var schema = require('./schema.js');

var model = function () {};
model.prototype.initDbConfig = function (callback)
{
    var db = new sqlite3.Database(dbPath);
    db.serialize(function ()
    {
        db.run("DROP TABLE IF EXISTS CONFIGURACION C",function (err) {
            if(err===null)
                callback(null);
            callback(err);
        });
        db.run("CREATE TABLE IF NOT EXISTS CONFIGURACION (ID_TIENDA, NOMBRE_TIENDA, CODIGO_SEGURIDAD, RUTA_A2, NOMBRE_SERVER, SERVER_URL)",function (err) {
            if(err===null)
                callback(null);
            callback(err);
        });
        db.run("INSERT INTO configuracion VALUES (?, ?, ?, ?, ?, ?)",
        ['001', 'Tienda Prueba 1', 'JtmzAMVx', 'XXXX', 'admin server a2', 'http://shopinfopanel.herokuapp.com/api'],function (err) {
                if(err===null)
                    callback(null);
                callback(err);
        });

    });
    db.close();
}

model.prototype.getData = function (table,callback)
{
    var db = new sqlite3.Database(dbPath);
    db.serialize(function ()
    {
        db.run("DROP TABLE IF EXISTS CONFIGURACION C",function (err) {
            if(err===null)
                callback(null);
            callback(err);
        });
    });
    db.close();
}


module.exports = model;