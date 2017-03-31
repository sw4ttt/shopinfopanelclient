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
    $response = odbc_exec($db,$query);

    if (!$response){
        //echo fwrite(STDERR,odbc_error());
        echo json_encode(odbc_error());
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
}