$(document).ready(function () {
    //console.log($('.animate'));
    $('.animate').each(animateDiv);
});

function makeNewPosition() {

    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh, nw];

}

function animateDiv() {
    var newq = makeNewPosition();
    //console.log($(this));
    $(this).animate({
        top: newq[0],
        left: newq[1]
    }, function () {
        $(this).each(animateDiv);
    });
};

$( document ).keypress(function(e) {
  console.log('keypress', String.fromCharCode( e.which ));
  var newDiv = document.createElement('div');
  newDiv.className = "animate";
  newDiv.innerHTML = String.fromCharCode( e.which );
  $('#animateBox').append(newDiv);
  $('.animate').each(animateDiv);
});