// src/app/pages/MiPersonaje.jsx
import React, { useEffect, useRef, useState } from "react";
import apiClient from "../../api/apiClient";

const coinStyle = (type) => {
  const base = {
    borderRadius: "999px",
    border: "none",
    padding: "0.4rem 0.7rem",
    fontWeight: "600",
    display: "inline-block",
  };

  switch (type) {
    case "PP":
      return { ...base, backgroundColor: "#e5e4e2", color: "#000" };
    case "GP":
      return { ...base, backgroundColor: "#ffcf40", color: "#000" };
    case "EP":
      return { ...base, backgroundColor: "#1f3b73", color: "#fff" };
    case "SP":
      return { ...base, backgroundColor: "#c0c0c0", color: "#000" };
    case "CP":
      return { ...base, backgroundColor: "#b87333", color: "#000" };
    default:
      return base;
  }
};

export default function MiPersonaje() {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const cargarPersonaje = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await apiClient.get("/api/characters/me");
      const data = res.data;
      setCharacter(data);
      setEditName(data.name || "");
      setImagePreview(data.imageUrl || "");
      setSelectedFile(null);
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

  const handleSelectImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (ev) => {
      setImagePreview(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!character) return;

    setError("");
    setSuccess("");

    if (!editName.trim()) {
      setError("El nombre no puede estar vacío.");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();
      formData.append("name", editName.trim());

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const res = await apiClient.put(
        `/api/characters/${character.id}/edit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updated = res.data;
      setCharacter(updated);
      setEditMode(false);
      setSelectedFile(null);
      setImagePreview(updated.imageUrl || "");
      setSuccess("Personaje actualizado correctamente.");
    } catch (err) {
      console.error(err);
      setError("No se pudo actualizar el personaje.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Mi personaje</h1>

        {character && !loading && (
          <button
            className="btn btn-outline-light"
            onClick={() => {
              setEditMode((prev) => !prev);
              setError("");
              setSuccess("");
              if (!editMode && character) {
                setEditName(character.name || "");
                setImagePreview(character.imageUrl || "");
                setSelectedFile(null);
              }
            }}
          >
            {editMode ? "Cancelar" : "Editar"}
          </button>
        )}
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

      {!loading && !character && !error && (
        <p className="text-muted">No se encontró personaje.</p>
      )}

      {!loading && character && (
        <div className="row g-4">
          {/* Izquierda: imagen + datos básicos */}
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
                  {imagePreview || character.imageUrl ? (
                    <img
                      src={imagePreview || character.imageUrl}
                      alt={character.name}
                      className="img-fluid h-100 w-100 object-fit-cover"
                    />
                  ) : (
                    <span className="text-muted">IMG</span>
                  )}
                </div>

                {editMode && (
                  <>
                    <button
                      type="button"
                      className="btn btn-outline-light btn-sm mb-2"
                      onClick={handleSelectImageClick}
                    >
                      Cambiar imagen
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </>
                )}

                {!editMode ? (
                  <h3 className="h4 text-center mb-2">{character.name}</h3>
                ) : (
                  <div className="w-100">
                    <label className="form-label small">Nombre</label>
                    <input
                      type="text"
                      className="form-control form-control-sm mb-2"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  </div>
                )}

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

                {editMode && (
                  <button
                    className="btn btn-add btn-sm mt-3"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? "Guardando..." : "Guardar cambios"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Derecha: dinero + inventario */}
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
                    <span className="badge" style={coinStyle("PP")}>
                      PP: {character.pp ?? 0}
                    </span>
                    <span className="badge" style={coinStyle("GP")}>
                      GP: {character.gp ?? 0}
                    </span>
                    <span className="badge" style={coinStyle("EP")}>
                      EP: {character.ep ?? 0}
                    </span>
                    <span className="badge" style={coinStyle("SP")}>
                      SP: {character.sp ?? 0}
                    </span>
                    <span className="badge" style={coinStyle("CP")}>
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
