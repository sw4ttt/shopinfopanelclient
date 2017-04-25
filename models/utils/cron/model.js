/**
 * Created by Oscar Marquez on 6/3/2017.
 */
"use strict";
var express = require('express');
var _ = require('lodash');
var cron = require('node-schedule');
var serverHelper = require('./../serverHelper/model')
var sales = require('./../../sales/model')
var log = require('./../log/model')
var model = {

};

model.init = function (url)
{
    this.url = url;
};

model.salesCron = function ()
{
    // Cambiar a cada 30 min (esta cada 30seg)
    var j = cron.scheduleJob('*/30 * * * * *', function()
    {
        console.log("CRON - Sales")
        sales.getDocsToday(function (errSales,docs) {
            if (errSales)
            {
                log.save('CRON-SALES-TODAY-GET-DOCS','ERR',function (errLog,respLog) {
                    if (errLog)console.log("LOG-ERR-Cron-SenData-Save=",errLog)
                })
            }
            else
            {
                if (docs.length>0)
                {
                    // console.log("docs=",docs)
                    serverHelper.sendData(docs,model.url+"/api/",function (errSend,respSend) {
                        if (errSend)
                        {
                            log.save('CRON-SALES-TODAY','ERR',errSend.msg,function (errLog,respLog) {
                                if (errLog)console.log("LOG-ERR-Cron-SenData=",errLog)
                            })
                            console.log("CRON - Sales - ERR=",errSend)
                        }
                        // else
                        //     console.log("respSend=",respSend)
                        // else
                        // {
                        //     log.save('CRON-SALES-TODAY','SUCCESS',function (errLog,respLog) {
                        //         if (errLog)console.log("LOG-ERR-Cron-SenData=",errLog)
                        //     })
                        // }
                    })
                }
            }
        })
    });
    //j.cancel();
};

model.clearLogs = function ()
{

    var j = cron.scheduleJob('0 12 * * 1-7', function()
    {
        console.log("CRON - Clear Logs")
        log.clean(function (err,response) {
            if (err){
                log.save('CRON-CLEAN-LOGS','ERR',function (errLog,respLog) {
                    if (errLog)console.log("LOG-ERR-Cron-CleanLogs=",errLog)
                })
            }
        })
    });
    //j.cancel();
};

module.exports = model;