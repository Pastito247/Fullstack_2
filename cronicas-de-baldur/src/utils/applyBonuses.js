// NO SE SI SE ESCRIBE BONUSES PERO LO DEJE ASI SI ESTA MAL PERDoN
export function applyBonuses(baseStats, bonuses = []) {
  const updatedStats = { ...baseStats };

  bonuses.forEach((bonus) => {
    const key = mapAbilityName(bonus.ability);
    if (key && updatedStats[key] !== undefined) {
      updatedStats[key] += bonus.bonus;
    }
  });

  return updatedStats;
}


function mapAbilityName(apiName) {
  const map = {
    Strength: "str",
    Dexterity: "dex",
    Constitution: "con",
    Intelligence: "int",
    Wisdom: "wis",
    Charisma: "cha",
  };
  return map[apiName] || null;
}


export function calcModifier(score) {
  return Math.floor((score - 10) / 2);
}
