<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");
$method = $_SERVER['REQUEST_METHOD'];

function conectarDB(){
    
    $servidor = "localhost";
    $usuario = "root";
    $password = "";
    $bd = "bies-react";
    $conexionBD = mysqli_connect($servidor, $usuario, $password,$bd);
    

    /*$servidor = "mysql-bies.alwaysdata.net";
    $usuario = "bies";
    $password = "Bies2022+-";
    $bd = "bies_react";
    $conexionBD = mysqli_connect($servidor, $usuario, $password,$bd);
    */

    
        if($conexionBD){
            echo "";
        }else{
            echo 'Ha sucedido un error inesperado en la conexion de la base de datos';
        }

    return $conexionBD;
}
?>