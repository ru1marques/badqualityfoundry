window.FONT_CONFIGS = window.FONT_CONFIGS || {};
window.FONT_CONFIGS.maria = {
  id: "maria",
  name: "Maria",
  cssFamily: "Maria",
  heroWords: ["MMARIA","COOKIES","MARIA"],
  specimenText: "MY MOM MAKES MARIA COOKIES FOR LIVING",
  weights: [
    { label: "Regular", value: 400, style: "normal" },
    { label: "Bold",    value: 700, style: "normal" }
  ],

  glyphs: [
    { title: "Basic Latin", chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
    { title: "Figures",     chars: "0123456789" },
    { title: "Punctuation", chars: ".,:;!?…—–“”‘’()[]{}@&#%" },
    { title: "Accents",     chars: "ÁÀÂÃÄÅÇÉÈÊËÍÌÎÏÑÓÒÔÕÖØÚÙÛÜÝŸ" }
  ],

  // 👉 só largura variável:
  axes: { wdth: { min: 75, max: 1025, default: 100, label: "Expand" } },
  editor: { size: 328, leading: 0.5, expand: 100, text: "MY MOM MAKES MARIA COOKIES FOR A LIVING @2025" },

  heroVideo: {
    // A) ficheiro local/remoto
    src: "img/maria/maria_video_header.mp4",
    poster: "videos/maria-hero-poster.jpg", // opcional
    controls: true                            // true/false (opcional)
    // B) —alternativa— YouTube/Vimeo embed:
    // embed: "https://www.youtube.com/embed/VIDEOID?autoplay=1&mute=1&loop=1&playlist=VIDEOID"
  }



};






