import { Link } from "react-router-dom";

import "../styles/original/global.css";
import "../styles/original/forms.css";

export default function Home() {
  return (
    <main className="game-container">
      <div className="logo-title">
        <img src="https://i.postimg.cc/vTdZCjXq/logo-title.png" alt="The Fullstack Saga" />
      </div>

      <section className="split-screen">
        <div className="left-panel">
          <p>Retoma las riendas de tu historia</p>
          <Link to="/login" className="pixel-button">
            Login
          </Link>
        </div>

        <div className="right-panel">
          <p>Embarcate en la aventura</p>
          <Link to="/register" className="pixel-button">
            Register
          </Link>
        </div>
      </section>
    </main>
  );
}
