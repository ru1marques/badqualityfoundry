window.FONT_CONFIGS = window.FONT_CONFIGS || {};

// Conteúdos e definições exclusivos da página Oficina.
window.FONT_CONFIGS.oficina = {
  id: "oficina",
  name: "Oficina",
  cssFamily: "Oficina",
  // Valor global de opsz. Cada bloco abaixo pode substituí-lo com `optical`.
  optical: 0,
  heroWords: ["OFICINA", "IRON", "STENCIL"],
  specimenText: "Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz 0123456789 :;,.!?",

  weights: [
    { label: "Thin", value: 100, style: "normal" },
    { label: "Regular", value: 400, style: "normal" },
    { label: "Bold", value: 500, style: "normal" }
  ],

  glyphs: [
    { title: "Basic Latin", optical: 0, chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
    { title: "Figures", optical: 0, chars: "0123456789" },
    { title: "Punctuation", optical: 0, chars: ".,:;!?…—–“”‘’()[]{}@&#%" },
    { title: "Accents", optical: 0, chars: "ÁÀÂÃÄÅÇÉÈÊËÍÌÎÏÑÓÒÔÕÖØÚÙÛÜÝŸ" }
  ],

  // Eixos confirmados diretamente na tabela `fvar` da fonte exportada.
  axes: {
    wght: { min: 0, max: 500, default: 100, label: "Weight" },
    opsz: { min: 0, max: 500, default: 0, label: "Optical Size" }
  },

  editor: {
    size: 328,
    leading: 0.5,
    weight: 100,
    optical: 0,
    align: "center",
    text: "Oficina is an iron inspired typeface"
  },

  heroGrid: [
    {
      type: "text",
      title: "Oficina",
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum."
    },
    {
      type: "text",
      details: [
        { label: "Tipology", value: "Geometric Stencil" },
        { label: "Author", value: "Rui Marques" },
        { label: "License", value: "Creative Commons Attribution 4.0" },
        { label: "Version", value: "Beta 1.6 ©2026" },
        { label: "Donwload", value: "Soon" }
      ]
    },
    { type: "image", src: "img/oficina/1.png", alt: "Oficina type specimen 1", fit: "cover" },
    { type: "image", src: "img/oficina/2.png", alt: "Oficina type specimen 2", fit: "cover" },
    { type: "video", src: "img/oficina/4.mp4", controls: true, span: 2, rows: 2 },
    { type: "image", src: "img/oficina/3.png", alt: "Oficina type specimen 3", fit: "cover" },
    {
      type: "slider",
      images: [
        "img/oficina/8.2.png",
        "img/oficina/8.1.png",
        "img/oficina/8.5.png",
        "img/oficina/8.4.png",
        "img/oficina/8.3.png"
      ],
      alt: "Oficina poster variation",
      fit: "contain",
      aspectRatio: "3 / 4",
    },
    { type: "video", src: "img/oficina/7.mp4", controls: true, span: 1, rows: 1}
  ],

  slider: [
    "img/oficina/1.png",
    "img/oficina/2.png",
    "img/oficina/3.png",
    "img/oficina/5.png",
    "img/oficina/6.png"
  ],

  editors2col: [
    {
      size: 34,
      leading: 1.05,
      weight: 160,
      optical: 0,
      text: "Oficina shapes language from iron, industry and the rhythm of work."
    },
    {
      size: 290,
      leading: 0.9,
      weight: 500,
      optical: 0,
      text: "#"
    }
  ],

  textColumnsSpecimen: {
    left: {
      size: 22,
      leading: 1.02,
      optical: 0,
      columns: [
        "Oficina is a geometric stencil typeface inspired by iron forms, industrial structures and functional lettering.",
        "Its interrupted strokes create a direct rhythm while the variable axes allow the letters to move between text and display."
      ]
    },
    right: {
      size: 33,
      leading: 0.98,
      optical: 0,
      columns: [
        "Built for posters, identities and editorial systems that need a strong mechanical voice.",
        "Weight and optical size change the pressure, detail and presence of every character."
      ]
    }
  },

  heroStatement: {
    word: "Soldartt",
    phrase: "Built in the workshop, ready for the street.",
    wordOptical: 500,
    phraseOptical: 0,
    wordSize: 15,
    phraseSize: 6,
    wordLeading: 0.85,
    phraseLeading: 0.85,
    expandWord: 500,
    expandPhrase: 100
  },

  finalCTA: {
    text: "㋛ Donwload soon",
    size: 10,
    rotateSpeed: 2
  }
};
