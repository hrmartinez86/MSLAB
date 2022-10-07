<? 

$string = "Los Angeles, 
Houston, 
London, 
Paris, 
Oslo, 
Stavanger, 
Haugesund, 
Cairo, 
Beijing, 
Tokyo, 
Kobe, 
Lyon, 
Nice, 
Barcelona,Madrid,Manchester,Liverpool,Bergen,Mexico City,Copenhagen,Stockholm,Brussel,Amsterdam,Wien,Bern,Geneve,New York"; 


$arr = explode(",", $string); 
$pattern = "/^" .$_GET['letters']. "/i"; 

foreach ($arr as $key => $value) {    
   $value = trim($value); 
   if ( preg_match($pattern,$value)) echo $key."###".$value."|";    

}    
?> 
