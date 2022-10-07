/**
 * @fileoverview Plugin for Zapatec Grid to input grid data from HTML source.
 *
 * <pre>
 * Copyright (c) 2004-2006 by Zapatec, Inc.
 * http://www.zapatec.com
 * 1700 MLK Way, Berkeley, California,
 * 94709, U.S.A.
 * All rights reserved.
 * </pre>
 */

/* $Id: zpgrid-html.js 7649 2007-08-03 14:15:03Z alex $ */

/**
 * Loads data from HTML table source. Utilizes custom "style" attributes.
 *
 * @private
 * @param {object} oSource Input HTMLElement object
 */
Zapatec.Grid.prototype.loadDataHtml = function(oSource) {
	var oTable = null;
	if (oSource) {
		oTable = oSource;
	} else if (this.container) {
		oTable = Zapatec.Utils.getFirstChild(this.container, 'table');
	}
	if (!oTable) {
		alert(this.getMessage('errorHtmlTable'));
		return;
	}
	// If there is thead element, header will be taken from it
	var oThead = Zapatec.Utils.getFirstChild(oTable, 'thead');
	// Get tbody elements
	var oTbodies = oTable.getElementsByTagName('tbody');
	if (!oTbodies || !oTbodies.length) {
		oTbodies = [oTable];
	}
	var oHeaderTr = Zapatec.Utils.getFirstChild(oThead || oTbodies[0], 'tr');
	if (!oHeaderTr) {
		alert(this.getMessage('errorHtmlHeader'));
		return;
	}
	// Remove old data
	this.data = this.newDataHtml(oTable, oHeaderTr);
	this.fields = this.data.fields;
	this.rows = this.data.rows;
	this.rowsIndex = [];
	// Go to first page
	this.setCurrentPage(0);
	// Create fields
	var oTd = Zapatec.Utils.getFirstChild(oHeaderTr, 'th', 'td');
	while (oTd) {
		// Add field
		this.fields.push(this.newFieldHtml(oTd));
		// Next field
		oTd = Zapatec.Utils.getNextSibling(oTd, 'th', 'td');
	}
	// Rowspan flags
	var aRF = [];
	// Create rows
	for (var iTbody = 0; iTbody < oTbodies.length; iTbody++) {
		// Get tr elements
		var oTrs = oTbodies[iTbody].getElementsByTagName('tr');
		var iTr = 0;
		// Skip header
		if (iTbody == 0 && !oThead) {
			iTr++;
		}
		for (; iTr < oTrs.length; iTr++) {
			// Create row
			var oRow = this.newRowHtml(oTrs[iTr], aRF);
			// Add row
			this.rows.push(oRow);
			this.rowsIndex.push(oRow);
		}
	}
	// Prepare spans
	this.prepareSpans(this.rows);
	// Build primary key
	this.primaryKeyColumn = this.data.primaryKey;
	this.buildPrimaryKey();
	// Show grid
	this.show();
};

/**
 * Creates new data object from HTML source.
 *
 * @private
 * @param {object} oTable Table element
 * @param {object} oHeaderTr First table row element in the table
 * @return Data object
 * @type object
 */
Zapatec.Grid.prototype.newDataHtml = function(oTable, oHeaderTr) {
	// Create data object
	var oData = {
		fields: [],
		rows: []
	};
	// Set style
	var sStyle = Zapatec.Widget.getStyle(oTable);
	if (sStyle) {
		oData.style = sStyle;
	}
	var sHeaderStyle = Zapatec.Widget.getStyle(oHeaderTr);
	if (sHeaderStyle) {
		oData.headerStyle = sHeaderStyle;
	}
	return oData;
};

/**
 * Creates new field object from HTML table cell element.
 *
 * @private
 * @param {object} oTd Table cell element
 * @return Field object
 * @type object
 */
