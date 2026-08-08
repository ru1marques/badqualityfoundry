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
      body: [
        "The typeface explores construction as both structure and language. Built through modular forms, interruptions and stencil-like cuts, each character reveals the logic behind its own making. Instead of treating the letter as a fixed shape, the system approaches typography as something assembled, exposed and continuously open to transformation.",
        "Through its optical size axis, the typeface moves between construction and deconstruction, shifting from legible, resolved forms into increasingly fragmented ones. As this transition happens, typography begins to operate somewhere between language and image — turning the process of building, breaking and reconfiguring form into the central expression of the typeface."
      ],
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
    { type: "video", src: "img/oficina/7.mp4", controls: true, span: 1, rows: 1},
       {
      type: "text",
      title: "Context",
      body: [
        "Oficina began with a very direct context: my brother’s iron workshop. He works with iron, building objects and structures through cutting, joining, welding and assembling material. When he asked me if I could design a logo for the workshop, I started looking more closely at the visual language surrounding that environment — not only at industrial lettering, but at the way forms are physically constructed",
        "That process shifted the project from designing a single mark to questioning how a typeface itself could be understood as a structure. Iron offered a useful way of thinking about letterforms: as systems made from parts, joints, interruptions, weight and tension. Instead of drawing letters only by their outlines, I began to see them as things that could be assembled, supported, interrupted and rebuilt."
      ],
    },
  ],

  slider: [
    "img/oficina/Gallery/0.jpg",
    "img/oficina/Gallery/1.jpg",
    "img/oficina/Gallery/2.jpg",
    "img/oficina/Gallery/3.jpg",
    "img/oficina/Gallery/4.jpg",
    "img/oficina/Gallery/5.jpg",
    "img/oficina/Gallery/6.jpg",
    "img/oficina/Gallery/7.jpg",
    "img/oficina/Gallery/8.jpg",
    "img/oficina/Gallery/9.jpg"
  ],

  editors2col: [
    {
      size: 44,
      leading: 1.05,
      weight: 160,
      optical: 0,
      text: "Oficina shapes language from iron, industry and visible process."
    },
    {
      size: 290,
      leading: 0.9,
      weight: 500,
      optical: 0,
      text: "372#"
    }
  ],

  textColumnsSpecimen: {
    left: {
      size: 22,
      leading: 1.2,
      optical: 0,
      columns: [
        "Oficina is a geometric stencil typeface shaped by the language of iron structures, industrial systems and functional lettering. Its interrupted strokes expose the logic of how each character is built, creating a direct rhythm where structure is not hidden but becomes part of the expression. Through its variable axes, the typeface shifts between resolved and fragmented states, moving between text and display, language and image. Rather than existing as a fixed form, Oficina behaves as a system in transformation — where construction, interruption and deconstruction become part of the typographic language.",
  
      ]
    },
    right: {
      size: 33,
      leading: 1,
      optical: 0,
      columns: [
        "As the letterforms fragment, their function shifts from carrying language to generating visual meaning.",
        "Through transformation, the typeface questions where typography ends and image begins."
      ]
    }
  },

  heroStatement: {
    word: "Soldartt",
    phrase: "Structure becomes language",
    wordOptical: 500,
    phraseOptical: 0,
    wordSize: 200,
    phraseSize: 40,
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
