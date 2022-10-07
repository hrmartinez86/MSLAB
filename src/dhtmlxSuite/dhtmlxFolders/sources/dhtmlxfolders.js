//v.1.0 build 80512

/*
Copyright DHTMLX LTD. http://www.dhtmlx.com
You allowed to use this component or parts of it under GPL terms
To use it on other terms or get Professional edition of the component please contact us at sales@dhtmlx.com
*/
	/**
	*	@desc: dhtmlxFolders object constructor
	*	@param: parent - DOM object which will be container for Folders
	*	@type: public
	*/
	function dhtmlxFolders(parent){
		if (typeof(parent)!="object")
			parent=document.getElementById(parent);

		this.parent=parent;
		this.imgSrc = window.dhx_globalImgPath||"";
		this.XMLLoader = null;
		
		this._item_type="xml_generic";
		this._userdataCol = new Array();
			
		this.cont=document.createElement("DIV");
		this.parent.appendChild(this.cont);
		this.cont.className="dhx_folders_area";
		if (_isIE) this.cont.className+=" dhx_isIE6";

		var self=this;
		this.clickTime = 0;
		this.clickedID = null;
		this.cont.onclick=function(e){
			self.clickedID = self._trackParent(e||event);
			var retValue = self._onclickHandler(e||event); 
			return true;//retValue;
		};
		this.cont.onselectstart=this.stopEvent;
		//this.cont.ondblclick=function(e){ return true };
		
		if (_isMacOS) 
			this.cont.oncontextmenu = function(e){ return self._onmupHandler(e||event,"context"); };
		
		this.cont.onmousedown = function(e){  return self._onmdownHandler(e||event); };
		this.cont.onmouseup 	= function(e){ 
			//simulate dbl click event handler
			var clickTime = (new Date()).valueOf(); 
			if(clickTime-self.clickTime<200){
				var retValue = self._ondblclickHandler(e||event,self.clickedID);
			}
			self.clickTime = clickTime;
			//..
			return self._onmupHandler(e||event); 
		
		};
		this.cont.onmousemove = function(e){ return self._onmmoveHandler(e||event); };		
		this.cont.ondragstart=function(){ return false; };
   
		this.onKeyHandler=function(e){return self._onKeyPressed(e||event);}
		this.dhx_Event();
		
		//paging
		this.paging = false;
		this.page = 1;
		this.itemsPerPage = 0;
		this.requestServerForPage = false;
		
		//filter
		this._filtersAr = new Array();
		
		//this._def_item={};
		this._set={ editable:false,selectable:1};
        this.clearAll();



		return this;
	}
	
	/**
	*   @desc: set config parameters to Folders
	*	@param: data - object containing pair of parameter/value (list of possible parameters: editable, ...) 
	*   @type:  public
	*/
	dhtmlxFolders.prototype.config=function(data){
		for (a in data)
			this._set[a]=data[a];

	}
	/**
	*   @desc: 
	*   @type:  private
	*/
    dhtmlxFolders.prototype._xml={
		itemTag:"item",
		url:""
	};
	
	/**
	*   @desc: turns on/off edit mode for dhtmlxFolders object 
	*	@param: newPath - new base directory path
	*   @type:  public
	*/
	dhtmlxFolders.prototype.enableEditMode = function(state){
		this._set.editable = state;
	}
	
	/**
	*   @desc: sets new base dir for images used 
	*	@param: newPath - new base directory path
	*   @type:  public
	*/
	dhtmlxFolders.prototype.setImagePath = function(newPath){
		this.imgSrc = newPath;
	}


	
	/**
	*   @desc: 
	*   @type:  private
	*/
	dhtmlxFolders.prototype._types={ 
		thumbnail:["dhtmlxEItem","script"], 
		tile:["dhtmlxEItemA","script"], 
		icon:["dhtmlxEItemB","script"], 
		ficon:["dhtmlxFoldersXMLBasedGeneric","xml-xsl","ficon","ficon.xsl","cells"],
		ftable:["dhtmlxFoldersXMLBasedGeneric","xml-xsl","ftable","ftable.xsl","lines"],
		fthumbs:["dhtmlxFoldersXMLBasedGeneric","xml-xsl","fthumbs","fthumbs.xsl","cells"],
		ftiles:["dhtmlxFoldersXMLBasedGeneric","xml-xsl","ftiles","ftiles.xsl","cells"],
		xml_generic:["dhtmlxFoldersXMLBasedGeneric","xml-xsl","generic","","cells"]
	};
	
	/**
	*   @desc: gets current type of elements placement in Folders. Most usual is cells (number of items in line depends on Folders width), but some can be lines (when there is only one item per line)
	*   @type:  private
	*/
	dhtmlxFolders.prototype._getCurrentPlacementType = function(){
		return this._types[this._item_type][4]||"cells";
	}
	
	/**
	*   @desc: set some name to be used in top css class name for Folders Item by the following schema: dhx_folders_[CSSBASENAME_]item
	*	@desc: cssBaseName - css class base name (if it is empty, then use the name of type)
	*   @type:  public
	*/
	dhtmlxFolders.prototype.setCSSBaseName = function(cssBaseName){
		if(!cssBaseName)
			cssBaseName = this._item_type;
		this._cssBaseName = cssBaseName;
	} 
	
	/**
	*   @desc: inserts object in order collection
	*   @type:  private
	*/
	dhtmlxFolders.prototype._ordIns=function(ind,z){
				if (ind!=this._orderCol.length)
					this._orderCol=this._orderCol.slice(0,ind).concat([0]).concat(this._orderCol.slice(ind,this._orderCol.length));
				this._orderCol[ind]=z;
       	};
	/**
	*   @desc: deletes object from order collection
	*   @type:  private
	*/
	dhtmlxFolders.prototype._ordDel=function(pos){ 
		this._orderCol.splice(pos,1); 
	};
	/**
	*   @desc: move object in order collection
	*   @type:  private
	*/
	dhtmlxFolders.prototype._ordMov=function(s,e,m){
				var tz=this._orderCol[e];
				var sz=this._orderCol[s];
				if (s<e)
					this._orderCol=this._orderCol.slice(0,s).concat(this._orderCol.slice(s+1,e)).concat(m=="next"?[tz,sz]:[sz,tz]).concat(this._orderCol.slice(e+1,this._orderCol.length));
				else
					this._orderCol=this._orderCol.slice(0,e).concat(m=="next"?[tz,sz]:[sz,tz]).concat(this._orderCol.slice(e+1,s)).concat(this._orderCol.slice(s+1,this._orderCol.length));		
		};	
		
	/**
	*   @desc: moves item
	*	@param: sid - source item id
	*	@param: mode - mode of movement (next, before, in)
	*	@param: tid - target item id
	*	@param: sObj - source object (if not specified then current Folders object)	
	*	@param: tObj - target object (if not specified then current Folders object)	
	*   @type:  public
	*/
	dhtmlxFolders.prototype.moveItem = function(sid,mode,tid,sObj,tObj) {
		if (sid==tid) return;
		sObj=sObj||this;
		tObj=tObj||this;
		var sz=sObj._idpullCol[sid].item;
		var tz=tObj._idpullCol[tid].item;
		sz.parentNode.removeChild(sz);
		this.matchId(function(id,ind2){
			if (mode=="next")
				if (this._orderCol[ind2+1])
					tz.parentNode.insertBefore(sz,this._orderCol[ind2+1].item);
				else
					tz.parentNode.appendChild(sz); 
			else
				tz.parentNode.insertBefore(sz,tz);
				
			this.matchId(function(id2,ind){
				this._ordMov(ind,ind2,mode);
			},sid);
		},tid);
	};
	
	/**
	*   @desc: define type of items (see among defined types)
	*	@param: name - name of type (if user defined xml-xsl type, them use "xml_generic")
	*	@param: xslUrl - url of xsl file to use for this type (if user defined types, then this is the only different parameter when chnaging from one type to another )
	*   @type:  public
	*/
	dhtmlxFolders.prototype.setItemType=function(name,xslUrl){
		/*
		TODO :: I think it will be slow because of massive dom recalculation, it has sense to remove all elements change type and render all again
		*/
		if ( this._item_type!=name || arguments.length>1){
			this._item_type=name;
			//reload xsl if xsl filename specified
			if(arguments.length>1){
				this.XMLLoader.xslDoc=null;
				this._types[this._item_type][3] = arguments[1];
				this.XMLLoader.XSLProcessor = null;
				var self = this;
				
				var tmpLoader = new dtmlXMLLoaderObject(function(){
					self.XMLLoader.xslDoc = this.xmlDoc;
					for (var i=0; i<self._orderCol.length; i++){
						self._orderCol[i].resetType();
						self._orderCol[i].render();
					}
					self.drawFolders();
				});
				tmpLoader.loadXML(this._types[this._item_type][3]);
				return;
			}
			//rerender all items if any still exist [old code]
			if (this._orderCol.length){
				var cell=this._getItem(this._orderCol[0]);
				for (var i=0; i<this._orderCol.length; i++){
					cell.item=this._orderCol[i];				
					cell.render(true);
				}
			}
			
		}
	}
	
	/**
	*	@desc: returns data object item based on (it can be XML node or json object or other type of object, depending on datasource which was used). 
	*	@param: itemId - id of item to get data object from
	*	@type:public
	*/
	
	dhtmlxFolders.prototype.getItemDataObject = function(itemId){
		return this.getItem(itemId).data.dataObj;
	}
		
	/**
	*   @desc: sort items 
	*	@param: sortFunc - custom function used for comparing two values. it gets 2 objects for comparison and must return positive int if necessary property of first ojects "bigger", 0 if they are equel for both and negative if second obj property is "bigger"
	*	@param: order - direction (0 or 1)
	*   @type:  public
	*/
	dhtmlxFolders.prototype.sortItems = function(sortFunc,order){
		this._orderCol.sort(function(a,b){
			if(order=='asc')
				return sortFunc(a,b);
			else
				return sortFunc(a,b)*-1;
		})	;
		this.drawFolders();
	}
	/**
	*   @desc: filter items using filterFunc and mask
	*	@param: filterFunc - function to use to define if item should appear or not. if this function returns true, then item will be visible. Incomming arguments are: item object and mask
	*	@param: mask - mask to use in filter
	*	@param: preservePrevious - preserver previously applied filters
	*   @type:  public
	*/
	dhtmlxFolders.prototype.filterItems = function(filterFunc,mask,preservePrevious){
		if(!preservePrevious)
			this.filterClear(true);
		for (var i=0; i<this._orderCol.length; i++){
			if(!filterFunc(this._orderCol[i],mask))
				this._orderCol[i].data.filteredOut = true;
		}
		this._filtersAr[this._filtersAr.length] = new Array(filterFunc,mask);
		this.goToPage(this.page);
	}
	/**
	*	@desc: clears all filters
	*	@type: public
	*/
	dhtmlxFolders.prototype.filterClear = function(skip_redraw){
		for (var i=0; i<this._orderCol.length; i++){
			this._orderCol[i].data.filteredOut = false;
		}
		this._filtersAr = new Array();
		if(!skip_redraw)
			this.goToPage(this.page);
	}
	
	/**
	*	@desc: getAray of items which are not filtered out
	*	@type: private
	*/
	dhtmlxFolders.prototype._getCurrentlyVisibleItemsArray = function(){
		var outArray = new Array();
		for (var i=0; i<this._orderCol.length; i++){
			if(!this._orderCol[i].data.filteredOut)
				outArray[outArray.length] = this._orderCol[i]
		}
		return outArray;
	}
	/**
	*	@desc: re-applies all filters on entire content
	*	@type: private
	*/
	dhtmlxFolders.prototype._filtersReApply = function(){
		for (var i=0; i<this._orderCol.length; i++){
			this._filtersReApplyOnItem(this._orderCol[i])
		}
	}
	/**
	*	@desc: re-applies all filters on single item
	*	@type: private
	*/
	dhtmlxFolders.prototype._filtersReApplyOnItem = function(itemObj){
		for(var n=0;n<this._filtersAr.length;n++){
			if(!this._filtersAr[n][0](itemObj,this._filtersAr[n][1])){
				itemObj.data.filteredOut = true;
				break;
			}
		}
	}
	
	/**
	*   @desc: gets number of items currently known to Folders object (it can be chnaged then if dynamical loading is allowed) 
	*	@returns: numeric value - number of items
	*   @type:  public
	*/
	dhtmlxFolders.prototype.getItemsNum = function(){
		return this._orderCol.length;
	}
		
	/**
	*   @desc: populates Folders from JSON object 
	*	@param: data - JSON object
	*   @type:  private
	*/
	dhtmlxFolders.prototype.loadJSON=function(data){
		for(var i=0; i<data.length; i++)
			this.addItemJSON(data[i]);
	}
	
	
	/**
	*   @desc: populates Folders from XML String
	*	@param: xmlString - xml string
	*   @type:  public
	*/
	dhtmlxFolders.prototype.loadXMLString=function(xmlString,xslFileURL){
		if(!this.XMLLoader)
			this.XMLLoader = new dtmlXMLLoaderObject(this._parseXML,this);
		if(xslFileURL!="undefined")
			this._types[this._item_type][3] = xslFileURL;
		this.XMLLoader.loadXMLString(xmlString);
	}
	/**
	*   @desc: populates Folders from XML file
	*	@param: url - xml file URL 
	*   @type:  public
	*/
	dhtmlxFolders.prototype.loadXML=function(url,xslFileURL){
		if(!this.XMLLoader)
			this.XMLLoader = new dtmlXMLLoaderObject(this._parseXML,this,true,true);
		if(xslFileURL!="undefined")
			this._types[this._item_type][3] = xslFileURL;
		//set or increament dhx_global_page number 
		if(url.indexOf("dhx_global_page")==-1)
			url+=((url.indexOf("?")!=-1)?"&":"?")+"dhx_global_page=1"
		else{
			var testAr = /dhx_global_page=([0-9]+)/.exec(url)
			url = url.replace(/dhx_global_page=[0-9]+/,"dhx_global_page="+(parseInt(testAr[1])+1))
		}
		this._xml.url = url;
		this.XMLLoader.loadXML(this._xml.url);
		
	}
	/**
	*   @desc: 
	*   @type:  private
	*/
	dhtmlxFolders.prototype._parseXML=function(obj,a,b,c,xml){
		var items=xml.doXPath("//"+obj._xml.itemTag);
		if(items.length==0)
			obj.requestServerForPage = false;
		var hide = false;
		if(obj.paging){
			hide = true;
		}
		
		if(obj._types[obj._item_type][1]=="script"){//create item with script processor
			for (var i=0; i<items.length; i++){
				var attrs=items[i].attributes;
				var item= new Object();
				for (var j=0; j<attrs.length; j++)
					item[attrs[j].name]=attrs[j].value;
	
				obj.addItemJSON(item);
			}
		}else if(obj._types[obj._item_type][1]=="xml-xsl"){//create item with XML processor
			//load xsl if still haven't been loaded 
			obj._putUserdataToCol(xml);
			if(obj.XMLLoader.xslDoc==null){
				var self = obj;
				var selfXML = xml;
				var tmpLoader = new dtmlXMLLoaderObject(function(){
					self.XMLLoader.xslDoc = this.xmlDoc;
					self._parseXML(self,null,null,null,selfXML);
				});
				tmpLoader.loadXML(obj._types[obj._item_type][3]);
				return;
			}
			for (var i=0; i<items.length; i++){
				obj.addItemXML(items[i],hide);
			}
			obj.callEvent("onXMLLoadingEnd",[]);
		}
		obj.goToPage(obj.page);
	}
	/**
	*   @desc: enables/disables paging in Folders and sets number of items per page to use
	*   @param: itemsPerPage - number of items per page, or (if 0) disable paging
	*   @param: withDynLoading - true to allow dynamical loading
	*   @type:  public
	*/
	dhtmlxFolders.prototype.enablePaging = function(itemsPerPage,withDynLoading){
		this.requestServerForPage = withDynLoading==true
		this.paging = itemsPerPage!=0;
		this.itemsPerPage = itemsPerPage;
		return this.goToPage(1);
	}
	/**
	*   @desc: opens specified page if paging enabled
	*   @param: pageNumber - 1 based index of page to open
	*   @type:  public
	*/
	dhtmlxFolders.prototype.goToPage = function(pageNumber){
		if(this._filtersAr.length>0)
			var itemsAr = this._getCurrentlyVisibleItemsArray();
		else
			var itemsAr = this._orderCol;
		this.page = pageNumber||1;
		var from = (this.page-1)*this.itemsPerPage;
		var to = this.page*this.itemsPerPage-1 
		if(itemsAr.length==0){
			this.drawFolders();
			return 0;
		}
		if(to>itemsAr.length && this.requestServerForPage){
			this.loadXML(this._xml.url)
			return 2;
		}
		if(from>=itemsAr.length){
			return this.goToPage(this.page-1);
		}	
		for(var i=0;i<itemsAr.length;i++){
				var hide = true;
				if(this.itemsPerPage==0 || (i>=from && i<=to)){
						hide = false;
				}
				itemsAr[i].data.hidden = hide;
		}
		this.drawFolders()
		return 1;
	}
	/**
	*   @desc: get currently opened page index (1 based)
	*   @type:  public
	*	@returns: numeric value - 1 based page index
	*/
	dhtmlxFolders.prototype.getCurrentPage = function(){
		return this.page;
	}
	/**
	*   @desc: gets number of pages in paging
	*	@returns: numeric value - number of pages
	*   @type:  public
	*/
	dhtmlxFolders.prototype.getNumberOfPages = function(){
		if(this._filtersAr.length>0)
			var itemsAr = this._getCurrentlyVisibleItemsArray();
		else
			var itemsAr = this._orderCol;
		return Math.ceil(itemsAr.length/this.itemsPerPage);
	}
	
	/**
	*   @desc: redraws folders content
	*   @type:  private
	*/
	dhtmlxFolders.prototype.drawFolders = function(){
		for(var i=0;i<this._orderCol.length;i++){
			var itemObj = this._orderCol[i];
			if((itemObj.data.hidden || itemObj.data.filteredOut) && itemObj.item.parentNode!=null)
				itemObj.item.parentNode.removeChild(itemObj.item);
			else if(!itemObj.data.hidden && !itemObj.data.filteredOut){
				//redraw item if type was changed (but this shouldn't happen as last chnages inside setItemType take care of it)
				if(itemObj.data.type!=this._item_type){
					itemObj.resetType();
					itemObj.render();
				}
				this.cont.appendChild(itemObj.item);
			
			}
		}
	}
	

	/**
	*	@desc: populates _userdataCol collection with values from <userdata> tags located on first level of xml file
	*	@param: 
	*   @type:  private
	*/
	dhtmlxFolders.prototype._putUserdataToCol = function(xmlObj){
		if(this._userdataCol==null)
			this._userdataCol = new Array();
		var items=xmlObj.doXPath("/node()/userdata");
		if(items!=null && items.length>0)
			for (var i=0; i<items.length; i++){
				var item = items[i];
				this._userdataCol[i] = [item.getAttribute("name"),item.firstChild.nodeValue];
			}
	}
	/**
	*	@desc: sets userdata pair - name-value (if you use global variable with same name in xsl file, then it's value will be set to the value of userdata with this name)
	*	@param: name - userdata block name
	*	@param: value - value of userdata block
	*   @type:  public
	*/
	dhtmlxFolders.prototype.setUserData = function(name,value){
		if(this._userdataCol==null)
			this._userdataCol = new Array();
		this._userdataCol[this._userdataCol.length] = [name,value];
	}
    
	/**
	*   @desc: clears Folders content
	*   @type:  public
	*/
	dhtmlxFolders.prototype.clearAll=function(){
		this.cont.innerHTML="";
		this._idpullCol={};
		this._orderCol=[];
		this._selectedCol=[];
	}
	/**
	*   @desc: delete item(s)
	*	@param: id - id (or array of ids) of item to delete
	*   @type:  public
	*/
	dhtmlxFolders.prototype.deleteItem=function(id){
		if (!id) return;
		if (typeof(id)=="object"){
			for ( var i=0; i<id.length; i++) 
				this.deleteItem(id[i]);
		}else{
			var item=this._idpullCol[id].item;
			item.parentNode.removeChild(item)


			this.matchId(function(id,ind){ this._ordDel(ind); },id);
			this.matchSelected(function(id,ind){ this._selectedCol.splice(ind,1); },id);
            this._idpullCol[id]=null;
		}
		if(this.paging)//for paging refresh content
			this.goToPage(this.page);
	}
	/**
	*   @desc: get selected item(s) id
	*   @type:  public
	*	@retuns: null if nothing selected, id of item if single item selected, array of item ids if more than one item selected.
	*/
	dhtmlxFolders.prototype.getSelectedId=function(){
		switch(this._selectedCol.length){
			case 0: return null;
			case 1: return this._selectedCol[0];
			default: return (new Array()).concat(this._selectedCol);
		}
	}
	/**
	*	@desc: set selection mode
	*	@param: mode - selection mode: 0 - disabled,1 - allowed, 2 - allowed single
	*	@type: public;
	*/
	dhtmlxFolders.prototype.enableSelection=function(mode){
		this._set.selectable = mode;
	}
	
	/**
	*   @desc: 
	*   @type:  private
	*/
	dhtmlxFolders.prototype._getLineLength=function(){
		for (var i=0; i<this._orderCol.length; i++)
			if (this._orderCol[i].item.offsetTop!=this._orderCol[0].item.offsetTop) 
				return i;
		return this._orderCol.length;
	}
	/**
	*   @desc: 
	*   @type:  private
	*/
	dhtmlxFolders.prototype._rectToSelection=function(){
		var dx=this._orderCol[0].item.offsetWidth;
		var dy=this._orderCol[0].item.offsetHeight;
		var x=this._selZone.offsetWidth;
		var y=this._selZone.offsetHeight;
		var ay=parseInt(this._selZone.style.top);
		var ax=parseInt(this._selZone.style.left);
		
		var y1=Math.ceil(ay/dy);
		var x1=Math.ceil(ax/dx);
		var y2=Math.ceil((y+ay)/dy);
		var x2=Math.ceil((x+ax)/dx);
		
		var l=this._getLineLength();
		x1=x1<l?x1:l;
		x2=x2<l?x2:l;		
		
		
		this.unselectAll();
		for (var j=y1-1; j<y2; j++)
			for (var i=x1-1; i<x2; i++){
				var ind=this._orderCol[j*l+i];
				if (ind) this.selectItem(ind.data.id,true);
			}
	}
	/**
	*   @desc: 
	*   @type:  private
	*/
	dhtmlxFolders.prototype._drawRect=function(){
			if(this._set.selectable!=1)
				return;
			var x=this._sPoint[0]-this._lPoint[0];
			var y=this._sPoint[1]-this._lPoint[1];
			this._selZone.style.left=this[x<0?'_sPoint':'_lPoint'][0]+"px";
			this._selZone.style.top=this[y<0?'_sPoint':'_lPoint'][1]+"px";

			this._selZone.style.width=Math.abs(x)+"px";
			this._selZone.style.height=Math.abs(y)+"px";
	}
	/**
	*   @desc: create and draw selection block
	*   @type:  private
	*/
	dhtmlxFolders.prototype._setBSMove=function(e){
		var id=this._trackParent(e);
		
		if (!this._selZone){
			this._sPoint=[e.clientX-this._cPos[0]+this.cont.scrollLeft,e.clientY-this._cPos[1]+this.cont.scrollTop,id];
			this._selZone=document.createElement("DIV");
			this._selZone.className="dhx_folders_block_selection";
			this.cont.appendChild(this._selZone);
		}
		this._lPoint=[e.clientX-this._cPos[0]+this.cont.scrollLeft,e.clientY-this._cPos[1]+this.cont.scrollTop,id];				
			
		this._drawRect();
	};
	
	/**
	*   @desc: open item edit mode
	*	@param: id - item id
	*   @type:  private
	*/
	dhtmlxFolders.prototype.editItem=function(id){
		this.selectItem(id);
		this.stopEdit();
		this.getItem(id).edit(true);
		this._editorId=id;
	}
	/**
	*   @desc: close item edit mode
	*	@param: saveFl - save value from editor
	*   @type:  private
	*/
	dhtmlxFolders.prototype.stopEdit=function(saveFl){
		if (this._editorId){
			var it = this.getItem(this._editorId); 
			if(saveFl)
				it.saveDataFromEditor()
			it.edit(false);
			this.callEvent("onEditEnd",[this._editorId])
		}
		this._editorId=null;
	}
	/**
	*   @desc: clear selection in Folders
	*   @type:  public
	*/
	dhtmlxFolders.prototype.unselectAll=function(){
			for (var i=0; i<this._selectedCol.length; i++)
					this.getItem(this._selectedCol[i]).setSelectedState(false);
			this._selectedCol=[];
	};
	
	
	/**
	*   @desc: select specified item in Folders
	*	@param: id - item id to select
	*	@param: ctr - state of ctrl button (true/false)
	*	@param: shf - state of shift button (true/false)
	*   @type:  private
	*/
	dhtmlxFolders.prototype.selectItem=function(id,ctr,shf){
		this.stopEdit(id);
		if(this._set.selectable==0)
			return;
		if (shf && this._set.selectable==1)
			return this.forEachId(function(id){
				this._selectItem(id);
			},this._selectedCol[this._selectedCol.length-1],id);

		if (((!ctr)&&(this._selectedCol.length)) || this._set.selectable!=1) 
			this.unselectAll();
		if (ctr && this._set.selectable==1)
			if (this.matchSelected(function(sid,sind){
					this.getItem(sid).setSelectedState(false);
					this._selectedCol.splice(sind,1);
				},id)) return true;
		this._selectItem(id);

	};
	/**
	*   @desc: 
	*   @type:  private
	*/
	dhtmlxFolders.prototype._selectItem=function(id){
		if(this._set.selectable==0)
			return;
		var itemObj = this.getItem(id);
		if (!itemObj.data.selected && itemObj.setSelectedState(true))
			this._selectedCol.push(id);
	};
	/**
	*   @desc: returns unique ID
	*   @type:  private
	*/
	dhtmlxFolders.prototype._unicId=function(id){
		if(!id)
			id="agid";//autogenerated ID
		while (this._idpullCol[id])
			id+="_"+Math.random().toString().substr(2,14);
		return id;
	}
	
	/**
	*   @desc: add item from JSON object
	*	@param: itemObj - JSON object which represents item (properties: id, src, text)
	*   @type:  private
	*/
	dhtmlxFolders.prototype.addItemJSON=function(jsonObj,hide,pos){
		var itemObj = this._createFoldersItem(jsonObj,hide);
		this.addItem(itemObj.data.id,itemObj,pos);
	}
	/**
	*   @desc: 
	*   @type:  private
	*/
	dhtmlxFolders.prototype.addItemXML = function(xmlNodeObj,hide,pos){
		var itemObj = this._createFoldersItem(xmlNodeObj,hide);
		this.addItem(itemObj.data.id,itemObj,pos);
	}
	
	/**
	*   @desc: add item to folders
	*	@param: id - new item ID
	*	@param: itemObj - dhtmlxFolders item object
	*	@para: pos - new item position (last by default or pair of mode/id, like {"next","nodeid"})
	*   @type:  private
	*/
    dhtmlxFolders.prototype.addItem=function(id,itemObj,pos){
		id=this._unicId(id);
		this._idpullCol[id] = itemObj;

		var ind=this._orderCol.length;
		if (!pos)
			return this.addItemAt(itemObj,this._orderCol.length);
		var mode=pos.mode||"next";
		var id=pos.id;
		this.matchId(function(id,ind){
			if (mode=="next") ind++;
			if (ind>this._orderCol.length)
				ind=this._orderCol.length;
			this.addItemAt(itemObj,ind); },id);

		return itemObj;
	}
	
	/**
	*   @desc: place item in specified position
	*   @param: 
	*   @type:  private
	*/
	dhtmlxFolders.prototype.addItemAt=function(itemObj,ind){
		//if(!itemObj.data.hidden)
		//	this.cont.insertBefore(itemObj.item,this._orderCol[ind]||null);
		this._ordIns(ind,itemObj)
		return itemObj;
	}


	/**
	*   @desc: 
	*   @param: dataObj - object which contains all necessary data. can be xml, json or any other expected by final item creator set in item type
	*   @type:  private
	*/
	dhtmlxFolders.prototype._createFoldersItem=function(dataObj,hide){
		//call item constructor and pass all necessary data there
        var fItem = new window[this._types[this._item_type][0]]();
			fItem.setData(dataObj,this,hide);//saves data and creates id
			this._filtersReApplyOnItem(fItem);//
		fItem.render();
		//if (this._drager){
			fItem.item.dragLanding=this;
			fItem.item.dragStarter=this;
		//}
		return fItem;
	}
	/**
	*   @desc: gets FOldes Item object 
	*   @param: 
	*   @type:  private
	*/
	dhtmlxFolders.prototype.getItem=function(id){
		return this._idpullCol[id];
	}
	
