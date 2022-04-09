// analog clock, hand rotation in svg

var hourHand = document.getElementById('hourHand');
var minuteHand = document.getElementById('minuteHand');
var secondHand = document.getElementById('secondHand');
var ticksGroup = document.getElementById('ticks');

// build the tick marks once
function drawTicks() {
  for (var i = 0; i < 60; i++) {
    var angle = i * 6;
    var rad = (angle - 90) * Math.PI / 180;
    var inner = i % 5 === 0 ? 82 : 87;
    var outer = 92;
    var x1 = 100 + Math.cos(rad) * inner;
    var y1 = 100 + Math.sin(rad) * inner;
    var x2 = 100 + Math.cos(rad) * outer;
    var y2 = 100 + Math.sin(rad) * outer;
    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('class', i % 5 === 0 ? 'tick big' : 'tick');
    ticksGroup.appendChild(line);
  }
}

function tick() {
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();

  var secAngle = s * 6;
  var minAngle = m * 6;
  var hourAngle = (h % 12) * 30 + m * 0.5;

  hourHand.setAttribute('transform', 'rotate(' + hourAngle + ' 100 100)');
  minuteHand.setAttribute('transform', 'rotate(' + minAngle + ' 100 100)');
  secondHand.setAttribute('transform', 'rotate(' + secAngle + ' 100 100)');
}

drawTicks();
tick();
setInterval(tick, 1000);
