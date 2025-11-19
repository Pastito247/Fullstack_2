import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import React from "react";
import Register from "../app/pages/Register";

describe("Registro - Creación de usuario", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("Renderiza el formulario de registro", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
  });

  it("Muestra error si faltan campos", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole("button", { name: /registrarse/i }));
    expect(screen.getByText(/completa todos los campos/i)).toBeInTheDocument();
  });

  it("Guarda usuario nuevo en localStorage", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "Camila" } });
    fireEvent.change(screen.getByLabelText(/correo/i), { target: { value: "camila@test.com" } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: "5678" } });

    fireEvent.click(screen.getByRole("button", { name: /registrarse/i }));

    const usuarios = JSON.parse(localStorage.getItem("forja_acero_usuarios"));
    expect(usuarios.some(u => u.correo === "camila@test.com")).toBe(true);
  });

  it("Evita registrar un correo duplicado", () => {
    localStorage.setItem(
      "forja_acero_usuarios",
      JSON.stringify([{ nombre: "Martín", correo: "martin@test.com", password: "1234" }])
    );

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "Martín" } });
    fireEvent.change(screen.getByLabelText(/correo/i), { target: { value: "martin@test.com" } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: "1234" } });

    fireEvent.click(screen.getByRole("button", { name: /registrarse/i }));

    expect(screen.getByText(/ya existe una cuenta/i)).toBeInTheDocument();
  });
});
