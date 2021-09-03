/**
 * @fileoverview Plugin for Zapatec Grid to make queries to the grid.
 *
 * <pre>
 * Copyright (c) 2004-2006 by Zapatec, Inc.
 * http://www.zapatec.com
 * 1700 MLK Way, Berkeley, California,
 * 94709, U.S.A.
 * All rights reserved.
 * </pre>
 */

/* $Id: zpgrid-query.js 7323 2007-06-01 21:05:51Z alex $ */

/**
 * Executes query on the grid.
 *
 * <pre>
 * Query object format:
 *
 * {
 *   type: [string] query type ('insert', 'update' or 'delete'),
 *   rows: [object, optional] array of rows to add (see
 *    Zapatec.Grid.prototype.splice for details),
 *   values: [object, optional] object with new values of row (see
 *    Zapatec.GridQueryUpdate.prototype.execute for details),
 *   where: [object, optional] condition statement object (see
 *    Zapatec.GridQuery.prototype.compileStatement for details),
 *   noRefresh: [boolean, optional] indicates that grid should not be refreshed
 *    after changing (default: false) (useful when several changes go one by
 *    one),
 *   debug: [boolean, optional] if true, actual change to the grid will not be
 *    performed
 * }
 * </pre>
 *
 * @param {object} oArgs Query object.
 * @return Array of affected rows during query. Number of affected rows can be
 * accessed through the length property of this array. If error occured during
 * query, returns undefined. See {@link Zapatec.GridQueryInsert#execute},
 * {@link Zapatec.GridQueryUpdate#execute},
 * {@link Zapatec.GridQueryDelete#execute} for details
 * @type object
 */
Zapatec.Grid.prototype.query = function(oArgs) {
	// Check arguments
	if (!oArgs || !oArgs.type) {
		return;
	}
	if (!oArgs.where) {
		oArgs.where = null;
	}
	if (!oArgs.noRefresh) {
		oArgs.noRefresh = null;
	}
	// Execute query
	if (oArgs.type == 'insert') {
		if (oArgs.rows instanceof Array) {
			var oQuery = new Zapatec.GridQueryInsert({
				grid: this,
				noRefresh: oArgs.noRefresh
			});
			return oQuery.execute({
				rows: oArgs.rows,
				debug: oArgs.debug
			});
		}
	} else if (oArgs.type == 'update') {
		if (oArgs.values instanceof Object) {
			var oQuery = new Zapatec.GridQueryUpdate({
				grid: this,
				where: oArgs.where,
				noRefresh: oArgs.noRefresh
			});
			return oQuery.execute({
				cells: oArgs.values.cells,
				style: oArgs.values.style,
				debug: oArgs.debug
			});
		}
	} else if (oArgs.type == 'delete') {
		var oQuery = new Zapatec.GridQueryDelete({
			grid: this,
			where: oArgs.where,
			noRefresh: oArgs.noRefresh
		});
		return oQuery.execute({
			debug: oArgs.debug
		});
	}
};

