/**
 * Created by Oscar Marquez on 6/3/2017.
 */
"use strict";

exports.all = function(req,res) {
    res.status(200).json({ msg: 'CONFIG' });
};



// module.exports = router;


//FIN


//
// router.get('/initconfig', function(req, res)
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
//router.get('/getconfig',configHelperController.getConfig());

//res.sendfile('index.html', { root: __dirname + '/views/pages' });
//res.send("potato res.");
//config.getConfigData(res);

//config.test();
//res.json(config.getConfigData());
//res.status(200).json({ msg: 'todo bien' });
/*
 confighelper.initConfig(function(err,exitcode)
 {
 if(err)
 {
 console.log("Error:",err);
 }
 else
 {
 console.log("confighelper.initconfig-> exitcode:",exitcode);
 }
 });
 */
// router.post('/setconfig', urlencodedParser, function(req, res)
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