//================================ TOOLS ========================================================================

	/**   
	*   @desc: ?
	*   @type:  private
	*/
	dhtmlxFolders.prototype.matchSelected=function(func,id){
		for (var i=0; i<this._selectedCol.length; i++)
			if (this._selectedCol[i]==id){
				if (func)
					func.apply(this,[id,i]);
			   return true;
			}
		return false;
	}
	/**
	*   @desc: ?
	*   @type:  public
	*/
	dhtmlxFolders.prototype.forEachSelected=function(func){
		for (var i=0; i<this._selectedCol.length; i++)
			   return func.apply(this,[this._selectedCol[i],i]);
	}
	/**
	*   @desc: ?
	*   @type:  private
	*/
	dhtmlxFolders.prototype.matchId=function(func,a){
		this.matchObj(func,this._idpullCol[a]);
	}
	/**
	*   @desc: ?
	*   @type:  private
	*/
	dhtmlxFolders.prototype.forEachId=function(func,a,b){
		this.forEachObj(func,this._idpullCol[a],this._idpullCol[b]);
	}
	/**
	*   @desc: ?
	*   @type:  private
	*/
	dhtmlxFolders.prototype.matchObj=function(func,a){
		for (var i=0; i<this._orderCol.length; i++)
			if (this._orderCol[i]==a){
			   func.apply(this,[this._orderCol[i].data.id,i]);
			   return true;
			}
		return false;
	}
	/**
	*   @desc: ?
	*   @type:  private
	*/
	dhtmlxFolders.prototype.forEachObj=function(func,a,b){
		var check=a?false:true;
		var i=0;
		for (i; i<this._orderCol.length; i++){
				if (this._orderCol[i]==a) { a=null; break; }
				if (this._orderCol[i]==b) { b=null; break; }
		}

		for (i; i<this._orderCol.length; i++){
				func.apply(this,[this._orderCol[i].data.id,i]);
				if ((this._orderCol[i]==a)||(this._orderCol[i]==b)) return;
		}

	}
	
	dhtmlxFolders.prototype.applyValue = function(itemObj,newValue){
		//redefine this method to apply new value to apropriate parameter of itemObj.data.dataObj
	}
	
