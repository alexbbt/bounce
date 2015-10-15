$(document).ready(function () {
    //console.log($('.animate'));
    $('.animate').each(animateDiv);
});

var mouseX = 0;
var mouseY = 0;
$(document).bind('mousemove',function(e){ 
  //console.log("e.pageX: " + e.pageX + ", e.pageY: " + e.pageY);
  mouseX = e.pageX;
  mouseY = e.pageY;
});
function makeNewPosition(div) {
  var setting = $('input[name=edgesOrCenter]:checked').val();
  var h = $('#animateBox').height() - $(div).height();
  var w = $('#animateBox').width() - $(div).width();
  //console.log("h: " + h + " w: " + w);
  //console.log("divh: " + $(div).height() + " divw: " + $(div).width());
  var nh = Math.floor(Math.random() * h);
  var nw = Math.floor(Math.random() * w); 
  if (setting == 'edges') {
    if ((h-nh)>(w-nw)) {
      if ((w-nw>nw)) {
        nw = 0;
      } else{
        nw = w;
      };
    } else{
      if ((h-nh>nh)) {
        nh = 0;
      } else{
        nh = w;
      };
    };
  } else if (setting == 'mouse'){
    nh = mouseY - ((mouseY - nh)/$('#mouseStrength').val());
    nw = mouseX - ((mouseX - nw)/$('#mouseStrength').val());
  } else {
       
  };
    // Get viewport dimensions (remove the dimension of the div)
    return [nh, nw];
}

//var time = 100;

function animateDiv() {
    var newq = makeNewPosition($(this));
    $(this).animate({
        top: newq[0],
        left: newq[1]
    }, parseInt($('#speed').val()), function () {
        $(this).each(animateDiv);
    });
};

var string = '';

$( document ).keypress(function(e) {
  var charater = $('input[name=charOrString]:checked').val() == 'char';
  //console.log(charater);
  //console.log('keypress', String.fromCharCode( e.which ));
  //console.log(e.charCode);
  if (!$('#speed').is(':focus') && !$('#mouseStrength').is(':focus')) {
    if (charater) {
      var newDiv = document.createElement('div');
        newDiv.className = "animate";
        newDiv.innerHTML = String.fromCharCode( e.which );
        $('#animateBox').append(newDiv);
        $(newDiv).each(animateDiv);
        string = '';
        $('#typing').html(string);
    } else{
      if (e.charCode === 13) {
        var newDiv = document.createElement('div');
        newDiv.className = "animate";
        newDiv.innerHTML = string;
        $(newDiv).each(animateDiv);
        $('#animateBox').append(newDiv);
        string = '';
        $('#typing').html(string);
      } else if (e.charCode === 8) {
        alert('back');
      } else {
        string += String.fromCharCode( e.which );
        $('#typing').html(string);
      }
    };
  }
});