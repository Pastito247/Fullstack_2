import { useState } from "react";
import { repo } from "../../../data/repo";
import ToastMessage from "../components/ToastMessage";
import React from "react";

export default function Dashboard() {
  const [productos, setProductos] = useState(repo.listProductos());
  const [editando, setEditando] = useState(null);
  const [toast, setToast] = useState("");

  // Guardar (crear o actualizar)
  const guardarProducto = (producto) => {
    if (!producto.nombre || !producto.precio || !producto.stock) {
      setToast("⚠️ Todos los campos son obligatorios");
      return;
    }

    if (editando) {
      repo.updateProducto(producto.id, producto);
      setToast("✅ Producto actualizado correctamente");
    } else {
      repo.addProducto({
        ...producto,
        id: Date.now().toString(),
      });
      setToast("🛠️ Producto agregado exitosamente");
    }

    setProductos(repo.listProductos());
    setEditando(null);
  };

  // Editar producto existente
  const editarProducto = (id) => {
    const p = repo.getProducto(id);
    setEditando(p);
  };

  // Eliminar producto
  const eliminarProducto = (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este producto?")) {
      repo.deleteProducto(id);
      setProductos(repo.listProductos());
      setToast("🗑️ Producto eliminado");
    }
  };

  // Reset formulario
  const cancelarEdicion = () => setEditando(null);

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center text-warning">⚒️ Panel de Administración</h1>

      {/* Formulario de gestión */}
      <div className="card bg-dark text-light p-4 mb-4 border border-warning">
        <h4>{editando ? "Editar producto" : "Agregar nuevo producto"}</h4>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;
            const producto = {
              id: editando?.id || "",
              nombre: form.nombre.value.trim(),
              descripcion: form.descripcion.value.trim(),
              precio: Number(form.precio.value),
              stock: Number(form.stock.value),
              imagen: form.imagen.value.trim(),
            };
            guardarProducto(producto);
            form.reset();
          }}
        >
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                name="nombre"
                className="form-control"
                defaultValue={editando?.nombre || ""}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Precio</label>
              <input
                type="number"
                name="precio"
                className="form-control"
                defaultValue={editando?.precio || ""}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Stock</label>
              <input
                type="number"
                name="stock"
                className="form-control"
                defaultValue={editando?.stock || ""}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">URL de Imagen</label>
              <input
                type="text"
                name="imagen"
                className="form-control"
                defaultValue={editando?.imagen || ""}
              />
            </div>

            <div className="col-12">
              <label className="form-label">Descripción</label>
              <textarea
                name="descripcion"
                className="form-control"
                rows="2"
                defaultValue={editando?.descripcion || ""}
              ></textarea>
            </div>

            <div className="col-12 d-flex justify-content-end gap-2 mt-3">
              <button type="submit" className="btn btn-add">
                {editando ? "Guardar cambios" : "Agregar producto"}
              </button>
              {editando && (
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={cancelarEdicion}
                >
                  Cancelar
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Tabla de productos */}
      <div className="table-responsive">
        <table className="table table-dark table-striped align-middle text-center border border-warning">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>
                  <img
                    src={p.imagen}
                    alt={p.nombre}
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "6px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{p.nombre}</td>
                <td>${p.precio}</td>
                <td>
                  <span
                    className={
                      p.stock > 5
                        ? "text-success"
                        : p.stock > 0
                        ? "text-warning"
                        : "text-danger"
                    }
                  >
                    {p.stock}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-warning me-2"
                    onClick={() => editarProducto(p.id)}
                  >
                    ✏️ Editar
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => eliminarProducto(p.id)}
                  >
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastMessage mensaje={toast} onClose={() => setToast("")} />
    </div>
  );
}
