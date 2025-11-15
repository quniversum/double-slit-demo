// --- Setup ---
const canvas = document.getElementById("experimentCanvas");
const ctx = canvas.getContext("2d");
const fireOneBtn = document.getElementById("fireOneBtn");
const fireThousandBtn = document.getElementById("fireThousandBtn");
const clearBtn = document.getElementById("clearBtn");
const detectorToggle = document.getElementById("detectorToggle");
const wallX = 150;
const slitY1 = 170;
const slitY2 = 230;
const slitWidth = 10;
const backScreenX = 700;
let isDetectorOn = false;

// --- Core Functions ---
function drawScene() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00ffff";
  ctx.fillRect(wallX, 0, 10, canvas.height);
  ctx.fillStyle = "#000";
  ctx.fillRect(wallX, slitY1, 10, slitWidth);
  ctx.fillRect(wallX, slitY2, 10, slitWidth);
  if (isDetectorOn) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(wallX + 5, slitY1 + 5, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(wallX + 5, slitY2 + 5, 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

function fireElectron() {
  if (isDetectorOn) {
    const slitChoice = Math.random() < 0.5 ? slitY1 : slitY2;
    const finalY = slitChoice + (Math.random() - 0.5) * 50;
    drawImpact(finalY);
  } else {
    const interferencePeak = Math.random();
    let finalY;
    if (interferencePeak < 0.3) {
      finalY = 200 + (Math.random() - 0.5) * 60;
    } else if (interferencePeak < 0.6) {
      finalY = 200 + 90 + (Math.random() - 0.5) * 40;
    } else if (interferencePeak < 0.9) {
      finalY = 200 - 90 + (Math.random() - 0.5) * 40;
    } else {
      finalY = Math.random() * canvas.height;
    }
    drawImpact(finalY);
  }
}

function drawImpact(y) {
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  ctx.beginPath();
  ctx.arc(backScreenX, y, 1.5, 0, Math.PI * 2);
  ctx.fill();
}

// --- Event Listeners ---
fireOneBtn.addEventListener("click", () => {
  fireElectron();
});
fireThousandBtn.addEventListener("click", () => {
  for (let i = 0; i < 1000; i++) {
    fireElectron();
  }
});
detectorToggle.addEventListener("change", () => {
  isDetectorOn = detectorToggle.checked;
  drawScene();
});
clearBtn.addEventListener("click", () => {
  drawScene();
});

// --- Initial Draw ---
drawScene();
