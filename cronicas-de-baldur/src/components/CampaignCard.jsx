import React from "react";

export default function CampaignCard({ campaign, onEdit, onDelete }) {
  return (
    <div className="card bg-dark text-light border border-warning mb-3">
      <div className="card-body">
        <h4 className="card-title text-warning">{campaign.name}</h4>
        <p className="card-text">{campaign.description}</p>
        <p className="text-muted">
          <strong>Ambientación:</strong> {campaign.setting || "Desconocida"}
        </p>
        <div className="d-flex justify-content-end gap-2">
          <button
            className="btn btn-sm btn-outline-warning"
            onClick={() => onEdit(campaign)}
          >
            ✏️ Editar
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete(campaign.id)}
          >
            ❌ Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
