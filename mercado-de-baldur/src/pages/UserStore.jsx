import { useState, useEffect } from "react";
import {
  tiendasUsuarios,
  guardarTiendasUsuarios,
} from "../data/userStores";
import React from "react";

export default function UserStore() {
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuarioActivo"))
  );
  const [tienda, setTienda] = useState(null);
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
  });

  useEffect(() => {
    const existentes =
      tiendasUsuarios.find((t) => t.duenio === usuario?.nombre) || null;
    if (existentes) {
      setTienda(existentes);
      setProductos(existentes.productos);
    }
  }, [usuario]);

  const crearTienda = () => {
    const nombre = prompt("Nombre de tu tienda:");
    const descripcion = prompt("Descripción de tu tienda:");
    if (!nombre) return;

    const nueva = {
      id: Date.now(),
      duenio: usuario.nombre,
      nombre,
      descripcion,
      productos: [],
    };

    const listaActualizada = [...tiendasUsuarios, nueva];
    guardarTiendasUsuarios(listaActualizada);
    setTienda(nueva);
    alert("Tienda creada con éxito 🏪");
  };

  const agregarProducto = (e) => {
    e.preventDefault();

    const nuevo = {
      id: Date.now(),
      ...nuevoProducto,
      precio: parseInt(nuevoProducto.precio),
    };

    const actualizados = [...productos, nuevo];
    setProductos(actualizados);

    const lista = JSON.parse(localStorage.getItem("tiendasUsuarios")) || [];
    const actualizada = lista.map((t) =>
      t.duenio === usuario.nombre ? { ...t, productos: actualizados } : t
    );

    guardarTiendasUsuarios(actualizada);
    setNuevoProducto({ nombre: "", descripcion: "", precio: "", imagen: "" });
  };

  const eliminarProducto = (id) => {
    const filtrados = productos.filter((p) => p.id !== id);
    setProductos(filtrados);

    const lista = JSON.parse(localStorage.getItem("tiendasUsuarios")) || [];
    const actualizada = lista.map((t) =>
      t.duenio === usuario.nombre ? { ...t, productos: filtrados } : t
    );

    guardarTiendasUsuarios(actualizada);
  };

  if (!usuario)
    return <h3 className="text-center mt-4">Debes iniciar sesión primero.</h3>;

  return (
    <div className="container">
      <h2 className="text-gold medieval-title text-center mb-4">
        🏪 Mi Tienda Personal
      </h2>

      {!tienda ? (
        <div className="text-center">
          <p>No tienes una tienda aún.</p>
          <button className="btn btn-warning" onClick={crearTienda}>
            Crear mi tienda
          </button>
        </div>
      ) : (
        <>
          <div className="text-center parchment-box mb-4">
            <h4 className="text-dark">{tienda.nombre}</h4>
            <p>{tienda.descripcion}</p>
          </div>

          <form onSubmit={agregarProducto} className="parchment-box mb-4">
            <h5 className="text-dark mb-3">Agregar nuevo producto</h5>
            <input
              type="text"
              placeholder="Nombre del producto"
              className="form-control mb-2"
              value={nuevoProducto.nombre}
              onChange={(e) =>
                setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Descripción"
              className="form-control mb-2"
              value={nuevoProducto.descripcion}
              onChange={(e) =>
                setNuevoProducto({
                  ...nuevoProducto,
                  descripcion: e.target.value,
                })
              }
              required
            />
            <input
              type="number"
              placeholder="Precio"
              className="form-control mb-2"
              value={nuevoProducto.precio}
              onChange={(e) =>
                setNuevoProducto({ ...nuevoProducto, precio: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="URL de imagen"
              className="form-control mb-3"
              value={nuevoProducto.imagen}
              onChange={(e) =>
                setNuevoProducto({ ...nuevoProducto, imagen: e.target.value })
              }
            />
            <button className="btn btn-warning w-100">Agregar producto</button>
          </form>

          <div className="row">
            {productos.length === 0 ? (
              <p className="text-center">No hay productos aún.</p>
            ) : (
              productos.map((p) => (
                <div key={p.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card border-warning h-100 shadow-sm bg-light">
                    {p.imagen && (
                      <img
                        src={p.imagen}
                        className="card-img-top"
                        alt={p.nombre}
                        style={{ height: "180px", objectFit: "cover" }}
                      />
                    )}
                    <div className="card-body">
                      <h5 className="text-warning fw-bold">{p.nombre}</h5>
                      <p>{p.descripcion}</p>
                      <p className="fw-bold">💰 {p.precio} monedas</p>
                      <button
                        className="btn btn-outline-danger w-100"
                        onClick={() => eliminarProducto(p.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
