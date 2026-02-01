const noButton = document.getElementById("no");
const yesButton = document.getElementById("yes");
const arena = document.getElementById("arena");
const overlay = document.getElementById("overlay");
const resetButton = document.getElementById("reset");
const secret = document.getElementById("secret");
const overlayText = document.getElementById("overlayText");

function moveNo() {
  const padding = 10;

  const arenaRect = arena.getBoundingClientRect();
  const noRect = noButton.getBoundingClientRect();
  const yesRect = yesButton.getBoundingClientRect();

  const maxX = arenaRect.width - noRect.width - padding;
  const maxY = arenaRect.height - noRect.height - padding;

  if (maxX <= padding || maxY <= padding) return;

  const yesX = yesRect.left - arenaRect.left;
  const yesY = yesRect.top - arenaRect.top;

  let x = 0;
  let y = 0;
  let overlap = true;
  let tries = 0;

  while (overlap && tries < 80) {
    tries += 1;

    x = Math.random() * maxX + padding;
    y = Math.random() * maxY + padding;

    overlap = !(
      x + noRect.width < yesX ||
      x > yesX + yesRect.width ||
      y + noRect.height < yesY ||
      y > yesY + yesRect.height
    );
  }

  noButton.style.left = `${x}px`;
  noButton.style.top = `${y}px`;
}

noButton.addEventListener("mouseenter", moveNo);
noButton.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNo();
}, { passive: false });

yesButton.addEventListener("click", () => {
  overlay.classList.add("isVisible");
  overlay.setAttribute("aria-hidden", "false");
  overlayText.textContent = "Okay.";
});

resetButton.addEventListener("click", () => {
  overlay.classList.remove("isVisible");
  overlay.setAttribute("aria-hidden", "true");
  overlayText.textContent = "Okay.";
});

let buffer = "";
let eggTimer = null;

window.addEventListener("keydown", (e) => {
  const key = (e.key || "").toLowerCase();
  if (!key.match(/^[a-z]$/)) return;

  buffer = (buffer + key).slice(-18);

  if (buffer.includes("husband")) {
    overlayText.textContent = "Okay, husband.";
    buffer = "";

    if (eggTimer) clearTimeout(eggTimer);
    eggTimer = setTimeout(() => {
      overlayText.textContent = "Okay.";
    }, 2000);
  }
});

window.addEventListener("load", () => {
  noButton.style.left = "210px";
  noButton.style.top = "14px";
});
