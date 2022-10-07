<div class="DHTMLSuite_xpPane">
	<div id="pane1">
		<div>
			<!-- Start content of pane -->
			This is the content of the first pane. 
			You use plain HTML when you do this.
			<!-- End content -->
		</div>	
	</div>
	<div id="pane2">
		<div>
			<!-- Start content of pane -->
			Content line 1<br>
			Content line 2<br>
			Content line 3<br>
			Content line 4<br>
			Content line 5<br>
			Content line 6<br>
			Content line 7<br>
			Content line 8<br>
			Content line 9<br>

			<!-- End content -->
		</div>		
	</div>
	<div id="pane3">
		<div>
			<!-- Start content of pane -->
			<b>My documents</b><br>
			File folder<br><br>
			Date modified: Oct. 3rd 2005				
			<!-- End content -->
		</div>		
	</div>
</div>

<div id="otherContent">

	<img src="../images/logo.png"><br>
	<a href="#" onclick="infoPane.addContentToPane('pane1','includes/info-pane-2.inc');return false">Replace content of pane 1 with content from external file.</a><br><br>
	<a href="#" onclick="infoPane.addStaticContentToPane('pane2','<p><b>This is static content</b></p>');return false">Replace content of pane 2 with some static content.</a><br>
	<a href="#" onclick="infoPane.addStaticContentToPane('pane2','<p><b>This is static content</b></p><p>More content here</p>');return false">Replace content of pane 2 with some static content.</a><br><br>
	<a href="#" onclick="infoPane.addContentToPane('pane3','includes/info-pane-1.inc');return false">Replace content of "File and folder tasks" with content from external file.</a>

	<span id="debug"></span>
</div>
	
<script type="text/javascript">

var infoPane = new DHTMLSuite.infoPanel();
DHTMLSuite.commonObj.setCssCacheStatus(true);
infoPane.addPane('pane1','Panel 1',500,'cookie_pane1');
infoPane.addPane('pane2','Panel 2',500,'cookie_pane2');
infoPane.addPane('pane3','File and folder tasks',500,'cookie_pane3');
infoPane.init();
</script>
