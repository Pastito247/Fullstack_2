import React, { useState, useEffect } from "react";

export default function AddCampaignForm({ onSave, editingCampaign }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    setting: "",
  });

  useEffect(() => {
    if (editingCampaign) setForm(editingCampaign);
  }, [editingCampaign]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) {
      alert("El nombre es obligatorio");
      return;
    }
    onSave({ ...form, id: form.id || Date.now() });
    setForm({ name: "", description: "", setting: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 text-start">
      <div className="row g-2">
        <div className="col-md-3">
          <input
            type="text"
            name="name"
            placeholder="Nombre de la campaña"
            value={form.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="description"
            placeholder="Descripción"
            value={form.description}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            name="setting"
            placeholder="Mundo o ambientación"
            value={form.setting}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-warning w-100">
            {editingCampaign ? "Actualizar" : "Agregar"}
          </button>
        </div>
      </div>
    </form>
  );
}
