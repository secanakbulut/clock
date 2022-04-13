// analog clock + digital toggle

var mode = 'analog';

var analogEl = document.getElementById('analog');
var digitalEl = document.getElementById('digital');
var timeText = document.getElementById('timeText');
var hourHand = document.getElementById('hourHand');
var minuteHand = document.getElementById('minuteHand');
var secondHand = document.getElementById('secondHand');
var ticksGroup = document.getElementById('ticks');
var toggleModeBtn = document.getElementById('toggleMode');

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

function pad(n) {
  return n < 10 ? '0' + n : '' + n;
}

function tick() {
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  var ms = d.getMilliseconds();

  // smooth second hand uses ms so it sweeps instead of ticking
  var secAngle = s * 6 + ms * 0.006;
  var minAngle = m * 6 + s * 0.1;
  var hourAngle = (h % 12) * 30 + m * 0.5;

  hourHand.setAttribute('transform', 'rotate(' + hourAngle + ' 100 100)');
  minuteHand.setAttribute('transform', 'rotate(' + minAngle + ' 100 100)');
  secondHand.setAttribute('transform', 'rotate(' + secAngle + ' 100 100)');

  timeText.textContent = pad(h) + ':' + pad(m) + ':' + pad(s);
}

toggleModeBtn.addEventListener('click', function () {
  if (mode === 'analog') {
    mode = 'digital';
    analogEl.classList.add('hidden');
    digitalEl.classList.remove('hidden');
    toggleModeBtn.textContent = 'show analog';
  } else {
    mode = 'analog';
    digitalEl.classList.add('hidden');
    analogEl.classList.remove('hidden');
    toggleModeBtn.textContent = 'show digital';
  }
});

drawTicks();
tick();
setInterval(tick, 50);
