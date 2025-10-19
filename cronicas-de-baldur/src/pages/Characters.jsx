import React, { useState, useEffect } from "react";
import CharacterCard from "../components/CharacterCard";
import AddCharacterForm from "../components/AddCharacterForm";
import {
  getCharacters,
  addCharacter,
  deleteCharacter,
} from "../data/localStorageService";
import { useNavigate } from "react-router-dom";

export default function Characters() {
  const [characterList, setCharacterList] = useState([]);
  const navigate = useNavigate();

  // Cargar desde LocalStorage al iniciar
  useEffect(() => {
    setCharacterList(getCharacters());
  }, []);

  const handleAdd = (newChar) => {
    addCharacter(newChar);
    setCharacterList(getCharacters());
  };

  const handleDelete = (id) => {
    if (confirm("¿Eliminar este personaje?")) {
      deleteCharacter(id);
      setCharacterList(getCharacters());
    }
  };

  return (
    <div className="container text-center">
      <h2 className="mb-4">Personajes registrados</h2>

      {/* Formulario de creación */}
      <AddCharacterForm onAdd={handleAdd} />

      {/* Lista de personajes */}
      <div className="row justify-content-center">
        {characterList.length === 0 ? (
          <p>No hay personajes aún.</p>
        ) : (
          characterList.map((char) => (
            <div key={char.id} className="col-md-4 position-relative">
              <CharacterCard character={char} />
              <button
                onClick={() => navigate(`/characters/${char.id}`)}
                className="btn btn-outline-warning mt-2"
              >
                Ver hoja
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
