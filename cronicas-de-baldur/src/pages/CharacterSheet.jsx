import { useState, useEffect } from "react";
import ExportCharacterPDF from "../components/ExportCharacterPDF.jsx";
import DiceRoller from "../components/DiceRoller.jsx";
import CombatPanel from "../components/CombatPanel.jsx";
import Inventory from "../components/Inventory.jsx";

export default function CharacterSheet({ character: initialCharacter, updateCharacter }) {
  const [character, setCharacter] = useState(initialCharacter || {});

  // Sincroniza cambios
  const saveChange = (updated) => {
    updateCharacter(updated);
    setCharacter(updated);
  };

  // Cálculo de modificadores
  const getModifier = (score) => Math.floor((score - 10) / 2);

  // Asegurar que el personaje esté siempre actualizado
  useEffect(() => {
    if (initialCharacter) setCharacter(initialCharacter);
  }, [initialCharacter]);

  if (!character) return <p className="text-center text-light mt-5">Cargando personaje...</p>;

  return (
    <div className="container my-4">
      <ExportCharacterPDF filename={`${character.name}_hoja.pdf`}>
        {/* --- ENCABEZADO --- */}
        <div className="card bg-dark border-secondary p-4 shadow-lg mb-4">
          <h2 className="text-warning text-center mb-4">🧙‍♂️ {character.name}</h2>
          <div className="row">
            <div className="col-md-4">
              <p><strong>Clase:</strong> {character.class}</p>
              <p><strong>Raza:</strong> {character.race}</p>
              <p><strong>Nivel:</strong> {character.level}</p>
            </div>
            <div className="col-md-4">
              <p><strong>Trasfondo:</strong> {character.background}</p>
              <p><strong>Alineamiento:</strong> {character.alignment}</p>
              <p><strong>Jugador:</strong> {character.playerName}</p>
            </div>
            <div className="col-md-4 text-end text-secondary">
              <p><em>ID:</em> {character.id}</p>
              <p><em>Creado:</em> {character.createdAt || "—"}</p>
            </div>
          </div>
        </div>

        {/* --- ATRIBUTOS --- */}
        <div className="card bg-dark border-secondary p-3 shadow mb-4">
          <h4 className="text-warning text-center mb-3">📊 Atributos</h4>
          <div className="row text-center">
            {Object.entries(character.stats || {}).map(([key, value]) => (
              <div key={key} className="col-md-2 col-6 mb-3">
                <div className="border border-secondary rounded p-2">
                  <h5>{key.toUpperCase()}</h5>
                  <h3>{value}</h3>
                  <p className="text-secondary mb-0">
                    Mod: {getModifier(value) >= 0 ? "+" : ""}
                    {getModifier(value)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- PANEL DE COMBATE --- */}
        <div className="card bg-dark border-secondary p-3 shadow mb-4">
          <h4 className="text-warning text-center mb-3">⚔️ Panel de Combate</h4>
          <CombatPanel character={character} updateCharacter={saveChange} />
        </div>

        {/* --- TIRADAS DE DADOS --- */}
        <div className="card bg-dark border-secondary p-3 shadow mb-4">
          <h4 className="text-warning text-center mb-3">🎲 Tiradas de Dados</h4>
          <DiceRoller character={character} />
        </div>

        {/* --- INVENTARIO Y MONEDAS --- */}
        <div className="card bg-dark border-secondary p-3 shadow mb-4">
          <h4 className="text-warning text-center mb-3">🎒 Inventario</h4>
          <Inventory character={character} updateCharacter={saveChange} />
        </div>
      </ExportCharacterPDF>
    </div>
  );
}
