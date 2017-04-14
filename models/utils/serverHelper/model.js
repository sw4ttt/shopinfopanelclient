/**
 * Created by Oscar Marquez on 6/3/2017.
 */
"use strict";
var express = require('express');
var _ = require('lodash');
var request = require('request');

var model = {};

model.sendData = function (data,callback)
{
    if (!checkData(data))
        return callback({key:"INVALID_DATA_FORMAT",msg:"Param Data has invalid format."});
    request(
        {
            method: 'POST',
            uri: 'https://shopinfopanel.herokuapp.com/api/test',
            json: true,
            body: data
        }
        , function (error, response, body) {

            if (error)
                return callback({key:"ERROR_CONNECTING_TO_SERVER",msg:error});
            if (response.statusCode == 200)
            {
                return callback(null,{success:true, data:body});
            }
            else
            {
                return callback({key:"ERROR_SERVER_RESPONSE",status:response.statusCode,msg:response.statusMessage});
            }

        }
    )
};

var checkData = function (data) {
    return _.isObject(data);
}

module.exports = model;