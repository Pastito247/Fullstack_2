const STORAGE_KEY = "campaigns_baldur";

// Obtener todas las campañas
export function getCampaigns() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Guardar lista completa
export function saveCampaigns(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// Agregar una nueva campaña
export function addCampaign(newCampaign) {
  const campaigns = getCampaigns();
  campaigns.push(newCampaign);
  saveCampaigns(campaigns);
}

// Editar campaña existente
export function editCampaign(updatedCampaign) {
  const campaigns = getCampaigns().map((c) =>
    c.id === updatedCampaign.id ? updatedCampaign : c
  );
  saveCampaigns(campaigns);
}

// Eliminar campaña por ID
export function deleteCampaign(id) {
  const campaigns = getCampaigns().filter((c) => c.id !== id);
  saveCampaigns(campaigns);
}
