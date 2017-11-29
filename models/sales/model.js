/**
 * Created by Oscar Marquez on 6/3/2017.
 */
'use strict'
var _ = require('lodash')
var S = require('string')
var squel = require('squel')
var sqlHelper = require('./../utils/sqlHelper/model')
var moment = require('moment')
// var functions = require('./functions');
var model = {}
// FTI_TIPO: 11 Factura, 12 Dev
var fields = [
  'FTI_DOCUMENTO',
  'FTI_TIPO',
  'FTI_RIFCLIENTE',
  'FTI_FECHAEMISION',
  'FTI_DOCUMENTOORIGEN',
  'FTI_TOTALITEMS',
  'FTI_TOTALBRUTO',
  'FTI_TOTALNETO',
  'FTI_IMPUESTO1MONTO',
  'FTI_HORA'
]

var fieldsDetails = [
  'FDI_CODIGO', // Codigo Articulo
  'FDI_CANTIDAD',
  'FDI_TIPOOPERACION', // Tipo de doc. 11 Fact, 12 Dev
  'FDI_DOCUMENTO', // N.Factura
  'FDI_DOCUMENTOORIGEN', // N.Factura Cuando es DEV. Vacio en caso contrario
  'FDI_PRECIODEVENTA',
  'FDI_FECHAOPERACION'
]

/*
 moment().startOf('month').format("YYYY-MM-DD");
 moment().endOf("year").format("YYYY-MM-DD");
 */

