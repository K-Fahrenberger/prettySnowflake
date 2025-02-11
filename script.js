const SNOWFLAKE_NUMBER = 420;
const SNOWFLAKE_SIZE_INITIAL = 8;
const SNOWFLAKE_SPEED_INITIAL = 2;
const SNOWFLAKE_COLOR = "white";

const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
const snowflakes = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();

const createSnowflake = () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  radius: Math.floor(Math.random() * SNOWFLAKE_SIZE_INITIAL) + 2,
  color: SNOWFLAKE_COLOR,
  speed: Math.random() * SNOWFLAKE_SPEED_INITIAL + 1,
  sway: Math.random(),
});

function drawSnowflake(snowflake) {
  context.beginPath();
  context.arc(snowflake.x, snowflake.y, snowflake.radius, 0, 2 * Math.PI);
  context.fillStyle = snowflake.color;
  context.fill();
  context.closePath();
}

function updateSnowflake(snowflake) {
  snowflake.y += snowflake.speed;
  snowflake.x += snowflake.sway;
  if (snowflake.y > canvas.height) {
    snowflake.y = 0;
    snowflake.x = Math.random() * canvas.width;
  }
}

function initSnowflakes() {
  for (let i = 0; i < SNOWFLAKE_NUMBER; i++) {
    snowflakes.push(createSnowflake());
  }
}

function animateSnowflakes() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  snowflakes.forEach((snowflake) => {
    drawSnowflake(snowflake);
    updateSnowflake(snowflake);
  });

  requestAnimationFrame(animateSnowflakes);
}

window.addEventListener("resize", resizeCanvas);

initSnowflakes();
animateSnowflakes();
