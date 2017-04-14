/**
 * Created by Oscar Marquez on 6/3/2017.
 */
"use strict";
var _ = require('lodash');
var model = require('./../../models/sales/model');
var moment = require('moment');

exports.all = function(req,res) {
    res.status(200).json({ msg: 'DATA - SALES CONTROLLER - ALL' });
};

exports.getDocsToday = function(req,res) {
    model.getDocsToday(function (err,data) {
        if (err) return res.status(409).send({ error:err });
        return res.status(200).send({ success:true, data:data});
    });
};

exports.getDocsDate= function(req,res) {
    if (!req.params)
        return res.status(409).send({ error:{key:"MISSING_PARAMS",message:"Missing parameters on request."} });

    if (!moment(req.params.date).isValid())
        return res.status(409).send({ error:{key:"INVALID_DATE",msg:"The param date is invalid"} });
    model.getDocsDate(req.params.date,function (err,data) {
        if (err) return res.status(409).send({ error:err });
        return res.status(200).send({ success:true, data:data});
    });
};

exports.getDocsRange= function(req,res) {
    if (!req.params)
        return res.status(409).send({ error:{key:"MISSING_PARAMS",message:"Missing parameters on request."} });

    if (!moment(req.params.start).isValid() || !moment(req.params.end).isValid())
        return res.status(409).send({ error:{key:"INVALID_DATE_RANGE",msg:"The params for date range are invalid"} });
    model.getDocsRange(req.params,function (err,data) {
        if (err) return res.status(409).send({ error:err });
        return res.status(200).send({ success:true, data:data});
    });
};

