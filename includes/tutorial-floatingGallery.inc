<p><b>Classes used</b></p>
<ul>
	<li> <b><a href="../doc/js_docs_out/DHTMLSuite.infoPanel.html" onclick="var scriptDocWin=window.open(this.href);return false">DHTMLSuite.infoPanel</a></b> - Main class for the widget.</li>
	<li> <b><a href="../doc/js_docs_out/DHTMLSuite.mediaCollection.html" onclick="var scriptDocWin=window.open(this.href);return false">DHTMLSuite.mediaCollection</a></b> - Data source("model") for the floating gallery.</li>
</ul>
<p><b>Demos:</b></p>
<ul>
	<li><a href="demo-modal-message-1.html" onclick="var demoWin=window.open(this.href);return false">demo-modal-message-1.html</a></li>
</ul>
<p><b>Css file:</b></p>
<ul>
	<li>Default: <a href="../css_dhtmlsuite/floating-gallery.css" onclick="var demoWin=window.open(this.href);return false">css_dhtmlsuite/floating-gallery.css</a></li>
</ul>
	<h2>This is the code for this gallery</h2>
	<p><b>Step 1: Create the HTML datasource</b></p>
	<pre>
&lt;ul id="galleryModel">
	&lt;li id="media1" title="From Norway" caption="This is a picture from norway" largeImagePath="demo-images/image-gallery/bigger1.jpg" thumbnailPathSmall="demo-images/image-gallery/smallthumb1.jpg" >&lt;img src="demo-images/image-gallery/thumb1.jpg">&lt;/li>
	&lt;li id="media2" title="Spinning cycle" caption="One hour on the spinning cycle makes you feel better" largeImagePath="demo-images/image-gallery/bigger2.jpg" thumbnailPathSmall="demo-images/image-gallery/smallthumb2.jpg" >&lt;img src="demo-images/image-gallery/thumb2.jpg">&lt;/li>
	&lt;li id="media3" title="My workstation at home" caption="This is where I'm sitting developing DHTML scripts" largeImagePath="demo-images/image-gallery/bigger3.jpg" thumbnailPathSmall="demo-images/image-gallery/smallthumb3.jpg" >&lt;img src="demo-images/image-gallery/thumb3.jpg">&lt;/li>
	&lt;li id="media4" title="From Norway 2" largeImagePath="demo-images/image-gallery/bigger4.jpg" thumbnailPathSmall="demo-images/image-gallery/smallthumb4.jpg" >&lt;img src="demo-images/image-gallery/thumb4.jpg">&lt;/li>
	&lt;li id="media5" title="From Boemlo" caption="Summer vacation 2004. This picture was taken from a ferry" largeImagePath="demo-images/image-gallery/bigger5.jpg" thumbnailPathSmall="demo-images/image-gallery/smallthumb5.jpg" >&lt;img src="demo-images/image-gallery/thumb5.jpg">&lt;/li>
	&lt;li id="media6" title="Go Kart" caption="Summer vacation 2004." largeImagePath="demo-images/image-gallery/bigger6.jpg" thumbnailPathSmall="demo-images/image-gallery/smallthumb6.jpg" >&lt;img src="demo-images/image-gallery/thumb6.jpg">&lt;/li>
	&lt;li id="media7" title="Coffee break" caption="I can assure you. This smells just as good as it looks." largeImagePath="demo-images/image-gallery/bigger7.jpg" thumbnailPathSmall="demo-images/image-gallery/smallthumb7.jpg" >&lt;img src="demo-images/image-gallery/thumb7.jpg">&lt;/li>
	&lt;li id="media8" title="Coffee break" caption="There's almost nothing like a good cup of coffee" largeImagePath="demo-images/image-gallery/bigger8.jpg" thumbnailPathSmall="demo-images/image-gallery/smallthumb8.jpg" >&lt;img src="demo-images/image-gallery/thumb8.jpg">&lt;/li>
&lt;/ul>	
	</pre>
<p>This is a plain UL,LI list. The script reads properties from this list:</p>
<ul>
	<li>id - Id of LI tag. This will be the unique id for the image.</li>
	<li>title - title of LI tag represents the title of the image.</li>
	<li>caption - A custom attribute for the li tag. It is not visible in the floating gallery, but will be stored in the media model. It can be used by other scripts, example: in the imageEnlarger script which I 
	hooked up in a callback function in the demo.</li>
	<li>largeImagePath - Also a custom attribute for the li tag. This is where you specify path to a larger version of the image.</li>
	<li>thumbnailPathSmall - A small thumbnail.</li>
	<li>src - src of the img tag is the image you'll see in the floating gallery.</li>
</ul>
<p><b>Step 2: Create a mediaCollection object and point it to this UL list</b></p>
	<pre>
var myCollection = new DHTMLSuite.mediaCollection();
myCollection.addItemsFromMarkup('galleryModel');
	</pre>
	<p><b>Step 3: Create a floatingGallery object and point it to the mediaCollection object</b></p>
