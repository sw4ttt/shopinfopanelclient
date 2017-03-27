/**
 * Created by Oscar Marquez on 6/3/2017.
 */
"use strict";
var _ = require('lodash');
var model = require('./../../../models/client/sales/model.js')

exports.all = function(req,res) {
    res.status(200).json({ msg: 'DATA - SALES CONTROLLER - ALL' });
};

exports.get = function(req,res) {
    model.get(function (err,data) {
        if (err)
            res.status(401).send({ msg:'error', error:err });
        // res.status(200).send({ msg:'success', data:data});
        // console.log("data=",data)
        _.forEach(data,function (row) {
            console.log("row=",row);
        })
        res.status(200).send({ msg:'success', data:data});
    })

    // if (req.params.date)
    //     console.log("req.params.date=",req.params.date);
    // else
    //     console.log("req.params.date= NO PARAM DATE");
    // res.status(200).json({ msg: 'DATA - SALES CONTROLLER - READ' });
};
