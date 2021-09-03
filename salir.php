<?php

session_start();
header("Cache-control: private"); //Arregla IE 6   descoloco todas la variables de la sesión
 session_unset();  // Destruyo la sesión
 session_destroy();
 
// Y me voy al inicio
 header("Location: index.php");
     echo "<html></html>";
   exit;
?>