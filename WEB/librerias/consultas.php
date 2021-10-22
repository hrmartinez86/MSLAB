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
        $link = conectar();
    
        // Chequea coneccion
        if($link === false){
            die("ERROR: No pudo conectarse con la DB. " . mysqli_connect_error());
        }
        $n++;
        // Ejecuta la actualizacion del registro
        $sql = "UPDATE consecutivo SET id=".$n;
        if(mysqli_query($link, $sql)){

            echo "Registro actualizado.";
        } else {
            echo "ERROR: No se ejecuto $sql. " . mysqli_error($link);
        }
        // Cierra la conexion
        mysqli_close($link);
    }
    
?>