//  Calcula el modificador de atributo 
export function getModifier(score) {
  return Math.floor((score - 10) / 2);
}

// Bonificadores raciales básicos
export const racialBonuses = {
  Humano: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
  Elfo: { dex: 2 },
  Enano: { con: 2 },
  Mediano: { dex: 2 },
  Tiefling: { cha: 2, int: 1 },
  Orco: { str: 2, con: 1 },
  Gnomo: { int: 2 },
  Semiorco: { str: 2, con: 1 },
  Dracónido: { str: 2, cha: 1 },
};

// 🎖️ Bonos de trasfondo comunes
export const backgroundBonuses = {
  Soldado: ["athletics", "intimidation"],
  Sabio: ["arcana", "history"],
  Criminal: ["stealth", "deception"],
  Forastero: ["athletics", "survival"],
  Noble: ["history", "persuasion"],
  Entertainer: ["acrobatics", "performance"],
  Clérigo: ["religion", "insight"],
};

// Aplica los bonificadores raciales
export function applyRacialBonuses(stats, race) {
  const bonus = racialBonuses[race] || {};
  const updated = { ...stats };

  for (const [key, value] of Object.entries(bonus)) {
    updated[key] = (updated[key] || 10) + value;
  }
  return updated;
}

// Devuelve una lista de habilidades competentes por trasfondo
export function getBackgroundSkills(background) {
  return backgroundBonuses[background] || [];
}
