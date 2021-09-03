<? 
header("Content-Type: text/html;charset=iso-8859-1");


switch ( $_GET['dg_key']) { 
   case "turkey" : echo "Ankara;06 | ?stanbul;34 | Antalya;07"; break; 
   case "denmark": echo "Aalborg;11 | Copenhagen;22 | Odense;33"; break; 
   case "norway" : echo "Bergen;44 | Oslo;55 | Stavanger;66"; break; 
   default : echo "no item"; 

} 

?> 
