	<div id="header">
		<img src="../images/logo.png">
	</div>
	<div id="dragDropDemo3_mainContainer">
		<h2>Drag and drop - demo 3</h2>
		<div id="demo3_capitals">
			<p><b>Capitals</b></p>
			<div id="dropContent">
				<div class="demo3_dragableBox" id="demo3_box1">Oslo</div>
				<div class="demo3_dragableBox" id="demo3_box2">Stockholm</div>
				<div class="demo3_dragableBox" id="demo3_box3">Washington</div>
				<div class="demo3_dragableBox" id="demo3_box4">Copenhagen</div>
				<div class="demo3_dragableBox" id="demo3_box5">Seoul</div>
				<div class="demo3_dragableBox" id="demo3_box6">Rome</div>
				<div class="demo3_dragableBox" id="demo3_box7">Madrid</div>
			</div>
		</div>
		<div id="countries">
			<div id="demo3_box106" class="demo3_demo3_dragableBoxRight">Italy</div>
			<div id="demo3_box107" class="demo3_demo3_dragableBoxRight">Spain</div>
			<div id="demo3_box101" class="demo3_demo3_dragableBoxRight">Norway</div>
			<div id="demo3_box104" class="demo3_demo3_dragableBoxRight">Denmark</div>
			<div id="demo3_box105" class="demo3_demo3_dragableBoxRight">South Korea</div>
			<div id="demo3_box102" class="demo3_demo3_dragableBoxRight">Sweden</div>
			<div id="demo3_box103" class="demo3_demo3_dragableBoxRight">United States</div>
			
		
		</div>
		<div class="clear"></div>
	</div>
	<style type="text/css">
	/* CSS for the demo. CSS needed for the scripts are loaded dynamically by the scripts */
	#dragDropDemo3_mainContainer{
		width:600px;
		margin:0 auto;
		margin-top:10px;
		border:1px solid #000;
		padding:2px;
	}
	
	#demo3_capitals{
		width:200px;
		float:left;
		border:1px solid #000;
		background-color:#E2EBED;
		padding:3px;
		height:400px;
	}
	#countries{
		width:300px;
		float:right;
		margin:2px;
		height:400px;
	}	
	.demo3_dragableBox,.demo3_demo3_dragableBoxRight{
		width:80px;
		height:20px;
		border:1px solid #000;
		background-color:#FFF;		
		margin-bottom:5px;
		padding:10px;
		font-weight:bold;
		text-align:center;
	}
	div.demo3_demo3_dragableBoxRight{
		height:65px;
		width:110px;
		float:left;
		margin-right:5px;
		padding:5px;
		background-color:#E2EBED;
	}
	.demo3_demo3_dropBox{
		width:190px;
		border:1px solid #000;
		background-color:#E2EBED;
		height:400px;
		margin-bottom:10px;
		padding:3px;
		overflow:auto;
	}		
	a{
		color:#F00;
	}
		
	.clear{
		clear:both;
	}
	</style>
	

<script type="text/javascript">

// Custom drop action for the country boxes
function demo3_dropItems(idOfDraggedItem,targetId,x,y)
{
	var targetObj = document.getElementById(targetId);	// Creating reference to target obj
	var subDivs = targetObj.getElementsByTagName('DIV');	// Number of subdivs
	if(subDivs.length>0 && targetId!='demo3_capitals')return;	// Sub divs exists on target, i.e. element already dragged on it. => return from function without doing anything
	var sourceObj = document.getElementById(idOfDraggedItem);	// Creating reference to source, i.e. dragged object
	var numericIdTarget = targetId.replace(/[^0-9]/gi,'')/1;	// Find numeric id of target
	var numericIdSource = idOfDraggedItem.replace(/[^0-9]/gi,'')/1;	// Find numeric id of source
	if(numericIdTarget-numericIdSource==100){	// In the html above, there's a difference in 100 between the id of the country and it's capital(example:
												// Oslo have id "demo3_box1" and Norway have id "demo3_box101", i.e. 1 + 100.
		sourceObj.style.backgroundColor='#0F0';	// Set green background color for dragged object
	}else{
		sourceObj.style.backgroundColor='';	// Reset back to default white background color
	}
	if(targetId=='demo3_capitals'){	// Target is the capital box - append the dragged item as child of first sub div, i.e. as child of <div id="dropContent">
		targetObj = targetObj.getElementsByTagName('DIV')[0];	
	}
	targetObj.appendChild(sourceObj);	// Append	
}



var demo3_dragDropObj = new DHTMLSuite.dragDrop();	// Creating drag and drop object

// Assigning drag events to the demo3_capitals
demo3_dragDropObj.addSource('demo3_box1',true);	// Make <div id="demo3_box1"> dragable. slide item back into original position after drop
demo3_dragDropObj.addSource('demo3_box2',true);	// Make <div id="demo3_box2"> dragable. slide item back into original position after drop
demo3_dragDropObj.addSource('demo3_box3',true);	// Make <div id="demo3_box3"> dragable. slide item back into original position after drop
demo3_dragDropObj.addSource('demo3_box4',true);	// Make <div id="demo3_box4"> dragable. slide item back into original position after drop
demo3_dragDropObj.addSource('demo3_box5',true);	// Make <div id="demo3_box4"> dragable. slide item back into original position after drop
demo3_dragDropObj.addSource('demo3_box6',true);	// Make <div id="demo3_box4"> dragable. slide item back into original position after drop
demo3_dragDropObj.addSource('demo3_box7',true);	// Make <div id="demo3_box4"> dragable. slide item back into original position after drop


// Assigning drop events on the countries
demo3_dragDropObj.addTarget('demo3_box101','demo3_dropItems'); // Set <div id="leftColumn"> as a drop target. Call function demo3_dropItems on drop
demo3_dragDropObj.addTarget('demo3_box102','demo3_dropItems'); // Set <div id="leftColumn"> as a drop target. Call function demo3_dropItems on drop
demo3_dragDropObj.addTarget('demo3_box103','demo3_dropItems'); // Set <div id="leftColumn"> as a drop target. Call function demo3_dropItems on drop
demo3_dragDropObj.addTarget('demo3_box104','demo3_dropItems'); // Set <div id="leftColumn"> as a drop target. Call function demo3_dropItems on drop
demo3_dragDropObj.addTarget('demo3_box105','demo3_dropItems'); // Set <div id="leftColumn"> as a drop target. Call function demo3_dropItems on drop
demo3_dragDropObj.addTarget('demo3_box106','demo3_dropItems'); // Set <div id="leftColumn"> as a drop target. Call function demo3_dropItems on drop
demo3_dragDropObj.addTarget('demo3_box107','demo3_dropItems'); // Set <div id="leftColumn"> as a drop target. Call function demo3_dropItems on drop
demo3_dragDropObj.addTarget('demo3_capitals','demo3_dropItems'); // Set <div id="leftColumn"> as a drop target. Call function demo3_dropItems on drop

demo3_dragDropObj.init();	// Initizlizing drag and drop object
</script>

