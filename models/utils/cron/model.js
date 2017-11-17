/**
 * Created by Oscar Marquez on 6/3/2017.
 */
"use strict";
var express = require('express');
var _ = require('lodash');
var cron = require('node-schedule');
var serverHelper = require('./../serverHelper/model');
var sales = require('./../../sales/model');
var log = require('./../log/model');
var async = require('async');
var model = {

};

model.init = function (url)
{
    this.url = url;
};

model.salesCron = function ()
{
    // Cambiar a cada 30 min (esta cada 30seg)
    var j = cron.scheduleJob('*/10 * * * * *', function()
    {
        sales.getDocsIdToday(function (err,docsIds) {

            if (err)
            {
                console.log("CRON - SALES - ERR=",JSON.stringify(err));

                log.save('CRON-SALES-TODAY-GET-DOCS','ERR',_.get(err,'msg',"ERROR SIN MENSAJE"),function (errLog,respLog) {
                    if (errLog)console.log("LOG-ERR-Cron-SenData-Save=",errLog)
                })
            }
            else{
                if(docsIds.length > 0){
                    console.log("\n\n----------------------")
                    console.log("Facturas de Hoy = ",docsIds);
                    serverHelper.existDocsData(docsIds,model.url+"/api/sales/docs-exist",function (errSend,respSend) {
                        if (errSend)
                        {
                            log.save('CRON-SALES-TODAY','ERR',errSend.msg,function (errLog,respLog) {
                                if (errLog)console.log("LOG-ERR-Cron-SenData=",errLog)
                            });
                            console.log("CRON - Sales: ERROR =",errSend)
                        }
                        else{
                            if(_.has(respSend,'data.data') && _.isArray(respSend.data.data)){
                                var respDocsIds = _.map(respSend.data.data,'numDoc');
                                console.log("Facturas de Hoy en SERVER=",respDocsIds);
                                var functions = [];
                                var missingIds = _.reject(docsIds,function(item){
                                    return _.find(respDocsIds, function(respId){
                                        return respId === item;
                                    });
                                });
                                console.log("Facturas de Hoy Faltantes en SERVER=",JSON.stringify(missingIds));
                                if(missingIds.length>0){
                                    _.forEach(missingIds,function(idDoc)
                                    {
                                        functions.push(function(callbackAsync) {
                                            sales.getDocById(idDoc,function(err,response){
                                                if(err) return callbackAsync(err);
                                                return callbackAsync(null,_.first(response));
                                            });
                                        })
                                    });
                                    async.series(functions,function(err, docsToSend) {
                                        if (err)console.log("SALES - CRON - ERROR - async.series.err=",err);
                                        else{
                                            // console.log("async.series.results=",JSON.stringify(_.map(docsToSend,'doc.FTI_DOCUMENTO')));
                                            serverHelper.sendData(docsToSend,model.url+"/api/sales/docs",function (errSend,respSend) {
                                                if (errSend)
                                                {
                                                    // log.save('CRON-SALES-TODAY','ERR',errSend.msg,function (errLog,respLog) {
                                                    //     if (errLog)console.log("LOG-ERR-Cron-SenData=",errLog)
                                                    // });
                                                    console.log("CRON - Sales: ERROR =",errSend)
                                                }
                                                else{
                                                    console.log("CRON - Sales: SUCCESS = Data SEND, response:=",respSend);
                                                }
                                            })
                                        }
                                    });
                                }else{
                                    console.log("CRON - Sales: SUCCESS = Data is SYNC");
                                }
                            }
                        }
                    });
                }
                else{
                    console.log("CRON - Sales: No Docs")
                }
            }
        });
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