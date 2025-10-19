import { useState, useEffect } from "react";
import { rollDice } from "../utils/diceRoller";

export default function Spellbook({ character, updateCharacter }) {
  const [spells, setSpells] = useState(character.spells || []);
  const [slots, setSlots] = useState(
    character.spellSlots || {
      1: { total: 2, used: 0 },
      2: { total: 0, used: 0 },
      3: { total: 0, used: 0 },
      4: { total: 0, used: 0 },
      5: { total: 0, used: 0 },
      6: { total: 0, used: 0 },
      7: { total: 0, used: 0 },
      8: { total: 0, used: 0 },
      9: { total: 0, used: 0 },
    }
  );

  const [newSpell, setNewSpell] = useState({
    name: "",
    level: 1,
    damage: "",
    type: "Ataque",
  });

  useEffect(() => {
    updateCharacter({ ...character, spells, spellSlots: slots });
  }, [spells, slots]);

  // Funciones de manejo de slots
  function useSlot(level) {
    if (slots[level].used < slots[level].total) {
      setSlots({
        ...slots,
        [level]: { ...slots[level], used: slots[level].used + 1 },
      });
    }
  }

  function resetSlots() {
    const reset = {};
    for (let lvl in slots) {
      reset[lvl] = { ...slots[lvl], used: 0 };
    }
    setSlots(reset);
  }

  // Agregar hechizo
  function addSpell() {
    if (!newSpell.name.trim()) return;
    setSpells([...spells, { ...newSpell, id: Date.now() }]);
    setNewSpell({ name: "", level: 1, damage: "", type: "Ataque" });
  }

  // Eliminar hechizo
  function deleteSpell(id) {
    setSpells(spells.filter((s) => s.id !== id));
  }

  // Tirar dado de daño de hechizo
  function rollSpellDamage(spell) {
    if (!spell.damage.includes("d"))
      return alert("Formato de daño inválido (ej: 2d8+3)");
    const match = spell.damage.match(/(\d*)d(\d+)([+-]\d+)?/);
    if (!match) return;

    const count = parseInt(match[1] || 1);
    const sides = parseInt(match[2]);
    const modifier = parseInt(match[3] || 0);

    const rolls = [];
    for (let i = 0; i < count; i++) {
      rolls.push(Math.floor(Math.random() * sides) + 1);
    }

    const total = rolls.reduce((a, b) => a + b, 0) + modifier;
    alert(
      `✨ ${spell.name}\nTirada: [${rolls.join(", ")}] ${
        modifier >= 0 ? "+" + modifier : modifier
      }\nTotal: ${total}`
    );
  }

  return (
    <div className="card bg-dark border-secondary p-3 shadow-lg mt-4">
      <h4 className="text-warning text-center mb-3">📜 Libro de Hechizos</h4>

      {/* Añadir nuevo hechizo */}
      <div className="row g-2 mb-3">
        <div className="col-md-4">
          <input
            type="text"
            placeholder="Nombre del hechizo"
            value={newSpell.name}
            onChange={(e) => setNewSpell({ ...newSpell, name: e.target.value })}
            className="form-control bg-dark text-light border-secondary"
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            min="0"
            max="9"
            value={newSpell.level}
            onChange={(e) =>
              setNewSpell({ ...newSpell, level: parseInt(e.target.value) })
            }
            className="form-control bg-dark text-light border-secondary"
            placeholder="Nivel"
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            placeholder="Daño (ej: 2d8+3)"
            value={newSpell.damage}
            onChange={(e) =>
              setNewSpell({ ...newSpell, damage: e.target.value })
            }
            className="form-control bg-dark text-light border-secondary"
          />
        </div>
        <div className="col-md-3">
          <button className="btn btn-outline-warning w-100" onClick={addSpell}>
            Añadir Hechizo
          </button>
        </div>
      </div>

      {/* Lista de hechizos */}
      <table className="table table-dark table-striped align-middle text-center">
        <thead>
          <tr>
            <th>Hechizo</th>
            <th>Nivel</th>
            <th>Daño</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {spells.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-secondary">
                (No hay hechizos añadidos)
              </td>
            </tr>
          ) : (
            spells.map((spell) => (
              <tr key={spell.id}>
                <td>{spell.name}</td>
                <td>{spell.level}</td>
                <td>{spell.damage}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-info me-2"
                    onClick={() => rollSpellDamage(spell)}
                  >
                    Tirar
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteSpell(spell.id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Espacios de conjuro */}
      <h5 className="text-warning mt-4">✨ Espacios de Conjuro</h5>
      <div className="table-responsive">
        <table className="table table-dark table-striped text-center">
          <thead>
            <tr>
              <th>Nivel</th>
              <th>Usados</th>
              <th>Totales</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(slots).map(([lvl, { used, total }]) => (
              <tr key={lvl}>
                <td>{lvl}</td>
                <td>{used}</td>
                <td>{total}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-warning"
                    onClick={() => useSlot(lvl)}
                    disabled={used >= total}
                  >
                    Usar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-outline-success w-100" onClick={resetSlots}>
          Restaurar Todos
        </button>
      </div>
    </div>
  );
}
