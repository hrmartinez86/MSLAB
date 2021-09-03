/**
 * @fileoverview Zapatec Grid core. Provides base grid features: sorting,
 * filtering, ranges, search, adding and removing rows, pagination, selection,
 * JSON input format, output using callback functions. Can be used alone if data
 * types and standard output functions are not needed.
 *
 * <pre>
 * Copyright (c) 2004-2007 by Zapatec, Inc.
 * http://www.zapatec.com
 * 1700 MLK Way, Berkeley, California,
 * 94709, U.S.A.
 * All rights reserved.
 * </pre>
 */

/* $Id: zpgrid-core.js 7649 2007-08-03 14:15:03Z alex $ */

// Emulate window.event in Mozilla for certain events
Zapatec.Utils.emulateWindowEvent(['mousedown', 'mouseup', 'click', 'dblclick']);

/**
 * Grid core.
 *
 * <pre>
 * <strong>Input data formats:</strong>
 *
 * <strong>JSON:</strong>
 *
 * {
 *   style: [string, optional] table style attribute,
 *   headerStyle: [string, optional] header table row style attribute,
 *   fields:
 *   [
 *     {
 *       i: [number] zero-based column number, <b>dataPrepared</b> specific,
 *       title: [string, optional] column title,
 *       dataType: [string, optional] defines which standard or custom data type
 *        to use for cell conversion (if not specified, no conversion is done),
 *       columnWidth: [string, optional] column width, e.g. "10px", "10em",
 *       style: [string, optional] header table cell style attribute,
 *       span: [number, optional] how many columns to span,
 *       spanTitle: [string, optional] span title,
 *       spanStyle: [string, optional] span table cell style attribute,
 *       hidden: [boolean, optional] if true, column will not be displayed, but
 *        filtering and searching can still be done on this column,
 *       nosort: [boolean, optional] if true, grid will not be sorted when this
 *        header is clicked,
 *       sortByColumn: [number, optional] zero-based number of column to use for
 *        sorting,
 *       hiddenValues: [object, optional] array of hidden values - rows
 *        conaining these values in the column will not be displayed,
 *       minValue: [any, optional] rows containing values in the column lesser
 *        than this value will not be displayed,
 *       maxValue:  [any, optional] rows containing values in the column greater
 *        than this value will not be displayed,
 *       regexpFilter: [string, optional] rows where column value don't match
 *        this regular expression will not be displayed,
 *       textFilter: [string, optional] rows which don't contain this pattern
 *        in the column value will not be displayed,
 *       columnRange: [object, optional] see {@link Zapatec.Grid#getColumnRange}
 *     },
 *     ...
 *   ],
 *   primaryKey: [number, optional] number of column to use as primary key,
 *   rows:
 *   [
 *     {
 *       i: [number] zero-based row number, <b>dataPrepared</b> specific,
 *       cells:
 *       [
 *         {
 *           i: [number] zero-based column number, <b>dataPrepared</b> specific,
 *           r: [number] zero-based row number, <b>dataPrepared</b> specific,
 *           v: [any] cell value to display,
 *           c: [any, optional] cell value to compare,
 *           o: [any, optional] original cell value,
 *           style: [string, optional] table cell style attribute,
 *           colspan: [number, optional] number of columns this cell spans,
 *           rowspan: [number, optional] number of rows this cell spans
 *         },
 *         ...
 *       ],
 *       style: [string, optional] table row style attribute
 *     },
 *     ...
 *   ],
 *   totalRows: [number, optional] <b>dataOnDemand</b> specific,
 *   displayedRows: [number, optional] <b>dataOnDemand</b> specific,
 *   currentPage: [number, optional] <b>dataOnDemand</b> specific
 * }
 *
 * "i" and "r" properties are required when <b>dataPrepared</b> config option is
 * true. When <b>dataPrepared</b> is false, they are overwritten by automatic
 * column and row numbers.
 *
 * "c" and "o" properties may be useful when column "dataType" is not set. Also
 * they are required when <b>dataPrepared</b> config option is true and their
 * values differ from the value of "v" property of the cell. Anyway, they
 * shouldn't be set if their values are equal to the value of "v" property of
 * the cell.
 *
 * "totalRows" property is used to pass total number of rows in the grid when
 * <b>dataOnDemand</b> config option is used.
 *
 * "displayedRows" property is used to pass number of displayed rows when
 * <b>dataOnDemand</b> config option is used and filter is applied. If filter
 * is not applied and there are no hidden rows, should be equal to totalRows.
 *
 * "currentPage" property is used to pass zero-based current page number when
 * <b>dataOnDemand</b> config option is used.
 *
 * "totalRows", "displayedRows" and "currentPage" properties are required when
 * <b>dataOnDemand</b> config option is true. When <b>dataOnDemand</b> is false,
 * they are ignored.
 *
 * "dataType" property requires zpgrid-convert.js module that is included by
 * default.
 *
 * "hiddenValues", "minValue", "maxValue", "regexpFilter", "regexpFilter",
 * "columnRange" properies are useful when <b>dataOnDemand</b> config option is
 * true. See phone_ondemand.html demo.
 *
 * <strong>HTML:</strong>
 * (requires zpgrid-html.js that is included by default)
 *
 * <xmp>
 * <table style="border: 1px solid #000">
 *   <tbody>
 *     <tr style="background-color: #00f">
 *       <td width="56" class="zpGridTypeDate" style="font-weight: bold"
 *        span="2" spantitle="Date & Time" spanstyle="text-align: center">
 *         Date
 *       </td>
 *       <td width="56" class="zpGridTypeTime" style="font-weight: bold">
 *         Time
 *       </td>
 *       <td>
 *         Title
 *       </td>
 *       <td>
 *         Comments
 *       </td>
 *       ...
 *     </tr>
 *     <tr style="background-color: #ccc">
 *       <td style="background-color: #f00">01/01/2001</td>
 *       <td style="background-color: #f00">09:30AM</td>
 *       <td colspan="2" rowspan="2">Meeting</td>
 *       ...
 *     </tr>
 *     <tr style="background-color: #ccc">
 *       <td style="background-color: #f00">01/01/2001</td>
 *       <td style="background-color: #f00">10:30AM</td>
 *       ...
 *     </tr>
 *     ...
 *   </tbody>
 * </table>
 * </xmp>
 *
 * First row in the source table defines grid columns.
 *
 * To set column data type other than "string", add one of standard or custom
 * data type class names to the "class" attribute of the corresponding cell
 * in the first row.
 * Difference from JSON input format: If data type is not specified, conversion
 * will be done according to the "string" data type.
 *
 * Column width can be set through "width" attribute of the corresponding cell
 * in the first row.
 *
 * Special "zpGridTypeHidden" class makes column hidden and it will not be
 * displayed, but filtering and searching can still be done on this column.
 * This field type can be used alone or in conjunction with other field type,
 * e.g. class="zpGridTypeInt zpGridTypeHidden".
 *
 * Special "zpGridTypeNosort" class makes column header not clickable. Grid will
 * not be sorted when this header is clicked. This field type can be used alone
 * or in conjunction with other field type,
 * e.g. class="zpGridTypeInt zpGridTypeNosort".
 *
 * Special "zpGridTypeNotags" class makes grid skip all tags in the column, and
 * only uses the text. This will facilitate migrating from an existing table
 * to the grid. This field type can be used alone or in conjunction with other
 * field type, e.g. class="zpGridTypeInt zpGridTypeNotags".
 *
 * Special "zpGridTypeSortByN" class makes column use anoter column for sorting.
 * Where N is zero-based column number to use for sorting. This field type can
 * be used alone or in conjunction with other field type, e.g.
 * class="zpGridTypeInt zpGridTypeSortBy2".
 *
 * Special "zpGridTypePrimaryKey" class makes column a primary key for the grid.
 * This field type can be used alone or in conjunction with other field type,
 * e.g. class="zpGridTypeInt zpGridTypePrimaryKey".
 *
 * Attributes "style", "width", "span", "spantitle", "spanstyle", "colspan" are
 * optional.
 *
 * "span" how many columns to span.
 *
 * "spantitle" span title.
 *
 * "spanstyle" span table cell style attribute.
 *
 * Other attributes mean the same as for regular HTML table.
 *
 * <strong>XML:</strong>
 * (requires zpgrid-xml.js that is NOT included by default)
 *
 * <xmp>
 * <?xml version="1.0"?>
 * <grid>
 *   <table style="border: solid black 1px" headerstyle="background: #ccc"
 *    primarykey="0" totalrows="123" displayedrows="89" currentpage="3">
 *     <fields>
 *       <field width="10px" hidden="true" nosort="true" sortbycolumn="2"
 *        style="color: #00f" span="2" spantitle="Span Title"
 *        spanstyle="text-align: center">
 *         <title>Title</title>
 *         <datatype>string</datatype>
 *         <hiddenvalues>
 *           <hiddenval>Hidden value</hiddenval>
 *           ...
 *         </hiddenvalues>
 *         <minlimit>Min displayed value (useful for Slider)</minlimit>
 *         <maxlimit>Max displayed value (useful for Slider)</maxlimit>
 *         <regexpfilter>Regexp filter</regexpfilter>
 *         <textfilter>Text filter</textfilter>
 *         <columnrange>
 *           <minvalue>Min value</minvalue>
 *           <maxvalue>Max value</maxvalue>
 *           <uniquevalues>
 *             <uniqueval>Unique value</uniqueval>
 *             ...
 *           </uniquevalues>
 *         </columnrange>
 *       </field>
 *       ...
 *     </fields>
 *     <rows>
 *       <row style="background: #eee">
 *         <cell style="color: #f00" colspan="2" rowspan="2">Value</cell>
 *         ...
 *       </row>
 *       ...
 *     </rows>
 *   </table>
 * </grid>
 * </xmp>
 *
 * Where "style", "headerstyle", "primarykey", "totalrows", "displayedrows",
 * "currentpage", "width", "hidden", "nosort", "sortbycolumn", "span",
 * "spantitle", "spanstyle", "colspan" attributes are optional.
 *
 * "style" is style attribute of table, row or cell.
 *
 * "headerstyle" is header table row style attribute.
 *
 * "primarykey" defines column number to use as primary key. If not specified,
 * no primary key is created.
 *
 * "totalrows" is total number of rows when <b>dataOnDemand</b> config option is
 * true.
 *
 * "displayedrows" is number of rows displayed when <b>dataOnDemand</b> config
 * option is true.
 *
 * "currentpage" is zero-based current page number when <b>dataOnDemand</b>
 * config option is true.
 *
 * "width" is column width.
 *
 * "hidden=true" attribute makes column hidden and it will not be displayed, but
 * filtering and searching can still be done on this column.
 *
 * "nosort=true" attribute makes column header not clickable. Grid will not be
 * sorted when this header is clicked.
 *
 * "sortbycolumn=N" attribute makes column use anoter column for sorting.
 * Where N is zero-based column number to use for sorting.
 *
 * "span" how many columns to span.
 *
 * "spantitle" span title.
 *
 * "spanstyle" span table cell style attribute.
 *
 * "datatype" tag is optional. Defines which standard or custom data type to use
 * for cell conversion. If not specified, no conversion is done.
 *
 * "hiddenvalues", "minlimit", "maxlimit", "regexpfilter", "textfilter",
 * "columnrange" tags are optional. They are useful when <b>dataOnDemand</b>
 * config option is true. See phone_ondemand_xml.html demo.
 *
 * "colspan" number of columns this cell spans. Works the same as in HTML table.
 *
 * "rowspan" number of rows this cell spans. Works the same as in HTML table.
 *
 * <strong>Possible data types:</strong>
 *
 * -----------------------------------------------------------------------------
 * Name for JSON    |Class name for HTML        |Input data      |Format of
 * and XML formats  |format                     |format          |displayed data
 * -----------------|---------------------------|----------------|--------------
 * string           |zpGridTypeString           |string          |same as input
 * -----------------|---------------------------|----------------|
 * istring          |zpGridTypeStringInsensitive|case insensitive|
 *                  |                           |string          |
 * -----------------|---------------------------|----------------|
 * int              |zpGridTypeInt              |number or       |
 *                  |                           |Infinity        |
 * -----------------|---------------------------|----------------|
 * intGerman        |zpGridTypeIntGerman        |number in       |
 *                  |                           |German format or|
 *                  |                           |Infinity        |
 * -----------------|---------------------------|----------------|
 * float            |zpGridTypeFloat            |number or       |
 *                  |                           |Infinity        |
 * -----------------|---------------------------|----------------|
 * floatGerman      |zpGridTypeFloatGerman      |number in       |
 *                  |                           |German format or|
 *                  |                           |Infinity        |
 * -----------------|---------------------------|----------------|
 * date             |zpGridTypeDate             |string accepted |
 *                  |                           |by builtin      |
 *                  |                           |javascript Date |
 *                  |                           |object          |
 * -----------------|---------------------------|----------------|
 * time             |zpGridTypeTime             |HH:MM:SS        |
 *                  |                           |HH:MM:SS AM/PM  |
 *                  |                           |HH:MM           |
 *                  |                           |HH:MM AM/PM     |
 *                  |                           |HHMMSS          |
 *                  |                           |HHMMSS AM/PM    |
 *                  |                           |HHMM            |
 *                  |                           |HHMM AM/PM      |
 * -----------------|---------------------------|----------------|--------------
 * timestamp        |zpGridTypeTimestampLocale  |integer (number |Date in locale
 *                  |                           |of seconds since|format
 * -----------------|---------------------------|01/01/1970      |--------------
 * timestampMMDDYYYY|zpGridTypeTimestampMMDDYYYY|00:00 GMT)      |MM/DD/YYYY
 * -----------------|---------------------------|                |--------------
 * timestampDDMMYYYY|zpGridTypeTimestampDDMMYYYY|                |DD/MM/YYYY
 * -----------------|---------------------------|                |--------------
 * timestampYYYYMMDD|zpGridTypeTimestampYYYYMMDD|                |YYYY/MM/DD
 * -----------------|---------------------------|----------------|--------------
 * boolean          |zpGridTypeBoolean          |case insensitive|No/Yes
 *                  |                           |0 or 1          |or custom
 * -----------------|---------------------------|f or t          |--------------
 * booleanTF        |zpGridTypeBooleanTF        |false or true   |False/True
 *                  |                           |n or y          |or custom
 *                  |                           |no or yes       |
 * -----------------------------------------------------------------------------
 *
 * <strong>In addition to config options defined in base Zapatec.Widget class
 * provides following config options:</strong>
 *
 * <b>show_asis</b> [boolean] Show data as is.
 * The original data the is imported to the grid needs to be translated to it's field type.
 * In many cases this translation changes the original data.  
 * This option gives control back to the user to define how to display the grid cell
 * Possible values:
 * boolean
 *    true  - Show ALL cells as is
 *    false - Show the cells based on the field type conversion
 * object {bBoth, funcShow}
 *    bBoth - Show both in cell, Ex: Orig = Zapatec Value
 *    Ex: Showing both
 * BYTES-  cell=|15 MB=15360000000|; where 15 MB is orig and 15360000000 bytes is converted value
 * HOURS-  cell=|2 days 1 hour=49|; where 2 days 1 hour is orig and 49 hours is converted value
 * WEIGHT- cell=|1 lb 2 oz=18|; where 1 lb 2 oz is orig and 18 oz is converted value
 *   funcShow - callback function to create presentable cell data
 *   Function to visually present the data. Does NOT effect sorting, just visual
 *   sShowData = this.config.show_asis.funcShow(oGrid, oCell);
 *   param oCell - Zapatec.Grid object
 *   param oCell - cell object
 *
 * <b>funcStyle</b> [function] Callback function to dynamically change the style
 * of a cell.
 *   Dynamically change the style of a cell based on the contents.
 *   param oGrid - Zapatec.Grid object
 *   param oCell - cell object
 *   param iRow - index of the row in the displayed rows array returned by
 *    {@link Zapatec.Grid#applyPaging} method
 *   return undefined if NO change to style
 *   return string for the inline style that should be applied to this cell
 *
 * <b>convert</b> [function] Callback function to convert the cell value.
 * Receives Zapatec.Grid object and cell object. If returns a value, that value
 * will be assigned to the cell display and compare values.
 *
 * <b>container</b> [object or string] Element or id of element that will hold
 * the grid. If "callbackHeaderDisplay" and "callbackRowDisplay" or
 * "callbackDataDisplay" options are defined, grid will be drawn using those
 * functions and "container" option is ignored. Also can be used instead of
 * "source" option. If "source" option is not defined, first child table of
 * container element is used as source.
 *
 * Standard output requires zpgrid-output.js module that is included by default.
 *
 * <b>headerContainer</b> [object or string] Element or id of element that will
 * hold header of the grid. Used together with "container" option when header
 * should be separated from the grid. E.g. to have grid data scrollable
 * vertically and header always visible. See scroll.html demo for details.
 *
 * <b>totalsContainer</b> [object or string] Element or id of element that will
 * hold totals. Used together with "container" option when totals should be
 * separated from the grid. E.g. to have grid data scrollable vertically and
 * totals always visible. See scroll.html demo for details.
 *
 * <b>visibleRows</b> [number] Used for displaying custom vertical scrollbar.
 * If > 0, limits number of rows displayed starting from current vertical offset.
 * See {@link Zapatec.Grid#gotoVerticalOffset} method for details about current
 * vertical offset. Default: 0.
 *
 * <b>visibleColumns</b> [number] Used for displaying custom horizontal
 * scrollbar. If > 0, limits number of columns displayed starting from current
 * horizontal offset. See {@link Zapatec.Grid#gotoHorizontalOffset} method for
 * details about current horizontal offset. Default: 0.
 *
 * <b>rowsPerPage</b> [number] If > 0, paging is used. Default: 0.
 *
 * <b>paginationContainer</b> [object or string] Element or id of element that
 * will hold pagination of the grid. Used together with "container" and
 * "rowsPerPage" options when pagination should be separated from the grid. See
 * scroll.html demo for example. You can pass several containers in an array to
 * this option if you need to display pagination in two or more places. See
 * compare.html demo for example.
 *
 * <b>border</b> [object or string] Element or id of element that is parent for
 * all grid containers. Used to determine dimensions of the grid when it has
 * several containers. Need only for <b>fitIntoParent</b> feature below when
 * grid has several containers. Default is parent element of the
 * <b>container</b>.
 *
 * <b>fitIntoParent</b> [boolean, object or string] When true, grid will be
 * adjusted dynamically to fit into parent element of the <b>border</b>.
 * When element or id of element, grid will be adjusted dynamically to fit into
 * that element.
 *
 * <b>horizontal</b> [boolean] If true, horizontal layout is used in standard
 * output. Default: false.
 *
 * <b>selectRows</b> [boolean] If true, selected rows will be marked by
 * different color depending from theme. Default: true. Ignored when callback
 * functions are used to display grid.
 *
 * <b>selectCells</b> [boolean] If true, selected cells will be marked by
 * different color depending from theme. Default: true. Ignored when callback
 * functions are used to display grid.
 *
 * <b>activeRows</b> [boolean] If true, active rows will be marked by
 * different color depending from theme. Default: true. Ignored when callback
 * functions are used to display grid.
 *
 * <b>activeCells</b> [boolean] If true, active cells will be marked by
 * different color depending from theme. Default: true. Ignored when callback
 * functions are used to display grid.
 *
 * <b>multipleSelect</b> [boolean] If true, "Shift" and "Ctrl" click will select
 * multiple rows and cells. If false, only one row and cell can be selected at
 * a time. Default: true.
 *
 * <b>callbackHeaderDisplay</b> [function] Callback function to display grid
 * header. Used togeter with callbackRowDisplay or callbackDataDisplay option as
 * alternetive way to display the grid. Otherwise ignored. Receives Zapatec.Grid
 * object. No return value is needed.
 *
 * <b>callbackDataDisplay</b> [function] Callback function to display grid rows.
 * Used togeter with callbackHeaderDisplay option as alternetive way to display
 * the grid. Otherwise ignored. Receives Zapatec.Grid object and array of row
 * objects. No return value is needed.
 *
 * <b>callbackRowDisplay</b> [function] Callback function to display grid row.
 * Called for each row. Used togeter with callbackHeaderDisplay option as
 * alternetive way to display the grid. Otherwise ignored. Ignored when
 * callbackDataDisplay is set. Receives Zapatec.Grid object and row object.
 * No return value is needed.
 *
 * <b>callbackTotalsDisplay</b> [function] Callback function to display totals.
 * Used togeter with callbackHeaderDisplay, callbackRowDisplay and
 * callbackDataDisplay options as alternetive way to display the grid, but also
 * can be used separately as a replacement for standard totals. Receives
 * Zapatec.Grid object and array of row objects for totals. If totals option is
 * not set this option still can be used, but it receives undefined instead of
 * array of rows. No return value is needed.
 *
 * <b>callbackTotalDisplay</b> [function] Callback function to display totals
 * row. Called for each totals row. Used togeter with callbackHeaderDisplay,
 * callbackRowDisplay and callbackDataDisplay options as alternetive way to
 * display the grid, but also can be used separately as a replacement for
 * standard totals. Ignored when callbackTotalsDisplay is set. Receives
 * Zapatec.Grid object and totals row object. No return value is needed.
 *
 * <b>callbackPaginationDisplay</b> [function] Callback function to display grid
 * pagination. Used togeter with callbackHeaderDisplay, callbackRowDisplay and
 * callbackDataDisplay options as alternetive way to display the grid, but also
 * can be used separately as a replacement for standard pagination.
 * Receives Zapatec.Grid object. No return value is needed. See also
 * {@link Zapatec.Grid#gotoPage}, {@link Zapatec.Grid#previousPage},
 * {@link Zapatec.Grid#firstPage}, {@link Zapatec.Grid#nextPage},
 * {@link Zapatec.Grid#lastPage}.
 *
 * <b>callbackRowOnClick</b> [function] Callback function to call when grid row
 * is clicked with left mouse button. Receives Zapatec.Grid object and row
 * object. No return value is needed.
 *
 * <b>callbackRowOnRightClick</b> [function] Callback function to call when grid
 * row is clicked with right mouse button. Receives Zapatec.Grid object and row
 * object. No return value is needed.
 *
 * <b>callbackCellOnClick</b> [function] Callback function to call when grid
 * cell is clicked with left mouse button. Receives Zapatec.Grid object and cell
 * object. No return value is needed. If this option is defined, above
 * "callbackRowOnClick" option is ignored.
 *
 * <b>callbackCellOnRightClick</b> [function] Callback function to call when
 * grid cell is clicked with right mouse button. Receives Zapatec.Grid object
 * and cell object. No return value is needed. If this option is defined, above
 * "callbackRowOnRightClick" option is ignored.
 *
 * <b>callbackRowOnDblClick</b> [function] Callback function to call when grid
 * row is double clicked. Receives Zapatec.Grid object and row object. No return
 * value is needed.
 *
 * <b>callbackCellOnDblClick</b> [function] Callback function to call when grid
 * cell is double clicked. Receives Zapatec.Grid object and cell object. No
 * return value is needed. If this option is defined, above
 * "callbackRowOnDblClick" option is ignored.
 *
 * <b>callbackRowSelect</b> [function] Callback function to call when grid row
 * is selected. Receives Zapatec.Grid object and row object. No return value is
 * needed.
 * 
 * <b>callbackCellSelect</b> [function] Callback function to call when grid cell
 * is selected. Receives Zapatec.Grid object and cell object. No return value is
 * needed. If this option is defined, above "callbackRowSelect" option is
 * ignored.
 * 
 * <b>callbackRowUnselect</b> [function] Callback function to call when grid row
 * is unselected. Receives Zapatec.Grid object and row object. No return value
 * is needed.
 * 
 * <b>callbackCellUnselect</b> [function] Callback function to call when grid
 * cell is unselected. Receives Zapatec.Grid object and cell object. No return
 * value is needed. If this option is defined, above "callbackRowUnselect"
 * option is ignored.
 *
 * <b>callbackOnRefresh</b> [function] Callback function to call when grid is
 * refreshed. Receives Zapatec.Grid object. No return value is needed.
 * Deprecated. Use <b>gridRefreshed</b> event described below instead.
 * 
 * <b>sortColumn</b> [number] Number of column to sort initially. First column
 * number is 0. If not set, initially grid will not be sorted.
 *
 * <b>sortDesc</b> [boolean] Used together with sortColumn option. Otherwise
 * ignored. If true, initially grid will be sorted in descending order.
 *
 * <b>filterOut</b> [object] Array of associative arrays:
 * [
 *   {
 *     column: [object or number] array of zero-based column numbers or single
 *      zero-based column number to use as source of values to filter out,
 *     sortDesc: [boolean, optional] if true, list of values will be sorted
 *      descending, otherwise ascending (default is false),
 *     container: [object or string, optional] element or id of element that
 *      will hold the list of values to filter out ,
 *     onclick: [string, optional] string with javascript code that will be
 *      evaluated when checkbox is clicked before filtering out the grid 
 *      (should not contain " (double quote) symbol),
 *     callback: [function, optional] callback function reference used as
 *      alternative way to display filter out list
 *   },
 *   ...
 * ]
 * If "callback" property is defined, "container" and "onclick" properties
 * are ingnored. "onclick" is useful when some simple actions like function call
 * or alert should be done before filtering out the grid. If you need to do more
 * complex actions than the code that can be passed in the string, use
 * alternative way to display filter out list with callback function.
 * callback function receives following array of associative arrays:
 * [
 *   {
 *     value: [string] the unique value from grid column,
 *     onclick: [string] onclick attribute value of the corresponding checkbox,
 *     checked: [boolean] true if this checkbox is checked,
 *     link: [string] onclick attribute for the link to filter out all values
 *      except this,
 *     selectall: [string] onclick attribute for the link to unfilter out all
 *      values (this property is defined only for the first value),
 *     clearall: [string] onclick attribute for the link to filter out all
 *      values (this property is defined only for the first value)
 *   },
 *   ...
 * ]
 * No return value is needed.
 *
 * <b>totals</b> (requires zpgrid-aggregate.js module that is included by
 * default) [object] Array of associative arrays:
 * [
 *   {
 *     column: [object or number, optional] array of zero-based column numbers
 *      or single zero-based column number to calculate (passed to the function;
 *      required for standard aggregate functions, optional for custom callback
 *      function),
 *     callback: [function, optional] callback function to calculate value
 *      (see below) or one of standard static aggregate functions:
 *      Zapatec.Grid.sum, Zapatec.Grid.avg, Zapatec.Grid.max, Zapatec.Grid.min,
 *      Zapatec.Grid.count, Zapatec.Grid.countDistinct (default is
 *      Zapatec.Grid.sum),
 *     label: [string, optional] label for the value (passed to the function;
 *      overrides standard label),
 *     labelColumn: [number, optional] zero-based column number where to put
 *      label (passed to the function; by default label is placed before the
 *      value in the same cell)
 *   },
 *   ...
 * ]
 * "callback" property is a callback function that calculates totals
 * using desired algorithm. It receives following object containing grid rows:
 * {
 *   grid: [object] grid object,
 *   rows: [object] array of row objects,
 *   column: [object or number, optional] "column" property of "totals",
 *   label: [string, optional] "label" property of "totals",
 *   labelColumn: [string, optional] "labelColumn" property of "totals"
 * }
 * and should return following object containing one or several rows with
 * totals (number of cells should correspond to the number of grid fields):
 * {
 *   rows:
 *   [
 *     {
 *       cells:
 *       [
 *         {
 *           v: [string] value to display,
 *           style: [string, optional] table cell style attribute
 *         },
 *         ...
 *       ],
 *       style: [string, optional] table row style attribute
 *     },
 *     ...
 *   ]
 * }
 * See {@link Zapatec.Grid#sum} for example.
 *
 * <b>dataPrepared</b> [boolean] If true, grid will not attempt to check and
 * correct input data. External application is responsible for data preparation.
 * May be used with json source type to speed up large grid initialization. Data
 * must be prepared strictly according to grid internal format. 
 *
 * <b>dataOnDemand</b> [boolean] If true, on every paging, sorting, filtering,
 * ranging, and search action grid instead of doing actual operation reloads
 * its data. It makes sence to use this option together with "callbackSource"
 * config option defined in Zapatec.Widget class. In this case grid passes to
 * callbackSource function following object:
 * {
 *   currentPage: [number] zero-based current page number,
 *   sortColumn: [number] zero-based column number on which grid is currently
 *    sorted (deprecated, use order instead),
 *   sortDesc: [boolean] true if grid is currently sorted in descending order
 *    (deprecated, use order instead),
 *   order: [object] array showing how the grid is currently sorted with
 *    sorting priority from first to last element of the array, see
 *    {@link Zapatec.Grid#sort} method for more details about sorting:
 *   [
 *     {
 *       col: [number] zero-based column number,
 *       desc: [boolean, optional] indicates descending order for this column,
 *       lt: [number] 1 if desc, -1 otherwise,
 *       gt: [number] -1 if desc, 1 otherwise
 *     },
 *     ...
 *   ]
 *   filters: [object] array containing an object for each grid column:
 *   [
 *     {
 *       hiddenValues: [object] array of hidden values - rows conaining these
 *        values in the column should not be displayed,
 *       minValue: [any] rows containing values in the column lesser than this
 *        value should not be displayed,
 *       maxValue: [any] rows containing values in the column greater than this
 *        value should not be displayed,
 *       regexpFilter: [string, optional] rows where column value don't match
 *        this regular expression should not be displayed,
 *       textFilter: [string] rows which don't contain this pattern in the
 *        column value should not be displayed
 *     },
 *     ...
 *   ]
 * }
 * and lets it to form the source, e.g. server URL, from which grid is reloaded
 * then. See {@link Zapatec.Widget} for details.
 *
 * <b>fixedLeft</b> [number] Number of columns starting from the left that are
 * not moved during horizontal scrolling.
 *
 * <b>columnWidth</b> [string] Default column width. Should contain correct CSS
 * value, e.g. 'auto', '200px', etc. 'auto' must not be used with grids having
 * separate container for header. Default: 'auto' if headerContainer and
 * totalsContainer are not set, '100px' if headerContainer or totalsContainer is
 * set.
 *
 * <b>rowHeight</b> [string] Default row height. Should contain correct CSS
 * value, e.g. 'auto', '1.2em', etc. 'auto' must not be used with grids having
 * fixed columns. Default: 'auto'.
 *
 * <b>mouseSelect</b> [boolean or string] Allow selection of cells and rows
 * using left mouse button. Default: true.
 *
 * <b>dragAndDropCells</b> [boolean or string] Allow drag and drop cells using
 * left mouse button. Default: false.
 * Note: if this option is true, <b>mouseSelect</b> must be false.
 *
 * <b>dragAndDropColumns</b> [boolean or string] Allow drag and drop columns
 * using left mouse button. Default: false.
 *
 * <strong>In addition to events fired from base Zapatec.Widget class fires
 * following events:</strong>
 *
 * <b>gridInitialized</b> when grid initialization process is completed.
 *
 * <b>gridPrepareRefresh</b> before grid refresh is started.
 *
 * <b>gridRefreshed</b> when grid refresh is completed.
 *
 * <b>gridPrepareModify</b> before splice or query is started.
 *
 * <b>gridModified</b> when splice or query is completed.
 *
 * <b>gridPrepareFilter</b> before filtering is started.
 *
 * <b>gridFiltered</b> when filtering is completed.
 *
 * <b>gridResizedColumn</b> when standard output is used and column was resized
 * manually. Listener receives two arguments: column id and width increment in
 * pixels. Width increment can be negative.
 *
 * <b>gridMovedColumn</b> when column is moved. Listener receives following
 * argument:
 * {
 *   fieldId: [number] zero-based id of the moved field,
 *   position: [number] new zero-based column position
 * }
 *
 * <b>gridCellMousedown</b> when mouse down event occurs on the cell's td
 * element. Listener receives two arguments: row id and cell id.
 * </pre>
 *
 * @constructor
 * @extends Zapatec.Widget
 * @param {object} oArg User configuration
 */
