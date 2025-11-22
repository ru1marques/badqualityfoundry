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

////////// SLIDER INFINITO C IMAGENS AUTOMATICAS ////

document.addEventListener("DOMContentLoaded", () => {
  const fontId = window.DEFAULT_FONT || "maria";
  const cfg = window.FONT_CONFIGS?.[fontId];
  if (!cfg?.slider || !Array.isArray(cfg.slider)) return;

  const root = document.getElementById("specimenSlider");
  const track = document.getElementById("sliderTrack");
  const viewport = root.querySelector(".slider-viewport");
  if (!track || !viewport) return;

  // 1) render slides reais
  track.innerHTML = cfg.slider
    .map((src, i) => `
      <figure class="slider-slide" data-real-index="${i}">
        <img src="${src}" class="slider-img" alt="slide ${i+1}">
      </figure>
    `)
    .join("");

  let slides = Array.from(root.querySelectorAll(".slider-slide"));

  // 2) criar clones
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  firstClone.dataset.clone = "first";
  lastClone.dataset.clone = "last";

  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  // atualizar lista completa
  slides = Array.from(root.querySelectorAll(".slider-slide"));

  // começar no slide 1 real (porque 0 é clone)
  let index = 1;

  function update(animate = true) {
    const viewportRect = viewport.getBoundingClientRect();
    const active = slides[index];
    const activeRect = active.getBoundingClientRect();

    // centro do slide ativo dentro do track
    const activeCenter = active.offsetLeft + activeRect.width / 2;

    // centro do viewport
    const viewportCenter = viewportRect.width / 2;

    // offset necessário
    const x = viewportCenter - activeCenter;

    track.style.transition = animate ? "transform .35s ease" : "none";
    track.style.transform = `translateX(${x}px)`;
  }

  // Setas
  root.querySelector("[data-slider-prev]")?.addEventListener("click", () => {
    index--;
    update(true);
  });

  root.querySelector("[data-slider-next]")?.addEventListener("click", () => {
    index++;
    update(true);
  });

  // 3) quando a animação termina, verificar clones
  track.addEventListener("transitionend", () => {
    const current = slides[index];

    if (current?.dataset.clone === "first") {
      // se chegámos ao clone que está no fim → saltar ao primeiro real
      index = 1;
      update(false);
    } 
    else if (current?.dataset.clone === "last") {
      // se chegámos ao clone que está no início → saltar ao último real
      index = slides.length - 2;
      update(false);
    }
  });

  // atualizar ao carregar e em resize
  update(false);
  window.addEventListener("resize", () => update(false));
});


///////////////// text samples///////////
document.addEventListener("DOMContentLoaded", () => {
  const fontId = window.DEFAULT_FONT || "maria";
  const cfg = window.FONT_CONFIGS?.[fontId];
  if (!cfg) return;

  const host = document.getElementById("editors2col");
  if (!host) return;

  // defaults para as 2 colunas
  const colDefaults = Array.isArray(cfg.editors2col) && cfg.editors2col.length
    ? cfg.editors2col
    : [
        cfg.editor || {},
        {
          ...(cfg.editor || {}),
          expand: cfg.axes?.wdth?.max ?? 300,
          text: (cfg.editor?.text || cfg.specimenText || "").toUpperCase()
        }
      ];

  // construir HTML dos 2 editores
  host.innerHTML = colDefaults.map((d, i) => buildMiniEditorHTML(i + 1)).join("");

  // iniciar cada editor
  colDefaults.forEach((d, i) => initMiniEditor(cfg, i + 1, d));
});


