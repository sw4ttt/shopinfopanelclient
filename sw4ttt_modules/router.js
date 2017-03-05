"use strict";
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    var now = new Date(Date.now()).toLocaleString();
    console.log('Time: ', now);
    next();
})
// define the home page route
router.get('/', function (req, res) 
{
  res.sendFile('config.html', {root: './views/pages'});
})

router.get('/getconfig', function(req, res)
{
    //res.sendfile('index.html', { root: __dirname + '/views/pages' });
    //res.send("potato res.");
    //config.getConfigData(res);

    //config.test();
    //res.json(config.getConfigData());
});

router.post('/setconfig', urlencodedParser, function(req, res)
{
    
        // nombreserver     
        // urlserver
        // nombretienda
        // codigo
        // rutabd
    
    //res.sendfile('index.html', { root: __dirname + '/views/pages' });
    //req.params
    //Stringjs(req.body.rutabd).replaceAll('/', 'X');
    res.send("DATA ENVIADA: ("+req.body.nombre+") - ("+req.body.codigo+") - ("+Stringjs(req.body.rutabd).replaceAll('\\', '/')+")");
});

module.exports = router