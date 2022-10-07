	<form>
	<div id="header">
		<img src="../images/logo.png">
	</div>	
	<div id="mainContainer">
		<p>This is a demo of the DHTMLSuite.modalMessage class. It displays a message at the center of the screen and disables all other page controls until the message is closed.</p>
		<a href="#" onclick="displayMessage('includes/demo-modal-message-1.inc');return false">Message from url (example 1)</a><br> 
		<a href="#" onclick="displayMessage('includes/demo-modal-message-2.inc');return false">Message from url (example 2)</a><br> 
		<p>The content of the two boxes above are loaded from external files. We have also specified that we want a drop shadow on them</p>
		<a href="#" onclick="displayStaticMessage('<h1>Static message</h1><p>This is a static message</p><p><a href=\'#\' onclick=\'closeMessage();return false\'>Close</a>',false);return false">Static message (Example 1)</a><br>
		<a href="#" onclick="displayStaticMessage('<h1>Error message</h1><p>This is a static message with a different layout(css class)</p><p><a href=\'#\' onclick=\'closeMessage();return false\'>Close</a>','modalDialog_contentDiv_error');return false">Static message (Example 2 - different layout)</a>
		<p>These last boxes are displaying static HTML. There are no shadows on these boxes. The last message box is assigned to a different CSS class than 
		the other messages. This gives it a different look.</p>
		<div class="clear"></div>	
	</div>
	</form>
<script type="text/javascript">
messageObj = new DHTMLSuite.modalMessage();	// We only create one object of this class
messageObj.setWaitMessage('Loading message - please wait....');
messageObj.setShadowOffset(5);	// Large shadow

DHTMLSuite.commonObj.setCssCacheStatus(false);

function displayMessage(url)
{
	
	messageObj.setSource(url);
	messageObj.setCssClassMessageBox(false);
	messageObj.setSize(400,200);
	messageObj.setShadowDivVisible(true);	// Enable shadow for these boxes
	messageObj.display();
}

function displayStaticMessage(messageContent,cssClass)
{
	messageObj.setHtmlContent(messageContent);
	messageObj.setSize(300,150);
	messageObj.setCssClassMessageBox(cssClass);
	messageObj.setSource(false);	// no html source since we want to use a static message here.
	messageObj.setShadowDivVisible(false);	// Disable shadow for these boxes	
	messageObj.display();
	
	
}

function closeMessage()
{
	messageObj.close();	
}


</script>
	<style type="text/css">
	/* CSS for the demo. CSS needed for the scripts are loaded dynamically by the scripts */
	#mainContainer{
		width:500px;
		margin:0 auto;
		margin-top:10px;
		border:1px double #000;
		padding:5px;
		
	}
	
	/* Alternative layout for the message box - used by one of the messages */
	
	.modalDialog_contentDiv_error{
		border:3px solid #FFF;	
		padding:2px;
		z-index:100001;/* Always needed	*/
		position:absolute;	/* Always needed	*/
		background-color:#F00;	/* White background color for the message */
		color:#FFF;
	}
	.modalDialog_contentDiv_error a{
		color:#FFF;
	}
	h1{
		margin-top:0px;
	}

	</style>	

