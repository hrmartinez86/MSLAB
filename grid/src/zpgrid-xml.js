/**
 * @fileoverview Plugin for Zapatec Grid to input grid data from XML source.
 *
 * <pre>
 * Copyright (c) 2004-2006 by Zapatec, Inc.
 * http://www.zapatec.com
 * 1700 MLK Way, Berkeley, California,
 * 94709, U.S.A.
 * All rights reserved.
 * </pre>
 */

/* $Id: zpgrid-xml.js 7649 2007-08-03 14:15:03Z alex $ */

/**
 * Loads data from XML source.
 *
 * @private
 * @param {object} oDoc Input XMLDocument object.
 */
Zapatec.Grid.prototype.loadDataXml = function(oDoc) {
	// Check arguments
	if (!oDoc) {
		return;
	}
	var oDocEl = oDoc.documentElement;
	if (!oDocEl) {
		return;
	}
	var oUtils = Zapatec.Utils;
	var fFC = oUtils.getFirstChild;
	var oTable = fFC(oDocEl, 'table');
	if (!oTable) {
		return;
	}
	var oFields = fFC(oTable, 'fields');
	if (!oFields) {
		return;
	}
	// Remove old data
	var oData = this.data = this.newDataXml(oTable);
	var aFields = this.fields = oData.fields;
	this.rows = oData.rows;
	this.rowsIndex = [];
	// Set primary key column
	this.primaryKeyColumn = oData.primaryKey;
	// Set page
	if (typeof oData.currentPage != 'undefined') {
		this.setCurrentPage(oData.currentPage);
	} else {
		this.setCurrentPage(0);
	}
	// Get fields
	var oCell = fFC(oFields, 'field');
	var fNext = oUtils.getNextSibling;
	while (oCell) {
		// Add field
		aFields.push(this.newFieldXml(oCell));
		// Next field
		oCell = fNext(oCell, 'field');
	}
	// Get rows
	var oRows = fFC(oTable, 'rows');
	if (oRows) {
		// Append rows
		oDocEl.setAttribute('norefresh', 'true');
		this.spliceXml(oDoc);
	}
	// Show grid
	this.show();
};

/**
 * Creates new data object from XML source.
 *
 * @private
 * @param {object} oTable Source object
 * @return Data object
 * @type object
 */
Zapatec.Grid.prototype.newDataXml = function(oTable) {
	// Create data object
	var oData = {
		fields: [],
		rows: []
	};
	// Get attributes
	var sStyle = oTable.getAttribute('style');
	if (sStyle) {
		oData.style = sStyle;
	}
	var sHeaderStyle = oTable.getAttribute('headerstyle');
	if (!sHeaderStyle) {
		// For backward compatibility
		sHeaderStyle = oTable.getAttribute('headerStyle');
	}
	if (sHeaderStyle) {
		oData.headerStyle = sHeaderStyle;
	}
	var sPrimaryKey = oTable.getAttribute('primarykey');
	if (sPrimaryKey) {
		oData.primaryKey = sPrimaryKey;
	}
	var sTotalRows = oTable.getAttribute('totalrows');
	if (!sTotalRows) {
		// For backward compatibility
		sTotalRows = oTable.getAttribute('totalRows');
	}
	if (sTotalRows) {
		// Convert to number
		oData.totalRows = sTotalRows * 1;
	}
	var sDisplayedRows = oTable.getAttribute('displayedrows');
	if (!sDisplayedRows) {
		// For backward compatibility
		sDisplayedRows = oTable.getAttribute('displayedRows');
	}
	if (sDisplayedRows) {
		// Convert to number
		oData.displayedRows = sDisplayedRows * 1;
	}
	var sCurrentPage = oTable.getAttribute('currentpage');
	if (!sCurrentPage) {
		// For backward compatibility
		sCurrentPage = oTable.getAttribute('currentPage');
	}
	if (sCurrentPage) {
		// Convert to number
		oData.currentPage = sCurrentPage * 1;
	}
	return oData;
};

/**
 * Returns child text of the first child with a specified tag of the given
 * parent element.
 *
 * @private
 * @param {object} oParent Parent element
 * @param {string} sTag Tag of child element
 * @return Child text of child element or undefined if not found
 * @type string
 */
