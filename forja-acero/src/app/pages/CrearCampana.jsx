import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";

export default function CrearCampana() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const volver = () => {
    navigate("/campanas");
  };

  const handleSelectImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

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

    if (!nombre.trim() || !descripcion.trim()) {
      setError("Los campos marcados con * son obligatorios.");
      return;
    }

    try {
      setLoading(true);

      // Ahora el backend recibe name, description e imageUrl (opcional)
      await apiClient.post("/api/v1/campaigns", {
        name: nombre,
        description: descripcion,
        imageUrl: imagePreview || null,
      });

      setInfo("Campaña creada correctamente.");
      setTimeout(() => navigate("/campanas"), 800);
    } catch (err) {
      console.error(err);
      setError("No se pudo crear la campaña.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      {/* Barra superior con título y botón VOLVER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Crear campaña</h1>
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
        {/* Columna izquierda: Nombre + Descripción */}
        <div className="col-12 col-md-6">
          <div className="card bg-dark text-light border-light h-100">
            <div className="card-body">
              <h5 className="card-title mb-4">Datos de la campaña</h5>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">*Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">*Descripción</label>
                  <textarea
                    className="form-control"
                    rows={6}
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-add mt-2"
                  disabled={loading}
                >
                  {loading ? "Creando..." : "Crear campaña"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Columna derecha: Portada */}
        <div className="col-12 col-md-6">
          <div className="card bg-dark text-light border-light h-100">
            <div className="card-body d-flex flex-column align-items-center">
              <h5 className="card-title mb-3">Portada</h5>

              {/* Cuadrado de imagen */}
              <div
                className="mb-3 d-flex align-items-center justify-content-center"
                style={{
                  width: "260px",
                  height: "180px",
                  border: "3px solid #ffffff",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Portada campaña"
                    className="img-fluid h-100 w-100 object-fit-cover"
                  />
                ) : (
                  <span className="text-muted">IMG</span>
                )}
              </div>

              {/* Botón seleccionar imagen */}
              <button
                type="button"
                className="btn btn-outline-light mb-2"
                onClick={handleSelectImageClick}
              >
                Seleccione una imagen
              </button>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                style={{ display: "none" }}
              />

              <p className="text-muted small text-center mt-2">
                La imagen es opcional. Si la subes, se guardará como portada de
                la campaña.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
