/**
 * Intearctive Box
 * 
 * 
 * Created by Anthony Cintron - anthony.cintron@gmail.com
 */
function InteractiveBox(objID, name, width, height, fillColor, strokeColor, strokeWeight, dfltText)
 {
    Box.call(this, objID, name, width, height, fillColor, strokeColor, strokeWeight);

    var defaultText = dfltText;
    
    // draw corner points
    (function __init__(that)
    {
        $("<div id='content_" + name + "' contenteditable='false'>").css({
            position: "absolute",
            left: '0px',
            width: "100%",
            height: height+"px",
        }).appendTo('#' + name);
        
        createField();
        
    } (this));
    
    function createField() {
      
      $('<p contenteditable="true">').text(defaultText).css({
        'margin-top':0,
        'margin-bottom':0,
        'margin-left':'5px',
        'text-align':'left',
        height:'20px',
      }).keydown(function(event) {
        if ( event.keyCode == 13 ) {
          event.preventDefault();
          createField();
          resize();
        }
      }).appendTo("#content_" + name);
    }
    
    function resize() {
      height += 20;
      var newHeight = height;
      $('#'+name).css({
        height: newHeight+'px'
      });
      
      $('#content_'+name).css({
        height: newHeight+'px'
      });
      
      $('#'+name).trigger('update');
    }

}

DiagramObject.prototype = Box.prototype.beget();
//InteractiveBox.prototype = new Box();
// container is the canvas/viewport
// name is the diagram object's name
function DiagramObject(container, name, width, height, fillColor, strokeColor) {
    // create diagram 
    $("<div id='" + name + "'>").css({
        position: 'absolute',
        width: width + 'px',
        height: height + 'px'
    }).appendTo(container);
    // make diagram draggable
    $("#" + name + "").draggable( { 
      cursor:'crosshair'
    }).mouseout(function() {
        $(this).css('border-color', strokeColor);
    }).resizable( {
      'maxHeight':78,
      'minHeight':78
    });
    
    (function __init() {
        for (var i = 0; i < 3; i += 1) {
            // create each interactive box.
            var ib = new InteractiveBox("#" + name,
            name+"__obj" + i,
            150,
            25,
            "#F4C8FF",
            "#BB6891",
            null,
            getDefaultName(i));
          
          // subscribe to update event
          $('#'+name+'__obj'+i).bind('update', function() {
            updatePosition();
          });
          positionIABox(i);  
        }
    })();
    
    function updatePosition() {
      for ( var i = 0; i < 3; i+=1) {
        positionIABox(i);
      }
    }
    
    function positionIABox(index) {
      if (index > 0) {
          var num = index - 1;

          var newTopPos = Number(
          extractPX(
          $("#"+name+"__obj" + (num)).css(
          "top"
          )));

          var newHeight = Number(
          extractPX(
          $("#"+name+"__obj" + (num)).css(
          "height"
          )));

          var lastObjPos = (newTopPos + newHeight);

          $("#"+name+"__obj" + index).css({
              "top": lastObjPos
          });
      }
    }
    
    function getDefaultName(index) {
      var value = 'Class'
      switch(index) {
        case 0:
          value = 'Class';
          break;
        case 1:
          value = 'Properties';
          break;
        case 2:
          value = 'Methods';
          break;
      }
      return value;
    }
    
    function extractPX(value) {
        var len = 2;
        if (value.length == 3) {
            len = 1
        }
        return value.substr(0, len);
    }
    
    
    return {
      x: function (value) {
        var newPos = $('#'+ name ).css({left:value+'px'});
        return newPos;
      },
      y: function (value) {
        var newPos = $('#'+ name ).css({top:value+'px'})
        return newPos;
      }
    }
}