Zapatec.Grid.getFirstChildText = function(oParent, sTag) {
	var oChild = Zapatec.Utils.getFirstChild(oParent, sTag);
	if (oChild) {
		var sText = Zapatec.Utils.getChildText(oChild);
		if (typeof sText == 'string' && sText.length) {
			return sText;
		}
	}
};

/**
 * Creates new field object from XML source.
 *
 * @private
 * @param {object} oCell Source object
 * @return Field object
 * @type object
 */
Zapatec.Grid.prototype.newFieldXml = function(oCell) {
	var oUtils = Zapatec.Utils;
	var fFC = oUtils.getFirstChild;
	var fCT = oUtils.getChildText;
	var fFCT = Zapatec.Grid.getFirstChildText;
	// title
	var oEl = fFC(oCell, 'title');
	// Create field object
	var oFld = {
		i: this.fields.length,
		title: fCT(oEl)
	};
	// dataType
	var val = fFCT(oCell, 'datatype');
	if (val) {
		oFld.dataType = val;
	}
	// columnWidth
	val = oCell.getAttribute('width');
	if (val) {
		// Convert to string
		val += '';
		if (val.length) {
			oFld.columnWidth = val;
		}
	}
	// style
	val = oCell.getAttribute('style');
	if (val) {
		oFld.style = val;
	}
	// span
	val = oCell.getAttribute('span');
	if (val) {
		oFld.span = val * 1;
	}
	// spanTitle
	val = oCell.getAttribute('spantitle');
	if (!val) {
		// For backward compatibility
		val = oCell.getAttribute('spanTitle');
	}
	if (val) {
		oFld.spanTitle = val;
	}
	// spanStyle
	val = oCell.getAttribute('spanstyle');
	if (!val) {
		// For backward compatibility
		val = oCell.getAttribute('spanStyle');
	}
	if (val) {
		oFld.spanStyle = val;
	}
	// hidden
	val = (oCell.getAttribute('hidden') == 'true');
	if (val) {
		oFld.hidden = val;
	}
	// nosort
	val = (oCell.getAttribute('nosort') == 'true');
	if (val) {
		oFld.nosort = val;
	}
	// sortByColumn
	val = oCell.getAttribute('sortbycolumn') + '';
	if (val.length && val != 'null' && val != 'undefined') {
		oFld.sortByColumn = val * 1;
	}
	// hiddenValues
	oEl = fFC(oCell, 'hiddenvalues');
	if (oEl) {
		oFld.hiddenValues = [];
		var aVals = oEl.getElementsByTagName('hiddenval');
		var iVals = aVals.length;
		for (var iVal = 0; iVals--; iVal++) {
			oFld.hiddenValues.push(fCT(aVals[iVal]));
		}
	}
	// minValue
	val = fFCT(oCell, 'minlimit');
	if (val) {
		oFld.minValue = val;
	}
	// maxValue
	val = fFCT(oCell, 'maxlimit');
	if (val) {
		oFld.maxValue = val;
	}
	// regexpFilter
	val = fFCT(oCell, 'regexpfilter');
	if (val) {
		oFld.regexpFilter = val;
	}
	// textFilter
	val = fFCT(oCell, 'textfilter');
	if (val) {
		oFld.textFilter = val;
	}
	// columnRange
	oEl = fFC(oCell, 'columnrange');
	if (oEl) {
		var oCR = oFld.columnRange = {};
		var oVal = this.convertCellByField(oFld, {
			v: fFCT(oEl, 'minvalue')
		});
		oCR.min = this.getCellValueCompare(oVal);
		oCR.minValue = this.getCellValue(oVal);
		oCR.minOrig = this.getCellValueOriginal(oVal);
		oVal = this.convertCellByField(oFld, {
			v: fFCT(oEl, 'maxvalue')
		});
		oCR.max = this.getCellValueCompare(oVal);
		oCR.maxValue = this.getCellValue(oVal);
		oCR.maxOrig = this.getCellValueOriginal(oVal);
		oCR.values = [];
		var aVals = oEl.getElementsByTagName('uniqueval');
		var iVals = aVals.length;
		var aCRVals = oCR.values;
		for (var iVal = 0; iVals--; iVal++) {
			aCRVals.push(this.convertCellByField(oFld, {
				v: fCT(aVals[iVal])
			}));
		}
	}
	return oFld;
};

