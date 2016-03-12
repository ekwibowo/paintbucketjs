var demoCanvasId = "test-canvas";

// Bind paintbucket plugin to button
var $paintbucketBtn = $('#paintbucket-plugin');
$paintbucketBtn.paintbucket('#' + demoCanvasId);

$paintbucketBtn.click(function () {
   if ($(this).data('paintbucket-active') === 'active') {
       $(this)[0].classList.add('pb-active');
   } else {
       $(this)[0].classList.remove('pb-active');
   }
});

// Initialize colorpicker
$(function(){
    $('.colorpicker-input').colorpicker({color: '#ffff00'}).on('changeColor.colorpicker', function(event){
        var pickedColor = event.color.toHex();
        $paintbucketBtn.data('fill-color', pickedColor);
        var v = $(this).parent().find('.colorpicker-input-val');
        $(v[0]).css('background-color', pickedColor);
    });
});

// Button event listeners
$('#view-on-github-btn').click(function () {
   window.open("https://github.com/ekwibowo/paintbucketjs", '_blank');
});

$('#download-bin-btn').click(function () {
   window.open("https://github.com/ekwibowo/paintbucketjs/releases/download/v0.1.0/paintbucket.min.js");
});

// Code highlighting
hljs.initHighlightingOnLoad();

$('pre').each(function () {
    var lang = $(this).find('code')[0].classList[0];
    $(this).prepend('<span class="label label-default lang-label">' + lang + '</span>');
});

// Sample image loader
$('#load-sample-image').click(function () {
    var c = document.getElementById(demoCanvasId);
    var ctx  = c.getContext("2d");

    ctx.beginPath();
    ctx.arc(170, 170, 150, 0, 2 * Math.PI, false);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#ff3300';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(400, 25);
    ctx.lineTo(450, 25);
    ctx.arcTo(450, 275, 550, 275, 50);
    ctx.moveTo(400, 25);
    ctx.arcTo(400, 325, 600, 325, 100);
    ctx.moveTo(600, 25);
    ctx.lineTo(550, 25);
    ctx.arcTo(550, 275, 450, 275, 50);
    ctx.moveTo(600, 25);
    ctx.arcTo(600, 325, 400, 325, 100);
    ctx.strokeStyle = '#000088';
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(20, 350, 300, 200);
    ctx.fillStyle = '#d1f4ea';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#111111';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(500, 450, 100, -0.5 * Math.PI, Math.PI);
    ctx.arc(485, 450, 85, Math.PI, 2 * Math.PI);
    ctx.arc(500, 450, 70, 0, Math.PI);
    ctx.arc(485, 450, 55, Math.PI, 2 * Math.PI);
    ctx.arc(500, 450, 40, 0, Math.PI);
    ctx.arc(485, 450, 25, Math.PI, 2 * Math.PI);
    ctx.moveTo(500, 350);
    ctx.arc(490, 450, 90, -0.4 * Math.PI, 0);
    ctx.arc(500, 450, 80, 0, Math.PI);
    ctx.arc(485, 450, 65, Math.PI, 2 * Math.PI);
    ctx.arc(500, 450, 50, 0, Math.PI);
    ctx.arc(485, 450, 35, Math.PI, 2 * Math.PI);
    ctx.arc(500, 450, 20, 0, Math.PI);
    ctx.arc(485, 450, 5, Math.PI, 2 * Math.PI);
    ctx.lineTo(510, 450);
    ctx.strokeStyle = '#ff9b00';
    ctx.stroke();
});