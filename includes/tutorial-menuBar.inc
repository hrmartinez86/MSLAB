<p>Classes used:</p>
<ul>
	<li><b><a href="../doc/js_docs_out/DHTMLSuite.menuBar.html" onclick="var scriptDocWin=window.open(this.href);return false">DHTMLSuite.menuBar</a></b> - Class for the menu bar widget.</li>
	<li><b><a href="../doc/js_docs_out/DHTMLSuite.menuItem.html" onclick="var scriptDocWin=window.open(this.href);return false">DHTMLSuite.menuItem</a></b> - Gui class for a menu item.</li>
	<li><b><a href="../doc/js_docs_out/DHTMLSuite.menuModel.html" onclick="var scriptDocWin=window.open(this.href);return false">DHTMLSuite.menuModel</a></b> - Datasource for the menu.</li>
	<li><b><a href="../doc/js_docs_out/DHTMLSuite.menuModelItem.html" onclick="var scriptDocWin=window.open(this.href);return false">DHTMLSuite.menuModelItem</a></b> - Datasource for a menu item.</li>
</ul>
<p>Demos:</p>
<ul>
	<li><a href="demo-menu-bar.html" onclick="var demoWin=window.open(this.href);return false">demo-menu-bar.html</a></li>
	<li><a href="demo-menu-bar-2.html" onclick="var demoWin=window.open(this.href);return false">demo-menu-bar-2.html</a></li>
	<li><a href="demo-menu-bar-custom-css.html" onclick="var demoWin=window.open(this.href);return false">demo-menu-bar-custom-css.html</a></li>
	<li><a href="demo-menu-bar-custom-css-file.html" onclick="var demoWin=window.open(this.href);return false">demo-menu-bar-custom-css-file.html</a></li>
	<li>And the menu you see at the top of this page</li>
</ul>
<p>Default css files:</p>
<ul>
	<li><a href="../css_dhtmlsuite/menu-bar.css" onclick="var demoWin=window.open(this.href);return false">css_dhtmlsuite/menu-bar.css</a></li>
	<li><a href="../css_dhtmlsuite/menu-item.css" onclick="var demoWin=window.open(this.href);return false">css_dhtmlsuite/menu-item.css</a></li>
</ul>
<p>DHTMLSuite.menuBar class is the main class for a menuBar. It contains a collection of DHTMLSuite.menuItem objects. A menu bar can be created by adding items by pure javascript, but it can also
be created from an unordered list(&lt;UL>&lt;LI>) on your page.</p>
<h2>Add menu items with JS code</h2>
<p>This is an example of a menu bar created by plain Javascript code:</p>
<pre>
// First menu
var menuModel = new DHTMLSuite.menuModel();
menuModel.addItem(1,'New','../images/calendar.gif','',false,'','');
menuModel.addItem(2,'Edit','','',false);
menuModel.addSeparator();
menuModel.addItem(3,'Save','../images/disk.gif','',false,'Save your work','saveWork()');
menuModel.addItem(10,'','../images/print.gif','',false,'Print page');
menuModel.addItem(11,'Open','../images/open.gif','',false,'Open document','');
menuModel.setSubMenuWidth(11,120);
menuModel.addItem(111,'RTF','','',11,'Open document','');
menuModel.addItem(112,'PDF','','',11,'Open document','');
menuModel.addItem(114,'Spreadsheet','','',11,'Open document','');
menuModel.addItem(4,'Tools','','',false);
menuModel.setSubMenuWidth(4,155);
menuModel.addItem(5,'Settings','','',4);
menuModel.addItem(6,'Internet Options','','',4);
menuModel.init();

var menuBar = new DHTMLSuite.menuBar();
menuBar.addMenuItems(menuModel);
menuBar.setTarget('menuBarContainer');
menuBar.init();
</pre>
<p>First, we create an object of the DHTMLSuite.menuModel class. It's the datasource for our menu bar. We use the addItem method to create new menu items. This method takes these arguments:</p>
<ul>
	<li>id - Unique id of this menu item</li>
	<li>itemText - Text of menu item </li>
	<li>itemIcon - Icon</li>
	<li>url - url of menu item</li>
	<li>parentId - id of parent menu item, 0 if no parent</li>
	<li>helpText - tooltip for this menu item</li>
	<li>jsFunction - js function to call when someone clicks on the item. This is an alternative to the url attribute. example of value: "saveWork()"</li>
	<li>type - optional - usually left empty - possible values: "top" or "sub". It describes the look of the menu item.</li>
	<li>submenuWidth - Width of sub menu group directly below this item</li>
