document.write('<script type="text/javascript" src="js/box.js"></script>');
document.write('<script type="text/javascript" src="js/InteractiveBox.js"></script>');

var app = {
  totalDiagrams: 0,
  diagrams: new Array(),
  ctrlpts: [400, 200, 400, 300, 100, 300, 200, 200],
  context: new Object()
}

function create() {
  
  var dObj = new DiagramObject("body", "diagram"+app.totalDiagrams, 160, 76, "#F4C8FF", "#BB6891");
  dObj.x(Math.random()*1000);
  dObj.y(Math.random()*600);
  app.totalDiagrams += 1;
  
  app.diagrams.push(dObj);
  
}


$(function() {
  var canvas, context, ctrlpts = [200, 100, 400, 200, 100, 300];
  canvas = document.getElementById("edge");
  app.context = canvas.getContext("2d");
  
  $("#edge").mousedown(function(e) {
   
  });  
  
  draw_guide_ctrls();
  draw_edge(context);
   
});

function draw_guide_ctrls() {
  app.context.fillStyle = "#0000ff";
  app.context.fillRect(app.ctrlpts[0]-2, app.ctrlpts[1]-2, 4, 4);
}



function draw_edge(context) {
  
  app.context.beginPath();
	app.context.moveTo(app.ctrlpts[0], app.ctrlpts[1]);
	app.context.lineTo(app.ctrlpts[2], app.ctrlpts[3]);
	app.context.lineTo(app.ctrlpts[4], app.ctrlpts[5]);
	app.context.lineTo(app.ctrlpts[6], app.ctrlpts[7]);
	app.context.strokeStyle = "#00ff00";
	app.context.stroke();
	app.context.beginPath();
	app.context.moveTo(app.ctrlpts[0], app.ctrlpts[1]);
	app.context.bezierCurveTo(app.ctrlpts[2], app.ctrlpts[3], app.ctrlpts[4], app.ctrlpts[5], app.ctrlpts[6], app.ctrlpts[7]);
	app.context.strokeStyle = "#ff0000";
	app.context.stroke();

}