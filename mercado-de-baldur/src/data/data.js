// src/data/data.js
export const tiendasBase = [
  {
    id: 1,
    nombre: "El Herrero Baldurson",
    descripcion: "Forjando acero y honor desde hace 200 años.",
    tipo: "herrero",
    imagen:
      "https://i.ibb.co/5nXDL7J/blacksmith-shop.jpg",
    productos: [
      {
        id: 101,
        nombre: "Espada larga de acero",
        precio: 120,
        descripcion: "Forjada con precisión en las llamas del monte Baldur.",
        imagen:
          "https://i.ibb.co/hWrH7jM/sword.jpg",
      },
      {
        id: 102,
        nombre: "Escudo de roble reforzado",
        precio: 90,
        descripcion: "Protege contra el acero... y los dragones pequeños.",
        imagen:
          "https://i.ibb.co/qn9B9Cz/shield.jpg",
      },
    ],
  },
  {
    id: 2,
    nombre: "La Alquimista Seraphine",
    descripcion: "Maestra en pociones curativas y brebajes arcanos.",
    tipo: "alquimista",
    imagen:
      "https://i.ibb.co/4M7xTgc/alchemist-shop.jpg",
    productos: [
      {
        id: 201,
        nombre: "Poción de curación menor",
        precio: 45,
        descripcion: "Restaura 10 puntos de vida y buen ánimo.",
        imagen:
          "https://i.ibb.co/d7tWDr9/health-potion.jpg",
      },
      {
        id: 202,
        nombre: "Elixir de maná cristalino",
        precio: 75,
        descripcion: "Reaviva la energía mágica interior.",
        imagen:
          "https://i.ibb.co/z6WszwX/mana-potion.jpg",
      },
    ],
  },
];
