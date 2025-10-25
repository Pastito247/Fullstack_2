import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [metodo, setMetodo] = useState("oro");
  const [toast, setToast] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();

  // Helpers 🔧
  const getCarritoKey = (correo) =>
    correo ? `forja_acero_carrito_${correo}` : "forja_acero_carrito";
  const getHistorialKey = (correo) =>
    correo ? `forja_acero_historial_${correo}` : "forja_acero_historial";

  // 🧩 Simula usuario si no hay uno (solo en desarrollo/test)
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("forja_acero_usuario"));
    if (!u) {
      const mock = { nombre: "Test", correo: "test@test.com", rol: "user" };
      localStorage.setItem("forja_acero_usuario", JSON.stringify(mock));
      setUsuario(mock);
      setCorreo(mock.correo);
    } else {
      setUsuario(u);
      setCorreo(u.correo || "");
    }
  }, []);

  // 🛒 Carga carrito del usuario activo
  useEffect(() => {
    if (!usuario?.correo) return;
    const key = getCarritoKey(usuario.correo);
    const guardado = JSON.parse(localStorage.getItem(key)) || [];
    setCarrito(guardado);
  }, [usuario]);

  // 📣 Toast elegante
  const mostrarToast = (mensaje) => {
    setToast(mensaje);
    setTimeout(() => setToast(null), 2000);
  };

  // 🧾 Confirmar compra
  const enviarCompra = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !correo.trim() || !direccion.trim()) {
      mostrarToast("⚠️ Completa todos los campos");
      return;
    }

    const usuario = JSON.parse(localStorage.getItem("forja_acero_usuario"));
    if (!usuario) {
      mostrarToast("⚠️ Debes iniciar sesión para continuar con tu compra");
      setTimeout(() => navigate("/failure"), 2000);
      return;
    }

    // 🔥 Descontar stock real al confirmar compra
    const db = JSON.parse(localStorage.getItem("forja_acero_db"));
    const productosDB = db.productos.map((p) => {
      const comprado = carrito.find((c) => c.id === p.id);
      if (comprado) {
        const nuevoStock = Math.max(0, p.stock - comprado.cantidad);
        return { ...p, stock: nuevoStock };
      }
      return p;
    });
    localStorage.setItem(
      "forja_acero_db",
      JSON.stringify({ productos: productosDB })
    );

    // 🪶 Guardar historial por usuario con dirección, método y estado inicial
    const keyHistorial = getHistorialKey(usuario.correo);
    const historial = JSON.parse(localStorage.getItem(keyHistorial)) || [];

    const compra = {
      id: Date.now(),
      usuario: usuario.nombre,
      correo: usuario.correo,
      fecha: new Date().toLocaleString(),
      direccion,
      metodo,
      estado: "pendiente", // Nuevo campo 🟡
      total: carrito.reduce(
        (acc, p) => acc + Number(p.precio || 0) * Number(p.cantidad || 1),
        0
      ),
      productos: carrito,
    };

    historial.push(compra);
    localStorage.setItem(keyHistorial, JSON.stringify(historial));

    // 🧹 Vaciar carrito del usuario
    const keyCarrito = getCarritoKey(usuario.correo);
    localStorage.removeItem(keyCarrito);
    setCarrito([]);

    mostrarToast("Procesando...");
    setTimeout(() => {
      navigate("/success");
    }, 1500);
  };

  return (
    <div className="container py-5">
      {toast && (
        <div
          className="toast-message position-fixed top-0 start-50 translate-middle-x mt-4"
          style={{ zIndex: 2000 }}
        >
          <div className="toast-body">{toast}</div>
        </div>
      )}

      <h1 className="text-warning text-center mb-4">💰 Confirmar Compra</h1>

      {carrito.length > 0 ? (
        <div className="mb-4">
          <h5 className="text-center text-warning mb-3">🛒 Resumen del carrito</h5>
          <ul className="list-group mb-3">
            {carrito.map((item, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between"
              >
                <span>{item.nombre}</span>
                <strong>
                  {(Number(item.precio) || 0) * (Number(item.cantidad) || 1)} 
                </strong>
              </li>
            ))}
          </ul>
          <h5 className="text-center text-muted">
            Total: ${" "}
            {carrito.reduce(
              (acc, it) =>
                acc + (Number(it.precio) || 0) * (Number(it.cantidad) || 1),
              0
            )}{" "}
          </h5>
        </div>
      ) : (
        <p className="text-muted text-center mb-4">
          Tu carrito está vacío. Vuelve a la tienda para agregar objetos.
        </p>
      )}

      <form
        onSubmit={enviarCompra}
        className="crud-form mx-auto p-4"
        style={{ maxWidth: "600px" }}
      >
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre del comprador
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Tu nombre"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="correo" className="form-label">
            Correo electrónico
          </label>
          <input
            id="correo"
            type="email"
            className="form-control"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">
            Dirección de entrega
          </label>
          <input
            id="direccion"
            type="text"
            className="form-control"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="metodo" className="form-label">
            Método de pago
          </label>
          <select
            id="metodo"
            className="form-select"
            value={metodo}
            onChange={(e) => setMetodo(e.target.value)}
          >
            <option value="oro">Monedas de oro</option>
            <option value="plata">Monedas de plata</option>
            <option value="trueque">Trueque mágico</option>
          </select>
        </div>

        <div className="d-flex flex-column gap-3">
          <button type="submit" className="btn btn-add w-100">
            Confirmar compra
          </button>
          <a href="/carrito" className="btn btn-outline-secondary w-100">
            ← Volver al carrito
          </a>
        </div>
      </form>
    </div>
  );
}
