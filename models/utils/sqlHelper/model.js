/**
 * Created by Oscar Marquez on 6/3/2017.
 */
'use strict'
var _ = require('lodash')
var runner = require('child_process')
var async = require('async')
var S = require('string')
var path = require('path')
var normalize = require('normalize-path')
var configObject = require('./../../../config.json')
var fs = require('fs')
var configFile = require('./../../../config.json')
var sql = require('mssql')

var model = {}

model.get = function (query, callback) {
  var configSql = _.pick(configFile, ['user', 'password', 'server', 'database'])
  sql.connect(configSql, function (err) {
    if (err) return callback(err)
    else {
      // var query = "SELECT TOP 10 NUMFACTURA,CODCLIENTE,FECHA,HORA,TOTALBRUTO,TIPODOC FROM ICGFRONT2015.dbo.FACTURASVENTA ORDER BY FECHA DESC";
      new sql.Request().query(query, function (err, result) {
        return err ? callback(err) : callback(null, _.get(result, 'recordset', []))
      })
    }
  })
}

module.exports = model