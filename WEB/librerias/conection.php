<?php
function conectar(){
    $servername = "localhost";
    $username = "root";
    $password = "";
    $base="laboratorioestudios";

    // Create connection
    $conn = new mysqli($servername, $username, $password,$base);

    // Check connection
    if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    }
    return $conn;
}


?>