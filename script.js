const noButton = document.getElementById("no");
const yesButton = document.getElementById("yes");
const card = document.getElementById("card");
const overlay = document.getElementById("overlay");
const resetButton = document.getElementById("reset");
const secret = document.getElementById("secret");

function moveNo() {
  const padding = 12;
  const cardRect = card.getBoundingClientRect();
  const noRect = noButton.getBoundingClientRect();
  const yesRect = yesButton.getBoundingClientRect();

  let x = 0;
  let y = 0;
  let overlap = true;
  let tries = 0;

  while (overlap && tries < 60) {
    tries += 1;

    x = Math.random() * (cardRect.width - noRect.width - padding);
    y = Math.random() * (cardRect.height - noRect.height - padding);

    const yesX = yesRect.left - cardRect.left;
    const yesY = yesRect.top - cardRect.top;

    overlap = !(
      x + noRect.width < yesX ||
      x > yesX + yesRect.width ||
      y + noRect.height < yesY ||
      y > yesY + yesRect.height
    );
  }

  noButton.style.left = `${Math.max(padding, x)}px`;
  noButton.style.top = `${Math.max(padding, y)}px`;
}

noButton.addEventListener("mouseenter", moveNo);
noButton.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNo();
}, { passive: false });

yesButton.addEventListener("click", () => {
  card.classList.add("isHidden");
  overlay.classList.add("isVisible");
  overlay.setAttribute("aria-hidden", "false");
});

resetButton.addEventListener("click", () => {
  overlay.classList.remove("isVisible");
  overlay.setAttribute("aria-hidden", "true");
  card.classList.remove("isHidden");
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

window.addEventListener("load", () => {
  noButton.style.left = "210px";
  noButton.style.top = "14px";
});
