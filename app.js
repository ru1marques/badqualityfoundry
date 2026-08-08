(function () {
  const params = new URLSearchParams(location.search);
  const chosen = params.get("f") || window.DEFAULT_FONT || Object.keys(window.FONT_CONFIGS)[0];
  const config = window.FONT_CONFIGS[chosen];


  const downloadBtn = document.getElementById("downloadTrialBtn");

if (downloadBtn && config.download?.trial) {
  downloadBtn.href = config.download.trial;
  downloadBtn.target = "_blank";
  downloadBtn.rel = "noopener";
}

// 1) Atualiza hero com uma grelha configurável
const scatter = document.getElementById("scatter");
if (scatter) {
  scatter.innerHTML = "";
  scatter.classList.remove("has-video", "is-grid");

  const heroItems = Array.isArray(config.heroGrid) && config.heroGrid.length
    ? config.heroGrid
    : null;

  if (heroItems) {
    scatter.classList.add("is-grid");
    const shell = document.createElement("div");
    shell.className = "hero-grid-shell";

    heroItems.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "hero-grid-item";
      card.dataset.type = String(item.type || "video").toLowerCase();

      // Se é um bloco de detalhes sem span/rows, herda do item anterior
      let colSpan = Number(item.span || item.cols || item.colSpan || item.width || item.columns || 1);
      let rowSpan = Number(item.rows || item.rowSpan || item.height || 1);
      
      if (item.type === "text" && item.details && !item.span && index > 0) {
        const prevItem = heroItems[index - 1];
        if (prevItem.type === "text") {
          colSpan = Number(prevItem.span || prevItem.cols || prevItem.colSpan || 1);
          rowSpan = Number(prevItem.rows || prevItem.rowSpan || 1);
        }
      }
      
      if (colSpan > 1) card.dataset.span = String(colSpan);
      if (rowSpan > 1) card.dataset.rowSpan = String(rowSpan);
      if (colSpan > 1 || rowSpan > 1) {
        card.style.gridColumn = `span ${colSpan}`;
        card.style.gridRow = `span ${rowSpan}`;
      }
      if (item.className) card.classList.add(item.className);

      if (item.type === "text") {
        card.classList.add("hero-grid-item--text");
        const content = document.createElement("div");
        content.className = "hero-grid-item__content";

        const eyebrowText = typeof item.eyebrow === "string" ? item.eyebrow.trim() : "";
        const titleText = typeof item.title === "string" ? item.title.trim() : "";

        if (eyebrowText) {
          const eyebrow = document.createElement("p");
          eyebrow.className = "hero-grid-item__eyebrow";
          eyebrow.textContent = eyebrowText;
          content.appendChild(eyebrow);
        }

        if (titleText) {
          const title = document.createElement("h3");
          title.className = "hero-grid-item__title";
          title.textContent = titleText;
          content.appendChild(title);
        }

        // Suporta body como string ou array de strings
        if (item.body) {
          const bodyParagraphs = Array.isArray(item.body) ? item.body : [item.body];
          bodyParagraphs.forEach(para => {
            const bodyText = typeof para === "string" ? para.trim() : "";
            if (bodyText) {
              const body = document.createElement("p");
              body.className = "hero-grid-item__body";
              body.textContent = bodyText;
              content.appendChild(body);
            }
          });
        }

        if (Array.isArray(item.details) && item.details.length) {
          const detailsDiv = document.createElement("div");
          detailsDiv.className = "hero-grid-item__details";
          item.details.forEach(detail => {
            const detailLine = document.createElement("p");
            detailLine.className = "hero-grid-item__detail-line detail-mid";
            const label = document.createElement("strong");
            label.textContent = detail.label;
            detailLine.appendChild(label);
            
            if (detail.link) {
              const link = document.createElement("a");
              link.href = detail.link;
              link.target = "_blank";
              link.rel = "noopener";
              link.textContent = " " + detail.value;
              detailLine.appendChild(link);
            } else {
              detailLine.appendChild(document.createTextNode(" " + detail.value));
            }
            detailsDiv.appendChild(detailLine);
          });
          content.appendChild(detailsDiv);
        }

        if (content.childNodes.length) {
          card.appendChild(content);
        }
      } else if (item.type === "slider") {
        card.classList.add("hero-grid-item--slider");
        if (item.aspectRatio) card.style.aspectRatio = item.aspectRatio;

        const slides = Array.isArray(item.images || item.slides)
          ? (item.images || item.slides).filter(Boolean)
          : [];

        if (slides.length) {
          const slider = document.createElement("div");
          slider.className = "hero-mini-slider";

          const img = document.createElement("img");
          img.className = "hero-grid-image hero-mini-slider__image";
          img.draggable = false;
          if (item.fit) img.style.objectFit = item.fit;
          slider.appendChild(img);

          let currentSlide = Number(item.startIndex || 0);
          currentSlide = Math.max(0, Math.min(currentSlide, slides.length - 1));

          const renderSlide = () => {
            img.src = slides[currentSlide];
            img.alt = `${item.alt || "Specimen variation"} ${currentSlide + 1}`;
          };

          if (slides.length > 1) {
            const previous = document.createElement("button");
            previous.className = "hero-mini-slider__arrow hero-mini-slider__arrow--prev";
            previous.type = "button";
            previous.setAttribute("aria-label", "Previous poster variation");
            previous.textContent = "‹";

            const next = document.createElement("button");
            next.className = "hero-mini-slider__arrow hero-mini-slider__arrow--next";
            next.type = "button";
            next.setAttribute("aria-label", "Next poster variation");
            next.textContent = "›";

            previous.addEventListener("click", () => {
              currentSlide = (currentSlide - 1 + slides.length) % slides.length;
              renderSlide();
            });
            next.addEventListener("click", () => {
              currentSlide = (currentSlide + 1) % slides.length;
              renderSlide();
            });

            slider.append(previous, next);
          }

          renderSlide();
          card.appendChild(slider);
        }
      } else if (item.type === "image") {
        const img = document.createElement("img");
        img.className = "hero-grid-image";
        img.src = item.src || item.url || "";
        img.alt = item.alt || "";
        if (item.fit) img.style.objectFit = item.fit;
        card.appendChild(img);
      } else if (item.type === "html") {
        const content = document.createElement("div");
        content.className = "hero-grid-item__content";
        content.innerHTML = item.html || "";
        card.appendChild(content);
      } else if (item.type === "embed") {
        const iframe = document.createElement("iframe");
        iframe.className = "hero-embed";
        iframe.src = item.embed || item.src || "";
        iframe.allow = item.allow || "autoplay; encrypted-media; picture-in-picture";
        iframe.allowFullscreen = true;
        card.appendChild(iframe);
      } else {
        const hv = item;
        if (hv.embed) {
          const iframe = document.createElement("iframe");
          iframe.className = "hero-embed";
          iframe.src = hv.embed;
          iframe.allow = "autoplay; encrypted-media; picture-in-picture";
          iframe.allowFullscreen = true;
          card.appendChild(iframe);
        } else {
          const vid = document.createElement("video");
          vid.className = "hero-video";
          if (hv.src) vid.src = hv.src;
          if (hv.poster) vid.poster = hv.poster;
          vid.autoplay = true;
          vid.muted = true;
          vid.loop = true;
          vid.playsInline = true;
          vid.controls = hv.controls !== false;
          card.appendChild(vid);
          vid.play?.().catch(()=>{/* alguns browsers bloqueiam autoplay; ignorar */});
        }
      }

      shell.appendChild(card);
    });

    scatter.appendChild(shell);
  } else {
    scatter.classList.add("has-video");

    const hv = config.heroVideo || {};

    if (hv.embed) {
      const iframe = document.createElement("iframe");
      iframe.className = "hero-embed";
      iframe.src = hv.embed;
      iframe.allow = "autoplay; encrypted-media; picture-in-picture";
      iframe.allowFullscreen = true;
      scatter.appendChild(iframe);
    } else {
      const vid = document.createElement("video");
      vid.className = "hero-video";
      if (hv.src) vid.src = hv.src;
      if (hv.poster) vid.poster = hv.poster;
      vid.autoplay = true;
      vid.muted = true;
      vid.loop = true;
      vid.playsInline = true;
      vid.controls = hv.controls !== false;
      scatter.appendChild(vid);
      vid.play?.().catch(()=>{/* alguns browsers bloqueiam autoplay; ignorar */});
    }
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
  const edWght  = document.getElementById("edWeight");
  const wghtLbl = document.getElementById("weightLabel");
  const edOpt   = document.getElementById("edOptical");
  const optLbl  = document.getElementById("opticalLabel");
  if (!preview || !edSize || !edLead) return;

  const AXES = config.axes || {};
  const hasWdth = !!AXES.wdth;       // ✅ só wdth
  const hasWght = !!AXES.wght;
  const hasOpsz = !!AXES.opsz;

  if (hasWdth && edExp){
    edExp.min = AXES.wdth.min; edExp.max = AXES.wdth.max; edExp.step = 1;
    edExp.value = config.editor?.expand ?? AXES.wdth.default ?? edExp.value;
    if (expLbl) expLbl.firstChild.nodeValue = AXES.wdth.label || "Weight";
  }

  if (hasWght && edWght) {
    edWght.min = AXES.wght.min; edWght.max = AXES.wght.max; edWght.step = 1;
    edWght.value = config.editor?.weight ?? AXES.wght.default ?? edWght.value;
    if (wghtLbl) wghtLbl.firstChild.nodeValue = AXES.wght.label || "Weight";
  }

  if (hasOpsz && edOpt) {
    edOpt.min = AXES.opsz.min;
    edOpt.max = AXES.opsz.max;
    edOpt.step = 1;
    edOpt.value = config.editor?.optical ?? config.optical ?? AXES.opsz.default ?? edOpt.value;
    if (optLbl) optLbl.firstChild.nodeValue = AXES.opsz.label || "Optical";
  }

  function apply(){
    preview.style.fontFamily = `${config.cssFamily}, Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial`;
    preview.style.fontSize   = edSize.value + "px";
    preview.style.lineHeight = edLead.value;

    // Peso por select normal (não é eixo)
    const weightSel = document.getElementById("weight");
    if (weightSel) preview.style.fontWeight = weightSel.value;

    // aplica wdth/opsz se presentes
    const parts = [];
    if (hasWdth && edExp) parts.push(`"wdth" ${edExp.value}`);
    if (hasWght && edWght) parts.push(`"wght" ${edWght.value}`);
    if (hasOpsz && edOpt) parts.push(`"opsz" ${edOpt.value}`);
    preview.style.fontVariationSettings = parts.length ? parts.join(', ') : "normal";
    if (hasWght && edWght) preview.style.fontWeight = edWght.value;
    if (hasWdth) preview.style.letterSpacing = "";
  }

  [edSize, edLead, edExp, edWght, edOpt].forEach(el => el && el.addEventListener("input", apply));
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
  function renderGrid(chars, family, optical) {
    const wrap = document.createElement("div");
    wrap.className = "glyphs"; // usa a tua grelha de 12 colunas
    [...chars].forEach(ch => {
      const cell = document.createElement("div");
      cell.className = "glyph";
      cell.textContent = ch;
      cell.style.fontFamily = `${config.cssFamily}, Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial`;
      cell.style.fontWeight = 500;
      if (config.axes?.opsz) {
        cell.style.fontVariationSettings = `"opsz" ${optical ?? config.optical ?? config.axes.opsz.default}`;
      }
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
      grid.appendChild(renderGrid(group.chars || "", config.cssFamily, group.optical));
    });
    return;
  }

  // 2) Se tiver um bloco único
  if (typeof config.glyphs_flat === "string" && config.glyphs_flat.length) {
    grid.appendChild(renderGrid(config.glyphs_flat, config.cssFamily, config.glyphsOptical));
    return;
  }

  // 3) Fallback (se não definiste nada no config)
  const fallback = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,:;!?()[]{}+-*/=±%‰@&$#—–_§£€¥ÇçÁáÉéÍíÓóÚúÃãÕõÂâÊêÎîÔôÛûÄäËëÏïÖöÜüÅåØøÑñÆæÞþÐð¿¡";
  grid.appendChild(renderGrid(fallback, config.cssFamily, config.glyphsOptical));
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

  // As imagens verticais cabem por inteiro na altura do viewport.
  slides.forEach(slide => {
    const image = slide.querySelector(".slider-img");
    if (!image) return;

    const setOrientation = () => {
      slide.classList.toggle("is-portrait", image.naturalHeight > image.naturalWidth);
    };

    if (image.complete) setOrientation();
    else image.addEventListener("load", setOrientation, { once: true });
  });

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
  host.innerHTML = colDefaults.map((d, i) => buildMiniEditorHTML(i + 1, cfg)).join("");

  // iniciar cada editor
  colDefaults.forEach((d, i) => initMiniEditor(cfg, i + 1, d));
});


