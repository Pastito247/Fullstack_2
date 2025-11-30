import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import apiClient from "../../api/apiClient";

export default function CrearPersonaje() {
  const navigate = useNavigate();
  const location = useLocation();

  // campaignId viene en la URL: /personajes/crear?campaignId=123
  const searchParams = new URLSearchParams(location.search);
  const preselectedCampaignId = searchParams.get("campaignId");

  const [campaignId, setCampaignId] = useState(preselectedCampaignId || "");
  const [campaign, setCampaign] = useState(null);
  const [loadingCampaign, setLoadingCampaign] = useState(true);

  const [name, setName] = useState("");
  const [dndClass, setDndClass] = useState("");
  const [race, setRace] = useState("");
  const [level, setLevel] = useState(1);
  const [npc, setNpc] = useState(false);
  const [playerUsername, setPlayerUsername] = useState("");

  // Imagen subida (base64)
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  // Dinero DnD
  const [pp, setPp] = useState(0);
  const [gp, setGp] = useState(0);
  const [ep, setEp] = useState(0);
  const [sp, setSp] = useState(0);
  const [cp, setCp] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const volver = () => {
    if (campaignId) {
      navigate(`/campanas/${campaignId}`);
    } else {
      navigate("/campanas");
    }
  };

  // Cargar datos de la campaña (solo la campaña actual)
  const cargarCampana = async () => {
    setError("");
    if (!preselectedCampaignId) {
      setCampaign(null);
      setCampaignId("");
      setLoadingCampaign(false);
      setError("No se especificó una campaña para crear el personaje.");
      return;
    }

    try {
      setLoadingCampaign(true);
      const res = await apiClient.get(`/api/v1/campaigns/${preselectedCampaignId}`);
      setCampaign(res.data);
      setCampaignId(preselectedCampaignId);
    } catch (err) {
      console.error(err);
      setError("No se pudo cargar la campaña. Intenta desde el detalle de la campaña.");
    } finally {
      setLoadingCampaign(false);
    }
  };

  useEffect(() => {
    cargarCampana();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);

    const reader = new FileReader();
    reader.onload = (ev) => {
      setImagePreview(ev.target.result); // data URL base64
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    if (!campaignId || !name.trim() || !dndClass.trim() || !race.trim()) {
      setError("Los campos con * son obligatorios.");
      return;
    }

    // Coincide con CharacterCreateRequest
    const payload = {
      campaignId: Number(campaignId),
      name: name.trim(),
      dndClass: dndClass.trim(),
      race: race.trim(),
      level: Number(level) || 1,
      npc: npc,
      imageUrl: imagePreview || null, // 🔥 ahora usamos la imagen subida
      playerUsername: playerUsername.trim(),
      pp: Number(pp) || 0,
      gp: Number(gp) || 0,
      ep: Number(ep) || 0,
      sp: Number(sp) || 0,
      cp: Number(cp) || 0,
    };

    try {
      setLoading(true);

      await apiClient.post(`/api/characters/campaign/${campaignId}`, payload);

      setInfo("Personaje creado correctamente.");

      // Limpiar campos, mantener campaña
      setName("");
      setDndClass("");
      setRace("");
      setLevel(1);
      setNpc(false);
      setPlayerUsername("");
      setImagePreview(null);
      setImageFile(null);
      setPp(0);
      setGp(0);
      setEp(0);
      setSp(0);
      setCp(0);

      setTimeout(() => volver(), 800);
    } catch (err) {
      console.error(err);
      setError("No se pudo crear el personaje. Revisa los datos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      {/* Barra superior: título + volver */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Crear personaje</h1>
        <button className="btn btn-outline-light" onClick={volver}>
          VOLVER
        </button>
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

      <div className="row g-4">
        {/* Columna izquierda: datos básicos */}
        <div className="col-12 col-md-6">
          <div className="card bg-dark text-light border-light h-100">
            <div className="card-body">
              <h5 className="card-title mb-4">Datos del personaje</h5>

              {loadingCampaign ? (
                <p>Cargando campaña...</p>
              ) : !campaign ? (
                <p className="text-muted">
                  No se pudo cargar la campaña. Vuelve al listado y entra desde
                  el detalle de una campaña.
                </p>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Campaña fija, solo lectura */}
                  <div className="mb-3">
                    <label className="form-label">Campaña</label>
                    <input
                      type="text"
                      className="form-control"
                      value={campaign.name}
                      disabled
                    />
                    <small className="text-muted">
                      El personaje se creará en esta campaña.
                    </small>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">*Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">*Clase</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Paladín, Mago, Pícaro..."
                      value={dndClass}
                      onChange={(e) => setDndClass(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">*Raza</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Humano, Elfo, Enano..."
                      value={race}
                      onChange={(e) => setRace(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Nivel</label>
                    <input
                      type="number"
                      className="form-control"
                      min={1}
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                    />
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="npcCheck"
                      checked={npc}
                      onChange={(e) => setNpc(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="npcCheck">
                      Es un NPC (no jugador)
                    </label>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Asignar a jugador (username)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Opcional"
                      value={playerUsername}
                      onChange={(e) => setPlayerUsername(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-add mt-2"
                    disabled={loading || !campaign}
                  >
                    {loading ? "Creando..." : "Crear personaje"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Columna derecha: dinero + imagen subida + preview */}
        <div className="col-12 col-md-6">
          <div className="card bg-dark text-light border-light h-100">
            <div className="card-body">
              <h5 className="card-title mb-4">Dinero inicial</h5>

              <p className="text-muted small">
                Puedes dejar todo en 0 si quieres asignar el dinero después.
              </p>

              <div className="row g-3 mb-4">
                <div className="col-6 col-sm-4">
                  <label className="form-label">PP</label>
                  <input
                    type="number"
                    className="form-control"
                    min={0}
                    value={pp}
                    onChange={(e) => setPp(e.target.value)}
                  />
                </div>
                <div className="col-6 col-sm-4">
                  <label className="form-label">GP</label>
                  <input
                    type="number"
                    className="form-control"
                    min={0}
                    value={gp}
                    onChange={(e) => setGp(e.target.value)}
                  />
                </div>
                <div className="col-6 col-sm-4">
                  <label className="form-label">EP</label>
                  <input
                    type="number"
                    className="form-control"
                    min={0}
                    value={ep}
                    onChange={(e) => setEp(e.target.value)}
                  />
                </div>
                <div className="col-6 col-sm-4">
                  <label className="form-label">SP</label>
                  <input
                    type="number"
                    className="form-control"
                    min={0}
                    value={sp}
                    onChange={(e) => setSp(e.target.value)}
                  />
                </div>
                <div className="col-6 col-sm-4">
                  <label className="form-label">CP</label>
                  <input
                    type="number"
                    className="form-control"
                    min={0}
                    value={cp}
                    onChange={(e) => setCp(e.target.value)}
                  />
                </div>
              </div>

              <h5 className="card-title mb-3">Imagen del personaje</h5>

              {/* Cuadro de imagen */}
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
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt={name || "Personaje"}
                    className="img-fluid h-100 w-100 object-fit-cover"
                  />
                ) : (
                  <span className="text-muted small">IMG</span>
                )}
              </div>

              {/* Botón subir imagen */}
              <button
                type="button"
                className="btn btn-outline-light mb-2"
                onClick={handleSelectImageClick}
              >
                Subir imagen
              </button>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                style={{ display: "none" }}
              />

              <p className="text-muted small">
                La imagen es opcional. Si la subes, se guardará junto al
                personaje.
              </p>

              <hr />

              <h5 className="card-title mb-3">Preview</h5>
              <p className="mb-1">
                <strong>{name || "Nombre del personaje"}</strong>
              </p>
              <p className="mb-1 small">
                Clase: {dndClass || <span className="text-muted">—</span>}
              </p>
              <p className="mb-1 small">
                Raza: {race || <span className="text-muted">—</span>}
              </p>
              <p className="mb-1 small">
                Nivel: {level || <span className="text-muted">—</span>}
              </p>
              <p className="mb-1 small">Tipo: {npc ? "NPC" : "Jugador"}</p>
              {playerUsername && (
                <p className="mb-1 small">
                  Asignado a: <strong>{playerUsername}</strong>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