<pre>
var myGallery = new DHTMLSuite.floatingGallery();
myGallery.setMediaCollectionRef(myCollection);
myGallery.setTargetId('gallery');
myGallery.setCallBackFunctionOnClick('displayLargeImage');
myGallery.init();	
</pre>
<h2>Add drag and drop features to the floating gallery</h2>
<p>Drag and drop features are available by use of the DHTMLSuite.imageSelection class. In the demo, I have used this code for that:</p>
<pre>
var myImageSelection = new DHTMLSuite.imageSelection();
myImageSelection.addSelectableElements('gallery');
myImageSelection.addDestinationElement('destinationBox');
myImageSelection.setCallBackFunctionOnDrop('dropItems');
addEventToFolderTree();
myImageSelection.init();
</pre>
<p>First, I create the object named myImageSelection. Then I use the addSelectableElements method to make something selectable. the addSelectableElements takes one argument, and that is a reference to the parent node of the elements 
we want to make dragable. That method will add drag-features to all direct childs(only sub, not sub->sub). Your users will now be able to drag these elements either by pressing down their mouse button directly on the image, or by 
dragging a rectangle around one or more images. </p>
<p>The next thing we do is to specify where to drop images. As you can see from the line <b>myImageSelection.addDestinationElement('destinationBox')</b> I have added the element with id "destinationBox" as a possible
destination. Also notice that I call a custom function which I have called addEventToFolderTree. This function looks like this:</p>
<pre>
/* Add the nodes of the folder tree as destinations */
function addEventToFolderTree()
{
	if(!myImageSelection.addDestinationElementsByTagName('node10000','A'))setTimeout('addEventToFolderTree()',1000);
}
</pre>
<p>Here, I'm using the addDestinationElementsByTagName method to make more than one element into a possible destination with only one line of code. The addDestinationElementsByTagName method takes three arguments,
the 2 first arguments is </p>
<ol>
	<li>The id of parent node and </li>
	<li>The tag name of the child nodes. </li>
</ol>
<p>So, in this case, all &lt;A> tags inside element with id "node10000", will be added as possible destinations. The reason why I'm using a setTimeout function is simply because I'm in the demo doesn't know if the
folder tree is loaded or not. node10000 is the root node of my folder tree. </p>
<p><b>Highlight nodes with css</b></p>
<p>All stying is handled by a special class name "imageSelection". For the folder tree, I added this css</p>
<pre>
.DHTMLSuite_tree li a.imageSelection{
	background-color:#316AC5;
	color:#FFF;
}
</pre>
<p>Which specifies that when you drag images over a node in the tree, the node will get a blue background color and white text color.</p>
<p>And for the div "destinationBox" in the demo, I wrote this css:</p>
<pre>
	div#destinationBox.imageSelection{
		background-color:#c6d6ef;
	}
</pre>
<p>I.e.: All div elements with id "destinationBox" and class name "imageSelection" should have a "bluish" background color.</p>
<p><b>Creating call back function</b></p>
<p>The imageSelection class takes care of the process of moving one or more elements to a destination. What's happen afterwards, is out of the scope for this script. This is what we take care of in a callback function. In
the code above, a call back function is defined in this line:</p>
<pre>
myImageSelection.setCallBackFunctionOnDrop('dropItems');
</pre>
<p>It says that a function named "dropItems" should be called when one or more items has been dropped on a destination. Two arguments will be sent to this function:</p>
<ol>
	<li>An array of sources, i.e. the dragged elements.</li>
	<li>A reference to the destination.</li>
</ol>
<p>This information makes it possible for us to make our decisions what to do in our call back function. Let's take a look at the dropItems function:</p>
<pre>
function dropItems(sources,destination)
{
	var string = 'Dropping elements:';
	for(var no=0;no&lt;sources.length;no++){
		string = string + sources[no].id + '';
		myGallery.deleteImageFromGallery(sources[no].id);	// Deleting image	
		
	}
	if(!destination.id)destination = destination.parentNode;
	string = string + ' on to element ' + destination.id;
	
	document.getElementById('destinationBox').innerHTML = string;
	}
</pre>
<p>In my call back function, I'm just creating a string explaining which elements was dragged and to which element they were dropped. </p>
<p>In the for-loop, I'm looping through all the sources. I then concatinate the string and call the deleteImageFromGallery method for the floatingGallery class to remove the specific image from view.</p>
<p>A more useful example will typically involve some ajax code. Perhaps something like:</p>
<pre>
var ajaxObjects = new Array();

function dropItems(sources,destination)
{
	var ajaxIndex = ajaxObjects.length;
	var urlString = 'moveImages.php?sources=';
	for(var no=0;no&lt;sources.length;no++){
		if(no>0)urlString = urlString + ',';
		urlString = urlString + sources[no].id;			
	}
	if(!destination.id)destination = destination.parentNode;
	
	urlString = urlString + '&destination=' + destination.id;
	
	
	ajaxObjects[ajaxIndex] = new sack();
	ajaxObjects[ajaxIndex].requestFile = url;	// Specifying which file to get
	ajaxObjects[ajaxIndex].onCompletion = function(){ DHTMLSuite.dropItems_complete(sources,index); };
	ajaxObjects[ajaxIndex].onError = function(){ alert('Could not execute ajax request'); };	// Error handling
	ajaxObjects[ajaxIndex].runAJAX();		// Execute AJAX function	

		
	string = string + ' on to element ' + destination.id;
	
	document.getElementById('destinationBox').innerHTML = string;
}

function dropItems_complete(sources,ajaxIndex)
{
	if(ajaxObjects[ajaxIndex].response!='OK')alert('Could not remove image');
	for(var no=0;no&lt;sources.length;no++)myGallery.deleteImageFromGallery(sources[no].id);	// Deleting image			
}
</pre>
<p>First I'm buidling an url with the get variables "sources" and "destination". I send this in an Ajax request to a file named moveImages.php. When this file is finished processing the sources, it will
output the string "OK", which will be sent back to my dropItems_complete function. In there, I check for that string and if it's "OK", then I loop through all the sources once again, but this time, I'm calling
the deleteImageFromGallery in order to delete the moved images from the view.</p>