Zapatec.Grid = function(oArg) {
	// Call constructor of superclass
	Zapatec.Grid.SUPERconstructor.call(this, oArg);
};

/**
 * Unique static id of the widget class. Gives ability for Zapatec#inherit to
 * determine and store path to this file correctly when it is included using
 * Zapatec#include. When this file is included using Zapatec#include or path
 * to this file is gotten using Zapatec#getPath, this value must be specified
 * as script id.
 * @private
 */
Zapatec.Grid.id = 'Zapatec.Grid';

// Inherit Widget
Zapatec.inherit(Zapatec.Grid, Zapatec.Widget);

/**
 * Initializes grid.
 *
 * @param {object} oArg User configuration
 */
Zapatec.Grid.prototype.init = function(oArg) {
	// Indicates that initialization process is completed
	this.initialized = false;
	// Call parent method
	Zapatec.Grid.SUPERclass.init.call(this, oArg);
	var oConfig = this.config;
	// Holds grid data
	this.data = {};
	// Reference to fields array in data object
	this.fields = [];
	// Reference to rows array in data object
	this.rows = [];
	// Array where indexes are the same as row ids to reference grid rows by id
	this.rowsIndex = [];
	// Holds filtered row objects
	this.filteredRows = [];
	// Holds current page number
	this.currentPage = 0;
	// Holds current frame for autoresize
	this.autoresizeFrame = {
		direction: 0,
		currentRow: 0,
		visibleRows: oConfig.rowsPerPage
	};
	// Holds current vertical offset on the page
	this.currentVerticalOffset = 0;
	// Holds current horizontal offset on the page
	this.currentHorizontalOffset = 0;
	// Holds sorting order
	this.order = [];
	// Initially may be sorted on the specified column and in the specified order
	// null is object
	if (typeof oConfig.sortColumn != 'object') {
		this.order.push({
			col: oConfig.sortColumn * 1,
			desc: oConfig.sortDesc,
			lt: oConfig.sortDesc ? 1 : -1,
			gt: oConfig.sortDesc ? -1 : 1
		});
	}
	// Object that holds last selection to be able to modify it
	this.lastSelection = null;
	// Load data from the specified source
	this.loadData();
};

/**
 * Reconfigures the grid with new config options after it was initialized.
 * May be used to change look or behavior of the grid after it has loaded
 * the data. In the argument pass only values for changed config options.
 * There is no need to pass config options that were not changed.
 *
 * <pre>
 * Note: "sortColumn" and "sortDesc" config options are ignored by this method
 * because they are useful only on initialization. To sort the grid after it was
 * initialized use sort method instead.
 * </pre>
 *
 * @param {object} oArg Changes to user configuration
 */
Zapatec.Grid.prototype.reconfigure = function(oArg) {
	// Call parent method
	Zapatec.Grid.SUPERclass.reconfigure.call(this, oArg);
	// Redraw grid
	this.refresh();
};

/**
 * Configures grid. Gets called from parent init method.
 *
 * @private
 * @param {object} oArg User configuration
 */
Zapatec.Grid.prototype.configure = function(oArg) {
	// Define config options
	this.defineConfigOption('show_asis', false);
	this.defineConfigOption('funcStyle');
	this.defineConfigOption('convert');
	this.defineConfigOption('container');
	this.defineConfigOption('headerContainer');
	this.defineConfigOption('totalsContainer');
	this.defineConfigOption('visibleRows', 0);
	this.defineConfigOption('visibleColumns', 0);
	this.defineConfigOption('rowsPerPage', 0);
	this.defineConfigOption('paginationContainer');
	this.defineConfigOption('border');
	this.defineConfigOption('fitIntoParent');
	this.defineConfigOption('horizontal', false);
	this.defineConfigOption('selectRows', true);
	this.defineConfigOption('selectCells', true);
	this.defineConfigOption('activeRows', true);
	this.defineConfigOption('activeCells', true);
	this.defineConfigOption('multipleSelect', true);
	this.defineConfigOption('callbackHeaderDisplay');
	this.defineConfigOption('callbackDataDisplay');
	this.defineConfigOption('callbackRowDisplay');
	this.defineConfigOption('callbackTotalsDisplay');
	this.defineConfigOption('callbackTotalDisplay');
	this.defineConfigOption('callbackPaginationDisplay');
	this.defineConfigOption('callbackRowOnClick');
	this.defineConfigOption('callbackRowOnRightClick');
	this.defineConfigOption('callbackCellOnClick');
	this.defineConfigOption('callbackCellOnRightClick');
	this.defineConfigOption('callbackRowOnDblClick');
	this.defineConfigOption('callbackCellOnDblClick');
	this.defineConfigOption('callbackRowSelect');
	this.defineConfigOption('callbackCellSelect');
	this.defineConfigOption('callbackRowUnselect');
	this.defineConfigOption('callbackCellUnselect');
	this.defineConfigOption('callbackOnRefresh');
	this.defineConfigOption('sortColumn');
	this.defineConfigOption('sortDesc');
	this.defineConfigOption('filterOut', []);
	this.defineConfigOption('totals', []);
	this.defineConfigOption('dataPrepared', false);
	this.defineConfigOption('dataOnDemand', false);
	this.defineConfigOption('fixedLeft', 0);
	this.defineConfigOption('columnWidth', 'auto');
	this.defineConfigOption('rowHeight', 'auto');
	this.defineConfigOption('mouseSelect', true);
	this.defineConfigOption('dragAndDropCells', false);
	this.defineConfigOption('dragAndDropColumns', false);
	this.defineConfigOption('langId', 'Zapatec.Grid');
	this.defineConfigOption('lang', 'eng');
	// Call parent method
	Zapatec.Grid.SUPERclass.configure.call(this, oArg);
	// Correct config options
	var fGetElById = Zapatec.Widget.getElementById;
	var fCorrectCssLength = Zapatec.Utils.correctCssLength;
	var oConfig = this.config;
	// Correct rowsPerPage config option
	oConfig.rowsPerPage = parseInt(oConfig.rowsPerPage);
	if (isNaN(oConfig.rowsPerPage)) {
		oConfig.rowsPerPage = 0;
	}
	// Correct visibleRows config option
	oConfig.visibleRows = parseInt(oConfig.visibleRows);
	if (isNaN(oConfig.visibleRows)) {
		oConfig.visibleRows = 0;
	}
	// Correct visibleColumns config option
	oConfig.visibleColumns = parseInt(oConfig.visibleColumns);
	if (isNaN(oConfig.visibleColumns)) {
		oConfig.visibleColumns = 0;
	}
	// There is no sense to use dataOnDemand without rowsPerPage
	if (!oConfig.rowsPerPage) {
		oConfig.dataOnDemand = false;
	}
	// Indicates that we are responsible for visualisation
	this.visualize = true;
	if (typeof oConfig.callbackHeaderDisplay == 'function' &&
	 (typeof oConfig.callbackRowDisplay == 'function' ||
	 typeof oConfig.callbackDataDisplay == 'function')) {
		this.visualize = false;
		// Prevent displaying of "Theme not found" message
		oConfig.theme = '';
	}
	// Grid container
	this.container = fGetElById(oConfig.container);
	// Grid header container
	this.headerContainer = fGetElById(oConfig.headerContainer);
	// Grid totals container
	this.totalsContainer = fGetElById(oConfig.totalsContainer);
	// Grid pagination containers array
	this.paginationContainers = [];
	var vPagCont = oConfig.paginationContainer;
	if (typeof vPagCont != 'undefined') {
		if (vPagCont instanceof Array) {
			var aPagCont = this.paginationContainers;
			var iEls = vPagCont.length;
			var iEl, oEl;
			for (iEl = 0; iEls--; iEl++) {
				oEl = fGetElById(vPagCont[iEl]);
				if (oEl) {
					aPagCont.push(oEl);
				}
			}
		} else {
			var oEl = fGetElById(vPagCont);
			if (oEl) {
				this.paginationContainers.push(oEl);
			}
		}
	}
	// Grid border element
	this.border = fGetElById(oConfig.border);
	if (!this.border && this.container) {
		// Assume border is parent node of the container
		this.border = this.container.parentNode;
	}
	// Element to fit into
	this.fitInto = null;
	if (this.border) {
		if (typeof oConfig.fitIntoParent == 'boolean') {
			if (oConfig.fitIntoParent) {
				this.fitInto = this.border.parentNode;
			}
		} else {
			this.fitInto = fGetElById(oConfig.fitIntoParent);
		}
	}
	// Adjust number of rows per page to fit into specified container
	if (this.fitInto && typeof this.autoresize == 'function') {
		this.addEventListener('gridRefreshed', this.autoresize);
		this.addEventListener('gridResizedColumn', this.autoresize);
	}
	// Correct columnWidth config option
	oConfig.columnWidth = fCorrectCssLength(oConfig.columnWidth);
	if (oConfig.columnWidth == 'auto' &&
	 (this.headerContainer || this.totalsContainer)) {
		oConfig.columnWidth = '100px';
	}
	// Correct rowHeight config option
	oConfig.rowHeight = fCorrectCssLength(oConfig.rowHeight);
	// Setup mouse selection
	if (oConfig.mouseSelect && this.mouseSelect) {
		this.addEventListener('gridCellMousedown', this.mouseSelect);
	}
	// Setup cell dragging
	if (oConfig.dragAndDropCells && this.dragCell) {
		this.addEventListener('gridCellMousedown', this.dragCell);
	}
	// Setup column dragging
	if (oConfig.dragAndDropColumns && this.dragColumn) {
		this.addEventListener('gridFieldMousedown', this.dragColumn);
	}
	// Setup right mouse click callbacks
	if (typeof oConfig.callbackCellOnRightClick == 'function' ||
	 typeof oConfig.callbackRowOnRightClick == 'function') {
		// Disable context menu
		window.document.oncontextmenu = function() {return false};
		// Add event listener to mouseup event to be able to get button number
		this.addEventListener('gridCellMouseup', Zapatec.Grid.onCellMouseup);
	}
	// Filter out rules
	this.filterOutRules = oConfig.filterOut;
	if (!(this.filterOutRules instanceof Array)) {
		this.filterOutRules = [];
	}
	// Totals rules
	this.totalsRules = oConfig.totals;
	if (!(this.totalsRules instanceof Array)) {
		this.totalsRules = [];
	}
};

