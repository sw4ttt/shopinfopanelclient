/**
 * Created by Oscar Marquez on 6/3/2017.
 */
'use strict'
var express = require('express')
var _ = require('lodash')
var cron = require('node-schedule')
var serverHelper = require('./../serverHelper/model')
var sales = require('./../../sales/model')
var log = require('./../log/model')
var async = require('async')
var model = {}

model.init = function (url) {
  this.url = url
}

model.salesCron = function () {
  // Cambiar a cada 30 min (esta cada 30seg)
  var j = cron.scheduleJob('*/30 * * * * *', function () {
    sales.getDocsIdToday(function (err, docsIds) {

      if (err) {
        console.log('CRON - SALES - ERR=', JSON.stringify(err))

        log.save('CRON-SALES-TODAY-GET-DOCS', 'ERR', _.get(err, 'msg', 'ERROR SIN MENSAJE'), function (errLog, respLog) {
          if (errLog) console.log('LOG-ERR-Cron-SenData-Save=', errLog)
        })
      }
      else {
        if (docsIds.length > 0) {
          console.log('\n\n----------------------')
          console.log('Facturas de Hoy = ', docsIds)
          serverHelper.existDocsData(docsIds, model.url + '/api/sales/docs-exist', function (errSend, respSend) {
            if (errSend) {
              log.save('CRON-SALES-TODAY', 'ERR', errSend.msg, function (errLog, respLog) {
                if (errLog) console.log('LOG-ERR-Cron-SenData=', errLog)
              })
              console.log('CRON - Sales: ERROR =', errSend)
            }
            else {
              if (_.has(respSend, 'data.data') && _.isArray(respSend.data.data)) {
                var respDocsIds = _.map(respSend.data.data, 'numDoc')
                console.log('Facturas de Hoy en SERVER=', respDocsIds)
                var functions = []
                var missingIds = _.reject(docsIds, function (item) {
                  return _.find(respDocsIds, function (respId) {
                    return respId === item
                  })
                })
                console.log('Facturas de Hoy Faltantes en SERVER=', JSON.stringify(missingIds))
                if (missingIds.length > 0) {
                  _.forEach(missingIds, function (idDoc) {
                    functions.push(function (callbackAsync) {
                      sales.getDocById(idDoc, function (err, doc) {
                        if (err) return callbackAsync(err)
                        return callbackAsync(null, doc)
                      })
                    })
                  })
                  async.series(functions, function (err, docsToSend) {
                    if (err) console.log('SALES - CRON - ERROR - async.series.err=', err)
                    else {
                      // console.log("async.series.results=",JSON.stringify(_.map(docsToSend,'doc.FTI_DOCUMENTO')));
                      console.log("docsToSend=",JSON.stringify(docsToSend));
                      var filteredDocs = _.filter(docsToSend,function(doc){
                        return !_.isEmpty(doc);
                      });

                      console.log("filteredDocs=",JSON.stringify(filteredDocs));

                      if(filteredDocs.length>0){
                        var docsOnChunks = _.chunk(filteredDocs, 2);
                        console.log("CRON - Sales - Send Data - Chunks of 2");
                        _.forEach(docsOnChunks,function(chunk){
                          serverHelper.sendData(chunk,model.url+"/api/sales/docs",function (errSend,respSend) {
                            if (errSend)
                            {
                              // log.save('CRON-SALES-TODAY','ERR',errSend.msg,function (errLog,respLog) {
                              //     if (errLog)console.log("LOG-ERR-Cron-SenData=",errLog)
                              // });
                              console.log("CRON - Sales - Send Data - Chunk: ERROR =",errSend);
                            }
                            else{
                              console.log("CRON - Sales - Send Data - Chunk: SUCCESS = Data SEND, response:=",respSend);
                            }
                          })
                        });
                        console.log("CRON - Sales - END ----------------------\n\n");
                      }
                      else{
                        console.log('CRON - Sales: ERROR = DATA FILTRADA RARA.');
                      }
                    }
                  })
                } else {
                  console.log('CRON - Sales: SUCCESS = Data is SYNC')
                }
              }
            }
          })
        }
        else {
          console.log('CRON - Sales: No Docs')
        }
      }
    })
  })
  //j.cancel();
}

model.clearLogs = function () {

  var j = cron.scheduleJob('0 12 * * 1-7', function () {
    console.log('CRON - Clear Logs')
    log.clean(function (err, response) {
      if (err) {
        log.save('CRON-CLEAN-LOGS', 'ERR', function (errLog, respLog) {
          if (errLog) console.log('LOG-ERR-Cron-CleanLogs=', errLog)
        })
      }
    })
  })
  //j.cancel();
}

module.exports = model