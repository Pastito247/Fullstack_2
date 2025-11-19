import { Link } from "react-router-dom";
import React from "react";

export default function Success() {
  return (
    <div className="container text-center py-5">
      <h1 className="text-success mb-3">✅ ¡Compra exitosa!</h1>
      <p className="text-muted">
        Tus objetos han sido enviados desde la forja. ¡Que tu acero nunca se oxide!
      </p>
      <Link to="/" className="btn btn-add mt-4">
        Volver a la tienda
      </Link>
    </div>
  );
}
