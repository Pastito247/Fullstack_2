import React from "react";
import ReactDOM from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/Login.jsx";

describe("🧪 Componente Login", () => {
  it("debe renderizar el formulario de login", (done) => {
    const div = document.createElement("div");
    const root = ReactDOM.createRoot(div);

    root.render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Esperar a que React renderice
    setTimeout(() => {
      try {
        expect(div.innerHTML).toContain("Iniciar Sesión");
        expect(div.innerHTML).toContain("Contraseña");
        done();
      } catch (error) {
        done.fail(error);
      }
    }, 10);
  });
});
