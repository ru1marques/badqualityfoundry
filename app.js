(function () {
  const params = new URLSearchParams(location.search);
  const chosen = params.get("f") || window.DEFAULT_FONT || Object.keys(window.FONT_CONFIGS)[0];
  const config = window.FONT_CONFIGS[chosen];



// 1) Atualiza hero (sempre vídeo)
document.title = `Specimen — ${config.name}`;
const scatter = document.getElementById("scatter");
if (scatter) {
  scatter.innerHTML = "";
  scatter.classList.add("has-video");

  const hv = config.heroVideo || {};

  if (hv.embed) {
    // YouTube/Vimeo (embed)
    const iframe = document.createElement("iframe");
    iframe.className = "hero-embed";
    iframe.src = hv.embed;
    iframe.allow = "autoplay; encrypted-media; picture-in-picture";
    iframe.allowFullscreen = true;
    scatter.appendChild(iframe);
  } else {
    // HTML5 <video>
    const vid = document.createElement("video");
    vid.className = "hero-video";
    if (hv.src)    vid.src    = hv.src;
    if (hv.poster) vid.poster = hv.poster;

    // autoplay “amigo” de mobile
    vid.autoplay = true;
    vid.muted = true;
    vid.loop = true;
    vid.playsInline = true;

    // controlos conforme config (default: true)
    vid.controls = hv.controls !== false;

    scatter.appendChild(vid);
    vid.play?.().catch(()=>{/* alguns browsers bloqueiam autoplay; ignorar */});
  }
}






  // 2) Preenche selects e specimen
  (function(){
  const preview = document.getElementById("edPreview");
  if (!preview) return;

  // usa SEMPRE o texto do config no arranque
  const txt = (config.editor && typeof config.editor.text === "string") ? config.editor.text : "";
  preview.textContent = txt;   // <-- isto ignora o que vinha no HTML
})();


  const weightSel = document.getElementById("weight");
  const styleSel  = document.getElementById("style");
  const sample    = document.getElementById("sample");
  const render    = document.getElementById("render");
  const sizeInp   = document.getElementById("size");
  const leadInp   = document.getElementById("leading");
  const trackInp  = document.getElementById("tracking");
  const sizeVal   = document.getElementById("sizeVal");
  const leadVal   = document.getElementById("leadVal");
  const trackVal  = document.getElementById("trackVal");
(function(){
  const preview = document.getElementById("edPreview");
  const edSize  = document.getElementById("edSize");
  const edLead  = document.getElementById("edLeading");
  const edExp   = document.getElementById("edExpand");
  const expLbl  = document.getElementById("expandLabel");
  if (!preview || !edSize || !edLead || !edExp) return;

  const AXES = config.axes || {};
  const hasWdth = !!AXES.wdth;       // ✅ só wdth
  const hasWght = false;             // ❌ sem wght

  if (hasWdth){
    edExp.min = AXES.wdth.min; edExp.max = AXES.wdth.max; edExp.step = 1;
    edExp.value = AXES.wdth.default || edExp.value;
    if (expLbl) expLbl.firstChild.nodeValue = AXES.wdth.label || "Expand";
  } else {
    edExp.min = 50; edExp.max = 200; edExp.step = 1; // fallback tracking
    if (expLbl) expLbl.firstChild.nodeValue = "Tracking";
  }

  function apply(){
    preview.style.fontFamily = `${config.cssFamily}, Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial`;
    preview.style.fontSize   = edSize.value + "px";
    preview.style.lineHeight = edLead.value;

    // Peso por select normal (não é eixo)
    const weightSel = document.getElementById("weight");
    if (weightSel) preview.style.fontWeight = weightSel.value;

    if (hasWdth){
      // aplica wdth e ajuda Safari com font-stretch
      preview.style.fontVariationSettings = `"wdth" ${edExp.value}`;
      preview.style.fontStretch = edExp.value + "%";
      preview.style.letterSpacing = "";
    } else {
      const em = (parseInt(edExp.value,10) - 100) / 1000;
      preview.style.letterSpacing = em + "em";
      preview.style.fontVariationSettings = "normal";
      preview.style.fontStretch = "";
    }
  }

  [edSize, edLead, edExp].forEach(el => el.addEventListener("input", apply));
  const weightSel = document.getElementById("weight");
  if (weightSel) weightSel.addEventListener("input", apply);
  apply();

// === ALIGN (só editor inline) ===
(function(){
  const cfgs   = window.FONT_CONFIGS || {};
  const chosen = window.DEFAULT_FONT || Object.keys(cfgs)[0];
  const config = cfgs[chosen];

  const preview = document.getElementById("edPreview");
  const radios  = document.querySelectorAll('input[name="edAlign"]');
  if (!preview || !radios.length) return;

  // valor inicial (opcional via config.editor.align) ou 'left'
  const initial = (config && config.editor && config.editor.align) || "left";
  radios.forEach(r => { if (r.value === initial) r.checked = true; });

  function applyAlign(val){ preview.style.textAlign = val; }

  radios.forEach(r => r.addEventListener("change", e => applyAlign(e.target.value)));
  applyAlign(initial);
})();





})();


  // 3) Grelha de glifos (igual ao teu)
// --- GLYPHS (controlado pelo config) ---
(function () {
  const grid = document.getElementById("glyphGrid");
  if (!grid) return;

  // o parent estava com class "glyphs" no HTML; remove para podermos criar grupos internamente
  grid.classList.remove("glyphs");
  grid.innerHTML = "";

  // helper para criar um grid de 12 colunas com as células .glyph já estilizadas no teu CSS
  function renderGrid(chars, family) {
    const wrap = document.createElement("div");
    wrap.className = "glyphs"; // usa a tua grelha de 12 colunas
    [...chars].forEach(ch => {
      const cell = document.createElement("div");
      cell.className = "glyph";
      cell.textContent = ch;
      cell.style.fontFamily = `${config.cssFamily}, Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial`;
      cell.style.fontWeight = 500;
      wrap.appendChild(cell);
    });
    return wrap;
  }

  // 1) Se a config tiver grupos
  if (Array.isArray(config.glyphs) && config.glyphs.length) {
    config.glyphs.forEach(group => {
      if (group.title) {
        const title = document.createElement("h3");
        title.textContent = group.title;
        title.style.margin = "16px 0 6px";
        title.style.fontSize = "14px";
        title.className = "muted";
        grid.appendChild(title);
      }
      grid.appendChild(renderGrid(group.chars || "", config.cssFamily));
    });
    return;
  }

  // 2) Se tiver um bloco único
  if (typeof config.glyphs_flat === "string" && config.glyphs_flat.length) {
    grid.appendChild(renderGrid(config.glyphs_flat, config.cssFamily));
    return;
  }

  // 3) Fallback (se não definiste nada no config)
  const fallback = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,:;!?()[]{}+-*/=±%‰@&$#—–_§£€¥ÇçÁáÉéÍíÓóÚúÃãÕõÂâÊêÎîÔôÛûÄäËëÏïÖöÜüÅåØøÑñÆæÞþÐð¿¡";
  grid.appendChild(renderGrid(fallback, config.cssFamily));
})();

// Ano do footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

})();
///////////////////////


