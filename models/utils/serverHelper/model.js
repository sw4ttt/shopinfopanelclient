/**
 * Created by Oscar Marquez on 6/3/2017.
 */
"use strict";
var express = require('express');
var _ = require('lodash');
var request = require('request');
var configObject = require('./../../../config.json')

var model = {};

model.sendData = function (docs,url,callback)
{
    if (!checkData(docs))
        return callback({key:"INVALID_DATA_FORMAT",msg:"Param Data has invalid format."});
    var data = {
        docs: docs,
        idStore: configObject.idStore,
        nameStore: configObject.nameStore
    };
    request(
        {
            method: 'POST',
            uri: url,
            json: true,
            body: data
        }
        , function (error, response, body) {

            if (error)
                return callback({key:"ERROR_CONNECTING_TO_SERVER",msg:error});
            if (response.statusCode === 200)
            {
                return callback(null,{success:true, data:body});
            }
            else
            {
                return callback({key:"ERROR_SERVER_RESPONSE",status:response.statusCode,msg:response.statusMessage,data:body});
            }

        }
    )
};

model.existDocsData = function (docsIds,url,callback)
{
    if (!_.isArray(docsIds))
        return callback({key:"INVALID_DATA_FORMAT",msg:"Param Data has invalid format."});
    var data = {
        docsIds: docsIds,
        idStore: configObject.idStore
    };
    request(
        {
            method: 'POST',
            uri: url,
            json: true,
            body: data
        }
        , function (error, response, body) {

            if (error)
                return callback({key:"ERROR_CONNECTING_TO_SERVER",msg:error});
            if (response.statusCode === 200)
            {
                return callback(null,{success:true, data:body});
            }
            else
            {
                return callback({key:"ERROR_SERVER_RESPONSE",status:response.statusCode,msg:response.statusMessage,data:body});
            }

        }
    )
};

var checkData = function (data) {
    return _.isObject(data);
};

module.exports = model;