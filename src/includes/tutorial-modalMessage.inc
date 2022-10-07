<ul>
	<li>Class used: <b><a href="../doc/js_docs_out/DHTMLSuite.infoPanel.html" onclick="var scriptDocWin=window.open(this.href);return false">DHTMLSuite.infoPanel</a></b> - Main class for the widget.</li>
	<li>Demo: <a href="demo-modal-message-1.html" onclick="var demoWin=window.open(this.href);return false">demo-modal-message-1.html</a></li>
	<li>Default css file: <a href="../css_dhtmlsuite/info-pane.css" onclick="var demoWin=window.open(this.href);return false">css_dhtmlsuite/info-pane.css</a></li>
</ul>
<p>The modal message script can work as an alternative to the standard alert and confirm dialogs.</p>
<p>What it does is to display a message at the center of your screen. While the message is visible, all other page controls are disabled. </p>
<p>The class used for this widget is the DHTMLSuite.modalMessage script. You have the choice between displaying static content or by displaying content from external files. External content
will be inserted into the modal dialog box by use of Ajax.</p>
<p>The first we need to do is to create a modalMessage object:</p>
<pre>
messageObj = new DHTMLSuite.modalMessage();	// We only create one object of this class
messageObj.setWaitMessage('Loading message - please wait....');
messageObj.setShadowOffset(5);	// Large shadow
</pre>
<p>We have also specified a "please wait" message and set size of the shadow effect to 5 pixels.</p>
<p>There are 4 important methods which you use to specify content, show and hide the modal dialog box.</p>
<ul>
	<li>setHtmlContent(messageContent) is used to specify static content. </li>
	<li>setSource(url) specifies relative path to external file.</li>
	<li>display() displays the message.</li>
	<li>close() closes the message.</li>
</ul>
<p>Here's an example how to use these methods:</p>
<pre>
&lt;SCRIPT type="text/javascript">
function displayMessage(url)
{	
	messageObj.setSource(url);
	messageObj.display();
}
&lt;a href="#" onclick="displayMessage('message.html');return false">Click here&lt;/a>
</pre>
<p>Here, I have created a custom function called displayMessage. This function calls the setSource and display methods. In other words, it specifies the url to the file we want to show in the message box. Then it shows the
modal dialog.</p>
<p>In this case, I will put a call to the close() method inside the included file message.html. Example: &lt;INPUT type="button" value="Close" onclick="messageObj.close()"></p>
<?
include($_SERVER['DOCUMENT_ROOT']."/config/kontera.php");
?>	