<?php 
    session_start();
    $empresa=1;
    include("paciente.php");
    include("folio.php");
    include("cajDetPrestaciones.php");
    include("procedencia.php");
    include("librerias/conection.php");
    if ($_SERVER['REQUEST_METHOD']=='POST' && isset($_FILES['upload']['type'])) {
        
        $fecha=$_POST["fecha"];
        echo $fecha;
        // // Read the JSON file
        $json = file_get_contents('C:\xampp\htdocs\laboratorio\MSLAB\WEB\ingreso.json');

        // // Decode the JSON file
        $json_data = json_decode($json,true);

        foreach ($json_data as $key => $value) {
            // echo "{$key}=>{$value}";
            foreach ($value as $key2 => $value2) {
                $procedencia=IngresaProcedencia($value2['procedencia']);
                echo $value2['id'];
                echo $value2['nombre'];
                $pac=IngresaPaciente($value2['nombre'],$value2['telefono'],
                $value2['email'],$value2['fecha'],$empresa);
                $idpaciente=IngresaFolio($pac,1,$procedencia,'EXT',1,$fecha);
                IngresarCajDetPrestaciones($idpaciente,$fecha);
                echo $value2['doctor'];
                echo $value2['procedencia'];
                echo $value2['telefono'];
                echo $value2['email'];
                echo "<br>";
            }
        }



    }
?>