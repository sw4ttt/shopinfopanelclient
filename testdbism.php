<?php

define("DB_PATH", "C:/a2JEANSWEST/Empre001/DATA/");

$db = odbc_connect("DRIVER={DBISAM 4 ODBC Driver (Read-Only)};ConnectionType=Local;CatalogName=".DB_PATH.";","master","....");
$params = explode(",", $argv[1]);

function getUsersData($db) 
{  
    $res = odbc_exec($db,"SELECT Nombre,Descripcion,Clave FROM Susuarios");
    $arrayOut = array();
    $index = 0;
    while($row = odbc_fetch_array($res)) 
    {
        $arrayOut[$index]  = $row;
        $index++;
    }
    echo json_encode($arrayOut);
}
function getSalesData() 
{   
}

switch ($params[0]) {
    case "userdata":
        getUsersData($db);
        break;
    default:
        fwrite(STDERR, "ERROR PHP file params!.");
}


//echo $params[0] ." - " . $params[1] . " - " . $params[2];
//$db = odbc_connect("DRIVER={DBISAM 4 ODBC Driver (Read-Only)};ConnectionType=Local;CatalogName=D:/Web/a2testbd/DATA/;","master","caja1");
//$db = odbc_connect("DRIVER={DBISAM 4 ODBC Driver (Read-Only)};ConnectionType=Local;CatalogName=".DB_PATH.";","master","....");
//$res = odbc_exec($db,"SELECT Nombre,Descripcion,Clave FROM Susuarios");

//echo odbc_num_rows($res)." Registros!";

