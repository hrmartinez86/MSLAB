/**
 * @fileoverview Plugin for Zapatec Grid to display grid.
 *
 * <pre>
 * Copyright (c) 2004-2007 by Zapatec, Inc.
 * http://www.zapatec.com
 * 1700 MLK Way, Berkeley, California,
 * 94709, U.S.A.
 * All rights reserved.
 * </pre>
 */

/* $Id: zpgrid-output.js 7653 2007-08-03 18:30:37Z alex $ */

/**
 * If there are several containers, synchronizes their width.
 * @private
 */
Zapatec.Grid.prototype.syncContainers = function() {
	// At least 2 containers must be defined
	if (!this.container || (!this.headerContainer && !this.totalsContainer &&
	 !this.paginationContainers.length)) {
		return;
	}
	// Get container dimensions
	var iW = this.container.clientWidth;
	var iH = this.container.clientHeight;
	var oD = this.getGridDimensions();
	if (oD.height && (!iH || !this.container.style.height || oD.height < iH)) {
		iH = oD.height;
	}
	if (iW) {
		// If there is separate container for header
		if (this.headerContainer) {
			this.headerContainer.style.width = iW + 'px';
		}
		// If there is separate container for totals
		if (this.totalsContainer && !this.config.horizontal) {
			this.totalsContainer.style.width = iW + 'px';
		}
		// If there are separate containers for pagination
		if (oD.width && oD.width < iW) {
			iW = oD.width;
		}
		for (var iEl = 0; iEl < this.paginationContainers.length; iEl++) {
			this.paginationContainers[iEl].style.width = iW + 'px';
		}
	}
	if (iH) {
		// If there is separate container for totals
		if (this.totalsContainer && this.config.horizontal) {
			if (this.headerContainer) {
				iH += this.headerContainer.offsetHeight;
			}
			this.totalsContainer.style.height = iH + 'px';
		}
	}
};

/**
 * Returns real width and height of the grid after it has been drawn.
 *
 * <pre>
 * Format of returned object:
 * {
 *   width: [number] width of the grid in pixels,
 *   height: [number] height of the grid in pixels
 * }
 * </pre>
 *
 * @return Object containing width and height of the grid
 * @type object
 */
Zapatec.Grid.prototype.getGridDimensions = function() {
	var oDims = {
		width: 0,
		height: 0
	};
	var oTable = document.getElementById('zpGrid' + this.id + 'DataTableTable');
	if (oTable) {
		oDims.width = oTable.offsetWidth;
		oDims.height = oTable.offsetHeight;
	}
	return oDims;
};

/**
 * Synchronizes scrolling.
 * @private
 */
Zapatec.Grid.prototype.syncScroll = function() {
	// Align columns
	if (!this.config.horizontal && typeof this.outAlignCols == 'function') {
		this.outAlignCols();
	}
	// Synchronize fixed and scrollable row heights
	this.syncRowHeights();
	// Synchronize scrolling
	if (this.headerContainer) {
		this.createProperty(this.container, 'zpGridHeader', this.headerContainer);
	}
	if (this.totalsContainer) {
		this.createProperty(this.container, 'zpGridTotals', this.totalsContainer);
	}
	if (this.config.fixedLeft > 0 || this.config.horizontal) {
		this.createProperty(this.container, 'zpGridFixedLeft',
		 document.getElementById('zpGrid' + this.id + 'FixedLeft'));
		if (this.headerContainer) {
			this.createProperty(this.container, 'zpGridDataFixedLeft',
			 document.getElementById('zpGrid' + this.id + 'DataFixedLeft'));
		}
		if (this.totalsContainer) {
			this.createProperty(this.container, 'zpGridTotalsFixedLeft',
			 document.getElementById('zpGrid' + this.id + 'TotalsFixedLeft'));
		}
	}
	if (this.container.zpGridHeader || this.container.zpGridTotals ||
	 this.container.zpGridFixedLeft) {
		// Synchronize header
		if (this.container.zpGridHeader) {
			this.container.zpGridHeader.scrollLeft = this.container.scrollLeft;
		}
		// Synchronize totals
		if (this.container.zpGridTotals) {
			this.container.zpGridTotals.scrollLeft = this.container.scrollLeft;
		}
		// Set up syncronizing on scroll
		if (this.config.horizontal) {
			this.createProperty(this.container, 'onscroll', function() {
				// Synchronize fixed columns
				if (this.zpGridFixedLeft) {
					this.zpGridFixedLeft.style.left = this.scrollLeft + 'px';
				}
				if (this.zpGridDataFixedLeft) {
					this.zpGridDataFixedLeft.style.left = this.scrollLeft + 'px';
				}
				if (this.zpGridTotalsFixedLeft) {
					this.zpGridTotalsFixedLeft.style.top = this.scrollTop + 'px';
				}
				// Synchronize header
				if (this.zpGridHeader) {
					this.zpGridHeader.scrollLeft = this.scrollLeft;
				}
				// Synchronize totals
				if (this.zpGridTotals) {
					this.zpGridTotals.scrollTop = this.scrollTop;
				}
			});
		} else {
			this.createProperty(this.container, 'onscroll', function() {
				// Synchronize fixed columns
				if (this.zpGridFixedLeft) {
					this.zpGridFixedLeft.style.left = this.scrollLeft + 'px';
				}
				if (this.zpGridDataFixedLeft) {
					this.zpGridDataFixedLeft.style.left = this.scrollLeft + 'px';
				}
				if (this.zpGridTotalsFixedLeft) {
					this.zpGridTotalsFixedLeft.style.left = this.scrollLeft + 'px';
				}
				// Synchronize header
				if (this.zpGridHeader) {
					this.zpGridHeader.scrollLeft = this.scrollLeft;
				}
				// Synchronize totals
				if (this.zpGridTotals) {
					this.zpGridTotals.scrollLeft = this.scrollLeft;
				}
			});
		}
	}
};

/**
 * Aligns columns to the width of respective fields and fields to the maximum
 * height. Destroyed once the style sheet is applied.
 * @private
 */
Zapatec.Grid.prototype.outAlignCols = function() {
	// Get stylesheet
	if (!Zapatec.StyleSheet) {
		return;
	}
	var oStyle = new Zapatec.StyleSheet();
	var iGridId = this.id;
	// Get max height
	var iMaxH = 0;
	var iMaxSpannedH = 0;
	var iSpan = 0;
	var iSpanH = 0;
	var aFields = this.fields;
	var iFields = aFields.length;
	var bAutoWidth = (this.config.columnWidth == 'auto');
	var iField, iCol, oField, iFieldId, oSpan, oDiv;
	for (iField = 0, iCol = 0; iField < iFields; iField++) {
		oField = aFields[iField];
		if (!oField || oField.hidden) {
			continue;
		}
		iFieldId = oField.i;
		oSpan = document.getElementById('zpGrid' + iGridId + 'Span' + iFieldId);
		if (oSpan) {
			iSpan = oSpan.getAttribute('colspan') * 1;
			iSpanH = oSpan.offsetHeight;
		}
		oDiv = document.getElementById('zpGrid' + iGridId + 'Col' + iFieldId + 'Title');
		if (oDiv) {
			// Set column width if fixed width is not defined for this column
			if (bAutoWidth && !oField.columnWidth) {
				this.outSetColWidth(iFieldId, oDiv.offsetWidth);
			}
			// Get cell height
			var iH = oDiv.offsetHeight;
			if (iSpan) {
				// Add span height
				iH += iSpanH;
				if (iMaxSpannedH < iH) {
					iMaxSpannedH = iH;
				}
			} else {
				if (iMaxH < iH) {
					iMaxH = iH;
				}
			}
		}
		if (iSpan) {
			iSpan--;
		}
		iCol++;
	}
	// Set heights to max
	if (iMaxH) {
		oStyle.addRule('#zpGrid' + iGridId +
		 'Container .zpGridTable .zpGridField .zpGridDiv',
		 'height:' + iMaxH + 'px');
	}
	if (iMaxSpannedH) {
		oStyle.addRule('#zpGrid' + iGridId +
		 'Container .zpGridTable .zpGridField .zpGridSpannedDiv',
		 'height:' + iMaxSpannedH + 'px');
	}
	// We don't need to do this again
	this.outAlignCols = null;
};

/**
 * Synchronizes fixed and scrollable row heights.
 * @private
 */
Zapatec.Grid.prototype.syncRowHeights = function() {
	var oConfig = this.config;
	var iGridId = this.id;
	var sGridId = 'zpGrid' + iGridId;
	// Synchronize fixed and scrollable row heights
	if (oConfig.horizontal) {
		var aFields = this.fields;
		var iFields = aFields.length;
		// Rows
		var sFieldId = sGridId + 'Field';
		var sTotal0CellId = sGridId + 'Total0Cell';
		var sSpanId = sGridId + 'Span';
		var iField, oField, iFieldId, oCellHidden, oCell;
		for (iField = 0; iField < iFields; iField++) {
			oField = aFields[iField];
			if (!oField) {
				continue;
			}
			iFieldId = oField.i;
			// Field
			oCellHidden = document.getElementById(sFieldId + iFieldId + 'Hidden');
			if (oCellHidden) {
				oCell = document.getElementById(sFieldId + iFieldId);
				if (oCell) {
					this.syncRowHeight(oCellHidden, oCell);
					this.syncColumnWidth(oCellHidden, oCell);
				}
				// Total
				oCell = document.getElementById(sTotal0CellId + iFieldId + 'Hidden');
				if (oCell) {
					this.syncRowHeight(oCellHidden, oCell);
				}
				oCell = document.getElementById(sTotal0CellId + iFieldId);
				if (oCell) {
					this.syncRowHeight(oCellHidden, oCell);
				}
			}
			// Span
			oCellHidden = document.getElementById(sSpanId + iFieldId + 'Hidden');
			if (oCellHidden) {
				oCell = document.getElementById(sSpanId + iFieldId);
				if (oCell) {
					this.syncColumnWidth(oCellHidden, oCell);
				}
			}
		}
		// Totals
		var sTotalId = sGridId + 'Total';
		var iRow;
		for (iField = 0; iField < iFields; iField++) {
			var oField = aFields[iField];
			if (!oField) {
				continue;
			}
			iFieldId = oField.i;
			for (iRow = 0; true; iRow++) {
				oCellHidden = document.getElementById(sTotalId + iRow + 'Cell' +
				 iFieldId + 'Hidden');
				if (!oCellHidden) {
					break;
				}
				oCell = document.getElementById(sTotalId + iRow + 'Cell' + iFieldId);
				if (!oCell) {
					break;
				}
				this.syncColumnWidth(oCellHidden, oCell);
			}
		}
	} else if (oConfig.fixedLeft > 0) {
		// Rows
		var aRows = this.applyPaging();
		var iRows = aRows.length;
		var sRowId = sGridId + 'Row';
		var iRow, oRow, iRowId, oCellHidden, oCell;
		for (iRow = 0; iRow < iRows; iRow++) {
			oRow = aRows[iRow];
			if (oRow) {
				iRowId = oRow.i;
				oCellHidden = document.getElementById(sRowId + iRowId + 'Cell0Hidden');
				if (oCellHidden) {
					oCell = document.getElementById(sRowId + iRowId + 'Cell0');
					if (oCell) {
						this.syncRowHeight(oCellHidden, oCell);
					}
				}
			}
		}
		// Totals
		var sTotalId = sGridId + 'Total';
		for (iRow = 0; true; iRow++) {
			oCellHidden = document.getElementById(sTotalId + iRow + 'Cell0Hidden');
			if (!oCellHidden) {
				break;
			}
			oCell = document.getElementById(sTotalId + iRow + 'Cell0');
			if (!oCell) {
				break;
			}
			this.syncRowHeight(oCellHidden, oCell);
		}
	}
};

/**
 * Synchronizes fixed and scrollable row heights.
 *
 * @private
 * @param {object} oCellHidden First cell object of scrollable row
 * @param {object} oCell First cell object of fixed row
 */
Zapatec.Grid.prototype.syncRowHeight = function(oCellHidden, oCell) {
	// Get difference of heights
	var oRow = oCellHidden.parentNode;
	if (!oRow) {
		return;
	}
	var iHeight = 0;
	var aCells = oRow.getElementsByTagName('td');
	var iCells = aCells.length;
	var iCell, iCellH;
	for (iCell = 0; iCell < iCells; iCell++) {
		if (aCells[iCell].getAttribute('rowspan') > 1) {
			continue;
		}
		iCellH = aCells[iCell].offsetHeight;
		if (iHeight < iCellH) {
			iHeight = iCellH;
		}
	}
	var oRowFixed = oCell.parentNode;
	if (!oRowFixed) {
		return;
	}
	var iHeightFixed = 0;
	var aCellsFixed = oRowFixed.getElementsByTagName('td');
	var iCellsFixed = aCellsFixed.length;
	for (iCell = 0; iCell < iCellsFixed; iCell++) {
		if (aCellsFixed[iCell].getAttribute('rowspan') > 1) {
			continue;
		}
		iCellH = aCellsFixed[iCell].offsetHeight;
		if (iHeightFixed < iCellH) {
			iHeightFixed = iCellH;
		}
	}
	var iDiff = iHeight - iHeightFixed;
	// If there is difference
	if (iDiff) {
		// Height will be applied to div because it doesn't work correctly for td
		var oDiv = oCell.getElementsByTagName('div');
		if (!oDiv) {
			return;
		}
		oDiv = oDiv[0];
		if (!oDiv) {
			return;
		}
		// Set row height
		oDiv.style.height = iHeight + 'px';
		// Adjust height in IE where border and padding are part of height
		iHeight = 0;
		for (iCell = 0; iCell < iCells; iCell++) {
			if (aCells[iCell].getAttribute('rowspan') > 1) {
				continue;
			}
			iCellH = aCells[iCell].offsetHeight;
			if (iHeight < iCellH) {
				iHeight = iCellH;
			}
		}
		iHeightFixed = 0;
		for (iCell = 0; iCell < iCellsFixed; iCell++) {
			if (aCellsFixed[iCell].getAttribute('rowspan') > 1) {
				continue;
			}
			iCellH = aCellsFixed[iCell].offsetHeight;
			if (iHeightFixed < iCellH) {
				iHeightFixed = iCellH;
			}
		}
		iDiff = iHeight - iHeightFixed;
		// If there is still difference
		if (iDiff) {
			// Set row height
			oDiv.style.height = (iHeight + iDiff) + 'px';
		}
	}
};

/**
 * Synchronizes fixed and scrollable column width.
 *
 * @private
 * @param {object} oCellHidden First cell object of scrollable row
 * @param {object} oCell First cell object of fixed row
 */
Zapatec.Grid.prototype.syncColumnWidth = function(oCellHidden, oCell) {
	// Width will be applied to div because it doesn't work correctly for td
	var oDiv = oCell.getElementsByTagName('div');
	if (!oDiv) {
		return;
	}
	oDiv = oDiv[0];
	if (!oDiv) {
		return;
	}
	// Get difference of widths
	var iDiff = oCellHidden.offsetWidth - oCell.offsetWidth;
	// If there is difference
	if (iDiff) {
		// Calculate new cell width
		var iWidth = oDiv.offsetWidth + iDiff;
		// Set width of td element
		oDiv.style.width = iWidth + 'px';
	}
};

/**
 * Synchronizes containers when theme is loaded. Attached to loadThemeEnd event.
 * @private
 */
Zapatec.Grid.prototype.visualizeThemeLoad = function() {
	if (!this.visualize) {
		return;
	}
	this.syncContainers();
};

