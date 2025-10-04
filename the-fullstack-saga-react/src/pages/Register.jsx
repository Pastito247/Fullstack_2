export default function Register() {
  return (
    <main className="container py-5 register-page">
      <h2 className="mb-4 text-center">Registro del Gremio</h2>
      <form className="mx-auto" style={{ maxWidth: 540 }}>
        <div className="row g-3">
          <div className="col-12">
            <label className="form-label">Usuario:</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-12">
            <label className="form-label">Correo:</label>
            <input type="email" className="form-control" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Contraseña:</label>
            <input type="password" className="form-control" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Repetir contraseña:</label>
            <input type="password" className="form-control" />
          </div>
          <div className="col-12">
            <label className="form-label">Fecha de Cumpleaños:</label>
            <input type="date" className="form-control" />
          </div>
        </div>
        <button className="btn btn-primary w-100 mt-4">Firmar</button>
      </form>
    </main>
  );
}