model.getDocsIdToday = function (callback) {
  var date = moment.utc().subtract(4, 'hours').format("YYYY-MM-DD");
  // console.log("date=",date);
  // var date = '2017-11-15'

  var query = 'SELECT NUMFACTURA,TIPODOC FROM FACTURASVENTA WHERE FECHA = \'' + date + '\''

  // SELECT [NUMFACTURA]
  //   ,[TIPODOC]
  //   ,[FACTURASVENTA].[FECHACREACION]
  // FROM [FACTURASVENTA]
  // WHERE [FECHA] = '2017-11-15'

  sqlHelper.get(query, function (err, response) {
    if (err)
      return callback(err)
    else {
      var idsFiltered = _.filter(response, function (doc) {
        return !_.isNaN(parseInt(doc.NUMFACTURA))
      })
      console.log('response=', JSON.stringify(response))

      // var test = _.transform(_.map(idsFiltered, 'NUMFACTURA'), function(result, id) {
      //   result.push(_.toString(id));
      //   return _.toString(id);
      // }, []);
      // console.log("test=",test)
      return callback(null, _.map(idsFiltered, 'NUMFACTURA'))
      // return callback(null, _.map(idsFiltered, 'NUMFACTURA'))
    }
  })
}
model.getDocById = function (id, callback) {

  // var fields = [
  //   'FTI_DOCUMENTO',
  //   'FTI_TIPO',
  //   'FTI_RIFCLIENTE',
  //   'FTI_FECHAEMISION',
  //   'FTI_DOCUMENTOORIGEN',
  //   'FTI_TOTALITEMS',
  //   'FTI_TOTALBRUTO',
  //   'FTI_TOTALNETO',
  //   'FTI_IMPUESTO1MONTO',
  //   'FTI_HORA'
  // ]
  //
  // var fieldsDetails = [
  //   'FDI_CODIGO', // Codigo Articulo
  //   'FDI_CANTIDAD',
  //   'FDI_TIPOOPERACION', // Tipo de doc. 11 Fact, 12 Dev
  //   'FDI_DOCUMENTO', // N.Factura
  //   'FDI_DOCUMENTOORIGEN', // N.Factura Cuando es DEV. Vacio en caso contrario
  //   'FDI_PRECIODEVENTA',
  //   'FDI_FECHAOPERACION'
  // ]

  // SELECT [FACTURASVENTA].[NUMFACTURA]
  //   ,[FACTURASVENTA].[CODCLIENTE]
  //   ,[FACTURASVENTA].[TOTALNETO]
  //   ,[FACTURASVENTA].[TIPODOC]
  //   ,[FACTURASVENTA].[FECHACREACION]
  //   ,[CLIENTES].[CODCLIENTE]
  //   ,[CLIENTES].[CIF]
  // FROM [FACTURASVENTA]
  // INNER JOIN [CLIENTES] ON [FACTURASVENTA].[CODCLIENTE] = [CLIENTES].[CODCLIENTE]
  // WHERE [FACTURASVENTA].[NUMFACTURA] = id ORDER BY [NUMFACTURA] ASC OFFSET 0 ROWS FETCH NEXT 5 ROWS ONLY;

  var fields = [
    "FACTURASVENTA.NUMFACTURA AS 'FTI_DOCUMENTO'",
    "FACTURASVENTA.TOTALNETO AS 'FTI_TOTALNETO'",
    "FACTURASVENTA.TIPODOC AS 'FTI_TIPO'",
    "FACTURASVENTA.FECHACREACION AS 'FTI_FECHAEMISION'",
    "CLIENTES.CIF AS 'FTI_RIFCLIENTE'"
  ]

  // "SELECT FACTURASVENTA.NUMFACTURA
  //   ,FACTURASVENTA.CODCLIENTE
  //   ,FACTURASVENTA.TOTALNETO
  //   ,FACTURASVENTA.TIPODOC
  //   ,FACTURASVENTA.FECHACREACION
  //   ,CLIENTES.CODCLIENTE
  //   ,CLIENTES.CIF
  // FROM FACTURASVENTA
  // INNER JOIN CLIENTES ON FACTURASVENTA.CODCLIENTE = CLIENTES.CODCLIENTE
  // WHERE FACTURASVENTA.NUMFACTURA = '"+id+"'";

  // var queryFields = _.union(fields, fieldsDetails);
  var query =
    squel.select()
      .fields(fields)
      .from('FACTURASVENTA')
      .join('CLIENTES', null, 'FACTURASVENTA.CODCLIENTE = CLIENTES.CODCLIENTE')
      .where('FACTURASVENTA.NUMFACTURA = ?', id)
      .toString();

  sqlHelper.get(query, function (err, response) {
    if (err)
      return callback(err)
    else {

      if(_.isEmpty(response))
        return callback(null,{});

      // console.log("response=",JSON.stringify(response));
      var docHeader = {};
      var responseDoc = _.first(response);

      var usedFields = [
        "FTI_DOCUMENTO",
        "FTI_TOTALNETO",
        "FTI_TIPO",
        "FTI_FECHAEMISION",
        "FTI_RIFCLIENTE"
      ]

      _.forEach(usedFields, function (field) {
        docHeader[field] = responseDoc[field];
      })

      docHeader.FTI_TIPO = responseDoc.FTI_TIPO.toString()==='13'?'11':'12';

      var doc = {
        doc: docHeader,
        items: []
      };

      // _.forEach(_.groupBy(response, 'FTI_DOCUMENTO'), function (docVal) {
      //   var docHeader = {}
      //   _.forEach(docVal, function (docItem) {
      //     docItem.FTI_FECHAEMISION = docItem.FTI_FECHAEMISION.substr(0, 10);
      //     // docItem.FTI_DOCUMENTOORIGEN = _.trimEnd(docItem.FTI_DOCUMENTOORIGEN, '/');
      //     _.forEach(fields, function (field) {
      //       docHeader[field] = docItem[field];
      //       delete docItem[field];
      //     })
      //   })
      //   var doc = {
      //     doc: docHeader,
      //     items: docVal
      //   }
      //   docsList.push(doc);
      // })
      return callback(null, doc);
    }
  })
}
model.getDocsToday = function (callback) {
  // var date = moment.utc().subtract(4, 'hours').format('YYYY-MM-DD');
  var date = '2017-11-15';
  // console.log("date=",date);
  // var date = "2017-10-28";
  var fields = [
    "FACTURASVENTA.NUMFACTURA AS 'FTI_DOCUMENTO'",
    "FACTURASVENTA.TOTALNETO AS 'FTI_TOTALNETO'",
    "FACTURASVENTA.TIPODOC AS 'FTI_TIPO'",
    "FACTURASVENTA.FECHACREACION AS 'FTI_FECHAEMISION'",
    "CLIENTES.CIF AS 'FTI_RIFCLIENTE'"
  ];


  // var test =
  //   squel.select()
  //     .fields(queryFields)
  //     .from('SOperacionInv')
  //     .join('SDetalleVenta', null, 'SOperacionInv.FTI_DOCUMENTO = SDetalleVenta.FDI_DOCUMENTO')
  //     .where('FTI_FECHAEMISION = ?', date)
  //     .where('FDI_FECHAOPERACION = ?', date)
  //     .order('FTI_DOCUMENTO')
  //     .toString();

  var query =
    squel.select()
      .fields(fields)
      .from('FACTURASVENTA')
      .join('CLIENTES', null, 'FACTURASVENTA.CODCLIENTE = CLIENTES.CODCLIENTE')
      .where('FACTURASVENTA.FECHA = ?', date)
      .toString();

  sqlHelper.get(query, function (err, response) {
    if (err)
      return callback(err)
    else {
      var docsList = []
      _.forEach(response, function (responseDoc) {
        var docHeader = {};

        var usedFields = [
          "FTI_DOCUMENTO",
          "FTI_TOTALNETO",
          "FTI_TIPO",
          "FTI_FECHAEMISION",
          "FTI_RIFCLIENTE"
        ]

        _.forEach(usedFields, function (field) {
          docHeader[field] = responseDoc[field];
        });


        console.log("docHeader.FTI_FECHAEMISION=",docHeader.FTI_FECHAEMISION);
        docHeader.FTI_HORA = moment.utc(docHeader.FTI_FECHAEMISION).format('HH:mm');
        console.log("docHeader.FTI_HORA=",docHeader.FTI_HORA);
        docHeader.FTI_FECHAEMISION = moment.utc(docHeader.FTI_FECHAEMISION).format('YYYY-MM-DD');
        console.log("docHeader.FTI_FECHAEMISION_FINAL=",docHeader.FTI_FECHAEMISION,"\n");

        docHeader.FTI_TIPO = responseDoc.FTI_TIPO.toString()==='13'?'11':'12';

        var doc = {
          doc: docHeader,
          items: []
        };
        docsList.push(doc)
      })

      return callback(null, docsList);
      // return callback(null, docsList);
    }
  })
}
model.getDocsDate = function (date, callback) {
  if (!moment(date).isValid())
    return callback({key: 'INVALID_DATE', msg: 'The param date is invalid'})

  var fields = [
    "FACTURASVENTA.NUMFACTURA AS 'FTI_DOCUMENTO'",
    "FACTURASVENTA.TOTALNETO AS 'FTI_TOTALNETO'",
    "FACTURASVENTA.TIPODOC AS 'FTI_TIPO'",
    "FACTURASVENTA.FECHACREACION AS 'FTI_FECHAEMISION'",
    "CLIENTES.CIF AS 'FTI_RIFCLIENTE'"
  ];


  // var test =
  //   squel.select()
  //     .fields(queryFields)
  //     .from('SOperacionInv')
  //     .join('SDetalleVenta', null, 'SOperacionInv.FTI_DOCUMENTO = SDetalleVenta.FDI_DOCUMENTO')
  //     .where('FTI_FECHAEMISION = ?', date)
  //     .where('FDI_FECHAOPERACION = ?', date)
  //     .order('FTI_DOCUMENTO')
  //     .toString();

  var query =
    squel.select()
      .fields(fields)
      .from('FACTURASVENTA')
      .join('CLIENTES', null, 'FACTURASVENTA.CODCLIENTE = CLIENTES.CODCLIENTE')
      .where('FACTURASVENTA.FECHA = ?', date)
      .toString();

  sqlHelper.get(query, function (err, response) {
    if (err)
      return callback(err)
    else {
      var docsList = []
      _.forEach(response, function (responseDoc) {
        var docHeader = {};

        var usedFields = [
          "FTI_DOCUMENTO",
          "FTI_TOTALNETO",
          "FTI_TIPO",
          "FTI_FECHAEMISION",
          "FTI_RIFCLIENTE"
        ]

        _.forEach(usedFields, function (field) {
          docHeader[field] = responseDoc[field];
        });


        // console.log("docHeader.FTI_FECHAEMISION=",docHeader.FTI_FECHAEMISION);
        docHeader.FTI_HORA = moment.utc(docHeader.FTI_FECHAEMISION).format('HH:mm');
        // console.log("docHeader.FTI_HORA=",docHeader.FTI_HORA);
        docHeader.FTI_FECHAEMISION = moment.utc(docHeader.FTI_FECHAEMISION).format('YYYY-MM-DD');
        // console.log("docHeader.FTI_FECHAEMISION_FINAL=",docHeader.FTI_FECHAEMISION,"\n");

        var doc = {
          doc: docHeader,
          items: []
        };
        docsList.push(doc)
      });

      console.log("FECHA=",date," docsList=",JSON.stringify(docsList));

      return callback(null, docsList);
      // return callback(null, docsList);
    }
  })
}
model.getDocsRange = function (params, callback) {
  // console.log("params=",params)

  var query =
    squel.select()
      .fields(fields)
      .from('SOperacionInv')
      .where('FTI_FECHAEMISION between ? AND ?', params.start, params.end)
      .toString()
  // console.log("query=",query)
  a2DbHelper.get(query, function (err, response) {
    if (err)
      return callback(err)
    else {
      _.forEach(response, function (doc) {
        doc.FTI_FECHAEMISION = moment(doc.FTI_FECHAEMISION).format('YYYY-MM-DD')
        doc.FTI_DOCUMENTOORIGEN = _.trimEnd(doc.FTI_DOCUMENTOORIGEN, '/')
      })
      return callback(null, response)
    }
  })
}
module.exports = model
