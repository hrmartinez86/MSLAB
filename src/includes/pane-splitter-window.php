
	
<div id="myWindow" windowProperties="windowsTheme:true,title:This is my window,resizable:true,closable:true,maxWidth:900,dragable:true,cookieName:paneSplitterWindow1,xPos:300,yPos:400,minWidth:310,minHeight:100,activeTabId:windowContent1">
	<div id="windowContent1" class="DHTMLSuite_windowContent" tabProperties="tabTitle:Code for windows">
		<p><b>The HTML code for this window</b></p>
		<pre>
&lt;div id="myWindow" windowProperties="title:This is my window,resizable:true,closable:true,dragable:true,cookieName:paneSplitterWindow1,xPos:300,yPos:400,minWidth:200,minHeight:100,activeTabId:windowContent1">
	&lt;div id="windowContent1" class="DHTMLSuite_windowContent" tabProperties="tabTitle:Welcome">
		This is my first window.	
	&lt;/div>
	&lt;div id="windowContent2" class="DHTMLSuite_windowContent" tabProperties="contentUrl:includes/article4.html,tabTitle:Second tab,active=1">
	&lt;/div>
	&lt;div id="windowContent3" class="DHTMLSuite_windowContent" tabProperties="contentUrl:includes/article5.html,tabTitle:Third tab">
	&lt;/div>
&lt;/div>
</pre>
<p><b>The Javascript code for a window:</b></p>
<pre>
&lt;script type="text/javascript">

var windowModel = new DHTMLSuite.windowModel();
windowModel.createWindowModelFromMarkUp('myWindow');

var myWindow = new DHTMLSuite.windowWidget();
myWindow.addWindowModel(windowModel);
myWindow.init();
myWindow.setStatusBarText('This is some text');

&lt;/script>
		</pre>
	</div>
	<div id="windowContent2" class="DHTMLSuite_windowContent" tabProperties="contentUrl:includes/article4.html,tabTitle:Second tab,active=1">
	</div>
	<div id="windowContent3" class="DHTMLSuite_windowContent" tabProperties="contentUrl:includes/article5.html,tabTitle:Third tab">
	</div>
</div>
<div id="myWindow2" windowProperties="windowsTheme:true,title:This is my window,resizable:true,closable:true,maxWidth:900,dragable:true,cookieName:paneSplitterWindow2,xPos:200,yPos:200,minWidth:205,minHeight:100,activeTabId:OtherWindow1">
	<div id="OtherWindow1" class="DHTMLSuite_windowContent" tabProperties="tabTitle:Window features">
		Some of the features of this window widget:
		<ul>
			<li>Add, remove and restore new tabs dynamically</li>
			<li>Adding windows to a window collection gives you them tiling and scaling capabilities</li>
			<li>Remember window size, position and active tab in cookies.</li>
			<li>Support for callback functions.</li>
		</ul>
	</div>
</div>

<div id="myWindow3" windowProperties="windowsTheme:true,title:This is my window,resizable:true,maxWidth:900,closable:true,dragable:true,cookieName:paneSplitterWindow3,xPos:100,yPos:150,minWidth:205,minHeight:100,activeTabId:ThirdWindow1">
	<div id="ThirdWindow1" class="DHTMLSuite_windowContent" tabProperties="tabTitle:Window methods">
		<ul>
			<li><a href="#" onclick="myWindow.deleteTab('windowContent2');return false">Delete a tab</a> - myWindow.deleteTab('windowContent2')</li>
			<li><a href="#" onclick="myWindow.restoreTab('windowContent2');return false">Restore a tab</a> - myWindow.restoreTab('windowContent2')</li>
			<li><a href="#" onclick="myWindow.loadContent('windowContent2','includes/pane-splitter-table.inc');myWindow.activateTab('windowContent2');return false">Load a table into a tab</a> - myWindow.loadContent('windowContent2','includes/pane-splitter-table.inc');myWindow.activateTab('windowContent2')</li>
			<li><a href="#" onclick="myWindowCollection.cascade();return false">Cascade windows</a></a></li>
			<li><a href="#" onclick="myWindowCollection.tile();return false">Tile  windows</a></a></li>
			<li><a href="#" onclick="myWindow3.addTab({ id:'A new tab',tabTitle:'Dynamic new tab',contentUrl:'includes/article4.html',htmlElementId:'tooltip'  });myWindow3.activateTab('A new tab');return false">Add new tab</a></a> - myWindow3.addTab({ id:'A new tab',tabTitle:'Dynamic new tab',contentUrl:'includes/article4.html',htmlElementId:'tooltip'  })</li>
		</ul>
	</div>
	<div id="ThirdWindow2" class="DHTMLSuite_windowContent" tabProperties="contentUrl:includes/article5.html,tabTitle:About,active=1">
	</div>
</div>


<script type="text/javascript">

var windowModel = new DHTMLSuite.windowModel();
windowModel.createWindowModelFromMarkUp('myWindow');

var myWindow = new DHTMLSuite.windowWidget();
myWindow.addWindowModel(windowModel);
myWindow.init();
myWindow.setStatusBarText('This is some text');

var windowModel2 = new DHTMLSuite.windowModel();
windowModel2.createWindowModelFromMarkUp('myWindow2');

var myWindow2 = new DHTMLSuite.windowWidget();
myWindow2.addWindowModel(windowModel2);
myWindow2.init();
myWindow2.setStatusBarText('This is some text');

var windowModel3 = new DHTMLSuite.windowModel();
windowModel3.createWindowModelFromMarkUp('myWindow3');

var myWindow3 = new DHTMLSuite.windowWidget();
myWindow3.addWindowModel(windowModel3);
myWindow3.init();
myWindow3.setStatusBarText('This is some text');

var myWindowCollection = new DHTMLSuite.windowCollection();
myWindowCollection.addWindow(myWindow);
myWindowCollection.addWindow(myWindow2);
myWindowCollection.addWindow(myWindow3);
myWindowCollection.setNumberOfColumnsWhenTiled(1);
myWindowCollection.setDivWindowsArea('windowsArea');

</script>

<div id="windowsArea"></div>
	<style type="text/css">

	#windowsArea{
		width:500px;
		height:400px;
		border:1px dotted #000;
		background-color:#EEE;
	}

	</style>

