/**
 * @fileoverview Plugin for Zapatec Grid to export grid data.
 *
 * <pre>
 * Copyright (c) 2004-2006 by Zapatec, Inc.
 * http://www.zapatec.com
 * 1700 MLK Way, Berkeley, California,
 * 94709, U.S.A.
 * All rights reserved.
 * </pre>
 */

/* $Id: zpgrid-export.js 7323 2007-06-01 21:05:51Z alex $ */

/**
 * Exports grid data as object. Returned object may be converted to JSON string
 * using Zapatec.Transport.serializeJsonObj function.
 *
 * @param {string} strMode Optional. 'asis' - returns data object as is;
 * 'compact' - returns minimal data object to be able to initialize grid with
 * "dataPrepared" option turned off; undefined - returns minimal data object
 * to be able to initialize grid with "dataPrepared" option turned on
 *
 * @return Object in the same format as JSON input data (see Zapatec.Grid
 * constructor description)
 * @type object
 */
Zapatec.Grid.prototype.exportDataJson = function(strMode) {
	// Check mode
	if (strMode == 'asis') {
		return this.data;
	}
	// Form result object
	var objData = {
		fields: [],
		rows: []
	};
	if (this.data) {
		if (typeof this.data.style != 'undefined') {
			objData.style = this.data.style;
		}
		if (typeof this.data.headerStyle != 'undefined') {
			objData.headerStyle = this.data.headerStyle;
		}
	}
	// Get fields
	for (var iField = 0; iField < this.fields.length; iField++) {
		var objField = this.fields[iField];
		if (!(objField instanceof Object)) {
			objField = {};
		}
		// Form field
		var objExportField = {};
		if (strMode != 'compact') {
			objExportField.i = iField;
		}
		objExportField.title = objField.title;
		if (typeof objField.dataType != 'undefined') {
			// Default data type is string, so we can skip it
			if (objField.dataType != 'string') {
				objExportField.dataType = objField.dataType;
			}
		}
		if (typeof objField.columnWidth != 'undefined') {
			objExportField.columnWidth = objField.columnWidth;
		}
		if (typeof objField.style != 'undefined') {
			objExportField.style = objField.style;
		}
		if (typeof objField.hidden != 'undefined') {
			objExportField.hidden = objField.hidden;
		}
		if (typeof objField.nosort != 'undefined') {
			objExportField.nosort = objField.nosort;
		}
		// Add field
		objData.fields.push(objExportField);
	}
	// Get rows
	for (var iRow = 0; iRow < this.rows.length; iRow++) {
		var objRow = this.rows[iRow];
		if (!(objRow instanceof Object)) {
			objRow = {};
		}
		// Form Row
		var objExportRow = {};
		if (strMode != 'compact') {
			objExportRow.i = iRow;
		}
		objExportRow.cells = [];
		// Optional properties
		if (typeof objRow.style != 'undefined') {
			objExportRow.style = objRow.style;
		}
		// Get cells
		for (var iCell = 0; iCell < this.fields.length; iCell++) {
			var objCell = objRow.cells[iCell];
			if (!(objCell instanceof Object)) {
				objCell = {};
			}
			// Form Row
			var objExportCell = {};
			if (strMode != 'compact') {
				objExportCell.i = iCell;
				objExportCell.r = iRow;
				if (typeof objCell.c != 'undefined') {
					objExportCell.c = objCell.c;
				}
				if (typeof objCell.o != 'undefined') {
					objExportCell.o = objCell.o;
				}
			}
			objExportCell.v = objCell.v;
			if (typeof objCell.style != 'undefined') {
				objExportCell.style = objCell.style;
			}
			// Add cell
			objExportRow.cells.push(objExportCell);
		}
		// Add row
		objData.rows.push(objExportRow);
	}
	return objData;
};

/**
 * Returns flatfile of grid. Each field is separated by FS, if FS in field then
 * enclose in double quotes. Each record is separated by RS.
 *
 * @param {string} FS To separate each field
 * @param {string} RS To separate each row
 * @param {number} iMode Mode of show data, 1=Check As Is, 2=Force Grid Type,
 * 3=Force As Is
 *
 * @return String of grid in flatfile format
 * @type string
 */
Zapatec.Grid.prototype.flatfile = function(FS, RS, iMode) {
	var arr=[]
	var parse=new Zapatec.Parse()
	var strOut=''
	for (var iRow = 0; iRow < this.rows.length; iRow++) {
		// Get row
		var objRow = this.rows[iRow];
		if (!objRow || !(objRow.cells instanceof Array)) {
			continue;
		}
		for (var iCol= 0; iCol < objRow.cells.length; iCol++) {
			parse.pushField(this.getCellData(objRow.cells[iCol], iMode));
		}
		strOut+=parse.flatfile(FS)
		parse.arr_clear()
		if (iRow < this.rows.length-1)
			strOut+=RS
	} 

	return strOut
};
