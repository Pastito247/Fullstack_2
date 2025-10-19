import React from "react";


export default function CharacterCard({ character }) {
  return (
    <div className="card bg-dark text-light border border-warning mb-3">
      <div className="card-body">
        <h5 className="card-title text-warning">{character.name}</h5>
        <p className="card-text mb-1">
          <strong>Raza:</strong> {character.race}
        </p>
        <p className="card-text mb-1">
          <strong>Clase:</strong> {character.class}
        </p>
        <p className="card-text">
          <strong>Nivel:</strong> {character.level}
        </p>
      </div>
    </div>
  );
}
