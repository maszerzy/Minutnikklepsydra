let time = 0;
let initialTime = 0;
let interval = null;

function updateDisplay() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  document.getElementById("display").textContent =
    String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0');

  // Aktualizacja klepsydry
  if (initialTime > 0) {
    const percent = (initialTime - time) / initialTime;
    const topHeight = Math.max(0, 50 - percent * 50);
    const bottomHeight = Math.min(50, percent * 50);
    document.getElementById("sandTop").style.height = topHeight + "%";
    document.getElementById("sandBottom").style.height = bottomHeight + "%";
  }
}

function setTime(min) {
  stopTimer();
  time = min * 60;
  initialTime = time;
  updateDisplay();
}

function startTimer() {
  if (interval) return;
  interval = setInterval(() => {
    if (time > 0) {
      time--;
      updateDisplay();
    } else {
      clearInterval(interval);
      interval = null;
      document.body.style.backgroundColor = "#fff";
      let flashes = 6;
      const flash = setInterval(() => {
        document.body.style.backgroundColor = (flashes % 2 === 0) ? "#000" : "#fff";
        flashes--;
        if (flashes <= 0) {
          clearInterval(flash);
          document.body.style.backgroundColor = "#fff";
        }
      }, 300);
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
  interval = null;
}

function resetTimer() {
  stopTimer();
  time = initialTime;
  updateDisplay();
}

updateDisplay();