/**
 * Synchronizes containers when grid is refreshed.
 * @private
 */
Zapatec.Grid.prototype.visualizeRefresh = function() {
	this.syncContainers();
};

/**
 * Sets column widths and row heights after data loading. Attached to
 * loadDataEnd event.
 * @private
 */
Zapatec.Grid.prototype.visualizeDataLoad = function() {
	if (!this.container || !this.visualize) {
		return;
	}
	// We don't need this listener any more
	// Because when dataOnDemand is used, loadDataEnd event may occur several
	// times and it will overwrite column sizes set manually
	this.removeEventListener('loadDataEnd', this.visualizeDataLoad);
	// If there is separate container for header
	if (this.headerContainer) {
		// Set header overflow
		this.headerContainer.style.overflow = 'hidden';
	}
	// If there is separate container for totals
	if (this.totalsContainer) {
		// Set totals overflow
		this.totalsContainer.style.overflow = 'hidden';
	}
	// Sets column widths and row heights
	this.outSetCellDims();
};

/**
 * Sets column widths and row heights.
 * @private
 */
Zapatec.Grid.prototype.outSetCellDims = function() {
	// Get stylesheet
	if (!Zapatec.StyleSheet) {
		return;
	}
	var oStyle = new Zapatec.StyleSheet(true);
	var aTpl = [
		'#zpGrid',
		this.id.toString(),
		'',
		'Container .zpGridTable .zpGridDiv'
	];
	var oConfig = this.config;
	var bHoriz = oConfig.horizontal;
	var sWidth = 'width:' + oConfig.columnWidth;
	var sHeight = 'height:' + oConfig.rowHeight;
	// Set default column width and row height
	var sRule = aTpl.join('');
	oStyle.addRule(sRule, sWidth);
	oStyle.addRule(sRule, sHeight);
	// Header
	if (this.headerContainer) {
		aTpl[2] = 'Data';
		sRule = aTpl.join('');
		oStyle.addRule(sRule, sWidth);
		oStyle.addRule(sRule, sHeight);
	}
	// Totals
	if (this.totalsContainer) {
		aTpl[2] = 'Totals';
		sRule = aTpl.join('');
		if (!bHoriz) {
			oStyle.addRule(sRule, sWidth);
		}
		oStyle.addRule(sRule, sHeight);
	}
	if (!bHoriz) {
		// Set fixed column widths
		var aFields = this.fields;
		var iFields = aFields.length;
		var iField, iCol, oField, iColWidth;
		for (iField = 0, iCol = 0; iField < iFields; iField++) {
			// Get field
			oField = aFields[iField];
			// Skip hidden columns
			if (!oField || oField.hidden) {
				continue;
			}
			iColWidth = oField.columnWidth;
			if (iColWidth) {
				this.outSetColWidth(oField.i, iColWidth);
			}
			iCol++;
		}
	}
};

/**
 * Sets column width.
 *
 * @private
 * @param {number} iColId Column id
 * @param {string} iWidth Column width in px
 */
Zapatec.Grid.prototype.outSetColWidth = function(iColId, iWidth) {
	// Check arguments
	if (!iWidth) {
		return;
	}
	// Get stylesheet
	if (!Zapatec.StyleSheet) {
		return;
	}
	var oStyle = new Zapatec.StyleSheet(true);
	// Correct CSS length
	var sWidth = 'width:' + Zapatec.Utils.correctCssLength(iWidth);
	// Set column width
	var aTpl = [
		'#zpGrid',
		this.id.toString(),
		'',
		'Container .zpGridTable .zpGridColId',
		iColId.toString(),
		' .zpGridDiv'
	];
	// Set width for div and td to make sure they both are resized in FF
	// To replicate open editable.html in FF and try to minimize all columns
	oStyle.addRule(aTpl.join(''), sWidth);
	// Prevent setting width of span
	if (!this.fields[iColId].span) {
		aTpl[5] = '';
		oStyle.addRule(aTpl.join(''), sWidth);
	}
	// Data
	if (this.headerContainer) {
		aTpl[2] = 'Data';
		aTpl[5] = ' .zpGridDiv';
		oStyle.addRule(aTpl.join(''), sWidth);
		aTpl[5] = '';
		oStyle.addRule(aTpl.join(''), sWidth);
	}
	// Totals
	if (this.totalsContainer) {
		aTpl[2] = 'Totals';
		aTpl[5] = ' .zpGridDiv';
		oStyle.addRule(aTpl.join(''), sWidth);
		aTpl[5] = '';
		oStyle.addRule(aTpl.join(''), sWidth);
	}
};

/**
 * Changes width of all columns. Useful for dynamic grid resizing.
 *
 * @param {string} iWidth New column width in px
 */
Zapatec.Grid.prototype.changeColumnWidth = function(iWidth) {
	// Check arguments
	if (!iWidth) {
		return;
	}
	// Get stylesheet
	if (!Zapatec.StyleSheet) {
		return;
	}
	var oStyle = new Zapatec.StyleSheet(true);
	// Correct CSS length
	var aTpl = [
		'#zpGrid',
		this.id.toString(),
		'',
		'Container .zpGridTable .zpGridCell',
		' .zpGridDiv'
	];
	var sWidth = 'width:' + Zapatec.Utils.correctCssLength(iWidth);
	// Set width for div and td to make sure they both are resized in FF
	oStyle.addRule(aTpl.join(''), sWidth);
	aTpl[4] = '';
	oStyle.addRule(aTpl.join(''), sWidth);
	// Data
	if (this.headerContainer) {
		aTpl[2] = 'Data';
		aTpl[4] = ' .zpGridDiv';
		oStyle.addRule(aTpl.join(''), sWidth);
		aTpl[4] = '';
		oStyle.addRule(aTpl.join(''), sWidth);
	}
	// Totals
	if (this.totalsContainer) {
		aTpl[2] = 'Totals';
		aTpl[4] = ' .zpGridDiv';
		oStyle.addRule(aTpl.join(''), sWidth);
		aTpl[4] = '';
		oStyle.addRule(aTpl.join(''), sWidth);
	}
};

/**
 * Forms grid output.
 *
 * @private
 * @param {object} aHtml Output array
 * @param {boolean} bFixed (Optional) Indicates that this is fixed part of data
 * @param {string} aHtml (Otional) Table id
 */
Zapatec.Grid.prototype.outputTableOpen = function(aHtml, bFixed, sId) {
	aHtml.push('<table class="');
	aHtml.push(this.getClassName({prefix: 'zpGrid'}));
	// Prevent text selection
	aHtml.push('" cellpadding="0" cellspacing="0" ondrag="return false" style="-khtml-user-select:none"><tbody><tr><td class="zpGridTable');
	if (bFixed) {
		aHtml.push(' zpGridTableFixed');
	}
	if (sId) {
		aHtml.push('" id="');
		aHtml.push(sId);
	}
	aHtml.push('"><table class="zpGridTableTable');
	if (sId) {
		aHtml.push('" id="');
		aHtml.push(sId);
		aHtml.push('Table');
	}
	aHtml.push('" style="');
	if (this.data.style) {
		aHtml.push(this.data.style);
	}
	aHtml.push('"><tbody>');
};

/**
 * Forms grid output.
 *
 * @private
 * @param {object} aHtml Output array
 */
Zapatec.Grid.prototype.outputTableClose = function(aHtml) {
	aHtml.push('</tbody></table></td></tr></tbody></table>');
};

/**
 * Forms grid output.
 *
 * @private
 * @param {object} aHtml Output array
 * @param {object} aCols Array with field objects to output
 * @param {object} aFixedCols Array with fixed field objects to output
 * @param {object} aSpans Array with spans
 * @param {object} aRows Array with row objects to output
 * @param {object} aTotals Array with total row objects to output
 * @param {boolean} bFixed Optional. Indicates that this is fixed part of header
 */
Zapatec.Grid.prototype.outputFields = function(aHtml, aCols, aFixedCols, aSpans, aRows, aTotals, bFixed) {
	if (this.config.horizontal) {
		// Horizontal layout
		this.outputFieldsHoriz(aHtml, aCols, aFixedCols, aSpans, aRows, aTotals,
		 bFixed);
	} else {
		// Vertical layout
		this.outputFieldsVert(aHtml, aCols, aSpans, aRows, bFixed);
	}
};

/**
 * Forms grid output.
 *
 * @private
 * @param {object} aHtml Output array
 * @param {object} aCols Array with field objects to output
 * @param {object} aFixedCols Array with fixed field objects to output
 * @param {object} aSpans Array with spans
 * @param {object} aRows Array with row objects to output
 * @param {object} aTotals Array with total row objects to output
 * @param {boolean} bFixed Optional. Indicates that this is fixed part of header
 * @param {boolean} bSecondRow (Optional) Indicates that this is second row
 * of header
 */
Zapatec.Grid.prototype.outputFieldsHoriz = function(aHtml, aCols, aFixedCols, aSpans, aRows, aTotals, bFixed, bSecondRow) {
	var iSpanned = 0;
	// Fixed columns become header
	var iCols = aCols.length;
	var iFixedCols = aFixedCols.length;
	var iSpans = aSpans.length;
	var iRows = aRows.length;
	var iTotals = 0;
	if (aTotals && !this.totalsContainer && this.outputTotalsCell) {
		iTotals = aTotals.length;
	}
	var iCol, oField, aCl, sClass, aTr, oSpan, iRow;
	for (iCol = 0; iCol < iFixedCols; iCol++) {
		// Get field object
		oField = aFixedCols[iCol];
		// Form tr
		aCl = [];
		aCl.push('zpGridCol zpGridCol');
		aCl.push(iCol);
		aCl.push(' zpGridColFixed zpGridColFixed');
		aCl.push(iCol);
		if (iCol % 2 == 1) {
			aCl.push(' zpGridColOdd zpGridColFixedOdd');
		} else {
			aCl.push(' zpGridColEven zpGridColFixedEven');
		}
		if (iCol == iFixedCols - 1) {
			aCl.push(' zpGridColFixedLast');
		}
		sClass = aCl.join('');
		aTr = [];
		aTr.push('<tr id="zpGrid');
		aTr.push(this.id);
		aTr.push('Col');
		aTr.push(oField.i);
		if (bFixed) {
			aTr.push('Fixed');
		}
		aTr.push('" class="');
		aTr.push(sClass);
		if (this.data.headerStyle) {
			aTr.push('" style="');
			aTr.push(this.data.headerStyle);
		}
		aTr.push('">');
		if (iSpans) {
			// Output span
			oSpan = aSpans[oField.i];
			if (oSpan) {
				this.outputSpan(aTr, oField, iCol, oSpan, iCols, !bFixed);
				iSpanned = oSpan.spanned - 1;
				// Output field
				this.outputField(aTr, oField, iCol, iCols, !bFixed);
			} else {
				// Output field
				if (iSpanned) {
					this.outputField(aTr, oField, iCol, iCols, !bFixed);
					iSpanned--;
				} else {
					this.outputField(aTr, oField, iCol, iCols, !bFixed, true);
				}
			}
		} else {
			// Output field
			this.outputField(aTr, oField, iCol, iCols, !bFixed);
		}
		if (!bFixed) {
			// Output rows
			for (iRow = 0; iRow < iRows; iRow++) {
				this.outputCell(aTr, oField, aRows[iRow], iCol, iRow, iRows);
			}
			// Output totals
			for (iRow = 0; iRow < iTotals; iRow++) {
				this.outputTotalsCell(aTr, oField, aTotals[iRow], iCol, iRow, iTotals);
			}
		}
		aTr.push('</tr>');
		aHtml.push(aTr.join(''));
	}
};

/**
 * Forms grid output.
 *
 * @private
 * @param {object} aHtml Output array
 * @param {object} aCols Array with field objects to output
 * @param {object} aSpans Array with spans
 * @param {object} aRows Array with row objects to output
 * @param {boolean} bFixed Optional. Indicates that this is fixed part of header
 * @param {boolean} bSecondRow Optional. Indicates that this is second row of
 * header
 */
Zapatec.Grid.prototype.outputFieldsVert = function(aHtml, aCols, aSpans, aRows, bFixed, bSecondRow) {
	var aTr = [];
	aTr.push('<tr id="zpGrid');
	aTr.push(this.id);
	aTr.push('Head');
	if (bFixed) {
		aTr.push('Fixed');
	}
	if (bSecondRow) {
		aTr.push('2');
	}
	aTr.push('" class="zpGridRow zpGridHeadRow zpGridRow0 zpGridRowEven"');
	if (this.data.headerStyle) {
		aTr.push(' style="');
		aTr.push(this.data.headerStyle);
		aTr.push('"');
	}
	aTr.push('>');
	// Get field number
	var iFixedLeft = this.config.fixedLeft;
	var aFields = this.fields;
	var iFields = aFields.length;
	var iShow = bFixed ? iFixedLeft : iFields;
	// Check if there are spans
	var bTwoRows = false;
	if (!bSecondRow && aSpans.length) {
		bTwoRows = true;
	}
	// Display fields
	var iCols = aCols.length;
	var bHiddenCols = (!bFixed && iFixedLeft);
	var oField, oSpan, bHidden;
	for (var iField = 0, iSpan = 0, iCol = 0; iField < iFields && iField < iShow;
	 iField++) {
		// Get field
		oField = aFields[iField];
		// Skip hidden columns
		if (!oField || oField.hidden) {
			continue;
		}
		// Get span
		oSpan = aSpans[iField];
		if (oSpan) {
			iSpan += oSpan.spanned;
		}
		// Display field
		bHidden = (bHiddenCols && iCol < iFixedLeft);
		if (!bSecondRow) {
			// Show all columns and spans instead of spanned columns
			if (oSpan) {
				// Display span
				this.outputSpan(aTr, oField, iCol, oSpan, iCols, bHidden);
				iCol += iSpan;
				iField = oSpan.fields[oSpan.fields.length - 1].i;
				iSpan = 0;
			} else {
				this.outputField(aTr, oField, iCol, iCols, bHidden, bTwoRows);
				iCol++;
			}
		} else {
			// Show only spanned columns
			if (iSpan) {
				this.outputField(aTr, oField, iCol, iCols, bHidden);
				// Decrement span
				iSpan--;
			}
			iCol++;
		}
	}
	aTr.push('</tr>');
	aHtml.push(aTr.join(''));
	// Display second row if needed
	if (bTwoRows) {
		this.outputFieldsVert(aHtml, aCols, aSpans, aRows, bFixed, true);
	}
};

/**
 * Forms grid output.
 *
 * @private
 * @param {object} aHtml Output array
 * @param {number} oField Field object
 * @param {number} iCol Visible column number
 * @param {number} oSpan Number of spanned columns, span title and style
 * @param {number} iCols Visible column count
 * @param {boolean} bHidden (Optional) Indicates that this is hidden part of
 * fixed part of header
 */
