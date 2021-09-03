<h3>Tab view example 1</h3>
<div id="DHTMLSuite_tabView1">
	<div class="DHTMLSuite_aTab">
		This is the content of the first tab. This is just a plain &lt;DIV>. The tabs
		are created by a javascript function.  This is the content of the first tab. This is just a plain &lt;DIV>. The tabs
		are created by a javascript function.  This is the content of the first tab. This is just a plain &lt;DIV>. The tabs
		are created by a javascript function. 	<br><br>
		<a href="#" onclick="tabViewObj.createNewTab('DHTMLSuite_tabView1','A dynamic tab','','includes/demo-tabs-tabContent-1.html');return false">Create new tab dynamically</a><br>
		<a href="#" onclick="tabViewObj.deleteTab('General');return false">Remove this tab</a><br>
		<a href="#" onclick="tabViewObj.addContentToTab('General','includes/tab_include1.inc');return false">Add content to this tab</a>

		
		
	</div>
	<div class="DHTMLSuite_aTab">
		This is the content of the second tab.	<br>
		<a href="#" onclick="tabViewObj.deleteTab('News');return false">Remove this tab</a><br>
		<br>
		<!-- Sub tabs -->
		<div id="DHTMLSuite_tabView5">
			<div class="DHTMLSuite_aTab">
				Content of tab.
			</div>
			<div class="DHTMLSuite_aTab">
				This is the content of the second tab.	<br>
			</div>
			<div class="DHTMLSuite_aTab">
				This is the content of a tab in a sub tab set<br>
				<a href="#" onclick="tabViewObj5.deleteTab('News 3');return false">Remove this tab</a><br>
			</div>
		</div>
		<!-- End sub tabs -->

			
	</div>
	<div class="DHTMLSuite_aTab">
		This script is tested in 
		<a href="#" onclick="tabViewObj.deleteTab('Tools');return false">Remove this tab</a><br>
		<ul>
			<li>IE 5.5</li>
			<li>IE 6</li>
			<li>Opera 8.5</li>
			<li>Firefox</li>
		</ul>	
	</div>
	<div class="DHTMLSuite_aTab">
		Content of tab 4<br>
	</div>
</div>

<script type="text/javascript">
var tabViewObj = new DHTMLSuite.tabView();
tabViewObj.setParentId('DHTMLSuite_tabView1');
tabViewObj.setTabTitles(Array('General','News','Tools','Help'));
tabViewObj.setCloseButtons(Array(false,true,true,true));
tabViewObj.setIndexActiveTab(1);
tabViewObj.setWidth('500');
tabViewObj.setHeight('200');
tabViewObj.init();

var tabViewObj5 = new DHTMLSuite.tabView();
tabViewObj5.setParentId('DHTMLSuite_tabView5');
tabViewObj5.setTabTitles(Array('News 1','News 2','News 3'));
tabViewObj5.setIndexActiveTab(1);
tabViewObj5.setWidth('400');
tabViewObj5.setHeight('80');
tabViewObj5.init();
</script>
<br>
<h3>Tab view example 2</h3>
<div id="DHTMLSuite_tabView2">
	<div class="DHTMLSuite_aTab">
		This is the content of the first tab. 
		This is just a plain &lt;DIV>. The tabs
		are created by a javascript function.  This is the content of the first tab. This is just a plain &lt;DIV>. The tabs
		are created by a javascript function.  This is the content of the first tab. This is just a plain &lt;DIV>. The tabs
		are created by a javascript function. 	<br><br>
	</div>
	<div class="DHTMLSuite_aTab">
		This is the content of the second tab.	<br>
		<a href="#" onclick="tabViewObj2.deleteTab('Tab 2');return false">Remove this tab</a><br>
	</div>
	<div class="DHTMLSuite_aTab">
		This script is tested in 
		<a href="#" onclick="tabViewObj2.deleteTab('Tab 3');return false">Remove this tab</a><br>
		<ul>
			<li>IE 5.5</li>
			<li>IE 6</li>
			<li>Opera 8.5</li>
			<li>Firefox</li>
		</ul>	
	</div>
	<div class="DHTMLSuite_aTab">
		Content of tab 4<br>
	</div>
</div>

<script type="text/javascript">
var tabViewObj2 = new DHTMLSuite.tabView();
tabViewObj2.setParentId('DHTMLSuite_tabView2');
tabViewObj2.setTabTitles(Array('Tab 1','Tab 2','Tab 3','Tab 4'));
tabViewObj2.setIndexActiveTab(2);
tabViewObj2.setWidth('600');
tabViewObj2.setHeight('200');
tabViewObj2.init();

</script>
<br>
<h3>Tab view example 3</h3>
<div id="DHTMLSuite_tabView3">
	<div class="DHTMLSuite_aTab">
		This is the content of the first tab.	<br>
	</div>
	<div class="DHTMLSuite_aTab">
		This script is tested in 
		<a href="#" onclick="tabViewObj3.deleteTab('CSS');return false">Remove this tab</a><br>
		<ul>
			<li>IE 5.5</li>
			<li>IE 6</li>
			<li>Opera 8.5</li>
			<li>Firefox</li>
		</ul>	
	</div>
	<div class="DHTMLSuite_aTab">
		Content of tab 4<br>
		<a href="#" onclick="tabViewObj3.displayATab('CSS');return false">Display the "CSS" tab</a>
	</div>
	<div class="DHTMLSuite_aTab">
		Content of tab 4<br>
		
		<!-- Sub tabs -->
		<div id="DHTMLSuite_tabView4">
			<div class="DHTMLSuite_aTab">
				Content of tab.
			</div>
			<div class="DHTMLSuite_aTab">
				This is the content of the second tab.	<br>
			</div>
			<div class="DHTMLSuite_aTab">
				Content of another tabbr>
				<a href="#" onclick="tabViewObj4.deleteTab('Sub tab 3');return false">Remove this tab</a><br>
			</div>
		</div>
		<!-- End sub tabs -->
		
	</div>
		
</div>

<script type="text/javascript">
var tabViewObj3 = new DHTMLSuite.tabView();
tabViewObj3.setParentId('DHTMLSuite_tabView3');
tabViewObj3.setTabTitles(Array('HTML','CSS','Javascript','Sub tabs'));
tabViewObj3.setIndexActiveTab(2);
tabViewObj3.setWidth('400');
tabViewObj3.setHeight('200');
tabViewObj3.init();


var tabViewObj4 = new DHTMLSuite.tabView();
tabViewObj4.setParentId('DHTMLSuite_tabView4');
tabViewObj4.setTabTitles(Array('Sub 1','Sub tab 2','Sub tab 3'));
tabViewObj4.setIndexActiveTab(2);
tabViewObj4.setWidth('300');
tabViewObj4.setHeight('120');
tabViewObj4.init();

</script>
