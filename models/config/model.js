/**
 * Created by Oscar Marquez on 6/3/2017.
 */
"use strict";
var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var dbPath = "config.db";
var _ = require('lodash');
var S = require('string');
var shortid = require('shortid');

var table = "configuration";
var fields = [
    "idStore",
    "nameStore",
    "codeStore",
    "pathA2",
    "nameServer",
    "urlServer"
]

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

var model = {};

model.resetConfig = function (callback)
{
    var db = new sqlite3.Database(dbPath);
    db.serialize(function ()
    {
        db.run("DROP TABLE IF EXISTS CONFIGURATION", function (err)
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
        var auxFields = '';
        _.forEach(fields,function (field) {
            auxFields = auxFields + field +",";
        })
        auxFields = S(auxFields).chompRight(',').s;
        db.run("CREATE TABLE IF NOT EXISTS CONFIGURATION ("+auxFields+")");
    });
    db.close();
}
model.initConfig = function (callback)
{
    var db = new sqlite3.Database(dbPath);
    db.serialize(function ()
    {
        db.run("DROP TABLE IF EXISTS CONFIGURATION", function (err)
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
        db.run("CREATE TABLE IF NOT EXISTS CONFIGURATION (idStore,nameStore,codeStore,pathA2,nameServer,urlServer");
        //db.run("INSERT INTO configuracion VALUES (?, ?, ?, ?, ?, ?)",
        //['001', 'Tienda Prueba 1', 'JtmzAMVx', 'XXXX', 'admin server a2', 'http://shopinfopanel.herokuapp.com/api']);

    });
    db.close();
}
model.getConfig = function ()
{
};

module.exports = model;