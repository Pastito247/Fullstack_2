export default function Login() {
  return (
    <main className="container py-5 login-page">
      <h2 className="mb-4 text-center">Acceso al Gremio</h2>
      <form className="mx-auto" style={{ maxWidth: 420 }}>
        <div className="mb-3">
          <label className="form-label">Usuario:</label>
          <input type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña:</label>
          <input type="password" className="form-control" />
        </div>
        <button className="btn btn-primary w-100">Entrar</button>
      </form>
    </main>
  );
}
