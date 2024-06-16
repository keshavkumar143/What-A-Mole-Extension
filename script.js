let score = 0;
let lastHole;
let timeUp = false;
let gameDuration = 20000; // 20 seconds
let countdown;
let countdownInterval;

document.getElementById('start').addEventListener('click', startGame);
document.getElementById('restart').addEventListener('click', restartGame);

function startGame() {
  score = 0;
  document.getElementById('score').textContent = score;
  document.getElementById('time').textContent = gameDuration / 1000;
  timeUp = false;
  document.getElementById('start').disabled = true;
  document.getElementById('restart').style.display = 'none';
  peep();
  countdown = gameDuration / 1000;
  countdownInterval = setInterval(() => {
    countdown--;
    document.getElementById('time').textContent = countdown;
    if (countdown <= 0) {
      clearInterval(countdownInterval);
    }
  }, 1000);
  setTimeout(() => {
    timeUp = true;
    document.getElementById('start').disabled = false;
    document.getElementById('restart').style.display = 'block';
  }, gameDuration);
}

function restartGame() {
  clearInterval(countdownInterval);
  startGame();
}

function peep() {
  const time = randomTime(600, 1500); // Slower appearance time
  const hole = randomHole(document.querySelectorAll('.hole'));
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

document.querySelectorAll('.hole').forEach(hole => {
  const mole = document.createElement('div');
  mole.classList.add('mole');
  hole.appendChild(mole);
  mole.addEventListener('click', () => {
    if (!hole.classList.contains('up')) return;
    score++;
    mole.parentElement.classList.remove('up');
    document.getElementById('score').textContent = score;
  });
});
