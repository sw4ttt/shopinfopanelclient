/**
 * Created by Oscar Marquez on 6/3/2017.
 */
"use strict";

exports.all = function(req,res) {
    res.status(200).json({ msg: 'DATA - SALES CONTROLLER - ALL' });
};

exports.read = function(req,res) {
    if (req.params.date)
        console.log("req.params.date=",req.params.date);
    else
        console.log("req.params.date= NO PARAM DATE");
    res.status(200).json({ msg: 'DATA - SALES CONTROLLER - READ' });
};
