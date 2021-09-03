dhtmlXWindows.prototype._enableStatusBar = function() {
	
	// this._sb = document.createElement("DIV");
	// this._sb.style.height = height+"px";
	
	this._attachStatusBar = function(win, bar, show) {
		
		var skin = this.skinParams[this.skin];
		
		win._sb = document.createElement("DIV");
		win._sb.className = "dhtmlx_wins_statusbar_"+this.skin;
		win._sb.h = 26;
		
		win._sb.style.height = win._sb.h+"px";
		
		var outer = win.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1];
		var bd = null;
		for (var q=0; q<outer.childNodes.length; q++) {
			if (outer.childNodes[q].className == "dhtmlx_wins_body_content") { bd = outer.childNodes[q]; }
		}
		
		bd.style.height = win.h - skin["header_height"] - skin["border_bottom_height"] - (win._tb!=null?win._tb.h:0) - (win._menu!=null?win._menu.h:0) - win._sb.h + "px";
		win._sb.style.width = parseInt(bd.style.width)+1+"px";
		win._sb.style.top = (win._menu!=null?win._menu.h:0)+(win._tb!=null?win._tb.h:0)+parseInt(bd.style.height)+skin["header_height"]+"px";
		
		//
		outer.appendChild(win._sb);
		win._sb.appendChild(bar);
		//
		if (show == true) { bar.style.display = ""; }
		//
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
	
	}
}
