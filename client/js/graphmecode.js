document.write('<script type="text/javascript" src="js/components/box.js"></script>');
document.write('<script type="text/javascript" src="js/components/InteractiveBox.js"></script>');
document.write('<script type="text/javascript" src="js/components/InteractiveEdge.js"></script>');
document.write('<script type="text/javascript" charset="utf-8" src="js/utils/debugger.js"></script>');

var app = {
  stage: "body",
  totalDiagrams: 0,                                             // total of diagrams currently created
  diagrams: new Array(),                                        // references to all diagrams currently created
  ctrlpts: [400, 200, 400, 300, 100, 300, 200, 200],            // control points' positions
  context: new Object(),                                        // currently selected context
  totalEdges: 0,                                                // total of edges currently created
  edges: new Array(),
  
  log: function (value) {
    Debugger.log(value);
  },
  
  create_diagram: function() {
    var dObj = new DiagramObject(app.stage, "diagram"+app.totalDiagrams, 160, 76,"#F4C8FF","#BB6891");
    dObj.x(Math.random()*1000);
    dObj.y(Math.random()*600);
    app.totalDiagrams += 1;
    app.diagrams.push(dObj);
  },
  
  create_edge: function() {
    var eObj = new InteractiveEdge("edge_"+app.totalEdges, document.body,"1000","800","1px solid #777777" );
    app.edges.push(eObj);
    app.totalEdges++;
  }
  
}


$(document).ready(function() {
  (function __init__() {
    
    $(app.stage).mousemove(function(e) {
      // 484,337
      //app.log(e.pageX + "," + e.pageY);

      if ( app.edges.length > 0 ){
        var pxs = app.edges[0].getCanvas().getContext('2d').getImageData(e.pageX, e.pageY, 500, 800).data
        for ( i = 0; i < pxs.length; i++ ) {
        //  app.log(pxs[i]);
        }
        
        
        //app.log(app.edges[0].getCanvas().getContext('2d').getImageData(e.pageX, e.pageY, 5, 5).data);
      }

      
    });
    
  })();
});