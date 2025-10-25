import { productosIniciales } from './db.js'

const KEY = 'forja_acero_db'

// Función para cargar datos desde localStorage o inicializarlos si no existen
function load() {
  const data = localStorage.getItem(KEY)
  if (data) {
    return JSON.parse(data)
  } else {
    const initialData = { productos: productosIniciales }
    localStorage.setItem(KEY, JSON.stringify(initialData))
    return initialData
  }
}

// Guardar cambios
function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data))
}

// CRUD completo
export const repo = {
  // ✅ Permitir obtener toda la base
  getDB() {
    return load()
  },

  // Listar todos los productos
  listProductos() {
    const { productos } = load()
    return productos
  },

  // Buscar producto por ID
  getProducto(id) {
    const { productos } = load()
    return productos.find(p => p.id === id)
  },

  // Agregar nuevo producto
  addProducto(producto) {
    const db = load()
    db.productos.push(producto)
    save(db)
  },

  // Editar producto existente
  updateProducto(id, cambios) {
    const db = load()
    db.productos = db.productos.map(p => p.id === id ? { ...p, ...cambios } : p)
    save(db)
  },

  // Eliminar producto
  deleteProducto(id) {
    const db = load()
    db.productos = db.productos.filter(p => p.id !== id)
    save(db)
  }
}