//================================ EVENTS =======================================================================
	/**
	*   @desc: get id of Folders item under event
	*   @type:  private
	*/
	dhtmlxFolders.prototype._trackParent=function(e){
		var z=(e.srcElement||e.target);
		while (z && z!=this.cont){
			if (z.itemObj && z.itemObj.data.id) 
				return z.itemObj.data.id;
			z=z.parentNode;
		}
		return null;
	}
	/**
	*   @desc: 
	*   @type:  private
	*/
	dhtmlxFolders.prototype.stopEvent=function(e){
		(e||event).cancelBubble=true;
		return false;
	}
	/**
	*   @desc: 
	*   @type:  private
	*/
	dhtmlxFolders.prototype._onKeyPressed=function(e){
		if (e.keyCode==13)
			return this.stopEdit(true);
		else if (e.keyCode==27)
			return this.stopEdit(false);
	}
	
	/**
	*   @desc: 
	*   @type:  private
	*/
	dhtmlxFolders.prototype._onmmoveHandler=function(e){
		if (this._state){
			switch(this._state){
				case "DND":				
				case "preDND":
					this._state="DND";
					//this._setDNDMove(e);
					break;
				case "BS":				
				case "preBS":
					return;//disable block selection in v.1.0
					this._state="BS";
					this._setBSMove(e);
					return;					
			}
			this._state="";
		}
		return false;
	}
	/**
	*   @desc: 
	*   @type:  private
	*/
	dhtmlxFolders.prototype._onmdownHandler=function(e){
		var id=this._trackParent(e);
		if (id && ((e.srcElement||e.target).tagName=="IMG")){
			//d-n-d alert
			if (this._drager){
			    this._idpullCol[id].item.dragStart=this;
				this._drager.preCreateDragCopy.apply(this._idpullCol[id].item,[e]);
				this._cPos=[getAbsoluteLeft(this.cont),getAbsoluteTop(this.cont)];				
			}
		} else {
			if(e.originalTarget && (e.offsetX > this.cont.clientWidth || e.originalTarget!=e.target)){//do not start selection if scroller was used
				return;
			}
			//block selection alert
			this._state="preBS";
			this._cPos=[getAbsoluteLeft(this.cont),getAbsoluteTop(this.cont)];
		}
		return false;
	}
	/**
	*   @desc: 
	*   @type:  private
	*/
	dhtmlxFolders.prototype._onmupHandler=function(e){	
		var id=this._trackParent(e);
		switch (this._state){
				case "BS":		
					if (this._orderCol.length)
						this._rectToSelection();						
					this._selZone.parentNode.removeChild(this._selZone);
					this._selZone=null;
				case "preBS":					
				case "preDND":
					this._state="";
					break;
		}
		if ((e.button==2)&&(this._ctmndx)) {
			//content menu start	
           if (!(this.callEvent("onBeforeContextMenu",[id]))) return true;
           var el=this.cont
           if (id) el=this._idpullCol[id];
           el.contextMenuId=id;
           el.contextMenu=this._ctmndx;
           el.a=this._ctmndx._contextStart;
           if (_isIE)
               e.srcElement.oncontextmenu = function(){ event.cancelBubble=true; return false; };
           el.a(el,e);
           el.a=null;
           return false; //block native menu
        }
        
        if(this._ctmndx) this._ctmndx._contextEnd();
		return true;
	}
	/**
	*   @desc: 
	*   @type:  private
	*/
	dhtmlxFolders.prototype._onclickHandler=function(e){
		var id=this._trackParent(e);
		if (!id) 
			return this.stopEdit();

	 	this.stopEdit();
		
		if ((e.ctrlKey)||(e.shiftKey)|| this.getItem(id).data.selected || (!this.matchSelected(function(id,ind){
				this.unselectAll();
				//if ((this._set.editable)&&(((new Date()).valueOf()-this._last_click_time) > 500))
				//	this.editItem(id);
		},id))){
			this.selectItem(id,e.ctrlKey,e.shiftKey);
		}
		
        this._last_click_time=(new Date()).valueOf();

		this.callEvent("onclick",[id]);
		return true;
	};
	/**
	*   @desc: 
	*   @type:  private
	*/
	dhtmlxFolders.prototype._ondblclickHandler=function(e,id){
		var id=id||this._trackParent(e);
		if (!id) return;
		this.callEvent("ondblclick",[id]);
	};
	
	//this.callEvent("onMyEvent",[0,1])
	/**
	*   @desc: 
	*   @param: 
	*   @type:  private
	*/
	dhtmlxFolders.prototype.dhx_Event=function()
	{
	   this.dhx_SeverCatcherPath="";
	
	   this.attachEvent = function(original, catcher, CallObj)
	   {
	      CallObj = CallObj||this;
	      original = 'ev_'+original;
	       if ( ( !this[original] ) || ( !this[original].addEvent ) ) {
	           var z = new this.eventCatcher(CallObj);
	           z.addEvent( this[original] );
	           this[original] = z;
	       }
	       return ( original + ':' + this[original].addEvent(catcher) );   //return ID (event name & event ID)
	   }
	   this.callEvent=function(name,arg0){
	         if (this["ev_"+name]) return this["ev_"+name].apply(this,arg0);
	       return true;
	   }
	   this.checkEvent=function(name){
	         if (this["ev_"+name]) return true;
	       return false;
	   }
	
	   this.eventCatcher = function(obj)
	   {
	       var dhx_catch = new Array();
	       var m_obj = obj;
	       var func_server = function(catcher,rpc)
	                         {
	                           catcher = catcher.split(":");
	                     var postVar="";
	                     var postVar2="";
	                           var target=catcher[1];
	                     if (catcher[1]=="rpc"){
	                           postVar='<?xml version="1.0"?><methodCall><methodName>'+catcher[2]+'</methodName><params>';
	                        postVar2="</params></methodCall>";
	                        target=rpc;
	                     }
	                           var z = function() {
	                                   }
	                           return z;
	                         }
	       var z = function()
	             {
	                   if (dhx_catch)
	                      var res=true;
	                   for (var i=0; i<dhx_catch.length; i++) {
	                      if (dhx_catch[i] != null) {
	                           var zr = dhx_catch[i].apply( m_obj, arguments );
	                           res = res && zr;
	                      }
	                   }
	                   return res;
	                }
	       z.addEvent = function(ev)
	                {
	                       if ( typeof(ev) != "function" )
	                           if (ev && ev.indexOf && ev.indexOf("server:") === 0)
	                               ev = new func_server(ev,m_obj.rpcServer);
	                           else
	                               ev = eval(ev);
	                       if (ev)
	                           return dhx_catch.push( ev ) - 1;
	                       return false;
	                }
	       z.removeEvent = function(id)
	                   {
	                     dhx_catch[id] = null;
	                   }
	       return z;
	   }
	
	   this.detachEvent = function(id)
	   {
	      if (id != false) {
	         var list = id.split(':');            //get EventName and ID
	         this[ list[0] ].removeEvent( list[1] );   //remove event
	      }
	   }
	}

	
	
