function doOnLoad() {
	//Create preview grid
	gridPreview = new dhtmlXGridObject('gridbox');
	gridPreview.setImagePath("codebase/imgs/");
	gridPreview.setHeader("Column 1");
	gridPreview.setInitWidths("100");
	gridPreview.setColTypes("ed");
	gridPreview.setColSorting("str");

	gridPreview.init();
		
/*	for (var i=0;i<5;i++)
		gridPreview.addRow(Date.parse(new Date())+i,"1000000",i);
*/
//	mygrid.enableSmartRendering("dynload.php",2000);		
	gridPreview.attachEvent("onHeaderClick",function(ind){getColumnSettings(0,ind);return true;})
	gridPreview.attachEvent("onRowSelect",getColumnSettings);
//	gridPreview.loadXML("grid.xml");
	//---------------------------
	
	//Create options tabbar
	optionsTB=new dhtmlXTabBar("optionsbox","top");
    optionsTB.setImagePath("../../../dhtmlxTabbar/codebase/imgs/");
	optionsTB.setStyle("silver");
    optionsTB.setOffset(3);
    optionsTB.addTab("global","Grid settings","100px");
    optionsTB.addTab("column","Column settings","100px");
    optionsTB.addTab("style","Grid style","100px");
    optionsTB.setContent("global","global_sets");
    optionsTB.setContent("column","column_sets");
    optionsTB.setContent("style","grid_style");
    optionsTB.setTabActive("global");
    optionsTB.disableTab("column");
    /*
    optionsTB.setOnSelectHandler(doOnSelectTabHandler);
    function doOnSelectTabHandler (ide) {
      	if (ide=="column")   		
		  	optionsTB.enableTab("column");
	}
    */

	//Create output tabbar
	outputTB=new dhtmlXTabBar("outputbox","bottom");
    outputTB.setImagePath("../../../dhtmlxTabbar/codebase/imgs/");
   	outputTB.setStyle("silver");
   	(_isIE?outputTB.setOffset(3):outputTB.setOffset(0));   	
    outputTB.addTab("html","HTML","50px");
    outputTB.addTab("xml","XML","50px");
//    outputTB.setContent("html","output_code");        
//    outputTB.setContent("xml","output_code");        
    outputTB.setTabActive("html");
    outputTB.setOnSelectHandler(changeType);
    
    XMLTabState();
  

    function changeType() {
	  	return true;
	}
	//---------------------
	dhxCP = dhtmlXColorPickerInput('col_bgcolor');
	dhxCP.setImagePath("../../../dhtmlxColorPicker/codebase/img/");
	dhxCP.init();
	dhxCP.setOnSelectHandler(function(c) {document.getElementById("col_bgcolor").value = c;saveDump(document.getElementById("col_bgcolor"),'col_bgcolor_label',2);})

	conf= new dhtmlxgrid_config(gridPreview);
	conf.setSettings("script","1","px","light",false,false);
	conf.generate();
	
	getStyles ();
	}
			
	function generateInitCode() {
	  	var initCodeType = document.getElementById("conf_type").value
	  	var columnCount = parseInt(document.getElementById("col_count").value);
//	  	var newWidth = parseInt(document.getElementById("grid_col_width").value);
	  	var newWidthType = document.getElementById("grid_width_type").value
		var initEditable = document.getElementById("col_editable").checked;
		var initSkin = document.getElementById("grid_skin").value;
		var initSRND = document.getElementById("grid_srnd").checked;
		var gridDateFormat = document.getElementById("grid_date_format").value;

	  	var colWidthType = document.getElementById("col_width_type")
			colWidthType.value = newWidthType;
		
		XMLTabState(initCodeType);
	  	conf.setSettings(initCodeType,columnCount,newWidthType,initSkin,initSRND,initEditable,gridDateFormat);
	  	conf.generate();
	  	
	  	clearAllDumps();
	  	
	  	if (g_ind>=gridPreview.hdr.rows[1].cells.length) 
  		    optionsTB.disableTab("column")
  		else
		  	for (var i=0;i<gridPreview.hdr.rows[1].cells.length;i++)
		  		if (i==g_ind)
				  	gridPreview.hdr.rows[1].cells[i].firstChild.style.color="blue";
				else
					gridPreview.hdr.rows[1].cells[i].firstChild.style.color="";
	  	
	  	
	  	return true;
	}
	
	function changeColumnSettings(colInd) {
	  	var colWidth = document.getElementById("col_width").value;
	  	var colWidthType = document.getElementById("col_width_type").value;
		var colType = document.getElementById("col_type").value;
	  	var colLabel = document.getElementById("col_label").value;
	  	var colResize = document.getElementById("col_resize").checked
	  	var colBgcolor = document.getElementById("col_bgcolor").value
	  	var colSort = document.getElementById("col_sort").value;	
	  	var colAlign = document.getElementById("col_align").value
	  	var colFormat = document.getElementById("col_format").value;		  	
		clearAllDumps();
		conf.setColumnSettings(colInd,colWidth,colType,colLabel,colResize,colBgcolor,colSort,colAlign,colFormat);
		
	  	for (var i=0;i<gridPreview.hdr.rows[1].cells.length;i++)
	  		if (i==colInd)
			  	gridPreview.hdr.rows[1].cells[i].firstChild.style.color="blue";
			else
				gridPreview.hdr.rows[1].cells[i].firstChild.style.color="";		
	}
	
	var g_ind = 0;;
	/*
		Event fired when column has been selected
	*/
	function getColumnSettings(a,ind) {
	  
	/********************************************/
	/*				Column settings				*/
	/********************************************/
		var columnSets = document.getElementById("column_sets");
  	  	var colWidth 	= document.getElementById("col_width")
		var colType 	= document.getElementById("col_type");
	  	var colResize 	= document.getElementById("col_resize")
	  	var colBgcolor 	= document.getElementById("col_bgcolor")  	
	  	var colApply 	= document.getElementById("col_apply");
	  	var colLabel 	= document.getElementById("col_label");
	  	var colSort 	= document.getElementById("col_sort");
	  	var colAlign 	= document.getElementById("col_align");
	  	var colFormat 	= document.getElementById("col_format");	  	
	  	var gridColors 	= gridPreview.columnColor.toString().split(",");
	  	
		g_ind = ind; //global
  	  	col_apply.onclick = colSort.onfocus = colLabel.onfocus = colWidth.onfocus = colType.onfocus = colResize.onfocus = colBgcolor.onfocus = colAlign.onfocus = colFormat.onfocus = colApply.onfocus = function(){changeColumnSettings(ind)};
	  		  	
//	  	colApply.onclick = function(){changeColumnSettings(ind)};
	  	colLabel.value		= gridPreview.getColumnLabel(ind);
	  	colWidth.value		= conf.columns[ind][0];//gridPreview.getColWidth(ind);
	  	colType.value		= gridPreview.getColType(ind);
//	  	colBgcolor.style.background=gridColors[ind];
	  	colBgcolor.value	= gridColors[ind];
	  	colSort.value 		= gridPreview.fldSort[ind]
	  	colResize.checked 	= gridPreview._drsclmn[ind]
	  	colAlign.value 		= gridPreview.cellAlign[ind];
		colFormat.value 	= conf.columns[ind][7];
	  	for (var i=0;i<gridPreview.hdr.rows[1].cells.length;i++)
	  		if (i==ind)
			  	gridPreview.hdr.rows[1].cells[i].firstChild.style.color="blue";
			else
				gridPreview.hdr.rows[1].cells[i].firstChild.style.color="";
//	  	colBgcolor.value=gridPreview.getColumnColor(ind);
		clearAllDumps();
		optionsTB.enableTab("column");
		
	}
	
	function getStyles () {

		var styleType 		= document.getElementById("style_type");
		var styleValue 		= document.getElementById("style_value");
		var styleApply		= document.getElementById("style_apply");
		styleApply.onclick 	= setStyles;
		styleType.onfocus 	= setStyles;
		styleValue.value 	= conf.customStyles[styleType.value];
		
	}
	
	function setStyles () {

		var styleType = document.getElementById("style_type");
		var styleValue = document.getElementById("style_value");
		
		conf.setStyle(styleType.value,styleValue.value);
		
	 	var extStyle = document.getElementById("extStyle");  	
		var extSheet=(extStyle.sheet||extStyle.styleSheet);
		var rulesCount = extSheet.cssRules ? extSheet.cssRules.length : extSheet.rules.length
		if (_isIE) {
			while (extSheet.rules.length>0)
				extSheet.removeRule(0);
			if (conf.customStyles['header']) extSheet.addRule("div.gridbox_"+conf.skin+" table.hdr td", conf.customStyles['header']);
			if (conf.customStyles['cell'])extSheet.addRule("div.gridbox_"+conf.skin+" table.obj td", conf.customStyles['cell']);
			if (conf.customStyles['selcell']) {
				extSheet.addRule("div.gridbox_"+conf.skin+" table.obj td.cellselected", conf.customStyles['selcell']);
				extSheet.addRule("div.gridbox_"+conf.skin+" table.obj tr.rowselected td.cellselected", conf.customStyles['selcell']);
			}
			if (conf.customStyles['selrow'])extSheet.addRule("div.gridbox_"+conf.skin+" table.obj tr.rowselected td ", conf.customStyles['selrow']);									
		} else {
			while (extSheet.cssRules.length>0)
				extSheet.deleteRule(0);
			if (conf.customStyles['header'])extSheet.insertRule("div.gridbox_"+conf.skin+" table.hdr td {"+ conf.customStyles['header'] + ";}", 0);
			if (conf.customStyles['cell']) extSheet.insertRule("div.gridbox_"+conf.skin+" table.obj td {"+ conf.customStyles['cell'] + ";}", 0);
			if (conf.customStyles['selcell']) {
			  	extSheet.insertRule("div.gridbox_"+conf.skin+" table.obj td.cellselected {"+ conf.customStyles['selcell'] + ";}", 0);
			  	extSheet.insertRule("div.gridbox_"+conf.skin+" table.obj tr.rowselected td.cellselected {"+ conf.customStyles['selcell'] + ";}", 0);			  	
			}
			if (conf.customStyles['selrow'])extSheet.insertRule("div.gridbox_"+conf.skin+" table.obj tr.rowselected td {"+ conf.customStyles['selrow'] + ";}", 0);
		}
				
		gridPreview.setSizes();
	  	clearAllDumps();	
	  	
	  	conf.generate();
	  	
		  	for (var i=0;i<gridPreview.hdr.rows[1].cells.length;i++)
		  		if (i==g_ind)
				  	gridPreview.hdr.rows[1].cells[i].firstChild.style.color="blue";
				else
					gridPreview.hdr.rows[1].cells[i].firstChild.style.color="";	  	
//	  	conf.genInitCode();
//	  	conf.outputHTMLCode();
	}
		
	function XMLTabState(mode) {
	  	var colWidthType = document.getElementById("col_width_type")
	  	if (mode=="xml") {
	  		outputTB.enableTab("xml");
	  	} else {
	  		outputTB.disableTab("xml");
	  		outputTB.setTabActive("html");
	  	}
	}
	
	function clearAllDumps() {

	  	var dumpElements = document.getElementsByTagName("span");
	  	for (var i in dumpElements)
	  		if (dumpElements[i].dump_el||dumpElements[i].dump_el===null)
		  		clearDump(dumpElements[i]);
	}
	
	function clearDump (label_el) {

	  	label_el.style.fontWeight = "normal";
	  	label_el.onclick = null;
	  	label_el.dump_el.dump = null;
	}
	
	function loadDump (label_el) {
	  	if (label_el.dump_el.dump!=null)
		  	if (label_el.dump_el.type=="checkbox") {
		  		label_el.dump_el.checked = label_el.dump_el.dump;
		  	} else {
			    label_el.dump_el.value = label_el.dump_el.dump;
			}
		clearDump(label_el);
	}
	
	function saveDump (dump_el,label_el_id,dump_mode) {
	  	var label_el = document.getElementById(label_el_id);
		if ((dump_el.dump!=null)&&(dump_mode!=2)) return;
	  	//immediately save dump
	  	if (dump_mode==0) {
	  	  	if (!dump_el.dump) {
				if (dump_el.type=="checkbox")
					dump_el.dump=dump_el.checked;
				else
					dump_el.dump=dump_el.value;
				label_el.dump_el = dump_el;
				label_el.onclick = function() {loadDump(label_el);}
				label_el.style.fontWeight = "bold";
			}
		//Save pre dump
		}else if (dump_mode==1) {			
			if (dump_el.type=="checkbox")
				dump_el.pre_dump=dump_el.checked;
			else
				dump_el.pre_dump=dump_el.value;
		}
		//Compare value with pre dump and save if it's have difference
		else if (dump_mode==2) {
			  	if ((dump_el.pre_dump!==dump_el.checked&&dump_el.type=="checkbox")||(dump_el.pre_dump!==dump_el.value)) {
				  	dump_el.dump=dump_el.pre_dump
					label_el.dump_el = dump_el;
					label_el.onclick = function() {loadDump(label_el);}
					label_el.style.fontWeight = "bold";
				}
				else {
					loadDump(label_el);
				}
		}
		else if (dump_mode==3) 
			loadDump(label_el);
			
/*	  	if (!targetEl.dump&&targetEl.dump!="") {
		  		targetEl.dump = value;
	  		targetEl.dump_type = type;
	  		targetEl.style.fontWeight = "bold";
	  	}
*/	
	}
	
//get Source 
function getSource() {
  	var form = document.getElementById("source_form");
  	var html = document.getElementById("html_content");
  	var xml = document.getElementById("xml_content");
  	html.value = conf.htmlCode;
  	xml.value = conf.xmlCode;
	form.submit(); 	
}