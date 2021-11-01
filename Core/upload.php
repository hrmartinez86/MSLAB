<?php 
    include("controlador.paciente.php");
    $ODBC = $_SESSION["ODBC"];

    $db_conn = conectar($ODBC);

    if ($_SERVER['REQUEST_METHOD']=='POST' && isset($_FILES['upload']['type'])) {
        echo 'Verdadero '.$_FILES["upload"]["tmp_name"];
    
        // Read the JSON file
        $json = file_get_contents('C:\xampp\htdocs\MSLAB\WEB\ingreso.json');

        // Decode the JSON file
        $json_data = json_decode($json,true);

        foreach ($json_data as $key => $value) {
            // echo "{$key}=>{$value}";
            foreach ($value as $key2 => $value2) {
                
                echo $value2['id'];
                echo $value2['name'];
                echo $value2['doctor'];
                echo $value2['procedencia'];
                echo $value2['telefono'];
                echo $value2['email'];
                echo "<br>";
            }
        }



    }
?>