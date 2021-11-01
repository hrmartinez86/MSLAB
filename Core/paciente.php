<?php 
    session_start();
    $ODBC = $_SESSION["ODBC"];
    $db_conn = conectar($ODBC);

    function IngresaPaciente($nombre,$telefono,$email,$fecha){

    }
?>