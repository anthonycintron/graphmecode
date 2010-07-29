document.write('<script type="text/javascript" src="js/box.js"></script>');
document.write('<script type="text/javascript" src="js/InteractiveBox.js"></script>');
document.write('<script type="text/javascript" src="js/InteractiveEdge.js"></script>');

var app = {
  totalDiagrams: 0,                                             // total of diagrams currently created
  diagrams: new Array(),                                        // references to all diagrams currently created
  ctrlpts: [400, 200, 400, 300, 100, 300, 200, 200],            // control points' positions
  context: new Object(),                                        // currently selected context
  totalEdges: 0,                                                // total of edges currently created
  edges: new Array()
  
}
/**
 * Creates a new diagram
 */
function create_diagram() {
  
  var dObj = new DiagramObject("body", 
                               "diagram"+app.totalDiagrams, 
                                160, 
                                76, 
                                "#F4C8FF", 
                                "#BB6891");
  dObj.x(Math.random()*1000);
  dObj.y(Math.random()*600);
  app.totalDiagrams += 1;
  app.diagrams.push(dObj);
}

function create_edge() {
  var eObj = new InteractiveEdge("edge_"+app.totalEdges,
                                 document.body,
                                 "1000",
                                 "800",
                                 "1px solid #777777" );
  app.edges.push(eObj);
  app.totalEdges++;
}