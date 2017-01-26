var http = require('http');

module.exports = {
  getRequest: function (serverURL,codigoSeg,dataSQL) 
  {
      serverURL = typeof serverURL  !== 'undefined' ? serverURL : "http://shopinfopanel.herokuapp.com/api";
      codigoSeg = typeof codigoSeg  !== 'undefined' ? codigoSeg : "JtmzAMVx";
      dataSQL = typeof dataSQL  !== 'undefined' ? dataSQL : '{"name":"John"}';


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
};

//httpshop.getRequest("http://shopinfopanel.herokuapp.com/api/codigo","JtmzAMVx",'{"name":"John"}');
