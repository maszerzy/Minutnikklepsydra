
let totalSeconds = 0;
let remainingSeconds = 0;
let timer = null;

const canvas = document.getElementById("hourglass");
const ctx = canvas.getContext("2d");

function adjustTime(unit, delta) {
    const el = document.getElementById(unit);
    let value = parseInt(el.textContent) + delta;
    if (value < 0) value = 0;
    el.textContent = value;
}

function startTimer() {
    const minutes = parseInt(document.getElementById("minutes").textContent);
    const seconds = parseInt(document.getElementById("seconds").textContent);
    totalSeconds = minutes * 60 + seconds;
    if (totalSeconds === 0) return;
    remainingSeconds = totalSeconds;
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
        if (remainingSeconds <= 0) {
            clearInterval(timer);
            timer = null;
        } else {
            remainingSeconds--;
            drawHourglass();
        }
    }, 1000);
}

function stopTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}

function resetTimer() {
    stopTimer();
    remainingSeconds = 0;
    drawHourglass();
}

function drawHourglass() {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const topY = 100;
    const bottomY = h - 100;
    const middleY = h / 2;
    const midX = w / 2;

    // Ramka klepsydry (czarna)
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(midX - 80, topY);
    ctx.lineTo(midX + 80, topY);
    ctx.lineTo(midX - 80, bottomY);
    ctx.lineTo(midX + 80, bottomY);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(midX - 80, topY);
    ctx.lineTo(midX, middleY);
    ctx.lineTo(midX + 80, topY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(midX - 80, bottomY);
    ctx.lineTo(midX, middleY);
    ctx.lineTo(midX + 80, bottomY);
    ctx.stroke();

    // Piasek - proporcje
    const percent = totalSeconds === 0 ? 0 : 1 - remainingSeconds / totalSeconds;

    // Piasek górny
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(midX - 70, topY + 10);
    ctx.lineTo(midX + 70, topY + 10);
    ctx.lineTo(midX + 70 * (1 - percent), middleY - 5);
    ctx.lineTo(midX - 70 * (1 - percent), middleY - 5);
    ctx.closePath();
    ctx.fill();

    // Piasek dolny
    ctx.beginPath();
    ctx.moveTo(midX - 70 * percent, middleY + 5);
    ctx.lineTo(midX + 70 * percent, middleY + 5);
    ctx.lineTo(midX + 70, bottomY - 10);
    ctx.lineTo(midX - 70, bottomY - 10);
    ctx.closePath();
    ctx.fill();

    // Strumień piasku
    if (timer) {
        ctx.beginPath();
        ctx.moveTo(midX, middleY - 5);
        ctx.lineTo(midX, middleY + 5);
        ctx.stroke();
    }
}

// Początkowy rysunek
drawHourglass();
