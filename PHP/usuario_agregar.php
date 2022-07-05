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

//Inserta un nuevo registro y recepciona en método post los datos de nombre y correo
if(isset($_GET["insertar"])){
    $data = json_decode(file_get_contents("php://input"));
    $dni=$data->dni;
    $nombre=$data->nombre;
    $password=$data->clave;
    $email=$data->email;

    $clave = password_hash($password, PASSWORD_DEFAULT);    
    
    if(($dni!="")&&($nombre!="")&&($password!="")&&($email!="")){            
            $sql = mysqli_query($conexionBD,"INSERT INTO `usuarios`(`nombre`, `dni`, `clave`, `email`) VALUES ('$nombre','$dni','$clave','$email')");
            echo json_encode(["success"=>1]);
        }
    exit();
}
?>

