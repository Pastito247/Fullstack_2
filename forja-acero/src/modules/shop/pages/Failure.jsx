import { Link } from "react-router-dom";
import React from "react";

export default function Failure() {
  return (
    <div className="container text-center py-5">
      <h1 className="text-danger mb-3">❌ Pago fallido</h1>
      <p className="text-muted">
        Algo salió mal en la forja. Revisa tu método de pago o intenta de nuevo.
      </p>
      <div className="d-flex justify-content-center gap-3 mt-4">
        <Link to="/checkout" className="btn btn-outline-light border-warning">
          Intentar nuevamente
        </Link>
        <Link to="/" className="btn btn-add">
          Volver a la tienda
        </Link>
      </div>
    </div>
  );
}