/**
 * Base query.
 *
 * <pre>
 * <strong>Query initialization object format:</strong>
 *
 * {
 *   grid: [object] Grid object to query,
 *   where: [object, optional] statement object that describes query condition
 *    (if not defined, all rows will be affected),
 *   noRefresh: [boolean, optional] indicates that grid should not be refreshed
 *    after changing (default: false)
 * }
 *
 * <strong>Statement object format:</strong>
 *
 * {
 *   leftValue: [object, optional] statement value object,
 *   rightValue: [object, optional] statement value object,
 *   operator: [string, optional] any javascript binary or unary operator
 * }
 *
 * If operator is binary (e.g. '==' or '&&'), both leftValue and rightValue are
 * required.
 *
 * Operator can be left or right unary. In this case only one of leftValue or
 * rightValue should be defined.
 *
 * Examples:
 *
 * Statement "!value" can be described with following object:
 *
 * {
 *   rightValue: {value: value},
 *   operator: '!'
 * }
 *
 * Statement "value++" can be described with following object:
 *
 * {
 *   leftValue: {value: value},
 *   operator: '++'
 * }
 *
 * Statement "value1 == value2" can be described with following object:
 *
 * {
 *   leftValue: {value: value1},
 *   rightValue: {value: value2},
 *   operator: '=='
 * }
 *
 * Statement "value != value1 && value != -value2" can be described with
 * following object:
 *
 * {
 *   leftValue: {
 *     statement: {
 *       leftValue: {value: value},
 *       rightValue: {value: value1},
 *       operator: '!='
 *     }
 *   },
 *   rightValue: {
 *     statement: {
 *       leftValue: {value: value},
 *       rightValue: {
 *         statement: {
 *           rightValue: {value: value2},
 *           operator: '-'
 *         }
 *       },
 *       operator: '!='
 *     }
 *   },
 *   operator: '&&'
 * }
 *
 * <strong>Statement value object can be one of the following objects:</strong>
 *
 * {
 *   column: [number] column number to use value of
 * }
 *
 * or
 *
 * {
 *   value: [any] any value,
 *   type: [string, optional] specifies field type to use comparison rules of
 * }
 *
 * or
 *
 * {
 *   statement: [object] statement object (see above)
 * }
 * </pre>
 *
 * @constructor
 * @param {object} oArgs Query initialization object
 */
Zapatec.GridQuery = function(oArgs) {
	this.init(oArgs);
};

/**
 * Initializes object.
 *
 * @private
 * @param {object} oArgs Query initialization object
 * @return Success
 * @type boolean
 */
Zapatec.GridQuery.prototype.init = function(oArgs) {
	// Grid to query [object]
	this.grid = null;
	// Indicates that grid should not be refreshed after changing [boolean]
	this.noRefresh = false;
	// Reference to query condition function [function]
	this.condition = null;
	// Indicates that error occured during query initialization [boolean]
	this.error = null;
	// Human readable error description [string]
	this.errorDescription = null;
	// Get Grid object
	if (oArgs.grid && oArgs.grid.fields && oArgs.grid.rows) {
		this.grid = oArgs.grid;
	} else {
		// Error
		return this.setError('No grid');
	}
	// Get query condition
	if (oArgs.where) {
		this.condition = this.compileStatement(oArgs.where);
		if (!this.condition) {
			// True for all rows by default
			this.condition = function(iRow) {
				return true;
			}
		}
	}
	// Initialized successfully
	return true;
};

/**
 * Compiles statement object.
 *
 * @private
 * @param {object} oStatement Statement object
 * @return Reference to a function that accepts row number and returns result of
 * evaluation of statement on that row
 * @type function or null
 */
Zapatec.GridQuery.prototype.compileStatement = function(oStatement) {
	// Check arguments
	if (!oStatement) {
		return null;
	}
	// Get left value
	var fLeftValue = null;
	if (typeof oStatement.leftValue != 'undefined') {
		fLeftValue = this.compileStatementValue(oStatement.leftValue);
	}
	// Get right value
	var fRightValue = null;
	if (typeof oStatement.rightValue != 'undefined') {
		fRightValue = this.compileStatementValue(oStatement.rightValue);
	}
	// Get operator
	var fOperator = null;
	if (typeof oStatement.operator == 'string') {
		fOperator = this.compileOperator(fLeftValue, fRightValue,
		 oStatement.operator);
	}
	// Compile statement
	if (fOperator) {
		if (fLeftValue && fRightValue) {
			// Binary operator
			return function(iRow) {
				return fOperator(fLeftValue(iRow), fRightValue(iRow));
			}
		}
		if (fRightValue) {
			// Left unary operator
			return function(iRow) {
				return fOperator(fRightValue(iRow));
			}
		}
		if (fLeftValue) {
			// Right unary operator
			return function(iRow) {
				return fOperator(fLeftValue(iRow));
			}
		}
	}
	if (fLeftValue) {
		return fLeftValue;
	}
	return fRightValue;
};

