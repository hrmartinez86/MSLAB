<?php 
    session_start();
    
    //header("Cache-control: private"); //Arregla IE 6 
    //include_once(RelativePath . "/Barra.php");       
    if ($_SESSION['estado']=="ok" ) {
    } 
    else {
        header("Location: index.php"); 
        
    }

    function resultados($idPaciente,$llave)
    {
        global $ODBC;
        $ODBC=$_SESSION["ODBC"];
        $link=conectar($ODBC);
        $sql="SISTEMA_RESULTADOS_WEB_EDITXCF @X_IDPACIENTE='".$llave."',@CF='".$idPaciente."'";
        $son=odbc_exec($link,$sql) or die ("error aqui".odbc_errormsg());
        while($row =odbc_fetch_array($son) )
                    { 
                        $I_Info[]=array('Info'=>$row['DESC_PRU'],
                                        'Res'=>$row['RESULTADO'],
                                        'um'=>$row['UNIDADES_MEDIDA']);
                        //echo "<script> console.log('".$row['DESRESULTADOC_PRU']."');</script>";
                    }
        return $I_Info;	
    }

?>