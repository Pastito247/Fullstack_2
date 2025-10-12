export const clasesDisponibles = [
  "Guerrero",
  "Mago",
  "Pícaro",
  "Clérigo",
  "Explorador",
  "Bardo",
  "Hechicero",
  "Monje",
  "Paladin",
  "Druida",
  "Barbaro",
  "Brujo",
  "Artifice"
];

export const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

export const guardarUsuarios = (lista) =>
  localStorage.setItem("usuarios", JSON.stringify(lista));

export const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
