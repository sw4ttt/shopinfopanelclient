var http = require('http');

module.exports = {
  sendDataSql: function (serverURL,codigoSeg,dataSQL) 
  {
      //serverURL = typeof serverURL  !== 'undefined' ? serverURL : "http://shopinfopanel.herokuapp.com/api";
      //codigoSeg = typeof codigoSeg  !== 'undefined' ? codigoSeg : "JtmzAMVx";
      //dataSQL = typeof dataSQL  !== 'undefined' ? dataSQL : '{"name":"John"}';


      //Los parametros del GET no traen / .
      http.get(serverURL+"/"+codigoSeg+"/"+dataSQL, function(res) 
      {
          var body = '';
          res.on('data', function(resData)
          {
              body += resData;
          });
          res.on('end', function() 
          {
              //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>");
              console.log("--SERVER: RESPUESTA: "+body.toString());
              //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>");
          });
      })
      .on('error', function(e) 
      {
          //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>");
          console.log("--ERROR: GET: \n" + e.message);
          //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>");
      });
  }
  ,
  checkCodigoTienda: function (serverURL,codigoSeg) 
  {
        //serverURL = typeof serverURL  !== 'undefined' ? serverURL : "http://shopinfopanel.herokuapp.com/api";
        //codigoSeg = typeof codigoSeg  !== 'undefined' ? codigoSeg : "XXXXXX";
        //Los parametros del GET no traen / .
        var respuesta = "default";
        http.get(serverURL+"/checkcodigo/"+codigoSeg, function(res) 
        {
            var body = '';
            res.on('data', function(resData)
            {
                body += resData;
            });
            res.on('end', function() 
            {
                //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>");
                //console.log("--SERVER: RESPUESTA: "+body.toString());
                if (body === "false")
                {
                    console.log("IF-BODY= "+body);
                    respuesta = "false";
                }
                else
                {
                    console.log("ELSE-BODY= "+body);
                    respuesta = "true";
                }
                //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>");
            });
        })
        .on('error', function(e) 
        {
            //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>");
            console.log("--ERROR: GET: checkCodigoTienda:\n" + e.message);
            respuesta = "false";
            //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>");
        });
        //return respuesta;
  }
};

//httpshop.getRequest("http://shopinfopanel.herokuapp.com/api/codigo","JtmzAMVx",'{"name":"John"}');
