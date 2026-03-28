window.FONT_CONFIGS = window.FONT_CONFIGS || {};
window.FONT_CONFIGS.partida = {
  id: "partida",
  name: "Partida",
  cssFamily: "erre",
  heroWords: ["PARTIDA","CRUNCH","LOUD"],
  specimenText: "Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz 0123456789 :;,.!?",
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

  axes: {
    wdth: { min: 0,   max: 400, default: 100, label: "Expand" },
    wght: { min: 100, max: 500, default: 400, label: "Weight" },
    opsz: { min: 8,   max: 500, default: 14,  label: "Optical Size" }
  },
  editor: { size: 328, leading: 0.5, expand: 100, weight: 400, optical: 14, text: "MY MOM MAKES PARTIDA COOKIES FOR A LIVING @2025" },

  heroVideo: {
    src: "img/partida/partida_video_header.mp4",
    poster: "videos/partida-hero-poster.jpg",
    controls: true
  },

  download: {
    trial: "https://example.com/partida-trial"
  },

  slider: [
    "img/partida/1.jpg",
    "img/partida/2.jpg",
    "img/partida/3.jpg",
    "img/partida/4.jpg"
  ],

  editors2col: [
    {
      size: 5,
      leading: 1.05,
      expand: 990,
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },

    {
      size: 420,
      leading: 0.95,
      expand: 300,
      text: "R©"
    }
  ],

  textColumnsSpecimen: {
    left: {
      size: 22,
      leading: 1.02,
      columns: [
        `LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. SED DO EIUSMOD TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA. UT ENIM AD MINIM VENIAM,`,
        `EXCEPTEUR SINT OCCAECAT CUPIDATAT NON PROIDENT, SUNT IN CULPA QUI OFFICIA DESERUNT MOLLIT ANIM ID EST LABORUM.`
      ]
    },

    right: {
      size: 33,
      leading: 0.98,
      columns: [
        `LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. INTEGER NEC ODIO.`,
        `EXCEPTEUR SINT OCCAECAT CUPIDATAT NON PROIDENT, SUNT IN CULPA QUI OFFICIA DESERUNT MOLLIT ANIM ID EST LABORUM.`
      ]
    }
  },

  heroStatement: {
    word: "CRUNCHY",
    phrase: "AN EXPERIMENTAL DISPLAY FOR LOUDEST HEADLINES.",

    wordSize: 15,
    phraseSize: 6,

    wordLeading: 0.85,
    phraseLeading: 0.85,

    expandWord: 400,
    expandPhrase: 0
  },

  finalCTA: {
    text: "㋛ Download trial ⤓",
    size: 10,
    rotateSpeed: 2
  }

};
