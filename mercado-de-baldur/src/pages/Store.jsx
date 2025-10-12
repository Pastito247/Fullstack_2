import { tiendasBase } from "../data/data";
import StoreCard from "../components/StoreCard";
import React from "react";

export default function Store() {
  return (
    <div className="container">
      <h2 className="text-gold medieval-title mb-4 text-center">
        Tiendas del Reino
      </h2>
      <div className="row">
        {tiendasBase.map((tienda) => (
          <StoreCard key={tienda.id} tienda={tienda} />
        ))}
      </div>
    </div>
  );
}
