var _ = require('lodash');
var sqlite3 = require('sqlite3').verbose();
var _ = require('lodash');
var dbpath = "config.db";
var schema = require('./schema.js');

_.forEach(schema, function(value) {
    console.log(value);
});

var model = function () {};

model.prototype.initConfig = function (callback)
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

module.exports = model;