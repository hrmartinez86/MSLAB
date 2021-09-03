/*
 *
 * Copyright (c) 2004-2005 by Zapatec, Inc.
 * http://www.zapatec.com
 * 1700 MLK Way, Berkeley, California,
 * 94709, U.S.A.
 * All rights reserved.
 *
 *
 */


Zapatec.Utils.createNestedHash(Zapatec,['Langs','Zapatec.Grid','eng'],{'errorSource':"The grid's data source, %1, does not contain valid data.\n%2",'errorSelectRow':'Please select at least one row.','errorSelectCell':'Please select at least one cell.','errorHtmlTable':"Zapatec.Grid invalid configuration: Can't find source table",'errorHtmlHeader':"Zapatec.Grid invalid configuration: Can't find header for table",'errorContainer':'Cannot find container for grid','errorInvalidInput':'Invalid input!','labelPage':'Page','labelOf':'of','labelRows':'rows','labelSelectAll':'Select All','labelClear':'Clear'});Zapatec.Utils.emulateWindowEvent(['mousedown','mouseup','click','dblclick']);Zapatec.Grid=function(oArg){Zapatec.Grid.SUPERconstructor.call(this,oArg);};Zapatec.Grid.id='Zapatec.Grid';Zapatec.inherit(Zapatec.Grid,Zapatec.Widget);Zapatec.Grid.prototype.init=function(oArg){this.initialized=false;Zapatec.Grid.SUPERclass.init.call(this,oArg);var oConfig=this.config;this.data={};this.fields=[];this.rows=[];this.rowsIndex=[];this.filteredRows=[];this.currentPage=0;this.autoresizeFrame={direction:0,currentRow:0,visibleRows:oConfig.rowsPerPage};this.currentVerticalOffset=0;this.currentHorizontalOffset=0;this.order=[];if(typeof oConfig.sortColumn!='object'){this.order.push({col:oConfig.sortColumn*1,desc:oConfig.sortDesc,lt:oConfig.sortDesc?1:-1,gt:oConfig.sortDesc?-1:1});}
this.lastSelection=null;this.loadData();};Zapatec.Grid.prototype.reconfigure=function(oArg){Zapatec.Grid.SUPERclass.reconfigure.call(this,oArg);this.refresh();};Zapatec.Grid.prototype.configure=function(oArg){this.defineConfigOption('show_asis',false);this.defineConfigOption('funcStyle');this.defineConfigOption('convert');this.defineConfigOption('container');this.defineConfigOption('headerContainer');this.defineConfigOption('totalsContainer');this.defineConfigOption('visibleRows',0);this.defineConfigOption('visibleColumns',0);this.defineConfigOption('rowsPerPage',0);this.defineConfigOption('paginationContainer');this.defineConfigOption('border');this.defineConfigOption('fitIntoParent');this.defineConfigOption('horizontal',false);this.defineConfigOption('selectRows',true);this.defineConfigOption('selectCells',true);this.defineConfigOption('activeRows',true);this.defineConfigOption('activeCells',true);this.defineConfigOption('multipleSelect',true);this.defineConfigOption('callbackHeaderDisplay');this.defineConfigOption('callbackDataDisplay');this.defineConfigOption('callbackRowDisplay');this.defineConfigOption('callbackTotalsDisplay');this.defineConfigOption('callbackTotalDisplay');this.defineConfigOption('callbackPaginationDisplay');this.defineConfigOption('callbackRowOnClick');this.defineConfigOption('callbackRowOnRightClick');this.defineConfigOption('callbackCellOnClick');this.defineConfigOption('callbackCellOnRightClick');this.defineConfigOption('callbackRowOnDblClick');this.defineConfigOption('callbackCellOnDblClick');this.defineConfigOption('callbackRowSelect');this.defineConfigOption('callbackCellSelect');this.defineConfigOption('callbackRowUnselect');this.defineConfigOption('callbackCellUnselect');this.defineConfigOption('callbackOnRefresh');this.defineConfigOption('sortColumn');this.defineConfigOption('sortDesc');this.defineConfigOption('filterOut',[]);this.defineConfigOption('totals',[]);this.defineConfigOption('dataPrepared',false);this.defineConfigOption('dataOnDemand',false);this.defineConfigOption('fixedLeft',0);this.defineConfigOption('columnWidth','auto');this.defineConfigOption('rowHeight','auto');this.defineConfigOption('mouseSelect',true);this.defineConfigOption('dragAndDropCells',false);this.defineConfigOption('dragAndDropColumns',false);this.defineConfigOption('langId','Zapatec.Grid');this.defineConfigOption('lang','eng');Zapatec.Grid.SUPERclass.configure.call(this,oArg);var fGetElById=Zapatec.Widget.getElementById;var fCorrectCssLength=Zapatec.Utils.correctCssLength;var oConfig=this.config;oConfig.rowsPerPage=parseInt(oConfig.rowsPerPage);if(isNaN(oConfig.rowsPerPage)){oConfig.rowsPerPage=0;}
oConfig.visibleRows=parseInt(oConfig.visibleRows);if(isNaN(oConfig.visibleRows)){oConfig.visibleRows=0;}
oConfig.visibleColumns=parseInt(oConfig.visibleColumns);if(isNaN(oConfig.visibleColumns)){oConfig.visibleColumns=0;}
if(!oConfig.rowsPerPage){oConfig.dataOnDemand=false;}
this.visualize=true;if(typeof oConfig.callbackHeaderDisplay=='function'&&(typeof oConfig.callbackRowDisplay=='function'||typeof oConfig.callbackDataDisplay=='function')){this.visualize=false;oConfig.theme='';}
this.container=fGetElById(oConfig.container);this.headerContainer=fGetElById(oConfig.headerContainer);this.totalsContainer=fGetElById(oConfig.totalsContainer);this.paginationContainers=[];var vPagCont=oConfig.paginationContainer;if(typeof vPagCont!='undefined'){if(vPagCont instanceof Array){var aPagCont=this.paginationContainers;var iEls=vPagCont.length;var iEl,oEl;for(iEl=0;iEls--;iEl++){oEl=fGetElById(vPagCont[iEl]);if(oEl){aPagCont.push(oEl);}}}else{var oEl=fGetElById(vPagCont);if(oEl){this.paginationContainers.push(oEl);}}}
this.border=fGetElById(oConfig.border);if(!this.border&&this.container){this.border=this.container.parentNode;}
this.fitInto=null;if(this.border){if(typeof oConfig.fitIntoParent=='boolean'){if(oConfig.fitIntoParent){this.fitInto=this.border.parentNode;}}else{this.fitInto=fGetElById(oConfig.fitIntoParent);}}
if(this.fitInto&&typeof this.autoresize=='function'){this.addEventListener('gridRefreshed',this.autoresize);this.addEventListener('gridResizedColumn',this.autoresize);}
oConfig.columnWidth=fCorrectCssLength(oConfig.columnWidth);if(oConfig.columnWidth=='auto'&&(this.headerContainer||this.totalsContainer)){oConfig.columnWidth='100px';}
oConfig.rowHeight=fCorrectCssLength(oConfig.rowHeight);if(oConfig.mouseSelect&&this.mouseSelect){this.addEventListener('gridCellMousedown',this.mouseSelect);}
if(oConfig.dragAndDropCells&&this.dragCell){this.addEventListener('gridCellMousedown',this.dragCell);}
if(oConfig.dragAndDropColumns&&this.dragColumn){this.addEventListener('gridFieldMousedown',this.dragColumn);}
if(typeof oConfig.callbackCellOnRightClick=='function'||typeof oConfig.callbackRowOnRightClick=='function'){window.document.oncontextmenu=function(){return false};this.addEventListener('gridCellMouseup',Zapatec.Grid.onCellMouseup);}
this.filterOutRules=oConfig.filterOut;if(!(this.filterOutRules instanceof Array)){this.filterOutRules=[];}
this.totalsRules=oConfig.totals;if(!(this.totalsRules instanceof Array)){this.totalsRules=[];}};Zapatec.Grid.prototype.addStandardEventListeners=function(){Zapatec.Grid.SUPERclass.addStandardEventListeners.call(this);this.addEventListener('fetchSourceError',this.displayErrorSource);if(this.displayLoading){this.addEventListener('fetchSourceStart',this.displayLoading);this.addEventListener('fetchSourceEnd',this.removeLoading);this.addEventListener('loadThemeEnd',this.visualizeThemeLoad);this.addEventListener('loadDataEnd',this.visualizeDataLoad);}};Zapatec.Grid.prototype.displayErrorSource=function(oError){alert(this.getMessage('errorSource',this.config.source,oError.errorDescription));};Zapatec.Grid.prototype.loadData=function(oArg){if(this.config.dataOnDemand){if(typeof oArg!='object'){oArg={};}
oArg.currentPage=this.currentPage;if(this.order.length){oArg.sortColumn=this.order[0].col;oArg.sortDesc=this.order[0].desc;oArg.order=this.order;}
oArg.filters=[];for(var iCol=0;iCol<this.fields.length;iCol++){var oField=this.fields[iCol];if(oField){oArg.filters[iCol]={hiddenValues:oField.hiddenValues,minValue:oField.minValue,maxValue:oField.maxValue,regexpFilter:oField.regexpFilter,textFilter:oField.textFilter};}else{oArg.filters[iCol]={};}}}
Zapatec.Grid.SUPERclass.loadData.call(this,oArg);};Zapatec.Grid.prototype.onRefresh=function(){if(this.refreshState>1){this.refreshState--;return;}
if(this.visualizeRefresh&&this.visualize){this.visualizeRefresh();}
this.refreshState--;if(typeof this.config.callbackOnRefresh=='function'){this.config.callbackOnRefresh(this);}
this.fireEvent('gridRefreshed');};Zapatec.Grid.prototype.loadDataJson=function(oData){this.rowsIndex=null;if(!(oData instanceof Object)){oData={};}
if(!(oData.fields instanceof Array)){oData.fields=[];}
if(!(oData.rows instanceof Array)){oData.rows=[];}
this.data=oData;this.fields=oData.fields;this.rows=oData.rows;if(!this.config.dataPrepared){this.prepareData();}
this.rowsIndex=this.rows.slice();this.primaryKeyColumn=oData.primaryKey;this.buildPrimaryKey();if(typeof oData.currentPage!='undefined'){this.setCurrentPage(oData.currentPage);}else{this.setCurrentPage(0);}
this.show();};Zapatec.Grid.prototype.buildPrimaryKey=function(){var iKey=this.primaryKeyColumn;if(!this.fields[iKey]){this.primaryKey=null;return;}
this.primaryKey={};var oKey=this.primaryKey;var aRows=this.rows;var iRows=aRows.length;var iRow,sKey;for(iRow=0;iRow<iRows;iRow++){sKey=this.getCellValueCompare(this.getCellByRow(aRows[iRow],iKey));if((typeof sKey=='string'&&sKey.length)||typeof sKey=='number'){oKey[sKey]=aRows[iRow];}}};Zapatec.Grid.prototype.rebuildPrimaryKey=function(){if(this.primaryKey){this.buildPrimaryKey();}};Zapatec.Grid.prototype.show=function(){this.filteredRows=this.rows.slice();this.sort();this.refresh();this.displayFilterOut();if(!this.initialized){this.initialized=true;this.fireEvent('gridInitialized');}};Zapatec.Grid.prototype.prepareData=function(){var aItems=this.fields;var iItems=aItems.length;var iItem,oItem;for(iItem=0;iItem<iItems;iItem++){oItem=aItems[iItem];if(!(oItem instanceof Object)){oItem={};}
oItem.i=iItem;aItems[iItem]=this.prepareField(oItem);}
aItems=this.rows;this.prepareSpans(aItems);iItems=aItems.length;for(iItem=0;iItem<iItems;iItem++){oItem=aItems[iItem];if(!(oItem instanceof Object)){oItem={};}
oItem.i=iItem;aItems[iItem]=this.prepareRow(oItem);}};Zapatec.Grid.prototype.prepareField=function(oField){return oField;};Zapatec.Grid.prototype.prepareRow=function(oRow){if(!oRow.cells||!(oRow.cells instanceof Array)){oRow.cells=[];}
var aCells=oRow.cells;var iColumns=this.fields.length;var iCol,oCell;for(iCol=0;iCol<iColumns;iCol++){oCell=aCells[iCol];if(!(oCell instanceof Object)){oCell={};}
oCell.i=iCol;if(!(oCell.rowspan>0&&typeof oCell.r!='undefined')){oCell.r=oRow.i;}
aCells[iCol]=this.convertCell(oCell);if(oCell.colspan>1){iCol+=oCell.colspan-1;}}
return oRow;};Zapatec.Grid.prototype.convertCell=function(oCell){return this.convertCellByField(this.getFieldByCell(oCell),oCell);};Zapatec.Grid.prototype.convertCellByField=function(oField,oCell){if(!(oCell instanceof Object)){oCell={};}
if(oField&&this.getConvertByType){var sMethod=this.getConvertByType(oField.dataType);if(sMethod){oCell=this[sMethod](oCell);}}
oCell=this.convertCellCallback(oCell);return oCell;};Zapatec.Grid.prototype.convertCellCallback=function(oCell){if(!(oCell instanceof Object)){oCell={};}
if(typeof this.config.convert=='function'){var convertedValue=this.config.convert(this,oCell);if(typeof convertedValue!='undefined'){if(typeof oCell.o=='undefined'){oCell.o=oCell.v;}
oCell.v=oCell.c=convertedValue;}}
return oCell;};Zapatec.Grid.prototype.validateCell=function(oCell){if(!(oCell instanceof Object)){oCell={};}
if(this.getValidateByType){var oField=this.getFieldByCell(oCell);if(oField){var sMethod=this.getValidateByType(oField.dataType);if(sMethod){var undef;if(oCell.invalid){oCell.invalid=undef;}
var bValid=this[sMethod](oCell);if(!bValid){oCell.invalid=true;}
var oRow=this.getRowByCell(oCell);if(oRow){if(!bValid){oRow.invalid=true;}else{if(oRow.invalid){oRow.invalid=undef;}
var aCells=this.getRowCells(oRow);for(var iCell=0;iCell<aCells.length;iCell++){if(aCells[iCell]&&aCells[iCell].invalid){oRow.invalid=true;break;}}}}
return bValid;}}}
return true;};Zapatec.Grid.prototype.splice=function(aData){if(!aData){return;}
if(!(aData instanceof Array)){aData=[aData];}
this.fireEvent('gridPrepareModify');var aRemoved=[];var iDataLen=aData.length;var oData;for(var iData=0;iData<iDataLen;iData++){oData=aData[iData];var iInsertPos=null;if(typeof oData.atKey!='undefined'){var iRowId=this.getRowIdByPrimaryKey(oData.atKey);if(typeof iRowId!='undefined'){oData.atRowId=iRowId;}}
if((typeof oData.atRowId=='string'&&oData.atRowId.length)||typeof oData.atRowId=='number'){iInsertPos=this.getRowIndexById(oData.atRowId);}
if(typeof iInsertPos!='number'){if((typeof oData.atRow=='string'&&oData.atRow.length)||typeof oData.atRow=='number'){var iRowNum=oData.atRow*1;if(typeof this.rows[iRowNum]!='undefined'){iInsertPos=iRowNum;}}}
if(typeof iInsertPos!='number'){if(typeof oData.afterKey!='undefined'){var iRowId=this.getRowIdByPrimaryKey(oData.afterKey);if(typeof iRowId!='undefined'){oData.afterRowId=iRowId;}}
if((typeof oData.afterRowId=='string'&&oData.afterRowId.length)||typeof oData.afterRowId=='number'){iInsertPos=this.getRowIndexById(oData.afterRowId);if(typeof iInsertPos=='number'){iInsertPos++;}}}
if(typeof iInsertPos!='number'){if((typeof oData.afterRow=='string'&&oData.afterRow.length)||typeof oData.afterRow=='number'){var iRowNum=oData.afterRow*1;if(typeof this.rows[iRowNum]!='undefined'){iInsertPos=iRowNum+1;}}}
if(typeof iInsertPos!='number'){iInsertPos=this.rows.length;}
if(!(oData.rows instanceof Array)){oData.rows=[];}
var iHowManyToRemove=parseInt(oData.howMany);if(isNaN(iHowManyToRemove)){iHowManyToRemove=0;}
var oPrimaryKey=this.primaryKey;this.primaryKey=null;var bRebuildPrimaryKey=false;var iRow=0;var iRemoved=0;while(iRemoved<iHowManyToRemove&&iRow<oData.rows.length){var oGridRow=this.rows[iInsertPos];if(typeof oGridRow=='undefined'){break;}
aRemoved.push(Zapatec.Utils.clone(oGridRow));var oRow=this.prepareRow(oData.rows[iRow]);for(var iCol=0;iCol<oGridRow.cells.length;iCol++){var oCell=oRow.cells[iCol];if(!oCell){continue;}
var oGridCell=oGridRow.cells[iCol];if(this.primaryKeyColumn==iCol&&oGridCell.c!=oCell.c){bRebuildPrimaryKey=true;}
oGridCell.v=oCell.v;oGridCell.c=oCell.c;oGridCell.o=oCell.o;oGridCell.style=oCell.style;}
oGridRow.style=oRow.style;iInsertPos++;iRow++;iRemoved++;}
for(;iRemoved<iHowManyToRemove;iRemoved++){if(typeof this.rows[iInsertPos]=='undefined'){break;}
var oRow=this.removeRow(iInsertPos);if(oRow){aRemoved.push(oRow);}
bRebuildPrimaryKey=true;}
for(;iRow<oData.rows.length;iRow++){var oRow=oData.rows[iRow];oRow.i=this.rowsIndex.length;oRow=this.prepareRow(oRow);this.rows.splice(iInsertPos++,0,oRow);this.rowsIndex.push(oRow);bRebuildPrimaryKey=true;}
if(bRebuildPrimaryKey){oPrimaryKey=null;this.buildPrimaryKey();}else{this.primaryKey=oPrimaryKey;oPrimaryKey=null;}}
if(!oData.noRefresh){this.modify();}
return aRemoved;};Zapatec.Grid.prototype.removeRow=function(iRow){var oRow=this.rows[iRow];if(!oRow){return;}
var undef;this.rowsIndex[oRow.i]=undef;var aRows=this.rows.splice(iRow,1);this.rebuildPrimaryKey();return aRows[0];};Zapatec.Grid.prototype.spliceColumns=function(aData){if(!aData){return 0;}
this.fireEvent('gridPrepareModify');var aFields=this.fields;var iFields=aFields.length;var aRows=this.rows;var iRows=aRows.length;var iPrimaryKey=this.primaryKeyColumn;var bRebuildPrimaryKey=false;if(!(aData instanceof Array)){aData=[aData];}
var iRemoved=0;var iDataLen=aData.length;var iData,oData,iInsertPos,iHowManyToRemove,aSpliceArgs,aColumns,iColumns,aRemoved,aUpdates,iRow,aCells,oUpdates,aNewCells;for(iData=0;iData<iDataLen;iData++){oData=aData[iData];iInsertPos=parseInt(oData.atColumnId);if(isNaN(iInsertPos)){iInsertPos=parseInt(oData.afterColumnId);if(!isNaN(iInsertPos)){iInsertPos++;}else{iInsertPos=iFields;}}
iHowManyToRemove=parseInt(oData.howMany);if(isNaN(iHowManyToRemove)){iHowManyToRemove=0;}
aSpliceArgs=[iInsertPos,iHowManyToRemove];aColumns=oData.fields;if(!(aColumns instanceof Array)){aColumns=[aColumns];}
iColumns=aColumns.length;aRemoved=aFields.splice.apply(aFields,aSpliceArgs.concat(aColumns));if(aRemoved&&aRemoved.length){iRemoved+=aRemoved.length;}
aUpdates=oData.rows;if(!(aUpdates instanceof Array)){aUpdates=[];}
for(iRow=0;iRow<iRows;iRow++){aCells=aRows[iRow].cells;oUpdates=aUpdates[iRow];if(!oUpdates){oUpdates={};}
aNewCells=oUpdates.cells;if(!(aNewCells instanceof Array)){aNewCells=new Array(iColumns);}else if(aNewCells.length<iColumns){aNewCells=aNewCells.concat(new Array(iColumns-aNewCells.length));}else if(aNewCells.length>iColumns){aNewCells.splice(iColumns,aNewCells.length-iColumns);}
aCells.splice.apply(aCells,aSpliceArgs.concat(aNewCells));}
if(typeof iPrimaryKey=='number'&&iPrimaryKey>=iInsertPos){if(iPrimaryKey<iInsertPos+iHowManyToRemove){this.primaryKeyColumn=null;this.primaryKey=null;bRebuildPrimaryKey=false;}else{this.primaryKeyColumn+=iColumns-iHowManyToRemove;if(this.primaryKeyColumn<0){this.primaryKeyColumn=null;this.primaryKey=null;bRebuildPrimaryKey=false;}else{bRebuildPrimaryKey=true;}}}}
this.prepareData();if(bRebuildPrimaryKey){this.rebuildPrimaryKey();}
if(!oData.noRefresh){this.modify();}
return iRemoved;};Zapatec.Grid.prototype.deleteColumns=function(oArg){var aColumns=oArg.columns;if(!(aColumns instanceof Array)){if(typeof aColumns=='undefined'){return 0;}
aColumns=[aColumns];}
var iDeleted=0;var aFields=this.fields;var iColumns=aColumns.length;var aRows=this.rows;var iRows=aRows.length;var iPrimaryKey=this.primaryKeyColumn;var bRebuildPrimaryKey=false;var iCol,iColumn,aDeleted,iRow;for(iCol=0;iCol<iColumns;iCol++){iColumn=parseInt(aColumns[iCol]);if(!isNaN(iColumn)){aDeleted=aFields.splice(iColumn,1);for(iRow=0;iRow<iRows;iRow++){aRows[iRow].cells.splice(iColumn,1);}
if(aDeleted&&aDeleted.length){iDeleted++;if(typeof iPrimaryKey=='number'){if(iPrimaryKey==iColumn){this.primaryKeyColumn=null;this.primaryKey=null;bRebuildPrimaryKey=false;}else if(iPrimaryKey>iColumn){this.primaryKeyColumn--;if(this.primaryKeyColumn<0){this.primaryKeyColumn=null;this.primaryKey=null;bRebuildPrimaryKey=false;}else{bRebuildPrimaryKey=true;}}}}}}
this.prepareData();if(bRebuildPrimaryKey){this.rebuildPrimaryKey();}
if(!oArg.noRefresh){this.refresh();}
return iDeleted;};Zapatec.Grid.prototype.modify=function(){this.setFilters();this.displayFilterOut();this.fireEvent('gridModified');};Zapatec.Grid.prototype.sort=function(aArg){if(aArg){if(!(aArg instanceof Array)){aArg=[aArg];}
this.order=[];for(var iArg=0;iArg<aArg.length;iArg++){var oArg=aArg[iArg];if(!oArg){break;}
this.order.push({col:oArg.column*1,desc:oArg.desc,lt:oArg.desc?1:-1,gt:oArg.desc?-1:1});}}
if(this.order.length&&this.order.length<this.fields.length){var oUsed={};for(var iPos=0;iPos<this.order.length;iPos++){oUsed[this.order[iPos].col]=true;}
for(var iCol=0;iCol<this.fields.length&&this.order.length<this.fields.length;iCol++){if(oUsed[iCol]){continue;}
this.order.push({col:iCol,lt:-1,gt:1});}}
for(var iCol=0;iCol<this.fields.length;iCol++){var oField=this.fields[iCol];if(oField){var undef;oField.sorted=undef;oField.sortedDesc=undef;if(this.order.length&&iCol==this.order[0].col){if(this.order[0].desc){oField.sortedDesc=true;}else{oField.sorted=true;}}}}
if(!this.order.length){return;}
for(var iPos=0;iPos<this.order.length;iPos++){var iCol=this.order[iPos].col;if(this.fields[iCol]&&typeof this.fields[iCol].sortByColumn!='undefined'){this.order[iPos].col=this.fields[iCol].sortByColumn*1;}}
if(!this.config.dataOnDemand){if(this.displayUpdating){this.displayUpdating();}
var oGrid=this;setTimeout(function(){oGrid.filteredRows.sort(function(oLeft,oRight){for(var iCol=0;iCol<oGrid.order.length;iCol++){var iColNum=oGrid.order[iCol].col;var leftVal=oGrid.getCellValueCompare(oLeft.cells[iColNum]);var rightVal=oGrid.getCellValueCompare(oRight.cells[iColNum]);if(leftVal==rightVal){continue;}
if(leftVal<rightVal){return oGrid.order[iCol].lt;}
return oGrid.order[iCol].gt;}
return 0;});oGrid=null;},0);}};Zapatec.Grid.prototype.unsort=function(){this.order=[];this.applyFilters();};Zapatec.Grid.sort=function(iGridId,iCol){var oGrid=Zapatec.Widget.getWidgetById(iGridId);if(!oGrid||!oGrid.fields[iCol]){return;}
if(!oGrid.fields[iCol].sorted){oGrid.sort({column:iCol});}else{oGrid.sort({column:iCol,desc:true});}
if(oGrid.config.dataOnDemand){oGrid.loadData();}else{oGrid.refresh();}};Zapatec.Grid.prototype.getCurrentPageNumber=function(){return this.currentPage+1;};Zapatec.Grid.prototype.totalPages=function(){var iRecords=this.recordsDisplayed();var iRowsPerPage;if(this.fitInto){var oAutoresizeFrame=this.autoresizeFrame;iRowsPerPage=oAutoresizeFrame.visibleRows;}else{iRowsPerPage=this.config.rowsPerPage;}
if(iRowsPerPage<=0||iRecords<=0){return 1;}
return Math.ceil(iRecords/iRowsPerPage);};Zapatec.Grid.prototype.setCurrentPage=function(iPage){if(iPage<0||iPage>=this.totalPages()){return;}
var iDirection=iPage-this.currentPage;if(!iDirection){return;}
if(this.fitInto){var oAutoresizeFrame=this.autoresizeFrame;if(Math.abs(iDirection)==1){oAutoresizeFrame.direction=iDirection;oAutoresizeFrame.currentRow+=oAutoresizeFrame.visibleRows*iDirection;}else{oAutoresizeFrame.direction=0;oAutoresizeFrame.currentRow=iPage*oAutoresizeFrame.visibleRows;}
if(oAutoresizeFrame.currentRow<0){oAutoresizeFrame.direction=0;oAutoresizeFrame.visibleRows+=oAutoresizeFrame.currentRow;oAutoresizeFrame.currentRow=0;}else{var iRecords=this.recordsDisplayed();if(oAutoresizeFrame.currentRow+oAutoresizeFrame.visibleRows>iRecords){oAutoresizeFrame.direction=-1;oAutoresizeFrame.currentRow=iRecords-oAutoresizeFrame.visibleRows;}}
this.currentPage=Math.ceil(oAutoresizeFrame.currentRow/oAutoresizeFrame.visibleRows);}else{this.currentPage=iPage;}};Zapatec.Grid.prototype.gotoPage=function(iPage){this.setCurrentPage(iPage);if(this.config.dataOnDemand){this.loadData();}else{this.refresh();}};Zapatec.Grid.gotoPage=function(iGridId,iPage){var oGrid=Zapatec.Widget.getWidgetById(iGridId);if(oGrid){oGrid.gotoPage(iPage-1);}};Zapatec.Grid.nextPage=function(iGridId){var oGrid=Zapatec.Widget.getWidgetById(iGridId);if(oGrid){oGrid.gotoPage(oGrid.currentPage+1);}};Zapatec.Grid.lastPage=function(iGridId){var oGrid=Zapatec.Widget.getWidgetById(iGridId);if(oGrid){oGrid.gotoPage(oGrid.totalPages()-1);}};Zapatec.Grid.previousPage=function(iGridId){var oGrid=Zapatec.Widget.getWidgetById(iGridId);if(oGrid){oGrid.gotoPage(oGrid.currentPage-1);}};Zapatec.Grid.firstPage=function(iGridId){var oGrid=Zapatec.Widget.getWidgetById(iGridId);if(oGrid){oGrid.gotoPage(0);}};Zapatec.Grid.prototype.setCurrentVerticalOffset=function(oArg){var iRowId;if(typeof oArg=='number'){iRowId=oArg;}else{if(!oArg){return;}
iRowId=oArg.rowId;if(typeof iRowId!='number'){iRowId=this.getRowId(oArg.row);if(typeof iRowId!='number'){return;}}}
if(iRowId<0){iRowId=0;}
var iRows=this.recordsDisplayed()-1;if(iRowId>iRows){iRowId=iRows;}
this.currentVerticalOffset=iRowId;};Zapatec.Grid.prototype.gotoVerticalOffset=function(oArg){this.setCurrentVerticalOffset(oArg);if(this.config.dataOnDemand){this.loadData();}else{this.refresh();}};Zapatec.Grid.prototype.setCurrentHorizontalOffset=function(oArg){var iFieldId;if(typeof oArg=='number'){iFieldId=oArg;}else{if(!oArg){return;}
iFieldId=oArg.fieldId;if(typeof iFieldId!='number'){iFieldId=this.getFieldId(oArg.field);if(typeof iFieldId!='number'){return;}}}
if(this.fields[iFieldId]){this.currentHorizontalOffset=iFieldId;}};Zapatec.Grid.prototype.gotoHorizontalOffset=function(oArg){this.setCurrentHorizontalOffset(oArg);if(this.config.dataOnDemand){this.loadData();}else{this.refresh();}};Zapatec.Grid.prototype.gotoRowId=function(iRowId){var aRows=this.getFilteredRows();for(var iRow=0;iRow<aRows.length;iRow++){if(this.getRowId(aRows[iRow])==iRowId){this.gotoPage(Math.floor(iRow/this.config.rowsPerPage));return;}}};Zapatec.Grid.prototype.applyFilters=function(){this.fireEvent('gridPrepareFilter');if(this.config.dataOnDemand){this.setCurrentPage(0);this.loadData();this.fireEvent('gridFiltered');}else{if(this.displayUpdating){this.displayUpdating();}
var oGrid=this;setTimeout(function(){oGrid.setFilters();oGrid.fireEvent('gridFiltered');},0);}};Zapatec.Grid.prototype.setFilters=function(){this.filteredRows=this.rows.slice();var aFilteredRows=this.filteredRows;var aRegexpFilters=[];var aTextFilters=[];var aFields=this.fields;var iFields=aFields.length;var iCol,oField,aHiddenValues,minValue,maxValue,iRow,oCell;for(iCol=0;iCol<iFields;iCol++){oField=aFields[iCol];if(!oField){continue;}
aHiddenValues=oField.hiddenValues;minValue=oField.minValue;maxValue=oField.maxValue;if(aHiddenValues instanceof Array||typeof minValue!='undefined'||typeof maxValue!='undefined'){for(iRow=aFilteredRows.length-1;iRow>=0;iRow--){oCell=aFilteredRows[iRow].cells[iCol];if(!oCell){continue;}
if(aHiddenValues instanceof Array&&Zapatec.Utils.arrIndexOf(aHiddenValues,this.getCellValueString(oCell))>=0){aFilteredRows.splice(iRow,1);continue;}
if(minValue>this.getCellValueCompare(oCell)){aFilteredRows.splice(iRow,1);continue;}
if(maxValue<this.getCellValueCompare(oCell)){aFilteredRows.splice(iRow,1);continue;}}}
if(oField.regexpFilter){aRegexpFilters.push(iCol);}
if(oField.textFilter){aTextFilters.push(iCol);}}
var bRemove,iFilter,sSearchValue,oRegExp;var iRegexpFilters=aRegexpFilters.length;if(iRegexpFilters){for(iRow=aFilteredRows.length-1;iRow>=0;iRow--){bRemove=true;for(iFilter=0;iFilter<iRegexpFilters;iFilter++){iCol=aRegexpFilters[iFilter];oField=aFields[iCol];oCell=aFilteredRows[iRow].cells[iCol];if(!oCell){continue;}
sSearchValue=this.getCellValueString(oCell);sSearchValue=sSearchValue.replace(/<[^>]*>/g,'');oRegExp=typeof oField.regexpFilter=='string'?new RegExp(oField.regexpFilter):oField.regexpFilter;if(oRegExp.test&&oRegExp.test(sSearchValue)){bRemove=false;break;}}
if(bRemove){aFilteredRows.splice(iRow,1);}}}
var iTextFilters=aTextFilters.length;if(iTextFilters){for(iRow=aFilteredRows.length-1;iRow>=0;iRow--){bRemove=true;for(iFilter=0;iFilter<iTextFilters;iFilter++){iCol=aTextFilters[iFilter];oField=aFields[iCol];oCell=aFilteredRows[iRow].cells[iCol];if(!oCell){continue;}
if(this.searchCell({cell:oCell,searchValue:oField.textFilter})>=0){bRemove=false;break;}}
if(bRemove){aFilteredRows.splice(iRow,1);}}}
this.sort();this.setCurrentPage(0);this.refresh();};Zapatec.Grid.prototype.searchCell=function(oArg){if(!oArg){return;}
var oCell=oArg.cell;if(typeof this.getSearchByType=='function'){var oField=this.getFieldByCell(oCell);if(!oField){return;}
var sSearchFunc=this.getSearchByType(oField.dataType);if(sSearchFunc){return this[sSearchFunc](oArg);}}
var sText=this.getCellValueString(oCell);sText=sText.replace(/<[^>]*>/g,'');return sText.indexOf(oArg.searchValue);};Zapatec.Grid.prototype.filterOut=function(oArg){if(this.filterOutColumn(oArg)){this.applyFilters();}};Zapatec.Grid.prototype.filterOutColumn=function(oArg){if(!oArg||typeof oArg.value=='undefined'){return false;}
var aVals=oArg.value;if(!(aVals instanceof Array)){aVals=[aVals];}
var aCols=oArg.column;if(!(aCols instanceof Array)){aCols=[aCols];}
var bApply=false;for(var iCol=0;iCol<aCols.length;iCol++){var oField=this.fields[aCols[iCol]];if(!oField){continue;}
if(!(oField.hiddenValues instanceof Array)){oField.hiddenValues=[];}
if(oArg.show){for(var iVal=0;iVal<aVals.length;iVal++){for(var iHv=oField.hiddenValues.length-1;iHv>=0;iHv--){if(oField.hiddenValues[iHv]==aVals[iVal]){oField.hiddenValues.splice(iHv,1);}}}}else{for(var iVal=0;iVal<aVals.length;iVal++){oField.hiddenValues.push(aVals[iVal]);}}
bApply=true;}
return bApply;};Zapatec.Grid.prototype.unfilterOut=function(oArg){if(this.unfilterOutColumn(oArg)){this.applyFilters();}};Zapatec.Grid.prototype.unfilterOutColumn=function(oArg){if(!oArg){return false;}
var aCols=oArg.column;if(!(aCols instanceof Array)){aCols=[aCols];}
var bApply=false;var undef;for(var iCol=0;iCol<aCols.length;iCol++){var oField=this.fields[aCols[iCol]];if(!oField){continue;}
if((oField.hiddenValues instanceof Array)&&oField.hiddenValues.length){oField.hiddenValues=undef;bApply=true;}}
return bApply;};Zapatec.Grid.prototype.limitRange=function(oArg){if(!oArg){return;}
var oField=this.fields[oArg.column];if(!oField){return;}
if(typeof oArg.min!='undefined'){oField.minValue=oArg.min;}else{if(typeof oArg.minValue=='undefined'){oField.minValue=oArg.minValue;}else{var oCell={i:oField.i,v:oArg.minValue};oCell=this.convertCell(oCell);oField.minValue=this.getCellValueCompare(oCell);}}
if(typeof oArg.max!='undefined'){oField.maxValue=oArg.max;}else{if(typeof oArg.maxValue=='undefined'){oField.maxValue=oArg.maxValue;}else{var oCell={i:oField.i,v:oArg.maxValue};oCell=this.convertCell(oCell);oField.maxValue=this.getCellValueCompare(oCell);}}
this.applyFilters();};Zapatec.Grid.prototype.setFilter=function(oArg){if(!oArg){oArg={};}
var aFields=this.fields;var aColumns=oArg.columns;var oRegExp=oArg.regexp;var sText=oArg.text;var iCol,oField;if(aColumns instanceof Array){var iColumns=aColumns.length;for(iCol=0;iCol<iColumns;iCol++){oField=aFields[aColumns[iCol]];if(oField){oField.regexpFilter=oRegExp;oField.textFilter=sText;}}}else{var iFields=aFields.length;for(iCol=0;iCol<iFields;iCol++){oField=aFields[iCol];if(!(oField instanceof Object)){aFields[iCol]={};oField=aFields[iCol];}
oField.regexpFilter=oRegExp;oField.textFilter=sText;}}
this.applyFilters();};Zapatec.Grid.prototype.removeFilter=function(oArg){if(!oArg){oArg={};}
this.setFilter({columns:oArg.columns});};Zapatec.Grid.prototype.resetFilters=function(){for(var iCol=0;iCol<this.fields.length;iCol++){var oField=this.fields[iCol];if(oField){var undef;oField.hiddenValues=undef;oField.minValue=undef;oField.maxValue=undef;oField.regexpFilter=undef;oField.textFilter=undef;}}
this.applyFilters();this.displayFilterOut();};Zapatec.Grid.prototype.applyPaging=function(){var oConfig=this.config;var aFilteredRows=this.filteredRows;if(this.currentVerticalOffset<0){this.currentVerticalOffset=0;}
var iOffset=this.currentVerticalOffset;var iVisibleRows=oConfig.visibleRows;var iRowsPerPage=oConfig.rowsPerPage;if(iRowsPerPage<=0||oConfig.dataOnDemand){if(iVisibleRows<=0){return aFilteredRows;}
return aFilteredRows.slice(iOffset,iOffset+iVisibleRows);}
if(this.fitInto){var oAutoresizeFrame=this.autoresizeFrame;var iFirst=oAutoresizeFrame.currentRow;var iLast=iFirst+oAutoresizeFrame.visibleRows;return aFilteredRows.slice(iFirst,iLast);}
var iFirst=this.currentPage*iRowsPerPage;if(iFirst&&iFirst>=aFilteredRows.length){this.setCurrentPage(this.currentPage-1);iFirst=this.currentPage*iRowsPerPage;}
var iLast=iFirst+iRowsPerPage;if(iVisibleRows<=0){return aFilteredRows.slice(iFirst,iLast);}
iFirst+=iOffset;var iLastVisible=iFirst+iVisibleRows;if(iLastVisible<iLast){iLast=iLastVisible;}
return aFilteredRows.slice(iFirst,iLast);};Zapatec.Grid.prototype.refresh=function(){this.fireEvent('gridPrepareRefresh');if(!this.refreshState){this.refreshState=0;}
this.refreshState++;if(!this.config.visibleRows&&this.displayUpdating){this.displayUpdating();}
var oGrid=this;setTimeout(function(){if(!oGrid.visualize){oGrid.refreshCallback();}else if(oGrid.refreshContainer){oGrid.refreshContainer();}},0);};Zapatec.Grid.prototype.refreshCallback=function(){this.config.callbackHeaderDisplay(this);var aRows=this.applyPaging();if(typeof this.config.callbackDataDisplay=='function'){this.config.callbackDataDisplay(this,aRows);}else{for(var iRow=0;iRow<aRows.length;iRow++){this.config.callbackRowDisplay(this,aRows[iRow]);}}
if(typeof this.config.callbackTotalsDisplay=='function'||typeof this.config.callbackTotalDisplay=='function'){var aTotals;if(this.getTotals){aTotals=this.getTotals();}
if(typeof this.config.callbackTotalsDisplay=='function'){this.config.callbackTotalsDisplay(this,aTotals);}else if(aTotals){var iTotals=aTotals.length;for(var iRow=0;iRow<iTotals;iRow++){this.config.callbackTotalDisplay(this,aTotals[iRow]);}}}
if(this.config.rowsPerPage>0){if(typeof this.config.callbackPaginationDisplay=='function'){this.config.callbackPaginationDisplay(this);}else if(this.paginationContainers.length&&this.outputPagination){for(var iEl=0;iEl<this.paginationContainers.length;iEl++){var aHtml=[];this.outputPagination(aHtml,iEl+1);this.paginationContainers[iEl].innerHTML=aHtml.join('');}}}
this.onRefresh();};Zapatec.Grid.prototype.selectRow=function(oRow){if(!oRow||oRow.selected){return;}
if(typeof this.config.callbackCellSelect!='function'&&typeof this.config.callbackRowSelect=='function'){this.config.callbackRowSelect(this,oRow);}
if(this.visualizeSelectRow&&this.config.selectRows&&this.visualize){this.visualizeSelectRow(oRow);}
oRow.selected=true;};Zapatec.Grid.prototype.unselectRow=function(oRow){if(!oRow||!oRow.selected){return;}
var undef;oRow.selected=undef;if(this.visualizeUnselectRow&&this.config.selectRows&&this.visualize){this.visualizeUnselectRow(oRow);}
if(typeof this.config.callbackCellUnselect!='function'&&typeof this.config.callbackRowUnselect=='function'){this.config.callbackRowUnselect(this,oRow);}};Zapatec.Grid.prototype.selectCell=function(oCell){if(!oCell||oCell.selected){return;}
if(typeof this.config.callbackCellSelect=='function'){this.config.callbackCellSelect(this,oCell);}
if(this.visualizeSelectCell&&this.config.selectCells&&this.visualize){this.visualizeSelectCell(oCell);}
oCell.selected=true;};Zapatec.Grid.prototype.unselectCell=function(oCell){if(!oCell||!oCell.selected){return;}
var undef;oCell.selected=undef;if(this.visualizeUnselectCell&&this.config.selectCells&&this.visualize){this.visualizeUnselectCell(oCell);}
if(typeof this.config.callbackCellUnselect=='function'){this.config.callbackCellUnselect(this,oCell);}};Zapatec.Grid.prototype.rowOnClick=function(iRowId,iCellId){var oRow=this.getRowById(iRowId);if(!oRow){return;}
var oCell=null;if(typeof iCellId!='undefined'){oCell=this.getCellById(iRowId,iCellId);if(!oCell){return;}}
var oEvent=window.event;if(oEvent.metaKey||(window.opera&&oEvent.altKey)){return;}
var bShift=false;var bCtrl=false;if(this.config.multipleSelect){if(this.lastSelection){bShift=oEvent.shiftKey;}
bCtrl=oEvent.ctrlKey||oEvent.metaKey;}
if(!bShift&&!bCtrl){for(var iRow=0;iRow<this.rows.length;iRow++){var oCurrRow=this.rows[iRow];if(!oCurrRow||!oCurrRow.selected){continue;}
if(oCell){for(var iCol=0;iCol<this.fields.length;iCol++){var oCurrCell=oCurrRow.cells[iCol];if(!oCurrCell){continue;}
if(!(oCurrRow.i==iRowId&&oCurrCell.i==iCellId)){this.unselectCell(oCurrCell);}}}
if(oCurrRow.i!=iRowId){this.unselectRow(oCurrRow);}}}else if(bShift){if(this.lastSelection.rows instanceof Array){for(var iRow=0;iRow<this.lastSelection.rows.length;iRow++){this.unselectRow(this.lastSelection.rows[iRow]);}}
if(this.lastSelection.cells instanceof Array){for(var iCell=0;iCell<this.lastSelection.cells.length;iCell++){this.unselectCell(this.lastSelection.cells[iCell]);}}}
if(oCell&&typeof this.config.callbackCellOnClick=='function'){this.config.callbackCellOnClick(this,oCell);}else if(typeof this.config.callbackRowOnClick=='function'){this.config.callbackRowOnClick(this,oRow);}
if(!bShift){this.selectRow(oRow);this.lastSelection={rowId:iRowId};if(oCell){this.selectCell(oCell);this.lastSelection.cellId=iCellId;}}else{var iSelectionStartRowId=this.lastSelection.rowId;var iSelectionStartCellId=this.lastSelection.cellId;this.lastSelection.rows=[];this.lastSelection.cells=[];var aSelectedRows=this.lastSelection.rows;var aSelectedCells=this.lastSelection.cells;var iRow=0;var iLastRow=0;while(this.filteredRows[iRow]){var iCurrRowId=this.filteredRows[iRow].i;if(iCurrRowId==iRowId){iLastRow=iSelectionStartRowId;break;}else if(iCurrRowId==iSelectionStartRowId){iLastRow=iRowId;break;}
iRow++;}
var iFirstCell=0;var iLastCell=0;if(oCell&&typeof iSelectionStartCellId!='undefined'){if(iCellId<iSelectionStartCellId){iFirstCell=iCellId;iLastCell=iSelectionStartCellId;}else{iFirstCell=iSelectionStartCellId;iLastCell=iCellId;}}
while(this.filteredRows[iRow]){var oCurrRow=this.filteredRows[iRow];if(!oCurrRow.selected){this.selectRow(oCurrRow);aSelectedRows.push(oCurrRow);}
if(oCell){for(var iCell=iFirstCell;iCell<=iLastCell;iCell++){var oCurrCell=oCurrRow.cells[iCell];if(!oCurrCell.selected){this.selectCell(oCurrCell);aSelectedCells.push(oCurrCell);}}}
if(oCurrRow.i==iLastRow){break;}
iRow++;}}};Zapatec.Grid.rowOnClick=function(iGridId,iRowId,iCellId){var oGrid=Zapatec.Widget.getWidgetById(iGridId);if(oGrid&&oGrid.rowOnClick){oGrid.rowOnClick(iRowId,iCellId);}};Zapatec.Grid.prototype.rowOnDblClick=function(iRowId,iCellId){var oRow=this.getRowById(iRowId);if(!oRow){return;}
var oCell=null;if(typeof iCellId!='undefined'){oCell=this.getCellById(iRowId,iCellId);if(!oCell){return;}}
if(oCell&&typeof this.config.callbackCellOnDblClick=='function'){this.config.callbackCellOnDblClick(this,oCell);}else if(typeof this.config.callbackRowOnDblClick=='function'){this.config.callbackRowOnDblClick(this,oRow);}};Zapatec.Grid.rowOnDblClick=function(iGridId,iRowId,iCellId){var oGrid=Zapatec.Widget.getWidgetById(iGridId);if(oGrid&&oGrid.rowOnDblClick){oGrid.rowOnDblClick(iRowId,iCellId);}};Zapatec.Grid.prototype.clearSelection=function(){for(var iRow=0;iRow<this.rows.length;iRow++){var oCurrRow=this.rows[iRow];if(oCurrRow.selected){for(var iCol=0;iCol<oCurrRow.cells.length;iCol++){this.unselectCell(oCurrRow.cells[iCol]);}
this.unselectRow(oCurrRow);}}};Zapatec.Grid.prototype.getSelectedRows=function(){var aSelected=[];for(var iRow=0;iRow<this.rows.length;iRow++){var oCurrRow=this.rows[iRow];if(oCurrRow.selected){aSelected.push(oCurrRow);}}
return aSelected;};Zapatec.Grid.prototype.getSelectedCells=function(){var aSelected=[];for(var iRow=0;iRow<this.rows.length;iRow++){var oCurrRow=this.rows[iRow];if(oCurrRow.selected){for(var iCol=0;iCol<this.fields.length;iCol++){var oCurrCell=oCurrRow.cells[iCol];if(oCurrCell.selected){aSelected.push(oCurrCell);}}}}
return aSelected;};Zapatec.Grid.prototype.getInvalidRows=function(){var aInvalid=[];for(var iRow=0;iRow<this.rows.length;iRow++){var oCurrRow=this.rows[iRow];if(oCurrRow.invalid){aInvalid.push(oCurrRow);}}
return aInvalid;};Zapatec.Grid.prototype.getInvalidCells=function(){var aInvalid=[];for(var iRow=0;iRow<this.rows.length;iRow++){var oCurrRow=this.rows[iRow];if(oCurrRow.invalid){for(var iCol=0;iCol<this.fields.length;iCol++){var oCurrCell=oCurrRow.cells[iCol];if(oCurrCell.invalid){aInvalid.push(oCurrCell);}}}}
return aInvalid;};Zapatec.Grid.checkboxOnClick=function(iGridId,aCols,sVal,bChecked){var oGrid=Zapatec.Widget.getWidgetById(iGridId);if(oGrid&&oGrid.filterOut){oGrid.filterOut({column:aCols,value:sVal,show:bChecked});}};Zapatec.Grid.checkboxSelectAllOnClick=function(iGridId,aCols){var oGrid=Zapatec.Widget.getWidgetById(iGridId);if(!oGrid||!oGrid.unfilterOutColumn||!oGrid.applyFilters||!oGrid.displayFilterOut){return}
var bApply=oGrid.unfilterOutColumn({column:aCols});if(bApply){oGrid.applyFilters();oGrid.displayFilterOut();}};Zapatec.Grid.checkboxClearAllOnClick=function(iGridId,aCols){var oGrid=Zapatec.Widget.getWidgetById(iGridId);if(!oGrid||!oGrid.getColumnRange||!oGrid.filterOutColumn||!oGrid.applyFilters||!oGrid.displayFilterOut){return;}
var oRange=oGrid.getColumnRange({column:aCols});if(!oRange){return;}
var aVals=[];for(var iVal=0;iVal<oRange.values.length;iVal++){aVals.push(oRange.values[iVal].v+'');}
var bApply=oGrid.filterOutColumn({column:aCols,value:aVals,show:false});if(bApply){oGrid.applyFilters();oGrid.displayFilterOut();}};Zapatec.Grid.checkboxLinkOnClick=function(iGridId,aCols,sVal){var oGrid=Zapatec.Widget.getWidgetById(iGridId);if(!oGrid||!oGrid.getColumnRange||!oGrid.filterOutColumn||!oGrid.applyFilters||!oGrid.displayFilterOut){return;}
var oRange=oGrid.getColumnRange({column:aCols});if(!oRange){return;}
var aVals=[];for(var iVal=0;iVal<oRange.values.length;iVal++){aVals.push(oRange.values[iVal].v+'');}
var bClear=oGrid.filterOutColumn({column:aCols,value:aVals,show:false});var bShow=oGrid.filterOutColumn({column:aCols,value:sVal,show:true});if(bClear||bShow){oGrid.applyFilters();oGrid.displayFilterOut();}};Zapatec.Grid.prototype.addFilterOut=function(oArg){this.filterOutRules.push(oArg);};Zapatec.Grid.prototype.displayFilterOut=function(){var aFilterOutRules=this.filterOutRules;var iFilterOutRules=aFilterOutRules.length;for(var iFo=0;iFo<iFilterOutRules;iFo++){var oFilterOut=aFilterOutRules[iFo];var oRange=this.getColumnRange(oFilterOut);if(!oRange){continue;}
var aVals=oRange.values;if(oFilterOut.sortDesc){aVals.sort(function(leftVal,rightVal){if(leftVal.c<rightVal.c){return 1;}
if(leftVal.c>rightVal.c){return-1;}
return 0;});}
if(typeof oFilterOut.callback=='function'){var aCols=oFilterOut.column;if(!(aCols instanceof Array)){aCols=[aCols];}
var aFields=[];for(var iCol=0;iCol<aCols.length;iCol++){var oField=this.fields[aCols[iCol]];if(!oField){continue;}
aFields.push(oField);}
if(!aFields.length){continue;}
var sCols=aCols.join(',');var aChoices=[];for(var iVal=0;iVal<aVals.length;iVal++){var sVal=aVals[iVal].v+'';var sEscaped=escape(sVal);var oChoice={};oChoice.value=sVal;oChoice.onclick="Zapatec.Grid.checkboxOnClick('"+this.id+"',["+sCols+"],unescape('"+sEscaped+"'),this.checked)";oChoice.checked=false;for(var iField=0;iField<aFields.length;iField++){var oField=aFields[iField];if(!(oField.hiddenValues instanceof Array)||Zapatec.Utils.arrIndexOf(oField.hiddenValues,sVal)<0){oChoice.checked=true;break;}}
oChoice.link="Zapatec.Grid.checkboxLinkOnClick('"+this.id+"',["+sCols+"],unescape('"+sEscaped+"'))";if(iVal==0){oChoice.selectall="Zapatec.Grid.checkboxSelectAllOnClick('"+
this.id+"',["+sCols+"])";oChoice.clearall="Zapatec.Grid.checkboxClearAllOnClick('"+
this.id+"',["+sCols+"])";}
aChoices.push(oChoice);}
oFilterOut.callback(aChoices);}else if(this.visualizeFilterOut){this.visualizeFilterOut(oFilterOut,aVals);}}};Zapatec.Grid.prototype.getColumnRange=function(oArg){if(!oArg||typeof oArg.column=='undefined'){return null;}
var aCols=oArg.column;if(!(aCols instanceof Array)){var oField=this.fields[oArg.column];if(!oField){return null;}
if(typeof oField.columnRange!='undefined'){return oField.columnRange;}
aCols=[oArg.column];}
var aKeys=[];var oKeys={};var aRows=oArg.filtered?this.filteredRows:this.rows;for(var iRow=0;iRow<aRows.length;iRow++){var oRow=aRows[iRow];if(!oRow){continue;}
for(var iCol=0;iCol<aCols.length;iCol++){var oCell=oRow.cells[aCols[iCol]];if(!oCell){continue;}
var sKey=this.getCellValueString(oCell);if(sKey.length&&typeof oKeys[sKey]=='undefined'){aKeys.push({v:sKey,c:this.getCellValueCompare(oCell),o:this.getCellValueOriginal(oCell)});oKeys[sKey]=true;}}}
if(!aKeys.length){return null;}
aKeys.sort(function(leftVal,rightVal){if(leftVal.c<rightVal.c){return-1;}
if(leftVal.c>rightVal.c){return 1;}
return 0;});var iLastKey=aKeys.length-1;return{min:aKeys[0].c,minValue:aKeys[0].v,minOrig:aKeys[0].o,max:aKeys[iLastKey].c,maxValue:aKeys[iLastKey].v,maxOrig:aKeys[iLastKey].o,values:aKeys};};Zapatec.Grid.prototype.recordsDisplayed=function(){if(this.config.dataOnDemand&&typeof this.data.displayedRows!='undefined'){return this.data.displayedRows*1;}
return this.filteredRows.length;};Zapatec.Grid.prototype.setDisplayedRows=function(iRows){if(this.config.dataOnDemand){this.data.displayedRows=iRows;}};Zapatec.Grid.prototype.totalRecords=function(){if(this.config.dataOnDemand&&typeof this.data.totalRows!='undefined'){return this.data.totalRows*1;}
return this.rows.length;};Zapatec.Grid.prototype.setTotalRows=function(iRows){if(this.config.dataOnDemand){this.data.totalRows=iRows;}};Zapatec.Grid.prototype.getId=function(){return this.id;};Zapatec.Grid.prototype.getStyle=function(){if(this.data&&this.data.style){return this.data.style;}
return'';};Zapatec.Grid.prototype.getHeaderStyle=function(){if(this.data&&this.data.headerStyle){return this.data.headerStyle;}
return'';};Zapatec.Grid.prototype.getRows=function(){return this.rows;};Zapatec.Grid.prototype.getFilteredRows=function(){return this.filteredRows;};Zapatec.Grid.prototype.getRowId=function(oRow){if(oRow){return oRow.i;}};Zapatec.Grid.prototype.getRowIdByPrimaryKey=function(sKey){return this.getRowId(this.getRowByPrimaryKey(sKey));};Zapatec.Grid.prototype.getRowNumber=function(oRow){if(oRow){var iRowId=this.getRowId(oRow);var aRows=this.applyPaging();for(var iRow=0;iRow<aRows.length;iRow++){if(this.getRowId(aRows[iRow])==iRowId){return iRow;}}}};Zapatec.Grid.prototype.getRowIndexById=function(iRowId){for(var iRow=0;iRow<this.rows.length;iRow++){if(this.getRowId(this.rows[iRow])==iRowId){return iRow;}}};Zapatec.Grid.prototype.getRowStyle=function(oRow){if(oRow&&oRow.style){return oRow.style;}
return'';};Zapatec.Grid.prototype.getRowSelected=function(oRow){return(oRow&&oRow.selected);};Zapatec.Grid.prototype.getRowById=function(iRowId){return this.rowsIndex[iRowId];};Zapatec.Grid.prototype.getRowByPrimaryKey=function(sKey){if(this.primaryKey){return this.primaryKey[sKey];}};Zapatec.Grid.prototype.getRowByCell=function(oCell){if(oCell){return this.getRowById(oCell.r);}};Zapatec.Grid.prototype.getRowCells=function(oRow){if(oRow&&oRow.cells instanceof Array){return oRow.cells;}};Zapatec.Grid.prototype.setRowStyle=function(oRow,sStyle){if(oRow instanceof Object){oRow.style=sStyle;}
return oRow;};Zapatec.Grid.prototype.getFields=function(oArg){var aFields=this.fields;if(oArg&&oArg.visible){var aVisibleFields=[];var iFields=aFields.length;var oField;for(var iField=0;iField<iFields;iField++){oField=aFields[iField];if(!oField.hidden){aVisibleFields.push(oField);}}
aFields=aVisibleFields;}
return aFields;};Zapatec.Grid.prototype.getFieldId=function(oField){if(oField){return oField.i;}};Zapatec.Grid.prototype.getFieldTitle=function(oField){if(oField&&oField.title){return oField.title;}
return'';};Zapatec.Grid.prototype.getFieldType=function(oField){if(oField){return oField.dataType;}};Zapatec.Grid.prototype.getFieldWidth=function(oField){if(oField&&oField.columnWidth){return oField.columnWidth;}
return'';};Zapatec.Grid.prototype.getFieldStyle=function(oField){if(oField&&oField.style){return oField.style;}
return'';};Zapatec.Grid.prototype.getFieldSpanned=function(oField){if(!oField){return;}
var iSpan=parseInt(oField.span);if(isNaN(iSpan)){var iId=oField.i;for(var iOffset=1;iOffset<=iId;iOffset++){oField=this.fields[iId-iOffset];if(!oField||!oField.hidden){return;}
iSpan=parseInt(oField.span);if(!isNaN(iSpan)){break;}}}
if(isNaN(iSpan)||iSpan<=0){return;}
var aFields=[];var iSpanned=0;for(var iOffset=0;iOffset<iSpan;iOffset++){var oF=this.fields[oField.i+iOffset];if(!oF){continue;}
if(iOffset>0&&!isNaN(parseInt(oF.span))){break;}
aFields.push(oF);if(!oF.hidden){iSpanned++;}}
if(!iSpanned){return;}
return{spanned:iSpanned,fields:aFields};};Zapatec.Grid.prototype.getFieldSpan=function(oField){if(oField){var iSpan=parseInt(oField.span);if(!isNaN(iSpan)){return Math.max(iSpan,0);}}
return 0;};Zapatec.Grid.prototype.getFieldSpanTitle=function(oField){if(oField&&oField.spanTitle){return oField.spanTitle;}
return'';};Zapatec.Grid.prototype.getFieldSpanStyle=function(oField){if(oField&&oField.spanStyle){return oField.spanStyle;}
return'';};Zapatec.Grid.prototype.getFieldHidden=function(oField){if(oField){return oField.hidden;}};Zapatec.Grid.prototype.getFieldNosort=function(oField){if(oField){return oField.nosort;}};Zapatec.Grid.prototype.getFieldSorted=function(oField){if(oField){return oField.sorted;}};Zapatec.Grid.prototype.getFieldSortedDesc=function(oField){if(oField){return oField.sortedDesc;}};Zapatec.Grid.prototype.getFieldOnclick=function(oField){if(oField&&!oField.nosort){return"Zapatec.Grid.sort('"+this.id+"','"+oField.i+"')";}
return'';};Zapatec.Grid.prototype.getFieldById=function(iFieldId){return this.fields[iFieldId];};Zapatec.Grid.prototype.getFieldByCell=function(oCell){if(oCell){return this.getFieldById(oCell.i);}};Zapatec.Grid.prototype.getCellId=function(oCell){if(oCell){return oCell.i;}};Zapatec.Grid.prototype.getCellRowId=function(oCell){if(oCell){return oCell.r;}};Zapatec.Grid.prototype.getCellRowNumber=function(oCell){if(oCell){var iRowId=this.getCellRowId(oCell);var aRows=this.applyPaging();for(var iRow=0;iRow<aRows.length;iRow++){if(this.getRowId(aRows[iRow])==iRowId){return iRow;}}}};Zapatec.Grid.prototype.getCellByRow=function(oRow,iCellId){var aCells=this.getRowCells(oRow);if(aCells){return aCells[iCellId];}};Zapatec.Grid.prototype.getCellById=function(iRowId,iCellId){return this.getCellByRow(this.getRowById(iRowId),iCellId);};Zapatec.Grid.prototype.getCellValue=function(oCell){if(!oCell){return;}
return oCell.v;};Zapatec.Grid.prototype.getCellValueString=function(oCell){return this.getCellValue(oCell)+'';};Zapatec.Grid.prototype.getCellValueCompare=function(oCell){if(!oCell){return'';}
if(typeof oCell.c!='undefined'){return oCell.c;}
return this.getCellValue(oCell);};Zapatec.Grid.prototype.getCellValueOriginal=function(oCell){if(!oCell){return'';}
if(typeof oCell.o!='undefined'){return oCell.o;}
return this.getCellValue(oCell);};Zapatec.Grid.prototype.getCellStyle=function(oCell,iRow){if(!oCell){return'';}
var sStyle='';if(typeof this.config.funcStyle=='function'){sStyle=this.config.funcStyle(this,oCell,iRow);}
if(!sStyle){sStyle=oCell.style;}
return sStyle;};Zapatec.Grid.prototype.getCellSelected=function(oCell){return(oCell&&oCell.selected);};Zapatec.Grid.prototype.getCellDataType=function(oCell){var oField=this.getFieldByCell(oCell);if(oField){return oField.dataType;}};Zapatec.Grid.prototype.getCellData=function(oCell,iMode){if(!oCell){return'undefined';}
if(!iMode){iMode=1;}
if((iMode==1&&!this.config.show_asis)||iMode==2){return this.getCellValueString(oCell);}
var sData=this.getCellValueOriginal(oCell)+'';if(iMode==4){return sData;}
if(typeof this.config.show_asis=='object'){if(typeof this.config.show_asis.funcShow=='function'){sData=this.config.show_asis.funcShow(this,oCell);}
if(this.config.show_asis.bBoth){sData='<u>'+sData+'</u><br>'+this.getCellValueString(oCell);}}
return sData;};Zapatec.Grid.prototype.setFieldTitle=function(oField,sTitle){if(!oField){return 0;}
oField.title=sTitle;var oSpan=document.getElementById(['zpGrid',this.id,'Col',oField.i,'TitleSpan'].join(''));if(oSpan){oSpan.innerHTML=sTitle;}
return 1;};Zapatec.Grid.prototype.setCellValue=function(oCell,value){if(!oCell){oCell={};}else{oCell.previousState=null;oCell.previousState=Zapatec.Utils.clone(oCell);}
oCell.v=value;return this.convertCell(oCell);};Zapatec.Grid.prototype.revertCell=function(oArg){var iRowId=parseInt(oArg.rowId);var oRow=oArg.row;var iCellId=parseInt(oArg.cellId);var oCell=oArg.cell;if(!oRow){if(!isNaN(iRowId)){oRow=this.getRowById(iRowId);}else if(oCell){oRow=this.getRowByCell(oCell);}
if(!oRow){return null;}}
if(isNaN(iCellId)){iCellId=this.getCellId(oCell);if(typeof iCellId!='number'){return null;}}
var aCells=oRow.cells;if(aCells){oCell=aCells[iCellId];if(oCell){var oPrevState=oCell.previousState;if(oPrevState){oCell.previousState=null;oPrevState.previousState=Zapatec.Utils.clone(oCell);aCells[iCellId]=oCell=oPrevState;}
return oCell;}}
return null;};Zapatec.Grid.prototype.revertRow=function(oArg){var iRowId=parseInt(oArg.rowId);var oRow=oArg.row;if(!oRow){if(!isNaN(iRowId)){oRow=this.getRowById(iRowId);}
if(!oRow){return null;}}
var aCells=oRow.cells;if(!(aCells instanceof Array)){return null;}
var iCells=aCells.length;for(var iCell=0;iCell<iCells;iCell++){this.revertCell({row:oRow,cellId:iCell});}
return oRow;};Zapatec.Grid.prototype.setCellStyle=function(oCell,sStyle){if(oCell instanceof Object){oCell.style=sStyle;}
return oCell;};Zapatec.Grid.prototype.hideColumns=function(oArg){var aColumns=oArg.columns;if(!(aColumns instanceof Array)){if(typeof aColumns=='undefined'){return;}
aColumns=[aColumns];}
var iColumns=aColumns.length;var iColumn,oColumn;for(iColumn=0;iColumn<iColumns;iColumn++){oColumn=this.getFieldById(aColumns[iColumn]);if(oColumn){oColumn.hidden=true;}}
if(!oArg.noRefresh){this.refresh();}};Zapatec.Grid.prototype.showColumns=function(oArg){if(!(oArg.columns instanceof Array)){if(typeof oArg.columns=='undefined'){return;}
oArg.columns=[oArg.columns];}
for(var iCol=0;iCol<oArg.columns.length;iCol++){var oCol=this.getFieldById(oArg.columns[iCol]);if(oCol){oCol.hidden=false;if(!oArg.noRefresh){this.refresh();}}}};Zapatec.Grid.prototype.receiveData=function(oArg){Zapatec.Grid.SUPERclass.receiveData.call(this,oArg);if(!oArg.data){return;}
var aRows=oArg.data;if(!(aRows instanceof Array)){aRows=[aRows];}
for(var iRow=0;iRow<aRows.length;iRow++){var aCells=aRows[iRow];if(aCells.cells){break;}
if(!(aCells instanceof Array)){aCells=[aCells];}
var oRow={cells:[]};for(var iCell=0;iCell<aCells.length;iCell++){var oCell=aCells[iCell];if(typeof oCell.v!='undefined'){oRow.cells.push(oCell);}else{oRow.cells.push({v:oCell});}}
aRows[iRow]=oRow;}
this.splice({atRow:0,howMany:this.totalRecords(),rows:Zapatec.Utils.clone(aRows)});};Zapatec.Grid.prototype.editSelectedRows=function(oEditor){if(!oEditor||!oEditor.receiveData){return;}
var aRows=this.getSelectedRows();if(!aRows.length){alert(this.getMessage('errorSelectRow'));return;}
oEditor.receiveData({data:aRows});};Zapatec.Grid.prototype.editSelectedCells=function(oEditor){if(!oEditor||!oEditor.receiveData){return;}
var aCells=this.getSelectedCells();if(!aCells.length){alert(this.getMessage('errorSelectCell'));return;}
oEditor.receiveData({data:aCells});};Zapatec.Grid.prototype.prepareSpans=function(aRows,bOut){var aFields=this.fields;var iFields=aFields.length;var iRows=aRows.length;if(iFields&&iRows){var aRF=[];var fClone=Zapatec.Utils.clone;var iHorizHiddenStart=this.config.fixedLeft;var iHorizHiddenEnd=iHorizHiddenStart+this.currentHorizontalOffset;var iRow,oRow,aCells,iCell,iC,oCell,oRF,oC,iRowspan,iColspan;for(iRow=0;iRows--;iRow++){oRow=aRows[iRow];if(!oRow){continue;}
aCells=oRow.cells;if(!aCells){continue;}
for(iCell=0;iCell<iFields;iCell++){oCell=aCells[iCell];oRF=aRF[iCell];if(oCell){if(oRF){oC=oRF.cell;if(oC.i==oCell.i&&oC.r==oCell.r){if(bOut){aCells[iCell]=null;oRow.spanned=true;}
if(!--oRF.rowspan){aRF[iCell]=null;}else if(!iRows){oC.rowspan-=oRF.rowspan;aRF[iCell]=null;}
if(bOut){iColspan=oCell.colspan;if(iColspan>1){for(iCell++;--iColspan;iCell++){aCells[iCell]=null;}
continue;}}}else{if(bOut){iRowspan=oC.rowspan-oRF.rowspan;if(iRowspan<2){iRowspan=0;}
oC.rowspan=iRowspan;if(oC.r<this.currentVerticalOffset){oC.v='';}
iColspan=oC.colspan;if(iColspan>1){var aSpannedCells=oRF.row.cells;var oSpannedCell;for(var iOffset=1;iOffset<iColspan;iOffset++){oSpannedCell=aSpannedCells[iCell+iOffset];if(oSpannedCell){oSpannedCell.rowspan=iRowspan;}}}}
aRF[iCell]=null;iCell--;continue;}}else{iRowspan=oCell.rowspan;if(iRowspan>1){if(iRows){aRF[iCell]={rowspan:--iRowspan,row:oRow,cell:oCell};oRow.spanned=true;}else{oCell.rowspan=0;}}}
iColspan=oCell.colspan;if(iColspan>1){if(bOut){while(iColspan&&aFields[iCell].hidden){oCell=aCells[++iCell];iColspan--;}
while(iColspan&&iCell>=iHorizHiddenStart&&iCell<iHorizHiddenEnd){oCell=aCells[++iCell];oCell.v='';iColspan--;}
if(oCell){oCell.colspan=iColspan;}
if(iColspan>0){iColspan--;iCell++;while(aFields[iCell]&&iColspan--){if(aFields[iCell].hidden){if(oCell){oCell.colspan--;}}
aCells[iCell]=null;iCell++;}
iCell--;}}else{for(iCell++;--iColspan;iCell++){oC=fClone(oCell);oC.i=iCell;aCells[iCell]=this.convertCell(oC);}
iCell--;}}}else if(oRF){if(bOut){oRow.spanned=true;}else{aCells[iCell]=oRF.cell;if(!--oRF.rowspan){aRF[iCell]=null;}else if(!iRows){oRF.cell.rowspan-=oRF.rowspan;aRF[iCell]=null;}
if(!bOut){oCell=aCells[iCell];iColspan=oCell.colspan;if(iColspan>1){for(iCell++;--iColspan;iCell++){oC=fClone(oCell);oC.i=iCell;aCells[iCell]=this.convertCell(oC);}}}}}}}}
return aRows;};Zapatec.Grid.onCellMouseup=function(iRow,iCell){var oEvent=window.event;var iButton=oEvent.button||oEvent.which||1;if(iButton==1&&(oEvent.metaKey||(window.opera&&oEvent.altKey))){iButton=2;}
if(iButton>1){var oConfig=this.config;if(typeof oConfig.callbackCellOnRightClick=='function'){oConfig.callbackCellOnRightClick(this,this.getCellById(iRow,iCell));}else if(typeof oConfig.callbackRowOnRightClick=='function'){oConfig.callbackRowOnRightClick(this,this.getRowById(iRow));}}};Zapatec.Grid.prototype.moveColumn=function(oArg){if(!oArg){return;}
var iColumn=parseInt(oArg.fieldId);if(isNaN(iColumn)){return;}
var aFields=this.fields;var iFields=aFields.length;if(!aFields[iColumn]){return;}
var iPos=parseInt(oArg.position);if(isNaN(iPos)){return;}
if(iPos<0){iPos=0;}else if(!aFields[iPos]){iPos=aFields[iFields-1].i;if(isNaN(iPos)){return;}}
if(iColumn==iPos){return false;}
var aRemoved;aRemoved=aFields.splice(iColumn,1);aFields.splice(iPos,0,aRemoved[0]);var iStart=iColumn;var iEnd=iPos;var iIncrement=-1;if(iColumn>iPos){iStart=iPos;iEnd=iColumn;iIncrement=1;}
var iCol;for(iCol=iStart;iCol<=iEnd;iCol++){aFields[iCol].i=iCol;}
var aRules=this.filterOutRules;aRules=aRules.concat(this.totalsRules);var iRules=aRules.length;var iRule,oRule,aCols,iCols,iFieldId;for(iRule=0;iRule<iRules;iRule++){oRule=aRules[iRule];aCols=oRule.column;if(aCols instanceof Array){iCols=aCols.length;for(iCol=0;iCol<iCols;iCol++){iFieldId=aCols[iCol];if(iFieldId==iColumn){aCols[iCol]=iPos;}else if(iFieldId>=iStart&&iFieldId<=iEnd){aCols[iCol]+=iIncrement;}}}else{iFieldId=aCols;if(iFieldId==iColumn){oRule.column=iPos;}else if(iFieldId>=iStart&&iFieldId<=iEnd){oRule.column+=iIncrement;}}}
var aRows=this.rows;var iRows=aRows.length;var iRow,oRow,aCells;for(iRow=0;iRow<iRows;iRow++){oRow=aRows[iRow];aCells=oRow.cells;aRemoved=aCells.splice(iColumn,1);aCells.splice(iPos,0,aRemoved[0]);for(iCol=iStart;iCol<=iEnd;iCol++){aCells[iCol].i=iCol;}}
this.fireEvent('gridMovedColumn',{fieldId:iColumn,position:iPos});if(!oArg.noRefresh){this.refresh();}
return true;};Zapatec.Grid.getNewColumnNumber=function(oArg){if(!oArg){return;}
var iFieldId=parseInt(oArg.fieldId);if(isNaN(iFieldId)){return;}
var oMove=oArg.move;if(!oMove){return;}
var iColumn=parseInt(oMove.fieldId);if(isNaN(iColumn)){return;}
var iPos=parseInt(oMove.position);if(isNaN(iPos)){return;}
if(iColumn==iPos){return iFieldId;}
var iStart=iColumn;var iEnd=iPos;var iIncrement=-1;if(iColumn>iPos){iStart=iPos;iEnd=iColumn;iIncrement=1;}
if(iFieldId==iColumn){return iPos;}else if(iFieldId>=iStart&&iFieldId<=iEnd){return iFieldId+iIncrement;}
return iFieldId;};Zapatec.Grid.prototype.convertString=function(oCell){if(!(oCell instanceof Object)){oCell={};}
oCell.v+='';oCell.v=oCell.v.replace(/\s+/g,' ');oCell.v=oCell.v.replace(/^\s/,'').replace(/\s$/,'');oCell.c=oCell.o=oCell.v;oCell.c=oCell.c.replace(/<[^>]*>/g,'');return oCell;};Zapatec.Grid.prototype.convertInsensitiveString=function(oCell){oCell=this.convertString(oCell);oCell.c=oCell.c.toUpperCase();return oCell;};Zapatec.Grid.prototype.searchInsensitiveString=function(oArg){if(!oArg){return;}
var oCell=oArg.cell;var sText=this.getCellValueString(oCell);sText=sText.replace(/<[^>]*>/g,'');return sText.search(new RegExp(Zapatec.Utils.escapeRegExp(oArg.searchValue),'i'));};Zapatec.Grid.prototype.convertInteger=function(oCell){if(oCell&&(oCell.v==Infinity||oCell.v==-Infinity)){return oCell;}
oCell=this.convertString(oCell);oCell.c=oCell.c.replace(/[^0-9\.\-]/g,'');oCell.c=oCell.c.replace(/\..*/g,'');oCell.c=parseInt(oCell.c);if(isNaN(oCell.c)){oCell.c=0;}
return oCell;};Zapatec.Grid.prototype.convertIntegerGerman=function(oCell){if(oCell&&(oCell.v==Infinity||oCell.v==-Infinity)){return oCell;}
oCell=this.convertString(oCell);oCell.c=oCell.c.replace(/[^0-9,\-]/g,'');oCell.c=oCell.c.replace(/,.*/g,'');oCell.c=parseInt(oCell.c);if(isNaN(oCell.c)){oCell.c=0;}
return oCell;};Zapatec.Grid.prototype.convertFloat=function(oCell){if(oCell&&(oCell.v==Infinity||oCell.v==-Infinity)){return oCell;}
oCell=this.convertString(oCell);oCell.c=oCell.c.replace(/[^0-9\.\-]/g,'');oCell.c=parseFloat(oCell.c);if(isNaN(oCell.c)){oCell.c=0;}
return oCell;};Zapatec.Grid.prototype.convertFloatGerman=function(oCell){if(oCell&&(oCell.v==Infinity||oCell.v==-Infinity)){return oCell;}
oCell=this.convertString(oCell);oCell.c=oCell.c.replace(/[^0-9,\-]/g,'');oCell.c=oCell.c.replace(/,/g,'.');oCell.c=parseFloat(oCell.c);if(isNaN(oCell.c)){oCell.c=0;}
return oCell;};Zapatec.Grid.prototype.convertDate=function(oCell){oCell=this.convertString(oCell);oCell.c=Date.parse(oCell.c);return oCell;};Zapatec.Grid.prototype.convertTime=function(oCell){oCell=this.convertString(oCell);var aMatches=oCell.c.match(/(\d{1,2})\D+(\d{1,2})(\D+(\d{1,2}))?\W*(AM|PM|A|P)?/i);if(!aMatches){aMatches=oCell.c.match(/(\d{2})(\d{2})((\d{2}))?\W*(AM|PM|A|P)?/i);}
if(aMatches&&aMatches[1]&&aMatches[2]){var hour=aMatches[1]*1;if(aMatches[5]){var sAmPm=aMatches[5].toUpperCase();if(sAmPm=='PM'||sAmPm=='P'){if(hour<12){hour+=12;}}else{if(hour==12){hour=0;}}}
if(hour<10){hour='0'+hour;}
var minute=aMatches[2]*1;if(minute<10){minute='0'+minute;}
var second=0;if(aMatches[4]){second=aMatches[4]*1;}
if(second<10){second='0'+second;}
oCell.c=hour+':'+minute+':'+second;}
return oCell;};Zapatec.Grid.prototype.convertTimestampLocale=function(oCell){oCell=this.convertString(oCell);oCell.v=(new Date(parseInt(oCell.v)*1000)).toLocaleString();return oCell;};Zapatec.Grid.prototype.convertTimestampMMDDYYYY=function(oCell){oCell=this.convertString(oCell);var oDate=new Date(parseInt(oCell.v)*1000);var sMonth=oDate.getMonth()+1;if(sMonth<10){sMonth='0'+sMonth;}
var sDay=oDate.getDate();if(sDay<10){sDay='0'+sDay;}
var sYear=oDate.getYear();if(sYear<1900){sYear+=1900;}
oCell.v=sMonth+'/'+sDay+'/'+sYear;return oCell;};Zapatec.Grid.prototype.convertTimestampDDMMYYYY=function(oCell){oCell=this.convertString(oCell);var oDate=new Date(parseInt(oCell.v)*1000);var sMonth=oDate.getMonth()+1;if(sMonth<10){sMonth='0'+sMonth;}
var sDay=oDate.getDate();if(sDay<10){sDay='0'+sDay;}
var sYear=oDate.getYear();if(sYear<1900){sYear+=1900;}
oCell.v=sDay+'/'+sMonth+'/'+sYear;return oCell;};Zapatec.Grid.prototype.convertTimestampYYYYMMDD=function(oCell){oCell=this.convertString(oCell);var oDate=new Date(parseInt(oCell.v)*1000);var sMonth=oDate.getMonth()+1;if(sMonth<10){sMonth='0'+sMonth;}
var sDay=oDate.getDate();if(sDay<10){sDay='0'+sDay;}
var sYear=oDate.getYear();if(sYear<1900){sYear+=1900;}
oCell.v=sYear+'/'+sMonth+'/'+sDay;return oCell;};Zapatec.Grid.prototype.convertBoolean=function(oCell){oCell=this.convertString(oCell);switch(oCell.c.toUpperCase()){case'0':case'F':case'FALSE':case'N':case'NO':case Zapatec.Grid.booleanValues[0].toUpperCase():oCell.c=0;break;default:oCell.c=1;}
oCell.v=Zapatec.Grid.booleanValues[oCell.c];return oCell;};Zapatec.Grid.booleanValues=['No','Yes'];Zapatec.Grid.prototype.setBooleanValues=function(sNo,sYes){if(typeof sNo=='string'){Zapatec.Grid.booleanValues[0]=sNo;}
if(typeof sYes=='string'){Zapatec.Grid.booleanValues[1]=sYes;}};Zapatec.Grid.prototype.convertBooleanTF=function(oCell){oCell=this.convertString(oCell);switch(oCell.c.toUpperCase()){case'0':case'F':case'FALSE':case'N':case'NO':case Zapatec.Grid.booleanTFValues[0].toUpperCase():oCell.c=0;break;default:oCell.c=1;}
oCell.v=Zapatec.Grid.booleanTFValues[oCell.c];return oCell;};Zapatec.Grid.booleanTFValues=['False','True'];Zapatec.Grid.prototype.setBooleanTFValues=function(sFalse,sTrue){if(typeof sFalse=='string'){Zapatec.Grid.booleanTFValues[0]=sFalse;}
if(typeof sTrue=='string'){Zapatec.Grid.booleanTFValues[1]=sTrue;}};Zapatec.Grid.convertByType={'string':'convertString','istring':'convertInsensitiveString','int':'convertInteger','intGerman':'convertIntegerGerman','integer':'convertInteger','integerGerman':'convertIntegerGerman','float':'convertFloat','floatGerman':'convertFloatGerman','date':'convertDate','time':'convertTime','timestamp':'convertTimestampLocale','timestampMMDDYYYY':'convertTimestampMMDDYYYY','timestampDDMMYYYY':'convertTimestampDDMMYYYY','timestampYYYYMMDD':'convertTimestampYYYYMMDD','boolean':'convertBoolean','booleanTF':'convertBooleanTF'};Zapatec.Grid.prototype.getConvertByType=function(sType){return Zapatec.Grid.convertByType[sType];};Zapatec.Grid.classByType={'string':'zpGridTypeString','istring':'zpGridTypeStringInsensitive','int':'zpGridTypeInt','intGerman':'zpGridTypeIntGerman','integer':'zpGridTypeInt','integerGerman':'zpGridTypeIntGerman','float':'zpGridTypeFloat','floatGerman':'zpGridTypeFloatGerman','date':'zpGridTypeDate','time':'zpGridTypeTime','timestamp':'zpGridTypeTimestampLocale','timestampMMDDYYYY':'zpGridTypeTimestampMMDDYYYY','timestampDDMMYYYY':'zpGridTypeTimestampDDMMYYYY','timestampYYYYMMDD':'zpGridTypeTimestampYYYYMMDD','boolean':'zpGridTypeBoolean','booleanTF':'zpGridTypeBooleanTF'};Zapatec.Grid.prototype.getClassByType=function(sType){return Zapatec.Grid.classByType[sType];};Zapatec.Grid.typeByClass={'zpGridTypeString':'string','zpGridTypeStringInsensitive':'istring','zpGridTypeInt':'int','zpGridTypeIntGerman':'intGerman','zpGridTypeFloat':'float','zpGridTypeFloatGerman':'floatGerman','zpGridTypeDate':'date','zpGridTypeTime':'time','zpGridTypeTimestampLocale':'timestamp','zpGridTypeTimestampMMDDYYYY':'timestampMMDDYYYY','zpGridTypeTimestampDDMMYYYY':'timestampDDMMYYYY','zpGridTypeTimestampYYYYMMDD':'timestampYYYYMMDD','zpGridTypeBoolean':'boolean','zpGridTypeBooleanTF':'booleanTF'};Zapatec.Grid.prototype.getTypeByClass=function(sClass){var aClasses=sClass.split(/\s+/);for(var iClass=0;iClass<aClasses.length;iClass++){var sType=Zapatec.Grid.typeByClass[aClasses[iClass]];if(typeof sType!='undefined'){return sType;}}
return'string';};Zapatec.Grid.createType=function(funcConvert,sTypeName,sTypeClass){if(typeof funcConvert!='function'||typeof sTypeName!='string'||!sTypeName.length){return;}
var sFuncName='convertCustom'+sTypeName.charAt(0).toUpperCase()+
sTypeName.substr(1);Zapatec.Grid.prototype[sFuncName]=funcConvert;Zapatec.Grid.convertByType[sTypeName]=sFuncName;if(typeof sTypeClass=='string'&&sTypeClass.length){Zapatec.Grid.classByType[sTypeName]=sTypeClass;Zapatec.Grid.typeByClass[sTypeClass]=sTypeName;}};Zapatec.Grid.searchByType={'istring':'searchInsensitiveString'};Zapatec.Grid.prototype.getSearchByType=function(sType){return Zapatec.Grid.searchByType[sType];};Zapatec.Grid.prototype.loadDataHtml=function(oSource){var oTable=null;if(oSource){oTable=oSource;}else if(this.container){oTable=Zapatec.Utils.getFirstChild(this.container,'table');}
if(!oTable){alert(this.getMessage('errorHtmlTable'));return;}
var oThead=Zapatec.Utils.getFirstChild(oTable,'thead');var oTbodies=oTable.getElementsByTagName('tbody');if(!oTbodies||!oTbodies.length){oTbodies=[oTable];}
var oHeaderTr=Zapatec.Utils.getFirstChild(oThead||oTbodies[0],'tr');if(!oHeaderTr){alert(this.getMessage('errorHtmlHeader'));return;}
this.data=this.newDataHtml(oTable,oHeaderTr);this.fields=this.data.fields;this.rows=this.data.rows;this.rowsIndex=[];this.setCurrentPage(0);var oTd=Zapatec.Utils.getFirstChild(oHeaderTr,'th','td');while(oTd){this.fields.push(this.newFieldHtml(oTd));oTd=Zapatec.Utils.getNextSibling(oTd,'th','td');}
var aRF=[];for(var iTbody=0;iTbody<oTbodies.length;iTbody++){var oTrs=oTbodies[iTbody].getElementsByTagName('tr');var iTr=0;if(iTbody==0&&!oThead){iTr++;}
for(;iTr<oTrs.length;iTr++){var oRow=this.newRowHtml(oTrs[iTr],aRF);this.rows.push(oRow);this.rowsIndex.push(oRow);}}
this.prepareSpans(this.rows);this.primaryKeyColumn=this.data.primaryKey;this.buildPrimaryKey();this.show();};Zapatec.Grid.prototype.newDataHtml=function(oTable,oHeaderTr){var oData={fields:[],rows:[]};var sStyle=Zapatec.Widget.getStyle(oTable);if(sStyle){oData.style=sStyle;}
var sHeaderStyle=Zapatec.Widget.getStyle(oHeaderTr);if(sHeaderStyle){oData.headerStyle=sHeaderStyle;}
return oData;};Zapatec.Grid.prototype.newFieldHtml=function(oTd){var oField={i:this.fields.length,title:oTd.innerHTML};if(this.getTypeByClass){oField.dataType=this.getTypeByClass(oTd.className);}
var sWidth=oTd.getAttribute('width');if(sWidth){sWidth+='';if(sWidth.length){oField.columnWidth=sWidth;}}
var sStyle=Zapatec.Widget.getStyle(oTd);if(sStyle){oField.style=sStyle;}
var sSpan=oTd.getAttribute('span');if(sSpan){oField.span=sSpan*1;}
var sSpanTitle=oTd.getAttribute('spantitle');if(!sSpanTitle){sSpanTitle=oTd.getAttribute('spanTitle');}
if(sSpanTitle){oField.spanTitle=sSpanTitle;}
var sSpanStyle=oTd.getAttribute('spanstyle');if(!sSpanStyle){sSpanStyle=oTd.getAttribute('spanStyle');}
if(sSpanStyle){oField.spanStyle=sSpanStyle;}
var bHidden=(oTd.className.indexOf('zpGridTypeHidden')>=0);if(bHidden){oField.hidden=bHidden;}
var bNosort=(oTd.className.indexOf('zpGridTypeNosort')>=0);if(bNosort){oField.nosort=bNosort;}
var bNotags=(oTd.className.indexOf('zpGridTypeNotags')>=0);if(bNotags){oField.notags=bNotags;}
var aMatch=oTd.className.match(/zpGridTypeSortBy(\d+)/);if(aMatch){oField.sortByColumn=aMatch[1];}
var bPrimaryKey=(oTd.className.indexOf('zpGridTypePrimaryKey')>=0);if(bPrimaryKey){this.data.primaryKey=oField.i;}
return oField;};Zapatec.Grid.prototype.newRowHtml=function(oTr,aRF){var oRow={i:this.rowsIndex.length,cells:[]};var sStyle=Zapatec.Widget.getStyle(oTr);if(sStyle){oRow.style=sStyle;}
var oUtils=Zapatec.Utils;var oTd=oUtils.getFirstChild(oTr,'td','th');var iCols=this.fields.length;var fGetNextSibling=oUtils.getNextSibling;var aCells=oRow.cells;var iCol,oCell,iRowspan,iColspan;for(iCol=0;iCol<iCols;iCol++){if(aRF[iCol]){aRF[iCol]--;continue;}
oCell=this.newCellHtml(oTd,oRow.i,iCol);aCells[iCol]=oCell;iRowspan=oCell.rowspan;if(iRowspan>1){aRF[iCol]=iRowspan-1;}
iColspan=oCell.colspan;if(iColspan>1){iCol+=iColspan-1;}
if(oTd){oTd=fGetNextSibling(oTd,'td','th');}}
return oRow;};Zapatec.Grid.prototype.newCellHtml=function(oTd,iRow,iCol){var oCell={i:iCol,r:iRow,v:''};if(oTd){oCell.v=oTd.innerHTML;if(this.fields[iCol].notags){oCell.v=oCell.v.replace(/<[^>]*>/g,'');}
var iColspan=oTd.getAttribute('colspan')*1;if(iColspan>1){oCell.colspan=iColspan;}
var iRowspan=oTd.getAttribute('rowspan')*1;if(iRowspan>1){oCell.rowspan=iRowspan;}
var sStyle=Zapatec.Widget.getStyle(oTd);if(sStyle){oCell.style=sStyle;}}
oCell=this.convertCell(oCell);return oCell;};Zapatec.Grid.prototype.syncContainers=function(){if(!this.container||(!this.headerContainer&&!this.totalsContainer&&!this.paginationContainers.length)){return;}
var iW=this.container.clientWidth;var iH=this.container.clientHeight;var oD=this.getGridDimensions();if(oD.height&&(!iH||!this.container.style.height||oD.height<iH)){iH=oD.height;}
if(iW){if(this.headerContainer){this.headerContainer.style.width=iW+'px';}
if(this.totalsContainer&&!this.config.horizontal){this.totalsContainer.style.width=iW+'px';}
if(oD.width&&oD.width<iW){iW=oD.width;}
for(var iEl=0;iEl<this.paginationContainers.length;iEl++){this.paginationContainers[iEl].style.width=iW+'px';}}
if(iH){if(this.totalsContainer&&this.config.horizontal){if(this.headerContainer){iH+=this.headerContainer.offsetHeight;}
this.totalsContainer.style.height=iH+'px';}}};Zapatec.Grid.prototype.getGridDimensions=function(){var oDims={width:0,height:0};var oTable=document.getElementById('zpGrid'+this.id+'DataTableTable');if(oTable){oDims.width=oTable.offsetWidth;oDims.height=oTable.offsetHeight;}
return oDims;};Zapatec.Grid.prototype.syncScroll=function(){if(!this.config.horizontal&&typeof this.outAlignCols=='function'){this.outAlignCols();}
this.syncRowHeights();if(this.headerContainer){this.createProperty(this.container,'zpGridHeader',this.headerContainer);}
if(this.totalsContainer){this.createProperty(this.container,'zpGridTotals',this.totalsContainer);}
if(this.config.fixedLeft>0||this.config.horizontal){this.createProperty(this.container,'zpGridFixedLeft',document.getElementById('zpGrid'+this.id+'FixedLeft'));if(this.headerContainer){this.createProperty(this.container,'zpGridDataFixedLeft',document.getElementById('zpGrid'+this.id+'DataFixedLeft'));}
if(this.totalsContainer){this.createProperty(this.container,'zpGridTotalsFixedLeft',document.getElementById('zpGrid'+this.id+'TotalsFixedLeft'));}}
if(this.container.zpGridHeader||this.container.zpGridTotals||this.container.zpGridFixedLeft){if(this.container.zpGridHeader){this.container.zpGridHeader.scrollLeft=this.container.scrollLeft;}
if(this.container.zpGridTotals){this.container.zpGridTotals.scrollLeft=this.container.scrollLeft;}
if(this.config.horizontal){this.createProperty(this.container,'onscroll',function(){if(this.zpGridFixedLeft){this.zpGridFixedLeft.style.left=this.scrollLeft+'px';}
if(this.zpGridDataFixedLeft){this.zpGridDataFixedLeft.style.left=this.scrollLeft+'px';}
if(this.zpGridTotalsFixedLeft){this.zpGridTotalsFixedLeft.style.top=this.scrollTop+'px';}
if(this.zpGridHeader){this.zpGridHeader.scrollLeft=this.scrollLeft;}
if(this.zpGridTotals){this.zpGridTotals.scrollTop=this.scrollTop;}});}else{this.createProperty(this.container,'onscroll',function(){if(this.zpGridFixedLeft){this.zpGridFixedLeft.style.left=this.scrollLeft+'px';}
if(this.zpGridDataFixedLeft){this.zpGridDataFixedLeft.style.left=this.scrollLeft+'px';}
if(this.zpGridTotalsFixedLeft){this.zpGridTotalsFixedLeft.style.left=this.scrollLeft+'px';}
if(this.zpGridHeader){this.zpGridHeader.scrollLeft=this.scrollLeft;}
if(this.zpGridTotals){this.zpGridTotals.scrollLeft=this.scrollLeft;}});}}};Zapatec.Grid.prototype.outAlignCols=function(){if(!Zapatec.StyleSheet){return;}
var oStyle=new Zapatec.StyleSheet();var iGridId=this.id;var iMaxH=0;var iMaxSpannedH=0;var iSpan=0;var iSpanH=0;var aFields=this.fields;var iFields=aFields.length;var bAutoWidth=(this.config.columnWidth=='auto');var iField,iCol,oField,iFieldId,oSpan,oDiv;for(iField=0,iCol=0;iField<iFields;iField++){oField=aFields[iField];if(!oField||oField.hidden){continue;}
iFieldId=oField.i;oSpan=document.getElementById('zpGrid'+iGridId+'Span'+iFieldId);if(oSpan){iSpan=oSpan.getAttribute('colspan')*1;iSpanH=oSpan.offsetHeight;}
oDiv=document.getElementById('zpGrid'+iGridId+'Col'+iFieldId+'Title');if(oDiv){if(bAutoWidth&&!oField.columnWidth){this.outSetColWidth(iFieldId,oDiv.offsetWidth);}
var iH=oDiv.offsetHeight;if(iSpan){iH+=iSpanH;if(iMaxSpannedH<iH){iMaxSpannedH=iH;}}else{if(iMaxH<iH){iMaxH=iH;}}}
if(iSpan){iSpan--;}
iCol++;}
if(iMaxH){oStyle.addRule('#zpGrid'+iGridId+'Container .zpGridTable .zpGridField .zpGridDiv','height:'+iMaxH+'px');}
if(iMaxSpannedH){oStyle.addRule('#zpGrid'+iGridId+'Container .zpGridTable .zpGridField .zpGridSpannedDiv','height:'+iMaxSpannedH+'px');}
this.outAlignCols=null;};Zapatec.Grid.prototype.syncRowHeights=function(){var oConfig=this.config;var iGridId=this.id;var sGridId='zpGrid'+iGridId;if(oConfig.horizontal){var aFields=this.fields;var iFields=aFields.length;var sFieldId=sGridId+'Field';var sTotal0CellId=sGridId+'Total0Cell';var sSpanId=sGridId+'Span';var iField,oField,iFieldId,oCellHidden,oCell;for(iField=0;iField<iFields;iField++){oField=aFields[iField];if(!oField){continue;}
iFieldId=oField.i;oCellHidden=document.getElementById(sFieldId+iFieldId+'Hidden');if(oCellHidden){oCell=document.getElementById(sFieldId+iFieldId);if(oCell){this.syncRowHeight(oCellHidden,oCell);this.syncColumnWidth(oCellHidden,oCell);}
oCell=document.getElementById(sTotal0CellId+iFieldId+'Hidden');if(oCell){this.syncRowHeight(oCellHidden,oCell);}
oCell=document.getElementById(sTotal0CellId+iFieldId);if(oCell){this.syncRowHeight(oCellHidden,oCell);}}
oCellHidden=document.getElementById(sSpanId+iFieldId+'Hidden');if(oCellHidden){oCell=document.getElementById(sSpanId+iFieldId);if(oCell){this.syncColumnWidth(oCellHidden,oCell);}}}
var sTotalId=sGridId+'Total';var iRow;for(iField=0;iField<iFields;iField++){var oField=aFields[iField];if(!oField){continue;}
iFieldId=oField.i;for(iRow=0;true;iRow++){oCellHidden=document.getElementById(sTotalId+iRow+'Cell'+
iFieldId+'Hidden');if(!oCellHidden){break;}
oCell=document.getElementById(sTotalId+iRow+'Cell'+iFieldId);if(!oCell){break;}
this.syncColumnWidth(oCellHidden,oCell);}}}else if(oConfig.fixedLeft>0){var aRows=this.applyPaging();var iRows=aRows.length;var sRowId=sGridId+'Row';var iRow,oRow,iRowId,oCellHidden,oCell;for(iRow=0;iRow<iRows;iRow++){oRow=aRows[iRow];if(oRow){iRowId=oRow.i;oCellHidden=document.getElementById(sRowId+iRowId+'Cell0Hidden');if(oCellHidden){oCell=document.getElementById(sRowId+iRowId+'Cell0');if(oCell){this.syncRowHeight(oCellHidden,oCell);}}}}
var sTotalId=sGridId+'Total';for(iRow=0;true;iRow++){oCellHidden=document.getElementById(sTotalId+iRow+'Cell0Hidden');if(!oCellHidden){break;}
oCell=document.getElementById(sTotalId+iRow+'Cell0');if(!oCell){break;}
this.syncRowHeight(oCellHidden,oCell);}}};Zapatec.Grid.prototype.syncRowHeight=function(oCellHidden,oCell){var oRow=oCellHidden.parentNode;if(!oRow){return;}
var iHeight=0;var aCells=oRow.getElementsByTagName('td');var iCells=aCells.length;var iCell,iCellH;for(iCell=0;iCell<iCells;iCell++){if(aCells[iCell].getAttribute('rowspan')>1){continue;}
iCellH=aCells[iCell].offsetHeight;if(iHeight<iCellH){iHeight=iCellH;}}
var oRowFixed=oCell.parentNode;if(!oRowFixed){return;}
var iHeightFixed=0;var aCellsFixed=oRowFixed.getElementsByTagName('td');var iCellsFixed=aCellsFixed.length;for(iCell=0;iCell<iCellsFixed;iCell++){if(aCellsFixed[iCell].getAttribute('rowspan')>1){continue;}
iCellH=aCellsFixed[iCell].offsetHeight;if(iHeightFixed<iCellH){iHeightFixed=iCellH;}}
var iDiff=iHeight-iHeightFixed;if(iDiff){var oDiv=oCell.getElementsByTagName('div');if(!oDiv){return;}
oDiv=oDiv[0];if(!oDiv){return;}
oDiv.style.height=iHeight+'px';iHeight=0;for(iCell=0;iCell<iCells;iCell++){if(aCells[iCell].getAttribute('rowspan')>1){continue;}
iCellH=aCells[iCell].offsetHeight;if(iHeight<iCellH){iHeight=iCellH;}}
iHeightFixed=0;for(iCell=0;iCell<iCellsFixed;iCell++){if(aCellsFixed[iCell].getAttribute('rowspan')>1){continue;}
iCellH=aCellsFixed[iCell].offsetHeight;if(iHeightFixed<iCellH){iHeightFixed=iCellH;}}
iDiff=iHeight-iHeightFixed;if(iDiff){oDiv.style.height=(iHeight+iDiff)+'px';}}};Zapatec.Grid.prototype.syncColumnWidth=function(oCellHidden,oCell){var oDiv=oCell.getElementsByTagName('div');if(!oDiv){return;}
oDiv=oDiv[0];if(!oDiv){return;}
var iDiff=oCellHidden.offsetWidth-oCell.offsetWidth;if(iDiff){var iWidth=oDiv.offsetWidth+iDiff;oDiv.style.width=iWidth+'px';}};Zapatec.Grid.prototype.visualizeThemeLoad=function(){if(!this.visualize){return;}
this.syncContainers();};Zapatec.Grid.prototype.visualizeRefresh=function(){this.syncContainers();};Zapatec.Grid.prototype.visualizeDataLoad=function(){if(!this.container||!this.visualize){return;}
this.removeEventListener('loadDataEnd',this.visualizeDataLoad);if(this.headerContainer){this.headerContainer.style.overflow='hidden';}
if(this.totalsContainer){this.totalsContainer.style.overflow='hidden';}
this.outSetCellDims();};Zapatec.Grid.prototype.outSetCellDims=function(){if(!Zapatec.StyleSheet){return;}
var oStyle=new Zapatec.StyleSheet(true);var aTpl=['#zpGrid',this.id.toString(),'','Container .zpGridTable .zpGridDiv'];var oConfig=this.config;var bHoriz=oConfig.horizontal;var sWidth='width:'+oConfig.columnWidth;var sHeight='height:'+oConfig.rowHeight;var sRule=aTpl.join('');oStyle.addRule(sRule,sWidth);oStyle.addRule(sRule,sHeight);if(this.headerContainer){aTpl[2]='Data';sRule=aTpl.join('');oStyle.addRule(sRule,sWidth);oStyle.addRule(sRule,sHeight);}
if(this.totalsContainer){aTpl[2]='Totals';sRule=aTpl.join('');if(!bHoriz){oStyle.addRule(sRule,sWidth);}
oStyle.addRule(sRule,sHeight);}
if(!bHoriz){var aFields=this.fields;var iFields=aFields.length;var iField,iCol,oField,iColWidth;for(iField=0,iCol=0;iField<iFields;iField++){oField=aFields[iField];if(!oField||oField.hidden){continue;}
iColWidth=oField.columnWidth;if(iColWidth){this.outSetColWidth(oField.i,iColWidth);}
iCol++;}}};Zapatec.Grid.prototype.outSetColWidth=function(iColId,iWidth){if(!iWidth){return;}
if(!Zapatec.StyleSheet){return;}
var oStyle=new Zapatec.StyleSheet(true);var sWidth='width:'+Zapatec.Utils.correctCssLength(iWidth);var aTpl=['#zpGrid',this.id.toString(),'','Container .zpGridTable .zpGridColId',iColId.toString(),' .zpGridDiv'];oStyle.addRule(aTpl.join(''),sWidth);if(!this.fields[iColId].span){aTpl[5]='';oStyle.addRule(aTpl.join(''),sWidth);}
if(this.headerContainer){aTpl[2]='Data';aTpl[5]=' .zpGridDiv';oStyle.addRule(aTpl.join(''),sWidth);aTpl[5]='';oStyle.addRule(aTpl.join(''),sWidth);}
if(this.totalsContainer){aTpl[2]='Totals';aTpl[5]=' .zpGridDiv';oStyle.addRule(aTpl.join(''),sWidth);aTpl[5]='';oStyle.addRule(aTpl.join(''),sWidth);}};Zapatec.Grid.prototype.changeColumnWidth=function(iWidth){if(!iWidth){return;}
if(!Zapatec.StyleSheet){return;}
var oStyle=new Zapatec.StyleSheet(true);var aTpl=['#zpGrid',this.id.toString(),'','Container .zpGridTable .zpGridCell',' .zpGridDiv'];var sWidth='width:'+Zapatec.Utils.correctCssLength(iWidth);oStyle.addRule(aTpl.join(''),sWidth);aTpl[4]='';oStyle.addRule(aTpl.join(''),sWidth);if(this.headerContainer){aTpl[2]='Data';aTpl[4]=' .zpGridDiv';oStyle.addRule(aTpl.join(''),sWidth);aTpl[4]='';oStyle.addRule(aTpl.join(''),sWidth);}
if(this.totalsContainer){aTpl[2]='Totals';aTpl[4]=' .zpGridDiv';oStyle.addRule(aTpl.join(''),sWidth);aTpl[4]='';oStyle.addRule(aTpl.join(''),sWidth);}};Zapatec.Grid.prototype.outputTableOpen=function(aHtml,bFixed,sId){aHtml.push('<table class="');aHtml.push(this.getClassName({prefix:'zpGrid'}));aHtml.push('" cellpadding="0" cellspacing="0" ondrag="return false" style="-khtml-user-select:none"><tbody><tr><td class="zpGridTable');if(bFixed){aHtml.push(' zpGridTableFixed');}
if(sId){aHtml.push('" id="');aHtml.push(sId);}
aHtml.push('"><table class="zpGridTableTable');if(sId){aHtml.push('" id="');aHtml.push(sId);aHtml.push('Table');}
aHtml.push('" style="');if(this.data.style){aHtml.push(this.data.style);}
aHtml.push('"><tbody>');};Zapatec.Grid.prototype.outputTableClose=function(aHtml){aHtml.push('</tbody></table></td></tr></tbody></table>');};Zapatec.Grid.prototype.outputFields=function(aHtml,aCols,aFixedCols,aSpans,aRows,aTotals,bFixed){if(this.config.horizontal){this.outputFieldsHoriz(aHtml,aCols,aFixedCols,aSpans,aRows,aTotals,bFixed);}else{this.outputFieldsVert(aHtml,aCols,aSpans,aRows,bFixed);}};Zapatec.Grid.prototype.outputFieldsHoriz=function(aHtml,aCols,aFixedCols,aSpans,aRows,aTotals,bFixed,bSecondRow){var iSpanned=0;var iCols=aCols.length;var iFixedCols=aFixedCols.length;var iSpans=aSpans.length;var iRows=aRows.length;var iTotals=0;if(aTotals&&!this.totalsContainer&&this.outputTotalsCell){iTotals=aTotals.length;}
var iCol,oField,aCl,sClass,aTr,oSpan,iRow;for(iCol=0;iCol<iFixedCols;iCol++){oField=aFixedCols[iCol];aCl=[];aCl.push('zpGridCol zpGridCol');aCl.push(iCol);aCl.push(' zpGridColFixed zpGridColFixed');aCl.push(iCol);if(iCol%2==1){aCl.push(' zpGridColOdd zpGridColFixedOdd');}else{aCl.push(' zpGridColEven zpGridColFixedEven');}
if(iCol==iFixedCols-1){aCl.push(' zpGridColFixedLast');}
sClass=aCl.join('');aTr=[];aTr.push('<tr id="zpGrid');aTr.push(this.id);aTr.push('Col');aTr.push(oField.i);if(bFixed){aTr.push('Fixed');}
aTr.push('" class="');aTr.push(sClass);if(this.data.headerStyle){aTr.push('" style="');aTr.push(this.data.headerStyle);}
aTr.push('">');if(iSpans){oSpan=aSpans[oField.i];if(oSpan){this.outputSpan(aTr,oField,iCol,oSpan,iCols,!bFixed);iSpanned=oSpan.spanned-1;this.outputField(aTr,oField,iCol,iCols,!bFixed);}else{if(iSpanned){this.outputField(aTr,oField,iCol,iCols,!bFixed);iSpanned--;}else{this.outputField(aTr,oField,iCol,iCols,!bFixed,true);}}}else{this.outputField(aTr,oField,iCol,iCols,!bFixed);}
if(!bFixed){for(iRow=0;iRow<iRows;iRow++){this.outputCell(aTr,oField,aRows[iRow],iCol,iRow,iRows);}
for(iRow=0;iRow<iTotals;iRow++){this.outputTotalsCell(aTr,oField,aTotals[iRow],iCol,iRow,iTotals);}}
aTr.push('</tr>');aHtml.push(aTr.join(''));}};Zapatec.Grid.prototype.outputFieldsVert=function(aHtml,aCols,aSpans,aRows,bFixed,bSecondRow){var aTr=[];aTr.push('<tr id="zpGrid');aTr.push(this.id);aTr.push('Head');if(bFixed){aTr.push('Fixed');}
if(bSecondRow){aTr.push('2');}
aTr.push('" class="zpGridRow zpGridHeadRow zpGridRow0 zpGridRowEven"');if(this.data.headerStyle){aTr.push(' style="');aTr.push(this.data.headerStyle);aTr.push('"');}
aTr.push('>');var iFixedLeft=this.config.fixedLeft;var aFields=this.fields;var iFields=aFields.length;var iShow=bFixed?iFixedLeft:iFields;var bTwoRows=false;if(!bSecondRow&&aSpans.length){bTwoRows=true;}
var iCols=aCols.length;var bHiddenCols=(!bFixed&&iFixedLeft);var oField,oSpan,bHidden;for(var iField=0,iSpan=0,iCol=0;iField<iFields&&iField<iShow;iField++){oField=aFields[iField];if(!oField||oField.hidden){continue;}
oSpan=aSpans[iField];if(oSpan){iSpan+=oSpan.spanned;}
bHidden=(bHiddenCols&&iCol<iFixedLeft);if(!bSecondRow){if(oSpan){this.outputSpan(aTr,oField,iCol,oSpan,iCols,bHidden);iCol+=iSpan;iField=oSpan.fields[oSpan.fields.length-1].i;iSpan=0;}else{this.outputField(aTr,oField,iCol,iCols,bHidden,bTwoRows);iCol++;}}else{if(iSpan){this.outputField(aTr,oField,iCol,iCols,bHidden);iSpan--;}
iCol++;}}
aTr.push('</tr>');aHtml.push(aTr.join(''));if(bTwoRows){this.outputFieldsVert(aHtml,aCols,aSpans,aRows,bFixed,true);}};Zapatec.Grid.prototype.outputSpan=function(aHtml,oField,iCol,oSpan,iCols,bHidden){var aCl=[];aCl.push('zpGridCell zpGridCell');aCl.push(iCol);aCl.push(' zpGridField zpGridField');aCl.push(iCol);aCl.push(' zpGridFieldSpan zpGridFieldSpan');aCl.push(iCol);aCl.push(' zpGridColId');aCl.push(oSpan.fields[0].i);if(iCol%2==1){aCl.push(' zpGridCellOdd zpGridFieldOdd zpGridFieldSpanOdd');}else{aCl.push(' zpGridCellEven zpGridFieldEven zpGridFieldSpanEven');}
if(iCol+oSpan.spanned==iCols){aCl.push(' zpGridCellLast zpGridFieldLast zpGridFieldSpanLast');}
var sClass=aCl.join('');aCl.push(' zpGridCellActive zpGridCellActive');aCl.push(iCol);aCl.push(' zpGridFieldActive zpGridFieldActive');aCl.push(iCol);aCl.push(' zpGridFieldSpanActive zpGridFieldSpanActive');aCl.push(iCol);if(iCol%2==1){aCl.push(' zpGridCellActiveOdd zpGridFieldActiveOdd zpGridFieldSpanActiveOdd');}else{aCl.push(' zpGridCellActiveEven zpGridFieldActiveEven zpGridFieldSpanActiveEven');}
if(iCol+oSpan.spanned==iCols){aCl.push(' zpGridCellActiveLast zpGridFieldActiveLast zpGridFieldSpanActiveLast');}
var sClassActive=aCl.join('');var aTd=[];if(this.config.horizontal){aTd.push('<td rowspan="');}else{aTd.push('<td colspan="');}
aTd.push(oSpan.spanned);aTd.push('" class="');aTd.push(sClass);aTd.push('" id="zpGrid');aTd.push(this.id);aTd.push('Span');aTd.push(oSpan.fields[0].i);if(bHidden){aTd.push('Hidden');}else{aTd.push('" onmouseover="this.className=\'');aTd.push(sClassActive);aTd.push('\'" onmouseout="this.className=\'');aTd.push(sClass);aTd.push("'");}
if(oSpan.fields[0].spanStyle){aTd.push('" style="');aTd.push(oSpan.fields[0].spanStyle);}
aTd.push('"><div style="position:relative;overflow:visible">');if(!bHidden){if(!this.config.horizontal){aTd.push('<div id="zpGrid');aTd.push(this.id);aTd.push('Span');aTd.push(oField.i);aTd.push('Margin" class="zpGridColMargin"></div><div id="zpGrid');aTd.push(this.id);aTd.push('Span');aTd.push(oField.i);aTd.push('Resize" onmousedown="Zapatec.Drag.start(window.event,this.id,{horizontal:true,limitLeft:10});return false" class="zpGridColResizeHidden"></div>');}}
aTd.push('<span class="zpGridSpan">');aTd.push(oSpan.fields[0].spanTitle);aTd.push('</span></div></td>');aHtml.push(aTd.join(''));};Zapatec.Grid.prototype.outputField=function(aHtml,oField,iCol,iCols,bHidden,bTwoRows){if(oField.i>=this.config.fixedLeft&&oField.i<this.currentHorizontalOffset+this.config.fixedLeft){return;}
if(this.config.visibleColumns){bHidden=false;}
var sId=this.id.toString();var sFieldId=oField.i.toString();var aCl=[];aCl.push('zpGridCell zpGridCell');aCl.push(iCol);aCl.push(' zpGridField zpGridField');aCl.push(iCol);aCl.push(' zpGridColId');aCl.push(sFieldId);if(iCol%2==1){aCl.push(' zpGridCellOdd zpGridFieldOdd');}else{aCl.push(' zpGridCellEven zpGridFieldEven');}
if(iCol==iCols-1){aCl.push(' zpGridCellLast zpGridFieldLast');}
if(!oField.nosort){if(oField.sorted){aCl.push(' zpGridSortedAsc');}else if(oField.sortedDesc){aCl.push(' zpGridSortedDesc');}}
var sClass=aCl.join('');aCl.push(' zpGridCellActive zpGridCellActive');aCl.push(iCol);aCl.push(' zpGridFieldActive zpGridFieldActive');aCl.push(iCol);if(iCol%2==1){aCl.push(' zpGridCellActiveOdd zpGridFieldActiveOdd');}else{aCl.push(' zpGridCellActiveEven zpGridFieldActiveEven');}
if(iCol==iCols-1){aCl.push(' zpGridCellActiveLast zpGridFieldActiveLast');}
if(!oField.nosort){if(oField.sorted){aCl.push(' zpGridSortedAscActive');}else if(oField.sortedDesc){aCl.push(' zpGridSortedDescActive');}}
var sClassActive=aCl.join('');var aTd=[];aTd.push('<td');if(bTwoRows){if(this.config.horizontal){aTd.push(' colspan="2"');}else{aTd.push(' rowspan="2"');}}
aTd.push(' class="');aTd.push(sClass);aTd.push('" id="zpGrid');aTd.push(sId);aTd.push('Field');aTd.push(sFieldId);if(bHidden){aTd.push('Hidden');}else{aTd.push('" onmouseover="this.className=\'');aTd.push(sClassActive);aTd.push('\'" onmouseout="this.className=\'');aTd.push(sClass);aTd.push("'");if(!oField.nosort){aTd.push('" onclick="Zapatec.Grid.sort(\'');aTd.push(sId);aTd.push("','");aTd.push(sFieldId);aTd.push("')");}
aTd.push('" onmousedown="Zapatec.Widget.callMethod(');aTd.push(sId);aTd.push(",'fireEvent','gridFieldMousedown',");aTd.push(sFieldId);aTd.push(')');aTd.push('" onmouseup="Zapatec.Widget.callMethod(');aTd.push(sId);aTd.push(",'fireEvent','gridFieldMouseup',");aTd.push(sFieldId);aTd.push(')');}
if(oField.style){aTd.push('" style="');aTd.push(oField.style);}
aTd.push('"><div style="position:relative;overflow:visible">');if(!bHidden){if(!this.config.horizontal){aTd.push('<div id="zpGrid');aTd.push(sId);aTd.push('Col');aTd.push(sFieldId);aTd.push('Margin" class="zpGridColMargin"></div><div id="zpGrid');aTd.push(sId);aTd.push('Col');aTd.push(sFieldId);aTd.push('Resize" onmousedown="Zapatec.Drag.start(window.event,this.id,{horizontal:true,limitLeft:10});return false" class="zpGridColResizeHidden"></div>');}}
aTd.push('<div class="zpGridDiv');if(bTwoRows){aTd.push(' zpGridSpannedDiv');}
if(this.getClassByType){aTd.push(' ');aTd.push(this.getClassByType(this.getFieldType(oField)));}
aTd.push('" id="zpGrid');aTd.push(sId);aTd.push('Col');aTd.push(sFieldId);aTd.push('Title');if(bHidden){aTd.push('Hidden');}
aTd.push('"><span class="zpGridSpan" onselectstart="return false" style="-moz-user-select:none" id="zpGrid');aTd.push(sId);aTd.push('Col');aTd.push(sFieldId);aTd.push('Title');if(bHidden){aTd.push('Hidden');}
aTd.push('Span">');aTd.push(oField.title);aTd.push('</span></div></div></td>');aHtml.push(aTd.join(''));};Zapatec.Grid.prototype.outputRows=function(aHtml,aCols,aFixedCols,aSpans,aRows,aTotals,bFixed,oContr){if(this.config.horizontal){this.outputRowsHoriz(aHtml,aCols,aFixedCols,aSpans,aRows,aTotals,bFixed);}else{this.outputRowsVert(aHtml,aCols,aFixedCols,aRows,bFixed,oContr);if(aTotals&&!this.totalsContainer&&this.outputTotals){this.outputTotals(aHtml,aCols,aFixedCols,aTotals,bFixed);}}};Zapatec.Grid.prototype.outputRowsHoriz=function(aHtml,aCols,aFixedCols,aSpans,aRows,aTotals,bFixed){var iSpanned=0;var iCols=aCols.length;var iSpans=aSpans.length;var iRows=aRows.length;var iTotals=0;if(aTotals&&!this.totalsContainer&&this.outputTotalsCell){iTotals=aTotals.length;}
var iCol,oField,aCl,sClass,aTr,oSpan,iRow;for(iCol=aFixedCols.length;iCol<iCols;iCol++){oField=aCols[iCol];aCl=[];aCl.push('zpGridCol zpGridCol');aCl.push(iCol);if(iCol%2==1){aCl.push(' zpGridColOdd');}else{aCl.push(' zpGridColEven');}
if(iCol==iCols-1){aCl.push(' zpGridColLast');}
sClass=aCl.join('');aTr=[];aTr.push('<tr id="zpGrid');aTr.push(this.id);aTr.push('Col');aTr.push(oField.i);if(bFixed){aTr.push('Fixed');}
aTr.push('" class="');aTr.push(sClass);aTr.push('">');if(iSpans){oSpan=aSpans[oField.i];if(oSpan){this.outputSpan(aTr,oField,iCol,oSpan,iCols,!bFixed);iSpanned=oSpan.spanned-1;this.outputField(aTr,oField,iCol,iCols,!bFixed);}else{if(iSpanned){this.outputField(aTr,oField,iCol,iCols,!bFixed);iSpanned--;}else{this.outputField(aTr,oField,iCol,iCols,!bFixed,true);}}}else{this.outputField(aTr,oField,iCol,iCols,!bFixed);}
if(!bFixed){for(iRow=0;iRow<iRows;iRow++){this.outputCell(aTr,oField,aRows[iRow],iCol,iRow,iRows);}
for(iRow=0;iRow<iTotals;iRow++){this.outputTotalsCell(aTr,oField,aTotals[iRow],iCol,iRow,iTotals);}}
aTr.push('</tr>');aHtml.push(aTr.join(''));}};Zapatec.Grid.prototype.outputRowsVert=function(aHtml,aCols,aFixedCols,aRows,bFixed,oContr){var iRows=aRows.length;var iRow,oRow;for(iRow=0;iRow<=iRows;iRow++){oRow=aRows[iRow];if(!oRow){continue;}
this.outputRowVert(aHtml,aCols,aFixedCols,aRows,iRow,bFixed,oContr);}};Zapatec.Grid.prototype.outputRowVert=function(aHtml,aCols,aFixedCols,aRows,iRow,bFixed,oContr){var oRow=aRows[iRow];if(!oRow){return;}
var iRows=aRows.length;var iCols=aCols.length;var iFixedCols=aFixedCols.length;var aCl=[];var iRowN=iRow+1;var sOdd=iRowN%2==1?'Odd':'Even';aCl.push('zpGridRow zpGridRow');aCl.push(iRowN);aCl.push(' zpGridDataRow zpGridDataRow');aCl.push(iRowN);aCl.push(' zpGridRow');aCl.push(sOdd);aCl.push(' zpGridDataRow');aCl.push(sOdd);if(iRowN==iRows){aCl.push(' zpGridRowLast zpGridDataRowLast');}
if(this.config.selectRows&&oRow.selected){aCl.push(' zpGridRowSelected zpGridRowSelected');aCl.push(iRowN);aCl.push(' zpGridRowSelected');aCl.push(sOdd);if(iRowN==iRows){aCl.push(' zpGridRowSelectedLast');}}
if(oRow.invalid){aCl.push(' zpGridRowInvalid zpGridRowInvalid');aCl.push(iRowN);aCl.push(' zpGridRowInvalid');aCl.push(iRowN%2==1?'Odd':'Even');if(iRowN==iRows){aCl.push(' zpGridRowInvalidLast');}}
var sClass=aCl.join('');var aClA=[];aClA.push(' zpGridRowActive zpGridRowActive');aClA.push(iRowN);aClA.push(' zpGridRowActive');aClA.push(iRowN%2==1?'Odd':'Even');if(iRowN==iRows){aClA.push(' zpGridRowActiveLast');}
var sClassActive=aClA.join('');var aTr=[];aTr.push('<tr id="zpGrid');aTr.push(this.id);aTr.push('Row');aTr.push(oRow.i);if(bFixed){aTr.push('Fixed');}
aTr.push('" class="');aTr.push(sClass);if(this.config.activeRows){aTr.push('" onmouseover="if(!Zapatec.Grid.mouseSelection)if(this.className.indexOf(\'zpGridRowActive\')==-1){this.className+=\'');aTr.push(sClassActive);aTr.push("'");if(bFixed){aTr.push(";document.getElementById('zpGrid");aTr.push(this.id);aTr.push('Row');aTr.push(oRow.i);aTr.push("').className+='");aTr.push(sClassActive);aTr.push("'");}else if(this.config.fixedLeft>0&&!this.config.visibleColumns){aTr.push(";document.getElementById('zpGrid");aTr.push(this.id);aTr.push('Row');aTr.push(oRow.i);aTr.push("Fixed').className+='");aTr.push(sClassActive);aTr.push("'");}
aTr.push("}\" onmouseout=\"if(!Zapatec.Grid.mouseSelection)this.className=this.className.replace(/ zpGridRowActive[^ ]*/g,'')");if(bFixed){aTr.push(";var oRow=document.getElementById('zpGrid");aTr.push(this.id);aTr.push('Row');aTr.push(oRow.i);aTr.push("');oRow.className=oRow.className.replace(/ zpGridRowActive[^ ]*/g,'')");}else if(this.config.fixedLeft>0&&!this.config.visibleColumns){aTr.push(";var oRow=document.getElementById('zpGrid");aTr.push(this.id);aTr.push('Row');aTr.push(oRow.i);aTr.push("Fixed');oRow.className=oRow.className.replace(/ zpGridRowActive[^ ]*/g,'')");}}
aTr.push('" ondblclick="this.onmouseout()" style="');if(oRow.style){aTr.push(oRow.style);}
aTr.push('">');if(bFixed){for(var iCol=0;iCol<iFixedCols;iCol++){this.outputCell(aTr,aFixedCols[iCol],oRow,iRow,iCol,iCols);}}else{for(var iCol=0;iCol<iCols;iCol++){var bHidden=(iCol<iFixedCols);this.outputCell(aTr,aCols[iCol],oRow,iRow,iCol,iCols,bHidden);}}
aTr.push('</tr>');aHtml.push(aTr.join(''));};Zapatec.Grid.prototype.outputCell=function(aTr,oField,oRow,iRow,iCol,iCols,bHidden){if(oField.i>=this.config.fixedLeft&&oField.i<this.currentHorizontalOffset+this.config.fixedLeft){return;}
if(this.config.visibleColumns){bHidden=false;}
var iField=oField.i;var oCell=this.getCellByRow(oRow,iField);if(!oCell){return;}
var oConfig=this.config;var iGrid=this.id;var iRow=oRow.i;var iCell=oCell.i;var sId=['zpGrid',iGrid,'Row',iRow,'Cell',iCell].join('');var aCl=[];aCl.push('zpGridCell zpGridCell');aCl.push(iCol);aCl.push(' zpGridColId');aCl.push(iField);aCl.push(' zpGridCellData zpGridCellData');aCl.push(iCol);if(iCol%2==1){aCl.push(' zpGridCellOdd zpGridCellDataOdd');}else{aCl.push(' zpGridCellEven zpGridCellDataEven');}
if(iCol+1==iCols){aCl.push(' zpGridCellLast zpGridCellDataLast');}
if(oConfig.selectCells&&oCell.selected){aCl.push(' zpGridCellSelected zpGridCellSelected');aCl.push(iCol);if(iCol%2==1){aCl.push(' zpGridCellSelectedOdd');}else{aCl.push(' zpGridCellSelectedEven');}
if(iCol==iCols-1){aCl.push(' zpGridCellSelectedLast');}}
if(oCell.invalid){aCl.push(' zpGridCellInvalid zpGridCellInvalid');aCl.push(iCol);if(iCol%2==1){aCl.push(' zpGridCellInvalidOdd');}else{aCl.push(' zpGridCellInvalidEven');}
if(iCol==iCols-1){aCl.push(' zpGridCellInvalidLast');}}
var sClass=aCl.join('');var aClA=[];aClA.push(' zpGridCellActive zpGridCellActive');aClA.push(iCol);aClA.push(' zpGridCellDataActive zpGridCellDataActive');aClA.push(iCol);if(iCol%2==1){aClA.push(' zpGridCellActiveOdd zpGridCellDataActiveOdd');}else{aClA.push(' zpGridCellActiveEven zpGridCellDataActiveEven');}
if(iCol==iCols-1){aClA.push(' zpGridCellActiveLast zpGridCellDataActiveLast');}
var sClassActive=aClA.join('');var aTd=[];aTd.push('<td class="');aTd.push(sClass);aTd.push('" id="');aTd.push(sId);if(bHidden){aTd.push('Hidden');}else{if(oConfig.activeCells){aTd.push('" onmouseover="if(Zapatec.Grid.mouseSelection)Zapatec.Grid.mouseOverCell=this.id;else if(this.className.indexOf(\'zpGridCellActive\')==-1)this.className+=\'');aTd.push(sClassActive);aTd.push('\'" onmouseout="if(!Zapatec.Grid.mouseSelection)this.className=this.className.replace(/ zpGrid[^ ]+Active[^ ]*/g,\'\')');}
aTd.push('" onclick="Zapatec.Grid.rowOnClick(\'');aTd.push(iGrid);aTd.push("','");aTd.push(iRow);aTd.push("','");aTd.push(iCell);aTd.push('\')" ondblclick="this.onmouseout();Zapatec.Grid.rowOnDblClick(\'');aTd.push(iGrid);aTd.push("','");aTd.push(iRow);aTd.push("','");aTd.push(iCell);aTd.push("')");aTd.push('" onmousedown="Zapatec.Widget.callMethod(');aTd.push(iGrid);aTd.push(",'fireEvent','gridCellMousedown',");aTd.push(iRow);aTd.push(',');aTd.push(iCell);aTd.push(')');aTd.push('" onmouseup="Zapatec.Widget.callMethod(');aTd.push(iGrid);aTd.push(",'fireEvent','gridCellMouseup',");aTd.push(iRow);aTd.push(',');aTd.push(iCell);aTd.push(')');}
var sStyle=this.getCellStyle(oCell,iRow);if(sStyle){aTd.push('" style="');aTd.push(sStyle);}
var iColspan=oCell.colspan;if(iColspan>1){aTd.push('" colspan="');aTd.push(iColspan);}
var iRowspan=oCell.rowspan;if(iRowspan>1){aTd.push('" rowspan="');aTd.push(iRowspan);}
aTd.push('">');this.outputCellValue(aTd,oField,oCell);aTd.push('</td>');aTr.push(aTd.join(''));};Zapatec.Grid.prototype.outputCellValue=function(aTd,oField,oCell,bHid){var sId=['zpGrid',this.id,'Row',oCell.r,'Cell',oCell.i].join('');aTd.push('<div id="');aTd.push(sId);aTd.push('Div" class="zpGridDiv');if(this.getClassByType){aTd.push(' ');aTd.push(this.getClassByType(this.getFieldType(oField)));}
aTd.push('" onselectstart="return false" style="-moz-user-select:none;');var iRowspan=oCell.rowspan;if(iRowspan>1){var aMatch=this.config.rowHeight.match(/^(\d+)(\D+)$/);if(aMatch&&aMatch.length==3){aTd.push('height:');aTd.push(aMatch[1]*iRowspan+iRowspan-1);aTd.push(aMatch[2]);aTd.push(';');}}
var iCellspan=oCell.colspan;if(bHid||iCellspan>1){if(bHid){aTd.push('visibility:hidden;');}
if(iCellspan>1){var iW=0;var iCell=oCell.i;var aF=this.fields;var sCW=this.config.columnWidth;var iCW=sCW*1;var iC,oF,sW;for(iC=0;iC<iCellspan;iC++){oF=aF[iCell+iC];if(oF&&!oF.hidden){sW=oF.columnWidth;if(sW){iW+=sW*1;}else if(sCW){iW+=iCW;}else{iW=0;break;}}}
if(iW){aTd.push('width:');aTd.push(iW);aTd.push('px;');}else{aTd.push('width:auto;');}}}
aTd.push('">');var sData=this.getCellData(oCell);if(sData&&typeof sData!='string'){sData=sData.toString();}
if(!sData||!sData.length){sData='&nbsp;';}
aTd.push(sData);aTd.push('</div>');};Zapatec.Grid.prototype.outputPagination=function(aHtml,iContainer){if(typeof this.config.callbackPaginationDisplay=='function'||this.config.rowsPerPage<=0){return;}
if(!iContainer||iContainer<2){iContainer='';}else{iContainer='_'+iContainer;}
if(this.paginationContainers.length){aHtml.push('<div id="zpGrid');aHtml.push(this.id);aHtml.push('PaginationContainer');aHtml.push(iContainer);aHtml.push('"><div><table class="');aHtml.push(this.getClassName({prefix:'zpGrid'}));aHtml.push('" cellpadding="0" cellspacing="0" \
   style="width:100%"><tbody>');}
aHtml.push('<tr><td class="zpGridPagination" id="zpGrid');aHtml.push(this.id);aHtml.push('Pagination');aHtml.push(iContainer);aHtml.push('">');aHtml.push(this.getMessage('labelPage'));if(this.currentPage>0){aHtml.push(' <span id="zpGrid');aHtml.push(this.id);aHtml.push('FirstPage');aHtml.push(iContainer);aHtml.push('" class="zpGridFirstPage" \
   onclick="Zapatec.Grid.firstPage(\'');aHtml.push(this.id);aHtml.push('\')">&lt;&lt;</span> <span id="zpGrid');aHtml.push(this.id);aHtml.push('PrevPage');aHtml.push(iContainer);aHtml.push('" class="zpGridPrevPage" \
   onclick="Zapatec.Grid.previousPage(\'');aHtml.push(this.id);aHtml.push('\')">&lt;</span>');}
var iPages=this.totalPages();var iCurrentPage=this.getCurrentPageNumber();var iFirstPage=iCurrentPage-4;var iLastPage=iCurrentPage+5;for(var iPage=iFirstPage;iPage<iLastPage&&iPage<=iPages;iPage++){if(iPage<1){continue;}
aHtml.push(' <span id="zpGrid');aHtml.push(this.id);aHtml.push('Page');aHtml.push(iPage);aHtml.push(iContainer);aHtml.push('" class="zpGrid');if(iPage==iCurrentPage){aHtml.push('CurrentPage">');}else{aHtml.push('Page" onclick="Zapatec.Grid.gotoPage(\'');aHtml.push(this.id);aHtml.push("','");aHtml.push(iPage);aHtml.push('\')">');}
aHtml.push(iPage);aHtml.push('</span>');}
if(this.currentPage<iPages-1){aHtml.push(' <span id="zpGrid');aHtml.push(this.id);aHtml.push('NextPage');aHtml.push(iContainer);aHtml.push('" class="zpGridNextPage" \
   onclick="Zapatec.Grid.nextPage(\'');aHtml.push(this.id);aHtml.push('\')">&gt;</span> <span id="zpGrid');aHtml.push(this.id);aHtml.push('LastPage');aHtml.push(iContainer);aHtml.push('" class="zpGridLastPage" \
   onclick="Zapatec.Grid.lastPage(\'');aHtml.push(this.id);aHtml.push('\')">&gt;&gt;</span>');}
aHtml.push(' ');aHtml.push(this.getMessage('labelOf'));aHtml.push(' ');aHtml.push(iPages);aHtml.push(' (');aHtml.push(this.recordsDisplayed());aHtml.push(' ');aHtml.push(this.getMessage('labelRows'));aHtml.push(')</td></tr>');if(this.paginationContainers.length){aHtml.push('</tbody></table></div></div>');}};Zapatec.Grid.prototype.refreshContainer=function(){var oConfig=this.config;var oContainer=this.container;if(!oContainer){alert(this.getMessage('errorContainer'));return;}
var oContainerStyle=oContainer.style;oContainerStyle.position='relative';if(oContainer.currentStyle&&oContainer.currentStyle['width']=='auto'){oContainerStyle.width='100%';}
var aCols=[];var aFixedCols=[];var aSpans=[];var aFields=this.fields;var iFields=aFields.length;var iFixedFields=Math.min(iFields,oConfig.fixedLeft);var iField,oField,oSpan;for(iField=0;iField<iFields;iField++){oField=aFields[iField];if(!oField||oField.hidden){continue;}
aCols.push(oField);if(iField<iFixedFields){aFixedCols.push(oField);}
oSpan=this.getFieldSpanned(oField);if(oSpan){aSpans[iField]=oSpan;}}
var aRows=this.prepareSpans(Zapatec.Utils.clone(this.applyPaging()),true);var aTotals;if(this.getTotals){aTotals=this.getTotals();}
if(this.headerContainer){this.headerContainer.style.position='relative';if(this.headerContainer.currentStyle&&this.headerContainer.currentStyle['width']=='auto'){this.headerContainer.style.width='100%';}
var aHtml=[];aHtml.push('<div id="zpGrid');aHtml.push(this.id);aHtml.push('Container"><div>');this.outputTableOpen(aHtml);this.outputFields(aHtml,aCols,aFixedCols,aSpans,aRows,aTotals);this.outputTableClose(aHtml);aHtml.push('</div>');if(oConfig.fixedLeft>0||oConfig.horizontal){aHtml.push('<div id="zpGrid');aHtml.push(this.id);if(this.headerContainer.style.setAttribute){aHtml.push('FixedLeft" style="position:absolute;top:0px;\
     left:expression(this.offsetParent.scrollLeft+\'px\')"><div>');}else{aHtml.push('FixedLeft" style="position:absolute;top:0px;left:');aHtml.push(oContainer.scrollLeft);aHtml.push('px"><div>');}
this.outputTableOpen(aHtml,true);this.outputFields(aHtml,aCols,aFixedCols,aSpans,aRows,aTotals,true);this.outputTableClose(aHtml);aHtml.push('</div></div>');}
aHtml.push('</div>');this.headerContainer.innerHTML=aHtml.join('');oContainer.innerHTML='';var oContr=Zapatec.Utils.createElement('div',oContainer,true);oContr.id='zpGrid'+this.id+'BusyContainer';oContr.style.position='absolute';oContr.style.top='0px';oContr.style.left='0px';oContr=Zapatec.Utils.createElement('div',oContainer,true);oContr.id='zpGrid'+this.id+'DataContainer';aHtml=[];this.outputTableOpen(aHtml,false,'zpGrid'+this.id+'DataTable');this.outputRows(aHtml,aCols,aFixedCols,aSpans,aRows,aTotals,false,oContr);if(this.paginationContainers.length){this.outputTableClose(aHtml);var oDiv=Zapatec.Utils.createElement('div',oContr,true);oDiv.innerHTML=aHtml.join('');aHtml=[];this.outputPagination(aHtml);for(var iEl=0;iEl<this.paginationContainers.length;iEl++){this.paginationContainers[iEl].innerHTML=aHtml.join('');}}else{aHtml.push('</tbody></table></td></tr>');this.outputPagination(aHtml);aHtml.push('</tbody></table>');var oDiv=Zapatec.Utils.createElement('div',oContr,true);oDiv.innerHTML=aHtml.join('');}
if(oConfig.fixedLeft>0||oConfig.horizontal){var oFixed=Zapatec.Utils.createElement('div',oContr,true);oFixed.id='zpGrid'+this.id+'DataFixedLeft';if(oFixed.style.setAttribute){oFixed.style.setAttribute('cssText','position:absolute;top:0px;\
     left:expression(this.offsetParent.scrollLeft+"px")',0);}else{oFixed.style.position='absolute';oFixed.style.top='0px';oFixed.style.left=oContainer.scrollLeft+'px';}
var aHtml=[];this.outputTableOpen(aHtml,true);this.outputRows(aHtml,aCols,aFixedCols,aSpans,aRows,aTotals,true,oFixed);this.outputTableClose(aHtml);var oDiv=Zapatec.Utils.createElement('div',oFixed,true);oDiv.innerHTML=aHtml.join('');}
if(!oConfig.horizontal){var oRs=Zapatec.Utils.createElement('div',oContr,true);oRs.id='zpGrid'+this.id+'DataColResize';oRs.style.position='absolute';oRs.style.top='0px';oRs.style.left='0px';oRs.style.display='none';oRs.className=this.getClassName({prefix:'zpGrid',suffix:'ColResize'});}}else{var aHtml=[];aHtml.push('<div style="position:absolute;top:0px;left:0px" id="zpGrid');aHtml.push(this.id);aHtml.push('BusyContainer"></div><div id="zpGrid');aHtml.push(this.id);aHtml.push('Container"><div>');this.outputTableOpen(aHtml,false,'zpGrid'+this.id+'DataTable');this.outputFields(aHtml,aCols,aFixedCols,aSpans,aRows,aTotals);this.outputRows(aHtml,aCols,aFixedCols,aSpans,aRows,aTotals);if(this.paginationContainers.length){this.outputTableClose(aHtml);aHtml.push('</div></div>');oContainer.innerHTML=aHtml.join('');aHtml=[];this.outputPagination(aHtml);for(var iEl=0;iEl<this.paginationContainers.length;iEl++){this.paginationContainers[iEl].innerHTML=aHtml.join('');}}else{aHtml.push('</tbody></table></td></tr>');this.outputPagination(aHtml);aHtml.push('</tbody></table></div></div>');oContainer.innerHTML=aHtml.join('');}
if((oConfig.fixedLeft>0||oConfig.horizontal)&&!oConfig.visibleColumns){var oFixed=Zapatec.Utils.createElement('div',document.getElementById('zpGrid'+this.id+'Container'),true);oFixed.id='zpGrid'+this.id+'FixedLeft';if(oFixed.style.setAttribute){oFixed.style.setAttribute('cssText','position:absolute;top:0px;\
     left:expression(this.offsetParent.scrollLeft+"px")',0);}else{oFixed.style.position='absolute';oFixed.style.top='0px';oFixed.style.left=oContainer.scrollLeft+'px';}
var aHtml=[];this.outputTableOpen(aHtml,true);this.outputFields(aHtml,aCols,aFixedCols,aSpans,aRows,aTotals,true);this.outputRows(aHtml,aCols,aFixedCols,aSpans,aRows,aTotals,true);this.outputTableClose(aHtml);var oDiv=Zapatec.Utils.createElement('div',oFixed,true);oDiv.innerHTML=aHtml.join('');}}
if(this.headerContainer||!oConfig.visibleColumns){if(aTotals&&this.totalsContainer&&this.outputTotals){this.totalsContainer.style.position='relative';if(this.totalsContainer.currentStyle&&this.totalsContainer.currentStyle['width']=='auto'){this.totalsContainer.style.width='100%';}
var aHtml=[];aHtml.push('<div id="zpGrid');aHtml.push(this.id);aHtml.push('TotalsContainer"><div>');this.outputTableOpen(aHtml);this.outputTotals(aHtml,aCols,aFixedCols,aTotals);this.outputTableClose(aHtml);aHtml.push('</div>');if(oConfig.fixedLeft>0){aHtml.push('<div id="zpGrid');aHtml.push(this.id);if(this.totalsContainer.style.setAttribute){aHtml.push('TotalsFixedLeft" style="position:absolute;top:0px;\
      left:expression(this.offsetParent.scrollLeft+\'px\')"><div>');}else{aHtml.push('TotalsFixedLeft" style="position:absolute;top:0px;left:');aHtml.push(oContainer.scrollLeft);aHtml.push('px"><div>');}
this.outputTableOpen(aHtml,true);this.outputTotals(aHtml,aCols,aFixedCols,aTotals,true);this.outputTableClose(aHtml);aHtml.push('</div></div>');}
aHtml.push('</div>');this.totalsContainer.innerHTML=aHtml.join('');if(!oConfig.horizontal){var oRs=Zapatec.Utils.createElement('div',this.totalsContainer,true);oRs.id='zpGrid'+this.id+'TotalsColResize';oRs.style.position='absolute';oRs.style.top='0px';oRs.style.left='0px';oRs.style.display='none';oRs.className=this.getClassName({prefix:'zpGrid',suffix:'ColResize'});}}
this.syncScroll();}
if(typeof oConfig.callbackTotalsDisplay=='function'){oConfig.callbackTotalsDisplay(this,aTotals);}else if(aTotals&&typeof oConfig.callbackTotalDisplay=='function'){var iTotals=aTotals.length;var iRow;for(iRow=0;iRow<iTotals;iRow++){oConfig.callbackTotalDisplay(this,aTotals[iRow]);}}
if(typeof oConfig.callbackPaginationDisplay=='function'&&oConfig.rowsPerPage>0){oConfig.callbackPaginationDisplay(this);}
this.onRefresh();};Zapatec.Grid.prototype.visualizeSelectRow=function(oRow){if(!oRow){return;}
var oTr=document.getElementById('zpGrid'+this.id+'Row'+oRow.i);if(oTr){/zpGridRow(\d+)/.exec(oTr.className);var sRow=RegExp.$1;var aClSelected=[];aClSelected.push(' zpGridRowSelected zpGridRowSelected');aClSelected.push(sRow);aClSelected.push(' zpGridRowSelected');aClSelected.push(sRow%2==1?'Odd':'Even');if(oTr.className.indexOf('zpGridRowLast')>=0){aClSelected.push(' zpGridRowSelectedLast');}
var sClassSelected=aClSelected.join('');oTr.className+=sClassSelected;oTr=document.getElementById('zpGrid'+this.id+'Row'+oRow.i+'Fixed');if(oTr){oTr.className+=sClassSelected;}}};Zapatec.Grid.prototype.visualizeUnselectRow=function(oRow){if(!oRow){return;}
var oTr=document.getElementById('zpGrid'+this.id+'Row'+oRow.i);if(oTr){oTr.className=oTr.className.replace(/ zpGridRowSelected[^ ]*/g,'');oTr=document.getElementById('zpGrid'+this.id+'Row'+oRow.i+'Fixed');if(oTr){oTr.className=oTr.className.replace(/ zpGridRowSelected[^ ]*/g,'');}}};Zapatec.Grid.prototype.visualizeSelectCell=function(oCell){if(!oCell){return;}
var oTd=document.getElementById('zpGrid'+this.id+'Row'+oCell.r+'Cell'+oCell.i);if(oTd){var aClSelected=[];aClSelected.push(' zpGridCellSelected zpGridCellSelected');aClSelected.push(oCell.i);aClSelected.push(' zpGridCellSelected');aClSelected.push(oCell.i%2==1?'Odd':'Even');if(oCell.i==this.fields.length-1){aClSelected.push(' zpGridCellSelectedLast');}
oTd.className+=aClSelected.join('');}};Zapatec.Grid.prototype.visualizeUnselectCell=function(oCell){if(!oCell){return;}
var oTd=document.getElementById('zpGrid'+this.id+'Row'+oCell.r+'Cell'+oCell.i);if(oTd){oTd.className=oTd.className.replace(/ zpGridCellSelected[^ ]*/g,'');}};Zapatec.Grid.prototype.visualizeFilterOut=function(oFilterOut,aVals){if(!oFilterOut){return;}
var oContr=Zapatec.Widget.getElementById(oFilterOut.container);if(!oContr){return;}
var aCols=oFilterOut.column;if(!(aCols instanceof Array)){aCols=[aCols];}
var aFields=[];for(var iCol=0;iCol<aCols.length;iCol++){var oField=this.fields[aCols[iCol]];if(!oField){continue;}
aFields.push(oField);}
if(!aFields.length){return;}
var sCols=aCols.join(',');var aHtml=[];aHtml.push('<div><a href="javascript:void(0)" onclick="Zapatec.Grid.checkboxSelectAllOnClick(\'');aHtml.push(this.id);aHtml.push("',[");aHtml.push(sCols);aHtml.push('])">');aHtml.push(this.getMessage('labelSelectAll'));aHtml.push('</a> | <a href="javascript:void(0)" onclick="Zapatec.Grid.checkboxClearAllOnClick(\'');aHtml.push(this.id);aHtml.push("',[");aHtml.push(sCols);aHtml.push('])">');aHtml.push(this.getMessage('labelClear'));aHtml.push('</a></div>');for(var iVal=0;iVal<aVals.length;iVal++){var sVal=aVals[iVal].v+'';var sEscaped=escape(sVal);aHtml.push('<div><input type="checkbox" ');for(var iField=0;iField<aFields.length;iField++){var oField=aFields[iField];if(!(oField.hiddenValues instanceof Array)||Zapatec.Utils.arrIndexOf(oField.hiddenValues,sVal)<0){aHtml.push('checked ');break;}}
aHtml.push('onclick="');if(oFilterOut.onclick){aHtml.push(oFilterOut.onclick);aHtml.push(';');}
aHtml.push("Zapatec.Grid.checkboxOnClick('");aHtml.push(this.id);aHtml.push("',[");aHtml.push(sCols);aHtml.push("],unescape('");aHtml.push(sEscaped);aHtml.push("'),this.checked)\" /><a href=\"javascript:void(0)\" onclick=\"Zapatec.Grid.checkboxLinkOnClick('");aHtml.push(this.id);aHtml.push("',[");aHtml.push(sCols);aHtml.push("],unescape('");aHtml.push(sEscaped);aHtml.push("'))\">");aHtml.push(sVal);aHtml.push('</a></div>');}
oContr.innerHTML=aHtml.join('');};Zapatec.Grid.prototype.getBusyContainer=function(){if(!this.container){return;}
var oContr=document.getElementById('zpGrid'+this.id+'BusyContainer');if(oContr){oContr.style.left=this.container.scrollLeft+'px';oContr.style.top=this.container.scrollTop+'px';oContr.style.width=Math.min(this.container.clientWidth,this.getGridDimensions().width)+'px';oContr.style.height=this.container.clientHeight+'px';}else{oContr=this.container;};return oContr;};Zapatec.Grid.prototype.displayLoading=function(){this.removeUpdating();Zapatec.Transport.showBusy({busyContainer:this.getBusyContainer()});};Zapatec.Grid.prototype.removeLoading=function(){Zapatec.Transport.removeBusy({busyContainer:this.getBusyContainer()});};Zapatec.Grid.prototype.displayUpdating=function(){var oConfig=this.config;if(!oConfig.dataOnDemand&&!oConfig.totals.length){var iFields=this.fields.length;if(this.totalRecords()*iFields<2500){if(this.recordsDisplayed()*iFields<250){return;}
var iRowsPerPage=oConfig.rowsPerPage;if(iRowsPerPage>0){if(iRowsPerPage*iFields<250){return;}}
var iVisibleRows=oConfig.visibleRows;if(iVisibleRows>0){if(iVisibleRows*iFields<250){return;}}}}
this.removeLoading();Zapatec.Transport.showBusy({busyContainer:this.getBusyContainer(),busyImage:'zpupdating.gif'});};Zapatec.Grid.prototype.removeUpdating=function(){Zapatec.Transport.removeBusy({busyContainer:this.getBusyContainer(),busyImage:'zpupdating.gif'});};Zapatec.Grid.prototype.getFieldElement=function(oField){if(oField){return document.getElementById('zpGrid'+this.id+'Field'+oField.i);}};Zapatec.Grid.prototype.getRowElement=function(oRow){if(oRow){return document.getElementById('zpGrid'+this.id+'Row'+oRow.i);}};Zapatec.Grid.prototype.getRowElementByCell=function(oCell){if(oCell){return document.getElementById('zpGrid'+this.id+'Row'+oCell.r);}};Zapatec.Grid.prototype.getCellElement=function(oCell){if(oCell){return document.getElementById('zpGrid'+this.id+'Row'+oCell.r+'Cell'+oCell.i);}};Zapatec.Grid.prototype.visualizeCellReadOnly=function(oCell){var iGridId=this.id;var oRow=this.getRowByCell(oCell);var iRowId=this.getRowId(oRow);var iCellId=this.getCellId(oCell);var sRowId='zpGrid'+iGridId+'Row'+iRowId;var oTr=document.getElementById(sRowId);var oTc=document.getElementById('zpGrid'+iGridId+'Col'+iCellId);var sCellId=sRowId+'Cell'+iCellId;var oTd=document.getElementById(sCellId);if(oTd){var aHtml=[];this.outputCellValue(aHtml,this.getFieldByCell(oCell),oCell);var sHtml=aHtml.join('');oTd.innerHTML=sHtml;var oTdHidden=document.getElementById(sCellId+'Hidden');if(oTdHidden){oTdHidden.innerHTML=sHtml;}
var bEditingCell;var oEditingCell=this.editingCell;if(oEditingCell&&this.getCellRowId(oEditingCell)==iRowId){bEditingCell=true;}
if(oTr){if(!bEditingCell){oTr.className=oTr.className.replace(/ zpGridRowEditable[^ ]*/g,'');}
oTr.className=oTr.className.replace(/ zpGridRowInvalid[^ ]*/g,'').split(/\s+/).join(' ');var oTrFixed=document.getElementById(sRowId+'Fixed');if(oTrFixed){if(!bEditingCell){oTrFixed.className=oTrFixed.className.replace(/zpGridRowEditable[^ ]*/g,'');}
oTrFixed.className=oTrFixed.className.replace(/zpGridRowInvalid[^ ]*/g,'').split(/\s+/).join(' ');}}else if(oTc){if(!bEditingCell){oTc.className=oTc.className.replace(/ zpGridColEditable[^ ]*/g,'');}
oTc.className=oTc.className.replace(/ zpGridColInvalid[^ ]*/g,'').split(/\s+/).join(' ');}
oTd.className=oTd.className.replace(/ zpGridCellEditable[^ ]*/g,'').replace(/ zpGridCellInvalid[^ ]*/g,'');if(!this.validateCell(oCell)){var aCl;if(oTr){aCl=[];aCl.push(' zpGridRowInvalid zpGridRowInvalid');aCl.push(iRowId);aCl.push(' zpGridRowInvalid');aCl.push(oTr.className.indexOf('zpGridRowOdd')>=0?'Odd':'Even');if(oTr.className.indexOf('zpGridRowLast')>=0){aCl.push(' zpGridRowInvalidLast');}
var sClass=aCl.join('');oTr.className+=sClass;if(oTrFixed){oTrFixed.className+=sClass;}}else if(oTc){aCl=[];aCl.push(' zpGridColInvalid zpGridColInvalid');aCl.push(iCellId);aCl.push(' zpGridColInvalid');aCl.push(oTc.className.indexOf('zpGridColOdd')>=0?'Odd':'Even');if(oTc.className.indexOf('zpGridColLast')>=0){aCl.push(' zpGridColInvalidLast');}
oTc.className+=aCl.join('');}
aCl=[];aCl.push(' zpGridCellInvalid zpGridCellInvalid');aCl.push(iCellId);aCl.push(' zpGridCellInvalid');aCl.push(iCellId%2==1?'Odd':'Even');if(oTd.className.indexOf('zpGridCellLast')>=0){aCl.push(' zpGridCellInvalidLast');}
oTd.className+=aCl.join('');}}};Zapatec.Grid.prototype.visualizeCellSavingResult=function(oArg){var oCell=oArg.cell;var sCellId=['zpGrid',this.getId(),'Row',this.getCellRowId(oCell),'Cell',this.getCellId(oCell)].join('');var oTd=document.getElementById(sCellId);if(!oTd){return;}
var bSaved=oArg.saved;var sClass=bSaved?' zpGridCellSaved':' zpGridCellNotSaved';oTd.className=[oTd.className,sClass].join('');setTimeout(function(){var oTd=document.getElementById(sCellId);if(oTd){oTd.className=oTd.className.replace(new RegExp(sClass,'g'),'');}},500);if(!bSaved&&!oArg.count){oArg.count=1;var oGrid=this;setTimeout(function(){oGrid.visualizeCellSavingResult(oArg);},1000);}};Zapatec.Grid.prototype.visualizeCellSaved=function(oArg){oArg.saved=true;this.visualizeCellSavingResult(oArg);};Zapatec.Grid.prototype.visualizeCellNotSaved=function(oArg){oArg.saved=false;this.visualizeCellSavingResult(oArg);};Zapatec.Grid.prototype.autoresize=function(){var oBorder=this.border;if(!oBorder){return;}
var oFitInto=this.fitInto;if(!oFitInto){return;}
if(this.refreshState){this.autoresizeState=0;return;}
if(!this.autoresizeState){this.autoresizeState=0;}else if(this.autoresizeState>2){this.autoresizeState=0;return;}
oFitInto.style.overflow='hidden';var fOffset=Zapatec.Utils.getElementOffset;var oContainerOffset=fOffset(oFitInto);var iHeight=oContainerOffset.height;var iWidth=oContainerOffset.width;var bRefresh=false;var oContainerStyle=this.container.style;var sWidth=iWidth+'px';if(oContainerStyle.width!=sWidth){oContainerStyle.width=sWidth;bRefresh=true;}
var iGridWidth=this.getGridDimensions().width;if(/Safari/i.test(navigator.userAgent)){if(iGridWidth&&iGridWidth<iWidth){oContainerStyle.overflow='hidden';}else{oContainerStyle.overflow='auto';}}else{if(iGridWidth&&iGridWidth<iWidth){oContainerStyle.overflowX='hidden';oContainerStyle.overflowY='hidden';oContainerStyle.overflow='hidden';}else{oContainerStyle.overflow='scroll';oContainerStyle.overflowX='scroll';oContainerStyle.overflowY='hidden';}}
var iGridHeight=fOffset(oBorder).height;if(iHeight!=iGridHeight){var iAvgRowHeight=0;var aRows=this.applyPaging();var iRowsPerPage=aRows.length;var sId=this.id.toString();var fOffset=Zapatec.Utils.getElementOffset;for(var iRow=0;iRow<iRowsPerPage;iRow++){iAvgRowHeight+=fOffset(document.getElementById(['zpGrid',sId,'Row',this.getRowId(aRows[iRow]),'Cell0'].join(''))).height;}
iAvgRowHeight/=iRowsPerPage;while(iHeight<iGridHeight){iGridHeight-=iAvgRowHeight;iRowsPerPage--;}
while(iHeight>iGridHeight){iGridHeight+=iAvgRowHeight;iRowsPerPage++;}
if(iHeight<iGridHeight){iRowsPerPage--;}
if(iRowsPerPage<1){iRowsPerPage=1;}
var oAutoresizeFrame=this.autoresizeFrame;if(iRowsPerPage!=oAutoresizeFrame.visibleRows){if(oAutoresizeFrame.direction==-1){oAutoresizeFrame.currentRow+=oAutoresizeFrame.visibleRows;oAutoresizeFrame.currentRow-=iRowsPerPage;}
oAutoresizeFrame.visibleRows=iRowsPerPage;this.currentPage=Math.ceil(oAutoresizeFrame.currentRow/oAutoresizeFrame.visibleRows);this.autoresizeState++;this.refresh();return;}}
if(bRefresh){this.autoresizeState=3;this.refresh();return;}
this.autoresizeState=0;};Zapatec.Grid.columnResizing=false;Zapatec.Grid.onColResizStart=function(oArg){if(!oArg){return;}
var oEl=oArg.el;if(!oEl||!oEl.id){return;}
var aM=oEl.id.match(/^zpGrid(\d+)(Col|Span)(\d+)Resize$/);if(!(aM instanceof Array)||aM.length<4){return;}
var iGrid=aM[1];var oGrid=Zapatec.Widget.getWidgetById(iGrid);if(!(oGrid instanceof Zapatec.Grid)){return;}
var sGrid=['zpGrid',iGrid].join('');var iColId=aM[3];var oSt=oEl.style;var oUtils=Zapatec.Utils;var oOffsetEl=oUtils.getElementOffset(oEl);var oOffsetCont=oUtils.getElementOffset(oGrid.headerContainer||oGrid.container);var oOffsetContScroll=oUtils.getElementOffsetScrollable(oGrid.headerContainer||oGrid.container);var iPH=0;if(!oGrid.paginationContainers.length){var oPC=document.getElementById([sGrid,'Pagination'].join(''));if(oPC){iPH=oPC.offsetHeight;}}
if(oOffsetEl.top!=oOffsetCont.top){oSt.top=oOffsetCont.top-oOffsetEl.top+'px';}
var iH=oOffsetCont.height;if(!oGrid.headerContainer){iH-=iPH;}
oSt.height=iH+'px';oEl.className='zpGridColResize';oEl=document.getElementById([sGrid,'DataColResize'].join(''));if(oEl){oSt=oEl.style;oSt.left=oOffsetEl.left-oOffsetContScroll.left+'px';iH=oEl.parentNode.offsetHeight-iPH;oSt.height=iH+'px';oSt.display='';}
oEl=document.getElementById([sGrid,'TotalsColResize'].join(''));if(oEl){oSt=oEl.style;oSt.left=oOffsetEl.left-oOffsetContScroll.left+'px';oSt.height=oEl.parentNode.offsetHeight+'px';oSt.display='';}
oEl=document.getElementById([sGrid,'Col',iColId,'Title'].join(''));if(!oEl){return;}
if(oEl.zpTimeout){clearTimeout(oEl.zpTimeout);oEl.zpTimeout=null;}
oEl=oEl.parentNode;if(!oEl){return;}
oEl=oEl.parentNode;if(!oEl){return;}
if(oEl.onclick){oEl.zpOnclick=oEl.onclick;oEl.onclick=null;}
Zapatec.Grid.columnResizing=true;};Zapatec.Grid.onColResizMove=function(oArg){if(!oArg){return;}
var oEl=oArg.el;if(!oEl||!oEl.id){return;}
var aM=oEl.id.match(/^zpGrid(\d+)(Col|Span)(\d+)Resize$/);if(!(aM instanceof Array)||aM.length<4){return;}
var iGrid=aM[1];var sGrid=['zpGrid',iGrid].join('');var iOffset=oArg.left-oArg.prevLeft;var oSt;oEl=document.getElementById([sGrid,'DataColResize'].join(''));if(oEl){oSt=oEl.style;oSt.left=parseInt(oSt.left)+iOffset+'px';}
oEl=document.getElementById([sGrid,'TotalsColResize'].join(''));if(oEl){oSt=oEl.style;oSt.left=parseInt(oSt.left)+iOffset+'px';}};Zapatec.Grid.onColResizEnd=function(oArg){if(!oArg){return;}
var oEl=oArg.el;if(!oEl||!oEl.id){return;}
var aM=oEl.id.match(/^zpGrid(\d+)(Col|Span)(\d+)Resize$/);if(!(aM instanceof Array)||aM.length<4){return;}
Zapatec.Grid.columnResizing=false;var iGrid=aM[1];var oGrid=Zapatec.Widget.getWidgetById(iGrid);if(!oGrid){return;}
var sGrid=['zpGrid',iGrid].join('');var iColId=aM[3];var sTitle=[sGrid,'Col',iColId,'Title'].join('');var oSt=oEl.style;oEl.className='zpGridColResizeHidden';oSt.top='';oSt.height='';var oDiv=document.getElementById([sGrid,'DataColResize'].join(''));var oDivSt;if(oDiv){oDivSt=oDiv.style;oDivSt.display='none';oDivSt.left='';oDivSt.height='';}
oDiv=document.getElementById([sGrid,'TotalsColResize'].join(''));if(oDiv){oDivSt=oDiv.style;oDivSt.display='none';oDivSt.left='';oDivSt.height='';}
var oTitle=document.getElementById(sTitle);if(!oTitle){return;}
var iShift=oArg.left-oArg.startLeft;if(iShift){oSt.left='';var iWidth=oTitle.offsetWidth+iShift;if(iWidth<10){iWidth=10;}
oGrid.outSetColWidth(iColId,iWidth);oDiv=document.getElementById([sGrid,'Container'].join(''));if(oDiv){oDiv.style.width=oGrid.getGridDimensions().width+'px';}}
oTitle.zpTimeout=setTimeout(function(){var oEl=document.getElementById(sTitle);if(!oEl){return;}
oEl.zpTimeout=null;oEl=oEl.parentNode;if(!oEl){return;}
oEl=oEl.parentNode;if(!oEl){return;}
if(oEl.zpOnclick){oEl.onclick=oEl.zpOnclick;oEl.zpOnclick=null;}
Zapatec.Widget.callMethod(iGrid,'fireEvent','gridResizedColumn',iColId,iShift);},0);};Zapatec.EventDriven.addEventListener('dragStart',Zapatec.Grid.onColResizStart);Zapatec.EventDriven.addEventListener('dragMove',Zapatec.Grid.onColResizMove);Zapatec.EventDriven.addEventListener('dragEnd',Zapatec.Grid.onColResizEnd);Zapatec.Grid.mouseSelection=false;Zapatec.Grid.mouseOverCell='';Zapatec.Grid.prototype.mouseSelect=function(iRow,iCell){var oEv=window.event;var iButton=oEv.button||oEv.which;if(iButton!=1){return;}
var oUtils=Zapatec.Utils;var sTdId=['zpGrid',this.id,'Row',iRow,'Cell',iCell].join('');var oTd=document.getElementById(sTdId);if(!oTd){return;}
var oBody=document.body;if(!oBody){return;}
var sId=[sTdId,'Select'].join('');var oEl=document.createElement('div');var oSt=oEl.style;oBody.appendChild(oEl);oSt.position='absolute';oSt.width='0px';oSt.height='0px';oSt.padding='0px';oSt.margin='0px';oEl.className=this.getClassName({prefix:'zpGrid',suffix:'MouseSelection'});var oPos=oUtils.getMousePos(oEv);oSt.left=oPos.pageX+'px';oSt.top=oPos.pageY+'px';oSt.visibility='hidden';oEl.id=sId;Zapatec.Drag.start(oEv,sId,{resize:true});};Zapatec.Grid.onMouseSelStart=function(oArg){};Zapatec.Grid.onMouseSelMove=function(oArg){if(!oArg){return;}
var oEl=oArg.el;if(!oEl||!oEl.id){return;}
var aM=oEl.id.match(/^((zpGrid\d+Row\d+)Cell\d+)Select$/);if(!(aM instanceof Array)||aM.length<3){return;}
var oSt=oEl.style;if(oSt.visibility=='hidden'){oEl=document.getElementById(aM[1]);if(oEl){oEl.onmouseout();}
oEl=document.getElementById(aM[2]);if(oEl){oEl.onmouseout();}
oSt.visibility='visible';var oGridClass=Zapatec.Grid;oGridClass.mouseSelection=true;oGridClass.mouseOverCell='';}};Zapatec.Grid.onMouseSelEnd=function(oArg){if(!oArg){return;}
var oEl=oArg.el;if(!oEl||!oEl.id){return;}
var aM=oEl.id.match(/^zpGrid(\d+)Row(\d+)Cell(\d+)Select$/);if(!(aM instanceof Array)||aM.length<4){return;}
oEl.parentNode.removeChild(oEl);var oGridClass=Zapatec.Grid;oGridClass.mouseSelection=false;var iGrid=aM[1];var oGrid=Zapatec.Widget.getWidgetById(iGrid);if(!oGrid){return;}
var iOrigRow=aM[2];var iOrigCell=aM[3];aM=oGridClass.mouseOverCell.match(/^zpGrid(\d+)Row(\d+)Cell(\d+)/);if(!(aM instanceof Array)||aM.length<4){return;}
if(aM[1]!=iGrid){return;}
var iTargRow=aM[2];var iTargCell=aM[3];var aRows=oGrid.applyPaging();var iRows=aRows.length;var aFields=oGrid.fields;var iFields=aFields.length;var iR,oR,iRI;for(iR=0;iRows--;iR++){oR=aRows[iR];if(oR){iRI=oR.i;if(iRI==iOrigRow){iOrigRow=-1;break;}
if(iRI==iTargRow){iTargRow=-1;break;}}}
if(!++iRows){return;}
var aCells=oR.cells;var iC,oC,iCI;for(iC=0;iFields--;iC++){oC=aCells[iC];if(oC){iCI=oC.i;if(iCI==iOrigCell){iOrigCell=-1;break;}
if(iCI==iTargCell){iTargCell=-1;break;}}}
if(!++iFields){return;}
var iFirstCell=iC;var iCells,oF;for(;iRows--;iR++){oR=aRows[iR];if(oR){oGrid.selectRow(oR);aCells=oR.cells;iCells=iFields;for(iC=iFirstCell;iCells--;iC++){oF=aFields[iC];if(oF&&!oF.hidden){oC=aCells[iC];if(oC){oGrid.selectCell(oC);iCI=oC.i;if(iCI==iOrigCell||iCI==iTargCell){break;}}}}
iRI=oR.i;if(iRI==iOrigRow||iRI==iTargRow){break;}}}};Zapatec.EventDriven.addEventListener('dragStart',Zapatec.Grid.onMouseSelStart);Zapatec.EventDriven.addEventListener('dragMove',Zapatec.Grid.onMouseSelMove);Zapatec.EventDriven.addEventListener('dragEnd',Zapatec.Grid.onMouseSelEnd);Zapatec.Grid.draggingCell='';Zapatec.Grid.prototype.dragCell=function(iRow,iCell){var sTdId=['zpGrid',this.id,'Row',iRow,'Cell',iCell].join('');var oUtils=Zapatec.Utils;var oGridClass=Zapatec.Grid;oGridClass.draggingCell=sTdId;oUtils.addEvent(document,'mousemove',oGridClass.dragCellStart);oUtils.addEvent(document,'mouseup',oGridClass.dragCellFalse);};Zapatec.Grid.dragCellStart=function(){var oUtils=Zapatec.Utils;var oGridClass=Zapatec.Grid;oUtils.removeEvent(document,'mousemove',oGridClass.dragCellStart);oUtils.removeEvent(document,'mouseup',oGridClass.dragCellFalse);var sTdId=oGridClass.draggingCell;var oTd=document.getElementById(sTdId);if(!oTd){return;}
var oDiv=document.getElementById([sTdId,'Div'].join(''));if(!oDiv){return;}
var sId=[sTdId,'Drag'].join('');var oEl=document.createElement('div');var oSt=oEl.style;oTd.appendChild(oEl);oSt.position='absolute';oEl.className=oDiv.className;oEl.innerHTML=oDiv.innerHTML;oEl.id=sId;var oEv=window.event;var iElTop=oUtils.getElementOffset(oEl).top;var iEvTop=oUtils.getMousePos(oEv).pageY;if(iElTop<iEvTop){oSt.top=oEl.offsetTop+iEvTop-iElTop+1+'px';}
Zapatec.Drag.start(oEv,sId);};Zapatec.Grid.dragCellFalse=function(){var oUtils=Zapatec.Utils;var oGridClass=Zapatec.Grid;oUtils.removeEvent(document,'mousemove',oGridClass.dragCellStart);oUtils.removeEvent(document,'mouseup',oGridClass.dragCellFalse);};Zapatec.Grid.onCellDragStart=function(oArg){};Zapatec.Grid.onCellDragMove=function(oArg){};Zapatec.Grid.onCellDragEnd=function(oArg){if(!oArg){return;}
var oEl=oArg.el;if(!oEl||!oEl.id){return;}
var aM=oEl.id.match(/^zpGrid(\d+)Row(\d+)Cell(\d+)Drag$/);if(!(aM instanceof Array)||aM.length<4){return;}
var iGrid=aM[1];var oGrid=Zapatec.Widget.getWidgetById(iGrid);if(!oGrid){return;}
var oCell=oGrid.getCellById(aM[2],aM[3]);if(!oCell){return;}
oEl.style.display='none';setTimeout(function(){oEl.parentNode.removeChild(oEl);},0);var oEv=oArg.event;var oTarget=oEv.target||oEv.srcElement;if(!oTarget||!oTarget.id){return;}
aM=oTarget.id.match(/^zpGrid(\d+)Row(\d+)Cell(\d+)/);if(!(aM instanceof Array)||aM.length<4){return;}
if(aM[1]!=iGrid){return;}
var iTargetCell=aM[3];var oTargetCell=oGrid.getCellById(aM[2],iTargetCell);if(!oTargetCell){return;}
oGrid.setCellValue(oTargetCell,oCell.v);oGrid.visualizeCellReadOnly(oTargetCell);oGrid.redrawTotals({column:iTargetCell});oGrid.displayFilterOut();};Zapatec.EventDriven.addEventListener('dragStart',Zapatec.Grid.onCellDragStart);Zapatec.EventDriven.addEventListener('dragMove',Zapatec.Grid.onCellDragMove);Zapatec.EventDriven.addEventListener('dragEnd',Zapatec.Grid.onCellDragEnd);Zapatec.Grid.draggingColumn='';Zapatec.Grid.prototype.dragColumn=function(iField){if(Zapatec.Grid.columnResizing){return;}
var sTdId=['zpGrid',this.id,'Field',iField].join('');var oUtils=Zapatec.Utils;var oGridClass=Zapatec.Grid;oGridClass.draggingColumn=sTdId;oUtils.addEvent(document,'mousemove',oGridClass.dragColumnStart);oUtils.addEvent(document,'mouseup',oGridClass.dragColumnFalse);};Zapatec.Grid.dragColumnStart=function(){var oUtils=Zapatec.Utils;var oGridClass=Zapatec.Grid;oUtils.removeEvent(document,'mousemove',oGridClass.dragColumnStart);oUtils.removeEvent(document,'mouseup',oGridClass.dragColumnFalse);var sTdId=oGridClass.draggingColumn;var oTd=document.getElementById(sTdId);if(!oTd){return;}
var oDiv=document.getElementById([sTdId.replace(/Field/,'Col'),'Title'].join(''));if(!oDiv){return;}
var sId=[sTdId,'Drag'].join('');var oEl=document.createElement('div');var oSt=oEl.style;oTd.appendChild(oEl);oSt.position='absolute';oEl.className=oDiv.className;oEl.innerHTML=oDiv.innerHTML;oEl.id=sId;var oEv=window.event;var iElTop=oUtils.getElementOffset(oEl).top;var iEvTop=oUtils.getMousePos(oEv).pageY;if(iElTop<iEvTop){oSt.top=oEl.offsetTop+iEvTop-iElTop+1+'px';}
Zapatec.Drag.start(oEv,sId);};Zapatec.Grid.dragColumnFalse=function(){var oUtils=Zapatec.Utils;var oGridClass=Zapatec.Grid;oUtils.removeEvent(document,'mousemove',oGridClass.dragColumnStart);oUtils.removeEvent(document,'mouseup',oGridClass.dragColumnFalse);};Zapatec.Grid.onColumnDragStart=function(oArg){};Zapatec.Grid.onColumnDragMove=function(oArg){};Zapatec.Grid.onColumnDragEnd=function(oArg){if(!oArg){return;}
var oEl=oArg.el;if(!oEl||!oEl.id){return;}
var aM=oEl.id.match(/^zpGrid(\d+)Field(\d+)Drag$/);if(!(aM instanceof Array)||aM.length<3){return;}
var iGrid=aM[1];var oGrid=Zapatec.Widget.getWidgetById(iGrid);if(!oGrid){return;}
var iField=aM[2];oEl.style.display='none';setTimeout(function(){oEl.parentNode.removeChild(oEl);},0);var oEv=oArg.event;var oTarget=oEv.target||oEv.srcElement;if(!oTarget||!oTarget.id){return;}
aM=oTarget.id.match(/^zpGrid(\d+)Field(\d+)/);if(!(aM instanceof Array)||aM.length<3){aM=oTarget.id.match(/^zpGrid(\d+)Col(\d+)/);if(!(aM instanceof Array)||aM.length<3){return;}}
if(aM[1]!=iGrid){return;}
var bSuccess=oGrid.moveColumn({fieldId:iField,position:aM[2]});if(bSuccess){oGrid.displayFilterOut();}};Zapatec.EventDriven.addEventListener('dragStart',Zapatec.Grid.onColumnDragStart);Zapatec.EventDriven.addEventListener('dragMove',Zapatec.Grid.onColumnDragMove);Zapatec.EventDriven.addEventListener('dragEnd',Zapatec.Grid.onColumnDragEnd);Zapatec.Grid.aggregate=function(oArg){if(!oArg||typeof oArg.aggregate!='function'){return;}
var oGrid=oArg.grid;if(!(oGrid instanceof Zapatec.Grid)){return;}
var aFields=oGrid.getFields();var aColumns=[];oArg.totals=[];if(oArg.column instanceof Array){for(var iCol=0;iCol<oArg.column.length;iCol++){var iColId=oArg.column[iCol];if(typeof aFields[iColId]!='undefined'){aColumns.push(iColId);oArg.totals[iColId]=0;}}}else if(typeof aFields[oArg.column]!='undefined'){aColumns.push(oArg.column);oArg.totals[oArg.column]=0;}
if(!aColumns.length){return;}
oArg.column=aColumns;if((oArg.rows instanceof Array)&&oArg.rows.length){oArg.aggregate(oArg);}
var iLabelColumn;if(typeof oArg.labelColumn!='undefined'&&typeof aFields[oArg.labelColumn]!='undefined'){iLabelColumn=oArg.labelColumn;}
var sPrefix='';if(typeof iLabelColumn=='undefined'&&oArg.label){sPrefix=oArg.label+' ';}
oResult={rows:[{cells:[]}]};for(var iCol=0;iCol<aFields.length;iCol++){var val=oArg.totals[iCol];if(typeof val=='undefined'){val='';}else{val=sPrefix+val;}
oResult.rows[0].cells.push({v:val});}
if(typeof iLabelColumn!='undefined'&&oArg.label){oResult.rows[0].cells[iLabelColumn].v=oArg.label;}
return oResult;};Zapatec.Grid.sum=function(oArg){oArg.aggregate=Zapatec.Grid.aggregateSum;if(typeof oArg.label=='undefined'){oArg.label='Total:'}
return Zapatec.Grid.aggregate(oArg);};Zapatec.Grid.aggregateSum=function(oArg){var oGrid=oArg.grid;var aPrecisions=oArg.totals.slice();var aRows=oArg.rows;var iRows=aRows.length;var aColumns=oArg.column;var iColumns=aColumns.length;for(var iRow=0;iRow<iRows;iRow++){var oRow=aRows[iRow];for(var iCol=0;iCol<iColumns;iCol++){var iColId=aColumns[iCol];var val=oGrid.getCellValueOriginal(oGrid.getCellByRow(oRow,iColId));var iVal=val*1;if(!isNaN(iVal)){var iPrecision=Zapatec.Utils.getPrecision(val);if(iPrecision>aPrecisions[iColId]){aPrecisions[iColId]=iPrecision;}
oArg.totals[iColId]=Zapatec.Utils.setPrecision(oArg.totals[iColId]+
iVal,aPrecisions[iColId]);}}}
for(var iCol=0;iCol<iColumns;iCol++){var iColId=aColumns[iCol];oArg.totals[iColId]=Zapatec.Utils.setPrecisionString(oArg.totals[iColId],aPrecisions[iColId]);}};Zapatec.Grid.avg=function(oArg){oArg.aggregate=Zapatec.Grid.aggregateAvg;if(typeof oArg.label=='undefined'){oArg.label='AVG:'}
return Zapatec.Grid.aggregate(oArg);};Zapatec.Grid.aggregateAvg=function(oArg){Zapatec.Grid.aggregateSum(oArg);var iRows=oArg.rows.length;for(var iCol=0;iCol<oArg.column.length;iCol++){var iColId=oArg.column[iCol];var iPrecision=Zapatec.Utils.getPrecision(oArg.totals[iColId]);var fAvg=oArg.totals[iColId]/iRows;oArg.totals[iColId]=Zapatec.Utils.setPrecisionString(fAvg,iPrecision);}};Zapatec.Grid.min=function(oArg){oArg.aggregate=Zapatec.Grid.aggregateCompare;oArg.sign='<';if(typeof oArg.label=='undefined'){oArg.label='Min:'}
return Zapatec.Grid.aggregate(oArg);};Zapatec.Grid.max=function(oArg){oArg.aggregate=Zapatec.Grid.aggregateCompare;oArg.sign='>';if(typeof oArg.label=='undefined'){oArg.label='Max:'}
return Zapatec.Grid.aggregate(oArg);};Zapatec.Grid.aggregateCompare=function(oArg){var oGrid=oArg.grid;var oRow=oArg.rows[0];for(var iCol=0;iCol<oArg.column.length;iCol++){var iColId=oArg.column[iCol];oArg.totals[iColId]=oGrid.getCellByRow(oRow,iColId);}
for(var iRow=0;iRow<oArg.rows.length;iRow++){oRow=oArg.rows[iRow];for(var iCol=0;iCol<oArg.column.length;iCol++){var iColId=oArg.column[iCol];var oCell=oGrid.getCellByRow(oRow,iColId);if(eval('oGrid.getCellValueCompare(oCell)'+oArg.sign+'oGrid.getCellValueCompare(oArg.totals[iColId])')){oArg.totals[iColId]=oCell;}}}
for(var iCol=0;iCol<oArg.column.length;iCol++){var iColId=oArg.column[iCol];oArg.totals[iColId]=oGrid.getCellValue(oArg.totals[iColId]);}};Zapatec.Grid.count=function(oArg){oArg.aggregate=Zapatec.Grid.aggregateCount;if(typeof oArg.label=='undefined'){oArg.label='Count:'}
return Zapatec.Grid.aggregate(oArg);};Zapatec.Grid.aggregateCount=function(oArg){var oGrid=oArg.grid;var iRows=oArg.rows.length;for(var iCol=0;iCol<oArg.column.length;iCol++){oArg.totals[oArg.column[iCol]]=iRows;}};Zapatec.Grid.countDistinct=function(oArg){oArg.aggregate=Zapatec.Grid.aggregateCountDistinct;if(typeof oArg.label=='undefined'){oArg.label='Distinct:'}
return Zapatec.Grid.aggregate(oArg);};Zapatec.Grid.aggregateCountDistinct=function(oArg){var oGrid=oArg.grid;var aDistinct=[];for(var iCol=0;iCol<oArg.column.length;iCol++){aDistinct[iCol]={};}
for(var iRow=0;iRow<oArg.rows.length;iRow++){var oRow=oArg.rows[iRow];for(var iCol=0;iCol<oArg.column.length;iCol++){var iColId=oArg.column[iCol];var sVal=oGrid.getCellValueString(oGrid.getCellByRow(oRow,iColId));if(typeof aDistinct[iCol][sVal]=='undefined'){aDistinct[iCol][sVal]=true;oArg.totals[iColId]++;}}}};Zapatec.Grid.prototype.getTotals=function(){var aTotalsRules=this.totalsRules;var iTotalsRules=aTotalsRules.length;var aTotals=[];for(var iTotal=0;iTotal<iTotalsRules;iTotal++){var oTotal=aTotalsRules[iTotal];if(typeof oTotal.callback!='function'){oTotal.callback=Zapatec.Grid.sum;}
var oResult=oTotal.callback({grid:this,rows:this.getFilteredRows(),column:oTotal.column,label:oTotal.label,labelColumn:oTotal.labelColumn});if(oResult&&(oResult.rows instanceof Array)){for(var iRow=0;iRow<oResult.rows.length;iRow++){aTotals.push(oResult.rows[iRow]);}}}
return aTotals;};Zapatec.Grid.prototype.outputTotals=function(aHtml,aCols,aFixedCols,aRows,bFixed){if(typeof this.config.callbackTotalsDisplay=='function'||typeof this.config.callbackTotalDisplay=='function'||!aRows){return;}
if(this.config.horizontal){this.outputTotalsHoriz(aHtml,aCols,aFixedCols,aRows,bFixed);}else{this.outputTotalsVert(aHtml,aCols,aFixedCols,aRows,bFixed);}};Zapatec.Grid.prototype.outputTotalsHoriz=function(aHtml,aCols,aFixedCols,aRows,bFixed){if(bFixed){aCols=aFixedCols;}
for(var iCol=0;iCol<aCols.length;iCol++){var oField=aCols[iCol];var aCl=[];aCl.push('zpGridCol zpGridCol');aCl.push(iCol);if(iCol%2==1){aCl.push(' zpGridColOdd');}else{aCl.push(' zpGridColEven');}
if(iCol==aCols.length-1){aCl.push(' zpGridColLast');}
var sClass=aCl.join('');var aTr=[];aTr.push('<tr id="zpGrid');aTr.push(this.id);aTr.push('TotalCol');aTr.push(oField.i);if(bFixed){aTr.push('Fixed');}
aTr.push('" class="');aTr.push(sClass);aTr.push('">');if(bFixed){for(var iRow=0;iRow<aRows.length;iRow++){this.outputTotalsCell(aTr,oField,aRows[iRow],iCol,iRow,aRows.length);}}else{for(var iRow=0;iRow<aRows.length;iRow++){var bHidden=(iCol<aFixedCols.length);this.outputTotalsCell(aTr,oField,aRows[iRow],iCol,iRow,aRows.length,bHidden);}}
aTr.push('</tr>');aHtml.push(aTr.join(''));}};Zapatec.Grid.prototype.outputTotalsVert=function(aHtml,aCols,aFixedCols,aRows,bFixed){for(var iRow=0;iRow<aRows.length;iRow++){var oRow=aRows[iRow];if(!oRow){return;}
var aCl=[];aCl.push('zpGridRow zpGridRowTotals zpGridRowTotals');aCl.push(iRow);aCl.push(' zpGridRowTotals');aCl.push(iRow%2==1?'Odd':'Even');if(iRow==aRows.length-1){aCl.push(' zpGridRowLast zpGridRowTotalsLast');}
var sClass=aCl.join('');var aTr=[];aTr.push('<tr id="zpGrid');aTr.push(this.id);aTr.push('Total');aTr.push(iRow);if(bFixed){aTr.push('Fixed');}
aTr.push('" class="');aTr.push(sClass);aTr.push('" style="');if(oRow.style){aTr.push(oRow.style);}
aTr.push('">');if(bFixed){for(var iCol=0;iCol<aFixedCols.length;iCol++){this.outputTotalsCell(aTr,aFixedCols[iCol],oRow,iRow,iCol,aCols.length);}}else{for(var iCol=0;iCol<aCols.length;iCol++){var bHidden=(iCol<aFixedCols.length);this.outputTotalsCell(aTr,aCols[iCol],oRow,iRow,iCol,aCols.length,bHidden);}}
aTr.push('</tr>');aHtml.push(aTr.join(''));}};Zapatec.Grid.prototype.outputTotalsCell=function(aTr,oField,oRow,iRow,iCol,iCols,bHidden){if(iCol>=this.config.fixedLeft&&iCol<this.currentHorizontalOffset+this.config.fixedLeft){return;}
if(this.config.visibleColumns){bHidden=false;}
var oCell=oRow.cells[oField.i];if(!oCell){return;}
var aCl=[];aCl.push('zpGridCell zpGridCell');aCl.push(iCol);aCl.push(' zpGridColId');aCl.push(oField.i);aCl.push(' zpGridCellData zpGridCellData');aCl.push(iCol);aCl.push(' zpGridCellTotals zpGridCellTotals');aCl.push(iCol);if(iCol%2==1){aCl.push(' zpGridCellOdd zpGridCellDataOdd zpGridCellTotalsOdd');}else{aCl.push(' zpGridCellEven zpGridCellDataEven zpGridCellTotalsEven');}
if(iCol+1==iCols){aCl.push(' zpGridCellLast zpGridCellDataLast zpGridCellTotalsLast');}
var sClass=aCl.join('');var aTd=[];aTd.push('<td class="');aTd.push(sClass);aTd.push('" id="zpGrid');aTd.push(this.id);aTd.push('Total');if(this.config.horizontal){aTd.push(iCol);}else{aTd.push(iRow);}
aTd.push('Cell');aTd.push(oField.i);if(bHidden){aTd.push('Hidden');}
var sStyle=this.getCellStyle(oCell,iRow);if(sStyle){aTd.push('" style="');aTd.push(sStyle);}
aTd.push('">');this.outputTotalsCellValue(aTd,oField,oRow,oCell);aTd.push('</td>');aTr.push(aTd.join(''));};Zapatec.Grid.prototype.outputTotalsCellValue=function(aTd,oField,oRow,oCell){aTd.push('<div class="zpGridDiv');if(this.getClassByType){aTd.push(' ');aTd.push(this.getClassByType(this.getFieldType(oField)));}
aTd.push('">');var sData=oCell.v+'';if(!sData||!sData.length){sData='&nbsp;';}
aTd.push(sData);aTd.push('</div>');};Zapatec.Grid.prototype.redrawTotals=function(oArg){if(this.visualize){var aTotals=this.getTotals();if(!aTotals){return;}
var aFields=this.getFields();var iGridId=this.id;for(var iTotal=0;iTotal<aTotals.length;iTotal++){var oRow=aTotals[iTotal];for(var iField=0;iField<aFields.length;iField++){var sCellId='zpGrid'+iGridId+'Total'+iTotal+'Cell'+iField;var oTd=document.getElementById(sCellId);if(oTd){var aTd=[];this.outputCellValue(aTd,aFields[iField],oRow.cells[iField]);var sTd=aTd.join('');oTd.innerHTML=sTd;var oTdHidden=document.getElementById(sCellId+'Hidden');if(oTdHidden){oTdHidden.innerHTML=sTd;}}}}}};
Zapatec.Utils.addEvent(window, 'load', Zapatec.Utils.checkActivation);
