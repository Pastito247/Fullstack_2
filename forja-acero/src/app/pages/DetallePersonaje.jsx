// src/app/pages/DetallePersonaje.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";
import { useAuth } from "../../context/AuthContext";

const coinStyle = (type) => {
  const base = {
    borderRadius: "999px",
    border: "none",
    padding: "0.4rem 0.7rem",
    fontWeight: "600",
  };

  switch (type) {
    case "PP": // platino
      return { ...base, backgroundColor: "#e5e4e2", color: "#000" };
    case "GP": // oro
      return { ...base, backgroundColor: "#ffcf40", color: "#000" };
    case "EP": // azul oscuro
      return { ...base, backgroundColor: "#1f3b73", color: "#fff" };
    case "SP": // plata
      return { ...base, backgroundColor: "#c0c0c0", color: "#000" };
    case "CP": // cobre
      return { ...base, backgroundColor: "#b87333", color: "#000" };
    default:
      return base;
  }
};

export default function DetallePersonaje() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const esDM = user?.role === "DM" || user?.role === "ADMIN";

  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Dinero
  const [editMoneyMode, setEditMoneyMode] = useState(false);
  const [pp, setPp] = useState(0);
  const [gp, setGp] = useState(0);
  const [ep, setEp] = useState(0);
  const [sp, setSp] = useState(0);
  const [cp, setCp] = useState(0);
  const [savingMoney, setSavingMoney] = useState(false);

  // Asignar personaje (solo DM)
  const [assignUsername, setAssignUsername] = useState("");
  const [assigning, setAssigning] = useState(false);
  const [playersCampaign, setPlayersCampaign] = useState([]);
  const [loadingPlayers, setLoadingPlayers] = useState(false);

  const cargarJugadoresCampania = async (campaignId) => {
    try {
      setLoadingPlayers(true);
      const res = await apiClient.get(
        `/api/v1/campaigns/${campaignId}/players`
      );
      setPlayersCampaign(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPlayers(false);
    }
  };

  const cargar = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await apiClient.get(`/api/characters/${id}`);
      const data = res.data;
      setCharacter(data);

      setPp(data.pp ?? 0);
      setGp(data.gp ?? 0);
      setEp(data.ep ?? 0);
      setSp(data.sp ?? 0);
      setCp(data.cp ?? 0);

      if (esDM && data.campaignId) {
        await cargarJugadoresCampania(data.campaignId);
      }
    } catch (err) {
      console.error(err);
      setError("No se pudo cargar el personaje.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const volver = () => {
    if (character?.campaignId) {
      navigate(`/campanas/${character.campaignId}`);
    } else {
      navigate("/campanas");
    }
  };

  const handleSaveMoney = async (e) => {
    e.preventDefault();
    if (!esDM) return;

    setError("");
    setSuccess("");

    try {
      setSavingMoney(true);

      const payload = {
        pp: Number(pp) || 0,
        gp: Number(gp) || 0,
        ep: Number(ep) || 0,
        sp: Number(sp) || 0,
        cp: Number(cp) || 0,
      };

      const res = await apiClient.put(
        `/api/characters/${id}/admin-update`,
        payload
      );

      setCharacter(res.data);
      setSuccess("Dinero actualizado correctamente.");
      setEditMoneyMode(false);
    } catch (err) {
      console.error(err);
      setError("No se pudo actualizar el dinero del personaje.");
    } finally {
      setSavingMoney(false);
    }
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    if (!esDM) return;

    const username = assignUsername.trim();
    if (!username) {
      setError("Debes seleccionar un jugador.");
      return;
    }

    setError("");
    setSuccess("");

    try {
      setAssigning(true);

      const res = await apiClient.put(
        `/api/characters/${id}/assign`,
        null,
        { params: { targetUsername: username } }
      );

      setCharacter(res.data);
      setSuccess(`Personaje asignado a ${username}.`);
      setAssignUsername("");
    } catch (err) {
      console.error(err);
      setError("No se pudo asignar el personaje al jugador.");
    } finally {
      setAssigning(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Detalle de personaje</h1>
        <button className="btn btn-outline-light" onClick={volver}>
          VOLVER
        </button>
      </div>

      {(error || success) && (
        <div className="mb-3">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {success && (
            <div className="alert alert-success" role="alert">
              {success}
            </div>
          )}
        </div>
      )}

      {loading && <p>Cargando personaje...</p>}

      {!loading && character && (
        <div className="row g-4">
          {/* Izquierda: imagen + datos + asignar jugador */}
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
                <p className="mb-1 small">
                  Tipo: {character.npc ? "NPC" : "Jugador"}
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

                {esDM && character.campaignId && (
                  <div className="w-100 mt-4">
                    <h6 className="small mb-2">Asignar a jugador</h6>

                    {loadingPlayers ? (
                      <p className="text-muted small">Cargando jugadores...</p>
                    ) : playersCampaign.length === 0 ? (
                      <p className="text-muted small">
                        No hay jugadores unidos a esta campaña.
                      </p>
                    ) : (
                      <form onSubmit={handleAssign} className="d-flex gap-2">
                        <select
                          className="form-select form-select-sm"
                          value={assignUsername}
                          onChange={(e) => setAssignUsername(e.target.value)}
                        >
                          <option value="">Selecciona un jugador</option>
                          {playersCampaign.map((p) => (
                            <option key={p.id} value={p.username}>
                              {p.username} ({p.email})
                            </option>
                          ))}
                        </select>
                        <button
                          type="submit"
                          className="btn btn-add btn-sm"
                          disabled={assigning}
                        >
                          {assigning ? "Asignando..." : "Asignar"}
                        </button>
                      </form>
                    )}

                    <p className="text-muted small mt-1">
                      Solo jugadores que ya se unieron a esta campaña.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Derecha: dinero + inventario */}
          <div className="col-12 col-md-8">
            <div className="card bg-dark text-light border-light mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title mb-0">Dinero</h5>

                  {esDM && (
                    <button
                      className="btn btn-outline-light btn-sm"
                      onClick={() => {
                        setEditMoneyMode((prev) => !prev);
                        setError("");
                        setSuccess("");
                        if (!editMoneyMode && character) {
                          setPp(character.pp ?? 0);
                          setGp(character.gp ?? 0);
                          setEp(character.ep ?? 0);
                          setSp(character.sp ?? 0);
                          setCp(character.cp ?? 0);
                        }
                      }}
                    >
                      {editMoneyMode ? "Cancelar" : "Editar dinero"}
                    </button>
                  )}
                </div>

                {!editMoneyMode ? (
                  character.pp ||
                  character.gp ||
                  character.ep ||
                  character.sp ||
                  character.cp ? (
                    <div className="d-flex flex-wrap gap-3">
                      <span style={coinStyle("PP")}>
                        PP: {character.pp ?? 0}
                      </span>
                      <span style={coinStyle("GP")}>
                        GP: {character.gp ?? 0}
                      </span>
                      <span style={coinStyle("EP")}>
                        EP: {character.ep ?? 0}
                      </span>
                      <span style={coinStyle("SP")}>
                        SP: {character.sp ?? 0}
                      </span>
                      <span style={coinStyle("CP")}>
                        CP: {character.cp ?? 0}
                      </span>
                    </div>
                  ) : (
                    <p className="text-muted small">
                      Aún no se ha configurado el dinero de este personaje.
                    </p>
                  )
                ) : (
                  <form onSubmit={handleSaveMoney}>
                    <div className="row g-3 mb-3">
                      <div className="col-6 col-sm-4">
                        <label className="form-label small">PP</label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          min={0}
                          value={pp}
                          onChange={(e) => setPp(e.target.value)}
                        />
                      </div>
                      <div className="col-6 col-sm-4">
                        <label className="form-label small">GP</label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          min={0}
                          value={gp}
                          onChange={(e) => setGp(e.target.value)}
                        />
                      </div>
                      <div className="col-6 col-sm-4">
                        <label className="form-label small">EP</label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          min={0}
                          value={ep}
                          onChange={(e) => setEp(e.target.value)}
                        />
                      </div>
                      <div className="col-6 col-sm-4">
                        <label className="form-label small">SP</label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          min={0}
                          value={sp}
                          onChange={(e) => setSp(e.target.value)}
                        />
                      </div>
                      <div className="col-6 col-sm-4">
                        <label className="form-label small">CP</label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          min={0}
                          value={cp}
                          onChange={(e) => setCp(e.target.value)}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-add btn-sm"
                      disabled={savingMoney}
                    >
                      {savingMoney ? "Guardando..." : "Guardar dinero"}
                    </button>
                  </form>
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
                    Este personaje no tiene ítems en el inventario todavía.
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
