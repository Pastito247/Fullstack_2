import { useState, useEffect } from 'react'
import React from "react";

export default function CrudForm({ onGuardar, editando }) {
  const [form, setForm] = useState({
    nombre: '',
    categoria: '',
    precio: '',
    stock: '',
    descripcion: '',
    imagen: ''
  })

  useEffect(() => {
    if (editando) setForm(editando)
  }, [editando])

  // Cargar imagen desde archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setForm({ ...form, imagen: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.nombre || !form.categoria || !form.precio) {
      alert('Por favor completa todos los campos requeridos.')
      return
    }
    onGuardar(form)
    setForm({ nombre: '', categoria: '', precio: '', stock: '', descripcion: '', imagen: '' })
  }

  return (
    <form className="crud-form p-4 rounded" onSubmit={handleSubmit}>
      <h3 className="form-title mb-3">
        {editando ? 'Editar producto' : 'Agregar nuevo producto'}
      </h3>

      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          className="form-control"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Categoría</label>
        <select
          className="form-select"
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
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
          <label className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            name="precio"
            value={form.precio}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Stock</label>
          <input
            type="number"
            className="form-control"
            name="stock"
            value={form.stock}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-3 mt-2">
        <label className="form-label">Descripción</label>
        <textarea
          className="form-control"
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
        ></textarea>
      </div>

      {/* Cargar imagen */}
      <div className="mb-3">
        <label className="form-label">Imagen del producto</label>
        <input
          type="file"
          accept="image/*"
          className="form-control"
          onChange={handleFileChange}
        />
        <small className="text-muted">Puedes subir una imagen desde tu equipo.</small>

        {/* Vista previa */}
        {form.imagen && (
          <div className="text-center mt-3">
            <img
              src={form.imagen}
              alt="Vista previa"
              className="img-fluid rounded border border-warning"
              style={{ maxHeight: '160px', objectFit: 'cover' }}
            />
          </div>
        )}
      </div>

      <button className="btn btn-add w-100 mt-3">
        {editando ? 'Actualizar producto' : 'Guardar producto'}
      </button>
    </form>
  )
}