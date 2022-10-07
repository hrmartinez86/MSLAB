//v.1.0 build 80512

/*
Copyright DHTMLX LTD. http://www.dhtmlx.com
You allowed to use this component or parts of it under GPL terms
To use it on other terms or get Professional edition of the component please contact us at sales@dhtmlx.com
*/
/**
*	@desc: constructor, creates single window under dhtmlxWindows system
*	@pseudonym: win
*	@type: public
*/
function dhtmlXWindowsSngl(){
	
}
/**
*	@desc: constructor, creates button for window under dhtmlxWindows system
*	@pseudonym: btn
*	@type: public
*/
function dhtmlXWindowsBtn(){
	
}

/**
*   @desc: constructor, creates a new dhtmlxWindows object
*   @type: public
*/
function dhtmlXWindows() {
	
	// image manipulation
	this.imagePath = "codebase/imgs/";
	/**
	*   @desc: sets path to the directory where used images are located
	*   @param: path - url to where images are located
	*   @type: public
	*/
	this.setImagePath = function(path) {
		this.imagePath = path;
	}
	
	// skins
	this.skin = "standard";
	this.skinParams = { // standard
			    "standard": { "header_height": 32, "border_left_width": 6, "border_right_width": 7, "border_bottom_height": 6 },
			    // web
			    "web": { "header_height": 21, "border_left_width": 2, "border_right_width": 2, "border_bottom_height": 2 },
			    // modern
			    "modern_black": { "header_height": 39, "border_left_width": 2, "border_right_width": 2, "border_bottom_height": 2 },
			    "modern_blue": { "header_height": 39, "border_left_width": 2, "border_right_width": 2, "border_bottom_height": 2 },
			    "modern_red": { "header_height": 39, "border_left_width": 2, "border_right_width": 2, "border_bottom_height": 2 },
			    // clear
			    "clear_blue": { "header_height": 32, "border_left_width": 6, "border_right_width": 6, "border_bottom_height": 6 },
			    "clear_green": { "header_height": 32, "border_left_width": 6, "border_right_width": 6, "border_bottom_height": 6 },
			    "clear_silver": { "header_height": 32, "border_left_width": 6, "border_right_width": 6, "border_bottom_height": 6 },
			    // aqua
			    "aqua_dark": { "header_height": 31, "border_left_width": 3, "border_right_width": 3, "border_bottom_height": 3 },
			    "aqua_orange": { "header_height": 31, "border_left_width": 3, "border_right_width": 3, "border_bottom_height": 3 },
			    "aqua_sky": { "header_height": 31, "border_left_width": 3, "border_right_width": 3, "border_bottom_height": 3 }
	};
	/**
	*   @desc: changes window skin
	*   @param: skin - skin name
	*   @type: public
	*/
	this.setSkin = function(skin) {
		this.skin = skin;
		this._redrawSkin();
	}
	this._redrawSkin = function() {
		var skinParams = this.skinParams[this.skin];
		for (var a in this.wins) {
			var win = this.wins[a];
			//
			win.childNodes[0].className = "dhtmlx_wins_"+this.skin;
			// icon
			win.childNodes[1].className = "dhtmlx_wins_icon_"+this.skin;
			this._restoreWindowIcons(win);
			// title
			win.childNodes[2].className = "dhtmlx_wins_title_"+this.skin;
			// butons
			win.childNodes[3].className = "dhtmlx_wins_buttons_"+this.skin;
			this._redrawWindow(win);
		}
		// this._restoreWindowIcons(this.getTopmostWindow());
	}
	
	// return true if window with specified id is exists
	/**
	*   @desc: returns true if window with specified id exists
	*   @param: id
	*   @type: public
	*/
	this.isWindow = function(id) {
		var t = (this.wins[id] != null);
		return t;
	}
	
	// return array of handlers finded by text
	/**
	*   @desc: returns array of window handlers found by header text
	*   @param: id
	*   @type: public
	*/
	this.findByText = function(text) {
		var wins = new Array();
		for (var a in this.wins) {
			if (this.wins[a].getText().search(text, "gi") >= 0) {
				wins[wins.lentgh] = this.wins[a];
			}
		}
		return wins;
	}
	
	// return handler by id
	/**
	*   @desc: returns window handler (dhtmlXWindowSngl object) found by id
	*   @param: id
	*   @type: public
	*/
	this.window = function(id) {
		var win = null;
		if (this.wins[id] != null) { win = this.wins[id]; }
		return win;
	}
	
	// iterator
	/**
	*   @desc: iterator - goes through all windows and calls user handler
	*   @param: hander (user function)
	*   @type: public
	*/
	this.forEachWindow = function(handler) {
		for (var a in this.wins) {
			handler(this.wins[a]);
		}
	}
	
	// return topmost focused window handler
	/**
	*   @desc: returns topmost window
	*   @type: public
	*/
	this.getTopmostWindow = function(visibleOnly) {
		var topmost = {"zi": 0};
		for (var a in this.wins) {
			
			if (this.wins[a].zi > topmost.zi) {
				if (visibleOnly == true && !this._isWindowHidden(this.wins[a])) {
					topmost = this.wins[a];
				}
				if (visibleOnly != true) {
					topmost = this.wins[a];
				}
			}
		}
		return (topmost.zi != 0 ? topmost : null);
	}
	
	// return bottommost focused window handler
	/**
	*   @desc: returns bottommost window
	*   @type: public
	*/
	this.getBottommostWindow = function() {
		var bottommost = this.getTopmostWindow();
		for (var a in this.wins) {
			if (this.wins[a].zi < bottommost.zi) {
				bottommost = this.wins[a];
			}
		}
		return (bottommost.zi != 0 ? bottommost : null);
	}
	
	// windows storage
	this.wins = {};
	
	// viewport
	this.autoViewport = true;
	this._createViewport = function() {
		this.vp = document.body;
		// absolute left
		/*
		this.vp.ax = 0;
		this.vp.ay = 0;
		this._autoResizeViewport();
		var that = this;
		if (_isIE) {
			window.attachEvent("onresize", function(){ that._autoResizeViewport(); });
		} else {
			window.addEventListener("resize", function(){ that._autoResizeViewport(); }, false);
		}
		*/
		//
		this.modalCoverI = document.createElement("IFRAME");
		this.modalCoverI.frameBorder = "0";
		this.modalCoverI.className = "dhx_modal_cover_ifr";
		this.modalCoverI.style.display = "none";
		this.modalCoverI.style.zIndex = 0;
		this.vp.appendChild(this.modalCoverI);
		this.modalCoverD = document.createElement("DIV");
		this.modalCoverD.className = "dhx_modal_cover_dv";
		this.modalCoverD.style.display = "none";
		this.modalCoverD.style.zIndex = 0;
		this.vp.appendChild(this.modalCoverD);
	}
	this._autoResizeViewport = function() {
		if (this.vp == document.body) { return; }
		if (this.autoViewport == false) { return; }
		this.vp.style.width = (_isIE ? document.body.offsetWidth - 4 : window.innerWidth) + "px";
		this.vp.style.height = (_isIE ? document.body.offsetHeight - 4 : window.innerHeight) + "px";
		//
		// check windows out of viewports edge
		for (var a in this.wins) {
			var win = this.wins[a];
			var overX = false;
			var overY = false;
			if (win.x > this.vp.offsetWidth - 10) {
				win.x = this.vp.offsetWidth - 10;
				overX = true;
			}
			if (win.y + this.skinParams[this.skin]["header_height"] > this.vp.offsetHeight) {
				win.y = this.vp.offsetHeight - this.skinParams[this.skin]["header_height"];
				overY = true;
			}
			if (overX || overY) {
				this._redrawWindow(win);
			}
		}
	}
	/**
	*   @desc: if true - allows object to adjust viewport automatically to document.body
	*   @param: state - true|false
	*   @type: public
	*/
	this.enableAutoViewport = function(state) {
		if (this.vp != document.body) { return; }
		this.autoViewport = state;
		if (state == false) {
			this.vp = document.createElement("DIV");
			this.vp.className = "dhtmlx_winviewport";
			this.vp.style.left = "0px";
			this.vp.style.top = "0px";
			document.body.appendChild(this.vp);
			this.vp.ax = 0;
			this.vp.ay = 0;
			this._autoResizeViewport();
			var that = this;
			if (_isIE) {
				window.attachEvent("onresize", function(){ that._autoResizeViewport(); });
			} else {
				window.addEventListener("resize", function(){ that._autoResizeViewport(); }, false);
			}
			this.vp.appendChild(this.modalCoverI);
			this.vp.appendChild(this.modalCoverD);
		}
	}
	/**
	*   @desc: sets user-defined viewport if enableAutoViewport(false)
	*   @param: x - top-left viewport corner's X-coordinate
	*   @param: y - top-left viewport corner's Y-coordinate
	*   @param: width - viewport's width
	*   @param: height - viewport's height
	*   @type: public
	*/
	this.setViewport = function(x, y, width, height, parentObj) {
		if (this.autoViewport == false) {
			this.vp.style.left = x + "px";
			this.vp.style.top = y + "px";
			this.vp.style.width = width + "px";
			this.vp.style.height = height + "px";
			// attach to parent
			if (parentObj != null) { parentObj.appendChild(this.vp); }
			this.vp.ax = getAbsoluteLeft(this.vp);
			this.vp.ay = getAbsoluteTop(this.vp);
		}
	}
	
	// windows
	/**
	*   @desc: creates new window and returns its handler
	*   @param: id - window id
	*   @param: x - top-left window corner's X-coordinate
	*   @param: y - top-left window corner's Y-coordinate
	*   @param: width - window's width
	*   @param: height - window's height
	*   @type: public
	*/
	this.createWindow = function(id, x, y, width, height) {
		var win = document.createElement("DIV");
		win.className = "dhtmlx_window_inactive";
		// move all available windows up
		for (var a in this.wins) {
			this.wins[a].zi += this.zIndexStep;
			this.wins[a].style.zIndex = this.wins[a].zi;
		}
		// bottom, bring on top will at the end of createWindow function
		win.zi = this.zIndexStep;// this._getTopZIndex(true) + this.zIndexStep;
		win.style.zIndex = win.zi;
		//
		win.active = false;
		//
		// win.that = this;
		var that = this;
		//
		win.w = width;
		win.h = height;
		win.x = x;
		win.y = y;
		this._fixWindowPositionInViewport(win);
		//
		win.style.width = win.w + "px";
		win.style.height = win.h + "px";
		win.style.left = win.x + "px";
		win.style.top = win.y + "px";
		win._isModal = false;
		// resize params
		win._allowResize = true;
		win.maxW = "auto"; // occupy all viewport on click or 
		win.maxH = "auto";
		win.minW = 200;
		win.minH = 140;
		win.iconsPresent = true;
		win.icons = new Array(this.imagePath+this.skin+"/active/icon_normal.gif", this.imagePath+this.skin+"/inactive/icon_normal.gif");
		//
		win._allowMove = true;
		win._allowMoveGlobal = true;
		win._allowResizeGlobal = true;
		//
		win._keepInViewport = false;
		//
		var skin = this.skinParams[this.skin];
		win.idd = id;
		//
		win.innerHTML = "<table border='0' cellspacing='0' cellpadding='0' width='100%' height='"+win.h+"' class='dhtmlx_wins_"+this.skin+"'>"+
					// head
					"<tr><td class='dhtmlx_wins_td_header_full' clearonselect='yes'>"+
						"<table border='0' cellspacing='0' cellpadding='0' width='100%' class='dhtmlx_wins_header' clearonselect='yes'>"+
							"<tr>"+
								"<td class='dhtmlx_wins_td_header_left' clearonselect='yes'>&nbsp;</td>"+
								"<td class='dhtmlx_wins_td_header_middle' clearonselect='yes'>&nbsp;</td>"+
								"<td class='dhtmlx_wins_td_header_right' clearonselect='yes'>&nbsp;</td>"+
							"</tr>"+
						"</table>"+
					"</td></tr>"+
					// body
					"<tr><td class='dhtmlx_wins_td_body_full' height='"+(win.h-skin["header_height"])+"'>"+
						"<table border='0' cellspacing='0' cellpadding='0' width='100%' height='"+(win.h-skin["header_height"])+"' class='dhtmlx_wins_body'>"+
							// window middle row
							"<tr>"+
								"<td class='dhtmlx_wins_body_border_middle_left' clearonselect='yes'>&nbsp;</td>"+
								"<td class='dhtmlx_wins_body_content' align='left' valign='top'><div class='dhtmlx_wins_body_content' style='width: "+(win.w-skin["border_left_width"]-skin["border_right_width"])+"px; height:"+(win.h-skin["header_height"]-skin["border_bottom_height"])+"px;'>&nbsp;</div></td>"+
								"<td class='dhtmlx_wins_body_border_middle_right' clearonselect='yes'>&nbsp;</td>"+
							"</tr>"+
							// window bottom row
							"<tr clearonselect='yes'>"+
								"<td class='dhtmlx_wins_body_border_bottom_left' clearonselect='yes'>&nbsp;</td>"+
								"<td class='dhtmlx_wins_body_border_bottom_middle' clearonselect='yes'>&nbsp;</td>"+
								"<td class='dhtmlx_wins_body_border_bottom_right' clearonselect='yes'>&nbsp;</td>"+
							"</tr>"+
						"</table>"+
					"</td></tr>"+
				"</table>"+
				// window icon
				"<img clearonselect='yes' class='dhtmlx_wins_icon_"+this.skin+"' src='"+win.icons[0]+"'>"+
				// window title
				"<div clearonselect='yes' class='dhtmlx_wins_title_"+this.skin+"'>Untitled dhtmlxWindow</div>"+
				// buttons
				"<div clearonselect='yes' class='dhtmlx_wins_buttons_"+this.skin+"'>"+
					"<table border='0' cellspacing='0' cellpadding='0'><tr></tr></table>"+
				"</div>"+
				// progress
				"<div clearonselect='yes' class='dhtmlx_wins_progress_"+this.skin+"'></div>"+
				"";
		this.vp.appendChild(win);
		win._content = win.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0];
		this._diableOnSelectInWin(win, true);
		//
		this.wins[id] = win;
		//
		win.dhx_Event = this.dhx_Event;
		win.dhx_Event();
		//
		this._makeActive(win);
		// moving
		var hdr = win.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0]; // table class='header'
		// hdr.that = this;
		// hdr.win = win;
		hdr.onmousedown = function(e) {
			if (!win._allowMove || !win._allowMoveGlobal) { return; }
			e = e || event;
			// save last coords to determine moveFinish event
			win.oldMoveX = win.x;
			win.oldMoveY = win.y;
			//
			win.moveOffsetX = win.x - e.clientX;
			win.moveOffsetY = win.y - e.clientY;
			that.movingWin = win;
			that._blockSwitcher("none");
			// cursor
			that.movingWin.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1].style.cursor = "move";
			that.movingWin.childNodes[2].style.cursor = "move";
		}
		
		hdr.ondblclick = function() {
			if (win._isParkedAllowed && win.button("park").isEnabled()) {
				that._parkWindow(win);
			}
		}
		
		var h_title = win.childNodes[2];
		h_title.onmousedown = hdr.onmousedown;
		h_title.ondblclick = hdr.ondblclick;
		
		// set text
		/**
		*   @desc: sets window's header text
		*   @param: text
		*   @type: public
		*/
		win.setText = function(text) {
			this.childNodes[2].innerHTML = text;
		}
		// get text
		/**
		*   @desc: returns window's header text
		*   @type: public
		*/
		win.getText = function() {
			return this.childNodes[2].innerHTML;
		}
		// het id by handler
		/**
		*   @desc: returns window id
		*   @type: public
		*/
		win.getId = function() {
			return this.idd;
		}
		// show
		/**
		*   @desc: shows window
		*   @type: public
		*/
		win.show = function() {
			that._showWindow(this);
		}
		// hide
		/**
		*   @desc: hides window
		*   @type: public
		*/
		win.hide = function() {
			that._hideWindow(this);
		}
		// minimize
		/**
		*   @desc: minimizes window
		*   @type: public
		*/
		win.minimize = function() {
			that._restoreWindow(this);
		}
		// maximize
		/**
		*   @desc: maximizes window
		*   @type: public
		*/
		win.maximize = function() {
			that._maximizeWindow(this);
		}
		// close
		/**
		*   @desc: closes window
		*   @type: public
		*/
		win.close = function() {
			that._closeWindow(this);
		}
		// park
		/**
		*   @desc: parks window (next action is based on window's current state)
		*   @type: public
		*/
		win.park = function() {
			if (this._isParkedAllowed) {
				that._parkWindow(this);
			}
		}
		// stick/unstick
		/**
		*   @desc: sticks window
		*   @type: public
		*/
		win.stick = function() {
			that._stickWindow(this);
		}
		/**
		*   @desc: unsticks window
		*   @type: public
		*/
		win.unstick = function() {
			that._unstickWindow(this);
		}
		/**
		*   @desc: returns true if window is sticked
		*   @type: public
		*/
		win.isSticked = function() {
			return this._isSticked;
		}
		// set icon
		/**
		*   @desc: sets window's header icon
		*   @param: iconEnabled - url to enabled icon
		*   @param: iconDisabled - url to disabled icon
		*   @type: public
		*/
		win.setIcon = function(iconEnabled, iconDisabled) {
			that._setWindowIcon(win, iconEnabled, iconDisabled);
		}
		// return array(iconEnabled, iconDisabled) icons for window
		/**
		*   @desc: returns current window's header icon
		*   @param: text
		*   @type: public
		*/
		win.getIcon = function() {
			return that._getWindowIcon(this);
		}
		// clear icon
		/**
		*   @desc: clears window's header icon
		*   @type: public
		*/
		win.clearIcon = function() {
			that._clearWindowIcons(this);
		}
		// restore default window icon according the loaded skin
		/**
		*   @desc: restores default window's header icon (based on skin)
		*   @type: public
		*/
		win.restoreIcon = function() {
			that._restoreWindowIcons(this);
		}
		//
		/**
		*   @desc: keeps window within viewport
		*   @param: state - if true - window is not allowed to be placed outside viewport, 
				    if false - window is not allowed to be placed outside viewport leaving only a small part of its header within viewport
		*   @type: public
		*/
		win.keepInViewport = function(state) {
			this._keepInViewport = state;
		}
		// ask window be/not be modal
		/**
		*   @desc: makes window modal/modeless
		*   @param: state - true|false
		*   @type: public
		*/
		win.setModal = function(state) {
			if (state == true) {
				if (that.modalWin != null || that.modalWin == this) { return; }
				that._setWindowModal(this, true);
			} else {
				if (that.modalWin != this) { return; }
				that._setWindowModal(this, false);
			}
		}
		// return true if window is modal
		/**
		*   @desc: returns true if window is modal
		*   @type: public
		*/
		win.isModal = function() {
			return this._isModal;
		}
		// return true if window is hidden
		/**
		*   @desc: returns true if window is hidden
		*   @type: public
		*/
		win.isHidden = function() {
			return that._isWindowHidden(this);
		}
		// return true if window is maximized
		/**
		*   @desc: returns true if window is maximized
		*   @type: public
		*/
		win.isMaximized = function() {
			return this._isMaximized;
		}
		// return true if window is parkded
		/**
		*   @desc: returns true if window is parked
		*   @type: public
		*/
		win.isParked = function() {
			return this._isParked;
		}
		// allow/deny park
		/**
		*   @desc: allows window to be parked
		*   @type: public
		*/
		win.allowPark = function() {
			that._allowParking(this);
		}
		/**
		*   @desc: denies window from parking
		*   @type: public
		*/
		win.denyPark = function() {
			that._denyParking(this);
		}
		/**
		*   @desc: returns true if window is parkable
		*   @type: public
		*/
		win.isParkable = function() {
			return this._isParkedAllowed;
		}
		// allow/deny for allow window to be resized
		/**
		*   @desc: allows window to be resized
		*   @type: public
		*/
		win.allowResize = function() {
			that._allowReszieGlob(this);
		}
		/**
		*   @desc: denies window from resizing
		*   @type: public
		*/
		win.denyResize = function() {
			that._denyResize(this);
		}
		// return true if window resizeable
		/**
		*   @desc: returns true if window is resizable
		*   @type: public
		*/
		win.isResizable = function() {
			return this._allowResizeGlobal;
		}
		// move
		/**
		*   @desc: allows window to be moved
		*   @type: public
		*/
		win.allowMove = function() {
			if (!this._isMaximized) { this._allowMove = true; }
			this._allowMoveGlobal = true;
		}
		/**
		*   @desc: denies window from moving
		*   @type: public
		*/
		win.denyMove = function() {
			this._allowMoveGlobal = false;
		}
		/**
		*   @desc: returns true if window is movable
		*   @type: public
		*/
		win.isMovable = function() {
			return this._allowMoveGlobal;
		}
		// bring window to top and set focus
		/**
		*   @desc: brings/sends window on top (z-positioning)
		*   @type: public
		*/
		win.bringToTop = function() {
			that._bringOnTop(this);
			that._makeActive(this);
		}
		// bring window to bottom and set focus
		/**
		*   @desc: brings/sends window to bottom (z-positioning)
		*   @type: public
		*/
		win.bringToBottom = function() {
			that._bringOnBottom(this);
		}
		// return true if window is on top
		/**
		*   @desc: returns true if window is on top
		*   @type: public
		*/
		win.isOnTop = function() {
			return that._isWindowOnTop(this);
		}
		// return true if window if on bottom
		/**
		*   @desc: returns true if window is on bottom
		*   @type: public
		*/
		win.isOnBottom = function() {
			return that._isWindowOnBottom(this);
		}
		// set new position for window, if it will outlay the viewport it was moved into it visible area
		/**
		*   @desc: sets window position (moves window to the point set by user)
		*   @param: x - x coordinate
		*   @param: y - y coordinate
		*   @type: public
		*/
		win.setPosition = function(x, y) {
			this.x = x;
			this.y = y;
			that._fixWindowPositionInViewport(this);
			// fixing mozilla artefakts
			if (_isFF) {
				this.h++;
				that._redrawWindow(this);
				this.h--;
			}
			that._redrawWindow(this);
		}
		// return array(x, y) with position of window
		/**
		*   @desc: returns current window position
		*   @type: public
		*/
		win.getPosition = function() {
			return new Array(this.x, this.y);
		}
		// set new dimension for window, if it will outlay the viewport it was moved into it visible area
		/**
		*   @desc: sets window dimension
		*   @param: width
		*   @param: height
		*   @type: public
		*/
		win.setDimension = function(width, height) {
			this.w = width;
			this.h = height;
			that._fixWindowDimensionInViewport(this);
			that._fixWindowPositionInViewport(this);
			that._redrawWindow(this);
		}
		// return array(width, height) with current dimension of window
		/**
		*   @desc: returns current window dimension
		*   @type: public
		*/
		win.getDimension = function() {
			return new Array(this.w, this.h);
		}
		// set max dimension for window
		/**
		*   @desc: sets max window dimension
		*   @param: maxWidth
		*   @param: maxHeight
		*   @type: public
		*/
		win.setMaxDimension = function(maxWidth, maxHeight) {
			this.minW = "auto"; // maxWidth;
			this.minH = "auto"; // maxHeight;
			that._redrawWindow(this);
		}
		// return array(maxWidth, maxheight) with max dimension for window
		/**
		*   @desc: returns current max window dimension
		*   @type: public
		*/
		win.getMaxDimension = function() {
			return new Array(this.maxW, this.maxH);
		}
		// set min dimensuion for window
		/**
		*   @desc: sets min window dimension
		*   @param: minWidth
		*   @param: minHeight
		*   @type: public
		*/
		win.setMinDimension = function(minWidth, minHeight) {
			this.minW = minWidth;
			this.minH = minHeight;
			that._fixWindowDimensionInViewport(this);
			that._redrawWindow(this);
		}
		// return array(minWidth, minHeight) with min dimension for window
		/**
		*   @desc: returns current min window dimension
		*   @type: public
		*/
		win.getMinDimension = function() {
			return new Array(this.minW, this.minH);
		}
		// add user button
		/**
		*   @desc: adds user button
		*   @param: id - button id
		*   @param: pos - button position
		*   @param: title - button tooltip
		*   @param: label - button name (according to css)
		*   @type: public
		*/
		win.addUserButton = function(id, pos, title, label) {
			var userBtn = that._addUserButton(this, id, pos, title, label);
			return userBtn;
		}
		// remove user button
		/**
		*   @desc: removes user button
		*   @param: id - button id
		*   @type: public
		*/
		win.removeUserButton = function(id) {
			if (!((id == "minmax1") || (id == "minmax2") || (id == "park") || (id == "close") || (id == "stick") || (id == "unstick") || (id == "help"))) {
				var btn = this.button(id);
				// if (btn != null) { that._removeUserButton(win, id, btn); }
				if (btn != null) { that._removeUserButton(this, id, btn); }
			}
		}
		/**
		*   @desc: show progress indicator
		*   @type: public
		*/
		win.progressOn = function() {
			that._switchProgress(this, true);
		}
		/**
		*   @desc: hide progress indicator
		*   @type: public
		*/
		win.progressOff = function() {
			that._switchProgress(this, false);
		}
		/**
		*   @desc: attach status bar to a window
		*   @type: public
		*/
		win.attachStatusBar = function(obj, show) {
			var bar = document.getElementById(obj);
			that._attachStatusBar(this, bar, show);
		}
		/**
		*   @desc: attach dhtmlxWebMenu to a window
		*   @type: public
		*/
		win.attachWebMenu = function() {
			return that._attachWebMenu(this);
		}
		/**
		*   @desc: attach dhtmlxWebTollbar to a window
		*   @type: public
		*/
		win.attachWebToolbar = function() {
			return that._attachWebToolbar(this);
		}
		win.progressOff();
		// resize cursor modifications and handlers
		win.canStartResize = false;
		win.onmousemove = function(e) {
			// resize not allowed
			if ((!this._allowResize) || (this._allowResizeGlobal == false)) {
				this.canStartResize = false;
				this.style.cursor = "";
				return;
			}
			
			if (that.resizingWin != null) { return; }
			if (this._isParked) { return; }
			//
			e = e || event;
			var targetObj = e.target || e.srcElement;
			//
			var useDefaultCursor = true;
			this.canStartResize = true;
			//
			var skin = that.skinParams[that.skin];
			var hh = skin["header_height"];
			var bwl = skin["border_left_width"] + 2;
			var bwr = skin["border_right_width"] + 2;
			var bhb = skin["border_bottom_height"] + 2;
			// left border
			if (targetObj.className == "dhtmlx_wins_body_border_middle_left") {
				that.resizingDirs = "border_left";
				this.style.cursor = "w-resize";
				this.resizeOffsetX = this.x - e.clientX;
				useDefaultCursor = false;
			}
			// right border
			if (targetObj.className == "dhtmlx_wins_body_border_middle_right") {
				that.resizingDirs = "border_right";
				this.style.cursor = "e-resize";
				this.resizeOffsetXW = this.x + this.w - e.clientX;
				useDefaultCursor = false;
			}
			// bottom border
			if (targetObj.className == "dhtmlx_wins_body_border_bottom_middle") {
				that.resizingDirs = "border_bottom";
				this.style.cursor = "n-resize";
				this.resizeOffsetYH = this.y + this.h - e.clientY;
				useDefaultCursor = false;
			}
			// corner left
			if (targetObj.className == "dhtmlx_wins_body_border_bottom_left") {
				that.resizingDirs = "corner_left";
				this.style.cursor = "sw-resize";
				this.resizeOffsetX = this.x - e.clientX;
				this.resizeOffsetYH = this.y + this.h - e.clientY;
				useDefaultCursor = false;
			}
			// corner right
			if (targetObj.className == "dhtmlx_wins_body_border_bottom_right") {
				that.resizingDirs = "corner_right";
				this.style.cursor = "nw-resize";
				this.resizeOffsetXW = this.x + this.w - e.clientX;
				this.resizeOffsetYH = this.y + this.h - e.clientY;
				useDefaultCursor = false;
			}
			
			// no matching elements
			if (useDefaultCursor) {
				this.canStartResize = false;
				this.style.cursor = "";
			}
		}
		win.onmousedown = function() {
			that._makeActive(this);
			that._bringOnTop(this);
			if (this.canStartResize) {
				that._blockSwitcher("none");
				that.resizingWin = this;
			}
		}
		// add buttons
		this._addDefaultButtons(win);
		//
		// return button handler
		win.button = function(id) {
			var b = null;
			if (this.btns[id] != null) { b = this.btns[id]; }
			return b;
		}
		//
		// attach content obj|url
		/**
		*   @desc: attaches object into window
		*   @param: objId - object id
		*   @param: changeDisp - removes style="display: none;" after adding
		*   @type: public
		*/
		win.attachObject = function(objId, changeDisp) {
			that._attachContent(this, "obj", document.getElementById(objId), changeDisp);
		}
		/**
		*   @desc: attaches url into window
		*   @param: url
		*   @type: public
		*/
		win.attachURL = function(url) {
			that._attachContent(this, "url", url, false);
		}
		/**
		*   @desc: centring window in viewport
		*   @type: public
		*/
		win.center = function() {
			that._centerWindow(this);
		}
		//
		this._attachContent(win, "empty", null, false);
		win.bringToTop();
		//
		return this.wins[id];
	}
	
	this._diableOnSelectInWin = function(obj, state) {
		for (var q=0; q<obj.childNodes.length; q++) {
			var child = obj.childNodes[q];
			if ((child.tagName == "TD") || (child.tagName == "TR") || (child.tagName == "TABLE")  || (child.tagName == "DIV")) {
				if (child.getAttribute("clearonselect") != null) {
					if (state) {
						child.onselectstart = function(e) { e = e || event; e.returnValue = false; }
						
					} else {
						child.onselectstart = null;
					}
				}
			}
			if (child.childNodes.length > 0) { this._diableOnSelectInWin(child); }
		}
	}
	
	this._redrawWindow = function(win) {
		win.style.left = win.x + "px";
		win.style.top = win.y + "px";
		// win.style.width = win.w + "px";
		// win.style.height = win.h + "px";
		win.style.width = (win.w == "100%" ? win.w : win.w+"px");
		win.style.height = (win.h == "100%" ? win.h : win.h+"px");
		if (win.w == "100%") {
			var winW = "100%";
			win.w = win.offsetWidth;
		}
		if (win.h == "100%") {
			var winH = "100%";
			win.h = win.offsetHeight;
		}
		// inner elements
		win.childNodes[0].style.height = win.h + "px";
		var p = win.childNodes[0].childNodes[0].childNodes[1].childNodes[0];
		var s = this.skinParams[this.skin];
		p.style.height = win.h-s["header_height"] + "px";
		p.childNodes[0].style.height = win.h-s["header_height"] + "px";
		// title width
		// win.childNodes[2].className = "title_"+this.skin;
		var wdth = win.childNodes[3].offsetLeft - win.childNodes[2].offsetLeft - 5;
		if (wdth < 0) { wdth = 0; }
		win.childNodes[2].style.width = wdth + "px";
		// console.log(1);
		// content div
		var w = win.w - s["border_left_width"] - s["border_right_width"];
		var h = win.h - s["header_height"] - s["border_bottom_height"];
		if (w < 0) { w = 0; }
		if (h < 0) { h = 0; }
		//
		var bd = p.childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0];
		//
		if (win._manageAddons) {
			win._manageAddons(w, h);
		} else {
			bd.style.width = w + "px";
			bd.style.height = h + "px";
		}
		if (winW != null) { win.w = winW; }
		if (winH != null) { win.h = winH; }
	}
	
	this.zIndexStep = 50;
	this._getTopZIndex = function(ignoreSticked) {
		var topZIndex = 0;
		for (var a in this.wins) {
			if (ignoreSticked == true) {
				if (this.wins[a].zi > topZIndex) { topZIndex = this.wins[a].zi; }
			} else {
				if (this.wins[a].zi > topZIndex && !this.wins[a]._isSticked) { topZIndex = this.wins[a].zi; }
			}
		}
		return topZIndex;
	}
	
	this.movingWin = null;
	
	this._moveWindow = function(e) {
		
		if (this.movingWin != null ) {
			//
			if (!this.movingWin._allowMove || !this.movingWin._allowMoveGlobal) { return; }
			//
			this.movingWin.oldMoveX = this.movingWin.x;
			this.movingWin.oldMoveY = this.movingWin.y;
			//
			this.movingWin.x = e.clientX + this.movingWin.moveOffsetX;
			this.movingWin.y = e.clientY + this.movingWin.moveOffsetY;
			//
			// check out of viewport
			this._fixWindowPositionInViewport(this.movingWin);
			//
			this._redrawWindow(this.movingWin);
			//
			if (this._compoEnabled) { this._compoFixMove(this.movingWin); }
		}
		
		if (this.resizingWin != null) {
			//
			if (!this.resizingWin._allowResize) { return; }
			//
			// resize through left border
			if (this.resizingDirs == "border_left" || this.resizingDirs == "corner_left") {
				var ofs = e.clientX + this.resizingWin.resizeOffsetX;
				var sign = (ofs > this.resizingWin.x ? -1 : 1);
				newW = this.resizingWin.w + Math.abs(ofs - this.resizingWin.x)*sign;
				if ((newW < this.resizingWin.minW) && (sign < 0)) {
					this.resizingWin.x = this.resizingWin.x + this.resizingWin.w - this.resizingWin.minW;
					this.resizingWin.w = this.resizingWin.minW;
				} else {
					this.resizingWin.w = newW;
					this.resizingWin.x = ofs;
				}
				this._redrawWindow(this.resizingWin);
			}
			// resize through right border
			if (this.resizingDirs == "border_right" || this.resizingDirs == "corner_right") {
				var ofs = e.clientX - (this.resizingWin.x + this.resizingWin.w) + this.resizingWin.resizeOffsetXW;
				newW = this.resizingWin.w + ofs;
				if (newW < this.resizingWin.minW) { newW = this.resizingWin.minW; }
				this.resizingWin.w = newW;
				this._redrawWindow(this.resizingWin);
			}
			// resize through bottom border
			if (this.resizingDirs == "border_bottom" || this.resizingDirs == "corner_left" || this.resizingDirs == "corner_right") {
				var ofs = e.clientY - (this.resizingWin.y + this.resizingWin.h) + this.resizingWin.resizeOffsetYH;
				newH = this.resizingWin.h + ofs;
				if (newH < this.resizingWin.minH) { newH = this.resizingWin.minH; }
				this.resizingWin.h = newH;
				
				if (this._compoEnabled) {
					this._compoFixResize(this.resizingWin, this.resizingDirs);
				} else {
					this._redrawWindow(this.resizingWin);
				}
				//
			}
			//
			// if (this._compoEnabled) { this._compoFixResize(this.resizingWin, this.resizingDirs); }
		}
	}
	
	// check viewport overflow
	this._fixWindowPositionInViewport = function(win) {
		if (win._keepInViewport) { // keep strongly in viewport
			if (win.x < 0) { win.x = 0; }
			if (win.x + win.w > this.vp.offsetWidth) { win.x = this.vp.offsetWidth - win.w; }
			if (win.y < 0) { win.y = 0; }
			if (win.y + win.h > this.vp.offsetHeight) { win.y = this.vp.offsetHeight - win.h; }
		} else {
			if (win.y < 0) { win.y = 0; }
			if (win.y + this.skinParams[this.skin]["header_height"] > this.vp.offsetHeight) { win.y = this.vp.offsetHeight - this.skinParams[this.skin]["header_height"]; }
			if (win.x + win.w - 10 < 0) { win.x = 10 - win.w; }
			if (win.x > this.vp.offsetWidth - 10) { win.x = this.vp.offsetWidth - 10; }
		}
	}
	
	// check and correct window dimensions
	this._fixWindowDimensionInViewport = function(win) {
		if (win.w < win.minW) { win.w = win.minW; }
		if (win.h < win.minH) { win.h = win.minH; }
	}
	
	this._stopMove = function() {
		if (this.movingWin != null) {
			var win = this.movingWin;
			this.movingWin = null;
			this._blockSwitcher("");
			// cursor
			win.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1].style.cursor = "";
			win.childNodes[2].style.cursor = "";
			// fixing mozilla artefakts
			if (_isFF) {
				win.h++;
				this._redrawWindow(win);
				win.h--;
				this._redrawWindow(win);
			}
			// events
			if (!(win.oldMoveX == win.x && win.oldMoveY == win.y)) {
				//
				if (win.checkEvent("onMoveFinish")) {
					win.callEvent("onMoveFinish",[win]);
				} else {
					this.callEvent("onMoveFinish",[win]);
				}
			}
		}
		if (this.resizingWin != null) {
			var win = this.resizingWin;
			this.resizingWin = null;
			this._blockSwitcher("");
			// events
			if (win.checkEvent("onResizeFinish")) {
				win.callEvent("onResizeFinish",[win]);
			} else {
				this.callEvent("onResizeFinish",[win]);
			}
		}
	}
	
	this._bringOnTop = function(win) {
		var cZIndex = win.zi;
		var topZIndex = this._getTopZIndex(win._isSticked);
		for (var a in this.wins) {
			if (this.wins[a] != win) {
				if (win._isSticked || (!win._isSticked && !this.wins[a]._isSticked)) {
					if (this.wins[a].zi > cZIndex) {
						this.wins[a].zi = this.wins[a].zi - this.zIndexStep;
						this.wins[a].style.zIndex = this.wins[a].zi;
					}
				}
			}
		}
		win.zi = topZIndex;
		win.style.zIndex = win.zi;
	}
	
	this._makeActive = function(win) {
		for (var a in this.wins) {
			if (this.wins[a] == win) {
				var needEvent = false;
				if (this.wins[a].className != "dhtmlx_window_active") { needEvent = true; }
				this.wins[a].className = "dhtmlx_window_active";
				this.wins[a].childNodes[1].src = this.wins[a].icons[0];
				if (needEvent == true) {
					if (win.checkEvent("onFocus")) {
						win.callEvent("onFocus",[win]);
					} else {
						this.callEvent("onFocus",[win]);
					}
				}
			} else {
				this.wins[a].className = "dhtmlx_window_inactive";
				this.wins[a].childNodes[1].src = this.wins[a].icons[1];
			}
		}
	}
	
	this._getActive = function() {
		var win = null;
		for (var a in this.wins) {
			if (this.wins[a].className == "dhtmlx_window_active") {
				win = this.wins[a];
			}
		}
		return win;
	}
	
	this._centerWindow = function(win) {
		if (win._isMaximized == true) { return; }
		if (win._isParked == true) { return; }
		var vpw = (this.vp == document.body ? document.body.offsetWidth : parseInt(this.vp.style.width));
		var vph = (this.vp == document.body ? document.body.offsetHeight : parseInt(this.vp.style.height));
		var newX = Math.round((vpw/2) - (win.w/2));
		var newY = Math.round((vph/2) - (win.h/2));
		win.x = newX;
		win.y = newY;
		this._fixWindowPositionInViewport(win);
		this._redrawWindow(win);
	}
	
	this._switchProgress = function(win, state) {
		if (state == true) {
			win.childNodes[1].style.display = "none";
			win.childNodes[4].style.display = "";
		} else {
			win.childNodes[4].style.display = "none";
			win.childNodes[1].style.display = "";
		}
	}
	
	this._addDefaultButtons = function(win) {
		
		var that = this;
		
		// stick
		var btnStick = document.createElement("DIV");
		btnStick.className = "button_stick_default";
		btnStick.title = "Stick";
		btnStick.isVisible = false;
		btnStick._isEnabled = true;
		btnStick.isPressed = false;
		win._isSticked = false;
		btnStick.label = "stick";
		btnStick._doOnClick = function() {
			this.isPressed = true;
			that._stickWindow(win);
		}
		
		// sticked
		var btnSticked = document.createElement("DIV");
		btnSticked.className = "button_sticked_default";
		btnSticked.title = "Unstick";
		btnSticked.isVisible = false;
		btnSticked._isEnabled = true;
		btnSticked.isPressed = false;
		btnSticked.label = "sticked";
		btnSticked._doOnClick = function() {
			this.isPressed = false;
			that._unstickWindow(win);
		}
		
		// help
		var btnHelp = document.createElement("DIV");
		btnHelp.className = "button_help_default";
		btnHelp.title = "Help";
		btnHelp.isVisible = false;
		btnHelp._isEnabled = true;
		btnHelp.isPressed = false;
		btnHelp.label = "help";
		btnHelp.that = this;
		btnHelp._doOnClick = function() { that._needHelp(win); }
		
		// park
		var btnPark = document.createElement("DIV");
		btnPark.className = "button_park_default";
		btnPark.titleIfParked = "Park Down";
		btnPark.titleIfNotParked = "Park Up";
		btnPark.title = btnPark.titleIfNotParked;
		btnPark.isVisible = true;
		btnPark._isEnabled = true;
		btnPark.isPressed = false;
		btnPark.label = "park";
		win._isParked = false;
		win._isParkedAllowed = true;
		btnPark._doOnClick = function() { that._parkWindow(win); }
		
		// minmax maximize
		var btnMinMax1 = document.createElement("DIV");
		btnMinMax1.className = "button_minmax1_default";
		btnMinMax1.title = "Maximize";
		btnMinMax1.isVisible = true;
		btnMinMax1._isEnabled = true;
		btnMinMax1.isPressed = false;
		btnMinMax1.label = "minmax1";
		win._isMaximized = false;
		btnMinMax1._doOnClick = function() { that._maximizeWindow(win); }
		
		// minmax restore
		var btnMinMax2 = document.createElement("DIV");
		btnMinMax2.className = "button_minmax2_default";
		btnMinMax2.title = "Restore";
		btnMinMax2.isVisible = false;
		btnMinMax2._isEnabled = true;
		btnMinMax2.isPressed = false;
		btnMinMax2.label = "minmax2";
		btnMinMax2._doOnClick = function() { that._restoreWindow(win); }
		
		// close
		var btnClose = document.createElement("DIV");
		btnClose.className = "button_close_default";
		btnClose.title = "Close";
		btnClose.isVisible = true;
		btnClose._isEnabled = true;
		btnClose.isPressed = false;
		btnClose.label = "close";
		btnClose._doOnClick = function() { that._closeWindow(win); }
		
		//
		win.btns = {};
		win.btns["stick"] = btnStick;
		win.btns["sticked"] = btnSticked;
		win.btns["help"] = btnHelp;
		win.btns["park"] = btnPark;
		win.btns["minmax1"] = btnMinMax1;
		win.btns["minmax2"] = btnMinMax2;
		win.btns["close"] = btnClose;
		
		var b = win.childNodes[3].childNodes[0].childNodes[0].childNodes[0];
		
		// events
		for (var a in win.btns) {
			
			var btn = win.btns[a];
			
			// add on header
			var td = document.createElement("TD");
			td.className = "dhtmlx_wins_btn_" + (btn.isVisible ? "visible" : "hidden");
			b.appendChild(td);
			td.appendChild(btn);
			
			// attach events
			this._attachEventsOnButton(win, btn);
		}
	}
	
	this._attachEventsOnButton = function(win, btn) {
		// add events
		
		btn.onmouseover = function() {
			if (this._isEnabled) {
				this.className = "button_"+this.label+"_over_" + (this.isPressed ? "pressed": "default");
			} else {
				this.className = "button_"+this.label+"_disabled";
			}
		}
		btn.onmouseout = function() {
			if (this._isEnabled) {
				this.isPressed = false;
				this.className = "button_"+this.label+"_default";
			} else {
				this.className = "button_"+this.label+"_disabled";
			}
		}
		btn.onmousedown = function() {
			if (this._isEnabled) {
				this.isPressed = true;
				this.className = "button_"+this.label+"_over_pressed";
			} else {
				this.className = "button_"+this.label+"_disabled";
			}
		}
		btn.onmouseup = function() {
			if (this._isEnabled) {
				var wasPressed = this.isPressed;
				this.isPressed = false;
				this.className = "button_"+this.label+"_over_default";
				if (wasPressed) {
					// events
					if (this.checkEvent("onClick")) {
						this.callEvent("onClick", [this.win, this]);
					} else {
						this._doOnClick();
					}
				}
			} else {
				this.className = "button_"+this.label+"_disabled";
			}
		}
		var that = this;
/**
*   @desc: show button
*   @type:  public
*/
		btn.show = function() {
			that._showButton(win, this.label);
		}
/**
*   @desc: hide button
*   @type:  public
*/
		btn.hide = function() {
			that._hideButton(win, this.label);
		}
/**
*   @desc: enable button
*   @type:  public
*/

		btn.enable = function() {
			that._enableButton(win, this.label);
		}

/**
*   @desc: disable button
*   @type:  public
*/
		btn.disable = function() {
			that._disableButton(win, this.label);
		}
/**
*   @desc: check if button is enabled
*	@returns: true if enabled, otherwise - false
*   @type:  public
*/
		btn.isEnabled = function() {
			return this._isEnabled;
		}

/**
*   @desc: check if button is hidden
*	@returns: true if hidden, otherwise - false
*   @type:  public
*/
		btn.isHidden = function() {
			return (!this.isVisible);
		}
		btn.dhx_Event = this.dhx_Event;
		btn.dhx_Event();
	}
	
	this._parkWindow = function(win) {
		if (!win._isParkedAllowed) { return; }
		if (this.enableParkEffect && win.parkBusy) { return; }
		if (win._isParked) {
			if (this.enableParkEffect) {
				win.parkBusy = true;
				// win.childNodes[0].childNodes[0].childNodes[1].style.display = "";
				win.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].style.display = "";
				this._doParkDown(win);
			} else {
				win.h = win.lastParkH;
				win.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].style.display = "";
				win.btns["park"].title = win.btns["park"].titleIfNotParked;
				if (win._allowResizeGlobal == true) {
					this._enableButton(win, "minmax1");
					this._enableButton(win, "minmax2");
				}
			}
		} else {
			win.lastParkH = win.h;
			if (win._allowResizeGlobal == true) {
				this._disableButton(win, "minmax1");
				this._disableButton(win, "minmax2");
			}
			//
			if (this.enableParkEffect) {
				win.parkBusy = true;
				this._doParkUp(win);
			} else {
				win.h = this.skinParams[this.skin]["header_height"] + this.skinParams[this.skin]["border_bottom_height"];
				win.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].style.display = "none";
				win.btns["park"].title = win.btns["park"].titleIfParked;
			}
		}
		if (!this.enableParkEffect) {
			win._isParked = !win._isParked;
			this._redrawWindow(win);
			// events
			if (!win._isParked) {
				// onParkDown event
				if (win.checkEvent("onParkDown")) {
					win.callEvent("onParkDown", [win]);
				} else {
					this.callEvent("onParkDown", [win]);
				}
			} else {
				// onParkUp event
				if (win.checkEvent("onParkUp")) {
					win.callEvent("onParkUp", [win]);
				} else {
					this.callEvent("onParkUp", [win]);
				}
			}
		}
	}
	
	this._allowParking = function(win) {
		win._isParkedAllowed = true;
		this._enableButton(win, "park");
	}
	this._denyParking = function(win) {
		win._isParkedAllowed = false;
		this._disableButton(win, "park");
	}
	
	// park with effects
	this.enableParkEffect = true;
	this.parkStartSpeed = 80;
	this.parkSpeed = this.parkStartSpeed;
	this.parkTM = null;
	this.parkTMTime = 5;
	
	this._doParkUp = function(win) {
		win.h -= this.parkSpeed;
		if (win.h <= this.skinParams[this.skin]["header_height"] + this.skinParams[this.skin]["border_bottom_height"]) {
			// end purkUp
			win.h = this.skinParams[this.skin]["header_height"] + this.skinParams[this.skin]["border_bottom_height"];
			// win.childNodes[0].childNodes[0].childNodes[1].style.display = "none";
			win.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].style.display = "none";
			win.btns["park"].title = win.btns["park"].titleIfParked;
			win._isParked = true;
			win.parkBusy = false;
			this._redrawWindow(win, true);
			// onParkUp event
			if (win.checkEvent("onParkUp")) {
				win.callEvent("onParkUp", [win]);
			} else {
				this.callEvent("onParkUp", [win]);
			}
		} else {
			// continue purkUp
			this._redrawWindow(win);
			var that = this;
			this.parkTM = window.setTimeout(function(){ that._doParkUp(win); }, this.parkTMTime);
		}
	}
	
	this._doParkDown = function(win) {
		win.h += this.parkSpeed;
		if (win.h >= win.lastParkH) {
			win.h = win.lastParkH;
			win.btns["park"].title = win.btns["park"].titleIfNotParked;
			if (win._allowResizeGlobal == true) {
				this._enableButton(win, "minmax1");
				this._enableButton(win, "minmax2");
			}
			win._isParked = false;
			win.parkBusy = false;
			this._redrawWindow(win);
			// onParkDown event
			if (win.checkEvent("onParkDown")) {
				win.callEvent("onParkDown", [win]);
			} else {
				this.callEvent("onParkDown", [win]);
			}
		} else {
			// continue purkDown
			this._redrawWindow(win);
			var that = this;
			this.parkTM = window.setTimeout(function(){ that._doParkDown(win); }, this.parkTMTime);
		}
	}
	
	this._enableButton = function(win, btn) {
		win.btns[btn]._isEnabled = true;
		win.btns[btn].className = "button_"+win.btns[btn].label+"_default";
	}
	
	this._disableButton = function(win, btn) {
		win.btns[btn]._isEnabled = false;
		win.btns[btn].className = "button_"+win.btns[btn].label+"_disabled";
	}
	
	// resize
	
	this._allowReszieGlob = function(win) {
		win._allowResizeGlobal = true;
		this._enableButton(win, "minmax1");
		this._enableButton(win, "minmax2");
	}
	
	this._denyResize = function(win) {
		win._allowResizeGlobal = false;
		this._disableButton(win, "minmax1");
		this._disableButton(win, "minmax2");
	}
	
	this._maximizeWindow = function(win) {
		if (win._allowResizeGlobal == false) { return; }
		win.lastMaximizeX = win.x;
		win.lastMaximizeY = win.y;
		win.lastMaximizeW = win.w;
		win.lastMaximizeH = win.h;
		win.x = 0;
		win.y = 0;
		win._isMaximized = true;
		win._allowMove = false;
		win._allowResize = false;
		// win.w = (win.maxW == "auto" ? (this.vp == document.body ? document.body.offsetWidth:parseInt(this.vp.style.width)) : win.maxW);
		// win.h = (win.maxH == "auto" ? (this.vp == document.body ? document.body.offsetHeight:parseInt(this.vp.style.height)) : win.maxH);
		//
		win.w = (win.maxW == "auto" ? (this.vp == document.body ? "100%" : parseInt(this.vp.style.width)) : win.maxW);
		win.h = (win.maxH == "auto" ? (this.vp == document.body ? "100%" : parseInt(this.vp.style.height)) : win.maxH);
		//
		this._hideButton(win, "minmax1");
		this._showButton(win, "minmax2");
		this._redrawWindow(win);
		// event
		if (win.checkEvent("onMaximize")) {
			win.callEvent("onMaximize", [win]);
		} else {
			this.callEvent("onMaximize", [win]);
		}
	}
	
	this._restoreWindow = function(win) {
		if (win._allowResizeGlobal == false) { return; }
		win.x = win.lastMaximizeX;
		win.y = win.lastMaximizeY;
		win.w = win.lastMaximizeW;
		win.h = win.lastMaximizeH;
		win._isMaximized = false;
		win._allowMove = win._allowMoveGlobal;
		win._allowResize = true;
		this._hideButton(win, "minmax2");
		this._showButton(win, "minmax1");
		this._redrawWindow(win);
		// event
		if (win.checkEvent("onMinimize")) {
			win.callEvent("onMinimize", [win]);
		} else {
			this.callEvent("onMinimize", [win]);
		}
	}
	
	this._showButton = function(win, btn) {
		win.btns[btn].isVisible = true;
		win.btns[btn].parentNode.className = "dhtmlx_wins_btn_visible";
	}
	
	this._hideButton = function(win, btn) {
		win.btns[btn].isVisible = false;
		win.btns[btn].parentNode.className = "dhtmlx_wins_btn_hidden";
	}
	
	this._showWindow = function(win) {
		win.style.display = "";
		// event
		if (win.checkEvent("onShow")) {
			win.callEvent("onShow", [win]);
		} else {
			this.callEvent("onShow", [win]);
		}
		// fixed 24.03.2008
		var w = this._getActive();
		if (w == null) {
			this._bringOnTop(win);
			this._makeActive(win);
		} else if (this._isWindowHidden(w)) {
			this._bringOnTop(win);
			this._makeActive(win);
		}
	}
	
	this._hideWindow = function(win) {
		win.style.display = "none";
		// event
		if (win.checkEvent("onHide")) {
			win.callEvent("onHide", [win]);
		} else {
			this.callEvent("onHide", [win]);
		}
		// fixed 24.03.2008
		var w = this.getTopmostWindow(true);
		if (w != null) {
			this._bringOnTop(w);
			this._makeActive(w);
		}
	}
	
	this._isWindowHidden = function(win) {
		var isHidden = (win.style.display == "none");
		return isHidden;
	}
	
	this._closeWindow = function(win) {
		// event
		if (win.checkEvent("onClose")) {
			if (!win.callEvent("onClose", [win])) return;
		} else {
			if(!this.callEvent("onClose", [win])) return;
		}
		// closing
		for (var a in win.btns) { this._removeButtonGlobal(win, a, win.btns[a]); }
		this._removeWindowGlobal(win);
		/*
		this.vp.removeChild(win);
		delete this.wins[win.idd];
		// make active latest window
		*/
		var latest = { "zi": 0 };
		for (var a in this.wins) { if (this.wins[a].zi > latest.zi) { latest = this.wins[a]; } }
		if (latest != null) { this._makeActive(latest); }
	}
	
	this._needHelp = function(win) {
		// event only
		if (win.checkEvent("onHelp")) {
			win.callEvent("onHelp", [win]);
		} else {
			this.callEvent("onHelp", [win]);
		}
	}
	
	this._attachContent = function(win, type, obj, state) {
		// clear old content
		/*
		var winContent = win.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0];
		while (winContent.childNodes.length > 0) { winContent.removeChild(winContent.childNodes[0]); }
		// attach
		if (type == "url") {
			//
			var fr = document.createElement("IFRAME");
			fr.frameBorder = 0;
			fr.border = 0;
			fr.style.width = "100%";
			fr.style.height = "100%";
			fr.src = obj;
			winContent.appendChild(fr);
			//
		} else if (type == "obj") {
			winContent.appendChild(obj);
			if (state) { obj.style.display = ""; }
		}
		var cover = document.createElement("DIV");
		cover.className = "dhx_content_cover_blocker";
		cover.style.display = "none";
		winContent.appendChild(cover);
		*/
		while (win._content.childNodes.length > 0) { win._content.removeChild(win._content.childNodes[0]); }
		// attach
		if (type == "url") {
			//
			var fr = document.createElement("IFRAME");
			fr.frameBorder = 0;
			fr.border = 0;
			fr.style.width = "100%";
			fr.style.height = "100%";
			fr.src = obj;
			win._content.appendChild(fr);
			//
		} else if (type == "obj") {
			win._content.appendChild(obj);
			if (state) { obj.style.display = ""; }
		}
		var cover = document.createElement("DIV");
		cover.className = "dhx_content_cover_blocker";
		cover.style.display = "none";
		win._content.appendChild(cover);
	}
	
	this._setWindowIcon = function(win, iconEnabled, iconDisabled) {
		win.iconsPresent = true;
		win.icons[0] = this.imagePath + iconEnabled;
		win.icons[1] = this.imagePath + iconDisabled;
		win.childNodes[1].src = win.icons[win.isOnTop()?0:1];
	}
	
	this._getWindowIcon = function(win) {
		if (win.iconsPresent) {
			return new Array(win.icons[0], win.icons[1]);
		} else {
			return new Array(null, null);
		}
	}
	
	this._clearWindowIcons = function(win) {
		win.iconsPresent = false;
		win.icons[0] = this.imagePath + this.skin + "/active/icon_blank.gif";
		win.icons[1] = this.imagePath + this.skin + "/inactive/icon_blank.gif";
		win.childNodes[1].src = win.icons[win.isOnTop()?0:1];
	}
	
	this._restoreWindowIcons = function(win) {
		win.iconsPresent = true;
		win.icons[0] = this.imagePath + this.skin + "/active/icon_normal.gif";
		win.icons[1] = this.imagePath + this.skin + "/inactive/icon_normal.gif";
		win.childNodes[1].src = win.icons[win.isOnTop()?0:1];
	}
	
	this._isWindowOnTop = function(win) {
		var state = (this.getTopmostWindow() == win);
		return state;
	}
	
	this._bringOnBottom = function(win) {
		for (var a in this.wins) {
			if (this.wins[a].zi < win.zi) {
				this.wins[a].zi += this.zIndexStep;
				this.wins[a].style.zIndex = this.wins[a].zi;
			}
		}
		win.zi = 50;
		win.style.zIndex = win.zi;
		//
		this._makeActive(this.getTopmostWindow());
	}
	
	this._isWindowOnBottom = function(win) {
		var state = true;
		for (var a in this.wins) {
			if (this.wins[a] != win) {
				state = state && (this.wins[a].zi > win.zi);
			}
		}
		return state;
	}
	
	this._stickWindow = function(win) {
		win._isSticked = true;
		this._hideButton(win, "stick");
		this._showButton(win, "sticked");
		this._bringOnTop(win);
	}
	
	this._unstickWindow = function(win) {
		win._isSticked = false;
		this._hideButton(win, "sticked");
		this._showButton(win, "stick");
		this._bringOnTopAnyStickedWindows();
	}
	
	// add user button
	this._addUserButton = function(win, id, pos, title, label) {
		var btn = document.createElement("DIV");
		
		btn.className = "button_"+label+"_default";
		btn.title = title;
		btn.isVisible = true;
		btn._isEnabled = true;
		btn.isPressed = false;
		btn.label = label;
		//
		win.btns[id] = btn;
		//
		btn._doOnClick = function() {}
		// events
			
		// btn.that = this;
		// btn.win = win;
		var b = win.childNodes[3].childNodes[0].childNodes[0].childNodes[0];
		// add on header
		var td = document.createElement("TD");
		td.className = "dhtmlx_wins_btn_" + (btn.isVisible ? "visible" : "hidden");
		if (pos > b.childNodes.length) {
			b.appendChild(td);
		} else {
			if (pos < 0) { pos = 0; }
			b.insertBefore(td, b.childNodes[pos]);
		}
		
		td.appendChild(btn);
		
		// attach events
		this._attachEventsOnButton(win, btn);
	}
	
	// remove user button
	this._removeUserButton = function(win, id, btn) {
		this._removeButtonGlobal(win, id, btn);
		
		/*
		var td = btn.parentNode;
		td.parentNode.removeChild(td);
		delete win.btns[id];
		*/
	}
	
	// add iframe blockers before drag and resize
	this._blockSwitcher = function(state) {
		for (var a in this.wins) {
			/*
			var winContent = this.wins[a].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0];
			var cover = null;
			for (var q=0; q<winContent.childNodes.length; q++) { if (winContent.childNodes[q].className == "dhx_content_cover_blocker") { cover = winContent.childNodes[q]; } }
			if (cover != null) {
				cover.style.display = (state ? "" : "none");
			}
			*/
			var winContent = this.wins[a]._content;
			var cover = null;
			for (var q=0; q<winContent.childNodes.length; q++) { if (winContent.childNodes[q].className == "dhx_content_cover_blocker") { cover = winContent.childNodes[q]; } }
			if (cover != null) {
				cover.style.display = (state ? "" : "none");
			}
		}
	}
	
	this.resizingWin = null;
	this.modalWin = null;
	this.resizingDirs = "none";
	
	// init functions
	
	this._createViewport();
	this.dhx_Event();
	
	var that = this;
	
	if (_isIE) {
		document.body.attachEvent("onmouseup", function() { that._stopMove(); });
	} else {
		document.body.addEventListener("mouseup", function() { that._stopMove(); }, false);
	}
	
	this.vp.onmousemove = function(e) {
		e = e || event;
		that._moveWindow(e);
	}
	this.vp.onmouseup = function(e) {
		e = e || event;
		that._stopMove(e);
	}
	/*
	this.vp.onmouseout = function(e) {
		e = e || event;
		if (_isIE) {
			var x = e.offsetX;
			var y = e.offsetY;
		} else {
			var x = e.layerX;
			var y = e.layerY;
		}
		var w = this.offsetWidth;
		var h = this.offsetHeight;
		if (!((x >= 0 && x <= w) && (y >=0 && y <= h))) {
			// that._stopMove();
		}
		// alert(e.offsetX+"   "+e.offsetY)
		// console.log(e.layerX, e.layerY);//"w", this.style.width, e.clientX, "h", this.style.height, e.clientY)
		
		/*
		var x = parseInt(this.style.left);
		var y = parseInt(this.style.top);
		var w = parseInt(this.style.width);
		var h = parseInt(this.style.height);
		*/
		/*
		var x = this.ax - document.body.scrollLeft;
		var y = this.ay - document.body.scrollTop;
		
		var w = parseInt(this.style.width);
		var h = parseInt(this.style.height);
		// console.log(x+" < "+e.clientX+" < "+(x+w)+", "+y+" < "+e.clientY+" < "+(y+h));
		if (!((x < e.clientX) && (e.clientX < x+w) && (y < e.clientY) && (e.clientY < y+h))) {
			// that._stopMove();
		}
		*/
	/*
	}
	*/
	
	
	this._setWindowModal = function(win, state) {
		
		if (state == true) {
			
			this._makeActive(win);
			this._bringOnTop(win);
			this.modalWin = win;
			win._isModal = true;
			//
			this.modalCoverI.style.zIndex = win.zi - 2;
			this.modalCoverI.style.display = "";
			//
			this.modalCoverD.style.zIndex = win.zi - 2;
			this.modalCoverD.style.display = "";
		} else {
			this.modalWin = null;
			win._isModal = false;
			//
			this.modalCoverI.style.zIndex = 0;
			this.modalCoverI.style.display = "none";
			//
			this.modalCoverD.style.zIndex = 0;
			this.modalCoverD.style.display = "none";
		}
	}
	
	this._bringOnTopAnyStickedWindows = function() {
		var wins = new Array();
		for (var a in this.wins) { if (this.wins[a]._isSticked) { wins[wins.length] = this.wins[a]; } }
		for (var q=0; q<wins.length; q++) { this._bringOnTop(wins[q]); }
		// if no more sticked search any non-top active and move them on top
		if (wins.length == 0) {
			for (var a in this.wins) {
				if (this.wins[a].className == "dhtmlx_window_active") { this._bringOnTop(this.wins[a]); }
			}
		}
	}
	
	/**
	*   @desc: unloads object and clears memory
	*   @param: id - button id
	*   @type: public
	*/
	this.unload = function() {
		this._clearLeaks();
	}
	
	this._removeButtonGlobal = function(win, id, btn) {
		//
		btn.onmouseover = null;
		btn.onmouseout = null;
		btn.onmousedown = null;
		btn.onmouseup = null;
		btn._doOnClick = null;
		//
		btn.clearAllEvents();
		btn.dhx_Event = null;
		//
		btn.show = null;
		btn.hide = null;
		btn.enable = null;
		btn.disable = null;
		btn.isEnabled = null;
		btn.isHidden = null;
		//
		btn.isVisible = null;
		btn._isEnabled = null;
		btn.isPressed = null;
		btn.label = null;
		//
		btn.parentNode.removeChild(btn);
		delete win.btns[id];
	}
	
	this._removeWindowGlobal = function(win) {
		//
		// modal check
		if (this.modalWin == win) { this._setWindowModal(win, false); }
		//
		var winContent = win.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0];
		if (winContent != null) {
			winContent.parentNode.removeChild(winContent);
		}
		//
		var hdr = win.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0];
		hdr.onmousedown = null;
		hdr.ondblclick = null;
		hdr = null;
		var htl = win.childNodes[2];
		htl.onmousedown = null;
		htl = null;
		//
		win.clearAllEvents();
		win.dhx_Event = null;
		//
		win.setText = null;
		win.getText = null;
		win.getId = null;
		win.show = null;
		win.hide = null;
		win.minimize = null;
		win.maximize = null;
		win.close = null;
		win.park = null;
		win.stick = null;
		win.unstick = null;
		win.setIcon = null;
		win.getIcon = null;
		win.clearIcon = null;
		win.restoreIcon = null;
		win.setModal = null;
		win.isModal = null;
		win.isHidden = null;
		win.isMaximized = null;
		win.isParked = null;
		win.allowPark = null;
		win.denyPark = null;
		win.allowResize = null;
		win.denyResize = null;
		win.isResizable = null;
		win.allowMove = null;
		win.denyMove = null;
		win.isMovable = null;
		win.sendToFront = null;
		win.sendToBack = null;
		win.isOnTop = null;
		win.isOnBottom = null;
		win.setPosition = null;
		win.getPosition = null;
		win.setDimension = null;
		win.getDimension = null;
		win.setMaxDimension = null;
		win.getMaxDimension = null;
		win.setMinDimension = null;
		win.getMinDimension = null;
		win.addUserButton = null;
		win.removeUserButton = null;
		win.onmousemove = null;
		win.onmousedown = null;
		win.button = null;
		win.attachObject = null;
		win.attachURL = null;
		//
		win.parentNode.removeChild(win);
		delete this.wins[win.idd];
	}
	
	this._attachStatusBar = function() {
		
	}
	
	this._attachWebMenu = function() {
		return null;
	}
	
	this._attachWebToolbar = function() {
		return null;
	}
	
	this._clearLeaks = function() {
		for (var a in this.wins) {
			var win = this.wins[a];
			this._diableOnSelectInWin(win, false);
			
			for (b in win.btns) { this._removeButtonGlobal(win, b, win.btns[b]); }
			
			this._removeWindowGlobal(win);
			
		}
		
		this._showButton = null;
		this._hideButton = null;
		this._enableButton = null;
		this._disableButton = null;
		
		this._removeButtonGlobal = null;
		this._removeWindowGlobal = null;
		
		this.autoViewport = null;
		this._createViewport = null;
		this._autoResizeViewport = null;
		this.vp.parentNode.removeChild(this.vp);
		this.vp = null;
		
	}
	/* resize fix or IE, added 31.03.2008 */
	if (_isIE || _isKHTML) {
		document.body.attachEvent("onselectstart", function(e) {
			e = e||event;
			if (that.resizingWin != null) { e.returnValue = false; }
		});
	}
	
	/* additional features */
	if (this._enableStatusBar != null) { this._enableStatusBar(); }
	if (this._enableWebMenu != null) { this._enableWebMenu(); }
	if (this._enableWebToolbar != null) { this._enableWebToolbar(); }
	
	return this;
}
// events
dhtmlXWindows.prototype.dhx_Event = function() {
	//
	this.dhx_SeverCatcherPath = "";
	this.attachEvent = function(original, catcher, CallObj) {
		CallObj = CallObj||this;
		original = 'ev_'+original;
		if ((!this[original]) || (!this[original].addEvent)) {
			var z = new this.eventCatcher(CallObj);
			z.addEvent(this[original]);
			this[original] = z;
		}
		return (original + ':' + this[original].addEvent(catcher)); //return ID (event name & event ID)
	}
	this.callEvent = function(name,arg0) {
		if (this["ev_"+name]) return this["ev_"+name].apply(this,arg0);
		return true;
	}
	this.checkEvent = function(name){
		if (this["ev_"+name]) return true;
		return false;
	}
	this.eventCatcher = function(obj) {
		var dhx_catch = new Array();
		var m_obj = obj;
		var func_server = function(catcher,rpc) {
			catcher = catcher.split(":");
			var postVar = "";
			var postVar2 = "";
			var target = catcher[1];
			if (catcher[1] == "rpc") {
				postVar = '<?xml version="1.0"?><methodCall><methodName>'+catcher[2]+'</methodName><params>';
				postVar2 = "</params></methodCall>";
				target = rpc;
			}
			var z = function() { }
			return z;
		}
		var z = function() {
			if (dhx_catch) var res=true;
			for (var i=0; i<dhx_catch.length; i++) {
				if (dhx_catch[i] != null) {
					var zr = dhx_catch[i].apply( m_obj, arguments );
					res = res && zr;
				}
			}
			return res;
		}
		z.addEvent = function(ev) {
			if (typeof(ev) != "function")
				if (ev && ev.indexOf && ev.indexOf("server:") == 0)
					ev = new func_server(ev,m_obj.rpcServer);
				else
					ev = eval(ev);
				if (ev)
					return dhx_catch.push( ev ) - 1;
			return false;
		}
		z.removeEvent = function(id) {
			dhx_catch[id] = null;
		}
		return z;
	}
	this.detachEvent = function(id) {
		if (id != false) {
			var list = id.split(':'); //get EventName and ID
			this[ list[0] ].removeEvent(list[1]); //remove event
		}
	}
	this.clearAllEvents = function() {
		this.ev_onClick = null;
		this.ev_onMoveFinish = null;
		this.ev_onResizeFinish = null;
		this.ev_onFocus = null;
		this.ev_onParkDown = null;
		this.ev_onParkUp = null;
		this.ev_onMaximize = null;
		this.ev_onMinimize = null;
		this.ev_onShow = null;
		this.ev_onHide = null;
		this.ev_onClose = null;
		this.ev_onHelp = null;
	}
}



