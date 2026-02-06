// Target date: March 8, 2026 at midnight
const TARGET_DATE = new Date('2026-03-08T00:00:00');

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const titleEl = document.getElementById('title');
const timerContainer = document.getElementById('timer-container');
const sparklesContainer = document.getElementById('sparkles');

function updateCountdown() {
  const now = new Date();
  const diff = TARGET_DATE - now;

  if (diff <= 0) {
    // Timer complete
    titleEl.textContent = "It's time for Disney!";
    titleEl.classList.add('celebrate');
    timerContainer.style.display = 'none';
    burstSparkles(30);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

// Sparkle effect
function createSparkle() {
  const sparkle = document.createElement('div');
  sparkle.classList.add('sparkle');

  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight * 0.8 + window.innerHeight * 0.1;
  const duration = 2 + Math.random() * 3;
  const size = 2 + Math.random() * 4;

  sparkle.style.left = x + 'px';
  sparkle.style.top = y + 'px';
  sparkle.style.width = size + 'px';
  sparkle.style.height = size + 'px';
  sparkle.style.animationDuration = duration + 's';

  sparklesContainer.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), duration * 1000);
}

function burstSparkles(count) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => createSparkle(), i * 80);
  }
}

// Ambient sparkles while counting down
function ambientSparkles() {
  createSparkle();
  const nextDelay = 400 + Math.random() * 800;
  setTimeout(ambientSparkles, nextDelay);
}

// Initialize
updateCountdown();
setInterval(updateCountdown, 1000);
ambientSparkles();
