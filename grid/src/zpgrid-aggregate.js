/**
 * @fileoverview Plugin for Zapatec Grid to calculate totals.
 *
 * <pre>
 * Copyright (c) 2004-2006 by Zapatec, Inc.
 * http://www.zapatec.com
 * 1700 MLK Way, Berkeley, California,
 * 94709, U.S.A.
 * All rights reserved.
 * </pre>
 */

/* $Id: zpgrid-aggregate.js 7629 2007-07-31 09:44:52Z alex $ */

/**
 * Gets called from aggregate functions to calculate totals for one or several
 * columns.
 *
 * <pre>
 * Takes in following object:
 * {
 *   aggregate: [function] one of internal aggregate callbacks,
 *   grid: [object] grid object,
 *   rows: [object] array of row objects,
 *   column: [object or number] array of zero-based column numbers or single
 *    zero-based column number to calculate,
 *   label: [string, optional] label for the value,
 *   labelColumn: [string, optional] zero-based column number where to put label
 *    (by default label is placed before the value in the same cell)
 * }
 *
 * Returns following object:
 * {
 *   rows:
 *   [
 *     {
 *       cells:
 *       [
 *         {
 *           v: [string] value to display
 *         },
 *         ...
 *       ]
 *     }
 *   ]
 * }
 * </pre>
 *
 * @private
 * @param {object} oArg Arguments object
 * @return Row with totals
 * @type object
 */
Zapatec.Grid.aggregate = function(oArg) {
	// Check arguments
	if (!oArg || typeof oArg.aggregate != 'function') {
		return;
	}
	// Get grid
	var oGrid = oArg.grid;
	if (!(oGrid instanceof Zapatec.Grid)) {
		return;
	}
	// Get fields
	var aFields = oGrid.getFields();
	// Get columns
	var aColumns = [];
	oArg.totals = [];
	if (oArg.column instanceof Array) {
		// Multiple columns
		for (var iCol = 0; iCol < oArg.column.length; iCol++) {
			var iColId = oArg.column[iCol];
			if (typeof aFields[iColId] != 'undefined') {
				aColumns.push(iColId);
				oArg.totals[iColId] = 0;
			}
		}
	} else if (typeof aFields[oArg.column] != 'undefined') {
		// Single column
		aColumns.push(oArg.column);
		oArg.totals[oArg.column] = 0;
	}
	if (!aColumns.length) {
		return;
	}
	oArg.column = aColumns;
	// Calculate totals
	if ((oArg.rows instanceof Array) && oArg.rows.length) {
		oArg.aggregate(oArg);
	}
	// Get label column
	var iLabelColumn;
	if (typeof oArg.labelColumn != 'undefined' &&
	 typeof aFields[oArg.labelColumn] != 'undefined') {
		iLabelColumn = oArg.labelColumn;
	}
	// Form prefix
	var sPrefix = '';
	if (typeof iLabelColumn == 'undefined' && oArg.label) {
		sPrefix = oArg.label + ' ';
	}
	// Form result
	oResult = {
		rows: [
			{
				cells: []
			}
		]
	};
	for (var iCol = 0; iCol < aFields.length; iCol++) {
		var val = oArg.totals[iCol];
		if (typeof val == 'undefined') {
			val = '';
		} else {
			val = sPrefix + val;
		}
		oResult.rows[0].cells.push({v: val});
	}
	// Add label
	if (typeof iLabelColumn != 'undefined' && oArg.label) {
		oResult.rows[0].cells[iLabelColumn].v = oArg.label;
	}
	return oResult;
};

/**
 * Calculates sum for one or several columns.
 *
 * <pre>
 * Takes in following object:
 * {
 *   grid: [object] grid object,
 *   rows: [object] array of row objects,
 *   column: [object or number] array of zero-based column numbers or single
 *    zero-based column number to calculate,
 *   label: [string, optional] label for the value (overrides standard label),
 *   labelColumn: [string, optional] zero-based column number where to put label
 *    (by default label is placed before the value in the same cell)
 * }
 *
 * Returns following object:
 * {
 *   rows:
 *   [
 *     {
 *       cells:
 *       [
 *         {
 *           v: [string] value to display
 *         },
 *         ...
 *       ]
 *     }
 *   ]
 * }
 * </pre>
 *
 * @param {object} oArg Arguments object
 * @return Row with totals
 * @type object
 */
