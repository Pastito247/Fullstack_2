import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import React from "react";
import Carrito from "../modules/shop/pages/Cart";

describe(" Componente Carrito", () => {
  beforeEach(() => {
    const mockCarrito = [
      { id: "1", nombre: "Espada larga", precio: 100, cantidad: 1, imagen: "img.jpg" },
      { id: "2", nombre: "Escudo de acero", precio: 150, cantidad: 2, imagen: "img.jpg" },
    ];
    localStorage.setItem("forja_acero_carrito", JSON.stringify(mockCarrito));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("Renderiza los productos del carrito", () => {
    render(
      <MemoryRouter> 
        <Carrito />
      </MemoryRouter>
    );
    expect(screen.getByText("Espada larga")).toBeInTheDocument();
    expect(screen.getByText("Escudo de acero")).toBeInTheDocument();
  });

  it("Incrementa y decrementa cantidad sin errores", () => {
    render(
      <MemoryRouter>
        <Carrito />
      </MemoryRouter>
    );

    const botonesMas = screen.getAllByText("➕");
    const botonesMenos = screen.getAllByText("➖");

    fireEvent.click(botonesMas[0]);
    fireEvent.click(botonesMenos[0]);
    expect(true).toBe(true);
  });

  it("Elimina un producto del carrito", () => {
    render(
      <MemoryRouter>
        <Carrito />
      </MemoryRouter>
    );

    const botonEliminar = screen.getAllByText("🗑️")[0];
    fireEvent.click(botonEliminar);
    expect(screen.queryByText("Espada larga")).not.toBeInTheDocument();
  });
});
