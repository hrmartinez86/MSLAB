<?php 
    
    include('librerias/consultas.php');
    // Read POST data
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
    $ns=$n+1;
    $nc=str_pad($ns,3,"0",STR_PAD_LEFT);
    $json = file_get_contents("Ingreso.json");
    $data = json_decode($json);
    $array = Array (
    "{$n}" => Array (
        "id" => "{$nc}",
        "nombre" => $name,
        "sexo" => $sexo,
        "fechaNacimiento"=>$fecha_de_nacimiento,
        "procedencia"=>$procedencia,
        "doctor"=>$Doctor,
        "telefono"=>$Telefono,
        "email"=>$correo,
        "formaPago"=>$formaPago
    )  
    );
    $data[] = $array;
    file_put_contents("Ingreso.json", json_encode($data));
    echo '1';
?>

