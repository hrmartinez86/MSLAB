

</head>
<body>
<div id="header">
	<img src="../images/logo.png">
</div>	
<div id="div1">
	Context menu 1
</div>
<div id="div2">
	Context menu 2
</div>
	<style type="text/css">
	#div1{
		width:500px;
		height:200px;
		background-color:#EEE;
	}
	#div2{
		width:500px;
		height:200px;
		background-color:#CCC;
	}
	</style>
<script type="text/javascript">
/* arguments to this function will be the menu element triggering the onclick event and the element triggering the context menu to be displayed */
function saveItem(menuElement,srcElement)
{
	alert(menuElement.tagName);
	alert(srcElement.tagName);
}


// Menu items for the first context menu
var menuModel = new DHTMLSuite.menuModel();
menuModel.addItem(1,'Save','../images/disk.gif','',false,'saveItem');
menuModel.addItem(2,'Open','../images/open.gif','',false);
menuModel.addSeparator(0);
menuModel.addItem(3,'Save','','saveWork()',1);
menuModel.addItem(4,'Tools','','',false);
menuModel.init();

// Menu items for the second element
var menuModel2 = new DHTMLSuite.menuModel();
menuModel2.addItem(1,'Save','../images/disk.gif','',false,'saveItem');
menuModel2.addItem(2,'Open','../images/open.gif','',false);
menuModel2.addSeparator(0);
menuModel2.addItem(3,'Save as','','',false);
menuModel2.addItem(4,'PDF','','',3);
menuModel2.addItem(5,'RTF','','',3);

menuModel2.init();

/* Only one contextMenu object per page */
var contextMenu = new DHTMLSuite.contextMenu();
DHTMLSuite.commonObj.setCssCacheStatus(false);
contextMenu.setWidth(120);
contextMenu.attachToElement(false,'div1',menuModel);
contextMenu.attachToElement(false,'div2',menuModel2);



</script>