// ---------- HTML do editor mini (com IDs únicos) ----------
function buildMiniEditorHTML(n, cfg){
  const weightControl = cfg.axes?.wght ? `
        <label>${cfg.axes.wght.label || "Weight"}
          <input id="ed${n}Weight" type="range">
        </label>` : "";
  const opticalControl = cfg.axes?.opsz ? `
        <label>${cfg.axes.opsz.label || "Optical"}
          <input id="ed${n}Optical" type="range">
        </label>` : "";
  const expandControl = cfg.axes?.wdth ? `
        <label>${cfg.axes.wdth.label || "Expand"}
          <input id="ed${n}Expand" type="range">
        </label>` : "";

  return `
    <div class="editor-mini panel" data-editor="${n}">
      <div class="type-toolbar">
        <label>Size
          <input id="ed${n}Size" type="range" min="24" max="640" step="1" value="128">
        </label>${weightControl}${opticalControl}
        <label>Leading
          <input id="ed${n}Leading" type="range" min="0.8" max="2" step="0.01" value="1.0">
        </label>${expandControl}

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
  const weightInput  = document.getElementById(`ed${n}Weight`);
  const opticalInput = document.getElementById(`ed${n}Optical`);
  const preview      = document.getElementById(`ed${n}Preview`);
  const alignLeft    = document.getElementById(`ed${n}AlignLeft`);
  const alignCenter  = document.getElementById(`ed${n}AlignCenter`);
  const bgLight      = document.getElementById(`ed${n}BgLight`);
  const bgDark       = document.getElementById(`ed${n}BgDark`);

  if (!sizeInput || !leadInput || !preview) return;

  // eixo wdth do config (o teu "Expand")
  const wdthAxis = cfg.axes?.wdth || null;
  const wghtAxis = cfg.axes?.wght || null;
  const opszAxis = cfg.axes?.opsz || null;

  if (wdthAxis && expandInput) {
    expandInput.min = wdthAxis.min;
    expandInput.max = wdthAxis.max;
    expandInput.step = 1;
  }

  if (wghtAxis && weightInput) {
    weightInput.min = wghtAxis.min;
    weightInput.max = wghtAxis.max;
    weightInput.step = 1;
  }

  if (opszAxis && opticalInput) {
    const opszMin = opszAxis.min ?? 0;
    const opszMax = opszAxis.max ?? 500;
    opticalInput.min = Math.min(0, opszMin);
    opticalInput.max = opszMax;
    opticalInput.step = 1;
  }

  // aplicar defaults
  sizeInput.value   = defaults.size ?? cfg.editor?.size ?? 128;
  leadInput.value   = defaults.leading ?? cfg.editor?.leading ?? 1.0;
  if (expandInput) expandInput.value = defaults.expand ?? cfg.editor?.expand ?? wdthAxis?.default ?? 100;
  if (weightInput) weightInput.value = defaults.weight ?? cfg.editor?.weight ?? (wghtAxis?.default ?? 400);
  if (opticalInput) opticalInput.value = defaults.optical ?? cfg.editor?.optical ?? cfg.optical ?? (opszAxis?.default ?? 0);
  preview.textContent = defaults.text ?? cfg.editor?.text ?? cfg.specimenText ?? "";

  // função que atualiza CSS
  function render(){
    const size = Number(sizeInput.value);
    const leading = Number(leadInput.value);
    const expand = expandInput ? Number(expandInput.value) : null;
    const weight = weightInput ? Number(weightInput.value) : (wghtAxis?.default ?? 400);
    const optical = opticalInput ? Number(opticalInput.value) : (opszAxis?.default ?? null);

    preview.style.fontFamily = cfg.cssFamily || cfg.name || "inherit";
preview.style.fontSize = size + "px";
preview.style.lineHeight = leading;
    // build variation settings dynamically depending on available axes
    const parts = [];
    if (wdthAxis && expand !== null) parts.push(`"wdth" ${expand}`);
    if (wghtAxis) parts.push(`"wght" ${weight}`);
    if (opszAxis && optical !== null) parts.push(`"opsz" ${optical}`);
    preview.style.fontVariationSettings = parts.length ? parts.join(', ') : "normal";
    if (wghtAxis) preview.style.fontWeight = weight;

    // alinhamento
    preview.style.textAlign = alignCenter.checked ? "center" : "left";

    // bg
   preview.style.background = bgDark.checked ? "#0f0f0f" : "#f7f7f7";
preview.style.color = bgDark.checked ? "#ffffff" : "#111111";
  }

  // listeners
  sizeInput.addEventListener("input", render);
  leadInput.addEventListener("input", render);
  if (expandInput) expandInput.addEventListener("input", render);
  if (weightInput) weightInput.addEventListener("input", render);
  if (opticalInput) opticalInput.addEventListener("input", render);
  alignLeft.addEventListener("change", render);
  alignCenter.addEventListener("change", render);
  bgLight.addEventListener("change", render);
  bgDark.addEventListener("change", render);

  render();
}

// Java para os samples de text nao editáveis

document.addEventListener("DOMContentLoaded", () => {
  const fontId = window.DEFAULT_FONT || "maria";
  const cfg = window.FONT_CONFIGS?.[fontId];
  const host = document.getElementById("specimenReading");

  if (!host || !cfg?.textColumnsSpecimen) return;

  const spec = cfg.textColumnsSpecimen;
  const family = cfg.cssFamily || "inherit";
  const detail = document.getElementById("specimenReadingDetail");

  if (detail) {
    const leftOptical = spec.left?.optical ?? cfg.optical ?? cfg.axes?.opsz?.default;
    const rightOptical = spec.right?.optical ?? cfg.optical ?? cfg.axes?.opsz?.default;
    const opticalLabel = cfg.axes?.opsz ? ` | OPSZ ${leftOptical}/${rightOptical}` : "";
    detail.textContent = `${spec.left?.size}PT/${spec.right?.size}PT | ${spec.left?.leading}/${spec.right?.leading}${opticalLabel}`;
  }

  function renderSide(side, extraClass = "") {
    if (!side?.columns?.length) return "";

    const opszAxis = cfg.axes?.opsz || null;
    const opticalValue = opszAxis ? (side.optical ?? cfg.optical ?? opszAxis.default ?? 0) : null;
    const opticalStyle = opszAxis && opticalValue !== null
      ? `font-optical-sizing: none; font-variation-settings: "opsz" ${opticalValue};`
      : "";

    return `
      <div class="specimen-reading-side ${extraClass}">
        ${side.columns.map(txt => `
          <div
            class="specimen-reading-col"
            style="
              font-family: '${family}', Inter, system-ui, sans-serif;
              font-size: ${side.size || 24}px;
              line-height: ${side.leading || 1};
              ${opticalStyle}
              letter-spacing: -0.02em;
            "
          >${txt}</div>
        `).join("")}
      </div>
    `;
  }

  host.innerHTML = `
    ${renderSide(spec.left, "specimen-reading-left")}
    ${renderSide(spec.right, "specimen-reading-right")}
  `;
});




//STATEMENT
document.addEventListener("DOMContentLoaded", () => {

  const fontId = window.DEFAULT_FONT || "maria";
  const cfg = window.FONT_CONFIGS?.[fontId];
  const host = document.getElementById("heroStatement");
  const hostWord = document.getElementById("heroStatementWord");
  const hostPhrase = document.getElementById("heroStatementPhrase");

  if (!cfg?.heroStatement) return;
  const h = cfg.heroStatement;
  const wordDetail = document.getElementById("heroStatementWordDetail");
  const phraseDetail = document.getElementById("heroStatementPhraseDetail");
  const wordOptical = h.wordOptical ?? h.optical ?? cfg.optical ?? cfg.axes?.opsz?.default;
  const phraseOptical = h.phraseOptical ?? h.optical ?? cfg.optical ?? cfg.axes?.opsz?.default;

  if (wordDetail) {
    wordDetail.textContent = `${h.wordSize}PT | ${h.wordLeading}${cfg.axes?.opsz ? ` | OPSZ ${wordOptical}` : ""}`;
  }
  if (phraseDetail) {
    phraseDetail.textContent = `${h.phraseSize}PT | ${h.phraseLeading}${cfg.axes?.opsz ? ` | OPSZ ${phraseOptical}` : ""}`;
  }
  const variationSettings = (expand, optical) => {
    const settings = [];
    if (cfg.axes?.wdth) settings.push(`"wdth" ${expand ?? cfg.axes.wdth.default}`);
    if (cfg.axes?.opsz) settings.push(`"opsz" ${optical ?? h.optical ?? cfg.optical ?? cfg.axes.opsz.default}`);
    return settings.join(", ");
  };

  // If the two separate placeholders exist in HTML, populate them individually
  if (hostWord || hostPhrase) {
    if (hostWord) {
      hostWord.textContent = h.word || '';
      hostWord.style.fontFamily = `${cfg.cssFamily}, Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial`;
      hostWord.style.fontSize = (h.wordSize ?? 20) + 'pt';
      hostWord.style.lineHeight = h.wordLeading || 0.9;
      hostWord.style.fontVariationSettings = variationSettings(h.expandWord, h.wordOptical);
      hostWord.style.letterSpacing = '-0.03em';
      hostWord.style.textAlign = 'center';
    }

    if (hostPhrase) {
      hostPhrase.textContent = h.phrase || '';
      hostPhrase.style.fontFamily = `${cfg.cssFamily}, Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial`;
      hostPhrase.style.fontSize = (h.phraseSize ?? 6) + 'pt';
      hostPhrase.style.lineHeight = h.phraseLeading || 1;
      hostPhrase.style.fontVariationSettings = variationSettings(h.expandPhrase, h.phraseOptical);
      hostPhrase.style.letterSpacing = '-0.02em';
      hostPhrase.style.textAlign = 'center';
    }

    return;
  }

  // Fallback: populate single container as before
  if (host) {
    host.innerHTML = `
      <div class="hero-statement"
        style="font-family:'${cfg.cssFamily}', Inter, system-ui, sans-serif;">

        <div class="hero-statement-word"
          style="
            font-size:${h.wordSize ?? 20}pt;
            line-height:${h.wordLeading || 0.9};
            font-variation-settings:${variationSettings(h.expandWord, h.wordOptical)};
            letter-spacing:-0.03em;
            text-align:center;
          ">
          ${h.word}
        </div>

        <div class="hero-statement-phrase"
          style="
            font-size:${h.phraseSize ?? 6}pt;
            line-height:${h.phraseLeading || 1};
            font-variation-settings:${variationSettings(h.expandPhrase, h.phraseOptical)};
            letter-spacing:-0.02em;
            text-align:center;
          ">
          ${h.phrase}
        </div>

      </div>
    `;
  }

});

// BUTÃO DONWLOAD FINAL 

document.addEventListener("DOMContentLoaded", () => {

  const fontId = window.DEFAULT_FONT || "maria";
  const cfg = window.FONT_CONFIGS?.[fontId];

  const el = document.getElementById("ctaRotating");

  if (!el || !cfg?.finalCTA) return;

  const cta = cfg.finalCTA;

  el.textContent = cta.text;
  el.style.fontSize = `${cta.size || 14}vw`;
  el.style.animationDuration = `${cta.rotateSpeed || 20}s`;

  if(cfg.download?.trial){
    el.href = cfg.download.trial;
    el.target = "_blank";
    el.rel = "noopener";
  }

});


// centered button 
const centerToggle = document.getElementById("edCenterToggle");
const preview = document.getElementById("edPreview");

if (centerToggle && preview) {
  centerToggle.addEventListener("click", () => {
    const active = preview.classList.toggle("is-centered");
    centerToggle.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

// Oficina: controlo Play/Pause da animação de Weight no primeiro tester
const oficinaAnimatedPreview = document.querySelector(".page-oficina #edPreview");
const oficinaCompositionTool = oficinaAnimatedPreview?.closest("#composition-tool");
const oficinaAnimationToggle = document.getElementById("weightAnimationToggle");
const oficinaOpticalInput = document.getElementById("edOptical");

if (oficinaAnimatedPreview && oficinaCompositionTool && oficinaAnimationToggle) {
  const animationIcon = oficinaAnimationToggle.querySelector(".weight-animation-toggle__icon");
  const animationLabel = oficinaAnimationToggle.querySelector("[data-animation-label]");

  const setWeightAnimation = active => {
    oficinaAnimatedPreview.style.setProperty("--oficina-animated-opsz", oficinaOpticalInput?.value || 0);
    oficinaAnimatedPreview.classList.toggle("is-weight-animated", active);
    oficinaAnimationToggle.setAttribute("aria-pressed", active ? "true" : "false");
    oficinaAnimationToggle.title = active ? "Pause Weight animation" : "Play Weight animation";
    if (animationIcon) animationIcon.textContent = active ? "Ⅱ" : "▶";
    if (animationLabel) animationLabel.textContent = active ? "Pause" : "Play";
  };

  oficinaAnimationToggle.addEventListener("click", () => {
    setWeightAnimation(oficinaAnimationToggle.getAttribute("aria-pressed") !== "true");
  });

  oficinaOpticalInput?.addEventListener("input", () => {
    oficinaAnimatedPreview.style.setProperty("--oficina-animated-opsz", oficinaOpticalInput.value);
  });

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setWeightAnimation(false);
  }
}

// Valores visíveis nos sliders dos type testers
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.type-toolbar label > input[type="range"]').forEach(input => {
    const output = document.createElement("output");
    output.className = "tester-slider-value";
    output.htmlFor = input.id;

    const updateValue = () => { output.value = input.value; };
    input.insertAdjacentElement("afterend", output);
    input.addEventListener("input", updateValue);
    updateValue();
  });
});

// hover 
// cursor custom text
document.addEventListener("DOMContentLoaded", () => {

  const cursor = document.querySelector(".cursor-try");
  if (!cursor) return;

  const targets = document.querySelectorAll("[data-cursor]");

  targets.forEach(el => {

    el.addEventListener("mouseenter", () => {
      cursor.textContent = el.dataset.cursor;
      cursor.style.opacity = "1";
      cursor.classList.add("is-rotating");
    });

    el.addEventListener("mouseleave", () => {
      cursor.textContent = "SOOOOOON";
      cursor.classList.remove("is-rotating");
    });

  });

});
