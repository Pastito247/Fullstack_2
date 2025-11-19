import { Link } from 'react-router-dom'
import React from "react";

export default function Home() {
  const categorias = [
    { id: 'armas', nombre: 'Armas' },
    { id: 'armaduras', nombre: 'Armaduras' },
    { id: 'herramientas', nombre: 'Herramientas' },
    { id: 'accesorios', nombre: 'Accesorios' },
  ]

  return (
    <>
      {/* Hero Banner */}
      <section className="hero text-center text-light d-flex align-items-center justify-content-center">
        <div className="hero-content">
          <h1 className="display-4 fw-bold">⚒️ Forja & Acero ⚒️</h1>
          <p className="lead mt-3">
            “Donde el metal cobra vida y la aventura comienza.”
          </p>
          <Link to="/categoria/armas" className="btn btn-lg btn-outline-light mt-4">
            Entrar a la tienda
          </Link>
        </div>
      </section>

      {/* Categorías */}
      <section className="container my-5">
        <h2 className="text-center mb-4">Categorías</h2>
        <div className="row g-4">
          {categorias.map(c => (
            <div key={c.id} className="col-6 col-md-3">
              <div className="card h-100 text-center border-secondary">
                <div className="card-body">
                  <h5 className="card-title">{c.nombre}</h5>
                  <Link className="btn btn-outline-light bg-dark" to={`/categoria/${c.id}`}>
                    Ver productos
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}