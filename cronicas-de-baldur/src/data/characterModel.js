export const characterTemplate = {
  id: 0, // ID único
  name: "", // Nombre del personaje
  race: "", // Las del libro base (talvez implemente los libros oficiales)
  subrace: "", // lo mismo de arriba
  class: "", // Oficiales (no reconozco artifice como oficial)
  subclass: "", // lo mismo de arriba
  level: 1, // Nivel actual
  background: "", // Trasfondo (Oficiales)
  alignment: "", // mostrar con listado
  campaignId: null, // Vinculación a campaña
  experience: 0, // XP actual
  inspiration: false, // Inspiración de D&D ;) su d20
  profBonus: 2, // Bonificador de competencia base y aumentara igual que la norma
  hp: {
    max: 10,
    current: 10,
    temp: 0,
  },
  ac: 10, // Clase de armadura
  initiative: 0,
  speed: 30, // Varia dependiendo de la clase
  hitDice: "1d10", // Dado de golpe base
  stats: {
    str: 10,
    dex: 10,
    con: 10,
    int: 10,
    wis: 10,
    cha: 10,
  },
  skills: {
    acrobatics: false,
    animalHandling: false,
    arcana: false,
    athletics: false,
    deception: false,
    history: false,
    insight: false,
    intimidation: false,
    investigation: false,
    medicine: false,
    nature: false,
    perception: false,
    performance: false,
    persuasion: false,
    religion: false,
    sleightOfHand: false,
    stealth: false,
    survival: false,
  },
  proficiencies: {
    weapons: [],
    armors: [],
    tools: [],
    savingThrows: [],
  },

  // 🎒 Inventario y economía
  inventory: [],
  currency: {
    pp: 0, // Platino
    gp: 10, // Oro inicial
    ep: 0, // Electrum
    sp: 0, // Plata
    cp: 0, // Cobre
  },
  spells: [],
  notes: "",
  avatar: "", // URL o base64 del retrato
};
