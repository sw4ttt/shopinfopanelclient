/**
 * Created by Oscar Marquez on 3/4/2017.
 */
/**
 * Created by Oscar Marquez on 6/3/2017.
 */
"use strict";
var _ = require('lodash');
var S = require('string');
var squel = require('squel');
var dbHelper = require('./../../utils/dbHelper/model.js')
var moment = require('moment');
var functions = {};

var fieldsDetails = [
    "FDI_CODIGO", // Codigo Articulo
    "FDI_TIPOOPERACION", // Tipo de doc. 11 Fact, 12 Dev
    "FDI_DOCUMENTO", // N.Factura
    "FDI_DOCUMENTOORIGEN", // N.Factura Cuando es DEV. Vacio en caso contrario
    "FDI_PRECIODEVENTA",
    "FDI_FECHAOPERACION"
];


functions.getDetails = function (doc,callback)
{
    if (!doc)
        return callback({key:"PARAM_DOC_MISSING",msg:"Doc param error"})
    var queryDetails = squel.select()
        .fields(fieldsDetails)
        .from("SDetalleVenta")
        .where("FDI_DOCUMENTO = ?", doc.FTI_DOCUMENTO)
        .where("FDI_FECHAOPERACION = ?", doc.FTI_FECHAEMISION)
        .toString();
    dbHelper.get(queryDetails,function (err,response) {
        if (err)
            return callback(err);
        return callback(null,response);
    })
};

module.exports = functions;