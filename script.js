let time = 0;
let initialTime = 0;
let interval = null;
let minutes = 0;
let seconds = 0;

function updateDisplay() {
  document.getElementById("minDisplay").textContent = String(minutes).padStart(2, '0');
  document.getElementById("secDisplay").textContent = String(seconds).padStart(2, '0');

  time = minutes * 60 + seconds;
  initialTime = time;

  const percent = initialTime === 0 ? 0 : (initialTime - time) / initialTime;
  const topHeight = Math.max(0, 50 - percent * 50);
  const bottomHeight = Math.min(50, percent * 50);
  document.getElementById("sandTop").style.height = topHeight + "%";
  document.getElementById("sandBottom").style.height = bottomHeight + "%";
}

function changeTime(unit, delta) {
  if (interval) return; // Don't change during countdown
  if (unit === 'min') {
    minutes = Math.max(0, minutes + delta);
  } else {
    seconds = Math.max(0, Math.min(59, seconds + delta));
  }
  updateDisplay();
}

function startTimer() {
  if (interval || (minutes === 0 && seconds === 0)) return;
  time = minutes * 60 + seconds;
  initialTime = time;

  interval = setInterval(() => {
    if (time > 0) {
      time--;
      minutes = Math.floor(time / 60);
      seconds = time % 60;
      updateDisplay();
    } else {
      clearInterval(interval);
      interval = null;
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
  interval = null;
}

function resetTimer() {
  stopTimer();
  updateDisplay();
}

updateDisplay();