Zapatec.Grid.prototype.outputSpan = function(aHtml, oField, iCol, oSpan, iCols, bHidden) {
	var aCl = [];
	aCl.push('zpGridCell zpGridCell');
	aCl.push(iCol);
	aCl.push(' zpGridField zpGridField');
	aCl.push(iCol);
	aCl.push(' zpGridFieldSpan zpGridFieldSpan');
	aCl.push(iCol);
	aCl.push(' zpGridColId');
	aCl.push(oSpan.fields[0].i);
	if (iCol % 2 == 1) {
		aCl.push(' zpGridCellOdd zpGridFieldOdd zpGridFieldSpanOdd');
	} else {
		aCl.push(' zpGridCellEven zpGridFieldEven zpGridFieldSpanEven');
	}
	if (iCol + oSpan.spanned == iCols) {
		aCl.push(' zpGridCellLast zpGridFieldLast zpGridFieldSpanLast');
	}
	var sClass = aCl.join('');
	aCl.push(' zpGridCellActive zpGridCellActive');
	aCl.push(iCol);
	aCl.push(' zpGridFieldActive zpGridFieldActive');
	aCl.push(iCol);
	aCl.push(' zpGridFieldSpanActive zpGridFieldSpanActive');
	aCl.push(iCol);
	if (iCol % 2 == 1) {
		aCl.push(
		 ' zpGridCellActiveOdd zpGridFieldActiveOdd zpGridFieldSpanActiveOdd');
	} else {
		aCl.push(
		 ' zpGridCellActiveEven zpGridFieldActiveEven zpGridFieldSpanActiveEven');
	}
	if (iCol + oSpan.spanned == iCols) {
		aCl.push(
		 ' zpGridCellActiveLast zpGridFieldActiveLast zpGridFieldSpanActiveLast');
	}
	var sClassActive = aCl.join('');
	var aTd = [];
	if (this.config.horizontal) {
		aTd.push('<td rowspan="');
	} else {
		aTd.push('<td colspan="');
	}
	aTd.push(oSpan.spanned);
	aTd.push('" class="');
	aTd.push(sClass);
	aTd.push('" id="zpGrid');
	aTd.push(this.id);
	aTd.push('Span');
	aTd.push(oSpan.fields[0].i);
	if (bHidden) {
		aTd.push('Hidden');
	} else {
		aTd.push('" onmouseover="this.className=\'');
		aTd.push(sClassActive);
		aTd.push('\'" onmouseout="this.className=\'');
		aTd.push(sClass);
		aTd.push("'");
	}
	if (oSpan.fields[0].spanStyle) {
		aTd.push('" style="');
		aTd.push(oSpan.fields[0].spanStyle);
	}
	// Resizing
	aTd.push('"><div style="position:relative;overflow:visible">');
	// No need to resize hidden part of the grid
	if (!bHidden) {
		// Resizing is implemented only for vertical layout
		if (!this.config.horizontal) {
			aTd.push('<div id="zpGrid');
			aTd.push(this.id);
			aTd.push('Span');
			aTd.push(oField.i);
			aTd.push('Margin" class="zpGridColMargin"></div><div id="zpGrid');
			aTd.push(this.id);
			aTd.push('Span');
			aTd.push(oField.i);
			// "return false" stops selection in Opera
			aTd.push('Resize" onmousedown="Zapatec.Drag.start(window.event,this.id,{horizontal:true,limitLeft:10});return false" class="zpGridColResizeHidden"></div>');
		}
	}
	aTd.push('<span class="zpGridSpan">');
	aTd.push(oSpan.fields[0].spanTitle);
	aTd.push('</span></div></td>');
	aHtml.push(aTd.join(''));
};

/**
 * Forms grid output.
 *
 * @private
 * @param {object} aHtml Output array
 * @param {number} oField Field object
 * @param {number} iCol Visible column number
 * @param {number} iCols Visible column count
 * @param {boolean} bHidden (Optional) Indicates that this is hidden part of
 * fixed part of header
 * @param {boolean} bTwoRows (Optional) Indicates that this cell spans two
 * rows
 */
Zapatec.Grid.prototype.outputField = function(aHtml, oField, iCol, iCols, bHidden, bTwoRows) {
	if (oField.i >= this.config.fixedLeft &&
	 oField.i < this.currentHorizontalOffset + this.config.fixedLeft) {
		// Hidden column
		return;
	}
	if (this.config.visibleColumns) {
		bHidden = false;
	}
	var sId = this.id.toString();
	var sFieldId = oField.i.toString();
	var aCl = [];
	aCl.push('zpGridCell zpGridCell');
	aCl.push(iCol);
	aCl.push(' zpGridField zpGridField');
	aCl.push(iCol);
	aCl.push(' zpGridColId');
	aCl.push(sFieldId);
	if (iCol % 2 == 1) {
		aCl.push(' zpGridCellOdd zpGridFieldOdd');
	} else {
		aCl.push(' zpGridCellEven zpGridFieldEven');
	}
	if (iCol == iCols - 1) {
		aCl.push(' zpGridCellLast zpGridFieldLast');
	}
	if (!oField.nosort) {
		if (oField.sorted) {
			aCl.push(' zpGridSortedAsc');
		} else if (oField.sortedDesc) {
			aCl.push(' zpGridSortedDesc');
		}
	}
	var sClass = aCl.join('');
	aCl.push(' zpGridCellActive zpGridCellActive');
	aCl.push(iCol);
	aCl.push(' zpGridFieldActive zpGridFieldActive');
	aCl.push(iCol);
	if (iCol % 2 == 1) {
		aCl.push(' zpGridCellActiveOdd zpGridFieldActiveOdd');
	} else {
		aCl.push(' zpGridCellActiveEven zpGridFieldActiveEven');
	}
	if (iCol == iCols - 1) {
		aCl.push(' zpGridCellActiveLast zpGridFieldActiveLast');
	}
	if (!oField.nosort) {
		if (oField.sorted) {
			aCl.push(' zpGridSortedAscActive');
		} else if (oField.sortedDesc) {
			aCl.push(' zpGridSortedDescActive');
		}
	}
	var sClassActive = aCl.join('');
	var aTd = [];
	aTd.push('<td');
	if (bTwoRows) {
		if (this.config.horizontal) {
			aTd.push(' colspan="2"');
		} else {
			aTd.push(' rowspan="2"');
		}
	}
	aTd.push(' class="');
	aTd.push(sClass);
	aTd.push('" id="zpGrid');
	aTd.push(sId);
	aTd.push('Field');
	aTd.push(sFieldId);
	if (bHidden) {
		aTd.push('Hidden');
	} else {
		aTd.push('" onmouseover="this.className=\'');
		aTd.push(sClassActive);
		aTd.push('\'" onmouseout="this.className=\'');
		aTd.push(sClass);
		aTd.push("'");
		if (!oField.nosort) {
			aTd.push('" onclick="Zapatec.Grid.sort(\'');
			aTd.push(sId);
			aTd.push("','");
			aTd.push(sFieldId);
			aTd.push("')");
		}
		aTd.push('" onmousedown="Zapatec.Widget.callMethod(');
		aTd.push(sId);
		aTd.push(",'fireEvent','gridFieldMousedown',");
		aTd.push(sFieldId);
		aTd.push(')');
		aTd.push('" onmouseup="Zapatec.Widget.callMethod(');
		aTd.push(sId);
		aTd.push(",'fireEvent','gridFieldMouseup',");
		aTd.push(sFieldId);
		aTd.push(')');
	}
	if (oField.style) {
		aTd.push('" style="');
		aTd.push(oField.style);
	}
	// div is needed to be able to set column width
	// span is needed to be able to set right margin for arrow
	// Resizing
	aTd.push('"><div style="position:relative;overflow:visible">');
	// No need to resize hidden part of the grid
	if (!bHidden) {
		// Resizing is implemented only for vertical layout
		if (!this.config.horizontal) {
			aTd.push('<div id="zpGrid');
			aTd.push(sId);
			aTd.push('Col');
			aTd.push(sFieldId);
			aTd.push('Margin" class="zpGridColMargin"></div><div id="zpGrid');
			aTd.push(sId);
			aTd.push('Col');
			aTd.push(sFieldId);
			// "return false" stops selection in Opera
			aTd.push('Resize" onmousedown="Zapatec.Drag.start(window.event,this.id,{horizontal:true,limitLeft:10});return false" class="zpGridColResizeHidden"></div>');
		}
	}
	aTd.push('<div class="zpGridDiv');
	if (bTwoRows) {
		aTd.push(' zpGridSpannedDiv');
	}
	// Set cell type
	if (this.getClassByType) {
		aTd.push(' ');
		aTd.push(this.getClassByType(this.getFieldType(oField)));
	}
	aTd.push('" id="zpGrid');
	aTd.push(sId);
	aTd.push('Col');
	aTd.push(sFieldId);
	aTd.push('Title');
	if (bHidden) {
		aTd.push('Hidden');
	}
	aTd.push('"><span class="zpGridSpan" onselectstart="return false" style="-moz-user-select:none" id="zpGrid');
	aTd.push(sId);
	aTd.push('Col');
	aTd.push(sFieldId);
	aTd.push('Title');
	if (bHidden) {
		aTd.push('Hidden');
	}
	aTd.push('Span">');
	aTd.push(oField.title);
	aTd.push('</span></div></div></td>');
	aHtml.push(aTd.join(''));
};

/**
 * Forms grid output.
 *
 * @private
 * @param {object} aHtml Output array
 * @param {object} aCols Array with field objects to output
 * @param {object} aFixedCols Array with fixed field objects to output
 * @param {object} aSpans Array with spans
 * @param {object} aRows Array with row objects to output
 * @param {object} aTotals Array with total row objects to output
 * @param {boolean} bFixed Optional. Indicates that this is fixed part of table
 * @param {object} oContr Optional. Data container
 */
Zapatec.Grid.prototype.outputRows = function(aHtml, aCols, aFixedCols, aSpans, aRows, aTotals, bFixed, oContr) {
	if (this.config.horizontal) {
		// Horizontal layout
		this.outputRowsHoriz(aHtml, aCols, aFixedCols, aSpans, aRows, aTotals, bFixed);
	} else {
		// Vertical layout
		this.outputRowsVert(aHtml, aCols, aFixedCols, aRows, bFixed, oContr);
		// Totals
		if (aTotals && !this.totalsContainer && this.outputTotals) {
			this.outputTotals(aHtml, aCols, aFixedCols, aTotals, bFixed);
		}
	}
};

/**
 * Forms grid output.
 *
 * @private
 * @param {object} aHtml Output array
 * @param {object} aCols Array with field objects to output
 * @param {object} aFixedCols Array with fixed field objects to output
 * @param {object} aSpans Array with spans
 * @param {object} aRows Array with row objects to output
 * @param {object} aTotals Array with total row objects to output
 * @param {boolean} bFixed Optional. Indicates that this is fixed part of row
 */
Zapatec.Grid.prototype.outputRowsHoriz = function(aHtml, aCols, aFixedCols, aSpans, aRows, aTotals, bFixed) {
	var iSpanned = 0;
	var iCols = aCols.length;
	var iSpans = aSpans.length;
	var iRows = aRows.length;
	var iTotals = 0;
	if (aTotals && !this.totalsContainer && this.outputTotalsCell) {
		iTotals = aTotals.length;
	}
	// Skip fixed columns because they are already displayed in header
	var iCol, oField, aCl, sClass, aTr, oSpan, iRow;
	for (iCol = aFixedCols.length; iCol < iCols; iCol++) {
		// Get field object
		oField = aCols[iCol];
		aCl = [];
		aCl.push('zpGridCol zpGridCol');
		aCl.push(iCol);
		if (iCol % 2 == 1) {
			aCl.push(' zpGridColOdd');
		} else {
			aCl.push(' zpGridColEven');
		}
		if (iCol == iCols - 1) {
			aCl.push(' zpGridColLast');
		}
		sClass = aCl.join('');
		aTr = [];
		aTr.push('<tr id="zpGrid');
		aTr.push(this.id);
		aTr.push('Col');
		aTr.push(oField.i);
		if (bFixed) {
			aTr.push('Fixed');
		}
		aTr.push('" class="');
		aTr.push(sClass);
		aTr.push('">');
		if (iSpans) {
			// Output span
			oSpan = aSpans[oField.i];
			if (oSpan) {
				this.outputSpan(aTr, oField, iCol, oSpan, iCols, !bFixed);
				iSpanned = oSpan.spanned - 1;
				// Output field
				this.outputField(aTr, oField, iCol, iCols, !bFixed);
			} else {
				// Output field
				if (iSpanned) {
					this.outputField(aTr, oField, iCol, iCols, !bFixed);
					iSpanned--;
				} else {
					this.outputField(aTr, oField, iCol, iCols, !bFixed, true);
				}
			}
		} else {
			// Output field
			this.outputField(aTr, oField, iCol, iCols, !bFixed);
		}
		if (!bFixed) {
			// Output rows
			for (iRow = 0; iRow < iRows; iRow++) {
				this.outputCell(aTr, oField, aRows[iRow], iCol, iRow, iRows);
			}
			// Output totals
			for (iRow = 0; iRow < iTotals; iRow++) {
				this.outputTotalsCell(aTr, oField, aTotals[iRow], iCol, iRow, iTotals);
			}
		}
		aTr.push('</tr>');
		aHtml.push(aTr.join(''));
	}
};

/**
 * Forms grid output.
 *
 * @private
 * @param {object} aHtml Output array
 * @param {object} aCols Array with field objects to output
 * @param {object} aFixedCols Array with fixed field objects to output
 * @param {object} aRows Array with row objects to output
 * @param {boolean} bFixed Optional. Indicates that this is fixed part of row
 * @param {object} oContr Optional. Data container
 */
Zapatec.Grid.prototype.outputRowsVert = function(aHtml, aCols, aFixedCols, aRows, bFixed, oContr) {
	var iRows = aRows.length;
	var iRow, oRow;
	for (iRow = 0; iRow <= iRows; iRow++) {
		oRow = aRows[iRow];
		if (!oRow) {
			continue;
		}
		this.outputRowVert(aHtml, aCols, aFixedCols, aRows, iRow, bFixed, oContr);
	}
};

/**
 * Forms grid output.
 *
 * @private
 * @param {object} aHtml Output array
 * @param {object} aCols Array with field objects to output
 * @param {object} aFixedCols Array with fixed field objects to output
 * @param {object} aRows Array with row objects to output
 * @param {object} iRow Number of row on the page
 * @param {boolean} bFixed Optional. Indicates that this is fixed part of row
 * @param {object} oContr Optional. Data container
 */