</ul>
<p>We also have the addSeparator method which creates a separator line after the last created menu with the specific parent id. addSeparator() creates a separator after our last added top menu item, while
addSeparator(1), creates a separator after our last created menu item where parentId = 1.</p>
<p>When the menu model has been created, we create the menu bar. This is very simple: Create the menu bar(var menuBar = new DHTMLSuite.menuBar()), connect it to the menu model(menuBar.addMenuItems(menuModel)), describe
where to insert in on the page(menuBar.setTarget('menuBarContainer')) and finally call the init method.</p>
<h2>Create menu item from HTML markup</h2>
<p>With this method, you use an unordered list on your page when you create your menuModel. Instead of calling the addItem method a number of times, you create a ul,li list and point the menuModel to that list.</p>
<p>Here's an example of a list:</p>
<pre>
&lt;ul id="menuModel" style="display:none">
	&lt;li id="50000"jsFunction="saveWork()" 
		itemIcon="../images/disk.gif">&lt;a href="#" title="Open the file menu">File&lt;/a>
		&lt;ul width="150">
			&lt;li id="500001" jsFunction="saveWork()" 
				itemIcon="../images/disk.gif">&lt;a href="#" title="Save your work">Save&lt;/a>&lt;/li>
			&lt;li id="500002">&lt;a href="#">Save As&lt;/a>&lt;/li>
			&lt;li id="500004" itemType="separator">&lt;/li>
			&lt;li id="500003">&lt;a href="#">Open&lt;/a>
				&lt;ul width="130">
					&lt;li id="5000031">&lt;a href="#">Project&lt;/a>	
					&lt;li id="5000032">&lt;a href="#">Template&lt;/a>	
					&lt;li id="5000033">&lt;a href="#">File&lt;/a>	
				&lt;/ul>
			&lt;/li>
		&lt;/ul>
	&lt;/li>
	&lt;li id="50001">&lt;a href="#">View&lt;/a>
		&lt;ul width="130">
			&lt;li id="500011">&lt;a href="#">Source&lt;/a>&lt;/li>
			&lt;li id="500012">&lt;a href="#">Debug info&lt;/a>&lt;/li>
			&lt;li id="500013">&lt;a href="#">Layout&lt;/a>&lt;/li>
		&lt;/ul>
	&lt;/li>
	&lt;li id="50003" itemType="separator">&lt;/li>
	&lt;li id="50002">&lt;a href="#">Tools&lt;/a>&lt;/li>
&lt;/ul>	
</pre>
<p>The script will parse this unordered list and create menu items based on it. These are the properties you can use:</p>
<ul>
	<li>id = Unique numeric id for a menu item. (the "id" of the &lt;li> tag) </li>
	<li>parentId = Id of parent element. The script fetches this dynamically from the ul list. </li>
	<li>itemText = Text of menu item. The content of the &lt;A> tag in the list</li>
	<li>itemIcon = A custom attribute which you can add to the &lt;LI> tag</li>
	<li>itemType = Attibute for the &lt;LI> tag. Example: "separator"</li>
	<li>jsFunction = Attribute for the &lt;LI> tag. This js code will be executed when someone clicks on the menu item.</li>
	<li>url = The href attribute of the &lt;A> tag.</li>
</ul>		
<p>
<p>The Javascript code for this menu looks like this:</p>
<pre>
var menuModel = new DHTMLSuite.menuModel();
menuModel.addItemsFromMarkup('menuModel');
menuModel.init();

var menuBar = new DHTMLSuite.menuBar();
menuBar.addMenuItems(menuModel);
menuBar.setTarget('menuDiv');
menuBar.init();
</pre>
<p>As you can see, we use the addItemsFromMarkup instead of the addItem method. The argument to this method is the ID of the parent &lt;UL>. The code for the menuBar is just like in the example above.</p>
<p>For more info on other methods, look at the descriptions in the demos.</p>
