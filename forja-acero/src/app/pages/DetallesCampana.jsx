// src/app/pages/DetallesCampana.jsx
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

  const [shops, setShops] = useState([]);
  const [players, setPlayers] = useState([]);
  const [characters, setCharacters] = useState([]);

  const esDM = user?.role === "DM" || user?.role === "ADMIN";

  const esDuenoOCapo =
    user &&
    (user.role === "ADMIN" ||
      (campaign && user.username === campaign.dmUsername));

  const cargarDatos = async () => {
    setLoading(true);
    setError("");
    setInfo("");

    try {
      // 1) Datos de la campaña
      const resCamp = await apiClient.get(`/api/v1/campaigns/${id}`);
      setCampaign(resCamp.data);

      // 2) Tiendas de la campaña
      const resShops = await apiClient.get(`/api/v1/campaigns/${id}/shops`);
      setShops(resShops.data || []);

      // 3) Personajes de la campaña (usa CharacterController)
      try {
        const resChars = await apiClient.get(`/api/characters/campaign/${id}`);
        setCharacters(resChars.data || []);
      } catch (err) {
        console.error("Error cargando personajes:", err);
        setCharacters([]);
      }

      // 4) Jugadores de la campaña (solo si eres DM/ADMIN)
      if (esDM) {
        try {
          const resPlayers = await apiClient.get(
            `/api/v1/campaigns/${id}/players`
          );
          setPlayers(resPlayers.data || []);
        } catch (err) {
          console.error("Error cargando jugadores:", err);
          setPlayers([]);
        }
      } else {
        setPlayers([]);
      }
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

  const irADetallePersonaje = (characterId) => {
    navigate(`/personajes/${characterId}`);
  };

  const irACrearTienda = () => {
    if (!campaign) return;
    navigate(`/tiendas/crear?campaignId=${campaign.id}`);
  };

  const irATienda = (shopId) => {
    navigate(`/tiendas/${shopId}`);
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
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title mb-0">Tiendas</h5>
                  {esDuenoOCapo && (
                    <button
                      className="btn btn-add btn-sm"
                      type="button"
                      onClick={irACrearTienda}
                    >
                      + Crear tienda
                    </button>
                  )}
                </div>

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
                        onClick={() => irATienda(shop.id)}
                      >
                        <strong>{shop.name}</strong>
                        {shop.description && (
                          <span className="d-block small text-muted">
                            {shop.description}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Columna derecha: Jugadores + Personajes */}
          <div className="col-12 col-md-8">
            <div className="card bg-dark text-light border-light mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title mb-0">Jugadores</h5>
                </div>

                {/* Código de invitación */}
                {campaign.inviteCode && (
                  <p className="mb-3 small">
                    Código de invitación: <code>{campaign.inviteCode}</code>
                  </p>
                )}

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
                      <button
                        key={ch.id}
                        type="button"
                        className="btn btn-outline-light p-0"
                        style={{
                          width: "110px",
                          borderRadius: "4px",
                          overflow: "hidden",
                        }}
                        onClick={() => irADetallePersonaje(ch.id)}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: "120px",
                            borderBottom: "1px solid rgba(255,255,255,0.3)",
                            overflow: "hidden",
                          }}
                          className="mb-0 d-flex align-items-center justify-content-center"
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
                        <div className="p-1">
                          <span className="small text-truncate d-block">
                            {ch.name}
                          </span>
                          <span className="small text-muted d-block">
                            Nv. {ch.level} · {ch.dndClass}
                          </span>
                        </div>
                      </button>
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
