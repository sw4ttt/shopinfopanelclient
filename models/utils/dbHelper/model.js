/**
 * Created by Oscar Marquez on 6/3/2017.
 */
"use strict";
var _ = require('lodash');
var S = require('string');
var moment = require('moment');
var Datastore = require('nedb');
var db = new Datastore({ filename: './db/test.db',autoload: true,timestampData: true });

var model = {};

model.test = function (callback)
{
    var doc = { hello: 'world'
        , n: 5
        , today: new Date()
        , nedbIsAwesome: true
        , notthere: null
        , notToBeSaved: undefined  // Will not be saved
        , fruits: [ 'apple', 'orange', 'pear' ]
        , infos: { name: 'nedb' }
    };
    var a = new Date();

    db.insert(doc, function (err, newDoc) {   // Callback is optional
        if (err)
            return callback(err)

        var mydate = new Date(newDoc.createdAt);
        var str = mydate.toISOString();

        console.log("dateini=",newDoc.createdAt)
        console.log("date1-S=",moment().format("YYYY-MM-DD HH:mm"))
        console.log("date1-C=",moment("2017-04-16T08:45:36.350Z").format("YYYY-MM-DD-HH:mm"))
        console.log("date2-S=",moment.utc().subtract(4, "H").format("YYYY-MM-DD-HH:mm"))
        console.log("date2-C=",moment.utc(newDoc.createdAt).subtract(4, "H").format("YYYY-MM-DD HH:mm"))
        // console.log("dateTest=",moment(moment(newDoc.createdAt).format()).format("YYYY-MM-DD HH:mm"))
        return callback(null,newDoc);
        // newDoc is the newly inserted document, including its _id
        // newDoc has no key called notToBeSaved since its value was undefined
    });

};

module.exports = model;
