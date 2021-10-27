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
    // $examenes = htmlspecialchars($_POST["examenes"]);
    // $examenesTotal =json_decode($_POST["examenesDescripcion"],false);
    // $Telefono=htmlspecialchars($_POST["telefono"]);
    // $Email=htmlspecialchars($_POST["correo"]);
    // $hoy = date("d/m/Y");
    // $CitasProcedencia = htmlspecialchars($_POST["CitasProcedencia"]);
    // $n=rescataNumero();
    // $ns=$n+1;
    // $nc=str_pad($ns,3,"0",STR_PAD_LEFT);
    // echo "<script> console.log('".$nc."');</script>";
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
?>

