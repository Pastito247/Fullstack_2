
/* Lanza un dado donde sides son las caras y se le agrega el modificador*/
export function rollDice(sides, modifier = 0) {
  const roll = Math.floor(Math.random() * sides) + 1;
  return {
    roll,
    total: roll + modifier,
    modifier,
  };
}

/*laza varios dados  */
export function rollMultiple(sides, count = 1, modifier = 0) {
  const rolls = [];
  for (let i = 0; i < count; i++) {
    rolls.push(Math.floor(Math.random() * sides) + 1);
  }
  const sum = rolls.reduce((a, b) => a + b, 0);
  return {
    rolls,
    total: sum + modifier,
    modifier,
    sides,
  };
}

/*ventaja y desventaja  */
export function rollWithAdvantage(sides, mode = "advantage", modifier = 0) {
  const roll1 = Math.floor(Math.random() * sides) + 1;
  const roll2 = Math.floor(Math.random() * sides) + 1;
  const chosen = mode === "advantage" ? Math.max(roll1, roll2) : Math.min(roll1, roll2);
  return {
    rolls: [roll1, roll2],
    chosen,
    total: chosen + modifier,
    modifier,
    sides,
    mode,
  };
}