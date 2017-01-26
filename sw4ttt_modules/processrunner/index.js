var httpshop = require('../httpshop');
var runner = require("child_process");
var cron = require('node-schedule');

module.exports = {
  callServer: function (serverURL,codigoSeg,rutaScript,paramScript) 
  {
        var j = cron.scheduleJob('*/1 * * * *', function()
        {
            //console.log('CRON: START');  
            //----------------------------------------------------------------------------------------------
            runner.exec("C:/UniServerZ/core/php56/php.exe " + rutaScript + " " +paramScript, function(err, dataSQL, stderr) 
            {
                if(stderr) 
                {
                    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>");
                    console.log("--ERROR: PHP-StdErr: \n"+stderr);
                    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>");
                }
                else
                    if(dataSQL)
                    {
                        //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>");
                        //console.log("--SUCCESS: DATA: \n"+dataSQL);
                        //console.log("--SUCCESS: DATA:--");
                        //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>");
                        httpshop.getRequest(serverURL,codigoSeg,dataSQL);
                    }
            });
            //----------------------------------------------------------------------------------------------
        });

  }
};