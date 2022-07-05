<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Headers: Token, token, Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

  $method = $_SERVER['REQUEST_METHOD'];
    include "conectar.php";

    $conexionDB = conectarDB();
    //sleep(1);	
	$JSONData = file_get_contents("php://input");
	$dataObject = json_decode($JSONData);    
    session_start();    
    $conexionDB->set_charset('utf8');

	$dni = $dataObject-> dni;
	$pas =	$dataObject-> clave;
  
  if ($nueva_consulta = $conexionDB->prepare("SELECT 
  u.idUsuario, u.nombre, u.dni, u.clave, u.email, u.idRol, r.nombreRol
  FROM usuarios u
  INNER JOIN roles r ON u.idRol = r.idRol
  WHERE u.dni = ?")) {
        $nueva_consulta->bind_param('s',$dni);
        $nueva_consulta->execute();
        $resultado = $nueva_consulta->get_result();
        if ($resultado->num_rows == 1) {
              $datos = $resultado->fetch_assoc();
              $encriptado_db = $datos['clave'];
              //error_log ($pas, 3, 'D:\error.txt');
              //error_log ($encriptado_db, 3, 'D:\error.txt');
            if (password_verify($pas, $encriptado_db))
            {
              $_SESSION['dni'] = $datos['dni'];
              echo json_encode(array('conectado'=>true,'idUsuario'=>$datos['idUsuario'], 'nombre'=>$datos['nombre'], 'dni'=>$datos['dni'], 'clave'=>$datos['clave'], 'email'=>$datos['email'],'nombreRol'=>$datos['nombreRol'], 'idRol'=>$datos['idRol']) );
            }
              else {
                echo json_encode(array('conectado'=>false, 'error' => 'Los datos ingresados son incorrectos.'));
                  }
        }
        else {
              echo json_encode(array('conectado'=>false, 'error' => 'Los datos ingresados son incorrectos.'));
        }
        $nueva_consulta->close();
      }
      else{
        echo json_encode(array('conectado'=>false, 'error' => 'No se pudo conectar a BD'));
      }
$conexionDB->close();
?>