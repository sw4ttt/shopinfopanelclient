/**
 * Created by Oscar Marquez on 6/3/2017.
 */
"use strict";
var _ = require('lodash');
var model = require('./../../../models/data/sales/model')

exports.all = function(req,res) {
    res.status(200).json({ msg: 'DATA - SALES CONTROLLER - ALL' });
};
exports.getToday = function(req,res) {
    model.getToday(function (err,data) {
        if (err) return res.status(401).send({ error:err });
        return res.status(200).send({ msg:'success', data:data});
    });
};

exports.get = function(req,res) {
    if (!req.params)
        res.status(401).send({ msg:'error', error:{key:"MISSING_PARAMS",message:"Missing parameters on request."} });
    var query = req.params.date;
    model.get(query,function (err,data) {
        if (err) return res.status(401).send({ error:err });
        // res.status(200).send({ msg:'success', data:data});
        // console.log("data=",data)
        // _.forEach(data,function (row) {
        //     console.log("row=",row);
        // })
        return res.status(200).send({ msg:'success', data:data});
    })

    // if (req.params.date)
    //     console.log("req.params.date=",req.params.date);
    // else
    //     console.log("req.params.date= NO PARAM DATE");
    // res.status(200).json({ msg: 'DATA - SALES CONTROLLER - READ' });
};
