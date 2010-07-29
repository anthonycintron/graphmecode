function InteractiveEdge(name, container, width, height, border_style, guide_color) {
  
  var ctrlpts = [400, 200, 400, 300, 100, 300, 200, 200];

  var _canvas        = {};
  
  this.name          = name;
  this.container     = container;
  this.border_style  = border_style;
  this.guide_color   = guide_color;
  this.width         = width;
  this.height        = height;
  
  (function __init__() {
    _canvas = document.createElement("canvas");
    var ctx    = _canvas.getContext("2d");
    
    _canvas.setAttribute("width", width);
    _canvas.setAttribute("height", height);
    
    container.appendChild(_canvas);  
    
    _canvas.id           = name;
    _canvas.style.border = border_style;
    
    
    $("#"+name).mousedown(function(e) {
      var xpos = e.pageX-$(this).offset().left;
      var ypos = e.pageY-$(this).offset().top;
      for ( i=0; i<8; i+=2 ) {
        if (xpos > ctrlpts[i]-3 && xpos < ctrlpts[i]+3 
          && ypos > ctrlpts[i+1]-3 && ypos < ctrlpts[i+1]+3) {
          $(this).bind("mousemove", { index:i, ctx: ctx }, move_ctrlpts);
          break;
        }
      }
     });  
     
    // unsubscribe to edge when mouse is up
    $("#"+name).mouseup(function() {
       $(this).unbind("mousemove", move_ctrlpts);
    });
     
    draw_guide_ctrls(ctx);
    draw_edge(ctx);
    
  })();
  
  /**
   * on mouse move, ctrlpt is draggle
   */
  function move_ctrlpts(evt) {
    var ctx                   = evt.data.ctx;
    ctrlpts[evt.data.index]   = evt.pageX-$(this).offset().left;
    ctrlpts[evt.data.index+1] = evt.pageY-$(this).offset().top;
    _canvas.width              = _canvas.width;
    ctx.fillStyle             = "#0000ff";
    
    for ( i = 0; i < 8; i+=2) {
      ctx.fillRect(ctrlpts[i]-4, ctrlpts[i+1]-4, 6, 6);
    }
    draw_edge(ctx);
  }
  
  /**
   * draws the control point guides
   */
  function draw_guide_ctrls(ctx) {
    var color = "#0000ff";
    ctx.fillStyle = color;
    ctx.fillRect(ctrlpts[0]-4, ctrlpts[1]-4, 6, 6);
    ctx.fillStyle = color;
    ctx.fillRect(ctrlpts[2]-4, ctrlpts[3]-4, 6, 6);
    ctx.fillStyle = color;
    ctx.fillRect(ctrlpts[4]-4, ctrlpts[5]-4, 6, 6);
    ctx.fillStyle = color;
    ctx.fillRect(ctrlpts[6]-4, ctrlpts[7]-4, 6, 6);
  }

  /**
   * re-draws the edge into the in-focus edge canvas
   */
  function draw_edge(ctx) {
    ctx.beginPath();
  	ctx.moveTo(ctrlpts[0], ctrlpts[1]);
  	ctx.lineTo(ctrlpts[2], ctrlpts[3]);
  	ctx.lineTo(ctrlpts[4], ctrlpts[5]);
  	ctx.lineTo(ctrlpts[6], ctrlpts[7]);
  	ctx.strokeStyle = "#00ff00";
  	ctx.stroke();
  	ctx.beginPath();
  	ctx.moveTo(ctrlpts[0], ctrlpts[1]);
  	ctx.bezierCurveTo(ctrlpts[2], ctrlpts[3], ctrlpts[4], ctrlpts[5], ctrlpts[6], ctrlpts[7]);
  	ctx.strokeStyle = "#ff0000";
  	ctx.stroke();
  }
  
  return {
    setCanvas: function(value) {
      _canvas = value;
    },
    getCanvas: function() {
      return _canvas;
    }
  }
  
}