/**
 * Compiles statement value object.
 *
 * @private
 * @param {object} oValue Statement value object
 * @return Reference to a function that accepts row number and returns result of
 * evaluation of statement value on that row
 * @type function or null
 */
Zapatec.GridQuery.prototype.compileStatementValue = function(oValue) {
	// Check arguments
	if (!oValue) {
		return null;
	}
	// Try to get column number
	if (typeof oValue.column != 'undefined') {
		var iColumn = oValue.column * 1;
		if (!this.grid.fields[iColumn]) {
			// Error
			this.setError('Invalid column number: ' + oValue.column);
			return null;
		}
		// Return column value
		var oGrid = this.grid;
		return function(iRow) {
			var oRow = oGrid.rows[iRow];
			if (!oRow || !oRow.cells) {
				return;
			}
			var oCell = oRow.cells[iColumn];
			if (!oCell) {
				return;
			}
			return oGrid.getCellValueCompare(oCell);
		};
	}
	// Try to get value
	if (typeof oValue.value != 'undefined') {
		var value = oValue.value;
		// Get type
		if (typeof oValue.type != 'undefined' && Zapatec.Grid.convertByType) {
			// Get method
			var strMethod = Zapatec.Grid.convertByType[oValue.type];
			if (!strMethod) {
				// Error
				this.setError('Invalid field type: ' + oValue.type);
				return null;
			}
			// Convert to compare value according to the type rules
			var oCell = {
				v: value
			};
			oCell = this.grid[strMethod](oCell);
			value = this.grid.getCellValueCompare(oCell);
		}
		// Return value
		return function(iRow) {
			return value;
		};
	}
	// Try to get statement
	if (typeof oValue.statement != 'undefined') {
		// Return compiled statement
		return this.compileStatement(oValue.statement);
	}
	// Nothing applicable
	this.setError('Invalid statement value');
	return null;
};

/**
 * Compiles operator.
 *
 * @private
 * @param {function or null} fLeftValue Left value
 * @param {function or null} fRightValue Right value
 * @param {string} strOperator Any javascript binary or unary operator
 * @return Rreference to a function that accepts 1 or 2 values and returns
 * result of operator evaluation on those values
 * @type function or null
 */
Zapatec.GridQuery.prototype.compileOperator = function(fLeftValue, fRightValue, strOperator) {
	// Compile operator
	try {
		if (fLeftValue && fRightValue) {
			// Binary operator
			return new Function('l', 'r', 'return l ' + strOperator + ' r');
		}
		if (fRightValue) {
			// Left unary operator
			return new Function('v', 'return ' + strOperator + ' v');
		}
		if (fLeftValue) {
			// Right unary operator
			return new Function('v', 'return v ' + strOperator);
		}
	} catch(oException) {
		this.setError('Invalid operator: ' + strOperator);
	};
	return null;
};

/**
 * Sets error.
 *
 * @private
 * @param {string} strError Human readable error description
 * @return Always false
 * @type boolean
 */
Zapatec.GridQuery.prototype.setError = function(strError) {
	this.error = true;
	this.errorDescription = strError;
	return false;
};

/**
 * Refreshes grid after change.
 * @private
 */
Zapatec.GridQuery.prototype.refreshGrid = function() {
	if (!this.noRefresh && this.grid && this.grid.show) {
		this.grid.modify();
	}
};

/**
 * Insert query.
 *
 * @constructor
 * @extends Zapatec.GridQuery
 * @param {object} oArgs Query initialization object (see
 * {@link Zapatec.GridQuery} for details)
 */
Zapatec.GridQueryInsert = function(oArgs) {
	// Call constructor of superclass
	Zapatec.GridQueryInsert.SUPERconstructor.call(this, oArgs);
};

