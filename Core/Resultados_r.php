<?php
//include_once(RelativePath . "/Barra.php");
session_start();
header("Cache-control: private"); //Arregla IE 6 
//include_once(RelativePath . "/Barra.php");       
if ($_SESSION['estado'] == "ok") {
} else {

  header("Location: ../index.php");
  echo "<html></html>";
}
include('Librerias/conection.php');    //ESTABLACE LA CADENA DE CONEXION CON EL SERVIDOR MSSQL .   

$ODBC = $_SESSION["ODBC"];
$examenesArray=array();
echo '<script>';
echo 'console.log(' . json_encode($ODBC) . ');';
echo '</script>';
//$conection=conectar($ODBC);
$db_conn = conectar($ODBC);
//$db_conn2=conectar($ODBC);        
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>

<HEAD>
  <TITLE>Ingreso de Resultados</TITLE>
  <META content="text/html; UTF-8" http-equiv=Content-Type>
  <META content="MSHTML 5.00.2314.1000" name=GENERATOR>
  <meta http-equiv="imagetoolbar" content="no">
  <link rel="stylesheet" type="text/css" href="../WEB/Styles/Core/Style_doctype.css">
  <!-- <!#E3E3E3> -->
  <!-- <style type="text/css">
.Estilo3 {font-family: "Times New Roman", Times, serif}
    <!--
    body {
	SCROLLBAR-FACE-COLOR:#6699CC;
	SCROLLBAR-HIGHLIGHT-COLOR: #6699CC;
	SCROLLBAR-SHADOW-COLOR: #6699CC;
	SCROLLBAR-3DLIGHT-COLOR: #FFFFFF;
	SCROLLBAR-ARROW-COLOR: #FFFFFF;
	SCROLLBAR-TRACK-COLOR: #375aa6;
	SCROLLBAR-DARKSHADOW-COLOR: #000000;
	background-color: #000000;
    }
    -->
  <!--  .txt_{font-family:Verdana;font-size:12px;color:#FFFFFF;text-decoration:none;}

</style> -->


  <script language="javascript" type="text/javascript" src="librerias/ajax.js"></script>
  <script language="javascript" type="text/javascript" src="js/mambo.js"></script>
</HEAD>
<!--  <BODY aLink=#cccccc leftMargin=0 link=#ffffff onLoad="" text=#ffffff topMargin=0 vLink=#cccccc MARGINWIDTH="0" MARGINHEIGHT="0"> -->

<body>
  <table align="center" border="0" cellspacing="0" cellpadding="0">
    <!-- BEGIN Record Citas -->
    <tr>
      <td valign="top">
        <?php include("Header.html") ?>
      </td>
    </tr>
  </table>
  <br></br>
  <table border="0" cellspacing="0" cellpadding="0">
    <tr>
      <!--      <td valign="top">-->
      <table class="Header" border="0" cellspacing="0" cellpadding="0" width="30">
        <tr>
          <td class="HeaderLeft"><img border="0" alt="" src="WEB/Styles/Core/Images/Spacer.gif"></td>
          <td class="th"><strong>Folio:</strong></td>
          <td class="HeaderRight"><img border="0" alt="" src="WEB/Styles/Core/Images/Spacer.gif"></td>
          <td><input type="hidden" name="tipo" id="tipo" size="4" value="<?php echo $_GET['t']; ?>"></td>
        </tr>

      </table>
      <!--</table>-->
      <?php if ($_GET['t'] == 1) {
        $sql = "select codigo from lab_procedencia where ODBC='" . $ODBC . "'";
        echo '<script>';
        echo 'console.log(' . json_encode($sql) . ');';
        echo '</script>';

        $query = odbc_exec($db_conn, $sql);

        echo $sql;
        while ($result = odbc_fetch_array($query)) {
          $cod = $result['codigo'];
          $cod = str_pad($cod, 2, "0", STR_PAD_LEFT);
        }

        $fxini = $_GET['foliod'];
        $fxfin = $_GET['folioh'];

        if ($fxfin == "") {
          $fxfin = "x";
        } else {
          $fxfin = str_pad($fxfin, 6, "0", STR_PAD_LEFT);
          $fxfin = $cod . $fxfin;
        }

        if ($fxini == "") {
          $fxini = "x";
        } else {
          $fxini = str_pad($fxini, 6, "0", STR_PAD_LEFT);
          $fxini = $cod . $fxini;
        }
      }



      ?>
      <form id="Foliof" method="get" name="Foliof" action="">
        <table border="0" cellspacing="0" cellpadding="0" width="1154">

          <tr>

            <td> <select id="Folio" name="Folio" onchange="folio()">
                <?php

                $fecha = date("d/m/Y");
                //primero checo si hay referencia de folios

                if ($_GET['t'] == 1) {
                  if ($_GET['folioh'] == "") {
                    $sql = "SELECT     idpaciente AS id , numero FROM dat_dfipa WHERE     numero =" . $fxini . " order by numero";
                  } else {
                    $sql = "SELECT     idpaciente AS id , numero FROM dat_dfipa WHERE     numero between " . $fxini . " and " . $fxfin . " order by numero";
                  }
                }




                if ($_GET['t'] == 0) {
                  
                  $sql = "EXECUTE LISTA_RESULTADOS_WEB @TIPO='" . $tipo . "',@PROCEDENCIA='" . $proc . "',@SECCION='" . $sec . "',@FECHA_DESDE=convert(datetime,'" . $fecha . "',103),@FECHA_HASTA=conver(datetime,'" . $fecha . "',103),@EXP='" . $exp . "',@NOMBRE='" . $nombre . "',@APELLIDO='" . $ape . "'";
                }

                if ($_GET['t'] == 3) {
                  $infocon = $_GET['FI'];

                  $f = explode("-", $infocon);
                  $ini = $f[2] . "/" . $f[1] . "/" . $f[0];

                  $ffin = $_GET['FF'];
                  $f = explode("-", $ffin);

                  $fin = $f[2] . "/" . $f[1] . "/" . $f[0];

                  $sql = "EXECUTE LISTA_RESULTADOS_WEB @TIPO='" . $tipo . "',@PROCEDENCIA='" . $proc . "',@SECCION='" . $sec . "',@FECHA_DESDE='" . $ini . "',@FECHA_HASTA='" . $fin . "',@EXP='" . $exp . "',@NOMBRE='" . $nombre . "',@APELLIDO='" . $ape . "'";
                  
                  echo "<script> console.log('".$sql."');</script>";
                }
                
                $query = odbc_exec($db_conn, $sql);
                $idpac = $_GET['id'];

                while ($result = odbc_fetch_array($query)) {
                  if ($result['id'] == $idpac) {

                    echo '<option  value="' . $result['id'] . '" selected>' . str_pad($result['numero_registro'],3,"0",STR_PAD_LEFT). '-'. $result['Nombre'].'-'. substr($result['Fecha'],0,10).'</option>';
                  } else {
                    echo '<option  value="' . $result['id'] . '">' . str_pad($result['numero_registro'],3,"0",STR_PAD_LEFT). '-'. $result['Nombre'].'-'. substr($result['Fecha'],0,10).'</option>';
                  }
 
                }




                ?>
              </select>
            </td>
          </tr>
          <tr>

            <td><input type="hidden" name="id" id="id" size="50" value="<?php if ($_GET['id'] == "") {
                                                                          echo $paciente[0];
                                                                        } else {
                                                                          echo $idpac;
                                                                        }; ?>"></td>
          </tr>
          <tr>
            <!-- <td><input type="submit" value="Enviar" /></td> -->
          </tr>


        </table>
      </form>

      <!--<table border="0" cellspacing="0" cellpadding="0">-->
    <tr>
      <td valign="top">
        <table class="Header" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td class="HeaderLeft"><img border="0" alt="" src="WEB/Styles/Core/Images/Spacer.gif"></td>
            <td class="th"><strong>Secci&oacute;n:</strong></td>
            <td class="HeaderRight"><img border="0" alt="" src="WEB/Styles/Core/Images/Spacer.gif"></td>
          </tr>

        </table>
        <!--</table>-->

        <!-- <form id="Seccionf" method="get" name="Seccion" action="Resultadosxsec.php">   -->
        <form id="Seccionf" method="get" name="Seccion" action="Resultados_r.php">
          <table border="0" cellspacing="0" cellpadding="0" width="300">

            <tr>

              <td> <select id="Secciond" name="Secciond" onchange="javascript:Seccionf.submit()">
                  <?php
                  $m = 0;
                  $fecha = date("d/m/Y");

                  if ($_GET['t'] == 0) {
                    $sql = "SELECT     idpaciente AS id FROM         dat_dfipa WHERE     (fecha = CONVERT(datetime, '" . $fecha . "', 103))";
                  } else

            	if ($_GET['t'] == 1) {
                    if ($_GET['folioh'] == "") {
                      $sql = "SELECT     idpaciente AS id FROM         dat_dfipa WHERE     numero = '" . $fxini . "'";
                    } else {
                      $sql = "SELECT     idpaciente AS id FROM         dat_dfipa WHERE     numero between " . $fxini . " and " . $fxfin;
                    }
                  } //$sql="SELECT     idpaciente AS id FROM         dat_dfipa WHERE     (fecha = CONVERT(varchar(10), '29/09/2010', 103))";
                  // 
                  if ($_GET['t'] == 3) {
                    $sql = "EXECUTE LISTA_RESULTADOS_WEB @TIPO='" . $tipo . "',@PROCEDENCIA='" . $proc . "',@SECCION='" . $sec . "',@FECHA_DESDE='" . $ini . "',@FECHA_HASTA='" . $fin . "',@EXP='" . $exp . "',@NOMBRE='" . $nombre . "',@APELLIDO='" . $ape . "'";
                  }
                  echo $sql;
                  $query = odbc_exec($db_conn, $sql);

                  while ($result = odbc_fetch_array($query)) {
                    $paciente[$m] = $result['id'];

                    $m = $m + 1;
                  }

                  echo '<option value="1">"TODOS"</option>';
                  if ($_GET['Seccion'] != "") {
                    $sql = "SELECT     lab_relacion_laboratorio_seccion.cod_llave AS codigo, lab_secciones.descripcion AS descripcion
FROM         lab_relacion_laboratorio_seccion INNER JOIN
                      lab_secciones ON lab_relacion_laboratorio_seccion.seccion = lab_secciones.codigo where lab_relacion_laboratorio_seccion.cod_llave='" . $_GET['Seccion'] . "'";
                  } else {
                    if ($idpac == "") {
                      $sql = "SELECT   DISTINCT    lab_relacion_laboratorio_seccion.cod_llave AS codigo, lab_secciones.descripcion FROM caj_det_prestaciones INNER JOIN caj_codigos_fonasa ON caj_det_prestaciones.llave_fonasa = caj_codigos_fonasa.llave_fonasa INNER JOIN lab_relac_fonasa_perfil ON caj_det_prestaciones.llave_fonasa = lab_relac_fonasa_perfil.llave_fonasa INNER JOIN lab_RLS_perfiles ON lab_relac_fonasa_perfil.llave_perfil = lab_RLS_perfiles.llave_perfil INNER JOIN lab_relacion_laboratorio_seccion ON lab_RLS_perfiles.cod_llave = lab_relacion_laboratorio_seccion.cod_llave INNER JOIN lab_secciones ON lab_relacion_laboratorio_seccion.seccion = lab_secciones.codigo WHERE     (caj_det_prestaciones.idpaciente =" . $paciente[0] . ") ORDER BY lab_secciones.descripcion";
                    } else {
                      $sql = "SELECT   DISTINCT    lab_relacion_laboratorio_seccion.cod_llave AS codigo, lab_secciones.descripcion FROM caj_det_prestaciones INNER JOIN caj_codigos_fonasa ON caj_det_prestaciones.llave_fonasa = caj_codigos_fonasa.llave_fonasa INNER JOIN lab_relac_fonasa_perfil ON caj_det_prestaciones.llave_fonasa = lab_relac_fonasa_perfil.llave_fonasa INNER JOIN lab_RLS_perfiles ON lab_relac_fonasa_perfil.llave_perfil = lab_RLS_perfiles.llave_perfil INNER JOIN lab_relacion_laboratorio_seccion ON lab_RLS_perfiles.cod_llave = lab_relacion_laboratorio_seccion.cod_llave INNER JOIN lab_secciones ON lab_relacion_laboratorio_seccion.seccion = lab_secciones.codigo WHERE     (caj_det_prestaciones.idpaciente =" . $idpac . ") ORDER BY lab_secciones.descripcion";
                    }
                  }
                  $query = odbc_exec($db_conn, $sql);
                  echo $sql;
                  while ($result = odbc_fetch_array($query)) {

                    if ($result['codigo'] == $_GET['Secciond']) {

                      echo '<option value="' . $result['codigo'] . '" selected>' . $result['descripcion'] . '</option>';
                    } else {
                      echo '<option value="' . $result['codigo'] . '">' . $result['descripcion'] . '</option>';
                    }
                  }


                  ?>
                </select>

              </td>
            </tr>
            <tr>

              <table class="Header" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <!--<td class="HeaderLeft"><img border="0" alt="" src="WEB/Styles/Core/Images/Spacer.gif"></td>-->
                  <td class="th"><strong>Doctor:</strong></td>
                  <!--<td class="HeaderRight"><img border="0" alt="" src="WEB/Styles/Core/Images/Spacer.gif"></td>-->
                </tr>
                <tr>

                  <TD><LABEL><?php $sql = "SELECT NOMBRE + ' ' + APELLIDOS AS NOMBRE FROM dat_doctores DD INNER JOIN dat_dfipa DF ON DF.doctor=DD.llave_doctor WHERE IDPACIENTE=" . $_GET['id'];
                              $query = odbc_exec($db_conn, $sql);

                              while ($result = odbc_fetch_array($query)) {
                                echo $result['NOMBRE'];
                              }

                              ?></LABEL></TD>
                </tr>
              </table>

              <td><input type="image" src="imagenes/validar.jpg" width="121" height="27" name="validar" onClick="validarres_r('<?php echo $_GET['id']; ?>')"> </td>

              <td><input type="image" src="imagenes/desvalidar.jpg" width="121" height="27" name="validar" onClick="desvalidarres_r('<?php echo $_GET['id']; ?>')"> </td>
            </tr>
            <tr>
              <td><input type="hidden" name="id" id="id" size="50" value="<?php if ($idpac == "") {
                                                                            echo $paciente[0];
                                                                          } else {
                                                                            echo $idpac;
                                                                          } ?>"></td>
              <td><input type="hidden" name="FI" id="FI" size="50" value="<?php echo $_GET['FI']; ?>"></input></td>
              <td><input type="hidden" name="FF" id="FF" size="50" value="<?php echo $_GET['FF']; ?>"></input></td>
              <td><input type="hidden" name="Seccion" id="Seccion" size="50" value="<?php echo $_GET['Seccion']; ?>"></input></td>
              <td><input type="hidden" name="foliod" id="foliod" size="50" value="<?php echo $_GET['foliod']; ?>"></td>
              <td><input type="hidden" name="folioh" id="folioh" size="50" value="<?php echo $_GET['folioh']; ?>"></td>
              <td><input type="hidden" name="t" id="t" size="50" value="<?php echo $_GET['t']; ?>"></td>
            </tr>

            <tr>
              <td></td>
              <td></td>



            </tr>


          </table>
        </form>
        <table align="left" width="100">
          <tr>
            <td><input type="image" src="imagenes/fileprint.gif" width="29" height="27" name="Ant" onClick="imprimir()" title="Imprimir"> </td>
            <td><input type="image" src="imagenes/lapiz.jpg" width="52" height="50" name="Ant" onClick="editar(<?php if ($idpac == "") {
                                                                                                                  echo $paciente[0];
                                                                                                                } else {
                                                                                                                  echo $idpac;
                                                                                                                } ?>)" title="Editar paciente"> </td>
            <td><input type="image" src="../WEB/images/codigo_b.png" width="52" height="50" name="Ant" onClick="imprimeEtiquetas(<?php if ($idpac == "") {
                                                                                                                  echo $paciente[0];
                                                                                                                } else {
                                                                                                                  echo $idpac;
                                                                                                                } ?>)" title="Etiquetas"> </td>
            <td><input type="image" src="../images/Core/botones/papel.png" width="52" height="50" name="Ant" onClick="imprimeComprobante(<?php if ($idpac == "") {
                                                                                                                  echo $paciente[0];
                                                                                                                } else {
                                                                                                                  echo $idpac;
                                                                                                                } ?>)" title="Comprobante Atención"> </td> 
          </tr>
        </table>
        <table align="center" border="0" cellspacing="0" cellpadding="0" width="100">
          <tr>

            <td><input type="image" src="imagenes/flechizq1.jpg" width="29" height="27" name="Ant" onClick="ant()"> </td>
            <td><input type="image" src="imagenes/flechder1.jpg" width="29" height="27" name="Sig" onClick="sig()"> </td>
          </tr>
        </table>



        <div align="center">
          <?php

          global $result;
          $llavefon = "";
          global  $VL_Buscar;
          if ($idpac == "") {
            $VL_Buscar = $paciente[0];
          } else {
            $VL_Buscar = $idpac;
          }
          //echo $VL_Buscar;
          $VL_Nombre = "";
          $VL_Rut = "";
          $VL_Fecha_Nacimiento = "";
          $VL_Admision = "";
          $VL_Sexo = "";
          global $VL_Edad;
          $VL_Edad = 0;
          $VL_Procedencia = "";
          $VL_NombreMedico = "";
          $VL_LlaveFonasa = "";
          $VL_Compara = "";
          $SEC = $_GET['Secciond'];
          //echo ($VL_Buscar);
          /*gbrel*/

          /*Consulta a realizar 23 */
          if (isset($_GET['Secciond'])) {
            if ($_GET['Secciond'] == 1) {
              $sql_1 = "EXECUTE SISTEMA_RESULTADOS_WEB_EDIT '" . $VL_Buscar . "'";
              //echo $sql_1;
            } else {
              $sql_1 = "EXECUTE SISTEMA_RESULTADOS_WEB_EDITXSEC @X_IDPACIENTE='" . $VL_Buscar . "',@SECCION='" . $SEC . "' ";
            }
          } else {
            $sql_1 = "EXECUTE SISTEMA_RESULTADOS_WEB_EDIT '" . $VL_Buscar . "'";
          }
          $i = 0;
           echo $sql_1;
          $query_result = odbc_exec($db_conn, $sql_1) or
            die("ERROR : No se puede ejecutar la consulta." . odbc_errormsg() . "<br>" . $sql_1);
          if (odbc_num_rows($query_result) != 0) {

            $VL_Encabezado = "T";
            while ($result = odbc_fetch_array($query_result)) {
              if ($VL_Encabezado == 'T') {

                $VL_Encabezado = "F";
                $VL_Nombre = $result["NOMBRE_PACIENTE"];
                echo $VL_Rut = $result["RUT_PACIENTE"];
                $VL_Fecha_Nacimiento = $result["FECHA_NACIMIENTO"];
                $VL_Admision = $result["FECHA"];
                $VL_Sexo = $result["SEXO"];
                $VL_Edad = $result["ANOS"];
                $VL_Procedencia = $result["DESC_PROCEDENCIA"];
                $VL_FormaPago=$result["FORMAPAGO"];
                $VL_NombreMedico = $result["NOMBRE_MEDICO"];
                $llave = $result["LLAVE_PRUEBA"];
                $perfil = $result["LLAVE_PERFIL"];
                $paciente = $result["IDPACIENTE"];
                $tipo = $result["TIPO"];
                $alto = $result["VALOR_HASTA"];
                $bajo = $result["VALOR_DESDE"];
                $numero_registro=str_pad($result["NUMERO_REGISTRO"],3,"0",STR_PAD_LEFT);
                $total=$result["TOTAL"];
                $anticipo=$result["ANTICIPO"];
                $pendiente=$result["PENDIENTE"];
                $cuentaEstado=$result["CUENTAESTADO"];
                $fechaEntrega=$result['FECHAENTREGA'];
                if ($cuentaEstado=='X') {
                  $cuentaEstado='PAGADO';
                }
                else {
                  $cuentaEstado='PENDIENTE';
                }
                

          ?>
                <!-- <img src="../images/globulos.jpg" width="1206" height="150"></div> -->
                <!-- <TABLE border=1 borderColor=#000000 cellPadding=0 cellSpacing=0 height="100%" width="100%"> -->
                <TABLE>
                  <TBODY>
                    <TR>
                      <TD>
                        <!--  <TD bgColor=#000000 height=419 vAlign=top width="9%"> -->
                        <TABLE align=center border=0 cellPadding=0 cellSpacing=0 height=100 width="98%">
                          <TBODY>

                            <TR>
                              <TD height=2 vAlign=top>&nbsp;</TD>
                            </TR>
                            <TR>
                              <TD vAlign=top>
                                <TABLE border=1 borderColor=#5c7ec3 cellPadding=0 cellSpacing=3 width="100%">

                                  <TBODY>
                                    <TR>
                                      <TD>
                                        <div align="center"><b>FOLIO : <?php echo $numero_registro; ?></b></div>
                                        <!-- ."-".$VL_Buscar) ?>)</b></div>-->
                                      </TD>
                                    </TR>
                                    <TR>
                                      <TD colSpan=2 height=2>
                                        <TABLE border=0 cellPadding=0 cellSpacing=0 width="100%">
                                          <TBODY>
                                            <TR>
                                              <TD vAlign=top width="100%" height="116"><IMG height=12 src="Imagenes/Transparente.gif" width=20><BR>
                                                <TABLE border=1 borderColor=#5c7ec3 cellPadding=0 cellSpacing=2 width="98%" align=center>
                                                  <TBODY>
                                                    <TR>
                                                      <TD colSpan=4 height=5>
                                                        <div align="center">
                                                          <FONT color=#666666 face="Arial, Helvetica, sans-serif" size=2><B>
                                                              <FONT color=#000000 face="Arial, Helvetica, sans-serif" size=2>DATOS DEL PACIENTE</FONT>
                                                              <FONT color=#000000 size=2>
                                                              </FONT>
                                                            </B></FONT>
                                                        </div>
                                                      </TD>
                                                    </TR>
                                                    <TR>
                                                      <TD bgColor=#3759a2 height=74 vAlign=top width="14%">
                                                        <P>
                                                          <FONT color=#ffffff face="Arial, Helvetica, sans-serif" size=2>&nbsp;Nombre :<BR>
                                                            &nbsp;M&eacute;dico :<BR>
                                                            &nbsp;Procedencia : </FONT>
                                                        </P>
                                                      </TD>
                                                      <TD bgColor=#5c7ec3 height=74 vAlign=top width="52%">
                                                        <FONT color=#ffffff face="Arial, Helvetica, sans-serif" size=2>
                                                          <?php
                                                          echo ($VL_Nombre . "<br>");
                                                          #echo($VL_Rut."<br>"); 
                                                          echo ($VL_NombreMedico . "<br>");
                                                          echo ($VL_Procedencia . "<br>");
                                                          ?>
                                                        </FONT>
                                                      </TD>
                                                      <TD bgColor=#3759a2 height=74 vAlign=top width="19%">
                                                        <p>
                                                          <font color=#ffffff face="Arial, Helvetica, sans-serif" size=2>&nbsp;F. de Nacimiento : <br>
                                                            &nbsp;Edad :<br>
                                                            &nbsp;Sexo :<br>
                                                            &nbsp;Admisi&oacute;n : </font>
                                                        </p>
                                                      </TD>
                                                      <TD bgColor=#5c7ec3 height=74 vAlign=top width="15%">
                                                        <FONT color=#ffffff face="Arial, Helvetica, sans-serif" size=2>
                                                          <?php
                                                          echo (substr($VL_Fecha_Nacimiento, 0, 10) . "<br>");
                                                          echo ($VL_Edad . " A&ntilde;os<br>");
                                                          if ($VL_Sexo == "F") {
                                                            echo ("Femenino<br>");
                                                          } else {
                                                            echo ("Masculino<br>");
                                                          }
                                                          echo (substr($VL_Admision, 0, 10) . "<br>");
                                                          ?>
                                                        </FONT>
                                                      </TD>
                                                    </TR>
                                                  </TBODY>
                                                </TABLE>
                                              </TD>
                                              <TD background=Menu_archivos/fwebhosting.jpeg rowSpan=3 vAlign=top>&nbsp;</TD>
                                            </TR>
                                            <TR>
                                              <TD height=115 vAlign=top width="90%"><IMG height=12 src="Imagenes/Transparente.gif" width=20>
                                                <table border=2 bordercolor=#5c7ec3 cellpadding=0 cellspacing=2 width="99%" align=center>

                                                <?php
                                              }

                                              if (strtoupper($VL_Compara) == strtoupper($result["NOMBRE_FONASA"])) {
                                                /*              echo ($result["DESC_PRU"]." ");
                    echo ($result["RESULTADO"]." ");
                    echo ($result["ESTADO"]."<br>"); */
                                                $llave2 = $result["LLAVE_PRUEBA"];

                                                $perfil = $result["LLAVE_PERFIL"];
                                                $paciente = $result["IDPACIENTE"];
                                                $tipo = $result["TIPO"];
                                                $alto = $result["VALOR_HASTA"];
                                                $bajo = $result["VALOR_DESDE"];
                                                $res = $result["RESULTADO"];
                                                //para los valores de referencia
                                                if ($alto == 0) {
                                                  $color = '#ffffff';
                                                } else {
                                                  if ($res == '') {
                                                    $color = '#ffffff';
                                                  } else {
                                                    if ($res < $alto && $res > $bajo) {
                                                      $color = '#ffffff';
                                                    } else {
                                                      $color = '#ed6d5a';
                                                    }
                                                  }
                                                }
                                                ?>
                                                  <tr>
                                                    <td bgcolor=#5c7ec3 height=25 valign=middle width="40%">

                                                      <font color=#ffffff face="Verdana, Arial, Helvetica, sans-serif" size=1></font>
                                                      <font color=#ffffff face="Arial, Helvetica, sans-serif" size=2>
                                                        <?php echo ($result["DESC_PRU"]); ?>
                                                      </font>

                                                    </td>


                                                    <td bgcolor=#5c7ec3 height=25 align="center" valign=middle width="20%">
                                                      <!--estado p-->
                                                      <input <?php if ($result["ESTADO"] == 'P' || $result["ESTADO"] == ' ' || $result["ESTADO"] == '') {
                                                              } else {
                                                                echo "readonly";
                                                              } ?> style="background-color:<?php echo $color; ?>;" type="text" name="res" id="<?php echo $llave2; ?>" onChange="valor('<?php echo $llave2; ?>',
                                        '<?php echo $perfil; ?>',
                                        '<?php echo $paciente; ?>',
                                        '<?php echo $tipo; ?>',
                                        '<?php echo $alto; ?>',
                                        '<?php echo $bajo; ?>',
                                        '<?php echo $result["ESTADO"]; ?>'); javascript: return false;" value='<?php echo ($result["RESULTADO"]); ?>'></input>
                                                      <input type="hidden" name="perfil" value="<?php echo $perfil ?>">
                                                      <input type="hidden" name="estudio" value="<?php echo $result["LLAVE_FONASA"]; ?>">
                                                    </td>

                                                    <td bgcolor=#5c7ec3 height=15 align=center valign=middle width="5%">
                                                      <input type="checkbox" width="12" height="12" name="des" <?php if ($result["ESTADO"] == 'P' || $result["ESTADO"] == ' ' || $result["ESTADO"] == '' || $result["ESTADO"] == 'T') {
                                                                                                                  echo "disabled";
                                                                                                                } ?>>
                                                    </td>
                                                    <td bgcolor=#5c7ec3 height=25 align=center valign=middle width="20%">
                                                      <font color=#ffffff face="Verdana, Arial, Helvetica, sans-serif" size=1>
                                                        <?php
                                                        if (trim($result["UNIDADES_MEDIDA"] != "")) {
                                                          echo ($result["UNIDADES_MEDIDA"]);
                                                        } else {
                                                          echo ("&nbsp;");
                                                        }
                                                        ?>
                                                      </font>
                                                    </td>
                                                    <td bgcolor=#5c7ec3 height=25 align=center valign=middle width="20%">
                                                      <font color=#ffffff face="Verdana, Arial, Helvetica, sans-serif" size=1>
                                                        <?php if (trim($result["RANGO_TEXTO"]) != "") {
                                                          if ($_SESSION['perfil']==5){
                                                            echo '<input size="10" type="text" id="'.$llave.'t"
                                                            value="'.$result["RANGO_TEXTO"].'">';
                                                            echo  '<input type="button" id="'.$llave.'t" value="Actualizar" onclick="RangoUpdate('.$llave.',1)">';
                                                          }
                                                          else{
                                                            echo ($result["RANGO_TEXTO"]);
                                                          }
                                                        } else {
                                                          if ((empty($result["VALOR_DESDE"])) or (trim($result["VALOR_DESDE"]) == "")) {
                                                            echo ("-");
                                                          } else {
                                                            echo "<script> console.log('".$_SESSION['perfil']."');</script>";
                                                            if ($_SESSION['perfil']==5){
                                                              echo '<input size="4" type="text" id="'.$llave2.'d"
                                                                    value="'.number_format($result["VALOR_DESDE"], $result["DECIMALES"], ".", ".").'">
                                                                    <input size="4" type="text" id="'.$llave2.'h"
                                                                    value="'.number_format($result["VALOR_HASTA"], $result["DECIMALES"], ".", ".").'">';
                                                              echo  '<input type="button" id="'.$llave2.'b" value="Actualizar" onclick="RangoUpdate('.$llave2.',0)">';
                                                            }
                                                            else{
                                                              echo (number_format($result["VALOR_DESDE"], $result["DECIMALES"], ".", ".") . " - " . number_format($result["VALOR_HASTA"], $result["DECIMALES"], ".", "."));
                                                            }
                                                          }
                                                        }
                                                        ?>
                                                      </font>
                                                    </td>
                                                    <td bgcolor=#5c7ec3 height=25 align=center valign=middle width="5%">
                                                      <font id="<?php echo "est" . $i; ?>" color=#ffffff face="Verdana, Arial, Helvetica, sans-serif" size=1>
                                                        <?php
                                                        if (trim($result["ESTADO"] != "")) {
                                                          echo ($result["ESTADO"]);
                                                        } else {
                                                          echo ("&nbsp;");
                                                        }
                                                        ?>
                                                        <input name="estado" type="hidden" align="middle" value="<?php echo ($result["ESTADO"]); ?>">
                                                        <input id="<?php echo "est" . $j; ?>" type="hidden" align="middle" value="<?php echo ($result["ESTADO"]); ?>">
                                                      </font>
                                                    </td>
                                                  </tr>
                                                  <?php $i = $i + 1; ?>
                                                <?php
                                              } else {
                                                $llave = $result["LLAVE_PRUEBA"];
                                                $perfil = $result["LLAVE_PERFIL"];
                                                $tipo = $result["TIPO"];
                                                $alto = $result["VALOR_HASTA"];
                                                $res = $result["RESULTADO"];
                                                $bajo = $result["VALOR_DESDE"];
                                                if ($alto == 0) {
                                                  $color = '#ffffff';
                                                } else {
                                                  if ($res == '') {
                                                    $color = '#ffffff';
                                                  } else {
                                                    if ($res < $alto && $res > $bajo) {
                                                      $color = '#ffffff';
                                                    } else {
                                                      $color = '#ed6d5a';
                                                    }
                                                  }
                                                }
                                                ?> <tr>
                                                    <td colspan=6><IMG height=12 src="Imagenes/Transparente.gif" width=20></td>
                                                  </tr>
                                                  <tr>
                                                    <td bgcolor=#87CEFA colspan=6 height=10 valign=middle>
                                                      <div align="center">
                                                        <font color=#000000 face="Arial, Helvetica, sans-serif" size=2>
                                                          <b>
                                                            <?php echo (strtoupper($result["NOMBRE_FONASA"]));
                                                                  array_push($examenesArray,$result["NOMBRE_FONASA"]);
                                                            ?>
                                                          </b>
                                                        </font>
                                                      </div>
                                                    </td>

                                                  </tr>
                                                  <?php
                                                  $VL_LlaveFonasa = $result["LLAVE_FONASA"];
                                                  $llavefon .= $result["LLAVE_FONASA"] . "-";
                                                  ?>



                                                  <tr>
                                                    <td bgcolor=#3759a2 height=25 valign=middle width="40%">
                                                      <p>
                                                        <font color=#ffffff face="Verdana, Arial, Helvetica, sans-serif" size=1>&nbsp;</font>
                                                        <font color=#ffffff face="Arial, Helvetica, sans-serif" size=2>
                                                          <img height=14 src="Imagenes/Carpeta.gif" width=20>EXAMEN
                                                        </font>
                                                      </p>
                                                    </td>
                                                    <td bgcolor=#3759a2 height=25 align=center valign=middle width="20%">
                                                      <font color=#ffffff face="Verdana, Arial, Helvetica, sans-serif" size=1>RESULTADO</font>
                                                    </td>
                                                    <td bgcolor=#3759a2 height=10 align=center valign=middle width="5%">
                                                      <font color=#ffffff face="Verdana, Arial, Helvetica, sans-serif" size=1>DESVALIDA</font>
                                                    </td>
                                                    <td bgcolor=#3759a2 height=25 align=center valign=middle width="20%">
                                                      <font color=#ffffff face="Verdana, Arial, Helvetica, sans-serif" size=1>UNIDAD DE MEDIDA</font>
                                                    </td>
                                                    <td bgcolor=#3759a2 height=25 align=center valign=middle width="10%">
                                                      <font color=#ffffff face="Verdana, Arial, Helvetica, sans-serif" size=1>VALOR DE REFERENCIA</font>
                                                    </td>
                                                    <td bgcolor=#3759a2 height=25 align=center valign=middle width="10%">
                                                      <font color=#ffffff face="Verdana, Arial, Helvetica, sans-serif" size=1>ESTADO</font>
                                                    </td>
                                                  </tr>
                                                  <tr>

                                                    <td bgcolor=#5c7ec3 height=25 valign=middle width="40%">
                                                      <p>
                                                        <font color=#ffffff face="Verdana, Arial, Helvetica, sans-serif" size=1></font>
                                                        <font color=#ffffff face="Arial, Helvetica, sans-serif" size=2>
                                                          <?php echo ($result["DESC_PRU"]); ?>
                                                        </font>
                                                      </p>
                                                    </td>

                                                    <td bgcolor=#5c7ec3 height=25 align=center valign=middle width="20%">
                                                      <input <?php if ($result["ESTADO"] == 'P' || $result["ESTADO"] == ' ' || $result["ESTADO"] == '') {
                                                              } else {
                                                                echo "readonly";
                                                              } ?> style="background-color:<?php echo $color; ?>;" type="text" name="res2" id="<?php echo $llave; ?>" onChange="valor('<?php echo $llave; ?>','<?php echo $perfil; ?>','<?php echo $paciente; ?>','<?php echo $tipo; ?>','<?php echo $alto; ?>','<?php echo $bajo; ?>','<?php echo $result["ESTADO"]; ?>'); javascript: return false;" value='<?php echo ($result["RESULTADO"]); ?>'>
                                                      </input>
                                                      <input type="hidden" name="perfil2" value="<?php echo $perfil; ?>">
                                                      <input type="hidden" name="estudio2" value="<?php echo $result["LLAVE_FONASA"]; ?>">
                                                    </td>
                                                    <td bgcolor=#5c7ec3 height=15 align=center valign=middle width="5%">
                                                      <input type="checkbox" width="12" height="12" name="des2" <?php if ($result["ESTADO"] == ' ' || $result["ESTADO"] == '' || $result["ESTADO"] == 'T') {
                                                                                                                  echo "disabled";
                                                                                                                } ?>>
                                                    </td>

                                                    <td bgcolor=#5c7ec3 height=25 align=center valign=middle width="20%">
                                                      <font color=#ffffff face="Verdana, Arial, Helvetica, sans-serif" size=1>
                                                        <?php
                                                        if (trim($result["UNIDADES_MEDIDA"] != "")) {
                                                          echo ($result["UNIDADES_MEDIDA"]);
                                                        } else {
                                                          echo ("&nbsp;");
                                                        }
                                                        ?>

                                                      </font>
                                                    </td>
                                                    <td bgcolor=#5c7ec3 height=25 align=center valign=middle width="15%">
                                                      <font color=#ffffff face="Verdana, Arial, Helvetica, sans-serif" size=1>
                                                        <?php
                                                        if (trim($result["RANGO_TEXTO"]) != "") {
                                                          if ($_SESSION['perfil']==5){
                                                            echo '<input size="10" type="text" id="'.$llave.'t"
                                                            value="'.$result["RANGO_TEXTO"].'">';
                                                            echo  '<input type="button" id="'.$llave.'t" value="Actualizar" onclick="RangoUpdate('.$llave.',1)">';
                                                          }
                                                          else{
                                                            echo ($result["RANGO_TEXTO"]);
                                                          }
                                                          
                                                        } else {
                                                          if ((empty($result["VALOR_DESDE"])) or (trim($result["VALOR_DESDE"]) == "")) {
                                                            echo ("-");
                                                          } else {
                                                            echo "<script> console.log('".$_SESSION['perfil']."');</script>";
                                                            if ($_SESSION['perfil']==5){
                                                              echo '<input size="4" type="text" id="'.$llave.'d"
                                                                    value="'.number_format($result["VALOR_DESDE"], $result["DECIMALES"], ".", ".").'">
                                                                    <input size="4" type="text" id="'.$llave.'h"
                                                                    value="'.number_format($result["VALOR_HASTA"], $result["DECIMALES"], ".", ".").'">';
                                                              echo  '<input type="button" id="'.$llave.'b" value="Actualizar" onclick="RangoUpdate('.$llave.',0)">';
                                                            }
                                                            else{
                                                              echo (number_format($result["VALOR_DESDE"], $result["DECIMALES"], ".", ".") . " - " . number_format($result["VALOR_HASTA"], $result["DECIMALES"], ".", "."));
                                                            }
                                                            
                                                          }
                                                        }
                                                        ?>
                                                      </font>
                                                    </td>

                                                    <td bgcolor=#5c7ec3 height=25 align=center valign=middle width="10%">
                                                      <font color=#ffffff face="Verdana, Arial, Helvetica, sans-serif" size=1>
                                                        <?php
                                                        if (trim($result["ESTADO"] != "")) {
                                                          echo ($result["ESTADO"]);
                                                        } else {
                                                          echo ("&nbsp;");
                                                        }
                                                        ?>
                                                        <input name="estado2" type="hidden" align="middle" value="<?php echo ($result["ESTADO"]); ?>">
                                                      </font>
                                                    </td>

                                                  </tr>
                                                  <?php $j = $j + 1; ?>
                                              <?php $VL_Compara = $result["NOMBRE_FONASA"];
                                              } // Fin del Contenido Else
                                            } // Fin del Contenido While
                                              ?>

                                                </table>
                                              </TD>
                                            </TR>
                                            <!-- <TR> 
                            <TD vAlign=top width="90%">
                              <p><IMG height=12 src="Imagenes/Transparente.gif" width=20><BR>
                                <font size="2"><b>&nbsp;</b></font><b><br>
                                <font size="1">
                                &nbsp;ESTE INFORME NO CONSTITUYE DIAGNOSTICO, CONSULTE A SU MEDICO TRATANTE.</font></b></p>
                            </TD>
                          </TR> -->
                                          </TBODY>
                                        </TABLE>
                                      </TD>
                                    </TR>
                                    <!-- <TR bgColor=#6e8fd4> 
                      <TD height=2 colspan="2" align=center> 
                          <FONT color=#ffffff face="Verdana, Arial, Helvetica, sans-serif" size=1>
                <B>IMPORTANTE : EL RESULTADO DE ESTE EXAMEN TIENE VALIDEZ SOLO CON INTERPRETACION DEL MEDICO TRATANTE.</B>  <div align="center" class="current_page_item Estilo3"> <em></em></div><BR>
                  </FONT>
                      </TD>
                      <input type="hidden" value="<?php //echo $i;
                                                  ?>" id="uno"/>
                      <input type="hidden" value="<?php //echo $j;
                                                  ?>" id="dos"/>
                    </TR> -->
                                  </TBODY>
                                </TABLE>
                              </TD>
                            </TR>
                          </TBODY>
                        </TABLE>
                        <!-- <center> <input type="button" value="Generar PDF" align="middle">&nbsp;<input type="button" value="Regresar" onclick=regresar()>&nbsp;<input type="button" value="Salir" onclick=salir()></center> -->
                        </form>
                        <STYLE type=text/css>
                         

                          A:hover {
                            COLOR: #000000;
                            FONT: 10pt verdana, arial, helvetic;
                            TEXT-DECORATION: none
                          }
                        </STYLE>
                      </TD>
                    </TR>
                  </TBODY>
                </TABLE>
                <form action="../WEB/imprimirComprobante.php" method="post" id="ComprobanteAtencion">
    <table>
      <tr>
        <td>
          <input type="hidden" id="nombrePaciente" name="nombrePaciente" value="<?php echo $VL_Nombre;?>">
        </td>
      </tr>
      <tr>
        <td>
          <input type="hidden" id="notaCuenta"  name="notaCuenta" value="<?php echo $cuentaEstado;?>">
        </td>
      </tr>
      <tr>
        <td>
          <input type="hidden" id="totalCuenta" name="totalCuenta" value="<?php echo $total;?>">
        </td>
      </tr>
      <tr>
        <td>
          <input type="hidden" id="pendienteCuenta" name="pendienteCuenta" value="<?php echo $pendiente;?>">
        </td>
      </tr>
      <tr>
        <td>
          <input type="hidden" id="adelantoCuenta" name="adelantoCuenta" value="<?php echo $anticipo;?>">
        </td>
      </tr>
      <tr>
        <td>
          <input type="hidden" id="examenesCuenta" name="examenesCuenta" value="<?php  echo implode(",", $examenesArray);?>">
        </td>
      </tr>
      <tr>
        <td>
          <input type="hidden" id="numeroCuenta" name="numeroCuenta" value="<?php  echo $numero_registro;?>">
        </td>
      </tr>
      <tr>
        <td>
          <input type="hidden" id="fpCuenta" name="fpCuenta" value="<?php  echo $VL_FormaPago;?>">
        </td>
      </tr>
      <tr>
        <td>
          <input type="hidden" id="feCuenta" name="feCuenta" value="<?php  echo $fechaEntrega;?>">
        </td>
      </tr>
      <tr>
        <td>
          <input type="hidden" id="heCuenta" name="heCuenta" value="<?php  echo $horaEntrega;?>">
        </td>
      </tr>
      <tr>
        <td>
          <input type="hidden" id="fechaIngreso" name="fechaIngreso" value="<?php  echo $VL_Admision;?>">
        </td>
      </tr>
    </table>
  </form>
              <?php
            } else {
              ?>

                <BODY class=main text=#45acf6 vLink=#aaaaaa link=#45acf6 bgColor=black leftMargin=0 topMargin=0 marginheight="0" marginwidth="0">

                  <div align="center">

                  </div>
                <?php
              }
              odbc_close($db_conn);


                ?>


                <SCRIPT type="text/javascript">
                  function regresar() {

                    window.open("Resultadosxsec.php?Paciente=<?php echo $VL_Buscar; ?>", "_self", "")
                  }

                  function salir() {

                    window.open("../salir.php", "_self", "")
                  }

                  function click(e) {
                    // Explorer
                    if (IE)
                      if (event.button == 2) {
                        accion();
                        return false;
                      }

                    // Netscape
                    if (NS)
                      if (e.which == 3) {
                        accion();
                        return false;
                      }
                  }

                  function accion() {
                    window.status = 'InfoWeb : Ficha de Resultados de Pacientes';
                    if (IE)
                      alert('Pulsaci�n de bot�n no permitida'); // Pulsaci�n de bot�n no permitida
                    return;
                  }

                  var NS = (document.layers);
                  var IE = (document.all);

                  if (NS) document.captureEvents(Event.MOUSEDOWN);
                  document.onmousedown = click;
                </SCRIPT>



                </BODY>

</HTML>