Zapatec.Grid.sum = function(oArg) {
	oArg.aggregate = Zapatec.Grid.aggregateSum;
	// Default label
	if (typeof oArg.label == 'undefined') {
		oArg.label = 'Total:'
	}
	return Zapatec.Grid.aggregate(oArg);
};

/**
 * Internal aggregate callback to calculate sum of the column. Gets called from
 * {@link Zapatec.Grid#aggregate}.
 *
 * <pre>
 * Takes in following object:
 * {
 *   totals: [object] array having as many members as there are fields in the
 *    grid and initializied with 0 for each column to calculate; 0 will be
 *    replaced with sum of the column by this function,
 *   grid: [object] grid object,
 *   rows: [object] array of row objects,
 *   column: [object] array of zero-based column numbers to calculate
 * }
 *
 * Instead of returning result, modifies array passed with "totals" property of
 * input object.
 * </pre>
 *
 * @private
 * @param {object} oArg Arguments object
 */
Zapatec.Grid.aggregateSum = function(oArg) {
	// Get grid
	var oGrid = oArg.grid;
	// Calculate sum and get precisions
	var aPrecisions = oArg.totals.slice();
	var aRows = oArg.rows;
	var iRows = aRows.length;
	var aColumns = oArg.column;
	var iColumns = aColumns.length;
	for (var iRow = 0; iRow < iRows; iRow++) {
		var oRow = aRows[iRow];
		for (var iCol = 0; iCol < iColumns; iCol++) {
			var iColId = aColumns[iCol];
			// Get cell value
			var val = oGrid.getCellValueOriginal(oGrid.getCellByRow(oRow, iColId));
			// Convert to number
			var iVal = val * 1;
			if (!isNaN(iVal)) {
				// Save precision
				var iPrecision = Zapatec.Utils.getPrecision(val);
				if (iPrecision > aPrecisions[iColId]) {
					aPrecisions[iColId] = iPrecision;
				}
				// Add to the sum and correct precision of result
				oArg.totals[iColId] = Zapatec.Utils.setPrecision(oArg.totals[iColId] +
				 iVal, aPrecisions[iColId]);
			}
		}
	}
	// Correct precisions
	for (var iCol = 0; iCol < iColumns; iCol++) {
		var iColId = aColumns[iCol];
		oArg.totals[iColId] = Zapatec.Utils.setPrecisionString(oArg.totals[iColId],
		 aPrecisions[iColId]);
	}
};

/**
 * Calculates average for one or several columns. Input and output object format
 * is the same as for {@link Zapatec.Grid#sum}.
 *
 * @param {object} oArg Arguments object
 * @return Row with totals
 * @type object
 */
Zapatec.Grid.avg = function(oArg) {
	oArg.aggregate = Zapatec.Grid.aggregateAvg;
	// Default label
	if (typeof oArg.label == 'undefined') {
		oArg.label = 'AVG:'
	}
	return Zapatec.Grid.aggregate(oArg);
};

/**
 * Internal aggregate callback to calculate average of the column. Gets called
 * from {@link Zapatec.Grid#aggregate}.
 *
 * <pre>
 * Takes in following object:
 * {
 *   totals: [object] array having as many members as there are fields in the
 *    grid and initializied with 0 for each column to calculate; 0 will be
 *    replaced with average of the column by this function,
 *   grid: [object] grid object,
 *   rows: [object] array of row objects,
 *   column: [object] array of zero-based column numbers to calculate
 * }
 *
 * Instead of returning result, modifies array passed with "totals" property of
 * input object.
 * </pre>
 *
 * @private
 * @param {object} oArg Arguments object
 */
Zapatec.Grid.aggregateAvg = function(oArg) {
	// Get sum
	Zapatec.Grid.aggregateSum(oArg);
	// Get number of rows
	var iRows = oArg.rows.length;
	// Get precision and calculate average
	for (var iCol = 0; iCol < oArg.column.length; iCol++) {
		var iColId = oArg.column[iCol];
		var iPrecision = Zapatec.Utils.getPrecision(oArg.totals[iColId]);
		var fAvg = oArg.totals[iColId] / iRows;
		oArg.totals[iColId] = Zapatec.Utils.setPrecisionString(fAvg, iPrecision);
	}
};

