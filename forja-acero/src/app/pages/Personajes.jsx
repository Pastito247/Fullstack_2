import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import apiClient from "../../api/apiClient";
import { useNavigate } from "react-router-dom";

export default function Personajes() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const esPlayer = user?.role === "PLAYER";

  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cargar = async () => {
    if (!user) return;
    setLoading(true);
    setError("");

    try {
      if (esPlayer) {
        const res = await apiClient.get("/api/characters/my-characters");
        setCharacters(res.data || []);
      } else {
        setCharacters([]);
      }
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar tus personajes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const irADetalle = (id) => {
    navigate(`/personajes/${id}`);
  };

  if (!esPlayer) {
    return (
      <div className="container py-5">
        <h1 className="mb-4">Personajes</h1>
        <p className="text-muted">
          Como Dungeon Master, puedes ver los personajes desde el detalle de
          cada campaña.
        </p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">Mis personajes</h1>

      {error && (
        <div className="alert alert-danger mb-3" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-center">Cargando personajes...</p>
      ) : characters.length === 0 ? (
        <p className="text-center text-muted">
          Aún no tienes personajes asignados. Únete a una campaña y espera que
          el DM te asigne uno.
        </p>
      ) : (
        <div className="row g-4 justify-content-center">
          {characters.map((ch) => (
            <div
              key={ch.id}
              className="col-12 col-sm-6 col-md-4 d-flex justify-content-center"
            >
              <div
                className="card bg-dark text-light border-light"
                style={{ cursor: "pointer", width: "100%" }}
                onClick={() => irADetalle(ch.id)}
              >
                <div className="card-body d-flex flex-column align-items-center">
                  <div
                    className="mb-2 d-flex align-items-center justify-content-center"
                    style={{
                      width: "140px",
                      height: "160px",
                      border: "3px solid #ffffff",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    {ch.imageUrl ? (
                      <img
                        src={ch.imageUrl}
                        alt={ch.name}
                        className="img-fluid h-100 w-100 object-fit-cover"
                      />
                    ) : (
                      <span className="text-muted small">IMG</span>
                    )}
                  </div>
                  <h5 className="card-title mb-1 text-center">{ch.name}</h5>
                  <p className="mb-1 small text-center">
                    {ch.dndClass} • {ch.race} (Nv. {ch.level})
                  </p>
                  {ch.campaignName && (
                    <p className="mb-0 small text-muted text-center">
                      Campaña: {ch.campaignName}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
