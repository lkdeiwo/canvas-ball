const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var gravity = 1;
var friction = 0.99;
var colorArray = ["#34ebdc", "#348ceb", "#eb34b4"];

// utility function
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

class particle {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  update() {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity;
    }

    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

var ball;
var ballArray = [];
function init() {
  for (var i = 0; i < 100; i++) {
    var radius = randomIntFromRange(3, 8);

    var x = randomIntFromRange(0, canvas.width - radius);
    var y = randomIntFromRange(0, canvas.height - radius);
    var dx = randomIntFromRange(-2, 2);
    var dy = randomIntFromRange(-2, 2);
    var color = randomColor(colorArray);
    ballArray.push(new particle(x, y, dx, dy, radius, color));
  }
  console.log(ballArray);

  //   ball = new particle(
  //     canvas.width / 2,
  //     canvas.height / 2,
  //     2,
  //     30,
  //     "rgb(52, 210, 235)"
  //   );
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < ballArray.length; i++) {
    ballArray[i].update();
  }
  requestAnimationFrame(animate);
}

init();
animate();
