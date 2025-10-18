window.FONT_CONFIGS = window.FONT_CONFIGS || {};
window.FONT_CONFIGS.maria = {
  id: "maria",
  name: "Maria",
  cssFamily: "Maria",
  heroWords: ["MMARIA","COOKIES","MARIA"],
  specimenText: "MY MOM MAKES MARIA COOKIES FOR LIVING",
  weights: [
    { label: "Regular", value: 400, style: "normal" },
    { label: "Italic",  value: 400, style: "italic" },
    { label: "Bold",    value: 700, style: "normal" }
  ],
  glyphs: [
    { title: "Basic Latin", chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
    { title: "Figures",     chars: "0123456789" },
    { title: "Punctuation", chars: ".,:;!?…—–“”‘’()[]{}@&#%" },
    { title: "Accents",     chars: "ÁÀÂÃÄÅÇÉÈÊËÍÌÎÏÑÓÒÔÕÖØÚÙÛÜÝŸ" }
  ],
  // 👉 só largura variável:
  axes: { wdth: { min: 75, max: 125, default: 100, label: "Expand" } },
  editor: { size: 128, leading: 1.0, expand: 100, text: "PINHAIS" }
};
