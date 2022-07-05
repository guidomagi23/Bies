<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];
    include "conectar.php";

    $conexionBD = conectarDB();
    //sleep(1);	
	$JSONData = file_get_contents("php://input");
	$dataObject = json_decode($JSONData);    
    session_start();    
    $conexionBD->set_charset('utf8');

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
//$servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "bies-react";
//$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);
$validar = "";

function obtenerNumeroDia($nombreDelDia){
    if($nombreDelDia === "DOMINGO"){
        return 0;
    }else if($nombreDelDia === "LUNES"){
        return 1;
    } else if($nombreDelDia === "MARTES"){
        return 2;
    } else if($nombreDelDia === "MIERCOLES"){
        return 3;
    } else if($nombreDelDia === "JUEVES"){
        return 4;
    } else if($nombreDelDia === "VIERNES"){
        return 5;
    } else {
        return 6;
    };
}

function validarHorario($horaInicio, $horaFin, $diaSemana, $idPlayaDeEstacionamiento, $conexionBD, $validar){

    if($horaInicio > $horaFin){
        $validar .= "La hora de inicio es mayor a la hora fin.\n";
    }
    if($horaInicio === $horaFin){
        $validar .= "Las horas de inicio y de fin son iguales.\n";
    }
    $sql2 = mysqli_query($conexionBD,"SELECT *
    FROM `playadeestacionamientohorario` 
    WHERE '$horaInicio' BETWEEN playadeestacionamientohorario.horaInicio and playadeestacionamientohorario.horaFin 
    and playadeestacionamientohorario.diaSemana = $diaSemana and playadeestacionamientohorario.idPlayaDeEstacionamiento = $idPlayaDeEstacionamiento");
    $resultado2 = mysqli_num_rows($sql2);

    if($resultado2 > 0){
        $validar .= "La hora inicio está dentro de otro horario.\n";
    }

    $sql3 = mysqli_query($conexionBD,"SELECT *
    FROM `playadeestacionamientohorario` 
    WHERE '$horaFin' BETWEEN playadeestacionamientohorario.horaInicio and playadeestacionamientohorario.horaFin 
    and playadeestacionamientohorario.diaSemana = $diaSemana and playadeestacionamientohorario.idPlayaDeEstacionamiento = $idPlayaDeEstacionamiento");

    $resultado3 = mysqli_num_rows($sql3);

    if($resultado3 > 0){
        $validar .= "La hora fin está dentro de otro horario.\n";
    }

    $sql4 = mysqli_query($conexionBD,"SELECT * FROM `playadeestacionamientohorario` WHERE playadeestacionamientohorario.horaInicio = '$horaInicio' and playadeestacionamientohorario.horaFin = '$horaFin' and playadeestacionamientohorario.diaSemana = $diaSemana and playadeestacionamientohorario.idPlayaDeEstacionamiento = $idPlayaDeEstacionamiento");
    $resultado4 = mysqli_num_rows($sql4);

    if($resultado4 > 0){
        $validar .= "La hora inicio y fin son iguales a las de otro horario.\n";
    }

    if($validar === ""){
        $validar = "ok";
    }
    return $validar;
};

// Consulta datos y recepciona una clave para consultar dichos datos con dicha clave
if (isset($_GET["consultar"])){
    $sqlEstacionamientoHorario = mysqli_query($conexionBD,"SELECT ph.idHorario, ph.idPlayaDeEstacionamiento, pe.nombrePlayaDeEstacionamiento as 'nombrePlayaDeEstacionamiento', ph.nombreDia, ph.horaInicio, ph.horaFin FROM `playadeestacionamientohorario` ph LEFT JOIN playadeestacionamiento pe on pe.idPlayaDeEstacionamiento = ph.idPlayaDeEstacionamiento WHERE idHorario=".$_GET["consultar"]);
    if(mysqli_num_rows($sqlEstacionamientoHorario) > 0){
        $estacionamientoHorario = mysqli_fetch_all($sqlEstacionamientoHorario,MYSQLI_ASSOC);
        echo json_encode($estacionamientoHorario);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//borrar pero se le debe de enviar una clave ( para borrado )
if (isset($_GET["borrar"])){
    $sqlEstacionamientoHorario = mysqli_query($conexionBD,"DELETE FROM playadeestacionamientohorario WHERE idHorario=".$_GET["borrar"]);
    if($sqlEstacionamientoHorario){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}


//Inserta un nuevo registro y recepciona en método post los datos de nombre y correo
if(isset($_GET["insertar"])){
    $data = json_decode(file_get_contents("php://input"));
    $idPlayaDeEstacionamiento=$data->idPlayaDeEstacionamiento;
    $nombreDia=$data->nombreDia;
    $horaInicio=$data->horaInicio;
    $horaFin=$data->horaFin;
    $nombreDia = strtoupper($nombreDia);
    $diaSemana = obtenerNumeroDia($nombreDia);

    $respuesta = validarHorario($horaInicio, $horaFin, $diaSemana, $idPlayaDeEstacionamiento, $conexionBD, $validar);
    error_log($respuesta, 3, 'D:\respuesta.txt');

    if($respuesta != "ok"){
        echo json_encode(["data"=>"$respuesta"], JSON_UNESCAPED_UNICODE);
        exit();
    } else {       
            $sqlEstacionamientoHorario = mysqli_query($conexionBD,"INSERT INTO playadeestacionamientohorario(idPlayaDeEstacionamiento, diaSemana, horaInicio, horaFin, nombreDia) VALUES ('$idPlayaDeEstacionamiento',
            '$diaSemana', '$horaInicio', '$horaFin', '$nombreDia')");
            echo json_encode(["data"=>"$respuesta"], JSON_UNESCAPED_UNICODE);
            exit();
    }
}
// Actualiza datos pero recepciona datos de nombre, correo y una clave para realizar la actualización
if(isset($_GET["actualizar"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $idHorario=(isset($data->idHorario))?$data->idHorario:$_GET["actualizar"];
    $idPlayaDeEstacionamiento=$data->idPlayaDeEstacionamiento;
    $horaInicio=$data->horaInicio;
    $horaFin = $data->horaFin;
    $nombreDia = $data->nombreDia;
    $nombreDia = strtoupper($nombreDia);
    $diaSemana = obtenerNumeroDia($nombreDia);
    $validar = "";
    $respuesta = validarHorario($horaInicio, $horaFin, $diaSemana, $idPlayaDeEstacionamiento, $conexionBD, $validar);
    
    if($respuesta != "ok"){
        echo json_encode(["data"=>"$respuesta"], JSON_UNESCAPED_UNICODE);
        exit();
    } else 
        $sqlEstacionamientoHorario = mysqli_query($conexionBD,"UPDATE playadeestacionamientohorario SET idPlayaDeEstacionamiento='$idPlayaDeEstacionamiento', diaSemana='$diaSemana', horaInicio='$horaInicio', horaFin='$horaFin', nombreDia='$nombreDia' WHERE idHorario='$idHorario'");
        if($sqlEstacionamientoHorario){
            echo json_encode(["data"=>"ok"], JSON_UNESCAPED_UNICODE);
        }
    exit();
    }
    

// Consulta todos los registros de la tabla
$sqlEstacionamientoHorario = mysqli_query($conexionBD,"SELECT ph.idHorario, pe.nombrePlayaDeEstacionamiento as 'nombrePlayaDeEstacionamiento', ph.nombreDia, ph.horaInicio, ph.horaFin FROM `playadeestacionamientohorario` ph LEFT JOIN playadeestacionamiento pe on pe.idPlayaDeEstacionamiento = ph.idPlayaDeEstacionamiento");
if(mysqli_num_rows($sqlEstacionamientoHorario) > 0){
    $estacionamientoHorario = mysqli_fetch_all($sqlEstacionamientoHorario,MYSQLI_ASSOC);
    echo json_encode($estacionamientoHorario);
}
else { 
    echo json_encode([["data"=>"ok"]]); 
}


?>