Zapatec.Grid.prototype.outputRowVert = function(aHtml, aCols, aFixedCols, aRows, iRow, bFixed, oContr) {
	// Get row
	var oRow = aRows[iRow];
	if (!oRow) {
		return;
	}
	// Form tr
	var iRows = aRows.length;
	var iCols = aCols.length;
	var iFixedCols = aFixedCols.length;
	var aCl = [];
	var iRowN = iRow + 1;
	var sOdd = iRowN % 2 == 1 ? 'Odd' : 'Even';
	aCl.push('zpGridRow zpGridRow');
	aCl.push(iRowN);
	aCl.push(' zpGridDataRow zpGridDataRow');
	aCl.push(iRowN);
	aCl.push(' zpGridRow');
	aCl.push(sOdd);
	aCl.push(' zpGridDataRow');
	aCl.push(sOdd);
	if (iRowN == iRows) {
		aCl.push(' zpGridRowLast zpGridDataRowLast');
	}
	if (this.config.selectRows && oRow.selected) {
		aCl.push(' zpGridRowSelected zpGridRowSelected');
		aCl.push(iRowN);
		aCl.push(' zpGridRowSelected');
		aCl.push(sOdd);
		if (iRowN == iRows) {
			aCl.push(' zpGridRowSelectedLast');
		}
	}
	if (oRow.invalid) {
		aCl.push(' zpGridRowInvalid zpGridRowInvalid');
		aCl.push(iRowN);
		aCl.push(' zpGridRowInvalid');
		aCl.push(iRowN % 2 == 1 ? 'Odd' : 'Even');
		if (iRowN == iRows) {
			aCl.push(' zpGridRowInvalidLast');
		}
	}
	var sClass = aCl.join('');
	var aClA = [];
	aClA.push(' zpGridRowActive zpGridRowActive');
	aClA.push(iRowN);
	aClA.push(' zpGridRowActive');
	aClA.push(iRowN % 2 == 1 ? 'Odd' : 'Even');
	if (iRowN == iRows) {
		aClA.push(' zpGridRowActiveLast');
	}
	var sClassActive = aClA.join('');
	var aTr = [];
	aTr.push('<tr id="zpGrid');
	aTr.push(this.id);
	aTr.push('Row');
	aTr.push(oRow.i);
	if (bFixed) {
		aTr.push('Fixed');
	}
	aTr.push('" class="');
	aTr.push(sClass);
	if (this.config.activeRows) {
		aTr.push('" onmouseover="if(!Zapatec.Grid.mouseSelection)if(this.className.indexOf(\'zpGridRowActive\')==-1){this.className+=\'');
		aTr.push(sClassActive);
		aTr.push("'");
		if (bFixed) {
			aTr.push(";document.getElementById('zpGrid");
			aTr.push(this.id);
			aTr.push('Row');
			aTr.push(oRow.i);
			aTr.push("').className+='");
			aTr.push(sClassActive);
			aTr.push("'");
		} else if (this.config.fixedLeft > 0 && !this.config.visibleColumns) {
			aTr.push(";document.getElementById('zpGrid");
			aTr.push(this.id);
			aTr.push('Row');
			aTr.push(oRow.i);
			aTr.push("Fixed').className+='");
			aTr.push(sClassActive);
			aTr.push("'");
		}
		aTr.push("}\" onmouseout=\"if(!Zapatec.Grid.mouseSelection)this.className=this.className.replace(/ zpGridRowActive[^ ]*/g,'')");
		if (bFixed) {
			aTr.push(";var oRow=document.getElementById('zpGrid");
			aTr.push(this.id);
			aTr.push('Row');
			aTr.push(oRow.i);
			aTr.push("');oRow.className=oRow.className.replace(/ zpGridRowActive[^ ]*/g,'')");
		} else if (this.config.fixedLeft > 0 && !this.config.visibleColumns) {
			aTr.push(";var oRow=document.getElementById('zpGrid");
			aTr.push(this.id);
			aTr.push('Row');
			aTr.push(oRow.i);
			aTr.push("Fixed');oRow.className=oRow.className.replace(/ zpGridRowActive[^ ]*/g,'')");
		}
	}
	aTr.push('" ondblclick="this.onmouseout()" style="');
	if (oRow.style) {
		aTr.push(oRow.style);
	}
	aTr.push('">');
	// Display cells
	if (bFixed) {
		for (var iCol = 0; iCol < iFixedCols; iCol++) {
			this.outputCell(aTr, aFixedCols[iCol], oRow, iRow, iCol, iCols);
		}
	} else {
		for (var iCol = 0; iCol < iCols; iCol++) {
			var bHidden = (iCol < iFixedCols);
			this.outputCell(aTr, aCols[iCol], oRow, iRow, iCol, iCols, bHidden);
		}
	}
	aTr.push('</tr>');
	aHtml.push(aTr.join(''));
};

/**
 * Forms grid output.
 *
 * @private
 * @param {object} aTr Output array
 * @param {object} oField Field object
 * @param {object} oRow Row object
 * @param {object} iRow Number of row on the page
 * @param {number} iCol Visible column number
 * @param {number} iCols Visible column count
 * @param {boolean} bHidden Optional. Indicates that this is hidden part of
 * fixed part of row
 */
Zapatec.Grid.prototype.outputCell = function(aTr, oField, oRow, iRow, iCol, iCols, bHidden) {
	if (oField.i >= this.config.fixedLeft &&
	 oField.i < this.currentHorizontalOffset + this.config.fixedLeft) {
		// Hidden column
		return;
	}
	if (this.config.visibleColumns) {
		bHidden = false;
	}
	// Get cell
	var iField = oField.i;
	var oCell = this.getCellByRow(oRow, iField);
	if (!oCell) {
		return;
	}
	var oConfig = this.config;
	var iGrid = this.id;
	var iRow = oRow.i;
	var iCell = oCell.i;
	var sId = ['zpGrid', iGrid, 'Row', iRow, 'Cell', iCell].join('');
	var aCl = [];
	aCl.push('zpGridCell zpGridCell');
	aCl.push(iCol);
	aCl.push(' zpGridColId');
	aCl.push(iField);
	aCl.push(' zpGridCellData zpGridCellData');
	aCl.push(iCol);
	if (iCol % 2 == 1) {
		aCl.push(' zpGridCellOdd zpGridCellDataOdd');
	} else {
		aCl.push(' zpGridCellEven zpGridCellDataEven');
	}
	if (iCol + 1 == iCols) {
		aCl.push(' zpGridCellLast zpGridCellDataLast');
	}
	if (oConfig.selectCells && oCell.selected) {
		aCl.push(' zpGridCellSelected zpGridCellSelected');
		aCl.push(iCol);
		if (iCol % 2 == 1) {
			aCl.push(' zpGridCellSelectedOdd');
		} else {
			aCl.push(' zpGridCellSelectedEven');
		}
		if (iCol == iCols - 1) {
			aCl.push(' zpGridCellSelectedLast');
		}
	}
	if (oCell.invalid) {
		aCl.push(' zpGridCellInvalid zpGridCellInvalid');
		aCl.push(iCol);
		if (iCol % 2 == 1) {
			aCl.push(' zpGridCellInvalidOdd');
		} else {
			aCl.push(' zpGridCellInvalidEven');
		}
		if (iCol == iCols - 1) {
			aCl.push(' zpGridCellInvalidLast');
		}
	}
	var sClass = aCl.join('');
	var aClA = [];
	aClA.push(' zpGridCellActive zpGridCellActive');
	aClA.push(iCol);
	aClA.push(' zpGridCellDataActive zpGridCellDataActive');
	aClA.push(iCol);
	if (iCol % 2 == 1) {
		aClA.push(' zpGridCellActiveOdd zpGridCellDataActiveOdd');
	} else {
		aClA.push(' zpGridCellActiveEven zpGridCellDataActiveEven');
	}
	if (iCol == iCols - 1) {
		aClA.push(' zpGridCellActiveLast zpGridCellDataActiveLast');
	}
	var sClassActive = aClA.join('');
	var aTd = [];
	aTd.push('<td class="');
	aTd.push(sClass);
	aTd.push('" id="');
	aTd.push(sId);
	if (bHidden) {
		aTd.push('Hidden');
	} else {
		if (oConfig.activeCells) {
			aTd.push('" onmouseover="if(Zapatec.Grid.mouseSelection)Zapatec.Grid.mouseOverCell=this.id;else if(this.className.indexOf(\'zpGridCellActive\')==-1)this.className+=\'');
			aTd.push(sClassActive);
			aTd.push('\'" onmouseout="if(!Zapatec.Grid.mouseSelection)this.className=this.className.replace(/ zpGrid[^ ]+Active[^ ]*/g,\'\')');
		}
		aTd.push('" onclick="Zapatec.Grid.rowOnClick(\'');
		aTd.push(iGrid);
		aTd.push("','");
		aTd.push(iRow);
		aTd.push("','");
		aTd.push(iCell);
		aTd.push('\')" ondblclick="this.onmouseout();Zapatec.Grid.rowOnDblClick(\'');
		aTd.push(iGrid);
		aTd.push("','");
		aTd.push(iRow);
		aTd.push("','");
		aTd.push(iCell);
		aTd.push("')");
		aTd.push('" onmousedown="Zapatec.Widget.callMethod(');
		aTd.push(iGrid);
		aTd.push(",'fireEvent','gridCellMousedown',");
		aTd.push(iRow);
		aTd.push(',');
		aTd.push(iCell);
		aTd.push(')');
		aTd.push('" onmouseup="Zapatec.Widget.callMethod(');
		aTd.push(iGrid);
		aTd.push(",'fireEvent','gridCellMouseup',");
		aTd.push(iRow);
		aTd.push(',');
		aTd.push(iCell);
		aTd.push(')');
	}
	var sStyle = this.getCellStyle(oCell, iRow);
	if (sStyle) {
		aTd.push('" style="');
		aTd.push(sStyle);
	}
	var iColspan = oCell.colspan;
	if (iColspan > 1) {
		aTd.push('" colspan="');
		aTd.push(iColspan);
	}
	var iRowspan = oCell.rowspan;
	if (iRowspan > 1) {
		aTd.push('" rowspan="');
		aTd.push(iRowspan);
	}
	aTd.push('">');
	this.outputCellValue(aTd, oField, oCell);
	aTd.push('</td>');
	aTr.push(aTd.join(''));
};

/**
 * Forms grid output.
 *
 * @private
 * @param {object} aTd Output array
 * @param {object} oField Field object
 * @param {object} oCell Cell object
 * @param {boolean} bHid Optional. If true, visibility is hidden
 */
Zapatec.Grid.prototype.outputCellValue = function(aTd, oField, oCell, bHid) {
	var sId = ['zpGrid', this.id, 'Row', oCell.r, 'Cell', oCell.i].join('');
	// div is needed to be able to set column width
	aTd.push('<div id="');
	aTd.push(sId);
	aTd.push('Div" class="zpGridDiv');
	// Set cell type
	if (this.getClassByType) {
		aTd.push(' ');
		aTd.push(this.getClassByType(this.getFieldType(oField)));
	}
	aTd.push('" onselectstart="return false" style="-moz-user-select:none;');
	var iRowspan = oCell.rowspan;
	if (iRowspan > 1) {
		var aMatch = this.config.rowHeight.match(/^(\d+)(\D+)$/);
		if (aMatch && aMatch.length == 3) {
			aTd.push('height:');
			aTd.push(aMatch[1] * iRowspan + iRowspan - 1);
			aTd.push(aMatch[2]);
			aTd.push(';');
		}
	}
	var iCellspan = oCell.colspan;
	if (bHid || iCellspan > 1) {
		if (bHid) {
			aTd.push('visibility:hidden;');
		}
		if (iCellspan > 1) {
			// Calculate cell width
			var iW = 0;
			// Cell id
			var iCell = oCell.i;
			// Fields array
			var aF = this.fields;
			// Default column width
			var sCW = this.config.columnWidth;
			var iCW = sCW * 1;
			// Variables used in the loop
			var iC, oF, sW;
			for (iC = 0; iC < iCellspan; iC++) {
				oF = aF[iCell + iC];
				if (oF && !oF.hidden) {
					sW = oF.columnWidth;
					if (sW) {
						iW += sW * 1;
					} else if (sCW) {
						iW += iCW;
					} else {
						iW = 0;
						break;
					}
				}
			}
			if (iW) {
				aTd.push('width:');
				aTd.push(iW);
				aTd.push('px;');
			} else {
				aTd.push('width:auto;');
			}
		}
	}
	aTd.push('">');
	var sData = this.getCellData(oCell);
	if (sData && typeof sData != 'string') {
		sData = sData.toString();
	}
	// Empty cell may cause visual problems in editable grid extension
	if (!sData || !sData.length) {
		sData = '&nbsp;';
	}
	aTd.push(sData);
	aTd.push('</div>');
};

/**
 * Forms grid output.
 *
 * @private
 * @param {object} aHtml Output array
 * @param {number} iContainer Optional. Number of container if there are two and
 * more pagination containers
 */
Zapatec.Grid.prototype.outputPagination = function(aHtml, iContainer) {
	if (typeof this.config.callbackPaginationDisplay == 'function' ||
	 this.config.rowsPerPage <= 0) {
		// No pagination
		return;
	}
	// We need this only for second and further containers
	if (!iContainer || iContainer < 2) {
		iContainer = '';
	} else {
		iContainer = '_' + iContainer;
	}
	if (this.paginationContainers.length) {
		aHtml.push('<div id="zpGrid');
		aHtml.push(this.id);
		aHtml.push('PaginationContainer');
		aHtml.push(iContainer);
		aHtml.push('"><div><table class="');
		aHtml.push(this.getClassName({prefix: 'zpGrid'}));
		aHtml.push('" cellpadding="0" cellspacing="0" \
		 style="width:100%"><tbody>');
	}
	aHtml.push('<tr><td class="zpGridPagination" id="zpGrid');
	aHtml.push(this.id);
	aHtml.push('Pagination');
	aHtml.push(iContainer);
	aHtml.push('">');
	aHtml.push(this.getMessage('labelPage'));
	if (this.currentPage > 0) {
		// Don't display previous on the first page
		aHtml.push(' <span id="zpGrid');
		aHtml.push(this.id);
		aHtml.push('FirstPage');
		aHtml.push(iContainer);
		aHtml.push('" class="zpGridFirstPage" \
		 onclick="Zapatec.Grid.firstPage(\'');
		aHtml.push(this.id);
		aHtml.push('\')">&lt;&lt;</span> <span id="zpGrid');
		aHtml.push(this.id);
		aHtml.push('PrevPage');
		aHtml.push(iContainer);
		aHtml.push('" class="zpGridPrevPage" \
		 onclick="Zapatec.Grid.previousPage(\'');
		aHtml.push(this.id);
		aHtml.push('\')">&lt;</span>');
	}
	// Get number of pages
	var iPages = this.totalPages();
	// Display up to 10 pages
	var iCurrentPage = this.getCurrentPageNumber();
	var iFirstPage = iCurrentPage - 4;
	var iLastPage = iCurrentPage + 5;
	for (var iPage = iFirstPage; iPage < iLastPage && iPage <= iPages; iPage++) {
		if (iPage < 1) {
			// Current page < 10
			continue;
		}
		aHtml.push(' <span id="zpGrid');
		aHtml.push(this.id);
		aHtml.push('Page');
		aHtml.push(iPage);
		aHtml.push(iContainer);
		aHtml.push('" class="zpGrid');
		if (iPage == iCurrentPage) {
			aHtml.push('CurrentPage">');
		} else {
			aHtml.push('Page" onclick="Zapatec.Grid.gotoPage(\'');
			aHtml.push(this.id);
			aHtml.push("','");
			aHtml.push(iPage);
			aHtml.push('\')">');
		}
		aHtml.push(iPage);
		aHtml.push('</span>');
	}
	if (this.currentPage < iPages - 1) {
		// Don't display next on the last page
		aHtml.push(' <span id="zpGrid');
		aHtml.push(this.id);
		aHtml.push('NextPage');
		aHtml.push(iContainer);
		aHtml.push('" class="zpGridNextPage" \
		 onclick="Zapatec.Grid.nextPage(\'');
		aHtml.push(this.id);
		aHtml.push('\')">&gt;</span> <span id="zpGrid');
		aHtml.push(this.id);
		aHtml.push('LastPage');
		aHtml.push(iContainer);
		aHtml.push('" class="zpGridLastPage" \
		 onclick="Zapatec.Grid.lastPage(\'');
		aHtml.push(this.id);
		aHtml.push('\')">&gt;&gt;</span>');
	}
	aHtml.push(' ');
	aHtml.push(this.getMessage('labelOf'));
	aHtml.push(' ');
	aHtml.push(iPages);
	aHtml.push(' (');
	aHtml.push(this.recordsDisplayed());
	aHtml.push(' ');
	aHtml.push(this.getMessage('labelRows'));
	aHtml.push(')</td></tr>');
	if (this.paginationContainers.length) {
		aHtml.push('</tbody></table></div></div>');
	}
};

