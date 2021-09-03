	<ul id="DHTMLSuite_tree2" class="DHTMLSuite_tree">
		<li id="node10000" noDrag="true" noSiblings="true"><a href="#">Root node</a>
			<ul>
				<li id="node1"><a href="#">Europe</a>
					<ul>
						<li id="node2"><a href="#">Norway</a>
							<ul>
								<li id="node3"><a href="#">Stavanger</a></li>
								<li id="node6"><a href="#">Bergen</a></li>
								<li id="node7"><a href="#">Oslo</a></li>
							</ul>
						</li>
						<li id="node8"><a href="#">United Kingdom</a>
							<ul>
								<li id="node9"><a href="#">London</a></li>
								<li id="node10"><a href="#">Manchester</a></li>
							</ul>				
						</li>
						<li id="node12"><a href="#">Sweden</a></li>
						<li id="node13"><a href="#">Denmark</a></li>
						<li id="node14"><a href="#">Germany</a>
							<ul>
								<li id="node141"><a href="#">Berlin</a>	
								<li id="node142"><a href="#">Munich</a>	
								<li id="node143"><a href="#">Stuttgart</a>	
							</ul>
						</li>
					</ul>
				</li>
				<li id="node15"><a href="#">Asia</a>
					<ul>
						<li id="node151"><a href="#">Japan</a>	
						<li id="node152"><a href="#">China</a>	
						<li id="node153"><a href="#">Indonesia</a>			
					</ul>
				</li>
				<li id="node16"><a href="#">Africa</a>
					<ul>
						<li id="node17"><a href="#">Tanzania</a></li>
						<li id="node18"><a href="#">Kenya</a></li>
					</ul>
				</li>
				<li id="node19"><a href="#">America</a>
					<ul>
						<li id="node20"><a href="#">Canada</a></li>
						<li id="node21"><a href="#">United States</a></li>
						<li id="node22"><a href="#">Mexico</a></li>
						<li id="node23"><a href="#">Argentina</a></li>
					</ul>		
				</li>	
				<li id="node24" noChildren="true"><a href="#">Cannot have children</a></li>
				<li id="node25" noDrag="true"><a href="#">Cannot be dragged</a></li>
			</ul>
		</li>
	</ul>
	<form>
	<input type="button" onclick="alert(treeObj.getSaveString())" value="Save">
	</Form>
	<style type="text/css">
	#DHTMLSuite_tree2{
		width:500px;
	}
	</style>
	<script type="text/javascript">	
	treeObj = new DHTMLSuite.JSDragDropTree();
	treeObj.setTreeId('DHTMLSuite_tree2');
	treeObj.setMaximumDepth(7);
	treeObj.setMessageMaximumDepthReached('Maximum depth reached'); // If you want to show a message when maximum depth is reached, i.e. on drop.
	treeObj.init();
	treeObj.expandAll();
	
	try{
		myImageSelection.addDestinationElementsByTagName('node10000','A')
	}catch(e){
		
	}
	</script>