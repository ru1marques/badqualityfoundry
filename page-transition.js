(() => {
  // Temporarily disable the page-transition module (preloader + transitions)
  // Set to `false` below if you want to enable again.
  const PAGE_TRANSITION_DISABLED = true;
  if (PAGE_TRANSITION_DISABLED) {
    console.log('page-transition disabled');
    return;
  }
  const TRANSITION_DELAY = 420; // tempo até navegar, em ms (reduzido para ficar mais rápido)
  const PRELOADER_MIN_DISPLAY = 800; // ms mínimo que o preloader deve permanecer visível

  // (click-to-transition removed) helper functions for link testing removed

  function ensureOverlay() {
    let overlay = document.querySelector(".page-transition");

    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "page-transition";
      overlay.setAttribute("aria-hidden", "true");
      overlay.innerHTML = `<div class="page-transition__glyph">㋛</div>`;
      document.body.appendChild(overlay);
    }

    return overlay;
  }

  // --- Preloader: show overlay while page is loading (until window.load)
  // Se a página ainda não terminou de carregar, exibimos a overlay imediatamente
  // para funcionar como preloader. Será escondida no evento `load`.
  if (document.readyState !== 'complete') {
    const _overlay = ensureOverlay();
    document.documentElement.classList.add('is-transitioning');
    _overlay.classList.add('is-active');
    const shownAt = Date.now();

    window.addEventListener('load', () => {
      const elapsed = Date.now() - shownAt;
      const hide = () => {
        document.documentElement.classList.remove('is-transitioning');
        document.documentElement.classList.add('is-ready');
        _overlay.classList.remove('is-active');
      };

      if (elapsed >= PRELOADER_MIN_DISPLAY) {
        hide();
      } else {
        setTimeout(hide, PRELOADER_MIN_DISPLAY - elapsed);
      }
    }, { once: true });
  }

  // activateTransition removed — transitions between pages disabled; overlay used only as preloader

  document.addEventListener("DOMContentLoaded", () => {
    ensureOverlay();

    // NOTE: click-to-transition behavior removed — page-transition used only as preloader now.

    // quando a página carrega/volta do bfcache, limpar estado
    window.addEventListener("pageshow", () => {
      document.documentElement.classList.remove("is-transitioning");
      document.documentElement.classList.add("is-ready");

      const overlay = document.querySelector(".page-transition");
      if (overlay) overlay.classList.remove("is-active");
    });
  });
})();

console.log("page transition loaded");