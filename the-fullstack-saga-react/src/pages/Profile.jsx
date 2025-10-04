// src/pages/Profile.jsx
import "../styles/original/global.css";
import "../styles/original/profile.css";

export default function Profile() {
  return (
    <>
      {/* En Profile SÍ hay Navbar (esta ruta va en el layout con nav) */}
      <div className="game-screen profile-bg">
        <div id="profile-container" className="profile-parchment-container">
          <h2 className="text-center mb-4">
            Perfil de <span id="character-name-display">Héroe</span>
          </h2>

          {/* Botón Editar (abre modal bootstrap, estructura igual que tu HTML) */}
          <div className="text-center mb-4">
            <button
              id="edit-profile-button"
              className="pixel-button"
              data-bs-toggle="modal"
              data-bs-target="#editProfileModal"
            >
              Editar Perfil
            </button>
          </div>

          {/* Avatar + Info principal */}
          <div className="row g-4 mb-4">
            <div className="col-md-5 d-flex flex-column align-items-center">
              <div className="profile-image-frame">
                <img
                  id="profile-avatar"
                  src="https://static.thenounproject.com/png/1094753-200.png"
                  alt="Avatar del Personaje"
                  className="img-fluid"
                />
              </div>
            </div>

            <div className="col-md-7">
              <div className="info-section">
                <div className="info-item">
                  <span>Clase:</span>
                  <span id="character-class-display">—</span>
                </div>
                <div className="info-item">
                  <span>Raza:</span>
                  <span id="character-race-display">—</span>
                </div>
                <div className="info-item">
                  <span>Profesión:</span>
                  <span id="character-profession-display">—</span>
                </div>
                <div className="info-item">
                  <span>Transfondo:</span>
                  <span id="character-transfondo-display">—</span>
                </div>
                <div className="info-item">
                  <span>Nivel:</span>
                  <span id="character-level-display">1</span>
                </div>
                <div className="info-item">
                  <span>Experiencia:</span>
                  <span id="character-exp-display">0</span>
                </div>
                <div className="info-item">
                  <span>Oro:</span>
                  <span id="character-gold-display">100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats base */}
          <div className="stat-section text-center">
            <h3>Estadísticas Base</h3>
            <div className="row g-3">
              {[
                ["Fuerza", "stat-strength"],
                ["Inteligencia", "stat-intelligence"],
                ["Constitución", "stat-constitution"],
                ["Sabiduría", "stat-wisdom"],
                ["Destreza", "stat-dexterity"],
                ["Carisma", "stat-charisma"],
              ].map(([label, id]) => (
                <div className="col-md-4" key={id}>
                  <div className="stat-box">
                    <span className="stat-label">{label}:</span>
                    <span className="stat-value" id={id}>
                      —
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Inventario */}
            <div className="inventory-section">
              <h3>Inventario</h3>
              <div id="inventory-list" className="row">
                <p id="no-inventory-message" className="text-center">
                  El inventario está vacío.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <button id="logout-button" className="pixel-button">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Modal Editar Perfil (estructura compatible con Bootstrap) */}
      <div
        className="modal fade"
        id="editProfileModal"
        tabIndex="-1"
        aria-labelledby="editProfileModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content parchment-bg">
            <div className="modal-header">
              <h5 className="modal-title" id="editProfileModalLabel">
                Editar Personaje
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="text-center mb-3">
                <img
                  id="edit-avatar-preview"
                  src="https://static.thenounproject.com/png/1094753-200.png"
                  alt="Previsualización del Avatar"
                  className="profile-image-frame mb-2"
                  style={{ width: 140, height: 140 }}
                />
                <label
                  htmlFor="edit-avatar-upload"
                  className="pixel-button upload-button"
                >
                  Cambiar Imagen
                </label>
                <input
                  type="file"
                  id="edit-avatar-upload"
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="edit-character-name" className="form-label">
                  Nombre del Personaje:
                </label>
                <input
                  type="text"
                  id="edit-character-name"
                  className="form-control"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="pixel-button"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button type="button" id="save-profile-changes" className="pixel-button">
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
