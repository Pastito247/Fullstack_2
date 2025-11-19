import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";

export default function Historial() {
  const [historial, setHistorial] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [detalleCompra, setDetalleCompra] = useState(null);

  // Cargar usuario y compras
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("forja_acero_usuario"));
    setUsuario(user);

    if (user) {
      if (user.rol === "admin") {
        // Admin: ver todos los historiales
        const todasLasClaves = Object.keys(localStorage).filter((k) =>
          k.startsWith("forja_acero_historial_")
        );

        const todasLasCompras = todasLasClaves.flatMap((clave) => {
          const data = JSON.parse(localStorage.getItem(clave)) || [];
          return data.map((c) => ({ ...c, correo: clave.split("_").pop() }));
        });

        todasLasCompras.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        setHistorial(todasLasCompras);
      } else {
        // Usuario normal: solo su historial
        const key = `forja_acero_historial_${user.correo}`;
        const data = JSON.parse(localStorage.getItem(key)) || [];
        data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        setHistorial(data);
      }
    }
  }, []);

  // Mostrar detalle modal
  const abrirDetalle = (compra) => setDetalleCompra(compra);
  const cerrarDetalle = () => setDetalleCompra(null);

  // Cambiar estado (solo admin)
  const cambiarEstado = (nuevoEstado) => {
    if (!detalleCompra) return;

    const actualizado = { ...detalleCompra, estado: nuevoEstado };

    // Actualizar en localStorage
    const key = `forja_acero_historial_${detalleCompra.correo || usuario.correo}`;
    const data = JSON.parse(localStorage.getItem(key)) || [];
    const nuevoHistorial = data.map((c) =>
      c.id === detalleCompra.id ? actualizado : c
    );
    localStorage.setItem(key, JSON.stringify(nuevoHistorial));

    // Si es admin, actualizar también el estado global de la tabla
    setHistorial((prev) =>
      prev.map((c) => (c.id === detalleCompra.id ? actualizado : c))
    );

    setDetalleCompra(actualizado);
  };

  if (!usuario) {
    return (
      <div className="container text-center py-5">
        <h3 className="text-warning mb-3">
          ⚠️ Debes iniciar sesión para ver tu historial
        </h3>
        <Link to="/login" className="btn btn-add">
          Iniciar sesión
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5 position-relative">
      <h2 className="text-warning text-center mb-4">📜 Historial de Compras</h2>

      {usuario.rol === "admin" && (
        <p className="text-center text-info mb-4">
          👑 Estás viendo <strong>todas las compras</strong> de los usuarios.
        </p>
      )}

      {historial.length === 0 ? (
        <p className="text-center text-muted">
          No se encontraron compras registradas.
        </p>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark align-middle text-center border border-warning">
            <thead>
              <tr>
                <th>Fecha</th>
                {usuario.rol === "admin" && <th>Usuario</th>}
                <th>Total</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {historial.map((compra) => (
                <tr key={compra.id}>
                  <td>{compra.fecha}</td>
                  {usuario.rol === "admin" && (
                    <td>{compra.usuario || compra.correo}</td>
                  )}
                  <td>{compra.total} 🪙</td>
                  <td>
                    <span
                      className={`badge ${
                        compra.estado === "en fabricación"
                          ? "bg-warning text-dark"
                          : compra.estado === "enviado"
                          ? "bg-info"
                          : compra.estado === "recibido"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {compra.estado || "pendiente"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-warning boton-detalle"
                      onClick={() => abrirDetalle(compra)}
                    >
                      🔍 Ver detalle
                    </button>
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

      {/* Modal de Detalle */}
      {detalleCompra && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.7)",
          }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content bg-dark text-light border border-warning">
              <div className="modal-header">
                <h5 className="modal-title text-warning">
                  🧾 Detalle de la compra
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={cerrarDetalle}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Fecha:</strong> {detalleCompra.fecha}
                </p>
                {usuario.rol === "admin" && (
                  <p>
                    <strong>Usuario:</strong>{" "}
                    {detalleCompra.usuario || detalleCompra.correo}
                  </p>
                )}
                <p>
                  <strong>Dirección:</strong> {detalleCompra.direccion || "—"}
                </p>
                <p>
                  <strong>Método de pago:</strong> {detalleCompra.metodo || "—"}
                </p>
                <p>
                  <strong>Total:</strong> {detalleCompra.total} 🪙
                </p>
                <p>
                  <strong>Estado actual:</strong>{" "}
                  <span className="text-warning">
                    {detalleCompra.estado || "pendiente"}
                  </span>
                </p>

                {/* ADMIN: Cambiar estado */}
                {usuario.rol === "admin" && (
                  <div className="mb-3 mt-3">
                    <label className="form-label">Cambiar estado:</label>
                    <select
                      className="form-select bg-dark text-light border-warning"
                      value={detalleCompra.estado || "pendiente"}
                      onChange={(e) => cambiarEstado(e.target.value)}
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="en fabricación">En fabricación</option>
                      <option value="enviado">Enviado</option>
                      <option value="recibido">Recibido</option>
                    </select>
                  </div>
                )}

                <hr />
                <h6 className="text-warning">Productos:</h6>
                <ul className="list-unstyled">
                  {detalleCompra.productos.map((p, i) => (
                    <li key={i}>
                      • {p.nombre} × {p.cantidad} ={" "}
                      {Number(p.precio) * Number(p.cantidad)} 🪙
                    </li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-outline-warning"
                  onClick={cerrarDetalle}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
