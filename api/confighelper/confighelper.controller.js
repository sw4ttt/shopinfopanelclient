/**
 * Created by Oscar Marquez on 6/3/2017.
 */
"use strict";
var express = require('express');
//var configRouter = express.Router();
var configHelper = require('../../sw4ttt_modules/configHelper/model.js');
//var confighelper = new confighelper();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var controller = function () {};
configHelper = new configHelper();

controller.prototype.getConfig = function (req, res,callback)
{
    res.status(200).json({ msg: 'OK' });
}


// configRouter.get('/initconfig', function(req, res)
// {
//     confighelper.initConfig(function(err,exitcode)
//     {
//         if(err)
//         {
//             console.log("Error:",err);
//         }
//         else
//         {
//             console.log("confighelper.initconfig-> exitcode:",exitcode);
//         }
//     });
// });

// configRouter.get('/getconfig', function(req, res)
// {
//     //res.sendfile('index.html', { root: __dirname + '/views/pages' });
//     //res.send("potato res.");
//     //config.getConfigData(res);
//
//     //config.test();
//     //res.json(config.getConfigData());
//     res.status(200).json({ msg: 'todo bien' });
//     /*
//      confighelper.initConfig(function(err,exitcode)
//      {
//      if(err)
//      {
//      console.log("Error:",err);
//      }
//      else
//      {
//      console.log("confighelper.initconfig-> exitcode:",exitcode);
//      }
//      });
//      */
// });

// configRouter.post('/setconfig', urlencodedParser, function(req, res)
// {
//
//     // nombreserver
//     // urlserver
//     // nombretienda
//     // codigo
//     // rutabd
//
//     //res.sendfile('index.html', { root: __dirname + '/views/pages' });
//     //req.params
//     //Stringjs(req.body.rutabd).replaceAll('/', 'X');
//     res.send("DATA ENVIADA: ("+req.body.nombre+") - ("+req.body.codigo+") - ("+Stringjs(req.body.rutabd).replaceAll('\\', '/')+")");
// });


module.exports = controller;