/**
 * Calculates min value for one or several columns. Input and output object
 * format is the same as for {@link Zapatec.Grid#sum}.
 *
 * @param {object} oArg Arguments object
 * @return Row with totals
 * @type object
 */
Zapatec.Grid.min = function(oArg) {
	oArg.aggregate = Zapatec.Grid.aggregateCompare;
	oArg.sign = '<';
	// Default label
	if (typeof oArg.label == 'undefined') {
		oArg.label = 'Min:'
	}
	return Zapatec.Grid.aggregate(oArg);
};

/**
 * Calculates max value for one or several columns. Input and output object
 * format is the same as for {@link Zapatec.Grid#sum}.
 *
 * @param {object} oArg Arguments object
 * @return Row with totals
 * @type object
 */
Zapatec.Grid.max = function(oArg) {
	oArg.aggregate = Zapatec.Grid.aggregateCompare;
	oArg.sign = '>';
	if (typeof oArg.label == 'undefined') {
		oArg.label = 'Max:'
	}
	return Zapatec.Grid.aggregate(oArg);
};

/**
 * Internal aggregate callback to calculate min or max of the column. Gets
 * called from {@link Zapatec.Grid#aggregate}.
 *
 * <pre>
 * Takes in following object:
 * {
 *   totals: [object] array having as many members as there are fields in the
 *    grid and initializied with 0 for each column to calculate; 0 will be
 *    replaced with min or max of the column by this function,
 *   sign: [string] sign to use, e.g. '<' to get min and '>' to get max,
 *   grid: [object] grid object,
 *   rows: [object] array of row objects,
 *   column: [object] array of zero-based column numbers to calculate
 * }
 *
 * Instead of returning result, modifies array passed with "totals" property of
 * input object.
 * </pre>
 *
 * @private
 * @param {object} oArg Arguments object
 */
Zapatec.Grid.aggregateCompare = function(oArg) {
	// Get grid
	var oGrid = oArg.grid;
	// Init totals
	var oRow = oArg.rows[0];
	for (var iCol = 0; iCol < oArg.column.length; iCol++) {
		var iColId = oArg.column[iCol];
		oArg.totals[iColId] = oGrid.getCellByRow(oRow, iColId);
	}
	// Find max cell
	for (var iRow = 0; iRow < oArg.rows.length; iRow++) {
		oRow = oArg.rows[iRow];
		for (var iCol = 0; iCol < oArg.column.length; iCol++) {
			var iColId = oArg.column[iCol];
			var oCell = oGrid.getCellByRow(oRow, iColId);
			// Compare cells
			if (eval('oGrid.getCellValueCompare(oCell)' + oArg.sign +
			 'oGrid.getCellValueCompare(oArg.totals[iColId])')) {
				oArg.totals[iColId] = oCell;
			}
		}
	}
	// Convert to values
	for (var iCol = 0; iCol < oArg.column.length; iCol++) {
		var iColId = oArg.column[iCol];
		oArg.totals[iColId] = oGrid.getCellValue(oArg.totals[iColId]);
	}
};

/**
 * Calculates count for one or several columns. Input and output object format
 * is the same as for {@link Zapatec.Grid#sum}.
 *
 * @param {object} oArg Arguments object
 * @return Row with totals
 * @type object
 */
Zapatec.Grid.count = function(oArg) {
	oArg.aggregate = Zapatec.Grid.aggregateCount;
	if (typeof oArg.label == 'undefined') {
		oArg.label = 'Count:'
	}
	return Zapatec.Grid.aggregate(oArg);
};

/**
 * Internal aggregate callback to get count of the column. Gets called from
 * {@link Zapatec.Grid#aggregate}.
 *
 * <pre>
 * Takes in following object:
 * {
 *   totals: [object] array having as many members as there are fields in the
 *    grid and initializied with 0 for each column to calculate; 0 will be
 *    replaced with count of the column by this function,
 *   grid: [object] grid object,
 *   rows: [object] array of row objects,
 *   column: [object] array of zero-based column numbers to calculate
 * }
 *
 * Instead of returning result, modifies array passed with "totals" property of
 * input object.
 * </pre>
 *
 * @private
 * @param {object} oArg Arguments object
 */