/**
 * Changes content of the grid, replacing, adding or removing rows.
 *
 * <pre>
 * Input XML format:
 *
 * <xmp>
 * <?xml version="1.0"?>
 * <grid norefresh="true">
 *   <table>
 *     <atkey>Primary key value</atkey>
 *     <atid>0</atid>
 *     <atrow>0</atrow>
 *     <afterkey>Primary key value</afterkey>
 *     <afterid>0</afterid>
 *     <afterrow>0</atrow>
 *     <howmany>0</howmany>
 *     <rows>
 *       <row style="background: #eee">
 *         <cell style="color: #f00">Value</cell>
 *         ...
 *       </row>
 *       ...
 *     </rows>
 *   </table>
 *   ...
 * </grid>
 * </xmp>
 *
 * Where:
 *
 * "norefresh" attribute [string, optional] indicates that grid should not be
 * refreshed after changing (useful when several changes go one by one).
 *
 * "atkey" tag [string, optional] defines primary key value at which to start
 * changing the grid.
 *
 * "atid" tag [number, optional] defines id of row at which to start changing
 * the grid.
 *
 * "atrow" tag [number, optional, private] defines index of row in rows array at
 * which to start changing the grid.
 *
 * "afterkey" tag [string, optional] defines primary key value after which to
 * start changing the grid.
 *
 * "afterid" tag [number, optional] defines id of row after which to start
 * changing the grid.
 *
 * "afterrow" tag [number, optional, private] defines index of row in rows array
 * after which to start changing the grid.
 *
 * "howmany" tag [number, optional] defines number of rows to replace or remove
 * (default is 0).
 *
 * Only one of "atkey", "atid", "atrow", "afterkey", "afterid" and "afterrow"
 * tags should be defined. If none of them is defined, new rows will be added to
 * the end of grid.
 *
 * There can be several table tags in the input XML. This is useful when several
 * changes must be done simultaneously.
 *
 * XMLDocument object can be obtained from XML fragment using
 * Zapatec.Transport.parseXml function.
 *
 * Old input format (deprecated):
 *
 * <xmp>
 * <?xml version="1.0"?>
 * <grid>
 *   <table>
 *     <rows atRow="0" afterRow="0" howMany="0" noRefresh="noRefresh">
 *       <row style="background: #eee">
 *         <cell style="color: #f00">Value</cell>
 *         ...
 *       </row>
 *       ...
 *     </rows>
 *   </table>
 * </grid>
 * </xmp>
 * </pre>
 *
 * @param {object} oDoc XMLDocument object that describes one or several rows to
 * add.
 * @return Array with replaced or removed row objects. Number of replaced or
 * removed rows can be accessed through the length property of this array. If
 * error occured, returns undefined.
 * @type object
 */
