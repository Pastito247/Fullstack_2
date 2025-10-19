const API_BASE = "https://www.dnd5eapi.co/api";

//  Busca hechizos que coincidan con un término
export async function searchSpells(query) {
  const res = await fetch(`${API_BASE}/spells?name=${query}`);
  const data = await res.json();
  return data.results || [];
}

//  detalles completos de un hechizo por su índice
export async function getSpellDetails(index) {
  const res = await fetch(`${API_BASE}/spells/${index}`);
  const data = await res.json();
  return data;
}

// Razas
export async function getRaces() {
  const res = await fetch(`${API_BASE}/races`);
  const data = await res.json();
  return data.results || [];
}

export async function getRaceDetails(index) {
  const res = await fetch(`${API_BASE}/races/${index}`);
  const data = await res.json();
  return data;
}

// Clases
export async function getClasses() {
  const res = await fetch(`${API_BASE}/classes`);
  const data = await res.json();
  return data.results || [];
}

export async function getClassDetails(index) {
  const res = await fetch(`${API_BASE}/classes/${index}`);
  const data = await res.json();
  return data;
}
// SUBCLASES
export async function getSubclasses() {
  const res = await fetch(`${API_BASE}/subclasses`);
  const data = await res.json();
  return data.results || [];
}

// Subclases por clase específica
export async function getSubclassesByClass(classIndex) {
  const res = await fetch(`${API_BASE}/classes/${classIndex}/subclasses`);
  const data = await res.json();
  return data.results || [];
}

// Detalles de una subclase
export async function getSubclassDetails(index) {
  const res = await fetch(`${API_BASE}/subclasses/${index}`);
  const data = await res.json();
  return data;
}


// TRASFONDOS
export async function getBackgrounds() {
  const res = await fetch(`${API_BASE}/backgrounds`);
  const data = await res.json();
  return data.results || [];
}

export async function getBackgroundDetails(index) {
  const res = await fetch(`${API_BASE}/backgrounds/${index}`);
  const data = await res.json();
  return data;
}
