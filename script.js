// small list of cities with utc offsets in minutes
// not perfect, ignores DST shifts mid-year, but good enough for this
var zones = [
  { name: 'local', offset: null },
  { name: 'London', offset: 0 },
  { name: 'Berlin', offset: 60 },
  { name: 'Istanbul', offset: 180 },
  { name: 'New York', offset: -300 },
  { name: 'Los Angeles', offset: -480 },
  { name: 'Tokyo', offset: 540 },
  { name: 'Sydney', offset: 600 }
];

var mode = 'analog';      // analog or digital
var hour24 = false;
var selectedZone = zones[0];

var analogEl = document.getElementById('analog');
var digitalEl = document.getElementById('digital');
var timeText = document.getElementById('timeText');
var dateText = document.getElementById('dateText');
var hourHand = document.getElementById('hourHand');
var minuteHand = document.getElementById('minuteHand');
var secondHand = document.getElementById('secondHand');
var ticksGroup = document.getElementById('ticks');

var toggleModeBtn = document.getElementById('toggleMode');
var toggleHourBtn = document.getElementById('toggleHour');
var tzPicker = document.getElementById('tzPicker');

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

// fill the timezone select
function buildPicker() {
  for (var i = 0; i < zones.length; i++) {
    var opt = document.createElement('option');
    opt.value = i;
    opt.textContent = zones[i].name;
    tzPicker.appendChild(opt);
  }
}

// gets a Date adjusted for the picked zone
function getZonedDate() {
  var now = new Date();
  if (selectedZone.offset === null) return now;
  // shift from local to utc, then to target offset
  var utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utcMs + selectedZone.offset * 60000);
}

function pad(n) {
  return n < 10 ? '0' + n : '' + n;
}

function formatDigital(d) {
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  if (hour24) {
    return pad(h) + ':' + pad(m) + ':' + pad(s);
  } else {
    var suffix = h >= 12 ? 'PM' : 'AM';
    var hh = h % 12;
    if (hh === 0) hh = 12;
    return pad(hh) + ':' + pad(m) + ':' + pad(s) + ' ' + suffix;
  }
}

function formatDate(d) {
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return days[d.getDay()] + ', ' + months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
}

function tick() {
  var d = getZonedDate();
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  var ms = d.getMilliseconds();

  // smooth second hand uses ms
  var secAngle = s * 6 + ms * 0.006;
  var minAngle = m * 6 + s * 0.1;
  var hourAngle = (h % 12) * 30 + m * 0.5;

  hourHand.setAttribute('transform', 'rotate(' + hourAngle + ' 100 100)');
  minuteHand.setAttribute('transform', 'rotate(' + minAngle + ' 100 100)');
  secondHand.setAttribute('transform', 'rotate(' + secAngle + ' 100 100)');

  timeText.textContent = formatDigital(d);
  dateText.textContent = formatDate(d);
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

toggleHourBtn.addEventListener('click', function () {
  hour24 = !hour24;
  toggleHourBtn.textContent = hour24 ? '12h' : '24h';
});

tzPicker.addEventListener('change', function () {
  selectedZone = zones[parseInt(tzPicker.value, 10)];
});

drawTicks();
buildPicker();
tick();
setInterval(tick, 50);
