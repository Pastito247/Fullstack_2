import { useParams, useNavigate } from "react-router-dom";
import { repo } from "../../../data/repo";
import { useState, useEffect } from "react";
import React from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [added, setAdded] = useState(false);
  const [usuario, setUsuario] = useState(null);

  // Helpers para claves por usuario
  const getCarritoKey = (correo) =>
    correo ? `forja_acero_carrito_${correo}` : "forja_acero_carrito";

  // Cargar producto y usuario
  useEffect(() => {
    const p = repo.getProducto(id);
    setProducto(p);
    const user = JSON.parse(localStorage.getItem("forja_acero_usuario"));
    setUsuario(user);
  }, [id]);

  const agregarAlCarrito = () => {
    if (!usuario) {
      alert("⚠️ Debes iniciar sesión para agregar productos.");
      return;
    }

    const key = getCarritoKey(usuario.correo);
    const carrito = JSON.parse(localStorage.getItem(key)) || [];

    // Buscar producto existente
    const existente = carrito.find((p) => p.id === producto.id);

    // Verificar stock disponible
    if (existente) {
      if (existente.cantidad >= producto.stock) {
        alert("⚠️ No hay más stock disponible de este producto.");
        return;
      }
      existente.cantidad += 1;
    } else {
      if (producto.stock <= 0) {
        alert("⚠️ Producto sin stock disponible.");
        return;
      }
      carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem(key, JSON.stringify(carrito));
    setAdded(true);
  };

  if (!producto) {
    return (
      <p className="text-center mt-5 text-warning">Producto no encontrado ⚠️</p>
    );
  }

  const esAdmin = usuario?.rol === "admin";
  const sinStock = producto.stock <= 0;

  return (
    <div className="product-detail container-fluid py-5">
      <div className="row g-5 align-items-center justify-content-center">
        {/* Imagen */}
        <div className="col-md-5 text-center">
          <div className="product-image border border-warning rounded p-2">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="img-fluid rounded"
            />
          </div>
        </div>

        {/* Información */}
        <div className="col-md-6">
          <h1 className="product-title mb-3">{producto.nombre}</h1>
          <p className="product-description">{producto.descripcion}</p>
          <h4 className="product-price text-warning">${producto.precio}</h4>
          <p className="product-stock">
            <strong>Stock:</strong>{" "}
            <span
              className={
                sinStock
                  ? "text-danger"
                  : producto.stock < 5
                  ? "text-warning"
                  : "text-success"
              }
            >
              {producto.stock}
            </span>
          </p>

          <div className="d-flex gap-3 mt-4">
            {/* Mostrar botón solo si NO es admin y hay stock */}
            {!esAdmin && !sinStock && !added && (
              <button className="btn btn-add" onClick={agregarAlCarrito}>
                Agregar al carrito
              </button>
            )}

            {/* Si se agregó */}
            {!esAdmin && added && (
              <button className="btn btn-success" disabled>
                ✅ Agregado
              </button>
            )}

            {/* Si no hay stock */}
            {!esAdmin && sinStock && (
              <button className="btn btn-secondary" disabled>
                Sin stock
              </button>
            )}

            {/* Botón de volver */}
            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate(-1)}
            >
              Volver atrás
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
