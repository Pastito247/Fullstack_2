import React, { useState, useEffect } from "react";
import { applyBonuses } from "../utils/applyBonuses";
import {
  getRaces,
  getClasses,
  getBackgrounds,
  getRaceDetails,
  getClassDetails,
  getBackgroundDetails,
  getSubclassesByClass,
  getSubclassDetails,
} from "../data/dndApiService";
import {
  createNewCharacter,
  updateCharacter,
} from "../data/localStorageService";

export default function AddCharacterForm({ onCreated }) {
  const [races, setRaces] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedRace, setSelectedRace] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [backgrounds, setBackgrounds] = useState([]);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [subclasses, setSubclasses] = useState([]);
  const [selectedSubclass, setSelectedSubclass] = useState(null);
  const [character, setCharacter] = useState({
    name: "",
    level: 1,
    race: "",
    class: "",
    stats: {
      str: 10,
      dex: 10,
      con: 10,
      int: 10,
      wis: 10,
      cha: 10,
    },
    bonuses: {},
  });

  // Cargar razas y clases
  useEffect(() => {
    getRaces().then(setRaces);
    getClasses().then(setClasses);
    getBackgrounds().then(setBackgrounds);
  }, []);

  // Seleccionar raza
  async function handleRaceChange(index) {
    if (!index) return;
    const details = await getRaceDetails(index);

    // Aplicar bonificadores a stats base
    const abilityBonuses = details.ability_bonuses.map((b) => ({
      ability: b.ability_score.name,
      bonus: b.bonus,
    }));

    const newStats = applyBonuses(character.stats, abilityBonuses);

    setSelectedRace(details);
    setCharacter((prev) => ({
      ...prev,
      race: details.name,
      stats: newStats,
      bonuses: { ...prev.bonuses, ability_bonuses: abilityBonuses },
    }));
  }
  // Seleccionar clase
  async function handleClassChange(index) {
    if (!index) return;
    const details = await getClassDetails(index);
    setSelectedClass(details);
    setCharacter((prev) => ({
      ...prev,
      class: details.name,
      hit_die: details.hit_die,
      proficiencies: details.proficiencies.map((p) => p.name),
    }));
    // Cargar subclases
    const subs = await getSubclassesByClass(index);
    setSubclasses(subs);
    setSelectedSubclass(null);
  }
  async function handleSubclassChange(index) {
    if (!index) return;
    const details = await getSubclassDetails(index);
    setSelectedSubclass(details);
    setCharacter((prev) => ({
      ...prev,
      subclass: details.name,
      subclass_info: {
        flavor: details.subclass_flavor,
        desc: details.desc?.join(" ") || "",
        features: details.features?.map((f) => f.name) || [],
      },
    }));
  }

  // Seleccionar Transfondo
  async function handleBackgroundChange(index) {
    if (!index) return;
    const details = await getBackgroundDetails(index);
    setSelectedBackground(details);
    setCharacter((prev) => ({
      ...prev,
      background: details.name,
      background_info: {
        proficiencies: details.starting_proficiencies.map((p) => p.name),
        equipment: details.starting_equipment.map((e) => e.equipment.name),
        languages: details.language_options?.choose || 0,
      },
    }));
  }

  function handleSave() {
    if (!character.name || !character.race || !character.class) {
      return alert("Por favor completa todos los campos obligatorios");
    }

    const newCharacter = createNewCharacter();
    const merged = { ...newCharacter, ...character };
    updateCharacter(merged);
    alert("🧙‍♂️ Personaje creado exitosamente");
    onCreated?.();
  }

  return (
    <div className="container text-light mt-4">
      <h2 className="text-warning mb-3">Crear nuevo personaje</h2>
      <div className="card bg-dark p-4 border-secondary">
        {/* Nombre */}
        <label className="text-warning">Nombre del personaje</label>
        <input
          type="text"
          className="form-control bg-dark text-light border-secondary mb-3"
          placeholder="Ej: Tharion Lunargenta"
          value={character.name}
          onChange={(e) => setCharacter({ ...character, name: e.target.value })}
        />

        {/* Nivel */}
        <label className="text-warning">Nivel</label>
        <input
          type="number"
          min="1"
          max="20"
          className="form-control bg-dark text-light border-secondary mb-3"
          value={character.level}
          onChange={(e) =>
            setCharacter({ ...character, level: parseInt(e.target.value) })
          }
        />

        {/* Raza */}
        <label className="text-warning">Raza</label>
        <select
          className="form-select bg-dark text-light border-secondary mb-3"
          onChange={(e) => handleRaceChange(e.target.value)}
        >
          <option value="">Seleccionar raza...</option>
          {races.map((r) => (
            <option key={r.index} value={r.index}>
              {r.name}
            </option>
          ))}
        </select>
        {selectedRace && (
          <div className="alert alert-secondary text-dark small">
            <strong>{selectedRace.name}</strong> — {selectedRace.alignment}
            <br />
            Bonificadores:{" "}
            {selectedRace.ability_bonuses
              .map((b) => `${b.ability_score.name} +${b.bonus}`)
              .join(", ")}
          </div>
        )}

        {/* Clase */}
        <label className="text-warning">Clase</label>
        <select
          className="form-select bg-dark text-light border-secondary mb-3"
          onChange={(e) => handleClassChange(e.target.value)}
        >
          <option value="">Seleccionar clase...</option>
          {classes.map((c) => (
            <option key={c.index} value={c.index}>
              {c.name}
            </option>
          ))}
        </select>
        {selectedClass && (
          <div className="alert alert-secondary text-dark small">
            <strong>{selectedClass.name}</strong> (d{selectedClass.hit_die})
            <br />
            Competencias:{" "}
            {selectedClass.proficiencies.map((p) => p.name).join(", ")}
          </div>
        )}
        {/* SUBCLASE */}
        {subclasses.length > 0 && (
          <>
            <label className="text-warning">Subclase</label>
            <select
              className="form-select bg-dark text-light border-secondary mb-3"
              onChange={(e) => handleSubclassChange(e.target.value)}
            >
              <option value="">Seleccionar subclase...</option>
              {subclasses.map((s) => (
                <option key={s.index} value={s.index}>
                  {s.name}
                </option>
              ))}
            </select>

            {selectedSubclass && (
              <div className="alert alert-secondary text-dark small">
                <strong>{selectedSubclass.name}</strong> —{" "}
                {selectedSubclass.subclass_flavor}
                <br />
                <em>Descripción:</em>{" "}
                {selectedSubclass.desc?.slice(0, 200).join(" ") + "..."}
              </div>
            )}
          </>
        )}

        {/* TRASFONDO */}
        <label className="text-warning">Trasfondo</label>
        <select
          className="form-select bg-dark text-light border-secondary mb-3"
          onChange={(e) => handleBackgroundChange(e.target.value)}
        >
          <option value="">Seleccionar trasfondo...</option>
          {backgrounds.map((b) => (
            <option key={b.index} value={b.index}>
              {b.name}
            </option>
          ))}
        </select>

        {selectedBackground && (
          <div className="alert alert-secondary text-dark small">
            <strong>{selectedBackground.name}</strong>
            <br />
            <em>Competencias:</em>{" "}
            {selectedBackground.starting_proficiencies
              ?.map((p) => p.name)
              .join(", ") || "Ninguna"}
            <br />
            <em>Equipo inicial:</em>{" "}
            {selectedBackground.starting_equipment
              ?.map((e) => e.equipment.name)
              .join(", ") || "N/A"}
            <br />
            <em>Idioma adicional:</em>{" "}
            {selectedBackground.language_options?.choose
              ? `+${selectedBackground.language_options.choose} idioma(s)`
              : "N/A"}
          </div>
        )}

        {/* Guardar */}
        <button className="btn btn-warning mt-3" onClick={handleSave}>
          Guardar personaje
        </button>
      </div>
    </div>
  );
}
