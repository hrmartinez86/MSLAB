<?php 
    session_start();
    $empresa=1;
    include("paciente.php");
    include("folio.php");
    include("librerias/conection.php");
    if ($_SERVER['REQUEST_METHOD']=='POST' && isset($_FILES['upload']['type'])) {
        echo 'Verdadero '.$_FILES["upload"]["tmp_name"];
    
        // // Read the JSON file
        $json = file_get_contents('C:\xampp\htdocs\MSLAB\WEB\ingreso.json');

        // // Decode the JSON file
        $json_data = json_decode($json,true);

        foreach ($json_data as $key => $value) {
            // echo "{$key}=>{$value}";
            foreach ($value as $key2 => $value2) {
                
                echo $value2['id'];
                echo $value2['name'];
                $pac=IngresaPaciente($value2['name'],$value2['telefono'],
                $value2['email'],$value2['fecha'],$empresa);
                $idpaciente=IngresaFolio($pac,1,82,'EXT',1);
                echo $value2['doctor'];
                echo $value2['procedencia'];
                echo $value2['telefono'];
                echo $value2['email'];
                echo "<br>";
            }
        }



    }
?>