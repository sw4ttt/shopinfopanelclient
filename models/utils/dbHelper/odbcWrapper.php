<?php

$params = explode(",", $argv[1]);

if (!is_dir($params[0]))
{
    fwrite(STDERR, "ERROR: PHP-Wrapper: Directorio de Base de Datos incorrecto!.");
}
else
{
    define("DB_PATH", $params[0]);

    $db = odbc_connect("DRIVER={DBISAM 4 ODBC Driver (Read-Only)};ConnectionType=Local;CatalogName=".$params[0].";","master","....");
    $query = $params[1];
    $query = str_replace("*", " ", $query);
    $query = str_replace("+", ",", $query);
//    echo $query;
    $response = odbc_exec($db,$query);

    if (!$response){
        echo odbc_error();
    }else {
        $arrayOut = array();
        $index = 0;
        while($row = odbc_fetch_array($response))
        {
            $arrayOut[$index]  = $row;
            $index++;
        }
        echo json_encode($arrayOut);
    }

//    switch ($params[1]) {
//        case "userdata":
//            getUsersData($db);
//            break;
//        case "salesdata":
//            getSalesData($db,$params[2]);
//            break;
//        default:
//            fwrite(STDERR, "ERROR: PHP-Wrapper: Parametro de Consulta incorrecto.");
//    }
}


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
function getSalesData($db,$id)
{
//    $res = odbc_exec($db,"SELECT Nombre,Descripcion,Clave FROM Susuarios");
    $query = "SELECT FTI_DOCUMENTO FROM SOperacionInv WHERE FTI_DOCUMENTO = '".$id."'";
    $res = odbc_exec($db,$query);
    $arrayOut = array();
    $index = 0;
    while($row = odbc_fetch_array($res))
    {
        $arrayOut[$index]  = $row;
        $index++;
    }
    echo json_encode($arrayOut);
}



//echo $params[0] ." - " . $params[1] . " - " . $params[2];
//$db = odbc_connect("DRIVER={DBISAM 4 ODBC Driver (Read-Only)};ConnectionType=Local;CatalogName=D:/Web/a2testbd/DATA/;","master","caja1");
//$db = odbc_connect("DRIVER={DBISAM 4 ODBC Driver (Read-Only)};ConnectionType=Local;CatalogName=".DB_PATH.";","master","....");
//$res = odbc_exec($db,"SELECT Nombre,Descripcion,Clave FROM Susuarios");

//echo odbc_num_rows($res)." Registros!";

