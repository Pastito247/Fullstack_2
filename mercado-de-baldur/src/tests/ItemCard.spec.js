import React from "react";
import ReactDOM from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import StoreCard from "../components/StoreCard.jsx";

describe("🧪 Componente StoreCard", () => {
  it("debe renderizar correctamente el nombre de la tienda", (done) => {
    const div = document.createElement("div");
    const tiendaMock = {
      id: 1,
      nombre: "El Herrero Baldurson",
      descripcion: "Forjando acero",
      imagen: "https://i.ibb.co/5nXDL7J/blacksmith-shop.jpg",
    };

    const root = ReactDOM.createRoot(div);
    root.render(
      <MemoryRouter>
        <StoreCard tienda={tiendaMock} />
      </MemoryRouter>
    );

    setTimeout(() => {
      try {
        expect(div.innerHTML).toContain("El Herrero Baldurson");
        expect(div.innerHTML).toContain("Forjando acero");
        done();
      } catch (error) {
        done.fail(error);
      }
    }, 10);
  });
});
