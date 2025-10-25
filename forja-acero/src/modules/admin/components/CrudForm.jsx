import { useState, useEffect } from "react";
import React from "react";

export default function CrudForm({ onGuardar, editando }) {
  const [form, setForm] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    stock: "",
    descripcion: "",
    imagen: "",
  });
  const [toast, setToast] = useState(null); // ✅ mensaje elegante

  useEffect(() => {
    if (editando) setForm(editando);
  }, [editando]);

  // === IMAGEN ===
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setForm({ ...form, imagen: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // === INPUTS ===
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // === TOAST ===
  const mostrarToast = (mensaje) => {
    setToast(mensaje);
    setTimeout(() => setToast(null), 2500);
  };

  // === SUBMIT ===
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.nombre.trim() ||
      !form.categoria.trim() ||
      !form.precio ||
      !form.stock ||
      !form.descripcion.trim() ||
      !form.imagen
    ) {
      mostrarToast("⚠️ Todos los campos son obligatorios");
      return;
    }

    onGuardar(form);
    mostrarToast("✅ Producto guardado correctamente");

    setForm({
      nombre: "",
      categoria: "",
      precio: "",
      stock: "",
      descripcion: "",
      imagen: "",
    });
  };

  return (
    <div className="position-relative">
      {/* ✅ TOAST */}
      {toast && (
        <div
          className="toast-message position-fixed top-0 start-50 translate-middle-x mt-4"
          style={{ zIndex: 2000 }}
        >
          <div className="toast-body">{toast}</div>
        </div>
      )}

      <form className="crud-form p-4 rounded" onSubmit={handleSubmit}>
        <h3 className="form-title mb-3">
          {editando ? "Editar producto" : "Agregar nuevo producto"}
        </h3>

        <div className="mb-3">
          <label className="form-label">
            Nombre <span className="text-danger">*</span>
          </label>
          <input
            className="form-control"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Categoría <span className="text-danger">*</span>
          </label>
          <select
            className="form-select"
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar</option>
            <option value="armas">Armas</option>
            <option value="armaduras">Armaduras</option>
            <option value="herramientas">Herramientas</option>
            <option value="accesorios">Accesorios</option>
          </select>
        </div>

        <div className="row g-2">
          <div className="col-md-6">
            <label className="form-label">
              Precio <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              className="form-control"
              name="precio"
              value={form.precio}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              Stock <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              className="form-control"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
        </div>

        <div className="mb-3 mt-2">
          <label className="form-label">
            Descripción <span className="text-danger">*</span>
          </label>
          <textarea
            className="form-control"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* === IMAGEN === */}
        <div className="mb-3">
          <label className="form-label">
            Imagen del producto <span className="text-danger">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleFileChange}
            required={!form.imagen}
          />
          <small className="text-muted">
            Puedes subir una imagen desde tu equipo.
          </small>

          {/* Vista previa */}
          {form.imagen && (
            <div className="text-center mt-3">
              <img
                src={form.imagen}
                alt="Vista previa"
                className="img-fluid rounded border border-warning"
                style={{ maxHeight: "160px", objectFit: "cover" }}
              />
            </div>
          )}
        </div>

        <button className="btn btn-add w-100 mt-3">
          {editando ? "Actualizar producto" : "Guardar producto"}
        </button>
      </form>
    </div>
  );
}
