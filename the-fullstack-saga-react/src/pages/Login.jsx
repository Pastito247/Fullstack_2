import "../styles/original/global.css";
import "../styles/original/forms.css";

export default function Login() {
  return (
    <>
      <div className="game-screen login-screen">
        <div className="form-container login-card">
          <h2 className="form-title login-title">
            <span>Acceso al</span>
            <span>Gremio</span>
          </h2>

          <form id="login-form" className="login-form">
            <label htmlFor="username">Usuario:</label>
            <input
              type="text"
              id="username"
              name="username"
              className="pixel-input"
              placeholder="Nombre de Héroe"
              required
            />

            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="pixel-input"
              placeholder="Tu Contraseña"
              required
            />

            <button type="submit" className="pixel-button login-submit">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