//=================== ITEMS ==================================================
//basic constructor
	function dhtmlxFoldersItem(){
		var self = this;
		this.master;//folders object
		this.date;//date object
		this.item;//html representation of item
		/**
		*   @desc: 
		*   @param: 
		*   @type:  private
		*	@returns: id of folders item
		*/
		this.setData = function(dataObject,masterObj,hide){
			if(this.date==undefined){
				this.data = {dataObj:{},selected:false,editmode:false,id:null,master:{},hidden:hide,filteredOut:false,type:""};
				//set ID. if there already was an attempt to set it explicetly, then fet this value, if not - try to get it from id property or id attribute
				if(this.tmpId)
					this.data.id = this.tmpId
				else{
					if(dataObject.id)//json
						this.data.id = dataObject.id
					else if(dataObject.documentElement)//xml
						this.data.id = dataObject.documentElement.getAttribute("id");
					else//generate id
						this.data.id = masterObj._unicId();
				}
					
			}
			this.data.dataObj = dataObject;//data object
			this.data.master = masterObj;//folders object
			this.resetType();
			return this.data.id;
		}	
		this.resetType = function(){
			this.data.type = this.data.master._item_type;
			this.css = "dhx_folders_"+this.data.master._item_type.toUpperCase()+(this.data.master._item_type!=""?"_":"")+"item";//base name for css class
		}
		/**
		*   @desc: 
		*   @param: 
		*   @type:  private
		*/
		this.setId = function(id){
			if(this.data!=undefined)
				this.data.id = id;
			else
				this.tmpId = id;
		}	
			
		/**
		*   @desc: 
		*   @param: 
		*   @type:  private
		*/
		this.getDataItem = function(name){
			return dataItem;
		}
		/**
		*   @desc: 
		*   @param: 
		*   @type:  private
		*/
		this.render = function(){
			//create visual appearence for the item in current state (selected/not selected, edited/not edited etc.)
			return this;
		}
		/**
		*   @desc: 
		*   @param: 
		*   @type:  private
		*/
		this.setSelectedState = function(state){
			this.data.selected = state;
			this.render();
			return true;
		}
		/**
		*   @desc: 
		*   @param: 
		*   @type:  private
		*/
		this.edit = function(mode,newValue){
			if (this.data.editmode==mode) 
				return false;
			this.data.editmode = mode;
			if(!mode && newValue)
				this.data.master.applyValue(this,newValue)
			this.render();
		}
		
		this.initEditor = function(obj){
			this.editor = obj;
			this.editor.focus();
			this.editor.select();
			this.editor.onkeypress=this.data.master.onKeyHandler;
			this.editor.onclick=this.data.master.stopEvent;
		}
		this.saveDataFromEditor = function(attrName,value){
			
		}
	}
	
	
