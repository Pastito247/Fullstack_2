import { Link } from "react-router-dom"
import React from "react";

export default function About() {
  return (
    <div className="about container py-5">
      <div className="text-center mb-5">
        <h1 className="text-warning">⚒️ Forja & Acero</h1>
        <p className="lead text-muted">
          Aplicación desarrollada para la asignatura <strong>Fullstack 2</strong> — DUOC UC
        </p>
      </div>

      <div className="row justify-content-center text-center">
        <div className="col-md-8">
          <p className="mb-4">
            <strong>Forja & Acero</strong> es una tienda temática de{" "}
            <span className="text-warning">Herreria</span>, creada como proyecto
            evaluativo y como una base para una herramienta de tiendas para campañas de D&D (falta adaptar)
          </p>

          <p className="mb-4">
            El diseño visual se inspira en la ambientación medieval, con una estética de
            herrería y forja, utilizando colores oscuros, cobrizos y dorados para recrear
            la atmósfera de una auténtica tienda de aventureros.
          </p>

          <p className="mb-4">
            Este proyecto fue desarrollado con <strong>React</strong> y{" "}
            <strong>Bootstrap 5</strong>, empleando almacenamiento local con{" "}
            <strong>LocalStorage</strong> para simular una base de datos persistente.
          </p>

          <h4 className="text-warning mt-5 mb-3">👤 Desarrollador</h4>
          <p>
            <strong>Martín Céspedes Galarce (Pasto)</strong>  
            <br />
            Estudiante de Ingeniería en Informática — DUOC UC  
            <br />
            <em>Versión 1.0 — Octubre 2025</em>
          </p>

          <div className="mt-4">
            <Link to="/" className="btn btn-add mx-2">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
