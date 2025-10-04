// src/pages/Lobby.jsx
import "../styles/original/global.css";
import "../styles/original/lobby.css";
import { Link } from "react-router-dom";

export default function Lobby() {
  return (
    <div className="game-screen lobby-bg">
      <div className="lobby-container">
        <div className="character-panel">
          <img id="lobby-avatar" src="https://static.thenounproject.com/png/1094753-200.png" alt="Avatar" />
          <div className="character-info">
            <h3 id="lobby-character-name">Aventurero</h3>
            <p>Nivel: <span id="lobby-level">1</span></p>
            <div className="gold-display">
              <img src="https://i.postimg.cc/sfSBKPKH/golden-coin.gif" alt="Oro" />
              <span id="lobby-gold">100</span>
            </div>
          </div>
        </div>

        <div className="activities-grid">
          <h2 className="text-center">¿Qué harás hoy?</h2>
          <div className="row justify-content-center text-center mt-4">
            <div className="col-md-4 mb-4">
              <Link to="/profile" className="activity-link">
                <img src="https://i.postimg.cc/4dpJvPZz/parchment.jpg" alt="Hoja de Personaje" className="activity-icon" />
                <p className="activity-name">Hoja de Personaje</p>
              </Link>
            </div>
            <div className="col-md-4 mb-4">
              <Link to="/store-main" className="activity-link">
                <img src="https://i.postimg.cc/cJnZZhvV/store-main-bg.png" alt="Tienda" className="activity-icon" />
                <p className="activity-name">Ir a la Tienda</p>
              </Link>
            </div>
            <div className="col-md-4 mb-4">
              <a href="#" className="activity-link disabled">
                <img src="https://i.postimg.cc/sgKG7VKV/dungeon-wall-bg.png" alt="Misiones" className="activity-icon" />
                <p className="activity-name">Misiones (Pronto)</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
