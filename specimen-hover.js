// caracteres que vão aparecer na “bagunça”
const RANDOM_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function randomString(length) {
  let out = "";
  for (let i = 0; i < length; i++) {
    out += RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)];
  }
  return out;
}

// aplica a todos os specimens
document.querySelectorAll(".specimen-text").forEach((el) => {
  const original = el.getAttribute("data-original") || el.textContent;

  // timeline infinita mas pausada
  const tl = gsap.timeline({
    repeat: -1,
    paused: true,
    onRepeat: () => {
      el.textContent = randomString(original.length);
    }
  });

  // intervalo entre trocas (0.4s)
  tl.to({}, { duration: 0.7 });

  el.addEventListener("mouseenter", () => {
    // ⚡ primeira troca imediata
    el.textContent = randomString(original.length);

    tl.restart();
    tl.play();
  });

  el.addEventListener("mouseleave", () => {
    tl.pause();
    el.textContent = original;
  });
});
