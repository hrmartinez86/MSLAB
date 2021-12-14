<?php

function conectar()
{
$conection = odbc_connect("laboratorio_demo", "sa", "Demo123.") or die ("<h1 align='center'>ERROR EN LA IDENTIFICACION DE USUARIO EN LA ASE DE DATOS FAVOR DE CONSULTAR A SU PROVEEDOR</h1><br> <a href=\"index.php\" title=\"Regresar a la pagina principal\" target=\"_self\"><center>REGRESAR</center></a>");
return $conection;
}





?>