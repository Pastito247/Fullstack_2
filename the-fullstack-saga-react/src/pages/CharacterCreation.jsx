// src/pages/CharacterCreation.jsx
import { useState } from "react";
import "../styles/original/global.css";
import "../styles/original/creation.css";

export default function CharacterCreation() {
  // estados del formulario
  const [avatarUrl, setAvatarUrl] = useState(
    "https://static.thenounproject.com/png/1094753-200.png"
  );
  const [name, setName] = useState("");

  const [classInfo, setClassInfo] = useState("");
  const [raceInfo, setRaceInfo] = useState("");
  const [professionInfo, setProfessionInfo] = useState("");
  const [transfondoInfo, setTransfondoInfo] = useState("");

  const CLASS_TEXT = {
    guerrero: "Fuerte y resistente; experto en armas cuerpo a cuerpo.",
    mago: "Controla la magia arcana con potentes hechizos.",
    druida: "Aliado de la naturaleza; versátil en apoyo y control.",
    paladin: "Guerrero sagrado; mezcla de defensa y curación.",
    ladron: "Ágil y sigiloso; crítico alto y movilidad.",
    bardo: "Soporte carismático; mejora al equipo con música."
  };

  const RACE_TEXT = {
    enano: "Robusto y tenaz, maestro de la forja.",
    elfo: "Ágil, afinidad con la magia y la arquería.",
    humano: "Versátil, aprende rápido.",
    draconido: "Sangre de dragón; aliento elemental.",
    orco: "Furia y fuerza bruta.",
    tiefling: "Toque infernal; gran resistencia mágica.",
    gnomo: "Ingenioso y curioso; talento para artilugios."
  };

  const PROF_TEXT = {
    pescador: "Consigue alimento y materiales de agua.",
    minero: "Recolecta minerales para forja y comercio.",
    cocinero: "Mejoras temporales con platos únicos.",
    herrero: "Forja armas y armaduras.",
    alquimista: "Pociones de curación y buff."
  };

  const TRANSF_TEXT = {
    noble: "Recursos iniciales y contactos.",
    aventurero: "Experiencia en combate y exploración.",
    plebeyo: "Humilde pero trabajador; crecimiento estable."
  };


  const handleAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarUrl(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("¡Personaje creado! (Puedes conectar esto a tu lógica después)");
  };

  return (
    <>
      <div className="game-screen parchment-bg">
        <div className="creation-form-container">
          <h2 className="text-center mb-4">Crea tu Personaje</h2>

          <form id="character-creation-form" className="row g-4" onSubmit={handleSubmit}>
            <div className="col-md-5 d-flex flex-column align-items-center">
              <div className="character-image-frame">
                <img
                  id="character-avatar-preview"
                  src={avatarUrl}
                  alt="Avatar del Personaje"
                  className="img-fluid"
                />
              </div>

              <label htmlFor="avatar-upload" className="pixel-button upload-button">
                Subir Imagen
              </label>
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleAvatar}
              />

              <div className="mt-3" style={{ width: "100%" }}>
                <label htmlFor="character-name" className="form-label">
                  Nombre:
                </label>
                <input
                  id="character-name"
                  type="text"
                  className="form-control"
                  placeholder="Escribe el nombre"
                  onChange={(e) => setName(e.target.value)}
                />
                <p id="character-name-display" className="name-display mt-3">
                  {name || ""}
                </p>
              </div>
            </div>

            <div className="col-md-7">
              <div className="mb-3">
                <label htmlFor="class-select" className="form-label">
                  Clase:
                </label>
                <select
                  id="class-select"
                  className="form-select"
                  required
                  defaultValue=""
                  onChange={(e) => setClassInfo(CLASS_TEXT[e.target.value] || "")}
                >
                  <option value="" disabled>
                    Elige una clase
                  </option>
                  <option value="guerrero">Guerrero</option>
                  <option value="mago">Mago</option>
                  <option value="druida">Druida</option>
                  <option value="paladin">Paladín</option>
                  <option value="ladron">Ladrón</option>
                  <option value="bardo">Bardo</option>
                </select>
                <div className="info-box mt-2" id="class-info">
                  {classInfo}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="race-select" className="form-label">
                  Raza:
                </label>
                <select
                  id="race-select"
                  className="form-select"
                  required
                  defaultValue=""
                  onChange={(e) => setRaceInfo(RACE_TEXT[e.target.value] || "")}
                >
                  <option value="" disabled>
                    Elige una raza
                  </option>
                  <option value="enano">Enano</option>
                  <option value="elfo">Elfo</option>
                  <option value="humano">Humano</option>
                  <option value="draconido">Dracónido</option>
                  <option value="orco">Orco</option>
                  <option value="tiefling">Tiefling</option>
                  <option value="gnomo">Gnomo</option>
                </select>
                <div className="info-box mt-2" id="race-info">
                  {raceInfo}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="profession-select" className="form-label">
                  Profesión:
                </label>
                <select
                  id="profession-select"
                  className="form-select"
                  required
                  defaultValue=""
                  onChange={(e) => setProfessionInfo(PROF_TEXT[e.target.value] || "")}
                >
                  <option value="" disabled>
                    Elige una profesión
                  </option>
                  <option value="pescador">Pescador</option>
                  <option value="minero">Minero</option>
                  <option value="cocinero">Cocinero</option>
                  <option value="herrero">Herrero</option>
                  <option value="alquimista">Alquimista</option>
                </select>
                <div className="info-box mt-2" id="profession-info">
                  {professionInfo}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="transfondo-select" className="form-label">
                  Transfondo:
                </label>
                <select
                  id="transfondo-select"
                  className="form-select"
                  required
                  defaultValue=""
                  onChange={(e) => setTransfondoInfo(TRANSF_TEXT[e.target.value] || "")}
                >
                  <option value="" disabled>
                    Elige un transfondo
                  </option>
                  <option value="noble">Noble</option>
                  <option value="aventurero">Aventurero</option>
                  <option value="plebeyo">Plebeyo</option>
                </select>
                <div className="info-box mt-2" id="transfondo-info">
                  {transfondoInfo}
                </div>
              </div>
            </div>

            <div className="d-grid mt-4">
              <button type="submit" className="pixel-button">
                ¡Empezar Aventura!
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