Zapatec.Grid.prototype.spliceXml = function(oDoc) {
	// Check arguments
	if (!oDoc) {
		return;
	}
	var oDocEl = oDoc.documentElement;
	if (!oDocEl) {
		return;
	}
	// Get table elements
	var aTables = oDocEl.getElementsByTagName('table');
	if (!aTables.length) {
		return;
	}
	// Fire event
	this.fireEvent('gridPrepareModify');
	// Rowspan flags
	var aRF = [];
	// Will hold removed rows
	var aRemoved = [];
	// Process tables
	var oUtils = Zapatec.Utils;
	var fFC = oUtils.getFirstChild;
	var fFCT = Zapatec.Grid.getFirstChildText;
	var fClone = oUtils.clone;
	var fNext = oUtils.getNextSibling;
	var iTables = aTables.length;
	for (var iTable = 0; iTables--; iTable++) {
		// Get table
		var oTable = aTables[iTable];
		// Get rows
		var oRows = fFC(oTable, 'rows');
		// Get insert position
		var iInsertPos = null;
		// Try atkey tag
		var sAtKey = fFCT(oTable, 'atkey');
		if (typeof sAtKey != 'undefined') {
			var iRowId = this.getRowIdByPrimaryKey(sAtKey);
			if (typeof iRowId != 'undefined') {
				iInsertPos = this.getRowIndexById(iRowId);
			}
		}
		// Try atid tag
		if (typeof iInsertPos != 'number') {
			var sAtId = fFCT(oTable, 'atid');
			if (typeof sAtId != 'undefined') {
				iInsertPos = this.getRowIndexById(sAtId);
			}
		}
		// Try atrow tag
		if (typeof iInsertPos != 'number') {
			var sAtRow = fFCT(oTable, 'atrow');
			if (typeof sAtRow != 'undefined') {
				var iRowNum = sAtRow * 1;
				if (typeof this.rows[iRowNum] != 'undefined') {
					iInsertPos = iRowNum;
				}
			}
		}
		// Try afterkey tag
		if (typeof iInsertPos != 'number') {
			var sAfterKey = fFCT(oTable, 'afterkey');
			if (typeof sAfterKey != 'undefined') {
				var iRowId = this.getRowIdByPrimaryKey(sAfterKey);
				if (typeof iRowId != 'undefined') {
					iInsertPos = this.getRowIndexById(iRowId);
					if (typeof iInsertPos == 'number') {
						iInsertPos++;
					}
				}
			}
		}
		// Try afterid tag
		if (typeof iInsertPos != 'number') {
			var sAfterId = fFCT(oTable, 'afterid');
			if (typeof sAfterId != 'undefined') {
				iInsertPos = this.getRowIndexById(sAfterId);
				if (typeof iInsertPos == 'number') {
					iInsertPos++;
				}
			}
		}
		// Try afterrow tag
		if (typeof iInsertPos != 'number') {
			var sAfterRow = fFCT(oTable, 'afterrow');
			if (typeof sAfterRow != 'undefined') {
				var iRowNum = sAfterRow * 1;
				if (typeof this.rows[iRowNum] != 'undefined') {
					iInsertPos = iRowNum + 1;
				}
			}
		}
		// For backward compatibility
		if (typeof iInsertPos != 'number' && oRows) {
			var sAtRow = oRows.getAttribute('atRow');
			if (typeof sAtRow == 'string' && sAtRow.length) {
				var iRowNum = sAtRow * 1;
				if (typeof this.rows[iRowNum] != 'undefined') {
					iInsertPos = iRowNum;
				}
			}
		}
		// For backward compatibility
		if (typeof iInsertPos != 'number' && oRows) {
			var sAfterRow = oRows.getAttribute('afterRow');
			if (typeof sAfterRow == 'string' && sAfterRow.length) {
				var iRowNum = sAfterRow * 1;
				if (typeof this.rows[iRowNum] != 'undefined') {
					iInsertPos = iRowNum + 1;
				}
			}
		}
		// Default is end of the grid
		if (typeof iInsertPos != 'number') {
			iInsertPos = this.rows.length;
		}
		// Get howMany argument
		var iHowManyToRemove = 0;
		var sHowMany = fFCT(oTable, 'howmany');
		if (typeof sHowMany != 'undefined') {
			iHowManyToRemove = sHowMany * 1;
		} else if (oRows) {
			// For backward compatibility
			iHowManyToRemove = oRows.getAttribute('howMany') * 1;
		}
		// Prevent rebuilding of primary key after each remove
		var oPrimaryKey = this.primaryKey;
		this.primaryKey = null;
		// Indicates that primay key must be rebuilt
		var bRebuildPrimaryKey = false;
		// Update rows
		var oCurRow = fFC(oRows, 'row');
		var iRemoved = 0;
		while (iRemoved < iHowManyToRemove && oCurRow) {
			var oGridRow = this.rows[iInsertPos];
			if (typeof oGridRow == 'undefined') {
				// Trying to remove more rows than there are in the grid
				break;
			}
			// Save old row object
			aRemoved.push(fClone(oGridRow));
			// Replace row
			var oRow = this.newRowXml(oCurRow, aRF);
			// Replace row cells
			var iCols = oGridRow.cells.length;
			for (var iCol = 0; iCols--; iCol++) {
				// Get cell
				var oCell = oRow.cells[iCol];
				if (!oCell) {
					continue;
				}
				var oGridCell = oGridRow.cells[iCol];
				// Check if primary key value has changed
				if (this.primaryKeyColumn == iCol && oGridCell.c != oCell.c) {
					bRebuildPrimaryKey = true;
				}
				// Replace cell values
				oGridCell.v = oCell.v;
				oGridCell.c = oCell.c;
				oGridCell.o = oCell.o;
				// Replace cell style
				oGridCell.style = oCell.style;
			}
			// Replace row style
			oGridRow.style = oRow.style;
			// Next row
			iInsertPos++;
			oCurRow = fNext(oCurRow, 'row');
			iRemoved++;
		}
		// Delete rows
		for (; iRemoved < iHowManyToRemove; iRemoved++) {
			if (typeof this.rows[iInsertPos] == 'undefined') {
				// Trying to remove more rows than there are in the grid
				break;
			}
			var oRow = this.removeRow(iInsertPos);
			if (oRow) {
				aRemoved.push(oRow);
			}
			// Will need to rebuild primary key
			bRebuildPrimaryKey = true;
		}
		// Insert rows
		while (oCurRow) {
			// Create row
			var oRow = this.newRowXml(oCurRow, aRF);
			// Insert row
			this.rows.splice(iInsertPos++, 0, oRow);
			this.rowsIndex.push(oRow);
			// Will need to rebuild primary key
			bRebuildPrimaryKey = true;
			// Next row
			oCurRow = fNext(oCurRow, 'row');
		}
		// Rebuild or restore primary key
		if (bRebuildPrimaryKey) {
			oPrimaryKey = null;
			// Rebuild
			this.buildPrimaryKey();
		} else {
			// Restore
			this.primaryKey = oPrimaryKey;
			oPrimaryKey = null;
		}
	}
	// Prepare spans
	this.prepareSpans(this.rows);
	// Show updates. oRows is checked for backward compatibility.
	if (!oDocEl.getAttribute('norefresh') &&
	 !(oRows && oRows.getAttribute('noRefresh'))) {
		this.modify();
	}
	// Return removed rows
	return aRemoved;
};

