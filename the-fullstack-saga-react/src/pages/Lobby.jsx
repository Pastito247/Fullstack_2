export default function Lobby() {
  return (
    <main className="container py-5 lobby-page">
      <h2 className="mb-4">Lobby</h2>
      <div className="row g-3">
        <div className="col-md-4">
          <div className="card h-100 p-3">Perfil / Stats</div>
        </div>
        <div className="col-md-8">
          <div className="card h-100 p-3">Noticias / Acciones / Navegación</div>
        </div>
      </div>
    </main>
  );
}
