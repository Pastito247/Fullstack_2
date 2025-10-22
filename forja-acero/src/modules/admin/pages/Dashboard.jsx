import { useState } from "react";
import { repo } from "../../../data/repo";
import ToastMessage from "../components/ToastMessage";
import CrudTable from "../components/CrudTable";
import CrudForm from "../components/CrudForm";
import React from "react";

export default function Dashboard() {
  const [productos, setProductos] = useState(repo.listProductos());
  const [editando, setEditando] = useState(null);
  const [toast, setToast] = useState("");
  
  // Crear o actualizar producto
  const guardarProducto = (producto) => {
    if (editando) {
      repo.updateProducto(producto.id, producto);
      setToast("✅ Producto actualizado correctamente");
    } else {
      repo.addProducto({ ...producto, id: Date.now().toString() });
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
    repo.deleteProducto(id);
    setProductos(repo.listProductos());
    setToast('🗑️ Producto eliminado')
  };

  return (
    <div>
      <h1 className="mb-4 text-center">Panel de Administración</h1>
      <div className="row g-4">
        <div className="col-md-6">
          <CrudForm onGuardar={guardarProducto} editando={editando} />
        </div>
        <div className="col-md-6">
          <CrudTable
            productos={productos}
            onEdit={editarProducto}
            onDelete={eliminarProducto}
          />
        </div>
      </div>
      <ToastMessage mensaje={toast} onClose={() => setToast("")} />
    </div>
  );
}