/**
 * Creates new row object from XML source.
 *
 * @private
 * @param {object} oCurRow Source object
 * @param {object} aRF Rowspan flags
 * @return Row object
 * @type object
 */
Zapatec.Grid.prototype.newRowXml = function(oCurRow, aRF) {
	// Create new row object
	var oRow = {
		i: this.rowsIndex.length,
		cells: []
	};
	// Set style
	var sStyle = oCurRow.getAttribute('style');
	if (sStyle) {
		oRow.style = sStyle;
	}
	// Get cells
	var oUtils = Zapatec.Utils;
	var oCurCell = oUtils.getFirstChild(oCurRow, 'cell');
	// Variables used inside the loop
	var iCols = this.fields.length;
	var fNext = oUtils.getNextSibling;
	var aCells = oRow.cells;
	var iCol, oCell, iRowspan, iColspan;
	for (iCol = 0; iCol < iCols; iCol++) {
		if (aRF[iCol]) {
			aRF[iCol]--;
			continue;
		}
		// Add cell
		oCell = this.newCellXml(oCurCell, oRow.i, iCol);
		aCells[iCol] = oCell;
		// Consider rowspan
		iRowspan = oCell.rowspan;
		if (iRowspan > 1) {
			aRF[iCol] = iRowspan - 1;
		}
		// Consider colspan
		iColspan = oCell.colspan;
		if (iColspan > 1) {
			iCol += iColspan - 1;
		}
		// Next cell
		if (oCurCell) {
			oCurCell = fNext(oCurCell, 'cell');
		}
	}
	return oRow;
};

/**
 * Creates new cell object from XML source.
 *
 * @private
 * @param {object} oCurCell Source object
 * @param {number} iRow Row id
 * @param {number} iCol Column id
 * @return Cell object
 * @type object
 */
Zapatec.Grid.prototype.newCellXml = function(oCurCell, iRow, iCol) {
	// Create cell object
	var oCell = {
		i: iCol,
		r: iRow,
		v: ''
	};
	if (oCurCell) {
		// Set value
		var aValue = [];
		var iCn = oCurCell.childNodes.length;
		var fSerialize = Zapatec.Transport.serializeXmlDoc;
		var oC;
		for (var iC = 0; iCn--; iC++) {
			oC = oCurCell.childNodes[iC];
			if (oC.nodeType == 3) {
				// Text node
				aValue.push(oC.data);
			} else {
				// Element node
				aValue.push(fSerialize(oC));
			}
		}
		oCell.v = aValue.join('');
		// Set colspan
		var iColspan = oCurCell.getAttribute('colspan') * 1;
		if (iColspan > 1) {
			oCell.colspan = iColspan;
		}
		// Set rowspan
		var iRowspan = oCurCell.getAttribute('rowspan') * 1;
		if (iRowspan > 1) {
			oCell.rowspan = iRowspan;
		}
		// Set style
		var sStyle = oCurCell.getAttribute('style');
		if (sStyle) {
			oCell.style = sStyle;
		}
	}
	// Convert cell value
	oCell = this.convertCell(oCell);
	return oCell;
};
