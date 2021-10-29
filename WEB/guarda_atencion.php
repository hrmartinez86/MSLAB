
<?php
//include_once(RelativePath . "/Barra.php");
session_start();
     
if ($_SESSION['estado'] == "ok") {
} else {

  header("Location: ../index.php");
  echo "<html></html>";
}
include('Librerias/conection.php');    //ESTABLACE LA CADENA DE CONEXION CON EL SERVIDOR MSSQL .   
include('librerias/consultas.php');


$db_conn = conectar();
$data = json_decode(file_get_contents("php://input"));
$name = $data->name;
$sexo = $data->sex;
$fecha_de_nacimiento= $data->fn;
$procedencia=$data->proc;
$Doctor=$data->doc;
$formaPago=$data->fp;
$Telefono=$data->tel;
$correo=$data->email;
$n=$data->id;
$Total=$data->total;
$estudios=$data->estudios;

$sql = "INSERT INTO dat_paciente (nombre, fechaNacimieno, sexo,telefono,email)
VALUES ('".$name."', '".$fecha_de_nacimiento."', '".$sexo."','".$Telefono."','".$correo."')";

// echo $sql;
if ($db_conn->query($sql) === TRUE) {
  // echo "New record created successfully";
 $idPaciente= $db_conn->insert_id;
 echo $idPaciente;
} else {
  echo "Error: " . $sql . "<br>" . $db_conn->error;
}

$db_conn->close();

$sql = "INSERT INTO dat_dfipa (nombre, fechaNacimieno, sexo,telefono,email)
VALUES ('".$name."', '".$fecha_de_nacimiento."', '".$sexo."','".$Telefono."','".$correo."')";

// echo $sql;
if ($db_conn->query($sql) === TRUE) {
  // echo "New record created successfully";
 $idPaciente= $db_conn->insert_id;
 echo $idPaciente;
} else {
  echo "Error: " . $sql . "<br>" . $db_conn->error;
}

$db_conn->close();

?>