/**
 * Displays grid. Forms new grid as plain HTML. Pushes strings into array, then
 * joins array to achieve maximum speed. Replaces previous contents of container
 * element with formed grid. Adds classes that can be used to create different
 * themes. Adds user defined styles.
 * @private
 */
Zapatec.Grid.prototype.refreshContainer = function() {
	var oConfig = this.config;
	// Check container
	var oContainer = this.container;
	if (!oContainer) {
		alert(this.getMessage('errorContainer'));
		return;
	}
	var oContainerStyle = oContainer.style;
	oContainerStyle.position = 'relative';
	// IE6 requires width for relative element containing other relative elements
	if (oContainer.currentStyle && 
	 oContainer.currentStyle['width'] == 'auto') {
		oContainerStyle.width = '100%';
	}
	// Get columns to display, fixed columns and spans
	var aCols = [];
	var aFixedCols = [];
	var aSpans = [];
	var aFields = this.fields;
	var iFields = aFields.length;
	var iFixedFields = Math.min(iFields, oConfig.fixedLeft);
	var iField, oField, oSpan;
	for (iField = 0; iField < iFields; iField++) {
		oField = aFields[iField];
		// Skip hidden columns
		if (!oField || oField.hidden) {
			continue;
		}
		// Add visible column
		aCols.push(oField);
		// Add fixed column
		if (iField < iFixedFields) {
			aFixedCols.push(oField);
		}
		// Get span
		oSpan = this.getFieldSpanned(oField);
		if (oSpan) {
			aSpans[iField] = oSpan;
		}
	}
	// Get rows to display
	var aRows = this.prepareSpans(Zapatec.Utils.clone(this.applyPaging()), true);
	// Get totals
	var aTotals;
	if (this.getTotals) {
		aTotals = this.getTotals();
	}
	// Display grid
	if (this.headerContainer) {
		this.headerContainer.style.position = 'relative';
		// IE6 requires width for relative element containing other relative
		// elements
		if (this.headerContainer.currentStyle &&
		 this.headerContainer.currentStyle['width'] == 'auto') {
			this.headerContainer.style.width = '100%';
		}
		var aHtml = [];
		aHtml.push('<div id="zpGrid');
		aHtml.push(this.id);
		aHtml.push('Container"><div>');
		// Header
		this.outputTableOpen(aHtml);
		this.outputFields(aHtml, aCols, aFixedCols, aSpans, aRows, aTotals);
		this.outputTableClose(aHtml);
		aHtml.push('</div>');
		// Fixed header
		if (oConfig.fixedLeft > 0 || oConfig.horizontal) {
			aHtml.push('<div id="zpGrid');
			aHtml.push(this.id);
			if (this.headerContainer.style.setAttribute) {
				// IE
				aHtml.push('FixedLeft" style="position:absolute;top:0px;\
				 left:expression(this.offsetParent.scrollLeft+\'px\')"><div>');
			} else {
				// Other browsers don't support expressions yet
				aHtml.push('FixedLeft" style="position:absolute;top:0px;left:');
				aHtml.push(oContainer.scrollLeft);
				aHtml.push('px"><div>');
			}
			this.outputTableOpen(aHtml, true);
			this.outputFields(aHtml, aCols, aFixedCols, aSpans, aRows, aTotals, true);
			this.outputTableClose(aHtml);
			aHtml.push('</div></div>');
		}
		aHtml.push('</div>');
		// Draw header
		this.headerContainer.innerHTML = aHtml.join('');
		// Clean container
		oContainer.innerHTML = '';
		// Data
		var oContr = Zapatec.Utils.createElement('div', oContainer, true);
		oContr.id = 'zpGrid' + this.id + 'BusyContainer';
		oContr.style.position = 'absolute';
		oContr.style.top = '0px';
		oContr.style.left = '0px';
		oContr = Zapatec.Utils.createElement('div', oContainer, true);
		oContr.id = 'zpGrid' + this.id + 'DataContainer';
		// Rows
		aHtml = [];
		this.outputTableOpen(aHtml, false, 'zpGrid' + this.id + 'DataTable');
		this.outputRows(aHtml, aCols, aFixedCols, aSpans, aRows, aTotals, false,
		 oContr);
		// Pagination
		if (this.paginationContainers.length) {
			// Draw the rest of rows
			this.outputTableClose(aHtml);
			var oDiv = Zapatec.Utils.createElement('div', oContr, true);
			oDiv.innerHTML = aHtml.join('');
			// Pagination
			aHtml = [];
			this.outputPagination(aHtml);
			for (var iEl = 0; iEl < this.paginationContainers.length; iEl++) {
				this.paginationContainers[iEl].innerHTML = aHtml.join('');
			}
		} else {
			// Pagination
			aHtml.push('</tbody></table></td></tr>');
			this.outputPagination(aHtml);
			aHtml.push('</tbody></table>');
			// Draw the rest of rows
			var oDiv = Zapatec.Utils.createElement('div', oContr, true);
			oDiv.innerHTML = aHtml.join('');
		}
		// Fixed columns
		if (oConfig.fixedLeft > 0 || oConfig.horizontal) {
			var oFixed = Zapatec.Utils.createElement('div', oContr, true);
			oFixed.id = 'zpGrid' + this.id + 'DataFixedLeft';
			if (oFixed.style.setAttribute) {
				// IE
				oFixed.style.setAttribute('cssText', 'position:absolute;top:0px;\
				 left:expression(this.offsetParent.scrollLeft+"px")', 0);
			} else {
				// Other browsers don't support expressions yet
				oFixed.style.position = 'absolute';
				oFixed.style.top = '0px';
				oFixed.style.left = oContainer.scrollLeft + 'px';
			}
			var aHtml = [];
			this.outputTableOpen(aHtml, true);
			// Rows
			this.outputRows(aHtml, aCols, aFixedCols, aSpans, aRows, aTotals, true,
			 oFixed);
			this.outputTableClose(aHtml);
			var oDiv = Zapatec.Utils.createElement('div', oFixed, true);
			oDiv.innerHTML = aHtml.join('');
		}
		// Right column margin when resizing
		if (!oConfig.horizontal) {
			var oRs = Zapatec.Utils.createElement('div', oContr, true);
			oRs.id = 'zpGrid' + this.id + 'DataColResize';
			oRs.style.position = 'absolute';
			oRs.style.top = '0px';
			oRs.style.left = '0px';
			oRs.style.display = 'none';
			oRs.className = this.getClassName({
				prefix: 'zpGrid',
				suffix: 'ColResize'
			});
		}
	} else {
		// Table
		var aHtml = [];
		aHtml.push('<div style="position:absolute;top:0px;left:0px" id="zpGrid');
		aHtml.push(this.id);
		aHtml.push('BusyContainer"></div><div id="zpGrid');
		aHtml.push(this.id);
		aHtml.push('Container"><div>');
		this.outputTableOpen(aHtml, false, 'zpGrid' + this.id + 'DataTable');
		// Header
		this.outputFields(aHtml, aCols, aFixedCols, aSpans, aRows, aTotals);
		// Rows
		this.outputRows(aHtml, aCols, aFixedCols, aSpans, aRows, aTotals);
		// Pagination
		if (this.paginationContainers.length) {
			// Draw table
			this.outputTableClose(aHtml);
			aHtml.push('</div></div>');
			oContainer.innerHTML = aHtml.join('');
			// Pagination
			aHtml = [];
			this.outputPagination(aHtml);
			for (var iEl = 0; iEl < this.paginationContainers.length; iEl++) {
				this.paginationContainers[iEl].innerHTML = aHtml.join('');
			}
		} else {
			// Pagination
			aHtml.push('</tbody></table></td></tr>');
			this.outputPagination(aHtml);
			aHtml.push('</tbody></table></div></div>');
			// Draw table
			oContainer.innerHTML = aHtml.join('');
		}
		// Fixed columns
		if ((oConfig.fixedLeft > 0 || oConfig.horizontal) && !oConfig.visibleColumns) {
			var oFixed = Zapatec.Utils.createElement('div',
			 document.getElementById('zpGrid' + this.id + 'Container'), true);
			oFixed.id = 'zpGrid' + this.id + 'FixedLeft';
			if (oFixed.style.setAttribute) {
				// IE
				oFixed.style.setAttribute('cssText', 'position:absolute;top:0px;\
				 left:expression(this.offsetParent.scrollLeft+"px")', 0);
			} else {
				// Other browsers don't support expressions yet
				oFixed.style.position = 'absolute';
				oFixed.style.top = '0px';
				oFixed.style.left = oContainer.scrollLeft + 'px';
			}
			var aHtml = [];
			this.outputTableOpen(aHtml, true);
			// Header
			this.outputFields(aHtml, aCols, aFixedCols, aSpans, aRows, aTotals, true);
			// Rows
			this.outputRows(aHtml, aCols, aFixedCols, aSpans, aRows, aTotals, true);
			this.outputTableClose(aHtml);
			var oDiv = Zapatec.Utils.createElement('div', oFixed, true);
			oDiv.innerHTML = aHtml.join('');
		}
	}
	if (this.headerContainer || !oConfig.visibleColumns) {
		// If there is separate container for totals
		if (aTotals && this.totalsContainer && this.outputTotals) {
			this.totalsContainer.style.position = 'relative';
			// IE6 requires width for relative element containing other relative
			// elements
			if (this.totalsContainer.currentStyle &&
			 this.totalsContainer.currentStyle['width'] == 'auto') {
				this.totalsContainer.style.width = '100%';
			}
			var aHtml = [];
			aHtml.push('<div id="zpGrid');
			aHtml.push(this.id);
			aHtml.push('TotalsContainer"><div>');
			// Totals
			this.outputTableOpen(aHtml);
			this.outputTotals(aHtml, aCols, aFixedCols, aTotals);
			this.outputTableClose(aHtml);
			aHtml.push('</div>');
			// Fixed totals
			if (oConfig.fixedLeft > 0) {
				aHtml.push('<div id="zpGrid');
				aHtml.push(this.id);
				if (this.totalsContainer.style.setAttribute) {
					// IE
					aHtml.push('TotalsFixedLeft" style="position:absolute;top:0px;\
					 left:expression(this.offsetParent.scrollLeft+\'px\')"><div>');
				} else {
					// Other browsers don't support expressions yet
					aHtml.push('TotalsFixedLeft" style="position:absolute;top:0px;left:');
					aHtml.push(oContainer.scrollLeft);
					aHtml.push('px"><div>');
				}
				this.outputTableOpen(aHtml, true);
				this.outputTotals(aHtml, aCols, aFixedCols, aTotals, true);
				this.outputTableClose(aHtml);
				aHtml.push('</div></div>');
			}
			aHtml.push('</div>');
			// Draw totals
			this.totalsContainer.innerHTML = aHtml.join('');
			// Right column margin when resizing
			if (!oConfig.horizontal) {
				var oRs = Zapatec.Utils.createElement('div', this.totalsContainer, true);
				oRs.id = 'zpGrid' + this.id + 'TotalsColResize';
				oRs.style.position = 'absolute';
				oRs.style.top = '0px';
				oRs.style.left = '0px';
				oRs.style.display = 'none';
				oRs.className = this.getClassName({
					prefix: 'zpGrid',
					suffix: 'ColResize'
				});
			}
		}
		// Synchronize scrolling
		this.syncScroll();
	}
	// Custom totals
	if (typeof oConfig.callbackTotalsDisplay == 'function') {
		oConfig.callbackTotalsDisplay(this, aTotals);
	} else if (aTotals && typeof oConfig.callbackTotalDisplay == 'function') {
		var iTotals = aTotals.length;
		var iRow;
		for (iRow = 0; iRow < iTotals; iRow++) {
			oConfig.callbackTotalDisplay(this, aTotals[iRow]);
		}
	}
	// Custom pagination
	if (typeof oConfig.callbackPaginationDisplay == 'function' &&
	 oConfig.rowsPerPage > 0) {
		oConfig.callbackPaginationDisplay(this);
	}
	// Finish refresh
	this.onRefresh();
};

/**
 * Visualizes row selection.
 *
 * @private
 * @param {object} oRow Row object
 */
Zapatec.Grid.prototype.visualizeSelectRow = function(oRow) {
	// Check arguments
	if (!oRow) {
		return;
	}
	// Get table row element
	var oTr = document.getElementById('zpGrid' + this.id + 'Row' + oRow.i);
	if (oTr) { // Can be on different page
		// Get row number because rows can be sorted and filtered
		/zpGridRow(\d+)/.exec(oTr.className);
		var sRow = RegExp.$1;
		// Select row
		var aClSelected = [];
		aClSelected.push(' zpGridRowSelected zpGridRowSelected');
		aClSelected.push(sRow);
		aClSelected.push(' zpGridRowSelected');
		aClSelected.push(sRow % 2 == 1 ? 'Odd' : 'Even');
		if (oTr.className.indexOf('zpGridRowLast') >= 0) { // Last row
			aClSelected.push(' zpGridRowSelectedLast');
		}
		var sClassSelected = aClSelected.join('');
		oTr.className += sClassSelected;
		// Get fixed part of row
		oTr = document.getElementById('zpGrid' + this.id + 'Row' + oRow.i +
		 'Fixed');
		if (oTr) {
			oTr.className += sClassSelected;
		}
	}
};

/**
 * Visualizes row unselection.
 *
 * @private
 * @param {object} oRow Row object
 */
Zapatec.Grid.prototype.visualizeUnselectRow = function(oRow) {
	// Check arguments
	if (!oRow) {
		return;
	}
	// Get table row element
	var oTr = document.getElementById('zpGrid' + this.id + 'Row' + oRow.i);
	if (oTr) { // Can be on different page
		oTr.className = oTr.className.replace(/ zpGridRowSelected[^ ]*/g, '');
		// Get fixed part of row
		oTr = document.getElementById('zpGrid' + this.id + 'Row' + oRow.i +
		 'Fixed');
		if (oTr) {
			oTr.className = oTr.className.replace(/ zpGridRowSelected[^ ]*/g, '');
		}
	}
};

/**
 * Visualizes cell selection.
 *
 * @private
 * @param {object} oCell Cell object
 */
Zapatec.Grid.prototype.visualizeSelectCell = function(oCell) {
	// Check arguments
	if (!oCell) {
		return;
	}
	// Get table cell element
	var oTd = document.getElementById('zpGrid' + this.id + 'Row' + oCell.r +
	 'Cell' + oCell.i);
	if (oTd) { // Can be on different page
		// Select cell
		var aClSelected = [];
		aClSelected.push(' zpGridCellSelected zpGridCellSelected');
		aClSelected.push(oCell.i);
		aClSelected.push(' zpGridCellSelected');
		aClSelected.push(oCell.i % 2 == 1 ? 'Odd' : 'Even');
		if (oCell.i == this.fields.length - 1) { // Last cell
			aClSelected.push(' zpGridCellSelectedLast');
		}
		oTd.className += aClSelected.join('');
	}
};

/**
 * Visualizes cell unselection.
 *
 * @private
 * @param {object} oCell Cell object
 */
Zapatec.Grid.prototype.visualizeUnselectCell = function(oCell) {
	// Check arguments
	if (!oCell) {
		return;
	}
	// Get table row element
	var oTd = document.getElementById('zpGrid' + this.id + 'Row' + oCell.r +
	 'Cell' + oCell.i);
	if (oTd) { // Can be on different page
		oTd.className = oTd.className.replace(/ zpGridCellSelected[^ ]*/g, '');
	}
};

