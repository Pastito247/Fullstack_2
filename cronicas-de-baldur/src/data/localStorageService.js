import { characterTemplate } from "./characterModel";

const STORAGE_KEY = "baldur_characters";

// Obtiene todos los personajes del LocalStorage
export function getCharacters() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Guarda la lista completa
export function saveCharacters(characters) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
}

// Crea un nuevo personaje desde el modelo base
export function createNewCharacter() {
  const newCharacter = { ...characterTemplate, id: Date.now() };
  const characters = getCharacters();
  characters.push(newCharacter);
  saveCharacters(characters);
  return newCharacter;
}

// Busca un personaje por su ID
export function getCharacterById(id) {
  const characters = getCharacters();
  return characters.find((c) => c.id === Number(id));
}

// Actualiza un personaje existente
export function updateCharacter(updatedCharacter) {
  const characters = getCharacters();
  const index = characters.findIndex((c) => c.id === updatedCharacter.id);
  if (index !== -1) {
    characters[index] = updatedCharacter;
    saveCharacters(characters);
  }
}

// Elimina un personaje
export function deleteCharacter(id) {
  const characters = getCharacters().filter((c) => c.id !== id);
  saveCharacters(characters);
}

// Borra todos los datos (por tener nomas, no usar)
export function clearAllCharacters() {
  localStorage.removeItem(STORAGE_KEY);
}
