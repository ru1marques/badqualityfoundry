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



// seguir o mouse hover



const cursorTry = document.querySelector(".cursor-try");

// posição real do rato
let mouse = { x: 0, y: 0 };

// posição animada (cursor com lag)
let pos = { x: 0, y: 0 };

// velocidade — serve para calcular a deformação
let speed = 0;

// mover o cursor real
document.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// animação contínua
gsap.ticker.add(() => {
  // movimento elástico (lag)
  pos.x += (mouse.x - pos.x) * 0.1;
  pos.y += (mouse.y - pos.y) * 0.1;

  // calcula velocidade (diferença de posição)
  const dx = mouse.x - pos.x;
  const dy = mouse.y - pos.y;
  speed = Math.sqrt(dx * dx + dy * dy) * 0.02; // força do esticamento

  // limitar o exagero
  const scaleX = 1 + Math.min(speed, 2);
  const scaleY = 1 - Math.min(speed * 0.6, 0.25);

  // aplica transformações
  gsap.set(cursorTry, {
    x: pos.x,
    y: pos.y,
    scaleX: scaleX,
    scaleY: scaleY
  });
});

// mostrar/esconder em hover
document.querySelectorAll(".block-specimen").forEach((block) => {
  block.style.cursor = "none";

  block.addEventListener("mouseenter", () => {
    cursorTry.style.opacity = "1";
  });

  block.addEventListener("mouseleave", () => {
    cursorTry.style.opacity = "0";

    gsap.to(cursorTry, {
      scaleX: 1,
      scaleY: 1,
      duration: 0.2,
      ease: "power2.out"
    });
  });
});

