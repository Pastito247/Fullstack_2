import { calcModifier } from "./applyBonuses";
import { skillsList } from "../data/skillsData";

export function calculateSavingThrows(character) {
  const profBonus = getProficiencyBonus(character.level);
  const saves = {};

  for (const ability of ["str", "dex", "con", "int", "wis", "cha"]) {
    const base = calcModifier(character.stats[ability]);
    const proficient = character.proficiencies?.savingThrows?.includes(ability);
    saves[ability] = base + (proficient ? profBonus : 0);
  }

  return saves;
}

export function calculateSkills(character) {
  const profBonus = getProficiencyBonus(character.level);
  const skills = {};

  Object.entries(skillsList).forEach(([key, { ability }]) => {
    const base = calcModifier(character.stats[ability]);
    const proficient = character.skills?.[key];
    skills[key] = base + (proficient ? profBonus : 0);
  });

  return skills;
}

export function getProficiencyBonus(level) {
  if (level >= 17) return 6;
  if (level >= 13) return 5;
  if (level >= 9) return 4;
  if (level >= 5) return 3;
  return 2;
}