//json based
	function dhtmlxEItem(){
		this.getDataItem = function(name){
			return this.data.dataObj[name];
		}
		this.render = function(){
			if(this.item==null){
				this.item = document.createElement("DIV");
				this.item.foldersItemObj = this;
				this.item.foldersObj = this.data.master;
			}
			var source="<img src='"+this.data.master.imgSrc+this.data.dataObj["src"]+"' border='0' class='"+this.css+"_img'><div class='"+this.css+"_text'>";
			
			//selected
			if(this.data.selected){
				this.item.className=this.css+"_selected";
			}else{
				this.item.className=this.css;
			}
			
			//editmode
			if (this.data.editmode){
				source+="<textarea class='"+this.css+"_editor' onclick='(event||arguments[0]).cancelBubble = true'>"+this.data.dataObj["text"]+"</textarea></div>";
				this.item.innerHTML=source;
				this.initEditor(this.item.lastChild.childNodes[0]);
			}
			else
			{
				
				source+='<span onclick="if(this.parentNode.parentNode.foldersItemObj.data.selected){this.parentNode.parentNode.foldersObj.editItem(this.parentNode.parentNode.foldersItemObj.data.id)}else{void(0)}">'+this.data.dataObj["text"]+"</span></div>";
				this.item.innerHTML=source;
			}
			return this.item;
		}
		this.saveDataFromEditor = function(){
			this.data.dataObj.text = this.editor.value;
		}
	}
	dhtmlxEItem.prototype = new dhtmlxFoldersItem;
	
	
