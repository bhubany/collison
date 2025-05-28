const { randomIntFromRange, randomColor, distance } = require("./utils");

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

const gravity = 1;
const friction = 0.5;

// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// addEventListener("click", () => {
//   init();
// });

// Objects
class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = 1;
    this.dy = 1;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  }

  update() {
    // if (this.y + this.radius + this.dy > canvas.height) {
    //   this.dy = -this.dy * friction;
    // } else {
    //   this.dy += gravity;
    // }

    // if (
    //   this.x + this.radius + this.dx > canvas.width ||
    //   this.x - this.radius <= 0
    // ) {
    //   this.dx = -this.dx;
    // }

    // this.x += this.dx;
    // this.y += this.dy;
    this.draw();
  }
}

function getDistance(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;

  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}

// Implementation
let circle1;
let circle2;
function init() {
  circle1 = new Circle(300, 300, 100, "black");
  circle2 = new Circle(undefined, undefined, 30, "red");
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  circle1.update();

  circle2.x = mouse.x;
  circle2.y = mouse.y;
  circle2.update();

  let distance = getDistance(circle1.x, circle1.y, circle2.x, circle2.y);

  if (distance < circle1.radius + circle2.radius) {
    circle1.color = "red";
  } else {
    circle1.color = "black";
  }
}

init();
animate();
