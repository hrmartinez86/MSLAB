<?PHP
//Inicio la sesión
session_start();
header("Cache-control: private"); //Arregla IE 6        
if ( $_SESSION['estado']=="ok" ) {
    
           
     
        } else {
     
          header("Location: index.php"); 
          echo "<html></html>";
        }
		
$fecha=date("d , M, y,  H:i a");	
#$conection = odbc_connect("ODBC_INFO", "sa", ""); 

include ("../librerias/conection.php");
$conection=conectar();

if(isset($_GET['saveTextEdit']) && isset($_GET['textEditElementId'])){
	
	
	$_GET['textEditValue'] = str_replace("'","",$_GET['textEditValue']);	// Stripping quotes	
	$_GET['textEditElementId'] = str_replace("'","",$_GET['textEditElementId']);	// Stripping quotes


$valor=$_GET['textEditValue'];
$campo=$_GET['textEditElementId'];
$codigo=$_GET['saveTextEdit'];	
$contenido=$campo."-".$valor."!@!";
$nombre_archivo = "procedencia";
$fh = fopen($nombre_archivo, 'a+') or die("Can't open file");



			if (is_writable($nombre_archivo)) 
			{

				// En nuestro ejemplo estamos abriendo $nombre_archivo en modo de adición.
				// El apuntador de archivo se encuentra al final del archivo, así que
				// allí es donde irá $contenido cuando llamemos fwrite().
				if (!$gestor = fopen($nombre_archivo, 'a')) {
					 echo "No se puede abrir el archivo ($nombre_archivo)";
					 exit;
				}
			
				// Escribir $contenido a nuestro arcivo abierto.
				if (fwrite($gestor, $contenido) === FALSE) {
					echo "No se puede escribir al archivo ($nombre_archivo)";
					exit;
				}
			
			   echo "OK";
			
				fclose($gestor);
			
			} else 
			
			{
				echo "No se puede escribir sobre el archivo $nombre_archivo";
			}
			
			
			
			
			
			fclose($fh);


}
else echo "saveTextEdit variable not defined";

?>