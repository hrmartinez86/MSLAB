dhtmlXWindows.prototype._enableWebToolbar = function() {
	
	// this._sb = document.createElement("DIV");
	// this._sb.style.height = height+"px";
	
	this._attachWebToolbar = function(win) {
		
		var skin = this.skinParams[this.skin];
		
		win._tb = document.createElement("DIV");
		win._tb.h = 25;
		win._tb.style.position = "absolute";
		win._tb.style.left = this.skinParams[this.skin]["border_left_width"]-1+"px";
		win._tb.style.top = (win._menu!=null?win._menu.h:0)+this.skinParams[this.skin]["header_height"]-1+"px";
		win._tb.style.height = win._tb.h + "px";
		// win._tb.className = "dhtmlx_wins_inserted_dhtmlxwebtoolbar_object";
		
		// win._tb.innerHTML = '<div id="dhtmlxWebToolbarObject" class="dhtmlx_wins_inserted_dhtmlxwebtoolbar_object_inner"></div>';
		win._tb.innerHTML = '<div id="dhtmlxWebToolbarObject" class="dhtmlxWebToolbar_Standard" style="border:none;border-bottom:1px solid #A4A3A3; height: '+(_isIE?25:24)+'px;"></div>';
		
		//
		var outer = win.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1];
		var bd = null;
		for (var q=0; q<outer.childNodes.length; q++) {
			if (outer.childNodes[q].className == "dhtmlx_wins_body_content") { bd = outer.childNodes[q]; }
		}
		
		// bd.style.height = win.h - win._menu.h - (win._sb!=null?win._sb.h:0) + "px";
		bd.style.height = win.h - skin["header_height"] - skin["border_bottom_height"] - (win._sb!=null?win._sb.h:0) - (win._menu!=null?win._menu.h:0) - win._tb.h + "px";
		bd.style.top = (win._menu!=null?win._menu.h:0)+win._tb.h+"px";
		win._tb.style.width = parseInt(bd.style.width)+2+"px";
		
		//
		outer.appendChild(win._tb);
		
		// fix resize for sb
		win._manageAddons = function(width, height) {
			
			var outer = this.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1];
			
			var bd = null;
			var sb = null;
			var tb = null;
			var menu = null;
			
			for (var q=0; q<outer.childNodes.length; q++) {
				if (outer.childNodes[q].className == "dhtmlx_wins_body_content") { bd = outer.childNodes[q]; }
				if (outer.childNodes[q].className == (this._sb!=null?this._sb.className:new Date().getTime()+"_"+Math.random(1,1000000))) { sb = outer.childNodes[q]; }
				if (outer.childNodes[q].className == (this._menu!=null?this._menu.className:new Date().getTime()+"_"+Math.random(1,1000000))) { menu = outer.childNodes[q]; }
				if (outer.childNodes[q].className == (this._tb!=null?this._tb.className:new Date().getTime()+"_"+Math.random(1,1000000))) { tb = outer.childNodes[q]; }
			}
			if (bd != null) {
				bd.style.width = width + "px";
				bd.style.height = height - (this._menu!=null?this._menu.h:0) - (this._tb!=null?this._tb.h:0) - (this._sb!=null?this._sb.h:0) + "px";
			}
			if (sb != null) {
				sb.style.width = width + 1 + "px";
				sb.style.top = (this._menu!=null?this._menu.h:0)+(this._tb!=null?this._tb.h:0)+parseInt(bd.style.height)+skin["header_height"]+"px";
			}
			if (tb != null) {
				tb.style.width = width + 2 + "px";
			}
			if (menu != null) {
				menu.style.width = width + 2 + "px";
			}
		}
		
		
		var webBar = new dhtmlXWebToolbarObject("dhtmlxWebToolbarObject");
		return webBar;
	
	}
}
