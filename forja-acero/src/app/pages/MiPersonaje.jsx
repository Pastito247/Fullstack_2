import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

export default function MiPersonaje() {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cargarPersonaje = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await apiClient.get("/api/characters/me");
      setCharacter(res.data);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 404) {
        setError("Aún no tienes un personaje asignado en ninguna campaña.");
      } else {
        setError("No se pudo cargar tu personaje.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarPersonaje();
  }, []);

  return (
    <div className="container py-5">
      <h1 className="mb-4">Mi personaje</h1>

      {loading && <p>Cargando personaje...</p>}

      {error && !loading && (
        <div className="alert alert-warning" role="alert">
          {error}
        </div>
      )}

      {!loading && character && (
        <div className="row g-4">
          {/* Columna izquierda: imagen + datos básicos */}
          <div className="col-12 col-md-4">
            <div className="card bg-dark text-light border-light h-100">
              <div className="card-body d-flex flex-column align-items-center">
                <div
                  className="mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "180px",
                    height: "220px",
                    border: "3px solid #ffffff",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  {character.imageUrl ? (
                    <img
                      src={character.imageUrl}
                      alt={character.name}
                      className="img-fluid h-100 w-100 object-fit-cover"
                    />
                  ) : (
                    <span className="text-muted">IMG</span>
                  )}
                </div>
                <h3 className="h4 text-center mb-2">{character.name}</h3>
                <p className="mb-1 small">
                  Clase: <strong>{character.dndClass}</strong>
                </p>
                <p className="mb-1 small">
                  Raza: <strong>{character.race}</strong>
                </p>
                <p className="mb-1 small">
                  Nivel: <strong>{character.level}</strong>
                </p>
                {character.campaignName && (
                  <p className="mb-1 small text-muted">
                    Campaña: {character.campaignName}
                  </p>
                )}
                {character.playerUsername && (
                  <p className="mb-0 small text-muted">
                    Jugador: {character.playerUsername}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Columna derecha: dinero + inventario */}
          <div className="col-12 col-md-8">
            <div className="card bg-dark text-light border-light mb-3">
              <div className="card-body">
                <h5 className="card-title mb-3">Dinero</h5>
                {character.pp ||
                character.gp ||
                character.ep ||
                character.sp ||
                character.cp ? (
                  <div className="d-flex flex-wrap gap-3">
                    <span className="badge bg-secondary">
                      PP: {character.pp ?? 0}
                    </span>
                    <span className="badge bg-secondary">
                      GP: {character.gp ?? 0}
                    </span>
                    <span className="badge bg-secondary">
                      EP: {character.ep ?? 0}
                    </span>
                    <span className="badge bg-secondary">
                      SP: {character.sp ?? 0}
                    </span>
                    <span className="badge bg-secondary">
                      CP: {character.cp ?? 0}
                    </span>
                  </div>
                ) : (
                  <p className="text-muted small">
                    Aún no se ha configurado tu dinero.
                  </p>
                )}
              </div>
            </div>

            <div className="card bg-dark text-light border-light">
              <div className="card-body">
                <h5 className="card-title mb-3">Inventario</h5>
                {Array.isArray(character.inventory) &&
                character.inventory.length > 0 ? (
                  <ul className="list-group list-group-flush">
                    {character.inventory.map((item, idx) => (
                      <li
                        key={item.itemId ?? idx}
                        className="list-group-item bg-dark text-light"
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <strong>{item.name}</strong>
                            {item.category && (
                              <span className="small text-muted d-block">
                                {item.category}
                              </span>
                            )}
                            {(item.damageDice || item.damageType) && (
                              <span className="small text-muted d-block">
                                {item.damageDice && `${item.damageDice} `}
                                {item.damageType && `(${item.damageType})`}
                              </span>
                            )}
                          </div>
                          <div className="text-end">
                            <span className="d-block small">
                              x{item.quantity ?? 1}
                            </span>
                            {item.basePriceGold != null && (
                              <span className="d-block small text-muted">
                                {item.basePriceGold} gp
                              </span>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted small">
                    Tu inventario está vacío por ahora.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
