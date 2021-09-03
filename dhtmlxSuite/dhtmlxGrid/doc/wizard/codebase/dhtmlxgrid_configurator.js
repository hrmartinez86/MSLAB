function dhtmlxgrid_config() {
  	this.XMLConfigPath = "codebase/dhxgrid_wiz_conf.xml";
	this.xmlConfigLoader = new dtmlXMLLoaderObject(this.doOnXMLConfigLoaded,window);//async mode
	this.xmlConfigLoader.loadXML(this.XMLConfigPath);  	
	this.configRoot;
	this.defGridName = "mygrid";
	this.dateFormat = "";
	this.defColWidth = "*";
  	this.defColType = "ro"
  	this.defColLabel = "Column";
  	this.defColValue = "0"
  	this.defColEnableResize = true;
  	this.defColAlign = "left";
  	this.defColFormat = "";
  	this.htmlCode= "";
  	this.xmlCode= "";
	this.columns = new Array();
	
	this.defScripts = '&lt;script src="codebase/dhtmlxcommon.js" type="text/javascript">&lt;/script><br>';
	this.defScripts+= '&lt;script src="codebase/dhtmlxgrid.js" type="text/javascript">&lt;/script><br>';	
	this.defScripts+= '&lt;script src="codebase/dhtmlxgridcell.js" type="text/javascript">&lt;/script><br>';
	this.extScripts = '';
	this.defCSS = '&lt;link rel="STYLESHEET" type="text/css" href="codebase/dhtmlxgrid.css"><br>';
	this.extCSS = '';
	
	this.customStyles = {'header':'','cell':'','selcell':'','selrow':''};
	
	this.widthTypeWasChanged = false;	
		
	_self = this;
}

dhtmlxgrid_config.prototype.setStyle = function(style,value) {
		value = value.replace(/^\s+/, '').replace(/\s+$/, '');
/*
	  	if (value===""||value=="px") return;

		if (style == "border") {
			this.customStyles["border-right"]	= value.toString();
			this.customStyles["border-top"]		= value.toString();
			this.customStyles["border-bottom"]	= value.toString();
			this.customStyles["border-left"]	= value.toString();
		} else
			conf.customStyles[style] = value;
*/
		conf.customStyles[style] = value;
}

dhtmlxgrid_config.prototype.setSettings = function(pInitCodeType,pColNum/*,pColWidth*/,pWidthType,pSkin,pIsSRND,pIsEditable,pDateFormat) {
  	if (this.widthType != pWidthType) 
		this.widthTypeWasChanged = true;	
  	this.confType 	= pInitCodeType;
  //	this.colWidth	= pColWidth;
  	this.widthType	= pWidthType || 'px';
  	this.isSRND		= pIsSRND || false;
  	this.colNum		= pColNum || 1;
  	this.isEditable	= pIsEditable || false;
  	this.skin		= pSkin;
  	this.dateFormat = pDateFormat || null;
}

dhtmlxgrid_config.prototype.setColumnSettings = function(pColInd,pColWidth,pColType,pColLabel,pColResize,pColBgcolor,pColSort,pColAlign,pColFormat) {
	this.columns[pColInd][0]=pColWidth;
	this.columns[pColInd][1]=pColLabel;
	this.columns[pColInd][2]=pColType;
	this.columns[pColInd][3]=pColBgcolor||'';
	this.columns[pColInd][4]=pColSort;
	this.columns[pColInd][5]=pColResize;
	this.columns[pColInd][6]=pColAlign;	
	this.columns[pColInd][7]=pColFormat;
	this.genInitCode();
	this.reinitGrid();
	this.outputHTMLCode();
}

/*
	Generate inner array of columns and them attributes
*/
dhtmlxgrid_config.prototype.genStructure = function() {
	this.columns.splice(this.colNum,this.columns.length-this.colNum);
	//Change column width for every column if width type was changed form PX to PC or form PC to PX
	if (this.widthTypeWasChanged === true) {
	  	for (var i=0;i<this.columns.length;i++)
	  		this.columns[i][0]=this.defColWidth;
	  	this.widthTypeWasChanged = false;
	}	
	//Add new columns with global and default parameters of grid
	for (var i=this.columns.length;i<this.colNum;i++) {
	  	this.columns.push([this.defColWidth,this.defColLabel+" "+(i+1),this.defColType,'','na',this.defColEnableResize,this.defColAlign,this.defColFormat]);
	}

}

