import { Link } from "react-router-dom";

const mock = [
  { id: 1, name: "Espada corta", price: 50 },
  { id: 2, name: "Armadura de cuero", price: 80 },
];

export default function StoreMain() {
  return (
    <main className="container py-5 store-page">
      <h2 className="mb-4">Tiendas del Reino</h2>
      <div className="row g-3">
        {mock.map((i) => (
          <div key={i.id} className="col-12 col-sm-6 col-md-4">
            <div className="card h-100 p-3 d-flex">
              <h5 className="mb-2">{i.name}</h5>
              <div className="mt-auto d-flex justify-content-between align-items-center">
                <span>${i.price}</span>
                <Link className="btn btn-sm btn-primary" to="/store-detail">
                  Ver
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
