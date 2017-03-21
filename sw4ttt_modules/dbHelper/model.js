var _ = require('lodash');
var sqlite3 = require('sqlite3').verbose();
var _ = require('lodash');
var dbPath = "config.db";
//var schema = require('./schema.js');

var model = function () {

};

model.prototype.insertData = function (callback)
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

model.prototype.updateData = function (callback)
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

model.prototype.getData = function (columns,callback)
{
    var db = new sqlite3.Database(dbPath);
    db.all("SELECT * FROM configuration",function (err,rows) {
        if(err)
            return callback(null,undefined);
        return callback(null,rows);
    });
    db.close();
}

model.prototype.existTable = function (table,callback)
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