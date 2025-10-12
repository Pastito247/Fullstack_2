import React from "react";
import "../styles/dnd-theme.css";

export default function Hero() {
  return (
    <section className="hero-banner text-center text-light d-flex flex-column justify-content-center align-items-center">
      <div className="hero-overlay"></div>

      <div className="hero-content position-relative">
        <h1 className="hero-title">⚜️ El Mercado de Baldur ⚜️</h1>
        <p className="hero-subtitle">
          Donde los aventureros forjan su destino, comercian reliquias y sellan pactos.
        </p>
        <a href="/stores" className="btn btn-warning mt-3">
          Entrar al Mercado
        </a>
      </div>
    </section>
  );
}
