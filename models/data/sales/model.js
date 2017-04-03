/**
 * Created by Oscar Marquez on 6/3/2017.
 */
"use strict";
var _ = require('lodash');
var S = require('string');
var squel = require('squel');
var dbHelper = require('./../../utils/dbHelper/model.js')
var moment = require('moment');
var functions = require('./functions');
var model = {};
// FTI_TIPO: 11 Factura, 12 Dev
var fields = [
    "FTI_DOCUMENTO",
    "FTI_TIPO",
    "FTI_RIFCLIENTE",
    "FTI_PERSONACONTACTO",
    "FTI_FECHAEMISION",
    "FTI_DOCUMENTOORIGEN",
    "FTI_TOTALNETO"
];

var fieldsDetails = [
    "FDI_CODIGO", // Codigo Articulo
    "FDI_TIPOOPERACION", // Tipo de doc. 11 Fact, 12 Dev
    "FDI_DOCUMENTO", // N.Factura
    "FDI_DOCUMENTOORIGEN", // N.Factura Cuando es DEV. Vacio en caso contrario
    "FDI_PRECIODEVENTA",
    "FDI_FECHAOPERACION"
];

model.getToday = function (callback)
{
    var test = squel.select()
        .fields(fields)
        .from("SOperacionInv")
        //---------------------------- COLOCA LA FECHA DE HOY!!!!
        .where("FTI_FECHAEMISION = ?", moment('2017-04-02').format("YYYY-MM-DD"))
        .toString();

    dbHelper.get(test,function (err,response) {
        if (err)
            return callback(err);
        var sale = 0.00;
        var dev = 0.00;
        console.log("response=",response)
        _.forEach(response,function (document) {
            console.log("document=",document)
            if (document.FTI_TIPO == "11")
            {
                console.log("sale=",sale);
                console.log("document.FTI_TOTALNETO=",document.FTI_TOTALNETO);
                console.log("document.FTI_TOTALNETO(finite)=",_.toFinite(document.FTI_TOTALNETO));
                sale = sale + _.toFinite(document.FTI_TOTALNETO);
            }
            else
                if (document.FTI_TIPO == "12")
                {
                    console.log("dev=",dev);
                    console.log("document.FTI_TOTALNETO=",document.FTI_TOTALNETO);
                    console.log("document.FTI_TOTALNETO(finite)=",_.toFinite(document.FTI_TOTALNETO));
                    dev = dev + _.toFinite(document.FTI_TOTALNETO);
                }

        })
        return callback(null,{sale:sale.toFixed(2),dev:dev.toFixed(2),total:(sale-dev).toFixed(2)});
    })
};

model.get = function (query,callback)
{
    var test = squel.select()
        .fields(fields)
        .from("SOperacionInv")
        .where("FTI_DOCUMENTO='00049139'")
        .toString();

    dbHelper.get(test,function (err,response) {
        if (err)
            return callback(err);
        else
            return callback(null,response);
    })
};

model.getDocsToday = function (callback)
{
    var query = squel.select()
        .fields(fields)
        .from("SOperacionInv")
        .where("FTI_FECHAEMISION = ?", moment('2017-04-02').format("YYYY-MM-DD"))
        .toString();

    dbHelper.get(query,function (err,response) {
        if (err)
            return callback(err);
        var out = [];
        _.forEach(response,function (document) {
            var auxDoc = document;
            auxDoc.FTI_FECHAEMISION = moment(document.FTI_FECHAEMISION).format("YYYY-MM-DD");
            auxDoc.FTI_DOCUMENTOORIGEN = _.trimEnd(document.FTI_DOCUMENTOORIGEN, '/');

            auxDoc.items = [];
            functions.getDetails(document,function(err,items){
                if (err)
                    return callback(err);

                console.log("document.FTI_DOCUMENTO=",document.FTI_DOCUMENTO)
                console.log("document.items=",items)

                auxDoc.items = _.clone(items);
            })
            out.push(auxDoc);
        })
        return callback(null,out);
    })
};

module.exports = model;