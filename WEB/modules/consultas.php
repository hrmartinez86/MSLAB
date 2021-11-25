<?php 
    session_start();
    
    //header("Cache-control: private"); //Arregla IE 6 
    //include_once(RelativePath . "/Barra.php");       
    if ($_SESSION['estado']=="ok" ) {
    } 
    else {
        header("Location: index.php"); 
        
    }

    function pacientes($fechaIni,$fechaFin,$tipo,$procedencia){
        //llave id paciente
        $ODBC=$_SESSION["ODBC"];
        $link=conectar($ODBC);
        $sql="select df.idpaciente,cf.llave_fonasa,cf.nombre,dpc.nombre + ' ' + dpc.apellidos as NombrePaciente,
        pm.descripcion as procedencia,doc.nombre as doctor,df.fecha,df.numero_registro as numero
         from dat_dpcod dp 
        inner join dat_dfipa df on df.idpaciente=dp.idpaciente
        inner join dat_paciente dpc on df.rut=dpc.rut
        inner join lab_relac_fonasa_perfil lrfp on lrfp.llave_perfil=dp.llave_perfil
        inner join caj_codigos_fonasa cf on cf.llave_fonasa=lrfp.llave_fonasa 
        inner join procedencia_muestra pm on pm.id=df.procedencia_muestra
        inner join dat_doctores doc on doc.llave_doctor=df.doctor
        where df.fecha between convert(datetime,'".$fechaIni."',103) and convert(datetime,'".$fechaFin."',103) ";
        if ($procedencia!=''){$sql=$sql." and procedencia_muestra=".$procedencia;}
        if ($tipo!=''){$sql=$sql." and df.tipo='".$tipo."'" ;}
        $sql=$sql." and dp.estado='V' group by df.idpaciente,cf.llave_fonasa,cf.nombre,
        dpc.nombre,dpc.apellidos,pm.descripcion,doc.nombre,df.fecha,df.numero,df.numero_registro
        order by df.idpaciente,cf.llave_fonasa desc";
        
        // echo $sql;
        
        $son=odbc_exec($link,$sql) or die ("error aqui".odbc_errormsg());
        while($row =odbc_fetch_array($son) )
        {
            // $folios[]=array('idpaciente'=>$row['idpaciente'],
            //                 'llave_fonasa'=>$row['llave_fonasa']);
            $pac[]=array('idpaciente'=>$row['idpaciente'],
                         'llave_fonasa'=>$row['llave_fonasa'],
                         'nombre'=>$row['nombre'],
                         'nombrePaciente'=>$row['NombrePaciente'],
                         'procedencia'=>$row['procedencia'],
                         'doctor'=>$row['doctor'],
                         'fecha'=>$row['fecha'],
                         'numero'=>$row['numero']);

        }
        return $pac;
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
                                        'um'=>$row['UNIDADES_MEDIDA'],
                                        'vd'=>$row['VALOR_DESDE'],
                                        'vh'=>$row['VALOR_HASTA'],
                                        'rt'=>$row['RANGO_TEXTO']);
                    }
        return $I_Info;	
    }
    function nota($llave)
    {
        switch ($llave) {
            case '153':
                $text="La reacción de Widal detecta anticuerpos aglutinantes contra los antígenos H y O de la Salmonella typhi. Los anticuerpos contra el antígeno O aparecen
tras 6 a 8 días después de iniciar la sintomatología y se dejan de detectar entre 3 y 6 meses después. Los anticuerpos contra el antígeno H tardan en detectarse de 8 a 12 
días tras el inicio de los síntomas, las titulaciones son más elevadas y duran un año con valores altos.Es importante también considerar que la reacción de Widal presenta
reacciones antigénicas cruzadas contra las bacterias (principalmente enterobacterias incluyendo Salmonellas no typhi), parásitos, virus y hongos. Adicionalmente, también 
se han encontrado falsos positivos en procesos no infecciosos, como enfermedades autoinmunes (artritis reumatoide-lupus eritematoso sistémico) y hepatopatías crónicas. 
Finalmente, hay que considerar que en nuestra comunidad existe presencia de Anti-O y Anti-H en población sana por la prevalencia de salmonelosis.";
                break;
            case '303':                                                                                                                         	
                    $text="ESTE ANALISIS NO DEBE USARSE PARA EXCLUIR COVID-19 ACTIVO O RECIENTE. CONSIDERAR LA SIGUIENTE INTERPRETACION:
                IGM-/IGG NO HAY EVIDENCIA DE INFECCION POR SARS-COV 2. 
                IGM+/IGG- PROBABLE INFECCION RECIENTE SIN ANTICUERPOS PROTECTORES. 
                IGM+/IGG+ PROBABLE INFECCION RECIENTE CON ANTICUERPOS PROTECTORES EN DESARROLLO. 
                IGM-/IGG+ PROBABLE INFECCION PASADA CON ANTICUERPOS PROTECTORES.
                TENER ANTICUERPOS PROTECTORES IGG NO EXCLUYE LA POSIBILIDAD DE UNA EVENTUAL REINFECCION.
                SOLO IDENTIFICA LA PRESENCIA O AUSENCIA DE LOS ANTICUERPOS Ig G E Ig M;  NO SON CONCLUYENTES DE LA PRESENCIA O AUSENCIA DEL VIRUS SARS COV-2 COVID-19, Y POR LO TANTO NO SON DE PRUEBA DIAGNOSTICA.'";
                break;
            case '304':
                $text="ESTE ANALISIS NO DEBE USARSE PARA EXCLUIR COVID-19 ACTIVO O RECIENTE. CONSIDERAR LA SIGUIENTE INTERPRETACION:
                IGM-/IGG NO HAY EVIDENCIA DE INFECCION POR SARS-COV 2. 
                IGM+/IGG- PROBABLE INFECCION RECIENTE SIN ANTICUERPOS PROTECTORES. 
                IGM+/IGG+ PROBABLE INFECCION RECIENTE CON ANTICUERPOS PROTECTORES EN DESARROLLO. 
                IGM-/IGG+ PROBABLE INFECCION PASADA CON ANTICUERPOS PROTECTORES.
                TENER ANTICUERPOS PROTECTORES IGG NO EXCLUYE LA POSIBILIDAD DE UNA EVENTUAL REINFECCION.
                SOLO IDENTIFICA LA PRESENCIA O AUSENCIA DE LOS ANTICUERPOS Ig G E Ig M;  NO SON CONCLUYENTES DE LA PRESENCIA O AUSENCIA DEL VIRUS SARS COV-2 COVID-19, Y POR LO TANTO NO SON DE PRUEBA DIAGNOSTICA.";
                break;
            default:
                $text="";
                break;
        }
        
        return $text;

    }

    function metodo($llave)
    {
        switch ($llave) {
            case '153':
                $text="MÉTODO: AGLUTINACIÓN";
                break;
            
            default:
                $text="";
                break;
        }
        
        return $text;

    }

?>