Zapatec.Grid.aggregateCount = function(oArg) {
	// Get grid
	var oGrid = oArg.grid;
	// Get number of rows
	var iRows = oArg.rows.length;
	// Set count
	for (var iCol = 0; iCol < oArg.column.length; iCol++) {
		oArg.totals[oArg.column[iCol]] = iRows;
	}
};

/**
 * Calculates count of distinct values for one or several columns. Input and
 * output object format is the same as for {@link Zapatec.Grid#sum}.
 *
 * @param {object} oArg Arguments object
 * @return Row with totals
 * @type object
 */
Zapatec.Grid.countDistinct = function(oArg) {
	oArg.aggregate = Zapatec.Grid.aggregateCountDistinct;
	if (typeof oArg.label == 'undefined') {
		oArg.label = 'Distinct:'
	}
	return Zapatec.Grid.aggregate(oArg);
};

/**
 * Internal aggregate callback to get count of distinct values of the column.
 * Gets called from {@link Zapatec.Grid#aggregate}.
 *
 * <pre>
 * Takes in following object:
 * {
 *   totals: [object] array having as many members as there are fields in the
 *    grid and initializied with 0 for each column to calculate; 0 will be
 *    replaced with count of distinct values of the column by this function,
 *   grid: [object] grid object,
 *   rows: [object] array of row objects,
 *   column: [object] array of zero-based column numbers to calculate
 * }
 *
 * Instead of returning result, modifies array passed with "totals" property of
 * input object.
 * </pre>
 *
 * @private
 * @param {object} oArg Arguments object
 */
Zapatec.Grid.aggregateCountDistinct = function(oArg) {
	// Get grid
	var oGrid = oArg.grid;
	// Prepare buffer
	var aDistinct = [];
	for (var iCol = 0; iCol < oArg.column.length; iCol++) {
		aDistinct[iCol] = {};
	}
	// Count distinct
	for (var iRow = 0; iRow < oArg.rows.length; iRow++) {
		var oRow = oArg.rows[iRow];
		for (var iCol = 0; iCol < oArg.column.length; iCol++) {
			var iColId = oArg.column[iCol];
			var sVal = oGrid.getCellValueString(oGrid.getCellByRow(oRow, iColId));
			// Check distinct
			if (typeof aDistinct[iCol][sVal] == 'undefined') {
				aDistinct[iCol][sVal] = true;
				oArg.totals[iColId]++;
			}
		}
	}
};

/**
 * Returns array of rows for totals section.
 *
 * @return Array of rows for totals section
 * @type object
 */
Zapatec.Grid.prototype.getTotals = function() {
	// Check if there are totals
	var aTotalsRules = this.totalsRules;
	var iTotalsRules = aTotalsRules.length;
	// Calculate totals
	var aTotals = [];
	for (var iTotal = 0; iTotal < iTotalsRules; iTotal++) {
		var oTotal = aTotalsRules[iTotal];
		// Get callback
		if (typeof oTotal.callback != 'function') {
			oTotal.callback = Zapatec.Grid.sum;
		}
		// Calculate rows
		var oResult = oTotal.callback({
			grid: this,
			rows: this.getFilteredRows(),
			column: oTotal.column,
			label: oTotal.label,
			labelColumn: oTotal.labelColumn
		});
		// Add rows
		if (oResult && (oResult.rows instanceof Array)) {
			for (var iRow = 0; iRow < oResult.rows.length; iRow++) {
				aTotals.push(oResult.rows[iRow]);
			}
		}
	}
	return aTotals;
};

/**
 * Forms grid output.
 *
 * @private
 * @param {object} aHtml Output array
 * @param {object} aCols Array with field objects to output
 * @param {object} aFixedCols Array with fixed field objects to output
 * @param {object} aRows Array with row objects to output
 * @param {boolean) bFixed Optional. Indicates that this is fixed part of table
 */
