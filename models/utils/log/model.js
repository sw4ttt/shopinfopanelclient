/**
 * Created by Oscar Marquez on 6/3/2017.
 */
"use strict";
var _ = require('lodash');
var S = require('string');
var moment = require('moment');
var squel = require('squel');
var async = require('async');
var dataStore = require('nedb');
var db = new dataStore({ filename: './db/logs.db',autoload: true,timestampData: true });
var model = {};

model.save = function (event,status,callback)
{
    db.insert({event:event,status:status},function (err,response) {
        if (err)
            return callback(err);
        return callback(null,{success:true});
    })
};

model.clean = function (callback)
{
    var functions = [];
    db.find({ createdAt: { $lte: moment.utc().subtract(7, 'days') }}, function (err, docs) {
        if (docs.length>0)
        {
            _.forEach(docs,function(doc)
            {
                functions.push(function(callbackAsync) {
                    db.remove({ _id: doc._id }, {}, function (err, numRemoved) {
                        if (err)return callback(err);
                        return callbackAsync(null,numRemoved);
                    });
                })
            })
            async.parallel(functions,function(err, results) {
                if (err)return callback(err);
                db.persistence.compactDatafile();
                return callback(null,results);
            });
        }
        else
            return callback(null,{success:false,msg:"Nada que limpiar"});
    });
};

module.exports = model;