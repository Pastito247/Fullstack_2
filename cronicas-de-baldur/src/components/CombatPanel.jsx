import { useState, useEffect } from "react";
import { rollDice } from "../utils/diceRoller";
import { calcModifier } from "../utils/applyBonuses";

export default function CombatPanel({ character, updateCharacter }) {
  const [hp, setHp] = useState(character.hp || { current: 10, max: 10 });
  const [ac, setAc] = useState(character.ac || 10);
  const [initiative, setInitiative] = useState(character.initiative || 0);
  const [status, setStatus] = useState(character.status || "Vivo");

  useEffect(() => {
    updateCharacter({
      ...character,
      hp,
      ac,
      initiative,
      status,
    });
  }, [hp, ac, initiative, status]);

  function handleDamage(amount) {
    setHp((prev) => {
      const newHp = Math.max(prev.current - amount, 0);
      setStatus(newHp <= 0 ? "Inconsciente" : "Vivo");
      return { ...prev, current: newHp };
    });
  }

  function handleHeal(amount) {
    setHp((prev) => ({
      ...prev,
      current: Math.min(prev.current + amount, prev.max),
    }));
  }

  function handleRollInitiative() {
    const dexMod = calcModifier(character.stats.dex);
    const result = rollDice(20, dexMod);
    setInitiative(result.total);
  }

  return (
    <div className="card bg-dark border-secondary p-3 shadow-lg">
      <h4 className="text-warning text-center mb-3">⚔️ Panel de Combate</h4>

      {/* HP */}
      <div className="mb-3">
        <label className="text-warning fw-bold">❤️ Puntos de Golpe</label>
        <div className="d-flex align-items-center gap-2">
          <input
            type="number"
            className="form-control bg-dark text-light border-secondary"
            value={hp.current}
            onChange={(e) =>
              setHp({ ...hp, current: parseInt(e.target.value) || 0 })
            }
          />
          <span className="text-light">/ {hp.max}</span>
          <button
            className="btn btn-outline-danger"
            onClick={() => handleDamage(5)}
          >
            -5
          </button>
          <button
            className="btn btn-outline-success"
            onClick={() => handleHeal(5)}
          >
            +5
          </button>
        </div>
      </div>

      {/* AC */}
      <div className="mb-3">
        <label className="text-warning fw-bold">🛡️ Clase de Armadura (CA)</label>
        <input
          type="number"
          className="form-control bg-dark text-light border-secondary"
          value={ac}
          onChange={(e) => setAc(parseInt(e.target.value) || 10)}
        />
      </div>

      {/* Iniciativa */}
      <div className="mb-3">
        <label className="text-warning fw-bold">⚡ Iniciativa</label>
        <div className="d-flex align-items-center gap-2">
          <input
            type="number"
            className="form-control bg-dark text-light border-secondary"
            value={initiative}
            onChange={(e) => setInitiative(parseInt(e.target.value) || 0)}
          />
          <button
            className="btn btn-outline-info"
            onClick={handleRollInitiative}
          >
            🎲 Tirar
          </button>
        </div>
      </div>

      {/* Estado */}
      <div>
        <label className="text-warning fw-bold">💀 Estado</label>
        <select
          className="form-select bg-dark text-light border-secondary"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Vivo">Vivo</option>
          <option value="Inconsciente">Inconsciente</option>
          <option value="Muerto">Muerto</option>
        </select>
      </div>
    </div>
  );
}