Zapatec.Grid.prototype.outputTotals = function(aHtml, aCols, aFixedCols, aRows, bFixed) {
	if (typeof this.config.callbackTotalsDisplay == 'function' || 
	 typeof this.config.callbackTotalDisplay == 'function' || !aRows) {
		return;
	}
	if (this.config.horizontal) {
		// Horizontal layout
		this.outputTotalsHoriz(aHtml, aCols, aFixedCols, aRows, bFixed);
	} else {
		// Vertical layout
		this.outputTotalsVert(aHtml, aCols, aFixedCols, aRows, bFixed);
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
 * @param {boolean) bFixed Optional. Indicates that this is fixed part of table
 */
Zapatec.Grid.prototype.outputTotalsHoriz = function(aHtml, aCols, aFixedCols, aRows, bFixed) {
	if (bFixed) {
		aCols = aFixedCols;
	}
	for (var iCol = 0; iCol < aCols.length; iCol++) {
		// Get field object
		var oField = aCols[iCol];
		var aCl = [];
		aCl.push('zpGridCol zpGridCol');
		aCl.push(iCol);
		if (iCol % 2 == 1) {
			aCl.push(' zpGridColOdd');
		} else {
			aCl.push(' zpGridColEven');
		}
		if (iCol == aCols.length - 1) {
			aCl.push(' zpGridColLast');
		}
		var sClass = aCl.join('');
		var aTr = [];
		aTr.push('<tr id="zpGrid');
		aTr.push(this.id);
		aTr.push('TotalCol');
		aTr.push(oField.i);
		if (bFixed) {
			aTr.push('Fixed');
		}
		aTr.push('" class="');
		aTr.push(sClass);
		aTr.push('">');
		// Output rows
		if (bFixed) {
			for (var iRow = 0; iRow < aRows.length; iRow++) {
				this.outputTotalsCell(aTr, oField, aRows[iRow], iCol, iRow,
				 aRows.length);
			}
		} else {
			for (var iRow = 0; iRow < aRows.length; iRow++) {
				var bHidden = (iCol < aFixedCols.length);
				this.outputTotalsCell(aTr, oField, aRows[iRow], iCol, iRow,
				 aRows.length, bHidden);
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
 * @param {boolean) bFixed Optional. Indicates that this is fixed part of row
 */
Zapatec.Grid.prototype.outputTotalsVert = function(aHtml, aCols, aFixedCols, aRows, bFixed) {
	for (var iRow = 0; iRow < aRows.length; iRow++) {
		// Get row
		var oRow = aRows[iRow];
		if (!oRow) {
			return;
		}
		var aCl = [];
		aCl.push('zpGridRow zpGridRowTotals zpGridRowTotals');
		aCl.push(iRow);
		aCl.push(' zpGridRowTotals');
		aCl.push(iRow % 2 == 1 ? 'Odd' : 'Even');
		if (iRow == aRows.length - 1) {
			aCl.push(' zpGridRowLast zpGridRowTotalsLast');
		}
		var sClass = aCl.join('');
		var aTr = [];
		aTr.push('<tr id="zpGrid');
		aTr.push(this.id);
		aTr.push('Total');
		aTr.push(iRow);
		if (bFixed) {
			aTr.push('Fixed');
		}
		aTr.push('" class="');
		aTr.push(sClass);
		aTr.push('" style="');
		if (oRow.style) {
			aTr.push(oRow.style);
		}
		aTr.push('">');
		// Display cells
		if (bFixed) {
			for (var iCol = 0; iCol < aFixedCols.length; iCol++) {
				this.outputTotalsCell(aTr, aFixedCols[iCol], oRow, iRow, iCol,
				 aCols.length);
			}
		} else {
			for (var iCol = 0; iCol < aCols.length; iCol++) {
				var bHidden = (iCol < aFixedCols.length);
				this.outputTotalsCell(aTr, aCols[iCol], oRow, iRow, iCol, aCols.length,
				 bHidden);
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
 * @param {object} aTr Output array
 * @param {object} oField Field object
 * @param {object} oRow Row object
 * @param {object} iRow Number of row on the page
 * @param {number} iCol Visible column number
 * @param {number} iCols Visible column count
 * @param {boolean} bHidden Optional. Indicates that this is hidden part of
 * fixed part of row
 */
Zapatec.Grid.prototype.outputTotalsCell = function(aTr, oField, oRow, iRow, iCol, iCols, bHidden) {
	if (iCol >= this.config.fixedLeft && iCol < this.currentHorizontalOffset + this.config.fixedLeft) {
		// Hidden column
		return;
	}
	if (this.config.visibleColumns) {
		bHidden = false;
	}
	// Get cell
	var oCell = oRow.cells[oField.i];
	if (!oCell) {
		return;
	}
	var aCl = [];
	aCl.push('zpGridCell zpGridCell');
	aCl.push(iCol);
	aCl.push(' zpGridColId');
	aCl.push(oField.i);
	aCl.push(' zpGridCellData zpGridCellData');
	aCl.push(iCol);
	aCl.push(' zpGridCellTotals zpGridCellTotals');
	aCl.push(iCol);
	if (iCol % 2 == 1) {
		aCl.push(' zpGridCellOdd zpGridCellDataOdd zpGridCellTotalsOdd');
	} else {
		aCl.push(' zpGridCellEven zpGridCellDataEven zpGridCellTotalsEven');
	}
	if (iCol + 1 == iCols) {
		aCl.push(' zpGridCellLast zpGridCellDataLast zpGridCellTotalsLast');
	}
	var sClass = aCl.join('');
	var aTd = [];
	aTd.push('<td class="');
	aTd.push(sClass);
	aTd.push('" id="zpGrid');
	aTd.push(this.id);
	aTd.push('Total');
	if (this.config.horizontal) {
		aTd.push(iCol);
	} else {
		aTd.push(iRow);
	}
	aTd.push('Cell');
	aTd.push(oField.i);
	if (bHidden) {
		aTd.push('Hidden');
	}
	var sStyle = this.getCellStyle(oCell, iRow);
	if (sStyle) {
		aTd.push('" style="');
		aTd.push(sStyle);
	}
	aTd.push('">');
	this.outputTotalsCellValue(aTd, oField, oRow, oCell);
	aTd.push('</td>');
	aTr.push(aTd.join(''));
};

/**
 * Forms grid output.
 *
 * @private
 * @param {object} aTd Output array
 * @param {object} oField Field object
 * @param {object} oRow Row object
 * @param {object} oCell Cell object
 */
Zapatec.Grid.prototype.outputTotalsCellValue = function(aTd, oField, oRow, oCell) {
	// div is needed to be able to set column width
	aTd.push('<div class="zpGridDiv');
	// Set cell type
	if (this.getClassByType) {
		aTd.push(' ');
		aTd.push(this.getClassByType(this.getFieldType(oField)));
	}
	aTd.push('">');
	var sData = oCell.v + '';
	// Empty cell may cause visual problems in horizontal layout
	if (!sData || !sData.length) {
		sData = '&nbsp;';
	}
	aTd.push(sData);
	aTd.push('</div>');
};

/**
 * Redraws totals for the specified columns.
 *
 * <pre>
 * Takes in following object:
 * {
 *   column: [object or number, optional] array of zero-based column numbers or
 *    single zero-based column number to redraw (default is all columns)
 * }
 * </pre>
 *
 * @param {object} oArg Arguments object
 */
Zapatec.Grid.prototype.redrawTotals = function(oArg) {
	// If we are responsible for visualisation
	if (this.visualize) {
		// Get totals
		var aTotals = this.getTotals();
		if (!aTotals) {
			return;
		}
		// Get fields
		var aFields = this.getFields();
		// Redraw cells
		var iGridId = this.id;
		for (var iTotal = 0; iTotal < aTotals.length; iTotal++) {
			var oRow = aTotals[iTotal];
			for (var iField = 0; iField < aFields.length; iField++) {
				// Get table cell element
				var sCellId = 'zpGrid' + iGridId + 'Total' + iTotal + 'Cell' + iField;
				var oTd = document.getElementById(sCellId);
				if (oTd) {
					// Redraw cell
					var aTd = [];
					this.outputCellValue(aTd, aFields[iField], oRow.cells[iField]);
					var sTd = aTd.join('');
					oTd.innerHTML = sTd;
					// Redraw hidden cell
					var oTdHidden = document.getElementById(sCellId + 'Hidden');
					if (oTdHidden) {
						oTdHidden.innerHTML = sTd;
					}
				}
			}
		}
	}
};
