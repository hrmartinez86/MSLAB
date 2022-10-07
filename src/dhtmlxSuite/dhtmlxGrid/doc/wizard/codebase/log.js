function log(text) {
	var d, s = "[";
	var c = ":";
	d = new Date();
	s += d.getHours() + c;
	s += (d.getMinutes().length==1?"0":"")+ d.getMinutes() + c;
	s += (d.getSeconds().length==1?"0":"")+ d.getSeconds();
	s += "] ";
  
  	var logElement = document.getElementById("log"); 	

 	logElement.innerHTML += s + text + "<br>";
}