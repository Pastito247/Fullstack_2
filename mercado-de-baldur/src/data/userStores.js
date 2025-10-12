export const tiendasUsuarios =
  JSON.parse(localStorage.getItem("tiendasUsuarios")) || [];

export const guardarTiendasUsuarios = (lista) =>
  localStorage.setItem("tiendasUsuarios", JSON.stringify(lista));
