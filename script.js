const pages = document.querySelectorAll(".card");

function showPage(id) {
  pages.forEach(p => p.classList.add("hidden"));
  const el = document.getElementById(id);
  if (el) el.classList.remove("hidden");
}

const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const buttonsArea = document.querySelector(".buttons");

function moveNoInsideBox() {
  const area = buttonsArea.getBoundingClientRect();
  const btn = noBtn.getBoundingClientRect();

  const maxX = area.width - btn.width;
  const maxY = area.height - btn.height;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  const currentRight = parseFloat(getComputedStyle(noBtn).right) || 0;
  const baseX = maxX - currentRight;
  const dx = x - baseX;

  noBtn.style.transform = `translate(${dx}px, ${y}px)`;
}

noBtn.addEventListener("mouseenter", moveNoInsideBox);
noBtn.addEventListener("pointerenter", moveNoInsideBox);
noBtn.addEventListener("click", moveNoInsideBox);

yesBtn.addEventListener("click", () => {
  showPage("page-hurray");
  if (typeof confetti === "function") {
    confetti({
      particleCount: 70,
      spread: 45,
      startVelocity: 18,
      scalar: 0.8,
      origin: { y: 0.65 }
    });
  }
});

document.querySelectorAll(".next").forEach(btn => {
  btn.addEventListener("click", () => {
    const next = btn.getAttribute("data-next");
    if (next) showPage(next);
  });
});

const gallery = document.getElementById("gallery");
if (gallery) {
  for (let i = 1; i <= 10; i++) {
    const img = document.createElement("img");
    img.src = `favorite_${i}.png`;
    img.alt = `Favorite ${i}`;
    gallery.appendChild(img);
  }
}