// Inherit GridQuery
Zapatec.inherit(Zapatec.GridQueryInsert, Zapatec.GridQuery);

/**
 * Initializes object.
 *
 * @private
 * @param {object} oArgs Query initialization object (see
 * {@link Zapatec.GridQuery} for details)
 * @return Success
 * @type boolean
 */
Zapatec.GridQueryInsert.prototype.init = function(oArgs) {
	// Call parent
	return Zapatec.GridQueryInsert.SUPERclass.init.call(this, oArgs);
};

/**
 * Executes query.
 *
 * <pre>
 * Query data object format:
 * 
 * {
 *   rows: [object] array of rows to add (see {@link Zapatec.Grid#splice} for
 *    details),
 *   debug: [boolean, optional] if true, actual change to the grid will not be
 *    performed
 * }
 * </pre>
 *
 * @param {object} oArgs Query data object
 * @return Array of added rows. Number of added rows can be accessed through the
 * length property of this array. If error occured during query, returns
 * undefined
 * @type object
 */
Zapatec.GridQueryInsert.prototype.execute = function(oArgs) {
	if (!this.grid || this.error) {
		// Error
		return;
	}
	// Check arguments
	if (!oArgs || !oArgs.rows) {
		return;
	}
	// Insert rows
	if (!oArgs.debug) {
		this.grid.splice({
			rows: oArgs.rows,
			noRefresh: this.noRefresh
		});
	}
	// Success
	return oArgs.rows;
};

/**
 * Update query.
 *
 * @constructor
 * @extends Zapatec.GridQuery
 * @param {object} oArgs Query initialization object (see
 * {@link Zapatec.GridQuery} for details)
 */
Zapatec.GridQueryUpdate = function(oArgs) {
	// Call constructor of superclass
	Zapatec.GridQueryUpdate.SUPERconstructor.call(this, oArgs);
};

// Inherit GridQuery
Zapatec.inherit(Zapatec.GridQueryUpdate, Zapatec.GridQuery);

/**
 * Initializes object.
 *
 * @private
 * @param {object} oArgs Query initialization object (see
 * {@link Zapatec.GridQuery} for details)
 * @return Success
 * @type boolean
 */
Zapatec.GridQueryUpdate.prototype.init = function(oArgs) {
	// Call parent
	return Zapatec.GridQueryUpdate.SUPERclass.init.call(this, oArgs);
};

/**
 * Executes query.
 *
 * <pre>
 * Query data object format:
 * 
 * {
 *   cells: [
 *     {
 *       v: [any] cell value,
 *       style: [string, optional] table cell style attribute
 *     },
 *     ...
 *   ],
 *   style: [string, optional] table row style attribute,
 *   debug: [boolean, optional] if true, actual change to the grid will not be
 *    performed
 * }
 *
 * If only some of cells should be changed, specify only those cells. E.g.
 *
 * {
 *   cells: [
 *     null,
 *     null,
 *     { v: value1 },
 *     null,
 *     { v: value2 }
 *   ]
 * }
 *
 * will change only values in 3-rd and 5-th columns.
 * </pre>
 *
 * @param {object} oArgs Query data object
 * @return Array of modified rows. Number of modified rows can be accessed
 * through the length property of this array. Each element of this array
 * contains array with copy of original row object and reference to modified
 * row object: [oOriginalRow, oModifiedRow]. If error occured during query,
 * returns undefined
 * @type object
 */
