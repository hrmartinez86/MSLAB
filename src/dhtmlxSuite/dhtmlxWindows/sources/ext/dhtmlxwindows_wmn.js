dhtmlXWindows.prototype._enableWebMenu = function() {
	
	// this._sb = document.createElement("DIV");
	// this._sb.style.height = height+"px";
	
	this._attachWebMenu = function(win) {
		
		var skin = this.skinParams[this.skin];
		
		win._menu = document.createElement("DIV");
		win._menu.h = (_isIE?25:24);
		win._menu.style.position = "absolute";
		win._menu.style.left = this.skinParams[this.skin]["border_left_width"]-1+"px";
		win._menu.style.top = this.skinParams[this.skin]["header_height"]+"px";
		win._menu.style.height = win._menu.h + "px";
		win._menu.className = "dhtmlx_wins_inserted_dhtmlxwebmenu_object";
		/*
		win._menu.innerHTML = '<div>'+
						'<table border="0" width="100%" cellspacing="0" cellpadding="0" class="dhtmlxWebMenuStandard_TBL">'+
							'<tr>'+
								'<td class="dhtmlxWebMenuStandard_Left">&nbsp;</td>'+
								'<td style="font-size: 1px;"><div class="dhtmlxWebMenuStandard_Middle" id="dhtmlxWebMenuObject">&nbsp;</div></td>'+
								'<td class="dhtmlxWebMenuStandard_Right">&nbsp;</td>'+
							'</tr>'+
						'</table>'+
					'</div>';
		*/
		win._menu.innerHTML = '<div id="dhtmlxWebMenuObject" class="dhtmlx_wins_inserted_dhtmlxwebmenu_object_inner"></div>';
		
		//
		var outer = win.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1];
		var bd = null;
		var tb = null;
		for (var q=0; q<outer.childNodes.length; q++) {
			if (outer.childNodes[q].className == "dhtmlx_wins_body_content") { bd = outer.childNodes[q]; }
			if (outer.childNodes[q].className == (win._tb!=null?win._tb.className:new Date().getTime()+"_"+Math.random(1,1000000))) { tb = outer.childNodes[q]; }
		}
		
		// bd.style.height = win.h - win._menu.h - (win._sb!=null?win._sb.h:0) + "px";
		bd.style.height = win.h - skin["header_height"] - skin["border_bottom_height"] - (win._sb!=null?win._sb.h:0)-(win._tb!=null?win._tb.h:0)- win._menu.h + "px";
		
		win._menu.style.width = parseInt(bd.style.width)+2+"px";
		
		if (tb != null) {
			win._tb.style.top = win._menu.h+this.skinParams[this.skin]["header_height"]-1+"px";
			bd.style.top = win._menu.h+win._tb.h+"px";
		} else {
			bd.style.top = win._menu.h+"px";
		}
		//
		outer.appendChild(win._menu);
		
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
		
		
		var menu = new dhtmlXWebMenuObject("dhtmlxWebMenuObject", "topId");
		menu._topLevelBottomMargin = (_isIE?3:4);
		return menu;
	
	}
}