// ---------- HTML do editor mini (com IDs únicos) ----------
function buildMiniEditorHTML(n){
  return `
    <div class="editor-mini panel" data-editor="${n}">
      <div class="type-toolbar">
        <label>Size
          <input id="ed${n}Size" type="range" min="24" max="640" step="1" value="128">
        </label>
        <label>Leading
          <input id="ed${n}Leading" type="range" min="0.8" max="2" step="0.01" value="1.0">
        </label>
        <label>
          Expand
          <input id="ed${n}Expand" type="range">
        </label>

        <div class="align-group">
          <span class="align-label">Align</span>
          <div class="align-toggle" role="radiogroup" aria-label="Text alignment">
            <input class="vh" type="radio" id="ed${n}AlignLeft" name="ed${n}Align" value="left" checked>
            <label for="ed${n}AlignLeft" class="icon-btn" title="Align left" aria-label="Align left">
              <img src="img/align_left.svg" alt="Align left" width="18" height="18">
            </label>

            <input class="vh" type="radio" id="ed${n}AlignCenter" name="ed${n}Align" value="center">
            <label for="ed${n}AlignCenter" class="icon-btn" title="Align center" aria-label="Align center">
              <img src="img/align_center.svg" alt="Align center" width="18" height="18">
            </label>
          </div>

          <div class="bg-toggle" role="radiogroup" aria-label="Editor background">
            <input class="vh" type="radio" id="ed${n}BgLight" name="ed${n}Bg" value="light" checked>
            <label for="ed${n}BgLight" class="swatch swatch--light" title="Light"></label>

            <input class="vh" type="radio" id="ed${n}BgDark" name="ed${n}Bg" value="dark">
            <label for="ed${n}BgDark" class="swatch swatch--dark" title="Dark"></label>
          </div>
        </div>
      </div>

      <div id="ed${n}Preview" class="type-edit" contenteditable="true" spellcheck="false"></div>
    </div>
  `;
}


// ---------- Lógica do editor mini ----------
function initMiniEditor(cfg, n, defaults){
  const sizeInput    = document.getElementById(`ed${n}Size`);
  const leadInput    = document.getElementById(`ed${n}Leading`);
  const expandInput  = document.getElementById(`ed${n}Expand`);
  const preview      = document.getElementById(`ed${n}Preview`);
  const alignLeft    = document.getElementById(`ed${n}AlignLeft`);
  const alignCenter  = document.getElementById(`ed${n}AlignCenter`);
  const bgLight      = document.getElementById(`ed${n}BgLight`);
  const bgDark       = document.getElementById(`ed${n}BgDark`);

  if (!sizeInput || !leadInput || !expandInput || !preview) return;

  // eixo wdth do config (o teu "Expand")
  const wdthAxis = cfg.axes?.wdth || { min: 75, max: 2225, default: 100 };

  expandInput.min = wdthAxis.min;
  expandInput.max = wdthAxis.max;
  expandInput.step = 1;

  // aplicar defaults
  sizeInput.value   = defaults.size ?? cfg.editor?.size ?? 128;
  leadInput.value   = defaults.leading ?? cfg.editor?.leading ?? 1.0;
  expandInput.value = defaults.expand ?? cfg.editor?.expand ?? wdthAxis.default;
  preview.textContent = defaults.text ?? cfg.editor?.text ?? cfg.specimenText ?? "";

  // função que atualiza CSS
  function render(){
    const size = Number(sizeInput.value);
    const leading = Number(leadInput.value);
    const expand = Number(expandInput.value);

    preview.style.fontFamily = cfg.cssFamily || cfg.name || "inherit";
    preview.style.fontSize = size + "px";
    preview.style.lineHeight = leading;
    preview.style.fontVariationSettings = `"wdth" ${expand}`;

    // alinhamento
    preview.style.textAlign = alignCenter.checked ? "center" : "left";

    // bg
    preview.style.background = bgDark.checked ? "#111" : "#fff";
    preview.style.color = bgDark.checked ? "#fff" : "#111";
  }

  // listeners
  sizeInput.addEventListener("input", render);
  leadInput.addEventListener("input", render);
  expandInput.addEventListener("input", render);
  alignLeft.addEventListener("change", render);
  alignCenter.addEventListener("change", render);
  bgLight.addEventListener("change", render);
  bgDark.addEventListener("change", render);

  render();
}
