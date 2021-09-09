	<div id="header">
		<img src="../images/logo.png">
	</div>	<script type="text/javascript" src="../js/dhtml-suite-for-applications.js"></script>
	<script type="text/javascript">
	var enlargerObj = new DHTMLSuite.imageEnlarger();
	function displayImage(imagePath,title,description)
	{
		DHTMLSuite.commonObj.setCssCacheStatus(false);
		enlargerObj.setIsDragable(true);
		enlargerObj.displayImage(imagePath,title,description);
		
	}
	
	</script>
	<style type="text/css">
	html,body{
		margin:0px;
		padding:0px;
	}
	#mainContainer{
		margin:10px;
	}
	</style>
	<div id="mainContainer">
		<div id="content">
			<p>Please click on one of the links below to see this widget in action:</p>
			<a href="#" onclick="displayImage('demo-images/imageEnlarger3.jpg','The view from my window.','This is what I see when I look out the window in my living room. I wish I had more time to appreciate it.');return false">The view from my window</a><br>
			<a href="#" onclick="displayImage('demo-images/imageEnlarger1.jpg','','A nice picture from an Island of Norway');return false">Summer in Norway.</a><br>
			<a href="#" onclick="displayImage('demo-images/imageEnlarger2.png','Go Kart driving is fun.','');return false">Driving Go-Karts.</a><br>
			
		</div>
	</div>
