<?
class LeerIMG{
      var $ERROR;
      var $servidor;
      var $usuario;
      var $passwd;
      var $nombreDB;
      var $SP='sp_GrabarImagenDD ';
      //define('SP','sp_GrabarImagenDD ');
      var $RUTA;
      var $IMG;

      function get_ERROR(){
        return $this->ERROR;
      }

      function LeerIMG($servidor_=null, $usuario_=null, $passwd_=null, $nombreDB_=null){
      // CONSTRUCTOR 2
        if ( (is_null($servidor_)) || (is_null($usuario_)) || (is_null($passwd_)) || (is_null($nombreDB_)) ){
           $this->ERROR=1;
           printf ('<br>Error: valores NULL no admitidos.-');

           //$_SESSION["ERROR"] = 1;
           //session_write_close();
        }else{
           $this->ERROR==0;

           $this->servidor = $servidor_; //'localhost';
           $this->usuario = $usuario_;   //'sa';
           $this->passwd = $passwd_;     //'123456';
           $this->nombreDB = $nombreDB_; //'Pruebas';

           //$this->SP='sp_GrabarImagenDD ';

           //$largo =strlen($this->RUTA)-1;
           //$this->RUTA=substr($this->RUTA,0,$largo);
           //printf ('<br>PATH: ' .$this->RUTA);
           //printf ('<br>constructor finalizado.-');
        }
      }

      function definirIMG($nom_IMG){
         if (is_null ($nom_IMG) ){
             $this->ERROR=1;
             printf ('<br>Error: valores NULL no admitidos.-');
         }else{
             $this->ERROR=0;
             $this->RUTA= include ('path.php');
             $this->IMG = $this->RUTA . $nom_IMG;
             //printf ('<br>PATH IMG: ' .$this->IMG );           ***********+ 50
             // ACTUALIZAR ARCHIVO SI ACASO EXISTE .-
             if (file_exists ('images\\' . $nom_IMG ) ){
                //printf ('<br>IMG Actualizando.');
                if ( unlink('images\\' . $nom_IMG ) != true){
                  $this->ERROR=1;
                  printf ('<br>Error: sobreescribiendo imagen' );
                }
             }
         }
      }

      function conectarDB($archivo=null, $tabla=null, $columnaID=null, $columnaIMG=null, $condicion=null){
      // VERIFICAR LA EXISTENCIA DE CONTENIDOS .-
        if ( (is_null($archivo)) || (is_null($tabla)) || (is_null($columnaID)) || (is_null($columnaIMG))|| (is_null($condicion)) ){
           $this->ERROR=1;
           printf ('<br>Error: valores NULL no admitidos.-');

           //$_SESSION["ERROR"] = 1;
           //session_write_close();
        }else{
           $this->ERROR=0;

           // REALIZAR CONCEXION CON MS SQL SERVER .-
             $this->ERROR=1;
             $enlace = mssql_connect($this->servidor, $this->usuario, $this->passwd)
                    or die('No se pudo conectar al servidor.-');
             $this->ERROR=0;
             //printf ('<br>conexion realizada.-');

             // indicar base de datos a utilizar .-
             $this->ERROR=1;
             $db_select = mssql_select_db($this->nombreDB, $enlace)
                    or die('No se pudo abrir la tabla.-');
             $this->ERROR=0;

             //inicializar SP .-
             //printf ($enlace);
             //$query = mssql_init($this->SP, $enlace);
             $query = mssql_init($this->SP, $enlace);
             //$archivo = $this->RUTA . $this->IMG;
             //printf ('<br>Ruta de Archivo ' .$this->IMG. '.-');

             //enviar parametros 'param' :
             mssql_bind($query, '@archivo', $this->IMG, SQLVARCHAR);
             mssql_bind($query, '@tabla', $tabla, SQLVARCHAR);
             mssql_bind($query, '@columnaID', $columnaID, SQLVARCHAR);
             mssql_bind($query, '@columna', $columnaIMG, SQLVARCHAR);
             mssql_bind($query, '@condicion', $condicion, SQLVARCHAR);

             // ejecutar SP .-    ***************** 100
             $this->ERROR=1;
             $result_sp = mssql_execute ($query)
                    or die('No se pudo ejecutar el SP .-');
             $this->ERROR=0;
             //printf ('<br>SP finalizado.-');

             // recoger resultado del SP .-
             //$this->ERROR=1;
             //if (mssql_num_rows($result_sp)!=0){
             //   list($TAMANIO) = mssql_fetch_row($result_sp);
             //   $this->ERROR=0;
             //}
             //printf ('<br>El tamaño es: '.$TAMANIO);

             // loop hasta lograr tamaño completo de la imagen .-
             //if ($TAMANO != null){
                //$archivo = 'images\\' . $_SESSION["IMG"] ;
                //$tam_real =filesize($archivo);
                //do{
                //  Printf ( ': ' . $tam_real . ' bytes');
                //  $tam_real = filesize($archivo);
                //}while ($tam_real != $TAMANO );
             //}
             // CERRAR CONCEXION .-
             mssql_close($enlace);
             //printf ('<br>conexion finalizada.-');
        }
      }


}
?>