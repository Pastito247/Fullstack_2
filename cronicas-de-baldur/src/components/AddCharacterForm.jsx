import React, { useState } from "react";

export default function AddCharacterForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    race: "",
    class: "",
    level: 1,
    alignment: "",
    background: "",
    hp: 10,
    ac: 10,
    stats: {
      str: 10,
      dex: 10,
      con: 10,
      int: 10,
      wis: 10,
      cha: 10,
    },
  });

  // 🔹 Maneja cambios en campos normales
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Maneja cambios en los atributos (stats)
  const handleStatChange = (e) => {
    setForm({
      ...form,
      stats: {
        ...form.stats,
        [e.target.name]: parseInt(e.target.value),
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.race || !form.class) {
      alert("Por favor completa todos los campos principales");
      return;
    }

    const newCharacter = {
      id: Date.now(),
      ...form,
      level: parseInt(form.level),
    };

    onAdd(newCharacter);
    setForm({
      name: "",
      race: "",
      class: "",
      level: 1,
      alignment: "",
      background: "",
      hp: 10,
      ac: 10,
      stats: {
        str: 10,
        dex: 10,
        con: 10,
        int: 10,
        wis: 10,
        cha: 10,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 text-start bg-dark text-light p-3 rounded border border-warning">
      <h4 className="text-warning mb-3">Crear nuevo personaje</h4>

      {/* 🔸 Datos principales */}
      <div className="row g-2 mb-3">
        <div className="col-md-3">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            name="race"
            placeholder="Raza"
            value={form.race}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            name="class"
            placeholder="Clase"
            value={form.class}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-1">
          <input
            type="number"
            name="level"
            placeholder="Lvl"
            min="1"
            value={form.level}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            name="alignment"
            placeholder="Alineamiento"
            value={form.alignment}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>

      {/* 🔸 Trasfondo, HP, CA */}
      <div className="row g-2 mb-3">
        <div className="col-md-4">
          <input
            type="text"
            name="background"
            placeholder="Trasfondo"
            value={form.background}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            name="hp"
            placeholder="HP"
            min="1"
            value={form.hp}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            name="ac"
            placeholder="CA"
            min="1"
            value={form.ac}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>

      {/* 🔸 Atributos base */}
      <h5 className="text-warning mt-3 mb-2">Atributos</h5>
      <div className="row g-2">
        {Object.entries(form.stats).map(([key, value]) => (
          <div key={key} className="col-md-2">
            <label className="form-label text-uppercase fw-bold">{key}</label>
            <input
              type="number"
              name={key}
              min="1"
              max="20"
              value={value}
              onChange={handleStatChange}
              className="form-control text-center"
            />
          </div>
        ))}
      </div>

      <div className="text-end mt-3">
        <button type="submit" className="btn btn-warning">
          Crear personaje
        </button>
      </div>
    </form>
  );
}