/**
 * Displays filter out forms.
 *
 * @private
 * @param {object} oFilterOut Object passed through config option
 * @param {object} aVals Array of unique column values
 */
Zapatec.Grid.prototype.visualizeFilterOut = function(oFilterOut, aVals) {
	// Get container
	if (!oFilterOut) {
		return;
	}
	var oContr = Zapatec.Widget.getElementById(oFilterOut.container);
	if (!oContr) {
		return;
	}
	// Get columns
	var aCols = oFilterOut.column;
	if (!(aCols instanceof Array)) {
		aCols = [aCols];
	}
	// Get fields
	var aFields = [];
	for (var iCol = 0; iCol < aCols.length; iCol++) {
		var oField = this.fields[aCols[iCol]];
		if (!oField) {
			continue;
		}
		aFields.push(oField);
	}
	if (!aFields.length) {
		return;
	}
	// Join column numbers
	var sCols = aCols.join(',');
	// "Select all" and "Clear" links
	var aHtml = [];
	aHtml.push('<div><a href="javascript:void(0)" onclick="Zapatec.Grid.checkboxSelectAllOnClick(\'');
	aHtml.push(this.id);
	aHtml.push("',[");
	aHtml.push(sCols);
	aHtml.push('])">');
	aHtml.push(this.getMessage('labelSelectAll'));
	aHtml.push('</a> | <a href="javascript:void(0)" onclick="Zapatec.Grid.checkboxClearAllOnClick(\'');
	aHtml.push(this.id);
	aHtml.push("',[");
	aHtml.push(sCols);
	aHtml.push('])">');
	aHtml.push(this.getMessage('labelClear'));
	aHtml.push('</a></div>');
	// Checkboxes
	for (var iVal = 0; iVal < aVals.length; iVal++) {
		var sVal = aVals[iVal].v + '';
		var sEscaped = escape(sVal);
		aHtml.push('<div><input type="checkbox" ');
		// Check if this value is hidden
		for (var iField = 0; iField < aFields.length; iField++) {
			var oField = aFields[iField];
			if (!(oField.hiddenValues instanceof Array) ||
			 Zapatec.Utils.arrIndexOf(oField.hiddenValues, sVal) < 0) {
				aHtml.push('checked ');
				break;
			}
		}
		aHtml.push('onclick="');
		if (oFilterOut.onclick) {
			aHtml.push(oFilterOut.onclick);
			aHtml.push(';');
		}
		aHtml.push("Zapatec.Grid.checkboxOnClick('");
		aHtml.push(this.id);
		aHtml.push("',[");
		aHtml.push(sCols);
		aHtml.push("],unescape('");
		aHtml.push(sEscaped);
		aHtml.push("'),this.checked)\" /><a href=\"javascript:void(0)\" onclick=\"Zapatec.Grid.checkboxLinkOnClick('");
		aHtml.push(this.id);
		aHtml.push("',[");
		aHtml.push(sCols);
		aHtml.push("],unescape('");
		aHtml.push(sEscaped);
		aHtml.push("'))\">");
		aHtml.push(sVal);
		aHtml.push('</a></div>');
	}
	oContr.innerHTML = aHtml.join('');
};

/**
 * Returns container for "Loading" or "Updating" image.
 *
 * @private
 * @return Container for "Loading" or "Updating" image
 * @type object
 */
Zapatec.Grid.prototype.getBusyContainer = function() {
	if (!this.container) {
		return;
	}
	// Get container
	var oContr = document.getElementById('zpGrid' + this.id + 'BusyContainer');
	if (oContr) {
		oContr.style.left = this.container.scrollLeft + 'px';
		oContr.style.top = this.container.scrollTop + 'px';
		oContr.style.width = Math.min(this.container.clientWidth,
		 this.getGridDimensions().width) + 'px';
		oContr.style.height = this.container.clientHeight + 'px';
	} else {
		oContr = this.container;
	};
	return oContr;
};

/**
 * Displays "Loading" image. Attached to fetchSourceStart event.
 * @private
 */
Zapatec.Grid.prototype.displayLoading = function() {
	// Remove "Updating"
	this.removeUpdating();
	// Display image
	Zapatec.Transport.showBusy({
		busyContainer: this.getBusyContainer()
	});
};

/**
 * Removes "Loading" image. Attached to fetchSourceEnd event.
 * @private
 */
Zapatec.Grid.prototype.removeLoading = function() {
	// Remove image
	Zapatec.Transport.removeBusy({
		busyContainer: this.getBusyContainer()
	});
};

/**
 * Displays "Updating" image.
 * @private
 */
Zapatec.Grid.prototype.displayUpdating = function() {
	// Blinking message is irritative. Display it only when it's really needed.
	// Message can be safely skipped in large grids when there are < 50 of lines
	// to display because rendering takes most of time.
	var oConfig = this.config;
	if (!oConfig.dataOnDemand && !oConfig.totals.length) {
		var iFields = this.fields.length;
		if (this.totalRecords() * iFields < 2500) {
			if (this.recordsDisplayed() * iFields < 250) {
				return;
			}
			var iRowsPerPage = oConfig.rowsPerPage;
			if (iRowsPerPage > 0) {
				if (iRowsPerPage * iFields < 250) {
					return;
				}
			}
			var iVisibleRows = oConfig.visibleRows;
			if (iVisibleRows > 0) {
				if (iVisibleRows * iFields < 250) {
					return;
				}
			}
		}
	}
	// Remove "Loading"
	this.removeLoading();
	// Display image
	Zapatec.Transport.showBusy({
		busyContainer: this.getBusyContainer(),
		busyImage: 'zpupdating.gif'
	});
};

/**
 * Removes "Updating" image.
 * @private
 */
Zapatec.Grid.prototype.removeUpdating = function() {
	// Remove image
	Zapatec.Transport.removeBusy({
		busyContainer: this.getBusyContainer(),
		busyImage: 'zpupdating.gif'
	});
};

/**
 * Returns table cell element or undefined if field is not found. To get field
 * element by cell, pass cell object instead of field.
 *
 * @param {object} oField Field or cell object
 * @return Table cell element
 * @type object
 */
Zapatec.Grid.prototype.getFieldElement = function(oField) {
	if (oField) {
		return document.getElementById('zpGrid' + this.id + 'Field' + oField.i);
	}
};

/**
 * Returns table row element or undefined if row is on different page or not
 * found.
 *
 * @param {object} oRow Row object
 * @return Table row element
 * @type object
 */
Zapatec.Grid.prototype.getRowElement = function(oRow) {
	if (oRow) {
		return document.getElementById('zpGrid' + this.id + 'Row' + oRow.i);
	}
};

/**
 * Returns table row element or undefined if row is on different page or not
 * found.
 *
 * @param {object} oCell Cell object
 * @return Table row element
 * @type object
 */
Zapatec.Grid.prototype.getRowElementByCell = function(oCell) {
	if (oCell) {
		return document.getElementById('zpGrid' + this.id + 'Row' + oCell.r);
	}
};

/**
 * Returns table cell element or undefined if cell is on different page or not
 * found.
 *
 * @param {object} oCell Cell object
 * @return Table cell element
 * @type object
 */
Zapatec.Grid.prototype.getCellElement = function(oCell) {
	if (oCell) {
		return document.getElementById('zpGrid' + this.id + 'Row' + oCell.r +
		 'Cell' + oCell.i);
	}
};

/**
 * Redraws specified cell without redrawing whole grid. Useful after changing of
 * cell value.
 *
 * @param {object} oCell Cell object
 */
Zapatec.Grid.prototype.visualizeCellReadOnly = function(oCell) {
	var iGridId = this.id;
	var oRow = this.getRowByCell(oCell);
	var iRowId = this.getRowId(oRow);
	var iCellId = this.getCellId(oCell);
	// Get table row element
	var sRowId = 'zpGrid' + iGridId + 'Row' + iRowId;
	var oTr = document.getElementById(sRowId);
	// Get table row element for horizontal grid
	var oTc = document.getElementById('zpGrid' + iGridId + 'Col' + iCellId);
	// Get table cell element
	var sCellId = sRowId + 'Cell' + iCellId;
	var oTd = document.getElementById(sCellId);
	// Can be on different page
	if (oTd) {
		// Redraw cell
		var aHtml = [];
		this.outputCellValue(aHtml, this.getFieldByCell(oCell), oCell);
		var sHtml = aHtml.join('');
		oTd.innerHTML = sHtml;
		// Redraw hidden cell
		var oTdHidden = document.getElementById(sCellId + 'Hidden');
		if (oTdHidden) {
			oTdHidden.innerHTML = sHtml;
		}
		// Update row's className
		// Other cell in the row can still be edited
		var bEditingCell;
		var oEditingCell = this.editingCell;
		if (oEditingCell && this.getCellRowId(oEditingCell) == iRowId) {
			bEditingCell = true;
		}
		if (oTr) {
			// Vertical grid
			if (!bEditingCell) {
				oTr.className = oTr.className.replace(/ zpGridRowEditable[^ ]*/g, '');
			}
			oTr.className = oTr.className.replace(/ zpGridRowInvalid[^ ]*/g, '')
			 .split(/\s+/).join(' ');
			// Update fixed part of row's className
			var oTrFixed = document.getElementById(sRowId + 'Fixed');
			if (oTrFixed) {
				if (!bEditingCell) {
					oTrFixed.className = oTrFixed.className
					 .replace(/zpGridRowEditable[^ ]*/g, '');
				}
				oTrFixed.className = oTrFixed.className
				 .replace(/zpGridRowInvalid[^ ]*/g, '').split(/\s+/).join(' ');
			}
		} else if (oTc) {
			// Horizontal grid
			if (!bEditingCell) {
				oTc.className = oTc.className.replace(/ zpGridColEditable[^ ]*/g, '');
			}
			oTc.className = oTc.className.replace(/ zpGridColInvalid[^ ]*/g, '')
			 .split(/\s+/).join(' ');
		}
		// Update cell's className
		oTd.className = oTd.className.replace(/ zpGridCellEditable[^ ]*/g, '')
		 .replace(/ zpGridCellInvalid[^ ]*/g, '');
		// Validate cell
		if (!this.validateCell(oCell)) {
			var aCl;
			if (oTr) {
				// Vertical grid
				// Update row's className
				aCl = [];
				aCl.push(' zpGridRowInvalid zpGridRowInvalid');
				aCl.push(iRowId);
				aCl.push(' zpGridRowInvalid');
				aCl.push(oTr.className.indexOf('zpGridRowOdd') >= 0 ? 'Odd' : 'Even');
				if (oTr.className.indexOf('zpGridRowLast') >= 0) {
					// Last row
					aCl.push(' zpGridRowInvalidLast');
				}
				var sClass = aCl.join('');
				oTr.className += sClass;
				// Update fixed part of row's className
				if (oTrFixed) {
					oTrFixed.className += sClass;
				}
			} else if (oTc) {
				// Horizontal grid
				// Update row's className
				aCl = [];
				aCl.push(' zpGridColInvalid zpGridColInvalid');
				aCl.push(iCellId);
				aCl.push(' zpGridColInvalid');
				aCl.push(oTc.className.indexOf('zpGridColOdd') >= 0 ? 'Odd' : 'Even');
				if (oTc.className.indexOf('zpGridColLast') >= 0) {
					// Last row
					aCl.push(' zpGridColInvalidLast');
				}
				oTc.className += aCl.join('');
			}
			// Update cell's className
			aCl = [];
			aCl.push(' zpGridCellInvalid zpGridCellInvalid');
			aCl.push(iCellId);
			aCl.push(' zpGridCellInvalid');
			aCl.push(iCellId % 2 == 1 ? 'Odd' : 'Even');
			if (oTd.className.indexOf('zpGridCellLast') >= 0) {
				// Last cell
				aCl.push(' zpGridCellInvalidLast');
			}
			oTd.className += aCl.join('');
		}
	}
};

/**
 * Indicates during 0.5 second result of cell saving. Indicates twice if cell
 * was not saved.
 *
 * <pre>
 * Arguments format:
 * {
 *   cell: [object] cell object,
 *   saved: [boolean] true - saved, false - not saved,
 *   count: [number, private] indications count
 * }
 * </pre>
 *
 * @private
 * @param {object} oArg Arguments
 */
Zapatec.Grid.prototype.visualizeCellSavingResult = function(oArg) {
	// Get table cell element
	var oCell = oArg.cell;
	var sCellId = [
		'zpGrid',
		this.getId(),
		'Row',
		this.getCellRowId(oCell),
		'Cell',
		this.getCellId(oCell)
	].join('');
	var oTd = document.getElementById(sCellId);
	if (!oTd) {
		return;
	}
	// Indicate saving
	var bSaved = oArg.saved;
	var sClass = bSaved ? ' zpGridCellSaved' : ' zpGridCellNotSaved';
	oTd.className = [oTd.className, sClass].join('');
	// Remove indication in 0.5 second
	setTimeout(function() {
		var oTd = document.getElementById(sCellId);
		if (oTd) {
			oTd.className = oTd.className.replace(new RegExp(sClass, 'g'), '');
		}
	}, 500);
	// Indicate twice if not saved
	if (!bSaved && !oArg.count) {
		oArg.count = 1;
		var oGrid = this;
		setTimeout(function() {
			oGrid.visualizeCellSavingResult(oArg);
		}, 1000);
	}
};

/**
 * Indicates that cell was saved successfully.
 *
 * <pre>
 * Arguments format:
 * {
 *   cell: [object] cell object
 * }
 * </pre>
 *
 * @private
 * @param {object} oArg Arguments
 */
Zapatec.Grid.prototype.visualizeCellSaved = function(oArg) {
	oArg.saved = true;
	this.visualizeCellSavingResult(oArg);
};

/**
 * Indicates that error occured during cell saving.
 *
 * <pre>
 * Arguments format:
 * {
 *   cell: [object] cell object
 * }
 * </pre>
 *
 * @private
 * @param {object} oArg Arguments
 */
Zapatec.Grid.prototype.visualizeCellNotSaved = function(oArg) {
	oArg.saved = false;
	this.visualizeCellSavingResult(oArg);
};

/**
 * Adjusts number of rows per page in the grid when <b>fitInto</b> config option
 * is used. Calculates approximate number of rows per page and adjusts the grid.
 * Then attaches itself to <b>gridRefreshed</b> event and redraws grid. When
 * <b>gridRefreshed</b> event occurs, detaches itself from the event, corrects
 * adjustment after grid has been redrawn and we know precise row heights.
 * Then redraws grid again.
 * <pre>
 * Defines internal property <b>autoresizeState</b>.
 * </pre>
 */
