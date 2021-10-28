<?php 
    include("../conection.php");

    function rescataNumero()
    {

        $link = conectar();
    
        // Chequea coneccion
        if($link === false){
            die("ERROR: No pudo conectarse con la DB. " . mysqli_connect_error());
        }
        $sql = "select * from consecutivo ";
        $resultado = $link->query($sql);
        while($r=$resultado->fetch_assoc()) {
            $nR=$r['id'];
        }
        mysqli_close($link);
        return $nR;
    }

    function actualizaNumero($n)
    {
        echo "<script> console.log('act');</script>";
        $link = conectar();
    
        // Chequea coneccion
        if($link === false){
            die("ERROR: No pudo conectarse con la DB. " . mysqli_connect_error());
        }
        // Ejecuta la actualizacion del registro
        $sql = "UPDATE consecutivo SET id=".$n;
        echo "<script> console.log('".$sql."');</script>";
        if(mysqli_query($link, $sql)){

            echo "1";
        } else {
            echo "ERROR: No se ejecuto $sql. " . mysqli_error($link);
        }
        // Cierra la conexion
        mysqli_close($link);
    }
    
?>