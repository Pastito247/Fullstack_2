import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import React from "react";
import Checkout from "../modules/shop/pages/Checkout";

describe("Checkout - Flujo de compra", () => {
  beforeEach(() => {
    // Simulamos carrito con productos
    const mockCarrito = [
      { id: "1", nombre: "Espada larga", precio: 100, cantidad: 1 },
      { id: "2", nombre: "Escudo de acero", precio: 150, cantidad: 1 },
    ];
    localStorage.setItem("forja_acero_carrito", JSON.stringify(mockCarrito));
  });

  it("Muestra los productos del carrito y total", () => {
    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>
    );

    expect(screen.getByText("Espada larga")).toBeInTheDocument();
    expect(screen.getByText("Escudo de acero")).toBeInTheDocument();
    expect(screen.getByText(/Total/i)).toBeInTheDocument();
  });

  it("⚠️ Muestra error si el formulario se envía vacío", () => {
    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>
    );

    const boton = screen.getByRole("button", { name: /confirmar compra/i });
    fireEvent.click(boton);

    expect(screen.getByText(/completa todos los campos/i)).toBeInTheDocument();
  });

  it("Envía correctamente los datos si el formulario es válido", async () => {
    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "Martín" } });
    fireEvent.change(screen.getByLabelText(/correo/i), { target: { value: "martin@test.com" } });
    fireEvent.change(screen.getByLabelText(/dirección/i), { target: { value: "Calle 123" } });

    const boton = screen.getByRole("button", { name: /confirmar compra/i });
    fireEvent.click(boton);

    expect(localStorage.getItem("forja_acero_carrito")).toBe("[]"); // se vacía carrito
  });
});
