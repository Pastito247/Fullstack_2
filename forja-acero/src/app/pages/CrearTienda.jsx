// src/app/pages/CrearTienda.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function CrearTienda() {
  const navigate = useNavigate();
  const query = useQuery();
  const campaignId = query.get("campaignId");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [saving, setSaving] = useState(false);

  if (!campaignId) {
    return (
      <div className="container py-5">
        <p className="text-danger">
          Falta el parámetro <code>campaignId</code> en la URL.
        </p>
      </div>
    );
  }

  const volverACampana = () => {
    navigate(`/campanas/${campaignId}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    if (!name.trim()) {
      setError("El nombre de la tienda es obligatorio.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        name: name.trim(),
        description: description.trim(),
        campaignId: Number(campaignId),
      };

      await apiClient.post(
        `/api/v1/campaigns/${campaignId}/shops`,
        payload
      );

      setInfo("Tienda creada correctamente.");
      // Volver a la campaña después de un pequeño delay
      setTimeout(() => {
        volverACampana();
      }, 700);
    } catch (err) {
      console.error(err);
      setError("No se pudo crear la tienda. Intenta nuevamente.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h4 mb-0">Crear tienda</h1>
        <button className="btn btn-outline-light" onClick={volverACampana}>
          Volver a campaña
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

      <div className="card bg-dark text-light border-light">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre de la tienda</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Herrero enano, Alquimista, Mercado general..."
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Descripción (opcional)</label>
              <textarea
                className="form-control"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ej: Tienda de armas pesadas de la ciudad de Baldur's Gate..."
              />
            </div>

            <button
              type="submit"
              className="btn btn-add"
              disabled={saving}
            >
              {saving ? "Creando..." : "Crear tienda"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