Zapatec.Grid.prototype.newFieldHtml = function(oTd) {
	// Create field object
	var oField = {
		i: this.fields.length,
		title: oTd.innerHTML
	};
	// Set data type
	if (this.getTypeByClass) {
		oField.dataType = this.getTypeByClass(oTd.className);
	}
	// Set width
	var sWidth = oTd.getAttribute('width');
	if (sWidth) {
		sWidth += ''; // Convert to string
		if (sWidth.length) {
			oField.columnWidth = sWidth;
		}
	}
	// Set style
	var sStyle = Zapatec.Widget.getStyle(oTd);
	if (sStyle) {
		oField.style = sStyle;
	}
	// Set span
	var sSpan = oTd.getAttribute('span');
	if (sSpan) {
		oField.span = sSpan * 1;
	}
	var sSpanTitle = oTd.getAttribute('spantitle');
	if (!sSpanTitle) {
		// For backward compatibility
		sSpanTitle = oTd.getAttribute('spanTitle');
	}
	if (sSpanTitle) {
		oField.spanTitle = sSpanTitle;
	}
	var sSpanStyle = oTd.getAttribute('spanstyle');
	if (!sSpanStyle) {
		// For backward compatibility
		sSpanStyle = oTd.getAttribute('spanStyle');
	}
	if (sSpanStyle) {
		oField.spanStyle = sSpanStyle;
	}
	// Set hidden
	var bHidden = (oTd.className.indexOf('zpGridTypeHidden') >= 0);
	if (bHidden) {
		oField.hidden = bHidden;
	}
	// Set nosort
	var bNosort = (oTd.className.indexOf('zpGridTypeNosort') >= 0);
	if (bNosort) {
		oField.nosort = bNosort;
	}
	// Set notags
	var bNotags = (oTd.className.indexOf('zpGridTypeNotags') >= 0);
	if (bNotags) {
		oField.notags = bNotags;
	}
	// Set sortByColumn
	var aMatch = oTd.className.match(/zpGridTypeSortBy(\d+)/);
	if (aMatch) {
		oField.sortByColumn = aMatch[1];
	}
	// Set primary key
	var bPrimaryKey = (oTd.className.indexOf('zpGridTypePrimaryKey') >= 0);
	if (bPrimaryKey) {
		this.data.primaryKey = oField.i;
	}
	return oField;
};

/**
 * Creates new row object from HTML table row element.
 *
 * @private
 * @param {object} oTr Table row element
 * @param {object} aRF Rowspan flags
 * @return Row object
 * @type object
 */
Zapatec.Grid.prototype.newRowHtml = function(oTr, aRF) {
	// Create new row object
	var oRow = {
		i: this.rowsIndex.length,
		cells: []
	};
	// Set style
	var sStyle = Zapatec.Widget.getStyle(oTr);
	if (sStyle) {
		oRow.style = sStyle;
	}
	// Get cells
	var oUtils = Zapatec.Utils;
	var oTd = oUtils.getFirstChild(oTr, 'td', 'th');
	// Variables used inside the loop
	var iCols = this.fields.length;
	var fGetNextSibling = oUtils.getNextSibling;
	var aCells = oRow.cells;
	var iCol, oCell, iRowspan, iColspan;
	for (iCol = 0; iCol < iCols; iCol++) {
		if (aRF[iCol]) {
			aRF[iCol]--;
			continue;
		}
		// Add cell
		oCell = this.newCellHtml(oTd, oRow.i, iCol);
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
		if (oTd) {
			oTd = fGetNextSibling(oTd, 'td', 'th');
		}
	}
	return oRow;
};

/**
 * Creates new cell object from HTML table cell element.
 *
 * @private
 * @param {object} oTd Table cell element
 * @param {number} iRow Row id
 * @param {number} iCol Column id
 * @return Cell object
 * @type object
 */
Zapatec.Grid.prototype.newCellHtml = function(oTd, iRow, iCol) {
	// Create cell object
	var oCell = {
		i: iCol,
		r: iRow,
		v: ''
	};
	if (oTd) {
		// Set value
		oCell.v = oTd.innerHTML;
		// Facilitate migrating from an existing <table> to the grid
		if (this.fields[iCol].notags) {
			// Remove tags
			oCell.v = oCell.v.replace(/<[^>]*>/g, '');
		}
		// Set colspan
		var iColspan = oTd.getAttribute('colspan') * 1;
		if (iColspan > 1) {
			oCell.colspan = iColspan;
		}
		// Set rowspan
		var iRowspan = oTd.getAttribute('rowspan') * 1;
		if (iRowspan > 1) {
			oCell.rowspan = iRowspan;
		}
		// Set style
		var sStyle = Zapatec.Widget.getStyle(oTd);
		if (sStyle) {
			oCell.style = sStyle;
		}
	}
	// Convert cell value
	oCell = this.convertCell(oCell);
	return oCell;
};
