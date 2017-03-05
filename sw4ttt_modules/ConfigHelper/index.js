/*var User = function(name, email) {
  this.name = name;
  this.email = email;
};
module.exports = User;
*/

var confighelper = function () {};

confighelper.prototype.test = function () {
        console.log('confighelper.test!');
}

confighelper.prototype.getConfigData = function (callback) 
{
    //idTienda,nombreTienda,codigoSeguridad,rutaA2
    //serverURL = typeof serverURL  !== 'undefined' ? serverURL : "http://shopinfopanel.herokuapp.com/api";
    var db = new sqlite3.Database(rutabd);
    //db.serialize(function ()
    //{
    db.get("SELECT * FROM CONFIGURACION", function (err, row) 
    {
        if (row !== undefined)
        {
            res.json(row);             
        }
        else
        {
            if (err === null)
            {
                res.json({ "error":"Not Found" });                
            }
            else
            {
                res.json({ "error":"Error Query" });
            }
        }
    });
}

module.exports = confighelper;