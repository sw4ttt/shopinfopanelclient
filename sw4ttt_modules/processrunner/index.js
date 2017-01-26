var httpshop = require('../httpshop');
var runner = require("child_process");

module.exports = {
  callServer: function (serverURL,codigoSeg,rutaScript,paramScript) 
  {
      runner.exec("php " + rutaScript + " " +paramScript, function(err, dataSQL, stderr) 
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
                console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>");
                console.log("--SUCCESS: DATA: \n"+dataSQL);
                console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>");
                httpshop.getRequest(serverURL,codigoSeg,dataSQL);
            }
      });
  }
};