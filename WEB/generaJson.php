<?php 
    
    include('librerias/consultas.php');
    include('librerias/conection.php');
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
    $Total=$data->total;
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
        "formaPago"=>$formaPago,
        "total"=>$Total
    )  
    );
    $data[] = $array;
    file_put_contents("Ingreso.json", json_encode($data));
    
    $link = conectar();
    
    // Chequea coneccion
    if($link === false){
        die("ERROR: No pudo conectarse con la DB. " . mysqli_connect_error());
    }
    // Ejecuta la actualizacion del registro
    $sql = "UPDATE consecutivo SET id=".$ns;
    
    if(mysqli_query($link, $sql)){

        echo $ns;
    } else {
        echo "ERROR: No se ejecuto $sql. " . mysqli_error($link);
    }
    // Cierra la conexion
    mysqli_close($link);
?>

