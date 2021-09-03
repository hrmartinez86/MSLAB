	<ul id="DHTMLSuite_tree3" class="DHTMLSuite_tree">
		<li id="node10010000" noDrag="true" noSiblings="true"><a href="#">Root node</a>
			<ul>
				<li id="node1001"><a href="#">Europe</a>
					<ul>
						<li id="node1002"><a href="#">Norway</a>
							<ul>
								<li id="node1003"><a href="#">Stavanger</a></li>
								<li id="node1006"><a href="#">Bergen</a></li>
								<li id="node1007"><a href="#">Oslo</a></li>
							</ul>
						</li>
						<li id="node1008"><a href="#">United Kingdom</a>
							<ul>
								<li id="node1009"><a href="#">London</a></li>
								<li id="node10010"><a href="#">Manchester</a></li>
							</ul>				
						</li>
						<li id="node10012"><a href="#">Sweden</a></li>
						<li id="node10013"><a href="#">Denmark</a></li>
						<li id="node10014"><a href="#">Germany</a>
							<ul>
								<li id="node100141"><a href="#">Berlin</a>	
								<li id="node100142"><a href="#">Munich</a>	
								<li id="node100143"><a href="#">Stuttgart</a>	
							</ul>
						</li>
					</ul>
				</li>
				<li id="node10015"><a href="#">Asia</a>
					<ul>
						<li id="node100151"><a href="#">Japan</a>	
						<li id="node100152"><a href="#">China</a>	
						<li id="node100153"><a href="#">Indonesia</a>			
					</ul>
				</li>
				<li id="node10016"><a href="#">Africa</a>
					<ul>
						<li id="node10017"><a href="#">Tanzania</a></li>
						<li id="node10018"><a href="#">Kenya</a></li>
					</ul>
				</li>
				<li id="node10019"><a href="#">America</a>
					<ul>
						<li id="node10020"><a href="#">Canada</a></li>
						<li id="node10021"><a href="#">United States</a></li>
						<li id="node10022"><a href="#">Mexico</a></li>
						<li id="node10023"><a href="#">Argentina</a></li>
					</ul>		
				</li>	
			</ul>
		</li>
	</ul>
	<form>
	<input type="button" onclick="alert(myOtherTree2.getSaveString())" value="Save">
	</Form>
	<p>If you include both the folder trees demos, you can drag items between the trees</p>
	<p><a href="#" onclick="myOtherTree2.expandAll();return false">Expand all</a></p>
	<p><a href="#" onclick="myOtherTree2.collapseAll();return false">Collapse all</a></p>
	<style type="text/css">
	#DHTMLSuite_tree3{
		width:500px;
	}
	</style>
	<script type="text/javascript">	
	var myOtherTree2 = new DHTMLSuite.JSDragDropTree();
	myOtherTree2.setTreeId('DHTMLSuite_tree3');
	myOtherTree2.setMaximumDepth(7);
	myOtherTree2.setMessageMaximumDepthReached('Maximum depth reached'); // If you want to show a message when maximum depth is reached, i.e. on drop.
	myOtherTree2.init();
	myOtherTree2.expandAll();
	</script>