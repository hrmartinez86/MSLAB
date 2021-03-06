if(!window.DHTMLSuite)var DHTMLSuite=new Object();/************************************************************************************************************
*	DHTML Image enlarger.
*
*	Created:			January, 7th, 2006
*	@class Purpose of class:	Enlarge an image and displays it at the center of the screen
*
*	Css files used by this script:	image-enlarger.css
*
*	Demos of this class:		demo-image-enlarger.html
*
* 	Update log:
*
************************************************************************************************************/
/**
* @constructor
* @class Purpose of class:	Enlarge an image and displays it at the center of the screen. (<a href="../../demos/demo-image-enlarger.html" target="_blank">Demo</a>)<br>
*	The constructor accepts an associative array of properties as argument. Possible keys in this array:<br>
*	isDragable-true if the image is drabable<br>
*	isModal-true if the image should be modal<br>
*	closeLinkTxt-Text of close links<br>
* @version 1.0
* @author	Alf Magne Kalleland(www.dhtmlgoodies.com)
*/

DHTMLSuite.imageEnlarger=function(props){

	var layoutCSS;
	this.layoutCSS='image-enlarger.css';
	var divElement;
	var divElementImageBox;
	var divElInner;
	var iframeEl;

	var currentImagePath;
	var objectIndex;
	var transparentDiv;
	var captionDiv;
	var msieOpacity;
	var isDragable;
	var isModal;

	this.isDragable=false;
	this.msieOpacity=50;
	this.isModal=true;

	var resizeTransparentAllowed;
	var closeLinkTxt;
	var dragObject;
	var dragOffsetX;
	var dragOffsetY;

	this.dragOffsetX=0;
	this.dragOffsetY=0;

	this.closeLinkTxt='Close';

	this.resizeTransparentAllowed=true;
	try{
	if(!standardObjectsCreated)DHTMLSuite.createStandardObjects();	
// This line starts all the init methods
	}catch(e){
	alert('You need to include the dhtmlSuite-common.js file');
	}

	this.objectIndex=DHTMLSuite.variableStorage.arrayDSObjects.length;
	DHTMLSuite.variableStorage.arrayDSObjects[this.objectIndex]=this;

	if(props)this.__setInitProps(props);

}

