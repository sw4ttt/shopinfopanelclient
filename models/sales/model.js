/**
 * Created by Oscar Marquez on 6/3/2017.
 */
"use strict";
var _ = require('lodash');
var S = require('string');
var squel = require('squel');
var a2DbHelper = require('./../utils/a2DbHelper/model')
var moment = require('moment');
// var functions = require('./functions');
var model = {};
// FTI_TIPO: 11 Factura, 12 Dev
var fields = [
    "FTI_DOCUMENTO",
    "FTI_TIPO",
    "FTI_RIFCLIENTE",
    "FTI_FECHAEMISION",
    "FTI_DOCUMENTOORIGEN",
    "FTI_TOTALITEMS",
    "FTI_TOTALBRUTO",
    "FTI_TOTALNETO",
    "FTI_IMPUESTO1MONTO",
    "FTI_HORA"
];

var fieldsDetails = [
    "FDI_CODIGO", // Codigo Articulo
    "FDI_CANTIDAD",
    "FDI_TIPOOPERACION", // Tipo de doc. 11 Fact, 12 Dev
    "FDI_DOCUMENTO", // N.Factura
    "FDI_DOCUMENTOORIGEN", // N.Factura Cuando es DEV. Vacio en caso contrario
    "FDI_PRECIODEVENTA",
    "FDI_FECHAOPERACION"
];

/*
 moment().startOf('month').format("YYYY-MM-DD");
 moment().endOf("year").format("YYYY-MM-DD");
 */


model.getDocsToday = function (callback) {
    var date = moment.utc().subtract(4, 'hours').format("YYYY-MM-DD");
    // console.log("date=",date);
    // var date = "2017-10-28";
    var queryFields = _.union(fields, fieldsDetails);
    var test =
        squel.select()
            .fields(queryFields)
            .from("SOperacionInv")
            .join("SDetalleVenta", null, "SOperacionInv.FTI_DOCUMENTO = SDetalleVenta.FDI_DOCUMENTO")
            .where("FTI_FECHAEMISION = ?", date)
            .where("FDI_FECHAOPERACION = ?", date)
            .order("FTI_DOCUMENTO")
            .toString();

    a2DbHelper.get(test, function (err, response) {
        if (err)
            return callback(err);
        else {
            var docsList = [];
            console.log("DOCS=",JSON.stringify(response));
            _.forEach(_.groupBy(response, "FTI_DOCUMENTO"), function (docVal) {
                var docHeader = {}
                _.forEach(docVal, function (docItem) {
                    docItem.FTI_FECHAEMISION = date;
                    docItem.FTI_DOCUMENTOORIGEN = _.trimEnd(docItem.FTI_DOCUMENTOORIGEN, '/');
                    _.forEach(fields, function (field) {
                        docHeader[field] = docItem[field];
                        delete docItem[field];
                    })

                });
                var doc = {
                    doc: docHeader,
                    items: docVal
                };
                docsList.push(doc);
            });
            console.log("DOCs=", _.isArray(docsList) ? docsList.length : []);
            return callback(null, []);
            // return callback(null, docsList);
        }
    })
};

model.getDocsIdToday = function (callback) {
    // var date = moment.utc().subtract(4, 'hours').format("YYYY-MM-DD");
    // console.log("date=",date);
    var date = "2017-11-19";

    var test = "SELECT FTI_DOCUMENTO FROM SOperacionInv WHERE FTI_FECHAEMISION = '"+date+"'";

    a2DbHelper.get(test, function (err, response) {
        if (err)
            return callback(err);
        else {
            return callback(null, _.map(response,'FTI_DOCUMENTO'));
        }
    })
};

model.getDocsDate = function (date, callback) {
    if (!moment(date).isValid())
        return callback({key: "INVALID_DATE", msg: "The param date is invalid"})

    var queryFields = _.union(fields, fieldsDetails);
    var test =
        squel.select()
            .fields(queryFields)
            .from("SOperacionInv")
            .join("SDetalleVenta", null, "SOperacionInv.FTI_DOCUMENTO = SDetalleVenta.FDI_DOCUMENTO")
            .where("FTI_FECHAEMISION = ?", moment(date).format("YYYY-MM-DD"))
            .where("FDI_FECHAOPERACION = ?", moment(date).format("YYYY-MM-DD"))
            .toString();

    a2DbHelper.get(test, function (err, response) {
        if (err)
            return callback(err);
        else {
            var docsList = [];
            _.forEach(_.groupBy(response, "FTI_DOCUMENTO"), function (docVal) {
                var docHeader = {}
                _.forEach(docVal, function (docItem) {
                    docItem.FTI_FECHAEMISION = moment(docItem.FTI_FECHAEMISION).format("YYYY-MM-DD");
                    docItem.FTI_DOCUMENTOORIGEN = _.trimEnd(docItem.FTI_DOCUMENTOORIGEN, '/');

                    _.forEach(fields, function (field) {
                        docHeader[field] = docItem[field];
                        delete docItem[field];
                    })

                })
                var doc = {
                    doc: docHeader,
                    items: docVal
                }
                docsList.push(doc);
            })
            return callback(null, docsList);
        }
    })
};

model.getDocsRange = function (params, callback) {
    // console.log("params=",params)

    var query =
        squel.select()
            .fields(fields)
            .from("SOperacionInv")
            .where("FTI_FECHAEMISION between ? AND ?", params.start, params.end)
            .toString();
    // console.log("query=",query)
    a2DbHelper.get(query, function (err, response) {
        if (err)
            return callback(err);
        else {
            _.forEach(response, function (doc) {
                doc.FTI_FECHAEMISION = moment(doc.FTI_FECHAEMISION).format("YYYY-MM-DD");
                doc.FTI_DOCUMENTOORIGEN = _.trimEnd(doc.FTI_DOCUMENTOORIGEN, '/');
            });
            return callback(null, response);
        }
    })
};

model.getDocById = function (id, callback) {

    var queryFields = _.union(fields, fieldsDetails);
    var test =
        squel.select()
            .fields(queryFields)
            .from("SOperacionInv")
            .join("SDetalleVenta", null, "SOperacionInv.FTI_DOCUMENTO = SDetalleVenta.FDI_DOCUMENTO")
            .where("FTI_DOCUMENTO = ?", id)
            .toString();

    a2DbHelper.get(test, function (err, response) {
        if (err)
            return callback(err);
        else {
            var docsList = [];
            _.forEach(_.groupBy(response, "FTI_DOCUMENTO"), function (docVal) {
                var docHeader = {};
                _.forEach(docVal, function (docItem) {
                    docItem.FTI_FECHAEMISION = docItem.FTI_FECHAEMISION.substr(0, 10);
                    docItem.FTI_DOCUMENTOORIGEN = _.trimEnd(docItem.FTI_DOCUMENTOORIGEN, '/');
                    _.forEach(fields, function (field) {
                        docHeader[field] = docItem[field];
                        delete docItem[field];
                    })
                });
                var doc = {
                    doc: docHeader,
                    items: docVal
                };
                docsList.push(doc);
            });
            return callback(null, docsList);
        }
    })
};

module.exports = model;
