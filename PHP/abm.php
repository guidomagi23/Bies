<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
//$servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "bies-react";
//$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

$method = $_SERVER['REQUEST_METHOD'];
    include "conectar.php";

    $conexionBD = conectarDB();
    //sleep(1);	
	$JSONData = file_get_contents("php://input");
	$dataObject = json_decode($JSONData);    
    session_start();    
    $conexionBD->set_charset('utf8');

// Consulta datos y recepciona una clave para consultar dichos datos con dicha clave
if (isset($_GET["consultar"])){
    $sqlEstacionamiento = mysqli_query($conexionBD,"SELECT * FROM playadeestacionamiento WHERE idPlayaDeEstacionamiento=".$_GET["consultar"]);
    if(mysqli_num_rows($sqlEstacionamiento) > 0){
        $estacionamiento = mysqli_fetch_all($sqlEstacionamiento,MYSQLI_ASSOC);
        echo json_encode($estacionamiento);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//borrar pero se le debe de enviar una clave ( para borrado )
if (isset($_GET["borrar"])){
    $sqlEstacionamiento = mysqli_query($conexionBD,"DELETE FROM playadeestacionamiento WHERE idPlayaDeEstacionamiento=".$_GET["borrar"]);
    if($sqlEstacionamiento){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//Inserta un nuevo registro y recepciona en método post los datos de nombre y correo
if(isset($_GET["insertar"])){
    $data = json_decode(file_get_contents("php://input"));
    $nombrePlayaDeEstacionamiento=$data->nombrePlayaDeEstacionamiento;
    $ubicacion=$data->ubicacion;
    $capacidad=$data->capacidad;
    $observaciones=$data->observaciones;
    $mapa=$data->mapa;

        if(($nombrePlayaDeEstacionamiento!="")&&($ubicacion!="")&&($capacidad!="")&&($observaciones!="")&&($mapa!="")){            
            $sqlEstacionamiento = mysqli_query($conexionBD,"INSERT INTO playadeestacionamiento(nombrePlayaDeEstacionamiento, ubicacion, capacidad, observaciones, mapa, lugaresLibres) VALUES ('$nombrePlayaDeEstacionamiento', '$ubicacion', '$capacidad', '$observaciones', '$mapa', $capacidad)");
            echo json_encode(["success"=>1]);
        }
    exit();
}
// Actualiza datos pero recepciona datos de nombre, correo y una clave para realizar la actualización
if(isset($_GET["actualizar"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $idPlayaDeEstacionamiento=(isset($data->idPlayaDeEstacionamiento))?$data->idPlayaDeEstacionamiento:$_GET["actualizar"];
    $nombrePlayaDeEstacionamiento=$data->nombrePlayaDeEstacionamiento;
    $ubicacion=$data->ubicacion;
    $capacidad=$data->capacidad;
    $observaciones=$data->observaciones;
    $mapa=$data->mapa;
    
    $sqlEmpleaados = mysqli_query($conexionBD,"UPDATE playadeestacionamiento SET nombrePlayaDeEstacionamiento= '$nombrePlayaDeEstacionamiento',ubicacion='$ubicacion',capacidad='$capacidad',observaciones='$observaciones',mapa='$mapa', lugaresLibres= $capacidad WHERE idPlayaDeEstacionamiento='$idPlayaDeEstacionamiento'");
    echo json_encode(["success"=>1]);
    exit();
}

if(isset($_GET["listar"])){
    $data = json_decode(file_get_contents("php://input"));
    $sqlEstacionamiento = mysqli_query($conexionBD,"SELECT pe.idPlayaDeEstacionamiento, pe.nombrePlayaDeEstacionamiento FROM playadeestacionamiento pe");
    if(mysqli_num_rows($sqlEstacionamiento) > 0){
        $sqlEstacionamiento = mysqli_fetch_all($sqlEstacionamiento,MYSQLI_ASSOC);
        echo json_encode($sqlEstacionamiento);
        exit();
    }
    else{  echo json_encode(["data" => $sqlEstacionamiento]); }
}
// Consulta todos los registros de la tabla 
$sqlEstacionamiento = mysqli_query($conexionBD,"SELECT * FROM playadeestacionamiento ");
if(mysqli_num_rows($sqlEstacionamiento) > 0){
    $estacionamiento = mysqli_fetch_all($sqlEstacionamiento,MYSQLI_ASSOC);
    echo json_encode($estacionamiento);
}
else{ echo json_encode([["success"=>0]]); }


?>