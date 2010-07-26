/**
 * Box
 * Simple primitive Shape object which can draw a Box.
 * 
 * Created by Anthony Cintron - anthony.cintron@gmail.com
 */
function Box(container, objName, width, height, fillColor, strokeColor, strokeWeight)
 {
		
    /**
		 * PUBLIC PROPERTIES
		 */
		this.name = objName;
    this.width = width;
    this.height = height;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.strokeWeight = (strokeWeight == undefined) ? 5: strokeWeight;
		
    /**
	 	* PRIVATE METHODS
	 	*/
   (function __init(parent)
   {
			$("<div id='"+parent.name+"'>").css(
				{
				  'background-color':fillColor,
					'border-color':strokeColor,
					position:"absolute",
					left:"0px",
					top:"0px",
					width: "100%",
					height: height+"px",
					margin:"0px",
					padding:"0px",
					'border-style': 'solid',
			}).appendTo(container);
			
    })(this);
		
		this.setY = function(value)
		{
			$("#"+this.name).css({top:value+"px"});
		}
		
		
}


Object.prototype.beget = function() {
    function F() {}
    F.prototype = this;
    return new F();
}