/*
	Generate HTML code for grid initialization
*/
dhtmlxgrid_config.prototype.genInitCode = function() {
	this.initWidths= this.initLabels= this.initColTypes= this.initValues= this.initColors= this.initXMLCol= this.initColSort= this.initColResize = this.initColAlign = this.initColFormat = "";		
	this.extScripts= this.extCSS= "";
	if (this.configRoot!=null) {
		var editors = this.configRoot.getElementsByTagName("editor");
		var skins = this.configRoot.getElementsByTagName("skin");
		var extFunc = this.configRoot.getElementsByTagName("ext");
	}
	
  	for (var i=0;i<this.colNum;i++) {
  	  	//Add js/css files if it needed for excells
  	  	if (editors&&(this.columns[i][2]=='dhxCalendar'||this.columns[i][2]=='dhxCalendarA')) {
			for (var j=0;j<editors.length;j++)
				if (editors[j].getAttribute("code")=='calendar') {
					this.addExtScript(editors[j].getAttribute("file"))
					if (editors[j].getAttribute("extfile"))
						this.addExtScript(editors[j].getAttribute("extfile"))
					if (editors[j].getAttribute("css"))
						this.addExtCSS(editors[j].getAttribute("css"))
				}
		}
		//Add css files if it needed for skins
  	  	if (skins) {
			for (var j=0;j<skins.length;j++)
				if (skins[j].getAttribute("name")==this.skin) {
					if (skins[j].getAttribute("file"))
						this.addExtCSS(skins[j].getAttribute("file"))
				}
		}
		//Add js file for smart rendering
  	  	if (extFunc&&(this.isSRND)) {
			for (var j=0;j<extFunc.length;j++)
				if (extFunc[j].getAttribute("id")=='srnd') {
					this.addExtScript(extFunc[j].getAttribute("file"))
				}
		}	
			
  		this.initWidths		+= this.columns[i][0]+",";
  		this.initLabels		+= this.columns[i][1]+",";
  		this.initColTypes	+= this.columns[i][2]+",";
  		this.initColors		+= this.columns[i][3]+",";
  		this.initColSort	+= this.columns[i][4]+",";
  		this.initColResize	+= this.columns[i][5]+",";
  		this.initColAlign	+= this.columns[i][6]+",";
  		this.initStyles = "";
		    		
  		if (this.columns[i][7]!="")
	  		this.initColFormat 	+= this.defGridName + '.setNumberFormat("' + this.columns[i][7] + '",' + i +');<br>';
		this.initValues+= this.defColValue+",";
		this.initXMLCol+='&lt;column width="'+this.columns[i][0]+'" type="'+this.columns[i][2]+'" color="'+this.columns[i][3]+'" sort="'+this.columns[i][4]+'" align="'+this.columns[i][6]+'">'+this.columns[i][1]+'&lt;/column><br>'
	}

  		/* 
		for (style in this.customStyles)
			this.initStyles += style + ":" + this.customStyles[style] + "; ";
  		*/
		for (style in this.customStyles)
			this.initStyles += '"'+this.customStyles[style] + '",';	
			
		this.initWidths		= this.initWidths.substr(0,this.initWidths.length-1);
		this.initLabels		= this.initLabels.substr(0,this.initLabels.length-1);
		this.initColTypes 	= this.initColTypes.substr(0,this.initColTypes.length-1);
		this.initValues		= this.initValues.substr(0,this.initValues.length-1);
		this.initColors 	= this.initColors.substr(0,this.initColors.length-1);
  		this.initColSort	= this.initColSort.substr(0,this.initColSort.length-1);
  		this.initColResize	= this.initColResize.substr(0,this.initColResize.length-1);
  		this.initColAlign  	= this.initColAlign.substr(0,this.initColAlign.length-1);
		this.initColFormat  = this.initColFormat.substr(0,this.initColFormat.length-1);
		this.initStyles		= this.initStyles.substr(0,this.initStyles.length-1);


		var htmlCode = xmlCode = "";
		htmlCode+= '&lt;head><br>';
		htmlCode+= this.defScripts;
		htmlCode+= this.extScripts;
//		if (this.isSRND)
//			htmlCode+= '&lt;script src="codebase/ext/dhtmlxgrid_srnd.js" type="text/javascript">&lt;/script><br>';
		htmlCode+= this.defCSS;
		htmlCode+= this.extCSS;
		htmlCode+= '&lt;/head><br>';
		htmlCode+= '<br>';
		htmlCode+= '&lt;body><br>';
		htmlCode+= '&lt;div id="gridbox" style="height:300px;width:600px;">&lt;/div><br>';
		htmlCode+='&lt;script><br>';
		htmlCode+= this.defGridName + ' = new dhtmlXGridObject(\"gridbox\");<br>';
		htmlCode+= this.defGridName + '.setImagePath("codebase/imgs/");<br>';
		htmlCode+= this.defGridName + '.setEditable('+this.isEditable+');<br>';
		htmlCode+= this.defGridName + '.setSkin("'+this.skin+'");<br>';
		htmlCode+= this.initColFormat;

		if (this.initStyles!=""&&(/[^\",]/gi.test(this.initStyles))) /*"*/
			htmlCode+= this.defGridName + '.setStyle('+this.initStyles+');<br>';
		if (this.dateFormat!=""&&this.dateFormat!=null)
			htmlCode+= this.defGridName + '.setDateFormat("'+this.dateFormat+'");<br>';
		if (this.confType=='script') {
		  	htmlCode+= this.defGridName + '.setHeader("'+this.initLabels+'");<br>';
			if (this.widthType=='px')
				htmlCode+= this.defGridName + '.setInitWidths("'+this.initWidths+'");<br>';
			else
				htmlCode+=this.defGridName + '.setInitWidthsP("'+this.initWidths+'");<br>';
			if (this.initColors.length!=(this.columns.length-1))
				htmlCode+=this.defGridName + '.setColumnColor("'+this.initColors+'");<br>';
			htmlCode+= this.defGridName + '.setColTypes("'+this.initColTypes+'");<br>';
			htmlCode+= this.defGridName + '.setColAlign("'+this.initColAlign+'");<br>';				
			htmlCode+= this.defGridName + '.setColSorting("'+this.initColSort+'");<br>';				
			htmlCode+= this.defGridName + '.enableResizing("'+this.initColResize+'");<br>'; 
			htmlCode+= this.defGridName + '.init();<br>';
			if (this.isSRND)
				htmlCode+= this.defGridName + '.enableSmartRendering(true);<br>';		
		} else {
			htmlCode+= this.defGridName + '.loadXML(\"grid.xml\");<br>';
			
			xmlCode+='&lt;?xml version="1.0" encoding="UTF-8"?><br>';
			xmlCode+='&lt;rows><br>';
			xmlCode+='&lt;head><br>';
			xmlCode+= this.initXMLCol;
	        xmlCode+='&lt;settings><br>';	
	        xmlCode+='&lt;colwidth>'+this.widthType+'&lt;/colwidth><br>';	
	        xmlCode+='&lt;/settings><br>';
	        xmlCode+='&lt;/head><br>';
	        xmlCode+='&lt;/rows><br>';        
		}
		htmlCode+='&lt;/script><br>';
		htmlCode+= '&lt;/body><br>';
		
		this.htmlCode= htmlCode;
		this.xmlCode= xmlCode;
}

/*
	Grid reinitialization
*/
dhtmlxgrid_config.prototype.reinitGrid = function() {
	gridPreview.clearAll(true);
	gridPreview.setHeader(this.initLabels);
	if (this.widthType=='px')
		gridPreview.setInitWidths(this.initWidths)
	else
		gridPreview.setInitWidthsP(this.initWidths)
	gridPreview.setColumnColor(this.initColors);
	gridPreview.setEditable(this.isEditable);
	gridPreview.setColTypes(this.initColTypes);
	gridPreview.setColSorting(this.initColSort)
	gridPreview.setColAlign(this.initColAlign)
//	gridPreview.setNumberFormat("0,000.00",0);
	for (var i=0;i<this.colNum;i++)
		if (this.columns[i][7]!="") 
	  		gridPreview.setNumberFormat(this.columns[i][7],i);

	if (this.dateFormat!=""&&this.dateFormat!=null)
		gridPreview.setDateFormat(this.dateFormat);
	gridPreview.enableResizing(this.initColResize);
	gridPreview.enableResizing(this.initColResize);	
	gridPreview.setSkin(this.skin);
	gridPreview.init();
		
	for (var i=0;i<5;i++)
		gridPreview.addRow(Date.parse(new Date())+i,this.initValues,0);
}

dhtmlxgrid_config.prototype.outputHTMLCode = function() {
	outputTB.setContentHTML("html", '<div class="code">'+this.htmlCode+'</div>');
	outputTB.setContentHTML("xml",'<div class="code">'+this.xmlCode+'</div>');
}

dhtmlxgrid_config.prototype.generate = function() {
  	this.genStructure();
	this.genInitCode();
	this.reinitGrid();
	this.outputHTMLCode();
}

dhtmlxgrid_config.prototype.addExtScript = function(href) {
  	if (this.extScripts.indexOf(href)==-1)  
		this.extScripts+='&lt;script src="'+href+'" type="text/javascript">&lt;/script><br>';
}

dhtmlxgrid_config.prototype.addExtCSS = function(href) {
  	if (this.defCSS.indexOf(href)==-1)
		this.extCSS+='&lt;link rel="STYLESHEET" type="text/css" href="'+href+'"><br>';
}

dhtmlxgrid_config.prototype.doOnXMLConfigLoaded = function() {
	_self.configRoot = _self.xmlConfigLoader.getXMLTopNode("settings");
	_self.waitForXMLLoading();
}

dhtmlxgrid_config.prototype.waitForXMLLoading = function(cnt) {
	if (cnt>=20)
		return;
   	if (_self.configRoot==null)
   		setTimeout(function(){_self.waitForXMLLoading(cnt+1)},1000);
   	else
   		this.parseXMLConfig();
}

dhtmlxgrid_config.prototype.parseXMLConfig = function() {

}