Zapatec.Grid.prototype.autoresize = function() {
	// Both border and container must be defined
	var oBorder = this.border;
	if (!oBorder) {
		return;
	}
	var oFitInto = this.fitInto;
	if (!oFitInto) {
		return;
	}
	// Grid must not be in the middle of refresh
	if (this.refreshState) {
		this.autoresizeState = 0;
		return;
	}
	// Flag to make sure autoresize is not in the endless loop
	if (!this.autoresizeState) {
		this.autoresizeState = 0;
	} else if (this.autoresizeState > 2) {
		this.autoresizeState = 0;
		return;
	}
	// Turn off scroll bars in the container since grid should fit into it
	oFitInto.style.overflow = 'hidden';
	// Get container dimensions
	var fOffset = Zapatec.Utils.getElementOffset;
	var oContainerOffset = fOffset(oFitInto);
	var iHeight = oContainerOffset.height;
	var iWidth = oContainerOffset.width;
	// Indicates that grid needs to be refreshed
	var bRefresh = false;
	// Adjust width of the grid to fit into container
	var oContainerStyle = this.container.style;
	var sWidth = iWidth + 'px';
	if (oContainerStyle.width != sWidth) {
		oContainerStyle.width = sWidth;
		bRefresh = true;
	}
	// Get width of the grid
	var iGridWidth = this.getGridDimensions().width;
	// Determine if we need horizontal scroll bar and draw it
	if (/Safari/i.test(navigator.userAgent)) {
		// Safari crashes on refresh if overflow == 'scroll'
		if (iGridWidth && iGridWidth < iWidth) {
			oContainerStyle.overflow = 'hidden';
		} else {
			oContainerStyle.overflow = 'auto';
		}
	} else {
		if (iGridWidth && iGridWidth < iWidth) {
			oContainerStyle.overflowX = 'hidden';
			oContainerStyle.overflowY = 'hidden';
			oContainerStyle.overflow = 'hidden';
		} else {
			oContainerStyle.overflow = 'scroll';
			oContainerStyle.overflowX = 'scroll';
			oContainerStyle.overflowY = 'hidden';
		}
	}
	// Check if grid's height fits into container
	var iGridHeight = fOffset(oBorder).height;
	if (iHeight != iGridHeight) {
		// Calculate average row height
		var iAvgRowHeight = 0;
		var aRows = this.applyPaging();
		var iRowsPerPage = aRows.length;
		var sId = this.id.toString();
		var fOffset = Zapatec.Utils.getElementOffset;
		for (var iRow = 0; iRow < iRowsPerPage; iRow++) {
			// Safari always returns zero height for TR elements, so we need TD
			iAvgRowHeight += fOffset(document.getElementById(['zpGrid', sId, 'Row',
			 this.getRowId(aRows[iRow]), 'Cell0'].join(''))).height;
		}
		iAvgRowHeight /= iRowsPerPage;
		// Calculate rows per page
		while (iHeight < iGridHeight) {
			iGridHeight -= iAvgRowHeight;
			iRowsPerPage--;
		}
		while (iHeight > iGridHeight) {
			iGridHeight += iAvgRowHeight;
			iRowsPerPage++;
		}
		if (iHeight < iGridHeight) {
			iRowsPerPage--;
		}
		if (iRowsPerPage < 1) {
			iRowsPerPage = 1;
		}
		// If value didn't change, just refresh the grid because width could be
		// changed
		var oAutoresizeFrame = this.autoresizeFrame;
		if (iRowsPerPage != oAutoresizeFrame.visibleRows) {
			if (oAutoresizeFrame.direction == -1) {
				// Previous page
				oAutoresizeFrame.currentRow += oAutoresizeFrame.visibleRows;
				oAutoresizeFrame.currentRow -= iRowsPerPage;
			}
			oAutoresizeFrame.visibleRows = iRowsPerPage;
			// Fix page number
			this.currentPage =
			 Math.ceil(oAutoresizeFrame.currentRow / oAutoresizeFrame.visibleRows);
			// Flag to make sure autoresize is not in the endless loop
			this.autoresizeState++;
			this.refresh();
			return;
		}
	}
	// Refresh because width was changed
	if (bRefresh) {
		// Prevent autoresize after refresh
		this.autoresizeState = 3;
		this.refresh();
		return;
	}
	// Reset flag
	this.autoresizeState = 0;
};

/**
 * Indicates that column resizing was started.
 * @private
 */
Zapatec.Grid.columnResizing = false;

/**
 * Shows verical line when column right margin is dragged. Attached to static
 * dragStart event. See {@link Zapatec.Drag#start} for details.
 *
 * @private
 * @param {object} oArg Argument object received from the event.
 */
Zapatec.Grid.onColResizStart = function(oArg) {
	// Check arguments
	if (!oArg) {
		return;
	}
	var oEl = oArg.el;
	if (!oEl || !oEl.id) {
		return;
	}
	// Get grid id and column number
	var aM = oEl.id.match(/^zpGrid(\d+)(Col|Span)(\d+)Resize$/);
	if (!(aM instanceof Array) || aM.length < 4) {
		return;
	}
	var iGrid = aM[1];
	var oGrid = Zapatec.Widget.getWidgetById(iGrid);
	if (!(oGrid instanceof Zapatec.Grid)) {
		return;
	}
	var sGrid = ['zpGrid', iGrid].join('');
	var iColId = aM[3];
	var oSt = oEl.style;
	// Show vertical line
	// Get vertical line dimensions
	var oUtils = Zapatec.Utils;
	var oOffsetEl = oUtils.getElementOffset(oEl);
	// Get container dimensions
	var oOffsetCont =
	 oUtils.getElementOffset(oGrid.headerContainer || oGrid.container);
	var oOffsetContScroll =
	 oUtils.getElementOffsetScrollable(oGrid.headerContainer || oGrid.container);
	// Get pagination dimensions
	var iPH = 0;
	if (!oGrid.paginationContainers.length) {
		var oPC = document.getElementById([sGrid, 'Pagination'].join(''));
		if (oPC) {
			iPH = oPC.offsetHeight;
		}
	}
	// Shift vertical line to the top margin of the container
	if (oOffsetEl.top != oOffsetCont.top) {
		oSt.top = oOffsetCont.top - oOffsetEl.top + 'px';
	}
	// Set vertical line height
	var iH = oOffsetCont.height;
	// Vertical line shouldn't cover pagination
	if (!oGrid.headerContainer) {
		iH -= iPH;
	}
	oSt.height = iH + 'px';
	// Show vertical line
	oEl.className = 'zpGridColResize';
	// If separate header container
	oEl = document.getElementById([sGrid, 'DataColResize'].join(''));
	if (oEl) {
		// Move vertical line
		oSt = oEl.style;
		oSt.left = oOffsetEl.left - oOffsetContScroll.left + 'px';
		// Set vertical line height
		// Vertical line shouldn't cover pagination
		iH = oEl.parentNode.offsetHeight - iPH;
		oSt.height = iH + 'px';
		// Show vertical line
		oSt.display = '';
	}
	// If separate totals container
	oEl = document.getElementById([sGrid, 'TotalsColResize'].join(''));
	if (oEl) {
		// Move vertical line
		oSt = oEl.style;
		oSt.left = oOffsetEl.left - oOffsetContScroll.left + 'px';
		// Set vertical line height
		oSt.height = oEl.parentNode.offsetHeight + 'px';
		// Show vertical line
		oSt.display = '';
	}
	// Remove onclick event temporary to prevent sorting when margin is dropped
	oEl = document.getElementById([sGrid, 'Col', iColId, 'Title'].join(''));
	if (!oEl) {
		return;
	}
	// Remove timeout to prevent pending restoring of onclick event
	if (oEl.zpTimeout) {
		clearTimeout(oEl.zpTimeout);
		oEl.zpTimeout = null;
	}
	// Get td element
	oEl = oEl.parentNode;
	if (!oEl) {
		return;
	}
	oEl = oEl.parentNode;
	if (!oEl) {
		return;
	}
	if (oEl.onclick) {
		oEl.zpOnclick = oEl.onclick;
		oEl.onclick = null;
	}
	// Indicate that resizing was started
	Zapatec.Grid.columnResizing = true;
};

/**
 * Moves verical line when column right margin is dragged. Attached to static
 * dragMove event. See {@link Zapatec.Drag#start} for details.
 *
 * @private
 * @param {object} oArg Argument object received from the event.
 */
Zapatec.Grid.onColResizMove = function(oArg) {
	// Check arguments
	if (!oArg) {
		return;
	}
	var oEl = oArg.el;
	if (!oEl || !oEl.id) {
		return;
	}
	// Get grid id and column number
	var aM = oEl.id.match(/^zpGrid(\d+)(Col|Span)(\d+)Resize$/);
	if (!(aM instanceof Array) || aM.length < 4) {
		return;
	}
	var iGrid = aM[1];
	var sGrid = ['zpGrid', iGrid].join('');
	var iOffset = oArg.left - oArg.prevLeft;
	var oSt;
	// If separate header container
	oEl = document.getElementById([sGrid, 'DataColResize'].join(''));
	if (oEl) {
		// Move vertical line
		oSt = oEl.style;
		oSt.left = parseInt(oSt.left) + iOffset + 'px';
	}
	// If separate totals container
	oEl = document.getElementById([sGrid, 'TotalsColResize'].join(''));
	if (oEl) {
		// Move vertical line
		oSt = oEl.style;
		oSt.left = parseInt(oSt.left) + iOffset + 'px';
	}
};

/**
 * Resizes column and hides verical line when column right margin is dropped.
 * Attached to static dragEnd event. See {@link Zapatec.Drag#start} for details.
 *
 * @private
 * @param {object} oArg Argument object received from the event.
 */
Zapatec.Grid.onColResizEnd = function(oArg) {
	// Check arguments
	if (!oArg) {
		return;
	}
	var oEl = oArg.el;
	if (!oEl || !oEl.id) {
		return;
	}
	// Get grid id and column number
	var aM = oEl.id.match(/^zpGrid(\d+)(Col|Span)(\d+)Resize$/);
	if (!(aM instanceof Array) || aM.length < 4) {
		return;
	}
	// Indicate that resizing was ended
	Zapatec.Grid.columnResizing = false;
	var iGrid = aM[1];
	var oGrid = Zapatec.Widget.getWidgetById(iGrid);
	if (!oGrid) {
		return;
	}
	var sGrid = ['zpGrid', iGrid].join('');
	var iColId = aM[3];
	var sTitle = [sGrid, 'Col', iColId, 'Title'].join('');
	var oSt = oEl.style;
	// Hide verical line
	oEl.className = 'zpGridColResizeHidden';
	// Restore verical line position and height
	oSt.top = '';
	oSt.height = '';
	// If separate header container
	var oDiv = document.getElementById([sGrid, 'DataColResize'].join(''));
	var oDivSt;
	if (oDiv) {
		// Hide vertical line
		oDivSt = oDiv.style;
		oDivSt.display = 'none';
		// Restore verical line position and height
		oDivSt.left = '';
		oDivSt.height = '';
	}
	// If separate totals container
	oDiv = document.getElementById([sGrid, 'TotalsColResize'].join(''));
	if (oDiv) {
		// Hide vertical line
		oDivSt = oDiv.style;
		oDivSt.display = 'none';
		// Restore verical line position and height
		oDivSt.left = '';
		oDivSt.height = '';
	}
	// Set column width
	var oTitle = document.getElementById(sTitle);
	if (!oTitle) {
		return;
	}
	// Get shift
	var iShift = oArg.left - oArg.startLeft;
	if (iShift) {
		// Needed for spanned columns
		oSt.left = '';
		// Get new width
		var iWidth = oTitle.offsetWidth + iShift;
		// May be when spans are present
		if (iWidth < 10) {
			iWidth = 10;
		}
		// Change column width
		oGrid.outSetColWidth(iColId, iWidth);
		// Because FF sometimes doesn't resize it automatically into lower side
		// Can be tested on toolbar grid
		oDiv = document.getElementById([sGrid, 'Container'].join(''));
		if (oDiv) {
			oDiv.style.width = oGrid.getGridDimensions().width + 'px';
		}
	}
	// Restore sorting
	// Wait while this event is ended
	// Save timeout to be able to clean it if needed
	oTitle.zpTimeout = setTimeout(function() {
		// Get div element
		var oEl = document.getElementById(sTitle);
		if (!oEl) {
			return;
		}
		// Remove timeout
		oEl.zpTimeout = null;
		// Get td element
		oEl = oEl.parentNode;
		if (!oEl) {
			return;
		}
		oEl = oEl.parentNode;
		if (!oEl) {
			return;
		}
		// Restore event
		if (oEl.zpOnclick) {
			oEl.onclick = oEl.zpOnclick;
			oEl.zpOnclick = null;
		}
		// Fire event
		Zapatec.Widget.callMethod(iGrid, 'fireEvent', 'gridResizedColumn', iColId,
		 iShift);
	}, 0);
};

// Set event listeners responsible for column resizing
Zapatec.EventDriven.addEventListener('dragStart', Zapatec.Grid.onColResizStart);
Zapatec.EventDriven.addEventListener('dragMove', Zapatec.Grid.onColResizMove);
Zapatec.EventDriven.addEventListener('dragEnd', Zapatec.Grid.onColResizEnd);

/**
 * Indicates that mouse selection was started.
 * @private
 */
Zapatec.Grid.mouseSelection = false;

/**
 * Holds id of last mouseovered cell's td element during mouse selection.
 * @private
 */
Zapatec.Grid.mouseOverCell = '';

/**
 * Prepares grid for selection with mouse and calls {@link Zapatec.Drag#start}.
 *
 * @private
 * @param {number} iRow Row id
 * @param {number} iCell Cell id
 */
Zapatec.Grid.prototype.mouseSelect = function(iRow, iCell) {
	// Now selection works with left mouse button only
	var oEv = window.event;
	var iButton = oEv.button || oEv.which;
	if (iButton != 1) {
		return;
	}
	var oUtils = Zapatec.Utils;
	// Check arguments
	var sTdId = ['zpGrid', this.id, 'Row', iRow, 'Cell', iCell].join('');
	var oTd = document.getElementById(sTdId);
	if (!oTd) {
		return;
	}
	var oBody = document.body;
	if (!oBody) {
		return;
	}
	// Create selection frame
	var sId = [sTdId, 'Select'].join('');
	var oEl = document.createElement('div');
	var oSt = oEl.style;
	oBody.appendChild(oEl);
	oSt.position = 'absolute';
	oSt.width = '0px';
	oSt.height = '0px';
	oSt.padding = '0px';
	oSt.margin = '0px';
	oEl.className = this.getClassName({
		prefix: 'zpGrid',
		suffix: 'MouseSelection'
	});
	var oPos = oUtils.getMousePos(oEv);
	oSt.left = oPos.pageX + 'px';
	oSt.top = oPos.pageY + 'px';
	// Hide to prevent appearing of the frame on click event. Once it is resized,
	// it becomes visible.
	oSt.visibility = 'hidden';
	oEl.id = sId;
	// Start resizing of the frame
	Zapatec.Drag.start(oEv, sId, {resize: true});
};

/**
 * Does something when selection is started. Attached to static dragStart event.
 * See {@link Zapatec.Drag#start} for details.
 *
 * @private
 * @param {object} oArg Argument object received from the event.
 */
Zapatec.Grid.onMouseSelStart = function(oArg) {
};

/**
 * Shows selection frame. Attached to static dragMove event. See
 * {@link Zapatec.Drag#move} for details.
 *
 * @private
 * @param {object} oArg Argument object received from the event.
 */
Zapatec.Grid.onMouseSelMove = function(oArg) {
	// Check arguments
	if (!oArg) {
		return;
	}
	var oEl = oArg.el;
	if (!oEl || !oEl.id) {
		return;
	}
	// Get grid, row and cell id
	var aM = oEl.id.match(/^((zpGrid\d+Row\d+)Cell\d+)Select$/);
	if (!(aM instanceof Array) || aM.length < 3) {
		return;
	}
	// Show selection frame
	var oSt = oEl.style;
	if (oSt.visibility == 'hidden') {
		// Deactivate cell
		oEl = document.getElementById(aM[1]);
		if (oEl) {
			oEl.onmouseout();
		}
		// Deactivate row
		oEl = document.getElementById(aM[2]);
		if (oEl) {
			oEl.onmouseout();
		}
		// Show selection frame
		oSt.visibility = 'visible';
		// Indicate that selection was started
		var oGridClass = Zapatec.Grid;
		oGridClass.mouseSelection = true;
		// Clear last mouseovered cell id
		oGridClass.mouseOverCell = '';
	}
};

