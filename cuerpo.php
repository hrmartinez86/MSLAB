<html style="height:100%">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>DHTMLX Docs Explorer</title>
<link rel="STYLESHEET" type="text/css" href="codebase/dhtmlxtree.css">
<link rel="STYLESHEET" type="text/css" href="codebase/dhtmlxtabbar.css">
<script  src="codebase/dhtmlxcommon.js"></script>
<script  src="codebase/dhtmlxtabbar.js"></script>
<!-- !!! Following is important inclusion -->
<script  src="codebase/dhtmlxtabbar_start.js"></script>

</head>

<body onLoad="loadTree(); loadTreeTool(); loadTreeSmpl(); correctSizes()" onResize="correctSizes();a_tabbar.enableAutoReSize(true,true,true);" style="padding: 0; margin: 0;overflow:hidden;height:100%;">
<center>



	<script  src="codebase/dhtmlxcommon.js"></script>
	<script  src="codebase/dhtmlxtree.js"></script>
	<script>
		String.prototype._dhx_trim = function(){
                     return this.replace(/&nbsp;/g," ").replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g,"");
                  }
		/* get node as incoming parameter */
		var node=null;
		var t=document.location.href.split("?");
		var type=null;
		var base=t[0].replace("/index.s?html","");
		if(t[1]!=null){
			var u=t[1].split("&");
			for(var q=0;q<u.length;q++){
				if((node==null)&&(u[q].split("=")[0]=="node")){
					node=(u[q].split("=")[1]!=null?u[q].split("=")[1]:null);
					if(node!=null){
						if(node.length==0){
							node=null;
						}
					};
				}
				if((type==null)&&(u[q].split("=")[0]=="type")){
					type=(u[q].split("=")[1]!=null?u[q].split("=")[1]:null);
				}
			};
		};
		
		function correctSizes(){
			document.getElementById('tabbarconteiner').style.height = (document.body.offsetHeight - 70)+'px'
		}
		
		/* init tree */
		var tree;
		var tree_smpl;
		var tree_tool;
		function loadTree(){
			tree=new dhtmlXTreeObject("doctree_box","100%","100%",0);
			tree.setImagePath("codebase/imgs/");
			tree.setOnClickHandler(function(id){openPathDocs(id);});
			tree.attachEvent("onOpenEnd",updateTreeSize);
			tree.enableCheckBoxes(false);
			tree.loadXML("doc_xml/docs_tree.xml?nu=1",autoselectNode);
		}
		function loadTreeSmpl(){
			tree_smpl=new dhtmlXTreeObject("smpltree_box","100%","100%",0);
			tree_smpl.setImagePath("codebase/imgs/");
			tree_smpl.setOnClickHandler(function(id){openPathExamples(id);});
			tree_smpl.attachEvent("onOpenEnd",updateTreeSize)
			tree_smpl.enableCheckBoxes(false);
			tree_smpl.loadXML("doc_xml/samples_tree.xml?nu=1",autoselectNode);
		}
		function loadTreeTool(){
			tree_tool=new dhtmlXTreeObject("tool_tree_box","100%","100%",0);
			tree_tool.setImagePath("codebase/imgs/");
			tree_tool.setOnClickHandler(function(id){openPathDocs2(id);});
			tree_tool.attachEvent("onOpenEnd",updateTreeSize)
			tree_tool.enableCheckBoxes(false);
			tree_tool.loadXML("doc_xml/tool_tree.xml?nu=1",autoselectNode);
		}
		
		/* open path funtion */
		
		function openPathExamples(itemId){
			//debugger;
			var url = (tree_smpl.getUserData(itemId, "url")!=null?tree_smpl.getUserData(itemId, "url").toString()._dhx_trim():"");
			
			if (url=="" && !tree_smpl.hasChildren(itemId)) { 
				url = url+"#"+itemId; 
			}
			var itemIdTmp = itemId;
			var i = 0;
			do {
				itemIdTmp = tree_smpl.getParentId(itemIdTmp);
				if (tree_smpl.getUserData(itemIdTmp, "url") != null) { 				
					url = tree_smpl.getUserData(itemIdTmp, "url").toString()._dhx_trim() + ((url.indexOf("#")!==0)?"/":"") + url; 
				}
				i++;
			} while (itemIdTmp != 0)
			window.frames.sampleframe.location.href = url+"?un="+Date.parse(new Date());
		}
		
		
		function openPathDocs2(id)
		{
			if(tree_tool.getUserData(id,"url")!=null){	
				window.frames.sampleframe.location.href = tree_tool.getUserData(id,"url");
				return;
			}
			var entUrl = "";
			var getFileFl = true;
			var suffix = "#"+id
			
			do{
				var url = tree_tool.getUserData(id,"url");
				if(url!=null){
					if(getFileFl){
						entUrl = url.toString()._dhx_trim()+suffix;						
						getFileFl = false;						
					}else{
						var arTmp = url.split("/");
						if(arTmp[arTmp.length-1].indexOf(".")!=-1){
							arTmp[arTmp.length-1] = "";
							url = arTmp.join("/");
						}
						if(url!="")
							entUrl = url.toString()._dhx_trim()+"/"+entUrl;
							
					}
				}
				id = tree_tool.getParentId(id);
			}while(id!="0")
			window.frames.sampleframe.location.href = entUrl
		}
		
		
			
		
		
		
		function openPathDocs(id){
			if(tree.getUserData(id,"thisurl")!=null){
				window.frames.sampleframe.location.href = tree.getUserData(id,"thisurl");
				return;
			}
			var entUrl = "";
			var getFileFl = true;
			var suffix = "#"+id
			
			do{
				var url = tree.getUserData(id,"url");
				if(url!=null){
					if(getFileFl){
						entUrl = url.toString()._dhx_trim()+suffix;
						getFileFl = false;
					}else{
						var arTmp = url.split("/");
						if(arTmp[arTmp.length-1].indexOf(".")!=-1){
							arTmp[arTmp.length-1] = "";
							url = arTmp.join("/");
						}
						if(url!="")
							entUrl = url.toString()._dhx_trim()+"/"+entUrl;
					}
				}
				id = tree.getParentId(id);
			}while(id!="0")
			window.frames.sampleframe.location.href = entUrl
		}
		
		function updateTreeSize(){
			this.allTree.style.overflow = "visible";
			this.allTree.style.height = this.allTree.scrollHeight+"px";
			
		}
		
		function autoselectNode(){
			if(type=="tool"){
				tree_tool.selectItem(node,true);tree_tool.openItem(node)
			}else{
				tree.selectItem(node,true);tree.openItem(node)
			}
		} 
	</script>
	
