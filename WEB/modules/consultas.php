<?php 
session_start();
//header("Cache-control: private"); //Arregla IE 6 
//include_once(RelativePath . "/Barra.php");       
if ($_SESSION['estado']=="ok" ) {
} 
else {
    header("Location: index.php"); 
    
}
include ("../librerias/conection.php");
class Resultados{
    function números_pequeños()
    {
        return array (0, 1, 2);
    }
}
?>