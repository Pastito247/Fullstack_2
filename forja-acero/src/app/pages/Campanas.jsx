import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import apiClient from "../../api/apiClient";
import { useNavigate } from "react-router-dom";

export default function Campanas() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [dmCampaigns, setDmCampaigns] = useState([]);
  const [playerCampaigns, setPlayerCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [inviteCode, setInviteCode] = useState("");
  const [joining, setJoining] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  const esDM = user?.role === "DM" || user?.role === "ADMIN";
  const esPlayer = user?.role === "PLAYER";

  const irADetalle = (id) => {
    navigate(`/campanas/${id}`);
  };

  const cargarCampanas = async () => {
    setLoading(true);
    setError("");
    try {
      if (esDM) {
        const resDm = await apiClient.get("/api/v1/campaigns/mine");
        setDmCampaigns(resDm.data);
      } else {
        setDmCampaigns([]);
      }

      if (esPlayer) {
        const resPlayer = await apiClient.get("/api/v1/campaigns/joined");
        setPlayerCampaigns(resPlayer.data);
      } else {
        setPlayerCampaigns([]);
      }
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar las campañas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCampanas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Unirse por código (Player)
  const handleJoin = async (e) => {
    e.preventDefault();
    setError("");
    setInfoMessage("");

    const code = inviteCode.trim();
    if (!code) {
      setError("Debes ingresar un código de invitación.");
      return;
    }

    try {
      setJoining(true);
      await apiClient.post(
        `/api/v1/campaigns/join/${encodeURIComponent(code)}`
      );
      setInviteCode("");
      setInfoMessage("Te has unido a la campaña correctamente.");
      await cargarCampanas();
    } catch (err) {
      console.error(err);
      setError("No se pudo unir a la campaña. Verifica el código.");
    } finally {
      setJoining(false);
    }
  };

  const irACrearCampana = () => {
    navigate("/campanas/crear");
  };

  return (
    <div className="container py-5">
      {/* Mensajes arriba */}
      {(error || infoMessage) && (
        <div className="mb-3">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {infoMessage && (
            <div className="alert alert-success" role="alert">
              {infoMessage}
            </div>
          )}
        </div>
      )}

      {/* Sección DM: Mis campañas */}
      {esDM && (
        <>
          <h1 className="mb-4 text-center">Mis campañas</h1>

          {loading ? (
            <p className="text-center">Cargando campañas...</p>
          ) : dmCampaigns.length === 0 ? (
            <p className="text-center text-muted">No hay campañas creadas.</p>
          ) : (
            <div className="row g-4 justify-content-center mb-4">
              {dmCampaigns.map((c) => (
                <div
                  key={c.id}
                  className="col-12 col-sm-6 col-md-4 d-flex justify-content-center"
                >
                  <div
                    className="card bg-dark text-light border-light campaign-card"
                    style={{ cursor: "pointer" }}
                    onClick={() => irADetalle(c.id)}
                  >
                    <div className="card-body d-flex flex-column align-items-center">
                      {/* IMG cuadrada */}
                      <div
                        className="mb-3 d-flex align-items-center justify-content-center"
                        style={{
                          width: "140px",
                          height: "140px",
                          border: "3px solid #ffffff",
                          borderRadius: "4px",
                        }}
                      >
                        {/* Más adelante: usar c.imageUrl si lo agregamos */}
                        <span className="text-muted small">IMG</span>
                      </div>
                      {/* Nombre */}
                      <h5 className="card-title text-center mb-0">{c.name}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Botón CREAR CAMPAÑA centrado */}
          <div className="text-center mt-3 mb-5">
            <button className="btn btn-add px-4" onClick={irACrearCampana}>
              CREAR CAMPAÑA
            </button>
          </div>
        </>
      )}

      {/* Separador si el usuario es DM y Player (poco probable) */}
      {esDM && esPlayer && <hr className="my-4" />}

      {/* Sección Player: Unirse + campañas donde participa */}
      {esPlayer && (
        <>
          <h2 className="h4 mb-3">Campañas donde participas</h2>

          {/* Form para unirse por código */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Unirse a una campaña</h5>
              <form onSubmit={handleJoin}>
                <div className="mb-3">
                  <label className="form-label">Código de invitación</label>
                  <input
                    type="text"
                    className="form-control"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-add"
                  disabled={joining}
                >
                  {joining ? "Uniendo..." : "Unirse a campaña"}
                </button>
              </form>
              <p className="mt-2 text-muted small">
                Pídele al Dungeon Master el código de invitación de la campaña a
                la que quieres unirte.
              </p>
            </div>
          </div>

          {/* Lista de campañas del player */}
          <div className="card">
            <div className="card-body">
              {loading ? (
                <p>Cargando campañas...</p>
              ) : playerCampaigns.length === 0 ? (
                <p className="text-muted">
                  Aún no estás unido a ninguna campaña.
                </p>
              ) : (
                <ul className="list-group list-group-flush">
                  {playerCampaigns.map((c) => (
                    <li
                      key={c.id}
                      className="list-group-item bg-dark text-light"
                    >
                      <div>
                        <strong>{c.name}</strong>
                        <p className="mb-1 small text-muted">
                          {c.description}
                        </p>
                        <p className="mb-0 small">
                          Dungeon Master:{" "}
                          <span className="fw-bold">{c.dmUsername}</span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}

      {!esDM && !esPlayer && (
        <p className="text-muted">
          Tu rol no tiene funciones específicas en esta sección.
        </p>
      )}
    </div>
  );
}
