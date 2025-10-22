import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import React from "react";
import Login from "../app/pages/Login";
describe("Login - Autenticación de usuario", () => {
  beforeEach(() => {
    // Simulamos usuarios registrados
    const usuarios = [
      { nombre: "Martín", correo: "martin@test.com", password: "1234", rol: "comprador" },
    ];
    localStorage.setItem("forja_acero_usuarios", JSON.stringify(usuarios));
  });

  it("Muestra los campos de correo y contraseña", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
  });

  it("Muestra error si los campos están vacíos", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));
    expect(screen.getByText(/completa todos los campos/i)).toBeInTheDocument();
  });

  it("Inicia sesión correctamente con credenciales válidas", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/correo/i), { target: { value: "martin@test.com" } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: "1234" } });

    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    const usuario = JSON.parse(localStorage.getItem("forja_acero_usuario"));
    expect(usuario?.nombre).toBe("Martín");
  });

  it("No inicia sesión con credenciales incorrectas", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/correo/i), { target: { value: "otro@test.com" } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: "0000" } });

    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    expect(screen.getByText(/credenciales inválidas/i)).toBeInTheDocument();
  });
});