/**
 * Extends parent method.
 * @private
 */
Zapatec.Grid.prototype.addStandardEventListeners = function() {
	// Call parent method
	Zapatec.Grid.SUPERclass.addStandardEventListeners.call(this);
	// Add grid specific event listeners
	this.addEventListener('fetchSourceError', this.displayErrorSource);
	// If zpgrid-output.js is loaded
	if (this.displayLoading) {
		this.addEventListener('fetchSourceStart', this.displayLoading);
		this.addEventListener('fetchSourceEnd', this.removeLoading);
		this.addEventListener('loadThemeEnd', this.visualizeThemeLoad);
		this.addEventListener('loadDataEnd', this.visualizeDataLoad);
	}
};

/**
 * Displays error when external source is malformed.
 * @private
 */
Zapatec.Grid.prototype.displayErrorSource = function(oError) {
	alert(this.getMessage('errorSource', this.config.source,
	 oError.errorDescription));
};

/**
 * Reloads data from the specified source after grid is initialized. Argument
 * should be passed only when dataOnDemand config option is true and
 * callbackSource config option is defined. See description of dataOnDemand
 * config option for details.
 *
 * @param {object} oArg Optional. Argument object
 */
Zapatec.Grid.prototype.loadData = function(oArg) {
	// Form argument for server side
	if (this.config.dataOnDemand) {
		if (typeof oArg != 'object') {
			oArg = {};
		}
		oArg.currentPage = this.currentPage;
		if (this.order.length) {
			oArg.sortColumn = this.order[0].col;
			oArg.sortDesc = this.order[0].desc;
			oArg.order = this.order;
		}
		oArg.filters = [];
		for (var iCol = 0; iCol < this.fields.length; iCol++) {
			var oField = this.fields[iCol];
			if (oField) {
				oArg.filters[iCol] = {
					hiddenValues: oField.hiddenValues,
					minValue: oField.minValue,
					maxValue: oField.maxValue,
					regexpFilter: oField.regexpFilter,
					textFilter: oField.textFilter
				};
			} else {
				oArg.filters[iCol] = {};
			}
		}
	}
	// Call parent method
	Zapatec.Grid.SUPERclass.loadData.call(this, oArg);
};

/**
 * Performs some actions when grid is refreshed.
 * @private
 */
Zapatec.Grid.prototype.onRefresh = function() {
	// Several refresh processes may run simultaneously.
	if (this.refreshState > 1) {
		this.refreshState--;
		return;
	}
	// If we are responsible for visualisation
	if (this.visualizeRefresh && this.visualize) {
		this.visualizeRefresh();
	}
	// Indicates number of running refresh processes
	this.refreshState--;
	// Onrefresh callback (deprecated)
	if (typeof this.config.callbackOnRefresh == 'function') {
		this.config.callbackOnRefresh(this);
	}
	// Fire event
	this.fireEvent('gridRefreshed');
};

/**
 * Loads data from the JSON source.
 *
 * @private
 * @param {object} oData Input data object
 */
Zapatec.Grid.prototype.loadDataJson = function(oData) {
	// Remove index
	this.rowsIndex = null;
	// Get data
	if (!(oData instanceof Object)) {
		oData = {};
	}
	if (!(oData.fields instanceof Array)) {
		oData.fields = [];
	}
	if (!(oData.rows instanceof Array)) {
		oData.rows = [];
	}
	this.data = oData;
	// References
	this.fields = oData.fields;
	this.rows = oData.rows;
	// Check and correct input data
	if (!this.config.dataPrepared) {
		this.prepareData();
	}
	// Duplicate rows array
	this.rowsIndex = this.rows.slice();
	// Build primary key
	this.primaryKeyColumn = oData.primaryKey;
	this.buildPrimaryKey();
	// Set page
	if (typeof oData.currentPage != 'undefined') {
		this.setCurrentPage(oData.currentPage);
	} else {
		this.setCurrentPage(0);
	}
	// Show grid
	this.show();
};

/**
 * Builds primary key.
 * @private
 */
Zapatec.Grid.prototype.buildPrimaryKey = function() {
	var iKey = this.primaryKeyColumn;
	if (!this.fields[iKey]) {
		this.primaryKey = null;
		return;
	}
	this.primaryKey = {};
	var oKey = this.primaryKey;
	var aRows = this.rows;
	var iRows = aRows.length;
	var iRow, sKey;
	for (iRow = 0; iRow < iRows; iRow++) {
		sKey = this.getCellValueCompare(this.getCellByRow(aRows[iRow], iKey));
		if ((typeof sKey == 'string' && sKey.length) || typeof sKey == 'number') {
			oKey[sKey] = aRows[iRow];
		}
	}
};

/**
 * Rebuilds primary key.
 * @private
 */
Zapatec.Grid.prototype.rebuildPrimaryKey = function() {
	if (this.primaryKey) {
		this.buildPrimaryKey();
	}
};

/**
 * Displays grid after data loading.
 * @private
 */
Zapatec.Grid.prototype.show = function() {
	// Duplicate rows array
	this.filteredRows = this.rows.slice();
	// Sort if needed
	this.sort();
	// Display grid
	this.refresh();
	// Display filter out forms
	this.displayFilterOut();
	// Fire event
	if (!this.initialized) {
		this.initialized = true;
		this.fireEvent('gridInitialized');
	}
};

/**
 * Checks if all required properties of input object are defined. Defines missed
 * properties.
 * @private
 */
Zapatec.Grid.prototype.prepareData = function() {
	// Prepare fields
	var aItems = this.fields;
	var iItems = aItems.length;
	var iItem, oItem;
	for (iItem = 0; iItem < iItems; iItem++) {
		oItem = aItems[iItem];
		if (!(oItem instanceof Object)) {
			oItem = {};
		}
		oItem.i = iItem;
		aItems[iItem] = this.prepareField(oItem);
	}
	// Prepare spans
	aItems = this.rows;
	this.prepareSpans(aItems);
	// Prepare rows
	iItems = aItems.length;
	for (iItem = 0; iItem < iItems; iItem++) {
		oItem = aItems[iItem];
		if (!(oItem instanceof Object)) {
			oItem = {};
		}
		oItem.i = iItem;
		aItems[iItem] = this.prepareRow(oItem);
	}
};

/**
 * Checks if all required properties of the field object are defined. Defines
 * missed properties.
 *
 * @private
 * @param {object} oField Field object
 * @return Prepared field object
 * @type {object}
 */
Zapatec.Grid.prototype.prepareField = function(oField) {
	return oField;
};

/**
 * Checks if all required properties of the row object are defined. Defines
 * missed properties.
 *
 * @private
 * @param {object} oRow Row object
 * @return Prepared row object
 * @type {object}
 */
Zapatec.Grid.prototype.prepareRow = function(oRow) {
	if (!oRow.cells || !(oRow.cells instanceof Array)) {
		oRow.cells = [];
	}
	// Prepare cells
	var aCells = oRow.cells;
	var iColumns = this.fields.length;
	var iCol, oCell;
	for (iCol = 0; iCol < iColumns; iCol++) {
		// Get cell
		oCell = aCells[iCol];
		if (!(oCell instanceof Object)) {
			oCell = {};
		}
		// Assign column number
		oCell.i = iCol;
		// In the rowspan the same cell object is shared among several rows
		if (!(oCell.rowspan > 0 && typeof oCell.r != 'undefined')) {
			// Assign row number
			oCell.r = oRow.i;
		}
		// Convert
		aCells[iCol] = this.convertCell(oCell);
		// Skip spanned cells
		if (oCell.colspan > 1) {
			iCol += oCell.colspan - 1;
		}
	}
	return oRow;
};

/**
 * Converts cell to corresponding data type.
 *
 * @private
 * @param {object} oCell Cell object
 * @return Converted cell object
 * @type object
 */
Zapatec.Grid.prototype.convertCell = function(oCell) {
	return this.convertCellByField(this.getFieldByCell(oCell), oCell);
};

/**
 * Converts cell to corresponding data type of the field.
 *
 * @private
 * @param {object} oCell Cell object
 * @return Converted cell object
 * @type object
 */
Zapatec.Grid.prototype.convertCellByField = function(oField, oCell) {
	if (!(oCell instanceof Object)) {
		oCell = {};
	}
	// Convert by type
	if (oField && this.getConvertByType) {
		var sMethod = this.getConvertByType(oField.dataType);
		if (sMethod) {
			oCell = this[sMethod](oCell);
		}
	}
	// Custom convert
	oCell = this.convertCellCallback(oCell);
	return oCell;
};

/**
 * Converts cell using callback function.
 *
 * @private
 * @param {object} oCell Cell object
 * @return Converted cell object
 * @type object
 */
Zapatec.Grid.prototype.convertCellCallback = function(oCell) {
	if (!(oCell instanceof Object)) {
		oCell = {};
	}
	if (typeof this.config.convert == 'function') {
		var convertedValue = this.config.convert(this, oCell);
		if (typeof convertedValue != 'undefined') {
			if (typeof oCell.o == 'undefined') {
				oCell.o = oCell.v;
			}
			oCell.v = oCell.c = convertedValue;
		}
	}
	return oCell;
};

/**
 * Validates cell according to its data type. If value is invalid, sets
 * "invalid" cell property to true.
 *
 * @private
 * @param {object} oCell Cell object
 * @return True if valid
 * @type boolean
 */
Zapatec.Grid.prototype.validateCell = function(oCell) {
	if (!(oCell instanceof Object)) {
		oCell = {};
	}
	// Validate by type
	if (this.getValidateByType) {
		var oField = this.getFieldByCell(oCell);
		if (oField) {
			var sMethod = this.getValidateByType(oField.dataType);
			if (sMethod) {
				var undef;
				// Valid by default
				if (oCell.invalid) {
					oCell.invalid = undef;
				}
				// Validate
				var bValid = this[sMethod](oCell);
				if (!bValid) {
					oCell.invalid = true;
				}
				// Validate row
				var oRow = this.getRowByCell(oCell);
				if (oRow) {
					if (!bValid) {
						oRow.invalid = true;
					} else {
						// Valid by default
						if (oRow.invalid) {
							oRow.invalid = undef;
						}
						// Validate
						var aCells = this.getRowCells(oRow);
						for (var iCell = 0; iCell < aCells.length; iCell++) {
							if (aCells[iCell] && aCells[iCell].invalid) {
								oRow.invalid = true;
								break;
							}
						}
					}
				}
				return bValid;
			}
		}
	}
	// Default is true
	return true;
};

/**
 * Changes the content of the grid, replacing, adding or removing rows.
 *
 * <pre>
 * Input object format:
 *
 * {
 *   atKey: [string, optional] primary key value at which to start
 *    changing the grid,
 *   atRowId: [number, optional] id of row at which to start changing the grid,
 *   atRow: [number, optional, private] index of row in rows array at which to
 *    start changing the grid,
 *   afterKey: [string, optional] primary key value after which to start
 *    changing the grid,
 *   afterRowId: [number, optional] id of row after which to start changing
 *    the grid,
 *   afterRow: [number, optional, private] index of row in rows array after
 *    which to start changing the grid,
 *   howMany: [number, optional] number of rows to replace or remove
 *    (default is 0),
 *   rows: [object, optional] array of rows to add:
 *   [
 *     {
 *       cells:
 *       [
 *         {
 *           v: [any] cell value to display,
 *           c: [any, optional] cell value to compare,
 *           o: [any, optional] original cell value,
 *           style: [string, optional] table cell style attribute
 *         },
 *         ...
 *       ],
 *       style: [string, optional] table row style attribute
 *     },
 *     ...
 *   ],
 *   noRefresh: [boolean, optional] indicates that grid should not be refreshed
 *    after changing (default is false) (useful when several changes go one by
 *    one)
 * }
 *
 * Only one of "atKey", "atRowId", "atRow", "afterKey", "afterRowId" and
 * "afterRow" properties should be defined. If none of them is defined, new rows
 * will be added to the end of grid.
 *
 * Several input objects can be passed in an array. This is useful when several
 * changes must be done simultaneously.
 *
 * If several objects are passed in an array, "noRefresh" property is ignored
 * for all objects except the last.
 * </pre>
 *
 * @param {object} aData Array of objects or single object in above shown format
 * @return Array with replaced or removed row objects. Number of replaced or
 * removed rows can be accessed through the length property of this array. If
 * error occured, returns undefined.
 * @type object
 */
