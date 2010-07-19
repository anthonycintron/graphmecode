document.write('<script type="text/javascript" src="js/box.js"></script>');
document.write('<script type="text/javascript" src="js/InteractiveBox.js"></script>');

var app = {
  totalDiagrams: 0,
  diagrams: new Array(),
  ctrlpts: [400, 200, 400, 300, 100, 300, 200, 200],
  context: new Object(),
  canvas: {}
}

function create() {
  
  var dObj = new DiagramObject("body", "diagram"+app.totalDiagrams, 
                                160, 76, "#F4C8FF", "#BB6891");
  dObj.x(Math.random()*1000);
  dObj.y(Math.random()*600);
  app.totalDiagrams += 1;
  app.diagrams.push(dObj);
}


$(function() {
  var canvas, context, ctrlpts = [200, 100, 400, 200, 100, 300];
  app.canvas = document.getElementById("edge");
  app.context = app.canvas.getContext("2d");
  
  $("#edge").mousedown(function(e) {
    // object
    var xpos = e.pageX-$(this).offset().left;
    var ypos = e.pageY-$(this).offset().top;
    var a = app;
    for ( i=0; i<8; i+=2 ) {
      if (xpos > a.ctrlpts[i]-3 && xpos < a.ctrlpts[i]+3 
        && ypos > a.ctrlpts[i+1]-3 && ypos < a.ctrlpts[i+1]+3) {
        $(this).bind("mousemove", {index:i}, move_ctrlpts);
        break;
      }
    }
  });  
  
  $("#edge").mouseup(function() {
    $(this).unbind("mousemove", move_ctrlpts);
  })
  draw_guide_ctrls();
  draw_edge();
});



function move_ctrlpts(evt) {
  app.ctrlpts[evt.data.index]   = evt.pageX-$(this).offset().left;
  app.ctrlpts[evt.data.index+1] = evt.pageY-$(this).offset().top;
  app.canvas.width = app.canvas.width;
  app.context.fillStyle = "#0000ff";
  for ( i = 0; i < 8; i+=2) {
    app.context.fillRect(app.ctrlpts[i]-4, app.ctrlpts[i+1]-4, 6, 6);
  }
  draw_edge();
}


function draw_guide_ctrls() {
  var color = "#0000ff";
  app.context.fillStyle = color;
  app.context.fillRect(app.ctrlpts[0]-4, app.ctrlpts[1]-4, 6, 6);
  app.context.fillStyle = color;
  app.context.fillRect(app.ctrlpts[2]-4, app.ctrlpts[3]-4, 6, 6);
  app.context.fillStyle = color;
  app.context.fillRect(app.ctrlpts[4]-4, app.ctrlpts[5]-4, 6, 6);
  app.context.fillStyle = color;
  app.context.fillRect(app.ctrlpts[6]-4, app.ctrlpts[7]-4, 6, 6);
}



function draw_edge() {
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