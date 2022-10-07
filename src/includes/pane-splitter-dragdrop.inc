	<h2 style="display:none">Content</h2>
	<style type="text/css" media="screen">
	/* CSS for the demo. CSS needed for the scripts are loaded dynamically by the scripts */

	
	#dragDropDemoContainer{
		width:600px;
		margin:0 auto;
		margin-top:10px;
		border:1px double #000;
		padding:3px;

	}
	
	#leftColumn{
		width:300px;
		float:left;
		
	}
	#rightColumn{
		width:200px;
		float:right;
		margin:2px;
		height:500px;
	}	
	.dragableBox{
		width:100px;
		height:60px;
		border:1px solid #000;
		background-color:#FFF;		
		margin-bottom:5px;
		padding:10px;
		font-weight:bold;
		text-align:center;
	}
	.dropBox{
		width:190px;
		border:1px solid #000;
		background-color:#E2EBED;
		height:200px;
		overflow:auto;
		margin-bottom:10px;
		padding:3px;
	}		
		
	.clear{
		clear:both;
	}
	</style>	
	<div id="header">
		<img src="../images/logo.png">
	</div>	
	<div id="dragDropDemoContainer">

		<h2>Drag and drop - demo 1</h2>
		<div id="leftColumn">
			<div class="dragableBox" id="box1">CAT</div>
			<div class="dragableBox" id="box2">DOG</div>
			<div class="dragableBox" id="box3">HORSE</div>
			<div class="dragableBox" id="box4">TIGER</div>
		</div>
			<div id="rightColumn">
			<div id="dropBox" class="dropBox">
				<p><b>Drop some boxes on me</b></p>
				<div id="demo2_dropContent"></div>		
			</div>
			<div id="dropBox2" class="dropBox">
				<p><b>Drop some boxes on me too</b></p>
				<div id="demo2_dropContent2"></div>
			</div>
		</div>
		<div class="clear"></div>
	</div>

<div id="debug"></div>
<script type="text/javascript">

// Custom drop actions for <div id="dropBox">
function dropItems(idOfDraggedItem,targetId,x,y)
{
	var html = document.getElementById('demo2_dropContent').innerHTML;
	if(html.length>0)html = html + '<br>';
	html = html + 'Item with id="' + idOfDraggedItem+'" dropped';
	document.getElementById('demo2_dropContent').innerHTML = html;
}

// Custom drop actions for <div id="dropBox2">

function dropItems2(idOfDraggedItem,targetId,x,y)
{
	var html = document.getElementById('demo2_dropContent2').innerHTML;
	if(html.length>0)html = html + '<br>';
	html = html + 'Item "' + document.getElementById(idOfDraggedItem).innerHTML + '" dropped';
	document.getElementById('demo2_dropContent2').innerHTML = html;
}

var dragDropObj = new DHTMLSuite.dragDrop();
dragDropObj.addSource('box1',true);	// Make <div id="box1"> dragable. slide item back into original position after drop
dragDropObj.addSource('box2',true);	// Make <div id="box2"> dragable. slide item back into original position after drop
dragDropObj.addSource('box3',true);	// Make <div id="box3"> dragable. slide item back into original position after drop
dragDropObj.addSource('box4',true);	// Make <div id="box4"> dragable. slide item back into original position after drop
dragDropObj.addTarget('dropBox','dropItems');	// Set <div id="dropBox"> as a drop target. Call function dropItems on drop
dragDropObj.addTarget('dropBox2','dropItems2');	// Set <div id="dropBox2"> as a drop target. Call function dropItems2 on drop
dragDropObj.init();
</script>



