import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";

export default function Historial() {
  const [historial, setHistorial] = useState([]);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("forja_acero_usuario"));
    setUsuario(user);
    const data = JSON.parse(localStorage.getItem("forja_acero_historial")) || [];
    setHistorial(data.filter((c) => c.usuario === user?.nombre));
  }, []);

  if (!usuario) {
    return (
      <div className="container text-center py-5">
        <h3 className="text-warning mb-3">⚠️ Debes iniciar sesión para ver tu historial</h3>
        <Link to="/login" className="btn btn-add">Iniciar sesión</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="text-warning text-center mb-4">📜 Historial de Compras</h2>

      {historial.length === 0 ? (
        <p className="text-center text-muted">
          No tienes compras registradas aún.
        </p>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark align-middle text-center border border-warning">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Total</th>
                <th>Productos</th>
              </tr>
            </thead>
            <tbody>
              {historial.map((compra) => (
                <tr key={compra.id}>
                  <td>{compra.fecha}</td>
                  <td>${compra.total}</td>
                  <td>
                    {compra.productos.map((p) => (
                      <div key={p.id}>
                        {p.nombre} × {p.cantidad} (${p.precio})
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="text-center mt-4">
        <Link to="/" className="btn btn-outline-secondary">
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}
