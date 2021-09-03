<? 
header("Content-Type: text/html;charset=iso-8859-1"); 

/* Demo file for the chained select module - created by Batur Orkun */

switch ( $_GET['dg_key']) { 
   case "06" : echo "Bilkent University;01 | Hacettepe University;01 | ODTU;03"; break; 
   case "34" : echo "Bogazici University;11 | ITU;22"; break; 
   case "11" : echo "Denmark University;44"; break; 
   case "44" : echo "Universitetet i Bergen;55"; break; 
   case "66" : echo "Universitetet i Stavanger;55"; break; 
    
   default : echo "no item"; 

} 

?> 