//AUTOPLAY SLIDER SPECIMEN//


// AUTOPLAY SLIDER SPECIMEN
// AUTOPLAY SLIDER — CENTRO + LOOP INFINITO VISUAL
(function(){
  const slider = document.getElementById("specimenSlider");
  if (!slider) return;

  const track    = slider.querySelector(".slider-track");
  const slides   = Array.from(slider.querySelectorAll(".slider-slide"));
  const prevBtn  = slider.querySelector("[data-slider-prev]");
  const nextBtn  = slider.querySelector("[data-slider-next]");

  if (!track || !slides.length) return;

  const realSlides = slides.slice();         // cópia dos originais
  const realTotal  = realSlides.length;

  // Clones para loop infinito visual
  const firstClone = realSlides[0].cloneNode(true);
  const lastClone  = realSlides[realTotal - 1].cloneNode(true);

  track.insertBefore(lastClone, realSlides[0]);
  track.appendChild(firstClone);

  const allSlides  = Array.from(track.querySelectorAll(".slider-slide")); // real + 2 clones

  let index = 1;                        // começamos no 1: primeiro slide REAL
  const AUTOPLAY_DELAY = 3000;
  let autoplayId = null;

  // centra o slide de índice i (em allSlides)
  function centerSlide(i, withTransition = true){
    const slide      = allSlides[i];
    if (!slide) return;

    const sliderRect = slider.getBoundingClientRect();
    const viewportCenter = window.innerWidth / 2;

    // posição do centro do slide em relação ao viewport, ignorando transform
    const slideCenter = sliderRect.left + slide.offsetLeft + (slide.offsetWidth / 2);

    const offset = viewportCenter - slideCenter;

    if (!withTransition){
      const prevTransition = track.style.transition;
      track.style.transition = "none";
      track.style.transform  = `translateX(${offset}px)`;
      // força reflow para o browser “aceitar” o change
      // eslint-disable-next-line no-unused-expressions
      track.offsetHeight;
      track.style.transition = prevTransition || "transform 0.6s ease";
    } else {
      track.style.transform = `translateX(${offset}px)`;
    }
  }

  function goToSlide(newIndex){
    index = newIndex;
    centerSlide(index, true);
  }

  function next(){
    goToSlide(index + 1);
  }

  function prev(){
    goToSlide(index - 1);
  }

  function startAutoplay(){
    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    stopAutoplay();
    autoplayId = setInterval(next, AUTOPLAY_DELAY);
  }

  function stopAutoplay(){
    if (autoplayId !== null){
      clearInterval(autoplayId);
      autoplayId = null;
    }
  }

  // Corrige quando passamos para os clones (loop infinito)
  track.addEventListener("transitionend", function(){
    // se estamos no clone do último (primeira posição: 0)
    if (index === 0){
      index = realTotal;          // última slide REAL (antes do clone final)
      centerSlide(index, false);  // jump sem animação
    }
    // se estamos no clone do primeiro (última posição do array)
    else if (index === allSlides.length - 1){
      index = 1;                  // primeira slide REAL
      centerSlide(index, false);  // jump sem animação
    }
  });

  // Botões
  if (nextBtn){
    nextBtn.addEventListener("click", function(){
      next();
      startAutoplay();
    });
  }
  if (prevBtn){
    prevBtn.addEventListener("click", function(){
      prev();
      startAutoplay();
    });
  }

  // Pausa ao passar o rato
  slider.addEventListener("mouseenter", stopAutoplay);
  slider.addEventListener("mouseleave", startAutoplay);

  // Recentrar em resize
  window.addEventListener("resize", function(){
    centerSlide(index, false);
  });

  // Start
  centerSlide(index, false);  // 1º real ao centro
  startAutoplay();
})();
