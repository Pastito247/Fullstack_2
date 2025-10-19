import React, { useState, useEffect } from "react";
import {
  getCampaigns,
  addCampaign,
  editCampaign,
  deleteCampaign,
} from "../data/campaignService";
import AddCampaignForm from "../components/AddCampaignForm";
import CampaignCard from "../components/CampaignCard";

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    setCampaigns(getCampaigns());
  }, []);

  const handleSave = (campaign) => {
    if (editing) {
      editCampaign(campaign);
      setEditing(null);
    } else {
      addCampaign(campaign);
    }
    setCampaigns(getCampaigns());
  };

  const handleDelete = (id) => {
    if (confirm("¿Eliminar esta campaña?")) {
      deleteCampaign(id);
      setCampaigns(getCampaigns());
    }
  };

  return (
    <div className="container text-center">
      <h2 className="mb-4">Campañas</h2>
      <AddCampaignForm onSave={handleSave} editingCampaign={editing} />

      <div className="row justify-content-center">
        {campaigns.length === 0 ? (
          <p>No hay campañas aún.</p>
        ) : (
          campaigns.map((c) => (
            <div key={c.id} className="col-md-4">
              <CampaignCard
                campaign={c}
                onEdit={setEditing}
                onDelete={handleDelete}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
