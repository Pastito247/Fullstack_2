import { useState } from "react";
import { rollDice, rollMultiple, rollWithAdvantage } from "../utils/diceRoller";
import { calcModifier } from "../utils/applyBonuses";

export default function DiceRoller({ character }) {
  const [log, setLog] = useState([]);
  const [multiCount, setMultiCount] = useState(1);
  const [modifier, setModifier] = useState(0);

  function addToLog(entry) {
    setLog((prev) => [entry, ...prev.slice(0, 9)]);
  }

  function handleRoll(type, sides) {
    let result;
    switch (type) {
      case "normal":
        result = rollDice(sides, modifier);
        addToLog(
          `🎲 d${sides}: [${result.rolls.join(", ")}] ${modifier >= 0 ? "+" : ""}${modifier} = ${result.total}`
        );
        break;

      case "multiple":
        result = rollMultiple(sides, multiCount, modifier);
        addToLog(
          `🎲 ${multiCount}d${sides}: [${result.rolls.join(", ")}] ${modifier >= 0 ? "+" : ""}${modifier} = ${result.total}`
        );
        break;

      case "advantage":
      case "disadvantage":
        result = rollWithAdvantage(sides, type, modifier);
        addToLog(
          `🎯 d${sides} (${type}): [${result.rolls.join(", ")}] → ${result.chosen} ${modifier >= 0 ? "+" : ""}${modifier} = ${result.total}`
        );
        break;
    }
  }

  return (
    <div className="card bg-dark border-secondary p-3 shadow-lg">
      <h4 className="text-warning mb-3 text-center">🎲 Tiradas de Dados</h4>

      {/* Botones básicos */}
      <div className="d-flex flex-wrap gap-2 mb-3 justify-content-center">
        {[4, 6, 8, 10, 12, 20].map((s) => (
          <button
            key={s}
            className="btn btn-outline-warning"
            onClick={() => handleRoll("normal", s)}
          >
            d{s}
          </button>
        ))}
      </div>

      {/* Tiradas múltiples */}
      <div className="row g-2 mb-3">
        <div className="col">
          <label className="text-warning">Cantidad</label>
          <input
            type="number"
            min="1"
            value={multiCount}
            onChange={(e) => setMultiCount(parseInt(e.target.value) || 1)}
            className="form-control bg-dark text-light border-secondary"
          />
        </div>
        <div className="col">
          <label className="text-warning">Modificador</label>
          <input
            type="number"
            value={modifier}
            onChange={(e) => setModifier(parseInt(e.target.value) || 0)}
            className="form-control bg-dark text-light border-secondary"
          />
        </div>
      </div>

      <div className="d-flex flex-wrap gap-2 mb-3 justify-content-center">
        {[4, 6, 8, 10, 12, 20].map((s) => (
          <button
            key={s}
            className="btn btn-outline-info"
            onClick={() => handleRoll("multiple", s)}
          >
            {multiCount}d{s}
          </button>
        ))}
      </div>

      {/* Ventaja / Desventaja */}
      <div className="d-flex justify-content-center gap-3 mb-3">
        <button
          className="btn btn-success"
          onClick={() => handleRoll("advantage", 20)}
        >
          🎯 Ventaja
        </button>
        <button
          className="btn btn-danger"
          onClick={() => handleRoll("disadvantage", 20)}
        >
          💀 Desventaja
        </button>
      </div>

      {/* Tirada por atributo */}
      <div className="mb-3">
        <label className="text-warning">Atributo</label>
        <select
          id="rollAbility"
          className="form-select bg-dark text-light border-secondary"
          onChange={(e) => {
            if (!e.target.value) return;
            const mod = calcModifier(character.stats[e.target.value]);
            handleRoll("normal", 20, mod);
          }}
        >
          <option value="">Seleccionar atributo...</option>
          {Object.keys(character.stats).map((a) => (
            <option key={a} value={a}>
              {a.toUpperCase()} (mod {calcModifier(character.stats[a]) >= 0 ? "+" : ""}
              {calcModifier(character.stats[a])})
            </option>
          ))}
        </select>
      </div>

      {/* Historial */}
      <h6 className="text-warning mt-3">📜 Historial de tiradas</h6>
      <ul className="list-group bg-dark text-light border-secondary mt-2">
        {log.length > 0 ? (
          log.map((l, i) => (
            <li
              key={i}
              className="list-group-item bg-dark text-light border-secondary"
            >
              {l}
            </li>
          ))
        ) : (
          <li className="list-group-item bg-dark text-secondary">
            (Aún no hay tiradas)
          </li>
        )}
      </ul>
    </div>
  );
}
