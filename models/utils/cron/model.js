/**
 * Created by Oscar Marquez on 6/3/2017.
 */
"use strict";
var express = require('express');
var _ = require('lodash');
var cron = require('node-schedule');
var serverHelper = require('./../serverHelper/model')

var model = {

};

model.init = function (url)
{
    this.url = url;
};

model.salesCron = function (data)
{
    var j = cron.scheduleJob('*/30 * * * * *', function()
    {
        serverHelper.sendData(data,model.url,function (err,response) {
            if (err)
                console.log("CRON - err=",err)
            else
            {
                console.log("CRON - response=",response)
            }
        })
    });
    //j.cancel();
};

module.exports = model;