Zapatec.GridQueryUpdate.prototype.execute = function(oArgs) {
	if (!this.grid || this.error) {
		// Error
		return;
	}
	// Check arguments
	if (!oArgs || !oArgs.cells) {
		return;
	}
	// Fire event
	this.grid.fireEvent('gridPrepareModify');
	// Will contain modified rows
	var aModified = [];
	// Iterate over rows
	for (var iRow = 0; iRow < this.grid.rows.length; iRow++) {
		// Get row
		if (!(this.grid.rows[iRow] instanceof Object)) {
			this.grid.rows[iRow] = {};
		}
		var oRow = this.grid.rows[iRow];
		if (!(oRow.cells instanceof Array)) {
			oRow.cells = [];
		}
		// Update row
		if (this.condition(iRow)) {
			// Save a copy of original row and a reference to modified row
			aModified.push([Zapatec.Utils.clone(oRow), oRow]);
			// Update row
			if (!oArgs.debug) {
				for (var iCol = 0; iCol < this.grid.fields.length; iCol++) {
					// Get new value
					var oArgsCell = oArgs.cells[iCol];
					if (!oArgsCell) {
						continue;
					}
					// Get cell
					if (!(oRow.cells[iCol] instanceof Object)) {
						oRow.cells[iCol] = {};
					}
					var oCell = oRow.cells[iCol];
					// Set new cell value
					oCell = this.grid.setCellValue(oCell,
					 this.grid.getCellValue(oArgsCell));
					// Set cell style
					oCell = this.grid.setCellStyle(oCell, oArgsCell.style);
					// Update cell
					oRow.cells[iCol] = oCell;
				}
				// Set row style
				oRow = this.grid.setRowStyle(oRow, oArgs.style);
			}
		}
	}
	// Rebuild primary key
	if (!oArgs.debug && aModified.length) {
		this.grid.rebuildPrimaryKey();
	}
	// Refresh grid
	this.refreshGrid();
	// Success
	return aModified;
};

/**
 * Delete query.
 *
 * @constructor
 * @extends Zapatec.GridQuery
 * @param {object} oArgs Query initialization object (see
 * {@link Zapatec.GridQuery} for details)
 */
Zapatec.GridQueryDelete = function(oArgs) {
	// Call constructor of superclass
	Zapatec.GridQueryDelete.SUPERconstructor.call(this, oArgs);
};

// Inherit GridQuery
Zapatec.inherit(Zapatec.GridQueryDelete, Zapatec.GridQuery);

/**
 * Initializes object.
 *
 * @private
 * @param {object} oArgs Query initialization object (see
 * {@link Zapatec.GridQuery} for details)
 * @return Success
 * @type boolean
 */
Zapatec.GridQueryDelete.prototype.init = function(oArgs) {
	// Call parent
	return Zapatec.GridQueryDelete.SUPERclass.init.call(this, oArgs);
};

/**
 * Executes query.
 *
 * <pre>
 * Query data object format:
 * 
 * {
 *   debug: [boolean, optional] if true, actual change to the grid will not be
 *    performed
 * }
 * </pre>
 *
 * @param {object} oArgs Query data object
 * @return Array of removed rows. Number of removed rows can be accessed through
 * the length property of this array. If error occured during query, returns
 * undefined
 * @type object
 */
Zapatec.GridQueryDelete.prototype.execute = function(oArgs) {
	if (!this.grid || this.error) {
		// Error
		return;
	}
	// Fire event
	this.grid.fireEvent('gridPrepareModify');
	// Will contain removed rows
	var aRemoved = [];
	// Iterate over rows
	for (var iRow = this.grid.rows.length - 1; iRow >= 0; iRow--) {
		// Get row
		var oRow = this.grid.rows[iRow];
		if (!(oRow instanceof Object) || !(oRow.cells instanceof Array)) {
			continue;
		}
		// Remove row
		if (this.condition(iRow)) {
			if (oArgs && oArgs.debug) {
				// Only get copy of row without removing
				aRemoved.push(oRow);
			} else {
				// Remove row
				aRemoved.push(this.grid.removeRow(iRow));
			}
		}
	}
	// Rows were removed in reverse order
	aRemoved.reverse();
	// Rebuild primary key
	if (!(oArgs && oArgs.debug) && aRemoved.length) {
		this.grid.rebuildPrimaryKey();
	}
	// Refresh grid
	this.refreshGrid();
	// Success
	return aRemoved;
};
