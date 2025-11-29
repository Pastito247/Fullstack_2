import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../api/apiClient";
import { useAuth } from "../../context/AuthContext";

export default function DetallesCampana() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [deleting, setDeleting] = useState(false);

  // TODO: cuando tengamos endpoints de tiendas / players / personajes, los llenamos
  const [shops, setShops] = useState([]);
  const [players, setPlayers] = useState([]);
  const [characters, setCharacters] = useState([]);

  const cargarDatos = async () => {
    setLoading(true);
    setError("");
    setInfo("");

    try {
      // Detalle campaña
      const res = await apiClient.get(`/api/v1/campaigns/${id}`);
      setCampaign(res.data);

      // 🔥 Cargar personajes de esta campaña
      const resChars = await apiClient.get(`/api/characters/campaign/${id}`);
      setCharacters(resChars.data);
    } catch (err) {
      console.error(err);
      setError("No se pudo cargar la campaña.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const volver = () => {
    navigate("/campanas");
  };

  const esDuenoOCapo =
    user &&
    (user.role === "ADMIN" ||
      (campaign && user.username === campaign.dmUsername));

  const handleDelete = async () => {
    if (!campaign) return;
    const confirmar = window.confirm(
      `¿Seguro que quieres eliminar la campaña "${campaign.name}"? Esta acción no se puede deshacer.`
    );
    if (!confirmar) return;

    try {
      setDeleting(true);
      await apiClient.delete(`/api/v1/campaigns/${campaign.id}`);
      setInfo("Campaña eliminada correctamente.");
      setTimeout(() => navigate("/campanas"), 800);
    } catch (err) {
      console.error(err);
      setError("No se pudo eliminar la campaña. Revisa tus permisos.");
    } finally {
      setDeleting(false);
    }
  };

  const irACrearPersonaje = () => {
    if (!campaign) return;
    navigate(`/personajes/crear?campaignId=${campaign.id}`);
  };

  return (
    <div className="container py-5">
      {/* Barra superior: volver + nombre + menú */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-outline-light" onClick={volver}>
          Volver
        </button>

        <h1 className="h4 mb-0 text-center flex-grow-1">
          {campaign ? campaign.name : "Campaña"}
        </h1>

        {esDuenoOCapo ? (
          <div className="dropdown ms-3">
            <button
              className="btn btn-outline-light dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              ⋮
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button className="dropdown-item" disabled>
                  Editar campaña (próximamente)
                </button>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? "Eliminando..." : "Eliminar campaña"}
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div style={{ width: "80px" }} /> // espaciador
        )}
      </div>

      {(error || info) && (
        <div className="mb-3">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {info && (
            <div className="alert alert-success" role="alert">
              {info}
            </div>
          )}
        </div>
      )}

      {loading && <p>Cargando campaña...</p>}

      {!loading && campaign && (
        <div className="row g-4">
          {/* Columna izquierda: Tiendas */}
          <div className="col-12 col-md-4">
            <div className="card bg-dark text-light border-light h-100">
              <div className="card-body">
                <h5 className="card-title mb-3">Tiendas</h5>

                {shops.length === 0 ? (
                  <p className="text-muted small">
                    Aún no hay tiendas creadas para esta campaña.
                  </p>
                ) : (
                  <div className="d-flex flex-column gap-2">
                    {shops.map((shop) => (
                      <button
                        key={shop.id}
                        className="btn btn-outline-light text-start"
                      >
                        {shop.name}
                      </button>
                    ))}
                  </div>
                )}

                {/* Más adelante: botón "Crear tienda" solo para el DM */}
              </div>
            </div>
          </div>

          {/* Columna derecha: Jugadores + Personajes */}
          <div className="col-12 col-md-8">
            <div className="card bg-dark text-light border-light mb-3">
              <div className="card-body">
                <h5 className="card-title mb-3">Jugadores</h5>
                {players.length === 0 ? (
                  <p className="text-muted small">
                    Aún no hay jugadores listados para esta campaña.
                  </p>
                ) : (
                  <div className="d-flex flex-wrap gap-3">
                    {players.map((p) => (
                      <span key={p.id} className="badge bg-secondary">
                        {p.username}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="card bg-dark text-light border-light">
              <div className="card-body">
                <h5 className="card-title mb-3">Personajes</h5>

                {characters.length === 0 ? (
                  <p className="text-muted small">
                    Aún no hay personajes asociados a esta campaña.
                  </p>
                ) : (
                  <div className="d-flex flex-wrap gap-3">
                    {characters.map((ch) => (
                      <div
                        key={ch.id}
                        className="d-flex flex-column align-items-center"
                      >
                        <div
                          style={{
                            width: "80px",
                            height: "110px",
                            border: "2px solid #ffffff",
                            borderRadius: "4px",
                            overflow: "hidden",
                          }}
                          className="mb-2 d-flex align-items-center justify-content-center"
                        >
                          {ch.imageUrl ? (
                            <img
                              src={ch.imageUrl}
                              alt={ch.name}
                              className="img-fluid h-100 w-100 object-fit-cover"
                            />
                          ) : (
                            <span className="text-muted small">img</span>
                          )}
                        </div>
                        <span className="small">{ch.name}</span>
                      </div>
                    ))}
                  </div>
                )}

                {esDuenoOCapo && (
                  <button
                    className="btn btn-add btn-sm mt-3"
                    onClick={irACrearPersonaje}
                  >
                    Crear personaje para esta campaña
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {!loading && !campaign && !error && (
        <p className="text-muted">No se encontró la campaña.</p>
      )}
    </div>
  );
}
