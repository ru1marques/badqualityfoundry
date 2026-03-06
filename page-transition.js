(() => {
  const TRANSITION_DELAY = 420; // tempo até navegar, em ms

  function isInternalLink(link) {
    if (!link) return false;
    const href = link.getAttribute("href");
    if (!href) return false;

    // ignorar anchors, mailto, tel, js, downloads e novas abas
    if (
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("javascript:")
    ) return false;

    if (link.hasAttribute("download")) return false;
    if (link.target === "_blank") return false;

    const url = new URL(link.href, window.location.href);

    // só links do mesmo domínio
    if (url.origin !== window.location.origin) return false;

    // se for só âncora na mesma página, ignora
    const samePage =
      url.pathname === window.location.pathname &&
      url.search === window.location.search;

    if (samePage && url.hash) return false;

    return true;
  }

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

  function activateTransition(url) {
    const overlay = ensureOverlay();

    document.documentElement.classList.add("is-transitioning");
    overlay.classList.add("is-active");

    window.setTimeout(() => {
      window.location.href = url;
    }, TRANSITION_DELAY);
  }

  document.addEventListener("DOMContentLoaded", () => {
    ensureOverlay();

    document.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (!isInternalLink(link)) return;

      // respeitar cmd/ctrl click, shift click, etc.
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      ) return;

      event.preventDefault();
      activateTransition(link.href);
    });

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