//xml-xsl based
	function dhtmlxFoldersXMLBasedGeneric(){
		this.getDataItem = function(name){
			return;
		}
		this.render = function(){
			if(this.item==null){
				this.item = document.createElement("DIV");
				this.item.itemObj = this;
				this.item.foldersObj = this.data.master;
				//this.item.dragLanding = this.data.master;
				//this.item.dragStarter = this.data.master;
			}
			
			//selected
			if(this.data.selected){
				this.item.className=this.css+"_selected";
			}else{
				this.item.className=this.css;
			}
			//set parameters based on settings used in type definition
			var typeSettingsAr = this.data.master._userdataCol;
			
			for(var n=0;n<typeSettingsAr.length;n++){
				this.data.master.XMLLoader.setXSLParamValue(typeSettingsAr[n][0],typeSettingsAr[n][1]);
			}
			this.data.master.XMLLoader.setXSLParamValue("editmode",!this.data.master._set.editable?"false":this.data.editmode.toString());
			this.data.master.XMLLoader.setXSLParamValue("selected",this.data.selected.toString());
			//create html
			this.item.innerHTML = this.data.master.XMLLoader.doXSLTransToString(undefined,this.data.dataObj);
			//this.item._created=true;
			return this.item;
		}
		
	}
	dhtmlxFoldersXMLBasedGeneric.prototype = new dhtmlxFoldersItem;
	
	
	


	