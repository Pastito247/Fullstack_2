// src/pages/Register.jsx
import "../styles/original/global.css";
import "../styles/original/forms.css";

export default function Register() {
  return (
    <>
      <div className="game-screen register-screen">
        <div className="form-container register-card">
          <h2 className="form-title register-title">
            <span>Registro del</span>
            <span>Gremio</span>
          </h2>

          <form id="guild-form" className="register-form">
            <label htmlFor="username">Usuario:</label>
            <input
              type="text"
              id="username"
              name="username"
              className="pixel-input"
              placeholder="Nombre de Héroe"
              required
            />

            <label htmlFor="email">Correo:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="pixel-input"
              placeholder="Correo Electrónico"
              required
            />

            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="pixel-input"
              placeholder="Crea tu Contraseña"
              required
            />

            <label htmlFor="confirm-password">Repetir contraseña:</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              className="pixel-input"
              placeholder="Repite la Contraseña"
              required
            />

            <label htmlFor="dob">Fecha de Cumpleaños:</label>
            <input
              type="date"
              id="dob"
              name="dob"
              className="pixel-input"
              required
            />

            <button type="submit" className="pixel-button register-submit">
              Firmar
            </button>
          </form>
        </div>
      </div>
 
    </>
  );
}
