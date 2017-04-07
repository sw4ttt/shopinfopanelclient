/**
 * Created by Oscar Marquez on 6/3/2017.
 */
"use strict";
var _ = require('lodash');
var model = require('./../../../models/data/sales/model');
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


exports.get = function(req,res) {
    if (!req.params)
        res.status(401).send({ msg:'error', error:{key:"MISSING_PARAMS",message:"Missing parameters on request."} });
    var query = req.params.date;
    model.get(query,function (err,data) {
        if (err) return res.status(409).send({ error:err });
        // res.status(200).send({ msg:'success', data:data});
        // console.log("data=",data)
        // _.forEach(data,function (row) {
        //     console.log("row=",row);
        // })
        return res.status(200).send({ success:true, data:data});
    })

    // if (req.params.date)
    //     console.log("req.params.date=",req.params.date);
    // else
    //     console.log("req.params.date= NO PARAM DATE");
    // res.status(200).json({ msg: 'DATA - SALES CONTROLLER - READ' });
};
