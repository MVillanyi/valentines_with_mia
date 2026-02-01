const noButton = document.getElementById("no");
const yesButton = document.getElementById("yes");
const arena = document.getElementById("arena");
const secret = document.getElementById("secret");

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
  secret.textContent = "Yes clicked.";
  setTimeout(() => { secret.textContent = ""; }, 900);
});

let buffer = "";

window.addEventListener("keydown", (e) => {
  const key = (e.key || "").toLowerCase();
  if (!key.match(/^[a-z]$/)) return;

  buffer = (buffer + key).slice(-16);

  if (buffer.includes("husband")) {
    secret.textContent = "Husband mode noted.";
    buffer = "";
  }
});
