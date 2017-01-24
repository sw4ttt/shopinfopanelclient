<?php

define("DB_PATH", "C:/a2JEANSWEST/Empre001/DATA/");

function getUsersData() 
{
    
    
}

$params = explode(",", $argv[1]);
//echo $params[0] ." - " . $params[1] . " - " . $params[2];
//$db = odbc_connect("DRIVER={DBISAM 4 ODBC Driver (Read-Only)};ConnectionType=Local;CatalogName=D:/Web/a2testbd/DATA/;","master","caja1");
$db = odbc_connect("DRIVER={DBISAM 4 ODBC Driver (Read-Only)};ConnectionType=Local;CatalogName=".DB_PATH.";","master","caja1");

$res = odbc_exec($db,"SELECT * FROM Susuarios");
//echo odbc_num_rows($res)." Registros!";

$arrayOut = array();
while($row = odbc_fetch_array($res)) {
    //ar_dump($row);
    /*
    echo ("<>".$row['Nombre']);
    echo ("<BR>".$row['Descripcion']);
    echo ("<BR>".$row['Clave']);
    echo ("<BR>".$row['Status']);

    {"Nombre":"OSCAR"}
    */
    /*
    $dataOut = $dataOut.
    '"Nombre" : "'.$row['Nombre'].'",
        "Descripcion" : "'.$row['Descripcion'].'",
        "Clave" : "'.$row['Clave'].'",
        "Status" : "'.$row['Status'].'",';  
        */  
     $arrayOut["Nombre"]  = $row['Nombre'];
     $arrayOut["Descripcion"]  = $row['Descripcion'];
     $arrayOut["Clave"]  = "123";
     $arrayOut["Status"]  = $row['Status'];
}

$output = $sep = '';
foreach( $arrayOut as $key => $value ) {
    $output .= $sep .'"'.$key.'"'. ':' . '"'.$value.'"';
    $sep = ',';
}
echo "{".$output."}";