<!--- <a href="javascript:void(0)" onclick="updateTreeSize()">update Size</a> --->

<table width="98.2%" height="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;">
<tr>
	<td height="55" width="200" valign=top background="codebase/imgs/bg_sampleexplorer_header.gif"></td>
	<td background="codebase/imgs/bg_sampleexplorer_header.gif" align=right valign=top  height="55"></td>
	<td background="codebase/imgs/bg_sampleexplorer_header.gif" align=right valign=top  height="55"><img src="codebase/imgs/title_sampleexplorer.gif" width="302" height="55" /></td>
</tr>
<tr>
	<td height="10" width="100%">
		<div></div>
	</td>
</tr>
<tr>
	<td width="100%" height="100%" colspan="3">
		<table width="100%" height="100%" cellpadding="0" cellspacing="0" border="0">
			<tr>
				<td valign="top" width="200">
					<div id="tabbarconteiner" style="width: 200px; height: 100%; margin: 0 0 0 8px;">
						<div id="a_tabbar" 
							class="dhtmlxTabBar"
							tabstyle="scbr"
							tabheight="28"
							imgpath="codebase/imgs/" 
							style="width: 200px; height: 100%;"
							skinColors="#FFFFFF,#F4F3EE"
							mode="left"
							offset="3"
							oninit="a_tabbar.setTabActive(type+'tab')"
							select="tool">
								<div id="doctab" width="120" name="<table width='100%' height='100%' cellspacing='0' cellpadding='0' border='0' style='margin-left: 3px;'><tr><td width='100%' height='100%' valign='middle' align='center'><img src='codebase/imgs/null.gif' class='tab_docs'></td></tr></table>" style="padding: 8px 8px 0 8px;display:none;">
									<div id="doctree_box" style="width: 226px; height: 100%; "></div>
								</div>
								
								<div id="smpltab" width="120" name="<table width='100%' height='100%' cellspacing='0' cellpadding='0' border='0' style='margin-left: 3px;'><tr><td width='100%' height='100%' valign='middle' align='center'><img src='codebase/imgs/null.gif' class='tab_samples'></td></tr></table>" style="padding: 8px 8px 0 8px;display:none;" select="1">
									<div id="smpltree_box" style="width: 226px; height: 100%; "></div>
								</div>
									
								<div id="tool" width="120" name="<table width='100%' height='100%' cellspacing='0' cellpadding='0' border='0' style='margin-left: 3px;'><tr><td width='100%' height='100%' valign='middle' align='center'><img src='codebase/imgs/null.gif' class='tab_tool'></td></tr></table>" style="padding: 8px 8px 0 8px;display:none;" >
									<div id="tool_tree_box" style="width: 226px; height: 100%; "></div>
								</div>
								
						</div>
					</div>
				</td>
				<td width="10">
					<div></div>
				</td>
				<td align="right">
					<iframe id="sampleframe" name="sampleframe" width="100%" height="99%" frameborder="0" src="blank.html" style="border: 0px solid #cecece;"></iframe>
				</td>
			</tr>
		</table>
	</td>
</tr>
<tr>
	<td height="6" width="100%" colspan="3">
		<div></div>
	</td>
</tr>
</table>
</center>
</body>
</html>