/**
 * Removes selection frame and selects covered cells. Attached to static dragEnd
 * event. See {@link Zapatec.Drag#end} for details.
 *
 * @private
 * @param {object} oArg Argument object received from the event.
 */
Zapatec.Grid.onMouseSelEnd = function(oArg) {
	// Check arguments
	if (!oArg) {
		return;
	}
	var oEl = oArg.el;
	if (!oEl || !oEl.id) {
		return;
	}
	// Get grid, row and cell id
	var aM = oEl.id.match(/^zpGrid(\d+)Row(\d+)Cell(\d+)Select$/);
	if (!(aM instanceof Array) || aM.length < 4) {
		return;
	}
	// Remove frame
	oEl.parentNode.removeChild(oEl);
	var oGridClass = Zapatec.Grid;
	oGridClass.mouseSelection = false;
	// Get grid object
	var iGrid = aM[1];
	var oGrid = Zapatec.Widget.getWidgetById(iGrid);
	if (!oGrid) {
		return;
	}
	var iOrigRow = aM[2];
	var iOrigCell = aM[3];
	// Get target cell
	aM = oGridClass.mouseOverCell.match(/^zpGrid(\d+)Row(\d+)Cell(\d+)/);
	if (!(aM instanceof Array) || aM.length < 4) {
		return;
	}
	// Check that this is the same grid
	if (aM[1] != iGrid) {
		return;
	}
	var iTargRow = aM[2];
	var iTargCell = aM[3];
	// Select all rows and cells between origin and target cells
	var aRows = oGrid.applyPaging();
	var iRows = aRows.length;
	var aFields = oGrid.fields;
	var iFields = aFields.length;
	// Find first row
	var iR, oR, iRI;
	for (iR = 0; iRows--; iR++) {
		oR = aRows[iR];
		if (oR) {
			iRI = oR.i;
			// First row can be iOrigRow or iTargRow. We don't know which of them and
			// need to remove one.
			if (iRI == iOrigRow) {
				iOrigRow = -1;
				break;
			}
			if (iRI == iTargRow) {
				iTargRow = -1;
				break;
			}
		}
	}
	if (!++iRows) {
		return;
	}
	// Find first cell
	var aCells = oR.cells;
	var iC, oC, iCI;
	for (iC = 0; iFields--; iC++) {
		oC = aCells[iC];
		if (oC) {
			iCI = oC.i;
			// First cell can be iOrigCell or iTargCell. We don't know which of them
			// and need to remove one.
			if (iCI == iOrigCell) {
				iOrigCell = -1;
				break;
			}
			if (iCI == iTargCell) {
				iTargCell = -1;
				break;
			}
		}
	}
	if (!++iFields) {
		return;
	}
	var iFirstCell = iC;
	// Select rows and cells
	var iCells, oF;
	for (; iRows--; iR++) {
		oR = aRows[iR];
		if (oR) {
			oGrid.selectRow(oR);
			aCells = oR.cells;
			iCells = iFields;
			for (iC = iFirstCell; iCells--; iC++) {
				oF = aFields[iC];
				if (oF && !oF.hidden) {
					oC = aCells[iC];
					if (oC) {
						oGrid.selectCell(oC);
						iCI = oC.i;
						if (iCI == iOrigCell || iCI == iTargCell) {
							break;
						}
					}
				}
			}
			iRI = oR.i;
			if (iRI == iOrigRow || iRI == iTargRow) {
				// Last row
				break;
			}
		}
	}
};

// Set event listeners responsible for mouse selection
Zapatec.EventDriven.addEventListener('dragStart', Zapatec.Grid.onMouseSelStart);
Zapatec.EventDriven.addEventListener('dragMove', Zapatec.Grid.onMouseSelMove);
Zapatec.EventDriven.addEventListener('dragEnd', Zapatec.Grid.onMouseSelEnd);

/**
 * Holds id of currently dragged cell's td element.
 * @private
 */
Zapatec.Grid.draggingCell = '';

/**
 * Prepares cell for dragging.
 *
 * @private
 * @param {number} iRow Row id
 * @param {number} iCell Cell id
 */
Zapatec.Grid.prototype.dragCell = function(iRow, iCell) {
	var sTdId = ['zpGrid', this.id, 'Row', iRow, 'Cell', iCell].join('');
	var oUtils = Zapatec.Utils;
	var oGridClass = Zapatec.Grid;
	oGridClass.draggingCell = sTdId;
	oUtils.addEvent(document, 'mousemove', oGridClass.dragCellStart);
	oUtils.addEvent(document, 'mouseup', oGridClass.dragCellFalse);
};

/**
 * Starts dragging the cell after mousedown and mousemove event have occured
 * sequentially. Calls {@link Zapatec.Drag#start}.
 * @private
 */
Zapatec.Grid.dragCellStart = function() {
	var oUtils = Zapatec.Utils;
	var oGridClass = Zapatec.Grid;
	oUtils.removeEvent(document, 'mousemove', oGridClass.dragCellStart);
	oUtils.removeEvent(document, 'mouseup', oGridClass.dragCellFalse);
	// Create dragged clone of the cell
	var sTdId = oGridClass.draggingCell;
	var oTd = document.getElementById(sTdId);
	if (!oTd) {
		return;
	}
	// Get cell content
	var oDiv = document.getElementById([sTdId, 'Div'].join(''));
	if (!oDiv) {
		return;
	}
	var sId = [sTdId, 'Drag'].join('');
	var oEl = document.createElement('div');
	var oSt = oEl.style;
	oTd.appendChild(oEl);
	oSt.position = 'absolute';
	oEl.className = oDiv.className;
	oEl.innerHTML = oDiv.innerHTML;
	oEl.id = sId;
	// Check that mouse cursor isn't above the dragged clone. This is important
	// for IE because otherwise srcElement returns dragged element instead of the
	// target.
	var oEv = window.event;
	var iElTop = oUtils.getElementOffset(oEl).top;
	var iEvTop = oUtils.getMousePos(oEv).pageY;
	if (iElTop < iEvTop) {
		oSt.top = oEl.offsetTop + iEvTop - iElTop + 1 + 'px';
	}
	// Start dragging of the clone
	Zapatec.Drag.start(oEv, sId);
};

/**
 * Cancels dragging if this was just a click.
 * @private
 */
Zapatec.Grid.dragCellFalse = function() {
	var oUtils = Zapatec.Utils;
	var oGridClass = Zapatec.Grid;
	oUtils.removeEvent(document, 'mousemove', oGridClass.dragCellStart);
	oUtils.removeEvent(document, 'mouseup', oGridClass.dragCellFalse);
};

/**
 * Can do something when cell is dragged. Attached to static dragStart event.
 * See {@link Zapatec.Drag#start} for details.
 *
 * @private
 * @param {object} oArg Argument object received from the event.
 */
Zapatec.Grid.onCellDragStart = function(oArg) {
};

/**
 * Can do something when cell is dragged. Attached to static dragMove event.
 * See {@link Zapatec.Drag#move} for details.
 *
 * @private
 * @param {object} oArg Argument object received from the event.
 */
Zapatec.Grid.onCellDragMove = function(oArg) {
};

/**
 * Removes dragging and copies content of dragged cell into target cell when
 * cell is dropped. Attached to static dragEnd event. See
 * {@link Zapatec.Drag#end} for details.
 *
 * @private
 * @param {object} oArg Argument object received from the event.
 */
Zapatec.Grid.onCellDragEnd = function(oArg) {
	// Check arguments
	if (!oArg) {
		return;
	}
	var oEl = oArg.el;
	if (!oEl || !oEl.id) {
		return;
	}
	// Get grid, row and cell id
	var aM = oEl.id.match(/^zpGrid(\d+)Row(\d+)Cell(\d+)Drag$/);
	if (!(aM instanceof Array) || aM.length < 4) {
		return;
	}
	var iGrid = aM[1];
	var oGrid = Zapatec.Widget.getWidgetById(iGrid);
	if (!oGrid) {
		return;
	}
	var oCell = oGrid.getCellById(aM[2], aM[3]);
	if (!oCell) {
		return;
	}
	// Remove dragged clone
	oEl.style.display = 'none';
	// Timeout is needed for Opera to remove element from the screen
	setTimeout(function() {
		oEl.parentNode.removeChild(oEl);
	}, 0);
	// Get target element
	var oEv = oArg.event;
	var oTarget = oEv.target || oEv.srcElement;
	if (!oTarget || !oTarget.id) {
		return;
	}
	// Check that target element is a grid cell
	aM = oTarget.id.match(/^zpGrid(\d+)Row(\d+)Cell(\d+)/);
	if (!(aM instanceof Array) || aM.length < 4) {
		return;
	}
	// Check that this is the same grid
	if (aM[1] != iGrid) {
		return;
	}
	var iTargetCell = aM[3];
	var oTargetCell = oGrid.getCellById(aM[2], iTargetCell);
	if (!oTargetCell) {
		return;
	}
	// Replace data in the target cell
	oGrid.setCellValue(oTargetCell, oCell.v);
	// Display updates
	oGrid.visualizeCellReadOnly(oTargetCell);
	// Redraw totals
	oGrid.redrawTotals({
		column: iTargetCell
	});
	// Redraw filter out forms
	oGrid.displayFilterOut();
};

// Set event listeners responsible for cell dragging
Zapatec.EventDriven.addEventListener('dragStart', Zapatec.Grid.onCellDragStart);
Zapatec.EventDriven.addEventListener('dragMove', Zapatec.Grid.onCellDragMove);
Zapatec.EventDriven.addEventListener('dragEnd', Zapatec.Grid.onCellDragEnd);

/**
 * Holds id of currently dragged field's td element.
 * @private
 */
Zapatec.Grid.draggingColumn = '';

/**
 * Prepares field for dragging.
 *
 * @private
 * @param {number} iField Field id
 */
Zapatec.Grid.prototype.dragColumn = function(iField) {
	// Field can't be dragged while resizing column
	if (Zapatec.Grid.columnResizing) {
		return;
	}
	var sTdId = ['zpGrid', this.id, 'Field', iField].join('');
	var oUtils = Zapatec.Utils;
	var oGridClass = Zapatec.Grid;
	oGridClass.draggingColumn = sTdId;
	oUtils.addEvent(document, 'mousemove', oGridClass.dragColumnStart);
	oUtils.addEvent(document, 'mouseup', oGridClass.dragColumnFalse);
};

/**
 * Starts dragging the column after mousedown and mousemove event have occured
 * sequentially. Calls {@link Zapatec.Drag#start}.
 * @private
 */
Zapatec.Grid.dragColumnStart = function() {
	var oUtils = Zapatec.Utils;
	var oGridClass = Zapatec.Grid;
	oUtils.removeEvent(document, 'mousemove', oGridClass.dragColumnStart);
	oUtils.removeEvent(document, 'mouseup', oGridClass.dragColumnFalse);
	// Create dragged clone of the field
	var sTdId = oGridClass.draggingColumn;
	var oTd = document.getElementById(sTdId);
	if (!oTd) {
		return;
	}
	// Get field content
	var oDiv =
	 document.getElementById([sTdId.replace(/Field/, 'Col'), 'Title'].join(''));
	if (!oDiv) {
		return;
	}
	var sId = [sTdId, 'Drag'].join('');
	var oEl = document.createElement('div');
	var oSt = oEl.style;
	oTd.appendChild(oEl);
	oSt.position = 'absolute';
	oEl.className = oDiv.className;
	oEl.innerHTML = oDiv.innerHTML;
	oEl.id = sId;
	// Check that mouse cursor isn't above the dragged clone. This is important
	// for IE because otherwise srcElement returns dragged element instead of the
	// target.
	var oEv = window.event;
	var iElTop = oUtils.getElementOffset(oEl).top;
	var iEvTop = oUtils.getMousePos(oEv).pageY;
	if (iElTop < iEvTop) {
		oSt.top = oEl.offsetTop + iEvTop - iElTop + 1 + 'px';
	}
	// Start dragging of the clone
	Zapatec.Drag.start(oEv, sId);
};

/**
 * Cancels dragging if this was just a click.
 * @private
 */
Zapatec.Grid.dragColumnFalse = function() {
	var oUtils = Zapatec.Utils;
	var oGridClass = Zapatec.Grid;
	oUtils.removeEvent(document, 'mousemove', oGridClass.dragColumnStart);
	oUtils.removeEvent(document, 'mouseup', oGridClass.dragColumnFalse);
};

/**
 * Can do something when field is dragged. Attached to static dragStart event.
 * See {@link Zapatec.Drag#start} for details.
 *
 * @private
 * @param {object} oArg Argument object received from the event.
 */
Zapatec.Grid.onColumnDragStart = function(oArg) {
};

/**
 * Can do something when field is dragged. Attached to static dragMove event.
 * See {@link Zapatec.Drag#move} for details.
 *
 * @private
 * @param {object} oArg Argument object received from the event.
 */
Zapatec.Grid.onColumnDragMove = function(oArg) {
};

/**
 * Removes dragging and moves column when field is dropped. Attached to static
 * dragEnd event. See {@link Zapatec.Drag#end} for details.
 *
 * @private
 * @param {object} oArg Argument object received from the event.
 */
Zapatec.Grid.onColumnDragEnd = function(oArg) {
	// Check arguments
	if (!oArg) {
		return;
	}
	var oEl = oArg.el;
	if (!oEl || !oEl.id) {
		return;
	}
	// Get grid and field id
	var aM = oEl.id.match(/^zpGrid(\d+)Field(\d+)Drag$/);
	if (!(aM instanceof Array) || aM.length < 3) {
		return;
	}
	var iGrid = aM[1];
	var oGrid = Zapatec.Widget.getWidgetById(iGrid);
	if (!oGrid) {
		return;
	}
	var iField = aM[2];
	// Remove dragged clone
	oEl.style.display = 'none';
	// Timeout is needed for Opera to remove element from the screen
	setTimeout(function() {
		oEl.parentNode.removeChild(oEl);
	}, 0);
	// Get target element
	var oEv = oArg.event;
	var oTarget = oEv.target || oEv.srcElement;
	if (!oTarget || !oTarget.id) {
		return;
	}
	// Check that target element is a grid field
	aM = oTarget.id.match(/^zpGrid(\d+)Field(\d+)/);
	if (!(aM instanceof Array) || aM.length < 3) {
		aM = oTarget.id.match(/^zpGrid(\d+)Col(\d+)/);
		if (!(aM instanceof Array) || aM.length < 3) {
			return;
		}
	}
	// Check that this is the same grid
	if (aM[1] != iGrid) {
		return;
	}
	// Move column
	var bSuccess = oGrid.moveColumn({
		fieldId: iField,
		position: aM[2]
	});
	if (bSuccess) {
		// Redraw filter out forms
		oGrid.displayFilterOut();
	}
};

// Set event listeners responsible for field dragging
Zapatec.EventDriven.addEventListener('dragStart', Zapatec.Grid.onColumnDragStart);
Zapatec.EventDriven.addEventListener('dragMove', Zapatec.Grid.onColumnDragMove);
Zapatec.EventDriven.addEventListener('dragEnd', Zapatec.Grid.onColumnDragEnd);
