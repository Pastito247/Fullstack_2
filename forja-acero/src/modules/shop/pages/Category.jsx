import { useParams } from 'react-router-dom'
import { repo } from '../../../data/repo'
import ProductCard from '../components/ProductCard'
import React from "react";

export default function Category() {
  const { id } = useParams()
  const productos = repo.listProductos().filter(p => p.categoria === id)

  return (
    <div>
      <h1 className="mb-4 text-capitalize text-center">{id}</h1>

      {productos.length === 0 ? (
        <p className="text-center">No hay productos disponibles en esta categoría.</p>
      ) : (
        <div className="row g-4">
          {productos.map(p => (
            <ProductCard key={p.id} producto={p} />
          ))}
        </div>
      )}
    </div>
  )
}