Zapatec.Grid.prototype.splice = function(aData) {
	// Check arguments
	if (!aData) {
		return;
	}
	if (!(aData instanceof Array)) {
		aData = [aData];
	}
	// Fire event
	this.fireEvent('gridPrepareModify');
	// Will hold removed rows
	var aRemoved = [];
	// Process arguments
	var iDataLen = aData.length;
	var oData;
	for (var iData = 0; iData < iDataLen; iData++) {
		// Get arguments
		oData = aData[iData];
		// Get insert position
		var iInsertPos = null;
		// Transform primary key into id
		if (typeof oData.atKey != 'undefined') {
			var iRowId = this.getRowIdByPrimaryKey(oData.atKey);
			if (typeof iRowId != 'undefined') {
				oData.atRowId = iRowId;
			}
		}
		// Find row number by id
		if ((typeof oData.atRowId == 'string' && oData.atRowId.length) ||
		 typeof oData.atRowId == 'number') {
			iInsertPos = this.getRowIndexById(oData.atRowId);
		}
		if (typeof iInsertPos != 'number') {
			if ((typeof oData.atRow == 'string' && oData.atRow.length) ||
			 typeof oData.atRow == 'number') {
				var iRowNum = oData.atRow * 1;
				if (typeof this.rows[iRowNum] != 'undefined') {
					// Before specified row
					iInsertPos = iRowNum;
				}
			}
		}
		if (typeof iInsertPos != 'number') {
			// Transform primary key into id
			if (typeof oData.afterKey != 'undefined') {
				var iRowId = this.getRowIdByPrimaryKey(oData.afterKey);
				if (typeof iRowId != 'undefined') {
					oData.afterRowId = iRowId;
				}
			}
			// Find row number by id
			if ((typeof oData.afterRowId == 'string' && oData.afterRowId.length) ||
			 typeof oData.afterRowId == 'number') {
				iInsertPos = this.getRowIndexById(oData.afterRowId);
				if (typeof iInsertPos == 'number') {
					iInsertPos++;
				}
			}
		}
		if (typeof iInsertPos != 'number') {
			if ((typeof oData.afterRow == 'string' && oData.afterRow.length) ||
			 typeof oData.afterRow == 'number') {
				var iRowNum = oData.afterRow * 1;
				if (typeof this.rows[iRowNum] != 'undefined') {
					// After specified row
					iInsertPos = iRowNum + 1;
				}
			}
		}
		// Default is end of the grid
		if (typeof iInsertPos != 'number') {
			iInsertPos = this.rows.length;
		}
		// Correct rows argument
		if (!(oData.rows instanceof Array)) {
			oData.rows = [];
		}
		// Correct howMany argument
		var iHowManyToRemove = parseInt(oData.howMany);
		if (isNaN(iHowManyToRemove)) {
			iHowManyToRemove = 0;
		}
		// Prevent rebuilding of primary key after each remove
		var oPrimaryKey = this.primaryKey;
		this.primaryKey = null;
		// Indicates that primay key must be rebuilt
		var bRebuildPrimaryKey = false;
		// Update rows
		var iRow = 0;
		var iRemoved = 0;
		while (iRemoved < iHowManyToRemove && iRow < oData.rows.length) {
			var oGridRow = this.rows[iInsertPos];
			if (typeof oGridRow == 'undefined') {
				// Trying to remove more rows than there are in the grid
				break;
			}
			// Save old row object
			aRemoved.push(Zapatec.Utils.clone(oGridRow));
			// Replace row
			var oRow = this.prepareRow(oData.rows[iRow]);
			// Replace row cells
			for (var iCol = 0; iCol < oGridRow.cells.length; iCol++) {
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
			iRow++;
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
		for (; iRow < oData.rows.length; iRow++) {
			var oRow = oData.rows[iRow];
			oRow.i = this.rowsIndex.length;
			oRow = this.prepareRow(oRow);
			// Insert row
			this.rows.splice(iInsertPos++, 0, oRow);
			this.rowsIndex.push(oRow);
			// Will need to rebuild primary key
			bRebuildPrimaryKey = true;
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
	// Show updates
	if (!oData.noRefresh) {
		this.modify();
	}
	// Return removed rows
	return aRemoved;
};

/**
 * Removes specified row from the grid.
 *
 * @private
 * @param {number} iRow Row index in rows array
 * @return Removed row
 * @type object
 */
Zapatec.Grid.prototype.removeRow = function(iRow) {
	var oRow = this.rows[iRow];
	if (!oRow) {
		return;
	}
	var undef;
	this.rowsIndex[oRow.i] = undef;
	var aRows = this.rows.splice(iRow, 1);
	this.rebuildPrimaryKey();
	return aRows[0];
};

/**
 * Changes the content of the grid, replacing, adding or removing columns.
 *
 * <pre>
 * Input object format:
 * {
 *   atColumnId: [number, optional] id of column at which to start changing
 *    the grid,
 *   afterColumnId: [number, optional] id of column after which to start
 *    changing the grid,
 *   howMany: [number, optional] number of columns to replace or remove
 *    (default is 0),
 *   fields:
 *   [
 *     {
 *       i: [number] zero-based column number, <b>dataPrepared</b> specific,
 *       title: [string, optional] column title,
 *       dataType: [string, optional] defines which standard or custom data type
 *        to use for cell conversion (if not specified, no conversion is done),
 *       columnWidth: [string, optional] column width, e.g. "10px", "10em",
 *       style: [string, optional] header table cell style attribute,
 *       ...
 *     },
 *     ...
 *   ],
 *   rows:
 *   [
 *     {
 *       cells:
 *       [
 *         {
 *           v: [any] cell value to display,
 *           c: [any, optional] cell value to compare,
 *           o: [any, optional] original cell value,
 *           style: [string, optional] table cell style attribute,
 *           ...
 *         },
 *         ...
 *       ]
 *     },
 *     ...
 *   ],
 *   noRefresh: [boolean, optional] indicates that grid should not be refreshed
 *    after changing (default is false) (useful when several changes go one by
 *    one)
 * }
 *
 * Only one of "atColumnId" and "afterColumnId" properties should be defined. If
 * none of them is defined, new columns will be added to the end of the grid.
 *
 * Several input objects can be passed in an array. This is useful when several
 * changes must be done simultaneously.
 *
 * If several objects are passed in an array, "noRefresh" property is ignored
 * for all objects except the last.
 * </pre>
 *
 * @param {object} aData Array of objects or single object in above shown format
 * @return Number of deleted columns.
 * @type number
 */
Zapatec.Grid.prototype.spliceColumns = function(aData) {
	// Check arguments
	if (!aData) {
		return 0;
	}
	// Fire event
	this.fireEvent('gridPrepareModify');
	// Process arguments
	var aFields = this.fields;
	var iFields = aFields.length;
	var aRows = this.rows;
	var iRows = aRows.length;
	var iPrimaryKey = this.primaryKeyColumn;
	var bRebuildPrimaryKey = false;
	if (!(aData instanceof Array)) {
		aData = [aData];
	}
	var iRemoved = 0;
	var iDataLen = aData.length;
	var iData, oData, iInsertPos, iHowManyToRemove, aSpliceArgs, aColumns,
	 iColumns, aRemoved, aUpdates, iRow, aCells, oUpdates, aNewCells;
	for (iData = 0; iData < iDataLen; iData++) {
		// Get arguments
		oData = aData[iData];
		// Get insert position
		iInsertPos = parseInt(oData.atColumnId);
		if (isNaN(iInsertPos)) {
			iInsertPos = parseInt(oData.afterColumnId);
			if (!isNaN(iInsertPos)) {
				iInsertPos++;
			} else {
				// Default is after last column
				iInsertPos = iFields;
			}
		}
		// Correct howMany argument
		iHowManyToRemove = parseInt(oData.howMany);
		if (isNaN(iHowManyToRemove)) {
			iHowManyToRemove = 0;
		}
		// Arguments for splice method
		aSpliceArgs = [iInsertPos, iHowManyToRemove];
		// Replace fields
		aColumns = oData.fields;
		if (!(aColumns instanceof Array)) {
			aColumns = [aColumns];
		}
		iColumns = aColumns.length;
		aRemoved = aFields.splice.apply(aFields, aSpliceArgs.concat(aColumns));
		if (aRemoved && aRemoved.length) {
			iRemoved += aRemoved.length;
		}
		// Change rows
		aUpdates = oData.rows;
		if (!(aUpdates instanceof Array)) {
			aUpdates = [];
		}
		for (iRow = 0; iRow < iRows; iRow++) {
			// Get cells array
			aCells = aRows[iRow].cells;
			// Get updates and check correctness of passed data
			oUpdates = aUpdates[iRow];
			if (!oUpdates) {
				oUpdates = {};
			}
			aNewCells = oUpdates.cells;
			if (!(aNewCells instanceof Array)) {
				aNewCells = new Array(iColumns);
			} else if (aNewCells.length < iColumns) {
				aNewCells = aNewCells.concat(new Array(iColumns - aNewCells.length));
			} else if (aNewCells.length > iColumns) {
				aNewCells.splice(iColumns, aNewCells.length - iColumns);
			}
			// Replace cells
			aCells.splice.apply(aCells, aSpliceArgs.concat(aNewCells));
		}
		// Check if primary key needs to be rebuilt
		if (typeof iPrimaryKey == 'number' && iPrimaryKey >= iInsertPos) {
			if (iPrimaryKey < iInsertPos + iHowManyToRemove) {
				this.primaryKeyColumn = null;
				this.primaryKey = null;
				bRebuildPrimaryKey = false;
			} else {
				this.primaryKeyColumn += iColumns - iHowManyToRemove;
				if (this.primaryKeyColumn < 0) {
					this.primaryKeyColumn = null;
					this.primaryKey = null;
					bRebuildPrimaryKey = false;
				} else {
					bRebuildPrimaryKey = true;
				}
			}
		}
	}
	// Check and correct input data
	this.prepareData();
	// Rebuild primary key
	if (bRebuildPrimaryKey) {
		this.rebuildPrimaryKey();
	}
	// Show updates
	if (!oData.noRefresh) {
		this.modify();
	}
	return iRemoved;
};


/**
 * Deletes specified columns.
 *
 * <pre>
 * Argument object format:
 * {
 *   columns: [object or number] Array of zero-based column numbers or single
 *    zero-based column number,
 *   noRefresh: [boolean] If true, grid is not refreshed. Useful when you need
 *    to delete some columns and to insert other columns
 * }
 * </pre>
 *
 * @param {object} oArg Argument object
 * @return Number of deleted columns
 * @type number
 */
Zapatec.Grid.prototype.deleteColumns = function(oArg) {
	// Check arguments
	var aColumns = oArg.columns;
	if (!(aColumns instanceof Array)) {
		if (typeof aColumns == 'undefined') {
			return 0;
		}
		aColumns = [aColumns];
	}
	// Delete columns
	var iDeleted = 0;
	var aFields = this.fields;
	var iColumns = aColumns.length;
	var aRows = this.rows;
	var iRows = aRows.length;
	var iPrimaryKey = this.primaryKeyColumn;
	var bRebuildPrimaryKey = false;
	var iCol, iColumn, aDeleted, iRow;
	for (iCol = 0; iCol < iColumns; iCol++) {
		iColumn = parseInt(aColumns[iCol]);
		if (!isNaN(iColumn)) {
			aDeleted = aFields.splice(iColumn, 1);
			for (iRow = 0; iRow < iRows; iRow++) {
				aRows[iRow].cells.splice(iColumn, 1);
			}
			if (aDeleted && aDeleted.length) {
				iDeleted++;
				// Check if primary key needs to be rebuilt
				if (typeof iPrimaryKey == 'number') {
					if (iPrimaryKey == iColumn) {
						this.primaryKeyColumn = null;
						this.primaryKey = null;
						bRebuildPrimaryKey = false;
					} else if (iPrimaryKey > iColumn) {
						this.primaryKeyColumn--;
						if (this.primaryKeyColumn < 0) {
							this.primaryKeyColumn = null;
							this.primaryKey = null;
							bRebuildPrimaryKey = false;
						} else {
							bRebuildPrimaryKey = true;
						}
					}
				}
			}
		}
	}
	// Check and correct input data
	this.prepareData();
	// Rebuild primary key
	if (bRebuildPrimaryKey) {
		this.rebuildPrimaryKey();
	}
	// Refresh grid
	if (!oArg.noRefresh) {
		this.refresh();
	}
	return iDeleted;
};

/**
 * Displays grid after modification of data like splice or query. Updates
 * filters, refreshes the grid and fires gridModified event. Note: To redraw
 * grid if data were not modified, use {@link Zapatec.Grid#refresh} method
 * instead.
 */
Zapatec.Grid.prototype.modify = function() {
	// Display grid
	this.setFilters();
	// Display filter out forms
	this.displayFilterOut();
	// Fire event
	this.fireEvent('gridModified');
};

/**
 * Sorts the grid. You can pass single column or an array of columns to sort by
 * several columns simultaneously. This works as follows: Grid is sorted by
 * primary column (first column in the array). If there are equal values,
 * sorting is done by next column in the array and so on. When single column is
 * passed instead of an array, it becomes primary column and in case of equal
 * values sorting is done by other columns from most left column to most right
 * column in ascending order. If column is not specified (no argument is passed
 * or passed an empty array), primary column and order from the last sorting are
 * used.
 *
 * <pre>
 * Argument object format:
 * [
 *   {
 *     column: [number or string, optional] number of column to sort
 *      (default is value of sortColumn config option),
 *     desc: [boolean, optional] sort in descending order (default is false)
 *   },
 *   ...
 * ]
 *
 * Also accepted following format:
 * {
 *   column: [number or string, optional] number of column to sort
 *    (default is value of sortColumn config option),
 *   desc: [boolean, optional] sort in descending order (default is false)
 * }
 * </pre>
 *
 * @param {object} oArg Optional. Argument object
 */
Zapatec.Grid.prototype.sort = function(aArg) {
	// Process argument
	if (aArg) {
		// Correct argument
		if (!(aArg instanceof Array)) {
			aArg = [aArg];
		}
		// Form sorting order from argument
		this.order = [];
		for (var iArg = 0; iArg < aArg.length; iArg++) {
			var oArg = aArg[iArg];
			if (!oArg) {
				break;
			}
			this.order.push({
				col: oArg.column * 1,
				desc: oArg.desc,
				lt: oArg.desc ? 1 : -1,
				gt: oArg.desc ? -1 : 1
			});
		}
	}
	// Complete sorting order array with the rest of columns
	if (this.order.length && this.order.length < this.fields.length) {
		// Get already used columns
		var oUsed = {};
		for (var iPos = 0; iPos < this.order.length; iPos++) {
			oUsed[this.order[iPos].col] = true;
		}
		// Complete array
		for (var iCol = 0; iCol < this.fields.length &&
		 this.order.length < this.fields.length; iCol++) {
			if (oUsed[iCol]) {
				continue;
			}
			this.order.push({
				col: iCol,
				// Ascending by default
				lt: -1,
				gt: 1
			});
		}
	}
	// Set sorted flag
	for (var iCol = 0; iCol < this.fields.length; iCol++) {
		var oField = this.fields[iCol];
		if (oField) {
			// Unset flags
			var undef;
			oField.sorted = undef;
			oField.sortedDesc = undef;
			// Set flag
			if (this.order.length && iCol == this.order[0].col) {
				if (this.order[0].desc) {
					oField.sortedDesc = true;
				} else {
					oField.sorted = true;
				}
			}
		}
	}
	// Check if we need to sort
	if (!this.order.length) {
		return;
	}
	// Correct column numbers
	for (var iPos = 0; iPos < this.order.length; iPos++) {
		var iCol = this.order[iPos].col;
		if (this.fields[iCol] &&
		 typeof this.fields[iCol].sortByColumn != 'undefined') {
			this.order[iPos].col = this.fields[iCol].sortByColumn * 1;
		}
	}
	// When dataOnDemand, sorting is done on server
	if (!this.config.dataOnDemand) {
		// Display "Updating"
		if (this.displayUpdating) {
			this.displayUpdating();
		}
		// Sort grid
		var oGrid = this;
		// Timeout to let browser display "Updating"
		setTimeout(function() {
			oGrid.filteredRows.sort(function(oLeft, oRight) {
				for (var iCol = 0; iCol < oGrid.order.length; iCol++) {
					var iColNum = oGrid.order[iCol].col;
					var leftVal = oGrid.getCellValueCompare(oLeft.cells[iColNum]);
					var rightVal = oGrid.getCellValueCompare(oRight.cells[iColNum]);
					if (leftVal == rightVal) {
						continue;
					}
					if (leftVal < rightVal) {
						return oGrid.order[iCol].lt;
					}
					return oGrid.order[iCol].gt;
				}
				return 0;
			});
			// We don't need this any more
			oGrid = null;
		}, 0);
	}
};

/**
 * Unsorts the grid.
 *
 * @param {object} oArg Argument object
 */
Zapatec.Grid.prototype.unsort = function() {
	// Remove sorting order
	this.order = [];
	// Redraw grid
	this.applyFilters();
};

/**
 * Sorts column in ascending (if it is sorted descending) or descending
 * (if it is sorted ascending) order.
 *
 * @param {number} iGridId Id of the grid
 * @param {number} iCol Number of column to sort
 */
Zapatec.Grid.sort = function(iGridId, iCol) {
	// Check arguments
	var oGrid = Zapatec.Widget.getWidgetById(iGridId);
	if (!oGrid || !oGrid.fields[iCol]) {
		return;
	}
	// Sort grid
	if (!oGrid.fields[iCol].sorted) {
		// Sort in ascending order
		oGrid.sort({
			column: iCol
		});
	} else {
		// Sort in descending order
		oGrid.sort({
			column: iCol,
			desc: true
		});
	}
	if (oGrid.config.dataOnDemand) {
		// Sort on server
		oGrid.loadData();
	} else {
		// Redraw grid
		oGrid.refresh();
	}
};

/**
 * Returns current page number.
 *
 * @return Current page number
 * @type number
 */
Zapatec.Grid.prototype.getCurrentPageNumber = function() {
	return this.currentPage + 1;
};

/**
 * Returns total number of pages.
 *
 * @return Total number of pages in the grid
 * @type number
 */
Zapatec.Grid.prototype.totalPages = function() {
	var iRecords = this.recordsDisplayed();
	var iRowsPerPage;
	if (this.fitInto) {
		// Autoresizing
		var oAutoresizeFrame = this.autoresizeFrame;
		iRowsPerPage = oAutoresizeFrame.visibleRows;
	} else {
		iRowsPerPage = this.config.rowsPerPage;
	}
	if (iRowsPerPage <= 0 || iRecords <= 0) {
		return 1;
	}
	return Math.ceil(iRecords / iRowsPerPage);
};

/**
 * Sets current page. Only sets private variable without grid refreshing.
 *
 * @param {number} iPage Zero-based number of page
 */
Zapatec.Grid.prototype.setCurrentPage = function(iPage) {
	// Get number of pages
	if (iPage < 0 || iPage >= this.totalPages()) {
		return;
	}
	var iDirection = iPage - this.currentPage;
	if (!iDirection) {
		// No changes
		return;
	}
	if (this.fitInto) {
		// Autoresizing
		var oAutoresizeFrame = this.autoresizeFrame;
		if (Math.abs(iDirection) == 1) {
			// Next or previous page
			oAutoresizeFrame.direction = iDirection;
			oAutoresizeFrame.currentRow += oAutoresizeFrame.visibleRows * iDirection;
		} else {
			// Random page
			oAutoresizeFrame.direction = 0;
			oAutoresizeFrame.currentRow = iPage * oAutoresizeFrame.visibleRows;
		}
		if (oAutoresizeFrame.currentRow < 0) {
			// Fix 1st page
			oAutoresizeFrame.direction = 0;
			oAutoresizeFrame.visibleRows += oAutoresizeFrame.currentRow;
			oAutoresizeFrame.currentRow = 0;
		} else {
			var iRecords = this.recordsDisplayed();
			if (oAutoresizeFrame.currentRow + oAutoresizeFrame.visibleRows > iRecords) {
				// Fix last page
				oAutoresizeFrame.direction = -1;
				oAutoresizeFrame.currentRow = iRecords - oAutoresizeFrame.visibleRows;
			}
		}
		// Go to page
		this.currentPage =
		 Math.ceil(oAutoresizeFrame.currentRow / oAutoresizeFrame.visibleRows);
	} else {
		// Go to page
		this.currentPage = iPage;
	}
};

/**
 * Displays specified page.
 *
 * @param {number} iPage Zero-based number of page
 */
Zapatec.Grid.prototype.gotoPage = function(iPage) {
	// Set current page
	this.setCurrentPage(iPage);
	// Refresh grid
	if (this.config.dataOnDemand) {
		// Get page from server
		this.loadData();
	} else {
		// Redraw grid
		this.refresh();
	}
};

/**
 * Goes to the specified page.
 *
 * @param {number} iGridId Id of the grid
 * @param {number} iPage Number of page
 */
Zapatec.Grid.gotoPage = function(iGridId, iPage) {
	var oGrid = Zapatec.Widget.getWidgetById(iGridId);
	if (oGrid) {
		oGrid.gotoPage(iPage - 1);
	}
};

/**
 * Goes to the next page.
 *
 * @param {number} iGridId Id of the grid
 */
Zapatec.Grid.nextPage = function(iGridId) {
	var oGrid = Zapatec.Widget.getWidgetById(iGridId);
	if (oGrid) {
		oGrid.gotoPage(oGrid.currentPage + 1);
	}
};

/**
 * Goes to the last page.
 *
 * @param {number} iGridId Id of the grid
 */
Zapatec.Grid.lastPage = function(iGridId) {
	var oGrid = Zapatec.Widget.getWidgetById(iGridId);
	if (oGrid) {
		oGrid.gotoPage(oGrid.totalPages() - 1);
	}
};

/**
 * Goes to the previous page.
 *
 * @param {number} iGridId Id of the grid
 */
Zapatec.Grid.previousPage = function(iGridId) {
	var oGrid = Zapatec.Widget.getWidgetById(iGridId);
	if (oGrid) {
		oGrid.gotoPage(oGrid.currentPage - 1);
	}
};

/**
 * Goes to the first page.
 *
 * @param {number} iGridId Id of the grid
 */
Zapatec.Grid.firstPage = function(iGridId) {
	var oGrid = Zapatec.Widget.getWidgetById(iGridId);
	if (oGrid) {
		oGrid.gotoPage(0);
	}
};

/**
 * Sets current vertical scroll. Only sets private variable without grid
 * refreshing.
 *
 * <pre>
 * Arguments format:
 * {
 *   rowId: [number, optional] zero-based row id
 *   row: [object, optional] row object
 * }
 *
 * Only one of <i>rowId</i> and <i>row</i> properties should be defined.
 * </pre>
 *
 * @param {object} oArg Arguments
 */
Zapatec.Grid.prototype.setCurrentVerticalOffset = function(oArg) {
	// Get row id
	var iRowId;
	if (typeof oArg == 'number') {
		// For backwar compatibility with previous versions where this function
		// accepted single numeric argument
		iRowId = oArg;
	} else {
		if (!oArg) {
			return;
		}
		iRowId = oArg.rowId;
		if (typeof iRowId != 'number') {
			iRowId = this.getRowId(oArg.row);
			if (typeof iRowId != 'number') {
				return;
			}
		}
	}
	// Fix offset
	if (iRowId < 0) {
		iRowId = 0;
	}
	// Certain number of rows must be always visible
	var iRows = this.recordsDisplayed() - 1;
	if (iRowId > iRows) {
		iRowId = iRows;
	}
	// Set offset
	this.currentVerticalOffset = iRowId;
};

/**
 * Scrolls grid to the specified row.
 *
 * <pre>
 * Arguments format:
 * {
 *   rowId: [number, optional] zero-based row id
 *   row: [object, optional] row object
 * }
 *
 * Only one of <i>rowId</i> and <i>row</i> properties should be defined.
 * </pre>
 *
 * @param {object} oArg Arguments
 */
Zapatec.Grid.prototype.gotoVerticalOffset = function(oArg) {
	// Set current offset
	this.setCurrentVerticalOffset(oArg);
	// Refresh grid
	if (this.config.dataOnDemand) {
		// Get page from server
		this.loadData();
	} else {
		// Redraw grid
		this.refresh();
	}
};

/**
 * Sets current horizontal scroll. Only sets private variable without grid
 * refreshing.
 *
 * <pre>
 * Arguments format:
 * {
 *   fieldId: [number, optional] zero-based field (column) id,
 *   field: [object, optional] field object
 * }
 *
 * Only one of <i>fieldId</i> and <i>field</i> properties should be defined.
 * </pre>
 *
 * @param {object} oArg Arguments
 */
Zapatec.Grid.prototype.setCurrentHorizontalOffset = function(oArg) {
	// Get field id
	var iFieldId;
	if (typeof oArg == 'number') {
		// For backwar compatibility with previous versions where this function
		// accepted single numeric argument
		iFieldId = oArg;
	} else {
		if (!oArg) {
			return;
		}
		iFieldId = oArg.fieldId;
		if (typeof iFieldId != 'number') {
			iFieldId = this.getFieldId(oArg.field);
			if (typeof iFieldId != 'number') {
				return;
			}
		}
	}
	// Set offset
	if (this.fields[iFieldId]) {
		this.currentHorizontalOffset = iFieldId;
	}
};

/**
 * Scrolls grid to the specified column.
 *
 * <pre>
 * Arguments format:
 * {
 *   fieldId: [number, optional] zero-based field (column) id,
 *   field: [object, optional] field object
 * }
 *
 * Only one of <i>fieldId</i> and <i>field</i> properties should be defined.
 * </pre>
 *
 * @param {object} oArg Arguments
 */
Zapatec.Grid.prototype.gotoHorizontalOffset = function(oArg) {
	// Set current offset
	this.setCurrentHorizontalOffset(oArg);
	// Refresh grid
	if (this.config.dataOnDemand) {
		// Get page from server
		this.loadData();
	} else {
		// Redraw grid
		this.refresh();
	}
};

/**
 * Displays page with specified row.
 *
 * @param {number} iRowId Row id
 */
Zapatec.Grid.prototype.gotoRowId = function(iRowId) {
	// Get row number
	var aRows = this.getFilteredRows();
	for (var iRow = 0; iRow < aRows.length; iRow++) {
		if (this.getRowId(aRows[iRow]) == iRowId) {
			// Go to the page
			this.gotoPage(Math.floor(iRow / this.config.rowsPerPage));
			return;
		}
	}
};

/**
 * Applies filters to the grid.
 * @private
 */
Zapatec.Grid.prototype.applyFilters = function() {
	// Fire event
	this.fireEvent('gridPrepareFilter');
	// Check if data is filtered on server
	if (this.config.dataOnDemand) {
		// Go to the first page
		this.setCurrentPage(0);
		// Filter on server
		this.loadData();
		// Fire event
		this.fireEvent('gridFiltered');
	} else {
		// Display "Updating"
		if (this.displayUpdating) {
			this.displayUpdating();
		}
		// Set filters
		var oGrid = this;
		// Timeout to let browser display "Updating"
		setTimeout(function() {
			oGrid.setFilters();
			// Fire event
			oGrid.fireEvent('gridFiltered');
		}, 0);
	}
};

/**
 * Sets filters to the array of rows.
 * @private
 */
Zapatec.Grid.prototype.setFilters = function() {
	// Duplicate rows array
	this.filteredRows = this.rows.slice();
	var aFilteredRows = this.filteredRows;
	// Columns having regexp filter set
	var aRegexpFilters = [];
	// Columns having text filter set
	var aTextFilters = [];
	// Iterate over columns
	var aFields = this.fields;
	var iFields = aFields.length;
	var iCol, oField, aHiddenValues, minValue, maxValue, iRow, oCell;
	for (iCol = 0; iCol < iFields; iCol++) {
		oField = aFields[iCol];
		if (!oField) {
			continue;
		}
		// Apply filters
		aHiddenValues = oField.hiddenValues;
		minValue = oField.minValue;
		maxValue = oField.maxValue;
		if (aHiddenValues instanceof Array || typeof minValue != 'undefined' ||
		 typeof maxValue != 'undefined') {
			// Iterate over rows
			for (iRow = aFilteredRows.length - 1; iRow >= 0; iRow--) {
				// Get cell
				oCell = aFilteredRows[iRow].cells[iCol];
				if (!oCell) {
					continue;
				}
				// Remove row if value of the cell is hidden
				if (aHiddenValues instanceof Array &&
				 Zapatec.Utils.arrIndexOf(aHiddenValues,
				 this.getCellValueString(oCell)) >= 0) {
					aFilteredRows.splice(iRow, 1);
					continue;
				}
				// Remove row if value of the cell is lesser than min value
				if (minValue > this.getCellValueCompare(oCell)) {
					aFilteredRows.splice(iRow, 1);
					continue;
				}
				// Remove row if value of the cell is greater than max value
				if (maxValue < this.getCellValueCompare(oCell)) {
					aFilteredRows.splice(iRow, 1);
					continue;
				}
			}
		}
		// Check regexp filter
		if (oField.regexpFilter) {
			aRegexpFilters.push(iCol);
		}
		// Check text filter
		if (oField.textFilter) {
			aTextFilters.push(iCol);
		}
	}
	// Apply regexp filters
	var bRemove, iFilter, sSearchValue, oRegExp;
	var iRegexpFilters = aRegexpFilters.length;
	if (iRegexpFilters) {
		// Iterate over rows
		for (iRow = aFilteredRows.length - 1; iRow >= 0; iRow--) {
			// Indicates that row should be removed
			bRemove = true;
			// Iterate over filters
			for (iFilter = 0; iFilter < iRegexpFilters; iFilter++) {
				// Column number
				iCol = aRegexpFilters[iFilter];
				// Get field
				oField = aFields[iCol];
				// Get cell
				oCell = aFilteredRows[iRow].cells[iCol];
				if (!oCell) {
					continue;
				}
				// Get cell value
				sSearchValue = this.getCellValueString(oCell);
				sSearchValue = sSearchValue.replace(/<[^>]*>/g, '');
				// Search text fragment
				oRegExp =
				 typeof oField.regexpFilter == 'string' ?
				 new RegExp(oField.regexpFilter) :
				 oField.regexpFilter;
				if (oRegExp.test && oRegExp.test(sSearchValue)) {
					bRemove = false;
					break;
				}
			}
			// Remove row if text fragment not found
			if (bRemove) {
				aFilteredRows.splice(iRow, 1);
			}
		}
	}
	// Apply text filters
	var iTextFilters = aTextFilters.length;
	if (iTextFilters) {
		// Iterate over rows
		for (iRow = aFilteredRows.length - 1; iRow >= 0; iRow--) {
			// Indicates that row should be removed
			bRemove = true;
			// Iterate over filters
			for (iFilter = 0; iFilter < iTextFilters; iFilter++) {
				// Column number
				iCol = aTextFilters[iFilter];
				// Get field
				oField = aFields[iCol];
				// Get cell
				oCell = aFilteredRows[iRow].cells[iCol];
				if (!oCell) {
					continue;
				}
				// Search text fragment
				if (this.searchCell({
						cell: oCell,
						searchValue: oField.textFilter
					}) >= 0) {
					bRemove = false;
					break;
				}
			}
			// Remove row if text fragment was not found
			if (bRemove) {
				aFilteredRows.splice(iRow, 1);
			}
		}
	}
	// Sort if needed
	this.sort();
	// Go to the first page
	this.setCurrentPage(0);
	// Redraw grid
	this.refresh();
};

/**
 * Searches specified value in the specified cell.
 *
 * <pre>
 * Arguments format:
 * {
 *   cell: [object] cell object,
 *   searchValue: [string] value to search for
 * }
 * </pre>
 *
 * @private
 * @param {object} oArg Arguments
 * @return The index within the cell string representation of the first
 * occurrence of the specified value, or -1 if the value is not found, or
 * undefined in case of invalid arguments
 * @type number
 */
Zapatec.Grid.prototype.searchCell = function(oArg) {
	if (!oArg) {
		return;
	}
	var oCell = oArg.cell;
	// Search text fragment
	if (typeof this.getSearchByType == 'function') {
		// Try to use specific search method
		var oField = this.getFieldByCell(oCell);
		if (!oField) {
			return;
		}
		var sSearchFunc = this.getSearchByType(oField.dataType);
		if (sSearchFunc) {
			return this[sSearchFunc](oArg);
		}
	}
	// Default
	// Get string to search in
	var sText = this.getCellValueString(oCell);
	// Remove HTML tags
	sText = sText.replace(/<[^>]*>/g, '');
	// Search
	return sText.indexOf(oArg.searchValue);
};

/**
 * Filters out rows with the specified value in the specified column or set
 * of columns.
 *
 * <pre>
 * Arguments format:
 * {
 *   column: [object or number] array of zero-based column numbers or single
 *    zero-based column number to filter,
 *   value: [object or string] array of values or single value to filter out,
 *   show: [boolean] show rows having this value or not
 * }
 * </pre>
 *
 * @param {object} oArg Arguments
 */
Zapatec.Grid.prototype.filterOut = function(oArg) {
	// Filter out columns
	if (this.filterOutColumn(oArg)) {
		// Apply filters
		this.applyFilters();
	}
};

/**
 * Filters out rows with the specified value in the specified columns. Only sets
 * a hidden value without applying it to the grid.
 *
 * <pre>
 * Argument object format:
 *
 * {
 *   column: [object or number] array of zero-based column numbers or single
 *    zero-based column number to filter,
 *   value: [object or string] array of values or single value to filter out,
 *   show: [boolean] show rows having this value or not
 * }
 * </pre>
 *
 * @private
 * @param {object} oArg Argument object
 * @return True if the hidden values were set
 * @type boolean
 */
Zapatec.Grid.prototype.filterOutColumn = function(oArg) {
	// Check arguments
	if (!oArg || typeof oArg.value == 'undefined') {
		// Error
		return false;
	}
	var aVals = oArg.value;
	if (!(aVals instanceof Array)) {
		aVals = [aVals];
	}
	var aCols = oArg.column;
	if (!(aCols instanceof Array)) {
		aCols = [aCols];
	}
	// Will indicate that hidden values are set
	var bApply = false;
	// Filter out columns
	for (var iCol = 0; iCol < aCols.length; iCol++) {
		// Get column
		var oField = this.fields[aCols[iCol]];
		if (!oField) {
			continue;
		}
		// Setup hidden values
		if (!(oField.hiddenValues instanceof Array)) {
			oField.hiddenValues = [];
		}
		if (oArg.show) {
			// Remove from hiddenValues
			for (var iVal = 0; iVal < aVals.length; iVal++) {
				for (var iHv = oField.hiddenValues.length - 1; iHv >= 0; iHv--) {
					if (oField.hiddenValues[iHv] == aVals[iVal]) {
						oField.hiddenValues.splice(iHv, 1);
					}
				}
			}
		} else {
			// Add to hiddenValues
			for (var iVal = 0; iVal < aVals.length; iVal++) {
				oField.hiddenValues.push(aVals[iVal]);
			}
		}
		bApply = true;
	}
	return bApply;
};

/**
 * Removes all hidden values from the specified columns.
 *
 * <pre>
 * Argument object format:
 *
 * {
 *   column: [object or number] array of zero-based column numbers or single
 *    zero-based column number to remove hidden values from
 * }
 * </pre>
 *
 * @param {object} oArg Argument object
 */
Zapatec.Grid.prototype.unfilterOut = function(oArg) {
	// Reset hidden values
	if (this.unfilterOutColumn(oArg)) {
		// Apply filters
		this.applyFilters();
	}
};

/**
 * Removes all hidden values from the specified columns. Only resets hidden
 * values without applying them to the grid.
 *
 * <pre>
 * Argument object format:
 *
 * {
 *   column: [object or number] array of zero-based column numbers or single
 *    zero-based column number to remove hidden values from
 * }
 * </pre>
 *
 * @private
 * @param {object} oArg Argument object
 * @return True if hidden values were reset and must be applied to the grid
 * @type boolean
 */
Zapatec.Grid.prototype.unfilterOutColumn = function(oArg) {
	// Check arguments
	if (!oArg) {
		// Error
		return false;
	}
	var aCols = oArg.column;
	if (!(aCols instanceof Array)) {
		aCols = [aCols];
	}
	// Will indicate that hidden values were reset
	var bApply = false;
	// Reset hidden values
	var undef;
	for (var iCol = 0; iCol < aCols.length; iCol++) {
		// Get field
		var oField = this.fields[aCols[iCol]];
		if (!oField) {
			continue;
		}
		if ((oField.hiddenValues instanceof Array) &&
		 oField.hiddenValues.length) {
			oField.hiddenValues = undef;
			bApply = true;
		}
	}
	return bApply;
};

/**
 * Limits range of values of the specified column.
 *
 * <pre>
 * Argument object format:
 *
 * {
 *   column: [number] zero-based number of column to filter,
 *   min [any, optional] minimum cell value to compare,
 *   minValue [any, optional] minimum cell value,
 *   max [any, optional] mamximum cell value to compare,
 *   maxValue [any, optional] mamximum cell value
 * }
 *
 * If <b>min</b> property is defined, <b>minValue</b> is ignored.
 * If <b>max</b> property is defined, <b>maxValue</b> is ignored.
 * </pre>
 *
 * @param {object} oArg Argument object
 */
Zapatec.Grid.prototype.limitRange = function(oArg) {
	// Check arguments
	if (!oArg) {
		return;
	}
	// Get column
	var oField = this.fields[oArg.column];
	if (!oField) {
		return;
	}
	// Setup min value
	if (typeof oArg.min != 'undefined') {
		oField.minValue = oArg.min;
	} else {
		if (typeof oArg.minValue == 'undefined') {
			oField.minValue = oArg.minValue;
		} else {
			// Get compare value
			var oCell = {
				i: oField.i,
				v: oArg.minValue
			};
			oCell = this.convertCell(oCell);
			oField.minValue = this.getCellValueCompare(oCell);
		}
	}
	// Setup max value
	if (typeof oArg.max != 'undefined') {
		oField.maxValue = oArg.max;
	} else {
		if (typeof oArg.maxValue == 'undefined') {
			oField.maxValue = oArg.maxValue;
		} else {
			// Get compare value
			var oCell = {
				i: oField.i,
				v: oArg.maxValue
			};
			oCell = this.convertCell(oCell);
			oField.maxValue = this.getCellValueCompare(oCell);
		}
	}
	// Apply filters
	this.applyFilters();
};

/**
 * Limits the result set by doing a search. Only rows having specified text
 * fragment will be shown. JavaScript regular expression can be used instead or
 * in addition to the text fragment. If you use both regexp and text, regexp is
 * applied first.
 *
 * <pre>
 * Argument object format:
 * {
 *   regexp: [object or string, optional] RegExp object or regular expression
 *    string to match,
 *   text: [string, optional] text fragment to search,
 *   columns: [object, optional] array with zero-based column numbers to search
 *    (by default all columns are searched)
 * }
 * </pre>
 *
 * @param {object} oArg Argument object
 */
Zapatec.Grid.prototype.setFilter = function(oArg) {
	// Check arguments
	if (!oArg) {
		oArg = {};
	}
	// Set text filter
	var aFields = this.fields;
	var aColumns = oArg.columns;
	var oRegExp = oArg.regexp;
	var sText = oArg.text;
	var iCol, oField;
	if (aColumns instanceof Array) {
		var iColumns = aColumns.length;
		for (iCol = 0; iCol < iColumns; iCol++) {
			oField = aFields[aColumns[iCol]];
			if (oField) {
				oField.regexpFilter = oRegExp;
				oField.textFilter = sText;
			}
		}
	} else {
		var iFields = aFields.length;
		for (iCol = 0; iCol < iFields; iCol++) {
			oField = aFields[iCol];
			if (!(oField instanceof Object)) {
				aFields[iCol] = {};
				oField = aFields[iCol];
			}
			oField.regexpFilter = oRegExp;
			oField.textFilter = sText;
		}
	}
	// Apply filters
	this.applyFilters();
};

/**
 * Removes filter from the specified columns.
 *
 * <pre>
 * Argument object format:
 *
 * {
 *   columns: [object, optional] array with column numbers to remove filter from
 * }
 *
 * If oArg or columns are not defined or empty, filter is removed from all
 * columns.
 * </pre>
 *
 * @param {object} oArg Optional. Argument object
 */
Zapatec.Grid.prototype.removeFilter = function(oArg) {
	// Check arguments
	if (!oArg) {
		oArg = {};
	}
	// Remove text filter
	this.setFilter({
		columns: oArg.columns
	});
};

/**
 * Resets all filterouts, ranges and text filters.
 */
Zapatec.Grid.prototype.resetFilters = function() {
	// Remove filters
	for (var iCol = 0; iCol < this.fields.length; iCol++) {
		var oField = this.fields[iCol];
		if (oField) {
			var undef;
			// Remove filterout
			oField.hiddenValues = undef;
			// Remove range
			oField.minValue = undef;
			oField.maxValue = undef;
			// Remove regexp filter
			oField.regexpFilter = undef;
			// Remove text filter
			oField.textFilter = undef;
		}
	}
	// Apply filters
	this.applyFilters();
	// Display filter out forms
	this.displayFilterOut();
};

/**
 * Returns array of rows that are or must be (depending on context) displayed
 * on the current page.
 *
 * @return Array of rows on the current page
 * @type object
 */
Zapatec.Grid.prototype.applyPaging = function() {
	var oConfig = this.config;
	var aFilteredRows = this.filteredRows;
	if (this.currentVerticalOffset < 0) {
		this.currentVerticalOffset = 0;
	}
	var iOffset = this.currentVerticalOffset;
	var iVisibleRows = oConfig.visibleRows;
	var iRowsPerPage = oConfig.rowsPerPage;
	if (iRowsPerPage <= 0 || oConfig.dataOnDemand) {
		// No pagination
		if (iVisibleRows <= 0) {
			// No scrolling
			return aFilteredRows;
		}
		// Scrolling
		return aFilteredRows.slice(iOffset, iOffset + iVisibleRows);
	}
	if (this.fitInto) {
		// Autoresizing
		var oAutoresizeFrame = this.autoresizeFrame;
		var iFirst = oAutoresizeFrame.currentRow;
		var iLast = iFirst + oAutoresizeFrame.visibleRows;
		return aFilteredRows.slice(iFirst, iLast);
	}
	// Get frame
	var iFirst = this.currentPage * iRowsPerPage;
	if (iFirst && iFirst >= aFilteredRows.length) {
		this.setCurrentPage(this.currentPage - 1);
		iFirst = this.currentPage * iRowsPerPage;
	}
	var iLast = iFirst + iRowsPerPage;
	// No scrolling
	if (iVisibleRows <= 0) {
		return aFilteredRows.slice(iFirst, iLast);
	}
	// Scrolling
	iFirst += iOffset;
	var iLastVisible = iFirst + iVisibleRows;
	if (iLastVisible < iLast) {
		iLast = iLastVisible;
	}
	return aFilteredRows.slice(iFirst, iLast);
};

/**
 * Refreshes grid after sorting or filtering. Note: After modification of data
 * like splice or query, use {@link Zapatec.Grid.modify} method instead to
 * update filters properly.
 *
 * <pre>
 * Defines internal property <b>refreshState</b>.
 * </pre>
 */
Zapatec.Grid.prototype.refresh = function() {
	// Fire event
	this.fireEvent('gridPrepareRefresh');
	// Indicates number of running refresh processes
	if (!this.refreshState) {
		this.refreshState = 0;
	}
	this.refreshState++;
	// Refresh grid
	if (!this.config.visibleRows && this.displayUpdating) {
		this.displayUpdating();
	}
	var oGrid = this;
	// Timeout to let browser display "Updating"
	setTimeout(function() {
		if (!oGrid.visualize) {
			oGrid.refreshCallback();
		} else if (oGrid.refreshContainer) {
			oGrid.refreshContainer();
		}
	}, 0);
};

/**
 * Displays grid using callback functions.
 *
 * <pre>
 * callbackHeaderDisplay function called to display header row.
 *
 * If callbackRowDisplay is defined, it is called to display data rows.
 *
 * If callbackDataDisplay is defined, it is called to display data instead of
 * callbackRowDisplay (callbackRowDisplay is ignored in this case).
 *
 * If callbackTotalDisplay is defined, it is called to display total rows.
 *
 * If callbackTotalsDisplay is defined, it is called to display totals instead
 * of callbackTotalDisplay (callbackTotalDisplay is ignored in this case).
 *
 * If callbackPaginationDisplay is defined, it is called to display pagination.
 * </pre>
 *
 * @private
 */
Zapatec.Grid.prototype.refreshCallback = function() {
	// Display header
	this.config.callbackHeaderDisplay(this);
	// Get rows to display
	var aRows = this.applyPaging();
	// Display rows
	if (typeof this.config.callbackDataDisplay == 'function') {
		this.config.callbackDataDisplay(this, aRows);
	} else {
		for (var iRow = 0; iRow < aRows.length; iRow++) {
			this.config.callbackRowDisplay(this, aRows[iRow]);
		}
	}
	// Display totals
	if (typeof this.config.callbackTotalsDisplay == 'function' ||
	 typeof this.config.callbackTotalDisplay == 'function') {
		// Get totals
		var aTotals;
		if (this.getTotals) {
			aTotals = this.getTotals();
		}
		// Display totals
		if (typeof this.config.callbackTotalsDisplay == 'function') {
			this.config.callbackTotalsDisplay(this, aTotals);
		} else if (aTotals) {
			var iTotals = aTotals.length;
			for (var iRow = 0; iRow < iTotals; iRow++) {
				this.config.callbackTotalDisplay(this, aTotals[iRow]);
			}
		}
	}
	// Display pagination
	if (this.config.rowsPerPage > 0) {
		if (typeof this.config.callbackPaginationDisplay == 'function') {
			// Using callback
			this.config.callbackPaginationDisplay(this);
		} else if (this.paginationContainers.length && this.outputPagination) {
			// Using container
			for (var iEl = 0; iEl < this.paginationContainers.length; iEl++) {
				var aHtml = [];
				this.outputPagination(aHtml, iEl + 1);
				this.paginationContainers[iEl].innerHTML = aHtml.join('');
			}
		}
	}
	// Finish refresh
	this.onRefresh();
};

/**
 * Selects a row. If callbackCellSelect is not defined, calls callbackRowSelect
 * function.
 *
 * @private
 * @param {object} oRow Row object
 */
Zapatec.Grid.prototype.selectRow = function(oRow) {
	// Check arguments
	if (!oRow || oRow.selected) {
		return;
	}
	// Select callback
	if (typeof this.config.callbackCellSelect != 'function' &&
	 typeof this.config.callbackRowSelect == 'function') {
		this.config.callbackRowSelect(this, oRow);
	}
	// Display updates if we are responsible for visualisation
	if (this.visualizeSelectRow && this.config.selectRows && this.visualize) {
		this.visualizeSelectRow(oRow);
	}
	// Select row
	oRow.selected = true;
};

/**
 * Unselects a row. If callbackCellUnselect is not defined, calls
 * callbackRowUnselect function.
 *
 * @private
 * @param {object} oRow Row object
 */
Zapatec.Grid.prototype.unselectRow = function(oRow) {
	// Check arguments
	if (!oRow || !oRow.selected) {
		return;
	}
	// Unselect row
	var undef;
	oRow.selected = undef;
	// Display updates if we are responsible for visualisation
	if (this.visualizeUnselectRow && this.config.selectRows && this.visualize) {
		this.visualizeUnselectRow(oRow);
	}
	// Unselect callback
	if (typeof this.config.callbackCellUnselect != 'function' &&
	 typeof this.config.callbackRowUnselect == 'function') {
		this.config.callbackRowUnselect(this, oRow);
	}
};

/**
 * Selects a cell. Calls callbackCellSelect function.
 *
 * @private
 * @param {object} oCell Cell object
 */
Zapatec.Grid.prototype.selectCell = function(oCell) {
	// Check arguments
	if (!oCell || oCell.selected) {
		return;
	}
	// Select callback
	if (typeof this.config.callbackCellSelect == 'function') {
		this.config.callbackCellSelect(this, oCell);
	}
	// Display updates if we are responsible for visualisation
	if (this.visualizeSelectCell && this.config.selectCells && this.visualize) {
		this.visualizeSelectCell(oCell);
	}
	// Select cell
	oCell.selected = true;
};

/**
 * Unselects a cell. Calls callbackCellUnselect function.
 *
 * @private
 * @param {object} oCell Cell object
 */
Zapatec.Grid.prototype.unselectCell = function(oCell) {
	// Check arguments
	if (!oCell || !oCell.selected) {
		return;
	}
	// Unselect cell
	var undef;
	oCell.selected = undef;
	// Display updates if we are responsible for visualisation
	if (this.visualizeUnselectCell && this.config.selectCells && this.visualize) {
		this.visualizeUnselectCell(oCell);
	}
	// Unselect callback
	if (typeof this.config.callbackCellUnselect == 'function') {
		this.config.callbackCellUnselect(this, oCell);
	}
};

/**
 * Selects clicked row. Supports multiple selections with "Shift" and "Ctrl"
 * clicking. Calls callbackCellOnClick function. If callbackCellOnClick is not
 * defined, calls callbackRowOnClick function.
 *
 * @private
 * @param {number} iRowId Id of row that was clicked
 * @param {number} iCellId Optional. Id of cell that was clicked
 */
Zapatec.Grid.prototype.rowOnClick = function(iRowId, iCellId) {
	// Get clicked row and cell
	var oRow = this.getRowById(iRowId);
	if (!oRow) {
		return;
	}
	var oCell = null;
	if (typeof iCellId != 'undefined') {
		oCell = this.getCellById(iRowId, iCellId);
		if (!oCell) {
			return;
		}
	}
	// Process Alt + click in Opera as right click because it doesn't allow to
	// turn off context menu programmatically
	// Process Meta + click in Safary as right click because it doesn't support
	// right click
	var oEvent = window.event;
	if (oEvent.metaKey || (window.opera && oEvent.altKey)) {
		return;
	}
	// Get modifiers
	var bShift = false;
	var bCtrl = false;
	if (this.config.multipleSelect) {
		// There should be at least one item selected to use "Shift"
		if (this.lastSelection) {
			bShift = oEvent.shiftKey;
		}
		// metaKey for Safari
		bCtrl = oEvent.ctrlKey || oEvent.metaKey;
	}
	// Unselect rows and cells
	if (!bShift && !bCtrl) {
		// Unselect all rows except clicked if "Shift" or "Ctrl" is not holded
		for (var iRow = 0; iRow < this.rows.length; iRow++) {
			var oCurrRow = this.rows[iRow];
			if (!oCurrRow || !oCurrRow.selected) {
				continue;
			}
			// Unselect all cells except clicked
			if (oCell) {
				for (var iCol = 0; iCol < this.fields.length; iCol++) {
					var oCurrCell = oCurrRow.cells[iCol];
					if (!oCurrCell) {
						continue;
					}
					if (!(oCurrRow.i == iRowId &&
					 oCurrCell.i == iCellId)) {
						// Unselect cell
						this.unselectCell(oCurrCell);
					}
				}
			}
			// Unselect row
			if (oCurrRow.i != iRowId) {
				this.unselectRow(oCurrRow);
			}
		}
	} else if (bShift) {
		// Unselect previous multiple selection
		// Unselect rows
		if (this.lastSelection.rows instanceof Array) {
			for (var iRow = 0; iRow < this.lastSelection.rows.length; iRow++) {
				this.unselectRow(this.lastSelection.rows[iRow]);
			}
		}
		// Unselect cells
		if (this.lastSelection.cells instanceof Array) {
			for (var iCell = 0; iCell < this.lastSelection.cells.length; iCell++) {
				this.unselectCell(this.lastSelection.cells[iCell]);
			}
		}
	}
	// OnClick callback
	if (oCell && typeof this.config.callbackCellOnClick == 'function') {
		this.config.callbackCellOnClick(this, oCell);
	} else if (typeof this.config.callbackRowOnClick == 'function') {
		this.config.callbackRowOnClick(this, oRow);
	}
	// Select rows and cells
	if (!bShift) {
		// Select row
		this.selectRow(oRow);
		this.lastSelection = {
			rowId: iRowId
		};
		// Select cell
		if (oCell) {
			this.selectCell(oCell);
			this.lastSelection.cellId = iCellId;
		}
	} else {
		// Multiple selection
		var iSelectionStartRowId = this.lastSelection.rowId;
		var iSelectionStartCellId = this.lastSelection.cellId;
		this.lastSelection.rows = [];
		this.lastSelection.cells = [];
		var aSelectedRows = this.lastSelection.rows;
		var aSelectedCells = this.lastSelection.cells;
		// Get first and last row of the selection
		var iRow = 0;
		var iLastRow = 0;
		while (this.filteredRows[iRow]) {
			var iCurrRowId = this.filteredRows[iRow].i;
			if (iCurrRowId == iRowId) {
				iLastRow = iSelectionStartRowId;
				break;
			} else if (iCurrRowId == iSelectionStartRowId) {
				iLastRow = iRowId;
				break;
			}
			iRow++;
		}
		// Get first and last cell of the selection
		var iFirstCell = 0;
		var iLastCell = 0;
		if (oCell && typeof iSelectionStartCellId != 'undefined') {
			if (iCellId < iSelectionStartCellId) {
				iFirstCell = iCellId;
				iLastCell = iSelectionStartCellId;
			} else {
				iFirstCell = iSelectionStartCellId;
				iLastCell = iCellId;
			}
		}
		// Select rows and cells
		while (this.filteredRows[iRow]) {
			var oCurrRow = this.filteredRows[iRow];
			// Select row
			if (!oCurrRow.selected) {
				this.selectRow(oCurrRow);
				aSelectedRows.push(oCurrRow);
			}
			// Select cells
			if (oCell) {
				for (var iCell = iFirstCell; iCell <= iLastCell; iCell++) {
					var oCurrCell = oCurrRow.cells[iCell];
					// Select cell
					if (!oCurrCell.selected) {
						this.selectCell(oCurrCell);
						aSelectedCells.push(oCurrCell);
					}
				}
			}
			if (oCurrRow.i == iLastRow) {
				// Last row in the selection
				break;
			}
			iRow++;
		}
	}
};

/**
 * Handles click on the row.
 *
 * @private
 * @param {number} iGridId Id of the grid
 * @param {number} iRowId Id of row that was clicked
 * @param {number} iCellId Optional. Id of cell that was clicked
 */
Zapatec.Grid.rowOnClick = function(iGridId, iRowId, iCellId) {
	// Get grid object
	var oGrid = Zapatec.Widget.getWidgetById(iGridId);
	if (oGrid && oGrid.rowOnClick) {
		// Call method
		oGrid.rowOnClick(iRowId, iCellId);
	}
};

/**
 * Calls callbackCellOnDblClick function. If callbackCellOnDblClick is not
 * defined, calls callbackRowOnDblClick function.
 *
 * @private
 * @param {number} iRowId Id of row that was clicked
 * @param {number} iCellId Optional. Id of cell that was clicked
 */
Zapatec.Grid.prototype.rowOnDblClick = function(iRowId, iCellId) {
	// Get double clicked row and cell
	var oRow = this.getRowById(iRowId);
	if (!oRow) {
		return;
	}
	var oCell = null;
	if (typeof iCellId != 'undefined') {
		oCell = this.getCellById(iRowId, iCellId);
		if (!oCell) {
			return;
		}
	}
	// OnDblClick callback
	if (oCell && typeof this.config.callbackCellOnDblClick == 'function') {
		this.config.callbackCellOnDblClick(this, oCell);
	} else if (typeof this.config.callbackRowOnDblClick == 'function') {
		this.config.callbackRowOnDblClick(this, oRow);
	}
};

/**
 * Handles double click on the row.
 *
 * @private
 * @param {number} iGridId Id of the grid
 * @param {number} iRowId Id of row that was clicked
 * @param {number} iCellId Optional. Id of cell that was clicked
 */
Zapatec.Grid.rowOnDblClick = function(iGridId, iRowId, iCellId) {
	// Get grid object
	var oGrid = Zapatec.Widget.getWidgetById(iGridId);
	if (oGrid && oGrid.rowOnDblClick) {
		// Call method
		oGrid.rowOnDblClick(iRowId, iCellId);
	}
};

/**
 * Unselects all selected rows and cells.
 */
Zapatec.Grid.prototype.clearSelection = function() {
	// Unselect all rows
	for (var iRow = 0; iRow < this.rows.length; iRow++) {
		var oCurrRow = this.rows[iRow];
		if (oCurrRow.selected) {
			// Unselect all cells
			for (var iCol = 0; iCol < oCurrRow.cells.length; iCol++) {
				this.unselectCell(oCurrRow.cells[iCol]);
			}
			// Unselect row
			this.unselectRow(oCurrRow);
		}
	}
};

/**
 * Returns selected rows in an array.
 *
 * @return Array of row objects
 * @type object
 */
Zapatec.Grid.prototype.getSelectedRows = function() {
	var aSelected = [];
	for (var iRow = 0; iRow < this.rows.length; iRow++) {
		var oCurrRow = this.rows[iRow];
		if (oCurrRow.selected) {
			aSelected.push(oCurrRow);
		}
	}
	return aSelected;
};

/**
 * Returns selected cells in an array.
 *
 * @return Array of cell objects
 * @type object
 */
Zapatec.Grid.prototype.getSelectedCells = function() {
	var aSelected = [];
	for (var iRow = 0; iRow < this.rows.length; iRow++) {
		var oCurrRow = this.rows[iRow];
		if (oCurrRow.selected) {
			for (var iCol = 0; iCol < this.fields.length; iCol++) {
				var oCurrCell = oCurrRow.cells[iCol];
				if (oCurrCell.selected) {
					aSelected.push(oCurrCell);
				}
			}
		}
	}
	return aSelected;
};

/**
 * Returns rows with cells having invalid value in an array.
 *
 * @return Array of row objects
 * @type object
 */
Zapatec.Grid.prototype.getInvalidRows = function() {
	var aInvalid = [];
	for (var iRow = 0; iRow < this.rows.length; iRow++) {
		var oCurrRow = this.rows[iRow];
		if (oCurrRow.invalid) {
			aInvalid.push(oCurrRow);
		}
	}
	return aInvalid;
};

/**
 * Returns cells having invalid value in an array.
 *
 * @return Array of cell objects
 * @type object
 */
Zapatec.Grid.prototype.getInvalidCells = function() {
	var aInvalid = [];
	for (var iRow = 0; iRow < this.rows.length; iRow++) {
		var oCurrRow = this.rows[iRow];
		if (oCurrRow.invalid) {
			for (var iCol = 0; iCol < this.fields.length; iCol++) {
				var oCurrCell = oCurrRow.cells[iCol];
				if (oCurrCell.invalid) {
					aInvalid.push(oCurrCell);
				}
			}
		}
	}
	return aInvalid;
};

/**
 * Handles the click on filter out checkbox. Filters out rows if checkbox is
 * unchecked. Shows rows if checkbox is checked.
 *
 * @private
 * @param {string} iGridId Grid id
 * @param {object} aCols Array of zero-based column numbers or single zero
 * based column number to filter
 * @param {string} sVal Value to filter out
 * @param {boolean} bChecked Show rows having this value or not
 */
Zapatec.Grid.checkboxOnClick = function(iGridId, aCols, sVal, bChecked) {
	// Get grid object
	var oGrid = Zapatec.Widget.getWidgetById(iGridId);
	if (oGrid && oGrid.filterOut) {
		// Filter out grid
		oGrid.filterOut({
			column: aCols,
			value: sVal,
			show: bChecked
		});
	}
};

/**
 * Handles the click on "Select all" link inside filter out form. Removes all
 * hidden values from the specified columns.
 *
 * @private
 * @param {string} iGridId Grid id
 * @param {object} aCols Array of zero-based column numbers or single zero
 * based column number to remove hidden values from
 */
Zapatec.Grid.checkboxSelectAllOnClick = function(iGridId, aCols) {
	// Get grid object
	var oGrid = Zapatec.Widget.getWidgetById(iGridId);
	if (!oGrid || !oGrid.unfilterOutColumn || !oGrid.applyFilters ||
	 !oGrid.displayFilterOut) {
		return
	}
	// Remove hidden values
	var bApply = oGrid.unfilterOutColumn({
		column: aCols
	});
	// Apply filters
	if (bApply) {
		oGrid.applyFilters();
		// Refresh filter out forms
		oGrid.displayFilterOut();
	}
};

/**
 * Handles the click on "Clear all" link inside filter out form. Hides rows by
 * making all values of the specified columns hidden.
 *
 * @private
 * @param {string} iGridId Grid id
 * @param {object} aCols Array of zero-based column numbers or single zero
 * based column number to filter
 */
Zapatec.Grid.checkboxClearAllOnClick = function(iGridId, aCols) {
	// Get grid object
	var oGrid = Zapatec.Widget.getWidgetById(iGridId);
	if (!oGrid || !oGrid.getColumnRange || !oGrid.filterOutColumn ||
	 !oGrid.applyFilters || !oGrid.displayFilterOut) {
		return;
	}
	// Get column range
	var oRange = oGrid.getColumnRange({
		column: aCols
	});
	if (!oRange) {
		return;
	}
	// Get unique values
	var aVals = [];
	for (var iVal = 0; iVal < oRange.values.length; iVal++) {
		aVals.push(oRange.values[iVal].v + '');
	}
	// Filter out grid
	var bApply = oGrid.filterOutColumn({
		column: aCols,
		value: aVals,
		show: false
	});
	// Apply filters
	if (bApply) {
		oGrid.applyFilters();
		// Refresh filter out forms
		oGrid.displayFilterOut();
	}
};

/**
 * Handles the click on filter out link. Filters out all rows that don't have
 * specified value in the specified columns.
 *
 * @private
 * @param {string} iGridId Grid id
 * @param {object} aCols Array of zero-based column numbers or single zero
 * based column number to filter
 * @param {string} sVal Selected value to show
 */
Zapatec.Grid.checkboxLinkOnClick = function(iGridId, aCols, sVal) {
	// Get grid object
	var oGrid = Zapatec.Widget.getWidgetById(iGridId);
	if (!oGrid || !oGrid.getColumnRange || !oGrid.filterOutColumn ||
	 !oGrid.applyFilters || !oGrid.displayFilterOut) {
		return;
	}
	// Get column range
	var oRange = oGrid.getColumnRange({
		column: aCols
	});
	if (!oRange) {
		return;
	}
	// Get unique values
	var aVals = [];
	for (var iVal = 0; iVal < oRange.values.length; iVal++) {
		aVals.push(oRange.values[iVal].v + '');
	}
	// Clear all
	var bClear = oGrid.filterOutColumn({
		column: aCols,
		value: aVals,
		show: false
	});
	// Show selected value
	var bShow = oGrid.filterOutColumn({
		column: aCols,
		value: sVal,
		show: true
	});
	// Apply filters
	if (bClear || bShow) {
		oGrid.applyFilters();
		// Refresh filter out forms
		oGrid.displayFilterOut();
	}
};

/**
 * Adds filter out to the Grid. See <b>filterOut</b> config option for details.
 *
 * @param {object} oArg Argument object (see <b>filterOut</b> config option for
 * description)
 */
Zapatec.Grid.prototype.addFilterOut = function(oArg) {
	this.filterOutRules.push(oArg);
};

/**
 * Displays filter out forms. Useful after {@link Zapatec.Grid#addFilterOut}.
 */
Zapatec.Grid.prototype.displayFilterOut = function() {
	// Go through all filterOut arguments
	var aFilterOutRules = this.filterOutRules;
	var iFilterOutRules = aFilterOutRules.length;
	for (var iFo = 0; iFo < iFilterOutRules; iFo++) {
		var oFilterOut = aFilterOutRules[iFo];
		// Get column range
		var oRange = this.getColumnRange(oFilterOut);
		if (!oRange) {
			continue;
		}
		// Get unique values
		var aVals = oRange.values;
		// Sort in descending order if needed
		if (oFilterOut.sortDesc) {
			aVals.sort(function(leftVal, rightVal) {
				if (leftVal.c < rightVal.c) {
					return 1;
				}
				if (leftVal.c > rightVal.c) {
					return -1;
				}
				return 0;
			});
		}
		// Display form
		if (typeof oFilterOut.callback == 'function') {
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
				continue;
			}
			// Join column numbers
			var sCols = aCols.join(',');
			// Use callback function
			var aChoices = [];
			for (var iVal = 0; iVal < aVals.length; iVal++) {
				var sVal = aVals[iVal].v + '';
				var sEscaped = escape(sVal);
				var oChoice = {};
				oChoice.value = sVal;
				oChoice.onclick = "Zapatec.Grid.checkboxOnClick('" + this.id +
				 "',[" + sCols + "],unescape('" + sEscaped + "'),this.checked)";
				// Check if this value is hidden
				oChoice.checked = false;
				for (var iField = 0; iField < aFields.length; iField++) {
					var oField = aFields[iField];
					if (!(oField.hiddenValues instanceof Array) ||
					 Zapatec.Utils.arrIndexOf(oField.hiddenValues, sVal) < 0) {
						oChoice.checked = true;
						break;
					}
				}
				oChoice.link = "Zapatec.Grid.checkboxLinkOnClick('" + this.id +
				 "',[" + sCols + "],unescape('" + sEscaped + "'))";
				if (iVal == 0) {
					oChoice.selectall = "Zapatec.Grid.checkboxSelectAllOnClick('" +
					 this.id + "',[" + sCols + "])";
					oChoice.clearall = "Zapatec.Grid.checkboxClearAllOnClick('" +
					 this.id + "',[" + sCols + "])";
				}
				aChoices.push(oChoice);
			}
			oFilterOut.callback(aChoices);
		} else if (this.visualizeFilterOut) {
			// Use container
			this.visualizeFilterOut(oFilterOut, aVals);
		}
	}
};

/**
 * Returns range of values of the specified column. If field property
 * "columnRange" of the column is defined, it is returned instead. If array of
 * column numbers is passed, concatenates all specified columns and returns
 * range of values of the result.
 *
 * <pre>
 * Argument object format:
 * {
 *   column: [object or number] array of zero-based column numbers or single
 *    zero-based column number,
 *   filtered: [boolean] use only filtered rows
 * }
 *
 * Return object format:
 * {
 *   min: [any] min value to compare,
 *   minValue: [string] min value to display,
 *   minOrig: [any] min original value,
 *   max: [any] max value to compare,
 *   maxValue: [string] max value to display,
 *   maxOrig: [any] max original value,
 *   values: [object] array of unique column values in the following format:
 *   [
 *     {
 *       c: [any] value to compare,
 *       v: [string] value to display,
 *       o: [any] original value
 *     },
 *     ...
 *   ]
 * }
 * </pre>
 *
 * @param {object} oArg Argument object
 * @return Range of column values or null
 * @type object
 */
Zapatec.Grid.prototype.getColumnRange = function(oArg) {
	// Check arguments
	if (!oArg || typeof oArg.column == 'undefined') {
		return null;
	}
	// Get columns
	var aCols = oArg.column;
	if (!(aCols instanceof Array)) {
		// Single column number was passed
		var oField = this.fields[oArg.column];
		if (!oField) {
			return null;
		}
		// Get range defined by user
		if (typeof oField.columnRange != 'undefined') {
			return oField.columnRange;
		}
		// Form array
		aCols = [oArg.column];
	}
	// Get array of keys
	var aKeys = [];
	// Auxiliary associative array
	var oKeys = {};
	var aRows = oArg.filtered ? this.filteredRows : this.rows;
	for (var iRow = 0; iRow < aRows.length; iRow++) {
		// Get row
		var oRow = aRows[iRow];
		if (!oRow) {
			continue;
		}
		// For each passed column
		for (var iCol = 0; iCol < aCols.length; iCol++) {
			// Get cell
			var oCell = oRow.cells[aCols[iCol]];
			if (!oCell) {
				continue;
			}
			// Get cell value
			var sKey = this.getCellValueString(oCell);
			if (sKey.length && typeof oKeys[sKey] == 'undefined') {
				aKeys.push({
					v: sKey,
					c: this.getCellValueCompare(oCell),
					o: this.getCellValueOriginal(oCell)
				});
				oKeys[sKey] = true;
			}
		}
	}
	if (!aKeys.length) {
		// Empty array
		return null;
	}
	// Sort array of keys
	aKeys.sort(function(leftVal, rightVal) {
		if (leftVal.c < rightVal.c) {
			return -1;
		}
		if (leftVal.c > rightVal.c) {
			return 1;
		}
		return 0;
	});
	// Return range of column values
	var iLastKey = aKeys.length - 1;
	return {
		min: aKeys[0].c,
		minValue: aKeys[0].v,
		minOrig: aKeys[0].o,
		max: aKeys[iLastKey].c,
		maxValue: aKeys[iLastKey].v,
		maxOrig: aKeys[iLastKey].o,
		values: aKeys
	};
};

/**
 * Returns number of rows that are currently displayed.
 *
 * @return How many rows are currently displayed
 * @type number
 */
Zapatec.Grid.prototype.recordsDisplayed = function() {
	if (this.config.dataOnDemand &&
	 typeof this.data.displayedRows != 'undefined') {
		return this.data.displayedRows * 1;
	}
	return this.filteredRows.length;
};

/**
 * Sets number of currently displayed rows. Effective only when dataOnDemand
 * config option is used.
 *
 * @param {number} iRows Number of currently displayed rows
 */
Zapatec.Grid.prototype.setDisplayedRows = function(iRows) {
	if (this.config.dataOnDemand) {
		this.data.displayedRows = iRows;
	}
};

/**
 * Returns total number of rows.
 *
 * @return Total number of rows
 * @type number
 */
Zapatec.Grid.prototype.totalRecords = function() {
	if (this.config.dataOnDemand &&
	 typeof this.data.totalRows != 'undefined') {
		return this.data.totalRows * 1;
	}
	return this.rows.length;
};

/**
 * Sets total number of rows. Effective only when dataOnDemand config option is
 * used.
 *
 * @param {number} iRows Total number of rows
 */
Zapatec.Grid.prototype.setTotalRows = function(iRows) {
	if (this.config.dataOnDemand) {
		this.data.totalRows = iRows;
	}
};

/**
 * Returns grid id.
 *
 * @return Grid id
 * @type number
 */
Zapatec.Grid.prototype.getId = function() {
	return this.id;
};

/**
 * Returns grid style defined by user.
 *
 * @return Grid style
 * @type string
 */
Zapatec.Grid.prototype.getStyle = function() {
	if (this.data && this.data.style) {
		return this.data.style;
	}
	return '';
};

/**
 * Returns grid header style defined by user.
 *
 * @return Grid header style
 * @type string
 */
Zapatec.Grid.prototype.getHeaderStyle = function() {
	if (this.data && this.data.headerStyle) {
		return this.data.headerStyle;
	}
	return '';
};

/**
 * Returns reference to private array containing grid rows.
 *
 * @return Grid rows array
 * @type object
 */
Zapatec.Grid.prototype.getRows = function() {
	return this.rows;
};

/**
 * Returns reference to private array containing filtered rows. Note: to get
 * currently displayed rows use {@link Zapatec.Grid#applyPaging} method instead.
 *
 * @return Filtered rows array
 * @type object
 */
Zapatec.Grid.prototype.getFilteredRows = function() {
	return this.filteredRows;
};

/**
 * Returns row id.
 *
 * @param {object} oRow Row object
 * @return Row id or undefined if not found
 * @type number
 */
Zapatec.Grid.prototype.getRowId = function(oRow) {
	if (oRow) {
		return oRow.i;
	}
};

/**
 * Finds row id by primary key value.
 *
 * @private
 * @param {string} sKey primary key value
 * @return Row id or undefined if not found
 * @type number
 */
Zapatec.Grid.prototype.getRowIdByPrimaryKey = function(sKey) {
	return this.getRowId(this.getRowByPrimaryKey(sKey));
};

/**
 * Returns visible row number.
 *
 * @param {object} oRow Row object
 * @return Row number or undefined if not found
 * @type number
 */
Zapatec.Grid.prototype.getRowNumber = function(oRow) {
	if (oRow) {
		var iRowId = this.getRowId(oRow);
		var aRows = this.applyPaging();
		for (var iRow = 0; iRow < aRows.length; iRow++) {
			if (this.getRowId(aRows[iRow]) == iRowId) {
				return iRow;
			}
		}
	}
};

/**
 * Returns row index in the internal rows array.
 *
 * @private
 * @param {number} iRowId Row id
 * @return Row number or undefined if not found
 * @type number
 */
Zapatec.Grid.prototype.getRowIndexById = function(iRowId) {
	for (var iRow = 0; iRow < this.rows.length; iRow++) {
		if (this.getRowId(this.rows[iRow]) == iRowId) {
			return iRow;
		}
	}
};

/**
 * Returns row style defined by user.
 *
 * @param {object} oRow Row object
 * @return Row style
 * @type string
 */
Zapatec.Grid.prototype.getRowStyle = function(oRow) {
	if (oRow && oRow.style) {
		return oRow.style;
	}
	return '';
};

/**
 * Returns true if row is selected.
 *
 * @param {object} oRow Row object
 * @return true if row is selected
 * @type boolean
 */
Zapatec.Grid.prototype.getRowSelected = function(oRow) {
	return (oRow && oRow.selected);
};

/**
 * Finds row by its id.
 *
 * @param {number} iRowId Row id
 * @return Row object or undefined if not found
 * @type object
 */
Zapatec.Grid.prototype.getRowById = function(iRowId) {
	return this.rowsIndex[iRowId];
};

/**
 * Finds row by primary key value.
 *
 * @private
 * @param {string} sKey primary key value
 * @return Row object or undefined if not found
 * @type object
 */
Zapatec.Grid.prototype.getRowByPrimaryKey = function(sKey) {
	if (this.primaryKey) {
		return this.primaryKey[sKey];
	}
};

/**
 * Finds row by cell.
 *
 * @param {object} oCell Cell object
 * @return Row object or undefined if not found
 * @type object
 */
Zapatec.Grid.prototype.getRowByCell = function(oCell) {
	if (oCell) {
		return this.getRowById(oCell.r);
	}
};

/**
 * Returns cells array of the row.
 *
 * @param {object} oRow Row object
 * @return Array of cell objects or undefined if not found
 * @type object
 */
Zapatec.Grid.prototype.getRowCells = function(oRow) {
	if (oRow && oRow.cells instanceof Array) {
		return oRow.cells;
	}
};

/**
 * Sets row style.
 *
 * @param {object} oRow Row object
 * @param {string} sStyle New row style
 * @return Updated row object
 * @type object
 */
Zapatec.Grid.prototype.setRowStyle = function(oRow, sStyle) {
	if (oRow instanceof Object) {
		oRow.style = sStyle;
	}
	return oRow;
};

/**
 * Returns reference to private array containing grid fields.
 *
 * <pre>
 * Arguments format:
 * {
 *   visible: [boolean, optional] if true, result array will contain only
 *    visible fields
 * }
 * </pre>
 *
 * @param {object} oArg Arguments
 * @return Grid fields array
 * @type object
 */
Zapatec.Grid.prototype.getFields = function(oArg) {
	var aFields = this.fields;
	if (oArg && oArg.visible) {
		// Create new array with only visible fields
		var aVisibleFields = [];
		var iFields = aFields.length;
		var oField;
		for (var iField = 0; iField < iFields; iField++) {
			oField = aFields[iField];
			if (!oField.hidden) {
				aVisibleFields.push(oField);
			}
		}
		aFields = aVisibleFields;
	}
	return aFields;
};

/**
 * Returns field id.
 *
 * @param {object} oField Field object
 * @return Field id or undefined if not found
 * @type number
 */
Zapatec.Grid.prototype.getFieldId = function(oField) {
	if (oField) {
		return oField.i;
	}
};

/**
 * Returns column title.
 *
 * @param {object} oField Field object
 * @return Column title
 * @type string
 */
Zapatec.Grid.prototype.getFieldTitle = function(oField) {
	if (oField && oField.title) {
		return oField.title;
	}
	return '';
};

/**
 * Returns field data type.
 *
 * @param {object} oField Field object
 * @return Field data type or undefined if not found
 * @type string
 */
Zapatec.Grid.prototype.getFieldType = function(oField) {
	if (oField) {
		return oField.dataType;
	}
};

/**
 * Returns column width defined by user.
 *
 * @param {object} oField Field object
 * @return Column width
 * @type string
 */
Zapatec.Grid.prototype.getFieldWidth = function(oField) {
	if (oField && oField.columnWidth) {
		return oField.columnWidth;
	}
	return '';
};

/**
 * Returns field style defined by user.
 *
 * @param {object} oField Field object
 * @return Field style
 * @type string
 */
Zapatec.Grid.prototype.getFieldStyle = function(oField) {
	if (oField && oField.style) {
		return oField.style;
	}
	return '';
};

/**
 * Returns spanned columns number and spanned fields array. If there is no span,
 * returns undefined.
 *
 * <pre>
 * Format of returned object:
 * {
 *   spanned: [number] spanned columns number,
 *   fields: [object] array of spanned field objects
 * }
 * </pre>
 *
 * @param {object} oField Field object
 * @return Span properties
 * @type object
 */
Zapatec.Grid.prototype.getFieldSpanned = function(oField) {
	if (!oField) {
		return;
	}
	// Get span start field
	var iSpan = parseInt(oField.span);
	if (isNaN(iSpan)) {
		var iId = oField.i;
		for (var iOffset = 1; iOffset <= iId; iOffset++) {
			oField = this.fields[iId - iOffset];
			if (!oField || !oField.hidden) {
				return;
			}
			iSpan = parseInt(oField.span);
			if (!isNaN(iSpan)) {
				break;
			}
		}
	}
	if (isNaN(iSpan) || iSpan <= 0) {
		return;
	}
	// Prevent invalid spans and remove hidden fields from span
	var aFields = [];
	var iSpanned = 0;
	for (var iOffset = 0; iOffset < iSpan; iOffset++) {
		var oF = this.fields[oField.i + iOffset];
		if (!oF) {
			continue;
		}
		if (iOffset > 0 && !isNaN(parseInt(oF.span))) {
			break;
		}
		aFields.push(oF);
		if (!oF.hidden) {
			iSpanned++;
		}
	}
	if (!iSpanned) {
		return;
	}
	// Form result
	return {
		spanned: iSpanned,
		fields: aFields
	};
};

/**
 * Returns field span value.
 *
 * @param {object} oField Field object
 * @return Span title
 * @type string
 */
Zapatec.Grid.prototype.getFieldSpan = function(oField) {
	if (oField) {
		var iSpan = parseInt(oField.span);
		if (!isNaN(iSpan)) {
			return Math.max(iSpan, 0);
		}
	}
	return 0;
};

/**
 * Returns field span title.
 *
 * @param {object} oField Field object
 * @return Span title
 * @type string
 */
Zapatec.Grid.prototype.getFieldSpanTitle = function(oField) {
	if (oField && oField.spanTitle) {
		return oField.spanTitle;
	}
	return '';
};

/**
 * Returns field span style defined by user.
 *
 * @param {object} oField Field object
 * @return Span style
 * @type string
 */
Zapatec.Grid.prototype.getFieldSpanStyle = function(oField) {
	if (oField && oField.spanStyle) {
		return oField.spanStyle;
	}
	return '';
};

/**
 * Returns true if field is hidden.
 *
 * @param {object} oField Field object
 * @return True if field is hidden
 * @type boolean
 */
Zapatec.Grid.prototype.getFieldHidden = function(oField) {
	if (oField) {
		return oField.hidden;
	}
};

/**
 * Returns true if it is not allowed to sort the field.
 *
 * @param {object} oField Field object
 * @return True if it is not allowed to sort the field
 * @type boolean
 */
Zapatec.Grid.prototype.getFieldNosort = function(oField) {
	if (oField) {
		return oField.nosort;
	}
};

/**
 * Returns true if the field is sorted ascending.
 *
 * @param {object} oField Field object
 * @return True if the field is sorted ascending
 * @type boolean
 */
Zapatec.Grid.prototype.getFieldSorted = function(oField) {
	if (oField) {
		return oField.sorted;
	}
};

/**
 * Returns true if the field is sorted descending.
 *
 * @param {object} oField Field object
 * @return True if the field is sorted descending
 * @type boolean
 */
Zapatec.Grid.prototype.getFieldSortedDesc = function(oField) {
	if (oField) {
		return oField.sortedDesc;
	}
};

/**
 * Forms field onclick attribute value.
 *
 * @param {object} oField Field object
 * @return Field onclick attribute value
 * @type string
 */
Zapatec.Grid.prototype.getFieldOnclick = function(oField) {
	if (oField && !oField.nosort) {
		return "Zapatec.Grid.sort('" + this.id + "','" + oField.i + "')";
	}
	return '';
};

/**
 * Finds field by its id.
 *
 * @param {number} iFieldId Field id
 * @return Field object or undefined if not found
 * @type object
 */
Zapatec.Grid.prototype.getFieldById = function(iFieldId) {
	return this.fields[iFieldId];
};

/**
 * Finds field by cell.
 *
 * @param {object} oCell Cell object
 * @return Field object or undefined if not found
 * @type object
 */
Zapatec.Grid.prototype.getFieldByCell = function(oCell) {
	if (oCell) {
		return this.getFieldById(oCell.i);
	}
};

/**
 * Returns cell id.
 *
 * @param {object} oCell Cell object
 * @return Cell id or undefined if not found
 * @type number
 */
Zapatec.Grid.prototype.getCellId = function(oCell) {
	if (oCell) {
		return oCell.i;
	}
};

/**
 * Returns cell row id.
 *
 * @param {object} oCell Cell object
 * @return Cell row id or undefined if not found
 * @type number
 */
Zapatec.Grid.prototype.getCellRowId = function(oCell) {
	if (oCell) {
		return oCell.r;
	}
};

/**
 * Returns cell visible row number.
 *
 * @param {object} oCell Cell object
 * @return Cell row number or undefined if not found
 * @type number
 */
Zapatec.Grid.prototype.getCellRowNumber = function(oCell) {
	if (oCell) {
		var iRowId = this.getCellRowId(oCell);
		var aRows = this.applyPaging();
		for (var iRow = 0; iRow < aRows.length; iRow++) {
			if (this.getRowId(aRows[iRow]) == iRowId) {
				return iRow;
			}
		}
	}
};

/**
 * Finds cell by its row and cell id.
 *
 * @param {object} oRow Row object
 * @param {number} iCellId Cell id
 * @return Cell object or undefined if not found
 * @type object
 */
Zapatec.Grid.prototype.getCellByRow = function(oRow, iCellId) {
	var aCells = this.getRowCells(oRow);
	if (aCells) {
		return aCells[iCellId];
	}
};

/**
 * Finds cell by its row id and cell id.
 *
 * @param {number} iRowId Row id
 * @param {number} iCellId Cell id
 * @return Cell object or undefined if not found
 * @type object
 */
Zapatec.Grid.prototype.getCellById = function(iRowId, iCellId) {
	return this.getCellByRow(this.getRowById(iRowId), iCellId);
};

/**
 * Returns cell value to display.
 *
 * @param {object} oCell Cell object
 * @return Cell value to display
 * @type any
 */
Zapatec.Grid.prototype.getCellValue = function(oCell) {
	if (!oCell) {
		return;
	}
	return oCell.v;
};

/**
 * Returns cell value to display as string.
 *
 * @param {object} oCell Cell object
 * @return Cell value to display
 * @type string
 */
Zapatec.Grid.prototype.getCellValueString = function(oCell) {
	return this.getCellValue(oCell) + '';
};

/**
 * Returns cell value to compare.
 *
 * @param {object} oCell Cell object
 * @return Cell value to compare
 * @type any
 */
Zapatec.Grid.prototype.getCellValueCompare = function(oCell) {
	if (!oCell) {
		return '';
	}
	if (typeof oCell.c != 'undefined') {
		return oCell.c;
	}
	return this.getCellValue(oCell);
};

/**
 * Returns original cell value.
 *
 * @param {object} oCell Cell object
 * @return Original cell value
 * @type any
 */
Zapatec.Grid.prototype.getCellValueOriginal = function(oCell) {
	if (!oCell) {
		return '';
	}
	if (typeof oCell.o != 'undefined') {
		return oCell.o;
	}
	return this.getCellValue(oCell);
};

/**
 * Returns cell style defined by user.
 *
 * @param {object} oCell Cell object
 * @param {number} iRow Row number passed to funcStyle
 * @return User defined cell style
 * @type string
 */
Zapatec.Grid.prototype.getCellStyle = function(oCell, iRow) {
	// Check arguments
	if (!oCell) {
		return '';
	}
	// Get style defined by user
	var sStyle = '';
	// Try funcStyle
	if (typeof this.config.funcStyle == 'function') {
		sStyle = this.config.funcStyle(this, oCell, iRow);
	}
	// Try value got from source
	if (!sStyle) {
		sStyle = oCell.style;
	}
	return sStyle;
};

/**
 * Returns true if cell is selected.
 *
 * @param {object} oCell Cell object
 * @return true if cell is selected
 * @type boolean
 */
Zapatec.Grid.prototype.getCellSelected = function(oCell) {
	return (oCell && oCell.selected);
};

/**
 * Returns cell data type.
 *
 * @param {object} oCell Cell object
 * @return Cell data type or undefined if not found
 * @type string
 */
Zapatec.Grid.prototype.getCellDataType = function(oCell) {
	var oField = this.getFieldByCell(oCell);
	if (oField) {
		return oField.dataType;
	}
};

/**
 * Returns data to be displayed in grid cell.
 *
 * @param {object} oCell Cell object
 * @param {number} iMode Optional. Mode for show as is: 1 = check show_asis,
 * 2 = show converted, 3 = show as is with any conversion, 4 = original value.
 * Default: 1.
 * @return Data to display for this cell
 * @type string
 */
Zapatec.Grid.prototype.getCellData = function(oCell, iMode) {
	// Check arguments
	if (!oCell) {
		return 'undefined';
	}
	if (!iMode) {
		iMode = 1;
	}
	// Check show_asis
	if ((iMode == 1 && !this.config.show_asis) || iMode == 2) {
		// Default representation
		return this.getCellValueString(oCell);
	}
	// Form value
	var sData = this.getCellValueOriginal(oCell) + '';
	if (iMode == 4) {
		// Original value
		return sData;
	}
	// iMode == 3
	if (typeof this.config.show_asis == 'object') {
		// Call function to create presentable data for grid cell
		if (typeof this.config.show_asis.funcShow == 'function') {
			sData = this.config.show_asis.funcShow(this, oCell);
		}
		// Show both
		if (this.config.show_asis.bBoth) {
			sData = '<u>' + sData + '</u><br>' + this.getCellValueString(oCell);
		}
	}
	return sData;
};

/**
 * Sets column title and visualizes changes immediately without refreshing whole
 * grid.
 *
 * @param {object} oField Field object
 * @param {string} sTitle New column title
 * @return Number of renamed columns (0 or 1)
 * @type number
 */
Zapatec.Grid.prototype.setFieldTitle = function(oField, sTitle) {
	// Change title
	if (!oField) {
		return 0;
	}
	oField.title = sTitle;
	// Visualize change
	var oSpan = document.getElementById(['zpGrid', this.id, 'Col', oField.i,
	 'TitleSpan'].join(''));
	if (oSpan) {
		oSpan.innerHTML = sTitle;
	}
	return 1;
};

/**
 * Sets cell value. Saves previous value in the private property.
 *
 * @param {object} oCell Cell object
 * @param {any} value New cell value
 * @return Updated cell object
 * @type object
 */
Zapatec.Grid.prototype.setCellValue = function(oCell, value) {
	if (!oCell) {
		oCell = {};
	} else {
		// Remove old previous state
		oCell.previousState = null;
		// Save previous state of the cell
		oCell.previousState = Zapatec.Utils.clone(oCell);
	}
	oCell.v = value;
	return this.convertCell(oCell);
};

/**
 * Reverts previous cell value. Current cell value becomes previous. If there is
 * no previous value, leaves the cell without changes.
 *
 * <pre>
 * Format of the argument:
 * {
 *   rowId: [number, optional] zero-based row id,
 *   row: [object, optional] row object,
 *   cellId: [number, optional] zero-based column id,
 *   cell: [object, optional] cell object
 * }
 *
 * Only one of the following combinations is expected:
 * 1) row, cellId
 * 2) rowId, cellId
 * 3) cell
 * </pre>
 *
 * @private
 * @param {object} oArg Argument object
 * @return Updated cell object or null if cell is not found
 * @type object
 */
Zapatec.Grid.prototype.revertCell = function(oArg) {
	// Check arguments
	var iRowId = parseInt(oArg.rowId);
	var oRow = oArg.row;
	var iCellId = parseInt(oArg.cellId);
	var oCell = oArg.cell;
	if (!oRow) {
		if (!isNaN(iRowId)) {
			oRow = this.getRowById(iRowId);
		} else if (oCell) {
			oRow = this.getRowByCell(oCell);
		}
		if (!oRow) {
			// Invalid argument
			return null;
		}
	}
	if (isNaN(iCellId)) {
		iCellId = this.getCellId(oCell);
		if (typeof iCellId != 'number') {
			// Invalid argument
			return null;
		}
	}
	// Get cell and revert it
	var aCells = oRow.cells;
	if (aCells) {
		oCell = aCells[iCellId];
		if (oCell) {
			var oPrevState = oCell.previousState;
			if (oPrevState) {
				// Remove old previous state
				oCell.previousState = null;
				// Save previous state of the cell
				oPrevState.previousState = Zapatec.Utils.clone(oCell);
				// Revert cell
				aCells[iCellId] = oCell = oPrevState;
			}
			return oCell;
		}
	}
	// Invalid cell
	return null;
};

/**
 * Reverts previous values of all cells in the row. Calls
 * {@link Zapatec.Grid#revertCell} for each cell in the row.
 *
 * <pre>
 * Format of the argument:
 * {
 *   rowId: [number, optional] zero-based row id,
 *   row: [object, optional] row object
 * }
 *
 * Only one of rowId and row is expected.
 * </pre>
 *
 * @private
 * @param {object} oArg Argument object
 * @return Updated row object or null if row is not found
 * @type object
 */
Zapatec.Grid.prototype.revertRow = function(oArg) {
	// Check arguments
	var iRowId = parseInt(oArg.rowId);
	var oRow = oArg.row;
	if (!oRow) {
		if (!isNaN(iRowId)) {
			oRow = this.getRowById(iRowId);
		}
		if (!oRow) {
			// Invalid argument
			return null;
		}
	}
	// Revert cells
	var aCells = oRow.cells;
	if (!(aCells instanceof Array)) {
		// Invalid row
		return null;
	}
	var iCells = aCells.length;
	for (var iCell = 0; iCell < iCells; iCell++) {
		this.revertCell({
			row: oRow,
			cellId: iCell
		});
	}
	return oRow;
};

/**
 * Sets cell style.
 *
 * @param {object} oCell Cell object
 * @param {string} sStyle New cell style
 * @return Updated cell object
 * @type object
 */
Zapatec.Grid.prototype.setCellStyle = function(oCell, sStyle) {
	if (oCell instanceof Object) {
		oCell.style = sStyle;
	}
	return oCell;
};

/**
 * Hides specified columns.
 *
 * <pre>
 * Argument object format:
 * {
 *   columns: [object or number] Array of zero-based column numbers or single
 *    zero-based column number,
 *   noRefresh: [boolean] If true, grid is not refreshed. Useful when you need
 *    to hide some columns and to show other columns
 * }
 * </pre>
 *
 * @param {object} oArg Argument object
 */
Zapatec.Grid.prototype.hideColumns = function(oArg) {
	// Check arguments
	var aColumns = oArg.columns;
	if (!(aColumns instanceof Array)) {
		if (typeof aColumns == 'undefined') {
			return;
		}
		aColumns = [aColumns];
	}
	// Hide columns
	var iColumns = aColumns.length;
	var iColumn, oColumn;
	for (iColumn = 0; iColumn < iColumns; iColumn++) {
		oColumn = this.getFieldById(aColumns[iColumn]);
		if (oColumn) {
			oColumn.hidden = true;
		}
	}
	// Refresh
	if (!oArg.noRefresh) {
		this.refresh();
	}
};

/**
 * Unhides specified columns.
 *
 * <pre>
 * Argument object format:
 * {
 *   columns: [object or number] Array of zero-based column numbers or single
 *    zero-based column number,
 *   noRefresh: [boolean] If true, grid is not refreshed. Useful when you need
 *    to show some columns and to hide other columns
 * }
 * </pre>
 *
 * @param {object} oArg Argument object
 */
Zapatec.Grid.prototype.showColumns = function(oArg) {
	// Check arguments
	if (!(oArg.columns instanceof Array)) {
		if (typeof oArg.columns == 'undefined') {
			return;
		}
		oArg.columns = [oArg.columns];
	}
	// Unhide columns
	for (var iCol = 0; iCol < oArg.columns.length; iCol++) {
		var oCol = this.getFieldById(oArg.columns[iCol]);
		if (oCol) {
			oCol.hidden = false;
			if (!oArg.noRefresh) {
				this.refresh();
			}
		}
	}
};

/**
 * Loads passed data into already initialized grid to view or edit them.
 *
 * <pre>
 * Arguments object format:
 * {
 *   data: [object] data in format specific for each widget
 * }
 * </pre>
 *
 * @param {object} oArg Arguments
 */
Zapatec.Grid.prototype.receiveData = function(oArg) {
	// Call parent method
	Zapatec.Grid.SUPERclass.receiveData.call(this, oArg);
	// Check arguments
	if (!oArg.data) {
		return;
	}
	// Get data
	var aRows = oArg.data;
	if (!(aRows instanceof Array)) {
		aRows = [aRows];
	}
	// Form rows
	for (var iRow = 0; iRow < aRows.length; iRow++) {
		var aCells = aRows[iRow];
		// Check if we need to convert data
		if (aCells.cells) {
			break;
		}
		// Get array of cell values
		if (!(aCells instanceof Array)) {
			aCells = [aCells];
		}
		// Convert row
		var oRow = {
			cells: []
		};
		for (var iCell = 0; iCell < aCells.length; iCell++) {
			var oCell = aCells[iCell];
			if (typeof oCell.v != 'undefined') {
				oRow.cells.push(oCell);
			} else {
				oRow.cells.push({
					v: oCell
				});
			}
		}
		aRows[iRow] = oRow;
	}
	// Put data into the grid
	this.splice({
		atRow: 0,
		howMany: this.totalRecords(),
		// Clone array to prevent modification of the original data
		rows: Zapatec.Utils.clone(aRows)
	});
};

/**
 * Passes array of selected rows to the specified editor.
 *
 * @param {object} oEditor Widget object used as editor
 */
Zapatec.Grid.prototype.editSelectedRows = function(oEditor) {
	// Check arguments
	if (!oEditor || !oEditor.receiveData) {
		return;
	}
	// Get selected rows
	var aRows = this.getSelectedRows();
	// Check if there are selected rows
	if (!aRows.length) {
		alert(this.getMessage('errorSelectRow'));
		return;
	}
	// Populate editor
	oEditor.receiveData({
		data: aRows
	});
};

/**
 * Passes array of selected cells to the specified editor.
 *
 * @param {object} oEditor Widget object used as editor
 */
Zapatec.Grid.prototype.editSelectedCells = function(oEditor) {
	// Check arguments
	if (!oEditor || !oEditor.receiveData) {
		return;
	}
	// Get selected rows
	var aCells = this.getSelectedCells();
	// Check if there are selected cells
	if (!aCells.length) {
		alert(this.getMessage('errorSelectCell'));
		return;
	}
	// Populate editor
	oEditor.receiveData({
		data: aCells
	});
};

/**
 * Forms cells for rowspans and colspans or prepares rowspans and colspans for
 * output.
 *
 * @private
 * @param {object} aRows Rows array to modify
 * @param {boolean} bOut Optional. If true, instead of forming cells prepares
 * rowspans and colspans for output.
 * @return Modified rows array
 * @type object
 */
Zapatec.Grid.prototype.prepareSpans = function(aRows, bOut) {
	var aFields = this.fields;
	var iFields = aFields.length;
	var iRows = aRows.length;
	if (iFields && iRows) {
		// Rowspan flags
		var aRF = [];
		// Functions used inside loop
		var fClone = Zapatec.Utils.clone;
		// Variables used inside loop
		var iHorizHiddenStart = this.config.fixedLeft;
		var iHorizHiddenEnd = iHorizHiddenStart + this.currentHorizontalOffset;
		var iRow, oRow, aCells, iCell, iC, oCell, oRF, oC, iRowspan, iColspan;
		for (iRow = 0; iRows--; iRow++) {
			oRow = aRows[iRow];
			if (!oRow) {
				continue;
			}
			aCells = oRow.cells;
			if (!aCells) {
				continue;
			}
			for (iCell = 0; iCell < iFields; iCell++) {
				oCell = aCells[iCell];
				oRF = aRF[iCell];
				if (oCell) {
					if (oRF) {
						// Check if we are still inside rowspan
						oC = oRF.cell;
						if (oC.i == oCell.i && oC.r == oCell.r) {
							if (bOut) {
								// Remove spanned cell
								aCells[iCell] = null;
								// Mark row as having rowspans
								oRow.spanned = true;
							}
							// Decrement rowspan flag
							if (!--oRF.rowspan) {
								// End of span
								aRF[iCell] = null;
							} else if (!iRows) {
								// End of data
								oC.rowspan -= oRF.rowspan;
								aRF[iCell] = null;
							}
							// Check colspan
							if (bOut) {
								iColspan = oCell.colspan;
								if (iColspan > 1) {
									for (iCell++; --iColspan; iCell++) {
										aCells[iCell] = null;
									}
									continue;
								}
							}
						} else {
							// Some rows in rowspan were filtered out
							if (bOut) {
								// Fix rowspan
								iRowspan = oC.rowspan - oRF.rowspan;
								if (iRowspan < 2) {
									iRowspan = 0;
								}
								oC.rowspan = iRowspan;
								// Hide content if controlling cell is not visible
								if (oC.r < this.currentVerticalOffset) {
									oC.v = '';
								}
								iColspan = oC.colspan;
								if (iColspan > 1) {
									var aSpannedCells = oRF.row.cells;
									var oSpannedCell;
									for (var iOffset = 1; iOffset < iColspan; iOffset++) {
										oSpannedCell = aSpannedCells[iCell + iOffset];
										if (oSpannedCell) {
											oSpannedCell.rowspan = iRowspan;
										}
									}
								}
							}
							aRF[iCell] = null;
							// Process this cell again because it can start its own rowspan
							iCell--;
							continue;
						}
					} else {
						// Check rowspan
						iRowspan = oCell.rowspan;
						if (iRowspan > 1) {
							if (iRows) {
								// Set rowspan flag
								aRF[iCell] = {
									rowspan: --iRowspan,
									row: oRow,
									cell: oCell
								};
								// Mark row as having rowspans
								oRow.spanned = true;
							} else {
								// End of data
								oCell.rowspan = 0;
							}
						}
					}
					// Check colspan
					iColspan = oCell.colspan;
					if (iColspan > 1) {
						if (bOut) {
							// Find the first not hidden
							while (iColspan && aFields[iCell].hidden) {
								oCell = aCells[++iCell];
								iColspan--;
							}
							while (iColspan && iCell >= iHorizHiddenStart &&
							 iCell < iHorizHiddenEnd) {
								oCell = aCells[++iCell];
								// Hide content if controlling cell is not visible
								oCell.v = '';
								iColspan--;
							}
							if (oCell) {
								oCell.colspan = iColspan;
							}
							if (iColspan > 0) {
								// Go to next cell
								iColspan--;
								iCell++;
								// Remove spanned cells
								while (aFields[iCell] && iColspan--) {
									if (aFields[iCell].hidden) {
										if (oCell) {
											oCell.colspan--;
										}
									}
									// Remove spanned cell
									aCells[iCell] = null;
									iCell++;
								}
								// Compensate increment in the parent loop
								iCell--;
							}
						} else {
							for (iCell++; --iColspan; iCell++) {
								// Clone cell for sorting and filtering
								oC = fClone(oCell);
								oC.i = iCell;
								// Convert cell value according to the column type
								aCells[iCell] = this.convertCell(oC);
							}
							// Compensate increment in the parent loop
							iCell--;
						}
					}
				} else if (oRF) {
					if (bOut) {
						// Mark row as having rowspans
						oRow.spanned = true;
					} else {
						// Reference cell for sorting and filtering
						aCells[iCell] = oRF.cell;
						// Decrement rowspan flag
						if (!--oRF.rowspan) {
							// End of span
							aRF[iCell] = null;
						} else if (!iRows) {
							// End of data
							oRF.cell.rowspan -= oRF.rowspan;
							aRF[iCell] = null;
						}
						// Check colspan
						if (!bOut) {
							oCell = aCells[iCell];
							iColspan = oCell.colspan;
							if (iColspan > 1) {
								for (iCell++; --iColspan; iCell++) {
									// Clone cell for sorting and filtering
									oC = fClone(oCell);
									oC.i = iCell;
									// Convert cell value according to the column type
									aCells[iCell] = this.convertCell(oC);
								}
							}
						}
					}
				}
			}
		}
	}
	return aRows;
};

/**
 * Standard gridCellMouseup event handler. If right mouse button was clicked,
 * calls callbackCellOnRightClick function. If callbackCellOnRightClick is not
 * defined, calls callbackRowOnRightClick function.
 *
 * <pre>
 * Note:
 * In Opera instead of right click use Alt + left click because it doesn't allow
 * to turn off context menu programmatically.
 * Safari doesn't support right mouse button. Use Meta + left click instead.
 * </pre>
 *
 * @private
 * @param {number} iRow Row id
 * @param {number} iCell Cell id
 */
Zapatec.Grid.onCellMouseup = function(iRow, iCell) {
	// Get button
	var oEvent = window.event;
	var iButton = oEvent.button || oEvent.which || 1;
	if (iButton == 1 && (oEvent.metaKey || (window.opera && oEvent.altKey))) {
		iButton = 2;
	}
	// Callback
	if (iButton > 1) {
		var oConfig = this.config;
		if (typeof oConfig.callbackCellOnRightClick == 'function') {
			oConfig.callbackCellOnRightClick(this, this.getCellById(iRow, iCell));
		} else if (typeof oConfig.callbackRowOnRightClick == 'function') {
			oConfig.callbackRowOnRightClick(this, this.getRowById(iRow));
		}
	}
};

/**
 * Moves column within the grid. Note: Changes ids of the columns.
 *
 * <pre>
 * Arguments format:
 * {
 *   fieldId: [number] zero-based field id to move,
 *   position: [number] new zero-based column position,
 *   noRefresh: [boolean, optional] indicates that grid should not be refreshed
 *    after changing (default is false) (useful when several changes go one by
 *    one)
 * }
 * </pre>
 *
 * @param {object} oArg Arguments
 * @return True on success, false on attempt to move column into itself,
 * undefined if arguments are invalid
 * @type boolean
 */
Zapatec.Grid.prototype.moveColumn = function(oArg) {
	// Check arguments
	if (!oArg) {
		return;
	}
	var iColumn = parseInt(oArg.fieldId);
	if (isNaN(iColumn)) {
		return;
	}
	var aFields = this.fields;
	var iFields = aFields.length;
	if (!aFields[iColumn]) {
		return;
	}
	var iPos = parseInt(oArg.position);
	if (isNaN(iPos)) {
		return;
	}
	if (iPos < 0) {
		iPos = 0;
	} else if (!aFields[iPos]) {
		iPos = aFields[iFields - 1].i;
		if (isNaN(iPos)) {
			return;
		}
	}
	if (iColumn == iPos) {
		return false;
	}
	// Move field
	var aRemoved;
	aRemoved = aFields.splice(iColumn, 1);
	aFields.splice(iPos, 0, aRemoved[0]);
	// Fix fields, filter out rules, totals rules
	var iStart = iColumn;
	var iEnd = iPos;
	var iIncrement = -1;
	if (iColumn > iPos) {
		iStart = iPos;
		iEnd = iColumn;
		iIncrement = 1;
	}
	var iCol;
	// Fields
	for (iCol = iStart; iCol <= iEnd; iCol++) {
		aFields[iCol].i = iCol;
	}
	// Filter out rules, totals rules
	var aRules = this.filterOutRules;
	aRules = aRules.concat(this.totalsRules);
	var iRules = aRules.length;
	var iRule, oRule, aCols, iCols, iFieldId;
	for (iRule = 0; iRule < iRules; iRule++) {
		oRule = aRules[iRule];
		aCols = oRule.column;
		if (aCols instanceof Array) {
			iCols = aCols.length;
			for (iCol = 0; iCol < iCols; iCol++) {
				iFieldId = aCols[iCol];
				if (iFieldId == iColumn) {
					aCols[iCol] = iPos;
				} else if (iFieldId >= iStart && iFieldId <= iEnd) {
					aCols[iCol] += iIncrement;
				}
			}
		} else {
			iFieldId = aCols;
			if (iFieldId == iColumn) {
				oRule.column = iPos;
			} else if (iFieldId >= iStart && iFieldId <= iEnd) {
				oRule.column += iIncrement;
			}
		}
	}
	// Fix data
	var aRows = this.rows;
	var iRows = aRows.length;
	var iRow, oRow, aCells;
	for (iRow = 0; iRow < iRows; iRow++) {
		oRow = aRows[iRow];
		aCells = oRow.cells;
		// Move cell
		aRemoved = aCells.splice(iColumn, 1);
		aCells.splice(iPos, 0, aRemoved[0]);
		// Fix cell ids
		for (iCol = iStart; iCol <= iEnd; iCol++) {
			aCells[iCol].i = iCol;
		}
	}
	// Fire event
	this.fireEvent('gridMovedColumn', {
		fieldId: iColumn,
		position: iPos
	});
	// Refresh grid
	if (!oArg.noRefresh) {
		this.refresh();
	}
	return true;
};

/**
 * Converts any column number after column moving. When column is moved, ids of
 * the fields are changed. This function takes old field id and converts it
 * to the new id of the same field. Note: static method.
 *
 * <pre>
 * Arguments format:
 * {
 *   fieldId: [number] old zero-based field id,
 *   move: [object] object received from the <b>gridMovedColumn</b> event
 * }
 * </pre>
 *
 * @param {object} oArg Arguments
 * @return New zero-based field id or undefined in case of invalid arguments
 * @type number
 */
Zapatec.Grid.getNewColumnNumber = function(oArg) {
	// Check arguments
	if (!oArg) {
		return;
	}
	var iFieldId = parseInt(oArg.fieldId);
	if (isNaN(iFieldId)) {
		return;
	}
	var oMove = oArg.move;
	if (!oMove) {
		return;
	}
	var iColumn = parseInt(oMove.fieldId);
	if (isNaN(iColumn)) {
		return;
	}
	var iPos = parseInt(oMove.position);
	if (isNaN(iPos)) {
		return;
	}
	// Get new id
	if (iColumn == iPos) {
		// Not changed
		return iFieldId;
	}
	var iStart = iColumn;
	var iEnd = iPos;
	var iIncrement = -1;
	if (iColumn > iPos) {
		iStart = iPos;
		iEnd = iColumn;
		iIncrement = 1;
	}
	if (iFieldId == iColumn) {
		return iPos;
	} else if (iFieldId >= iStart && iFieldId <= iEnd) {
		return iFieldId + iIncrement;
	}
	// Not changed
	return iFieldId;
};
