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
	$JSONData = file_get_contents("php://input");
	$dataObject = json_decode($JSONData);    
    session_start();    
    $conexionBD->set_charset('utf8');

date_default_timezone_set("America/Argentina/Buenos_Aires");
$respuesta = "";
$fechaActual=date("Y-m-d");
date_default_timezone_set("America/Argentina/Buenos_Aires");
$horaActual=date_create();
$horaActual=date_format($horaActual, 'H:i:s');

//echo "pase la conexion::::  ";

    //Definicion de variables recibidas del post

    //--------En produccion-------

    /* $idUsuario= $_POST['Id_Usuario']; 
    date_default_timezone_set("America/Argentina/Buenos_Aires");
    $horaActual = date_create();
    $horaActual = date_format($horaActual, 'H:i:s');
    $fechaActual = date("Y-m-d");
    $idPlayaDeEstacionamiento = $_POST['idPlayaEstacionamiento'];
    $idEstacionamientoHorario = $_POST('idHorario');
    $idPlayaDeEstacionamientoHorario = $_POST('idPlayaEstacionamientoHorario');*/


    //---------En prueba----------

    /*$idUsuario = 34;
    date_default_timezone_set("America/Argentina/Buenos_Aires");
    $horaActual = date_create();
    $horaActual = date_format($horaActual, 'H:i:s');
    $fechaActual = date("Y-m-d");
    $idPlayaDeEstacionamiento = '1';
    $diaSemana = date('w');*/

    if(isset($_GET["estacionar"])){
        $data = json_decode(file_get_contents("php://input"));
        $idPlayaDeEstacionamiento=$_GET["estacionar"];
        //$idUsuario=$data->idUsuario;
        /*$idUsuario='34';*/
        $idUsuario=$_GET["idUsuario"];
        /*$idPlayaDeEstacionamiento='1';*/
        $diaSemana=date('w');
        //error_log ($idUsuario, 3, 'D:\Escritorio\linea48.txt');
        $sql2 = mysqli_query($conexionBD, "SELECT * FROM estacionamiento e WHERE e.idUsuario = $idUsuario and e.fechaEstacionamiento = '$fechaActual' and e.horaFinEstacionamiento is null");
        $resultado2 = mysqli_num_rows($sql2);
        $sql3 = mysqli_query($conexionBD, "SELECT playadeestacionamientohorario.idHorario
        FROM `playadeestacionamientohorario` 
        WHERE '$horaActual' BETWEEN playadeestacionamientohorario.horaInicio and playadeestacionamientohorario.horaFin 
        and playadeestacionamientohorario.diaSemana = $diaSemana and playadeestacionamientohorario.idPlayaDeEstacionamiento = $idPlayaDeEstacionamiento");
        $resultado3 = mysqli_num_rows($sql3);

        if($resultado3 == 0){
            echo json_encode(["data"=>"sin_horario"]);
            exit();
        }

        if ($resultado2 == 0) {
        //if (($horaActual > "00:00:00") and ($horaActual < "23:59:59")) {
            $sql = mysqli_query($conexionBD,"INSERT INTO `estacionamiento`(`idUsuario`, `idPlayaDeEstacionamiento`, `idPlayaDeEstacionamientoHorario`, `fechaEstacionamiento`, 
                `horaInicioEstacionamiento`) 
                VALUES ($idUsuario, $idPlayaDeEstacionamiento, (SELECT playadeestacionamientohorario.idHorario
                FROM `playadeestacionamientohorario` 
                WHERE '$horaActual' BETWEEN playadeestacionamientohorario.horaInicio and playadeestacionamientohorario.horaFin 
                and playadeestacionamientohorario.diaSemana = $diaSemana and playadeestacionamientohorario.idPlayaDeEstacionamiento = $idPlayaDeEstacionamiento),
                '$fechaActual', '$horaActual')");
            
            //RESTO UNO A LA CAPACIDAD DE LUGARES LIBRES
            $sql2= mysqli_query ($conexionBD, "UPDATE `playadeestacionamiento` SET `lugaresLibres` = (lugaresLibres - 1) WHERE idPlayaDeEstacionamiento = $idPlayaDeEstacionamiento");
            
            // echo json_encode(["success"=>1]);    
            $respuesta = "estacionado";
        } else {// puede traer error, manda 0 al front
                $respuesta = "ya_estacionado";
        };
        echo json_encode(["data"=>"$respuesta"]);
        exit();
    }

    if(isset($_GET["desestacionar"])){
        $data = json_decode(file_get_contents("php://input"));
        $idUsuario=$_GET["idUsuario"];
        $horaActual=date_create();
        $horaActual=date_format($horaActual, 'H:i:s');

        $sql3 = mysqli_query($conexionBD, "SELECT * from estacionamiento e where e.idUsuario = $idUsuario and e.fechaEstacionamiento = '$fechaActual' and e.horaFinEstacionamiento is null");
        $resultado3 = mysqli_num_rows($sql3);

        if($resultado3 != 0){
            $sql2= mysqli_query ($conexionBD, "UPDATE `playadeestacionamiento` SET `lugaresLibres` = (playadeestacionamiento.lugaresLibres + 1) WHERE playadeestacionamiento.idPlayaDeEstacionamiento = (SELECT estacionamiento.idPlayaDeEstacionamiento FROM estacionamiento WHERE estacionamiento.idUsuario = '$idUsuario' and estacionamiento.fechaEstacionamiento = '$fechaActual' and estacionamiento.horaFinEstacionamiento is null)");
            $sql = mysqli_query($conexionBD,"UPDATE `estacionamiento` SET `horaFinEstacionamiento` = '$horaActual' WHERE idUsuario = $idUsuario and fechaEstacionamiento = '$fechaActual' and horaFinEstacionamiento is null");
            $respuesta = "desestacionado";
        } else {
            $respuesta = "no_estacionado";
        } 
        echo json_encode(["data"=>"$respuesta"]);
        }      
        
    $conexionBD->close();
    exit();

/*
error_log ($idUsuario, 3, 'D:\ID.txt');
error_log ($horaActual, 3, 'D:\hora.txt');
error_log ($fechaActual, 3, 'D:\fecha.txt');
error_log ($diaSemana, 3, 'D:\dia.txt');
error_log($idPlayaDeEstacionamiento, 3, 'D:\idPlaya.txt');
*/


/*header('Content-Type: application/json');
//Ejecuta la consulta
if ($resultado = $conn->query($sql)) {
    echo json_encode('Ok', JSON_FORCE_OBJECT);
} else {
    echo json_encode('ERROR', JSON_FORCE_OBJECT);
}
//echo ("pase la ejecucion");

//Arma la cabecera "json"
header('Content-Type: application/json');

//Verifica si encontro filas en la tabla
//if ($resultado->num_rows > 0) {
//El resultado (resulset) se recorre con el while	
//A cada fila (en este caso es una sola) la carga en un array 
//    while ($fila=mysqli_fetch_array($resultado)){
//    $usuario = array ('Id_usuario' => $fila['ID_USUARIO']);
//    }
//} else {
//Si no existe crea el array con todos valores vacios	
//    $usuario = array ('Id_usuario'=>'');
//}	

//Codifica y retorna en formato json el array

//cierra la conexion
*/
?>
