var sqlite3 = require('sqlite3').verbose();
var _ = require('lodash');
var S = require('string');
var dbPath = "config.db";
//var schema = require('./schema.js');

var model = {};

model.insertData = function (table,data,callback)
{
    if (!_.isString(table) || !_.isArray(data)) return callback(new Error("PARAM_WRONG_TYPE"));
    model.existTable(table,function (err,exist) {
        if (!exist)
            callback(err);

        var db = new sqlite3.Database(dbPath);

        _.forEach(data, function(value) {
            console.log(value);
        });

        // _.trimEnd('-_-abc-_-', '_-');

        var qt = "";
        for (var i = 0; i < data.length; i++) {
            qt = qt +",";
        }
        qt = S(qt).chompRight(',').s;
        var query = "INSERT INTO "+_.toUpper(table)+" VALUES ("+qt+")";
        var stmt = db.prepare(query);
        stmt.run(null,userData.nombre,userData.edad);
        stmt.finalize();
        db.close();
    })
}

model.updateData = function (callback)
{
    var db = new sqlite3.Database(dbPath);
    db.serialize(function ()
    {
        db.run("UPDATE tbl SET name = $name WHERE id = $id", {
            $id: 2,
            $name: "bar"
        });
    });
    db.close();
}

model.getData = function (table,callback)
{
    if (!_.isString(table)) return callback(new Error("PARAM_TYPE"));
    var db = new sqlite3.Database(dbPath);

    db.all("SELECT * FROM "+_.toUpper(table),function (err,rows) {
        if(err)
            return callback(null,undefined);
        return callback(null,rows);
    });
    db.close();
}

model.existTable = function (table,callback)
{
    if (!_.isString(table)) return callback(new Error("param on existTable - table it's not STRING!"));
    var db = new sqlite3.Database(dbPath);
    db.serialize(function () {
        db.all("select name from sqlite_master where type='table'", function (err, tableList) {
            if (err) return callback(err);
            // return callback(null,))
            if (_.find(tableList, function(tableItem) { return _.toUpper(table) === _.toUpper(tableItem.name);}))
                return callback(null,true);
            return callback(null,false);
        });
    });
    db.close();
}


module.exports = model;