DHTMLSuite.imageEnlarger.prototype={
	
// {{{ __setInitProps()
	/**
	 *	Set initial properties
	 *
	 *	@param Array props-Associative array of properties
	 *
	*@public
	 */
	__setInitProps:function(props){
	if(props.closeLinkTxt)this.closeLinkTxt=props.closeLinkTxt;
	if(props.isDragable)this.isDragable=props.isDragable;
	if(props.isModal||props.isModal===false)this.isModal=props.isModal;

	}
	
// }}}
	,
	
// {{{ displayImage()
	/**
	 *	Display image
	 *
	 *	@param String imagePath-Path to image
	 *	@param String title-Title of image
	 *	@param String description-Description/Caption of image.
	 *
	*@public
	 */
	displayImage:function(imagePath,title,description){
	DHTMLSuite.commonObj.loadCSS(this.layoutCSS);
	if(!this.divElement)this.__createHTMLElements();
	this.__resizeTransparentDiv();
	this.__clearHTMLElement();
	this.__addImageElement(imagePath);
	this.__setCaptionText(title,description);
	this.__displayDivElement();
	this.currentImagePath=imagePath;
	}
	
// }}}
	,
	
// {{{ setIsDragable()
	/**
	 *	Specify if the image should be dragable, default=false;
	 *
	 *
	*@public
	 */
	setIsDragable:function(isDragable){
	this.isDragable=isDragable;
	}
	
// }}}
	,
	
// {{{ isModal()
	/**
	 *	Specify if the window should be modal, i.e. a transparent div behind the image.
	 *
	 *
	*@public
	 */
	setIsModal:function(isModal){
	this.isModal=isModal;
	}
	
// }}}
	,
	
// {{{ setDragOffset()
	/**
	 *	If drag is enabled, you can set drag offset here. It is useful if you experience some "jumping" when this script is initialized.
	 *	That jumping is caused by the drag script not being able to determine the position of the element correctly.
	 *
	 *	@param Integer offsetX-offset position
	 *	@param Integer offsetY-offset position
	 *
	 *
	*@public
	 */
	setDragOffset:function(dragOffsetX,dragOffsetY){
	this.dragOffsetX=dragOffsetX;
	this.dragOffsetY=dragOffsetY;
	}
	
// }}}
	,
	
// {{{ hide()
	/**
	 *	Hide the image
	 *
	 *
	*@public
	 */
	hide:function(){
	
// Call private hideDivElement method.
	this.__hideDivElement();
	return false;

	}
	
// }}}
	,
	
// {{{ setCloseLinkTxt()
	/**
	 *	Set text for close link text
	 *
	 *	@param String closeLinkTxt-Label of close link-If you pass in false or empty string, no close link will be displayed.
	 *
	*@public
	 */
	setCloseLinkTxt:function(closeLinkTxt){
	this.closeLinkTxt=closeLinkTxt;
	}
	
// }}}
	,
	
// {{{ setLayoutCss()
	/**
	 *	Specify new relative path/name to css file(default is image-enlarger.css)
	 *	The complete path to this file will be the path set by the DHTMLSuite-config object+this value
	 *
	 *	@param String newLayoutCss-Name (or path)to new css file
	 *
	*@public
	 */
	setLayoutCss:function(newLayoutCss){
	this.layoutCSS=newLayoutCss;
	}
	
// }}}
	,
	
// {{{ __createHTMLElements()
	/**
	 *	Create html elements used by this widget
	 *
	 *
	*@private
	 */
	__createHTMLElements:function(){
	var ind=this.objectIndex;

	
// Create main div element. 
	this.divElement=document.createElement('DIV');
	this.divElement.className='DHTMLSuite_imageEnlarger';
	this.divElement.ondragstart=function(){ return false; };
	DHTMLSuite.commonObj.__addEventEl(this.divElement);

	document.body.appendChild(this.divElement);

	this.divElInner=document.createElement('DIV');
	this.divElInner.className='DHTMLSuite_imageEnlarger_imageBox';
	this.divElement.appendChild(this.divElInner);

	
// Create div element for the image
	this.divElementImageBox=document.createElement('DIV');
	this.divElInner.appendChild(this.divElementImageBox);

	
// Create transparent div
	this.transparentDiv=document.createElement('DIV');
	this.transparentDiv.className='DHTMLSuite_imageEnlarger_transparentDivs';
	document.body.appendChild(this.transparentDiv);
	this.transparentDiv.style.display='none';
	this.transparentDiv.style.filter='alpha(opacity='+this.msieOpacity+')';
	DHTMLSuite.commonObj.addEvent(window,'resize',function(){ DHTMLSuite.variableStorage.arrayDSObjects[ind].__resizeTransparentDiv(); });

	
// Create close button
	var closeButton=document.createElement('DIV');
	closeButton.className='DHTMLSuite_imageEnlarger_close';
	closeButton.onmouseover=this.__mouseOverEffectCloseButton;
	closeButton.onmouseout=this.__mouseoutCalendarButton;
	closeButton.onclick=function(e){ DHTMLSuite.variableStorage.arrayDSObjects[ind].hide(); };
	DHTMLSuite.commonObj.__addEventEl(closeButton);
	this.divElInner.appendChild(closeButton);

	
// Create caption
	this.captionDiv=document.createElement('DIV');
	this.captionDiv.className='DHTMLSuite_imageEnlarger_caption';
	this.divElInner.appendChild(this.captionDiv);

	
// Iframe element
	if(DHTMLSuite.clientInfoObj.isMSIE){

		this.iframeEl=document.createElement('<iframe frameborder=0 src="about:blank" scrolling="no">');
		this.iframeEl.className='DHTMLSuite_imageEnlarger_iframe';
		this.divElement.appendChild(this.iframeEl);
	}
	if(this.isDragable){
		setTimeout('DHTMLSuite.variableStorage.arrayDSObjects['+ind+'].__makeElementDragable()',1);
	}
	}
	
// }}}
	,
	
// {{{ __makeElementDragable()
	/**
	 *	Make an element dragable
	 *
	 *
	*@private
	 */
	__makeElementDragable:function(){
	try{
		this.dragObject=new DHTMLSuite.dragDropSimple({ elementReference: this.divElement, offsetX:this.dragOffsetX,offsetY: this.dragOffsetY,cloneNode:false });
	}catch(e){
		alert('You need to include DHTMLSuite-dragDropSimple.js for the drag feature');
	}
	}
	
// }}}
	,
	
// {{{ __createHTMLElements()
	/**
	 *	Create html elements used by this widget
	 *
	 *
	*@private
	 */
	__mouseOverEffectCloseButton:function(){
	this.className='DHTMLSuite_imageEnlarger_closeOver';
	}
	,
	
// {{{ __createHTMLElements()
	/**
	 *	Create html elements used by this widget
	 *
	 *
	*@private
	 */
	__mouseoutCalendarButton:function(){
	this.className='DHTMLSuite_imageEnlarger_close';
	}
	
// }}}
	,
	
// {{{ __clearHTMLElement()
	/**
	 *	Clear image tag from div
	 *
	 *
	*@private
	 */
	__clearHTMLElement:function(){
	this.divElementImageBox.innerHTML='';
	}
	
// }}}
	,
	
// {{{ __displayDivElement()
	/**
	 *	Display div elements for this widget
	 *
	 *
	*@private
	 */
	__displayDivElement:function(){

	this.divElement.style.visibility='hidden';
	if(this.isModal)this.transparentDiv.style.display='block';
	if(this.iframeEl)this.iframeEl.style.display='block';
	}
	
// }}}
	,
	
// {{{ __hideDivElement()
	/**
	 *	Hide div elements for this widget
	 *
	 *
	*@private
	 */
	__hideDivElement:function(){
	DHTMLSuite.discardElement(this.divElement);
	DHTMLSuite.discardElement(this.transparentDiv);
	this.divElement=false
	/*
	this.divElement.style.visibility='hidden';
	this.transparentDiv.style.display='none';

	if(this.iframeEl){
		this.iframeEl.style.display='none';
		this.iframeEl.style.height='1px';
		this.iframeEl.style.width='1px';
	}
	*/
	}
	
// }}}
	,
	
// {{{ __resizeTransparentDiv()
	/**
	 *	Resize transparent div according to document width and height
	 *
	 *
	*@private
	 */
	__resizeTransparentDiv:function(){
	var ind=this.objectIndex;
	if(!this.resizeTransparentAllowed)return;
	this.resizeTransparentAllowed=false;
	var divHeight=Math.max(DHTMLSuite.clientInfoObj.getBrowserHeight(),document.documentElement.scrollHeight);
	var divWidth=Math.max(DHTMLSuite.clientInfoObj.getBrowserWidth(),document.documentElement.scrollWidth);

	this.transparentDiv.style.width=divWidth+'px';
	this.transparentDiv.style.height=divHeight+'px';

	setTimeout('DHTMLSuite.variableStorage.arrayDSObjects['+ind+'].resizeTransparentAllowed=true',10);
	}
	
// }}}
	,
	
// {{{ __addImageElement()
	/**
	 *	Create img element
	 *
	 *	@param String imagePath-Path to image
	 *
	*@private
	 */
	__addImageElement:function(imagePath){
	var ind=this.objectIndex;
	var img=document.createElement('IMG');
	this.divElementImageBox.appendChild(img);
	img.onresize=function(){ DHTMLSuite.variableStorage.arrayDSObjects[ind].__repositionHTMLElement(); };
	img.onload=function(){ DHTMLSuite.variableStorage.arrayDSObjects[ind].__repositionHTMLElement(); };
	DHTMLSuite.commonObj.__addEventEl(img);
	img.src=imagePath;
	}
	
// }}}
	,
	
// {{{ __setCaptionText()
	/**
	 *	Put title and caption into the caption div
	 *
	 *
	*@private
	 */
	__setCaptionText:function(title,description){
	var ind=this.objectIndex;
	var txt='';
	if(title)txt='<span class="DHTMLSuite_imageEnlarger_captionTitle">'+title+'</span>'
	if(description)txt=txt+'<span class="DHTMLSuite_imageEnlarger_captionDescription">'+description+'</span>';
	if(this.closeLinkTxt)txt=txt+'<a class="DHTMLSuite_imageEnlarger_closeLink" href="#" onclick="return DHTMLSuite.variableStorage.arrayDSObjects['+ind+'].hide()">'+this.closeLinkTxt+'</a>';
	this.captionDiv.innerHTML=txt;
	}
	
// }}}
	,
	
// {{{ __repositionHTMLElement()
	/**
	 *	Reposition div elements when the image is fully loaded.
	 *
	 *
	*@private
	 */
	__repositionHTMLElement:function(internalCall){

	var ind=this.objectIndex;
	var imgs=this.divElementImageBox.getElementsByTagName('IMG');
	var img=imgs[0];
	this.divElementImageBox.style.width=img.width+'px';
	this.divElementImageBox.style.height=img.height+'px';

	this.divElement.style.width=(this.divElInner.offsetWidth)+'px';
	this.divElement.style.height=(this.divElInner.offsetHeight)+'px';

	this.divElInner.style.width=this.divElementImageBox.offsetWidth+'px'; 
	this.divElInner.style.height=(this.divElementImageBox.offsetHeight+this.captionDiv.offsetHeight)+'px';

	if(this.isDragable){
		this.divElement.style.left=(DHTMLSuite.clientInfoObj.getBrowserWidth()/2-this.divElement.offsetWidth/2)+'px';
		this.divElement.style.top=(DHTMLSuite.clientInfoObj.getBrowserHeight()/2-this.divElement.offsetHeight/2)+'px';
		this.divElement.style.marginLeft='0px';
		this.divElement.style.marginTop='0px';
		this.divElement.style.cursor='move';

	}else{
		this.divElement.style.marginLeft=Math.round(this.divElementImageBox.offsetWidth/2 *-1)+'px';
		this.divElement.style.marginTop=Math.round(this.divElementImageBox.offsetHeight/2 *-1)+'px';
	}

	if(this.iframeEl){
		this.iframeEl.style.width=this.divElInner.style.width;
		this.iframeEl.style.height=this.divElInner.style.height;
	}

	if(!internalCall){
		setTimeout('DHTMLSuite.variableStorage.arrayDSObjects['+ind+'].__repositionHTMLElement(true)',50);
	}else this.divElement.style.visibility='visible';
	}

}
