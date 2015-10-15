$(document).ready(function () {
    //console.log($('.animate'));
    $('.animate').each(animateDiv);
});

function makeNewPosition(div) {
  var edges = $('input[name=edgesOrCenter]:checked').val() == 'edges';
  var h = $(window).height() - $(div).height();
  var w = $(window).width() - $(div).width();
  console
  if (edges) {
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    if (nh>nw) {
      nw = 0;
    } else{
      nh = 0;
    };
  } else{
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);    
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
  console.log(charater);
  console.log('keypress', String.fromCharCode( e.which ));
  console.log(e.charCode);
  if (!$('#speed').is(':focus')) {
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