<div id="mainContainer">
	<div id="header">
		<img src="../images/logo.png">
	</div>
	<div id="menuColumn">
		This demo illustrates how you can use the DHTMLSuite.dynamicTooltip class. Move your mouse over the "Info" links to see how it works.			
	</div>
	<div id="mainContent">
		<table width="100%" class="productTable">
			<thead>
				<th>Product</th>
				<th>Info</th>
			</thead>
			<tbody>
				<tr class="oddRow">
					<td>JS Calendar</td>
					<td><a href="#" onmouseover="tooltipObj.displayTooltip('includes/dyn-tooltip2.inc',this);return false" onmouseout="tooltipObj.hideTooltip()">Info</a></td>	
				</tr>
				<tr class="evenRow">
					<td>Dragable boxes</td>
					<td><a href="#" onmouseover="tooltipObj.displayTooltip('includes/dyn-tooltip3.inc',this);return false" onmouseout="tooltipObj.hideTooltip()">Info</a></td>				
				</tr>
				<tr class="oddRow">
					<td>Ajax tooltip</td>
					<td><a href="#" onmouseover="tooltipObj.displayTooltip('includes/dyn-tooltip1.inc',this);return false" onmouseout="tooltipObj.hideTooltip()">Info</a></td>				
				</tr>
			</tbody>
		</table>	
	</div>
</div>

<script type="text/javascript">
var tooltipObj = new DHTMLSuite.dynamicTooltip();	// Create ONE tooltip object.
</script>


<style type="text/css">

#mainContainer{
	width:590px;
	padding:5px;
	border:1px solid #317082;	
	text-align:left;	/* Override inherited text-align:center from the body tag */
	background-color:#FFF;
	height:400px;
	margin-top:50px;
	margin-left:auto;
	margin-right:auto;
}

#menuColumn{
	width:140px;
	float:right;
	font-size:0.8em;
}
#mainContent{
	width:410px;
	float:left;	
}

.oddRow{
	background-color:#FFF;
}
.evenRow{
	background-color:#EEE;
}

.productTable{
	border:3px double #000;
}
h3{
	margin-top:0px;
}
th{
	text-align:left;
}

/* End css for the demo */
</style>