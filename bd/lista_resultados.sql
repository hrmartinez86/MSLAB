SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER OFF
GO
ALTER PROCEDURE [dbo].[LISTA_RESULTADOS_WEB]
    @NOMBRE VARCHAR(100),
    @APELLIDO VARCHAR(100),
    @EXP VARCHAR(50),
    @TIPO VARCHAR(10),
    @PROCEDENCIA VARCHAR(10),
    @SECCION VARCHAR(10),
    @FECHA_DESDE VARCHAR(10),
    @FECHA_HASTA VARCHAR(10)
AS
DECLARE @W VARCHAR(8000), @SELECT AS VARCHAR(800), @QUERY AS VARCHAR(800), @ORDEN AS VARCHAR(800)
SET @W=''
SET @SELECT = ''
SET @QUERY = ''
SET @ORDEN = ' GROUP BY dat_dfipa.idpaciente,dat_dfipa.fecha,dat_dfipa.numero,dat_dfipa.numero_registro,dat_paciente.nombre,dat_paciente.apellidos,lab_tipo_paciente.descripcion,procedencia_muestra.descripcion,dat_doctores.nombre,dat_doctores.apellidos,dat_paciente.fecha_nacimiento,dat_paciente.sexo   ORDER BY dat_dfipa.numero_registro '

SET @SELECT = 'SELECT dat_dfipa.idpaciente AS id,dat_dfipa.fecha AS Fecha, dat_dfipa.numero AS Folio,dat_dfipa.numero_registro , dat_paciente.nombre + ' + "'"+' ' +"'" + ' + dat_paciente.apellidos AS Nombre, ' 
         + 'lab_tipo_paciente.descripcion AS Tipo, procedencia_muestra.descripcion AS Procedencia ,dat_doctores.nombre + ' + "'"+' ' +"'" + ' + dat_doctores.apellidos AS Medico,dat_paciente.fecha_nacimiento as Fn,dat_paciente.sexo as Sexo '
	 + 'FROM lab_RLS_perfiles INNER JOIN '

SET @QUERY = 'lab_relacion_laboratorio_seccion ON lab_RLS_perfiles.cod_llave = lab_relacion_laboratorio_seccion.cod_llave INNER JOIN '
         + 'lab_relac_fonasa_perfil ON lab_RLS_perfiles.llave_perfil = lab_relac_fonasa_perfil.llave_perfil INNER JOIN '
         + 'dat_dfipa INNER JOIN '
         + 'dat_paciente ON dat_dfipa.rut = dat_paciente.rut INNER JOIN '
         + 'caj_det_prestaciones ON dat_dfipa.idpaciente = caj_det_prestaciones.idpaciente INNER JOIN '
         + 'lab_tipo_paciente ON dat_dfipa.tipo = lab_tipo_paciente.codigo INNER JOIN '
         + 'procedencia_muestra ON dat_dfipa.procedencia_muestra = procedencia_muestra.id INNER JOIN '
         + 'caj_codigos_fonasa ON caj_det_prestaciones.llave_fonasa = caj_codigos_fonasa.llave_fonasa ON '
         + 'lab_relac_fonasa_perfil.llave_fonasa = caj_det_prestaciones.llave_fonasa INNER JOIN '
         + 'dat_doctores ON dat_dfipa.doctor = dat_doctores.llave_doctor '
         --+ 'WHERE lab_tipo_paciente.codigo=' + "'" + 'SP' + "'" 
 
 
IF @TIPO=''
   BEGIN
    SET @W=''
END  
ELSE
   BEGIN
    SET @W=' AND LAB_TIPO_PACIENTE.CODIGO=' + "'" + @TIPO + "'"
END 

IF @PROCEDENCIA=0
   BEGIN
    SET @W=@W
END  
ELSE
   BEGIN
    SET @W=@W + ' AND PROCEDENCIA_MUESTRA.ID=' + @PROCEDENCIA
END 
IF @EXP=''
   BEGIN
    SET @W=@W
END  
ELSE
   BEGIN
    SET @W=@W + ' AND DAT_PACIENTE.EXPEDIENTE=' + "'" + @EXP + "'"
END 
IF @NOMBRE=''
   BEGIN
    SET @W=@W
END  
ELSE
   BEGIN
    SET @W=@W + ' AND DAT_PACIENTE.NOMBRE LIKE ' + "'" + @NOMBRE + '%'  + "'"
END 
IF @APELLIDO=''
   BEGIN
    SET @W=@W
END  
ELSE
   BEGIN
    SET @W=@W + ' AND DAT_PACIENTE.APELLIDOS LIKE ' + "'" + @APELLIDO + '%' + "'"
END 
IF @SECCION=''
   BEGIN
    SET @W=@W
END  
ELSE
   BEGIN
    SET @W=@W + ' AND lab_relacion_laboratorio_seccion.cod_llave=' + "'" + @SECCION + "'"
END 

SET @W= ' WHERE dbo.dat_dfipa.fecha BETWEEN ' + "convert(datetime,'" + @FECHA_DESDE + "',103) " + 'AND ' + "convert(datetime,'" + @FECHA_HASTA + "',103)" + ' ' + @W
IF @W=''
   BEGIN
    EXECUTE (@SELECT + @QUERY)
END 
ELSE
   BEGIN
    EXECUTE (@SELECT + @QUERY + @W + @ORDEN)
END

GO
