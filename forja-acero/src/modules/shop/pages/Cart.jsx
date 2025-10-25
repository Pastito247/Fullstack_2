import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [toast, setToast] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const isFirstRender = useRef(true);
  const navigate = useNavigate();

  // Helpers para claves por usuario
  const getCarritoKey = (correo) =>
    correo ? `forja_acero_carrito_${correo}` : "forja_acero_carrito";

  // Cargar datos del carrito y usuario
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("forja_acero_usuario"));
    setUsuario(user);

    const key = getCarritoKey(user?.correo);
    const guardado = JSON.parse(localStorage.getItem(key)) || [];

    // Fusionar duplicados
    const mapa = new Map();
    for (const item of guardado) {
      const cantidad = item.cantidad ? Number(item.cantidad) : 1;
      if (mapa.has(item.id)) {
        const previo = mapa.get(item.id);
        mapa.set(item.id, { ...previo, cantidad: previo.cantidad + cantidad });
      } else {
        mapa.set(item.id, { ...item, cantidad });
      }
    }
    setCarrito(Array.from(mapa.values()));
  }, []);

  // Guardar carrito del usuario cuando cambie
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!usuario) return;
    const key = getCarritoKey(usuario.correo);
    localStorage.setItem(key, JSON.stringify(carrito));
  }, [carrito, usuario]);

  // Mostrar toast elegante
  const mostrarToast = (mensaje) => {
    setToast(mensaje);
    setTimeout(() => setToast(null), 2500);
  };

  // Cambiar cantidad (sin tocar stock aún)
  const cambiarCantidad = (id, delta) => {
    setCarrito((prev) =>
      prev
        .map((p) => {
          if (p.id !== id) return p;

          const nueva = p.cantidad + delta;
          if (nueva < 1) {
            return null;
          }

          // Evita superar el stock
          if (nueva > p.stock) {
            mostrarToast("⚠️ No puedes agregar más de lo disponible en stock");
            return p;
          }

          return { ...p, cantidad: nueva };
        })
        .filter(Boolean)
    );
  };

  // Eliminar producto
  const eliminarProducto = (id) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
    mostrarToast("🗡️ Producto eliminado del carrito");
  };

  // Vaciar carrito
  const vaciarCarrito = () => {
    setCarrito([]);
    if (usuario) {
      const key = getCarritoKey(usuario.correo);
      localStorage.removeItem(key);
    } else {
      localStorage.removeItem("forja_acero_carrito");
    }
    mostrarToast("⚔️ Carrito vaciado");
  };

  // Calcular total
  const total = carrito.reduce(
    (acc, p) => acc + Number(p.precio || 0) * Number(p.cantidad || 1),
    0
  );

  // Ir al checkout con validaciones
  const irAlCheckout = () => {
    if (!usuario) {
      mostrarToast("⚠️ Debes iniciar sesión para finalizar la compra");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    if (carrito.length === 0) {
      mostrarToast("⚠️ No puedes finalizar una compra vacía");
      return;
    }

    navigate("/checkout");
  };

  return (
    <div className="carrito container py-5">
      <h2 className="text-center text-warning mb-4">🛒 Tu Carrito</h2>

      {/* Toast */}
      {toast && (
        <div
          className="toast-message position-fixed top-0 start-50 translate-middle-x mt-4"
          style={{ zIndex: 2000 }}
        >
          <div className="toast-body">{toast}</div>
        </div>
      )}

      {carrito.length === 0 ? (
        <div className="text-center mt-5">
          <p className="text-muted">Tu carrito está vacío.</p>
          <Link to="/" className="btn btn-add mt-3">
            Ir a la tienda
          </Link>
        </div>
      ) : (
        <>
          {/* Tabla */}
          <div className="table-responsive">
            <table className="table table-dark align-middle text-center">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((p) => (
                  <tr key={`${p.id}-${p.cantidad}`}>
                    <td>
                      <img
                        src={p.imagen}
                        alt={p.nombre}
                        className="img-thumbnail border border-warning"
                        style={{
                          width: "70px",
                          height: "70px",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td>{p.nombre}</td>
                    <td>${p.precio}</td>
                    <td>
                      <div className="cantidad-control d-flex justify-content-center align-items-center gap-2">
                        <button
                          className="btn btn-sm btn-outline-warning"
                          onClick={() => cambiarCantidad(p.id, -1)}
                        >
                          ➖
                        </button>
                        <span className="fw-bold">{p.cantidad}</span>
                        <button
                          className="btn btn-sm btn-outline-warning"
                          onClick={() => cambiarCantidad(p.id, 1)}
                        >
                          ➕
                        </button>
                      </div>
                    </td>
                    <td>${p.precio * p.cantidad}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => eliminarProducto(p.id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total */}
          <div className="text-end mt-4">
            <h4>Total: ${total}</h4>
          </div>

          {/* Botones */}
          <div className="d-flex justify-content-between flex-wrap mt-4 gap-3">
            <button className="btn btn-outline-danger" onClick={vaciarCarrito}>
              Vaciar carrito
            </button>

            <Link to="/" className="btn btn-outline-secondary">
              Seguir comprando
            </Link>

            {usuario ? (
              <button className="btn btn-add" onClick={irAlCheckout}>
                Finalizar compra
              </button>
            ) : (
              <button
                className="btn btn-secondary disabled"
                title="Debes iniciar sesión para finalizar tu compra"
              >
                Inicia sesión para comprar
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
