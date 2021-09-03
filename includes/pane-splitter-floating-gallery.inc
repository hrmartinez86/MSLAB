	<p style="margin:0px;">For the drag and drop feature, try to open the folder tree and drag images to it.</p>
	<div id="gallery">
	
	</div>
	<ul id="galleryModel">
		<li id="media1" title="From Norway" caption="This is a picture from norway" largeImagePath="demo-images/image-gallery/bigger1.jpg" thumbnailPathSmall="demo-images/image-gallery/smallthumb1.jpg" ><img src="demo-images/image-gallery/thumb1.jpg"></li>
		<li id="media2" title="Spinning cycle" caption="One hour on the spinning cycle makes you feel better" largeImagePath="demo-images/image-gallery/bigger2.jpg" thumbnailPathSmall="demo-images/image-gallery/smallthumb2.jpg" ><img src="demo-images/image-gallery/thumb2.jpg"></li>
		<li id="media3" title="My workstation at home" caption="This is where I'm sitting developing DHTML scripts" largeImagePath="demo-images/image-gallery/bigger3.jpg" thumbnailPathSmall="demo-images/image-gallery/smallthumb3.jpg" ><img src="demo-images/image-gallery/thumb3.jpg"></li>
		<li id="media4" title="From Norway 2" largeImagePath="demo-images/image-gallery/bigger4.jpg" thumbnailPathSmall="demo-images/image-gallery/smallthumb4.jpg" ><img src="demo-images/image-gallery/thumb4.jpg"></li>
		<li id="media5" title="From Boemlo" caption="Summer vacation 2004. This picture was taken from a ferry" largeImagePath="demo-images/image-gallery/bigger5.jpg" thumbnailPathSmall="demo-images/image-gallery/smallthumb5.jpg" ><img src="demo-images/image-gallery/thumb5.jpg"></li>
		<li id="media6" title="Go Kart" caption="Summer vacation 2004." largeImagePath="demo-images/image-gallery/bigger6.jpg" thumbnailPathSmall="demo-images/image-gallery/smallthumb6.jpg" ><img src="demo-images/image-gallery/thumb6.jpg"></li>
		<li id="media7" title="Coffee break" caption="You always have time for a coffee break." largeImagePath="demo-images/image-gallery/bigger7.jpg" thumbnailPathSmall="demo-images/image-gallery/smallthumb7.jpg" ><img src="demo-images/image-gallery/thumb7.jpg"></li>
		<li id="media8" title="Coffee break" caption="There's almost nothing like a good cup of coffee" largeImagePath="demo-images/image-gallery/bigger8.jpg" thumbnailPathSmall="demo-images/image-gallery/smallthumb8.jpg" ><img src="demo-images/image-gallery/thumb8.jpg"></li>
		<li id="media9" title="Friends" caption="Some of my friends playing croquet" largeImagePath="demo-images/image-gallery/bigger9.jpg" thumbnailPathSmall="demo-images/image-gallery/smallthumb9.jpg" ><img src="demo-images/image-gallery/thumb9.jpg"></li>
		<li id="media10" title="Croquet" caption="" largeImagePath="demo-images/image-gallery/bigger10.jpg" thumbnailPathSmall="demo-images/image-gallery/smallthumb10.jpg" ><img src="demo-images/image-gallery/thumb10.jpg"></li>
		<li id="media11" title="Puerto Rico" caption="Probably one of the best board games ever made." largeImagePath="demo-images/image-gallery/bigger11.jpg" thumbnailPathSmall="demo-images/image-gallery/smallthumb11.jpg" ><img src="demo-images/image-gallery/thumb11.jpg"></li>
		<li id="media12" title="Another cup of coffee" caption="" largeImagePath="demo-images/image-gallery/bigger12.jpg" thumbnailPathSmall="demo-images/image-gallery/smallthumb12.jpg" ><img src="demo-images/image-gallery/thumb12.jpg"></li>
		<li id="media13" title="Winter picture from my window" caption="" largeImagePath="demo-images/image-gallery/bigger13.jpg" thumbnailPathSmall="demo-images/image-gallery/smallthumb13.jpg" ><img src="demo-images/image-gallery/thumb13.jpg"></li>
		<li id="media14" title="Another winter picture from my window" caption="" largeImagePath="demo-images/image-gallery/bigger14.jpg" thumbnailPathSmall="demo-images/image-gallery/smallthumb14.jpg" ><img src="demo-images/image-gallery/thumb14.jpg"></li>
	</ul>
	<div id="destinationBox">
		Drag and Drop some images on me.
	</div>
	<div>
	
	<style type="text/css">
	html,body{
		margin:0px;
		padding:0px;
	}
	#mainContainer{
		margin:10px;
	}
	
	#destinationBox{
		width:250px;
		height:150px;
		overflow:auto;
		border:2px solid #316AC5;
	}
	div#destinationBox.imageSelection{
		background-color:#c6d6ef;
	}
	#
	</style>
	<link rel="stylesheet" href="css/demos.css" media="screen" type="text/css">
	<script type="text/javascript" src="../js/dhtml-suite-for-applications.js"></script>
	<script type="text/javascript">
	var enlargerObj = new DHTMLSuite.imageEnlarger();
	function displayLargeImage(imageObj)
	{
		enlargerObj.displayImage(imageObj.largeImagePath,imageObj.title,imageObj.caption);

	}
	
	function dropItems(sources,destination)
	{
		if(!destination)return false;
		var string = 'Dropping elements:<br>';
		for(var no=0;no<sources.length;no++){
			string = string + sources[no].id + '<br>';
			myGallery.deleteImageFromGallery(sources[no].id);	// Deleting image	
			
		}
		if(!destination.id)destination = destination.parentNode;
		string = string + ' on to element ' + destination.id;
		
		document.getElementById('destinationBox').innerHTML = string;
	}
	
	</script>
		
	<script type="text/javascript">
	// Step 1 - creating a media model/collection of images
	var myCollection = new DHTMLSuite.mediaCollection();
	myCollection.addItemsFromMarkup('galleryModel');

	
	var myImageSelection = new DHTMLSuite.imageSelection();
	myImageSelection.addSelectableElements('gallery');
	myImageSelection.addDestinationElement('destinationBox');
	myImageSelection.setCallBackFunctionOnDrop('dropItems');
	try{
		myImageSelection.setSelectionStartArea(paneSplitter.getReferenceToMainDivElementOfPane('center'));// I want to restrict the selection to start only within the center pane.
	}catch(e){
	}
	try{
		myImageSelection.addDestinationElementsByTagName('node10000','A');
	}catch(e){
		// Folder tree isn't present
	}
	myImageSelection.init();
		
	var myGallery = new DHTMLSuite.floatingGallery();
	myGallery.setMediaCollectionRef(myCollection);
	myGallery.setTargetId('gallery');
	myGallery.setCallBackFunctionOnDblClick('displayLargeImage');
	myGallery.addImageSelectionObject(myImageSelection);
	myGallery.init();	
	

	
	
	</script>
</body>
</html>
