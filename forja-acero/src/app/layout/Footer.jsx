import ThemeToggle from "../components/ThemeToggle";

export default function Footer() {
  return (
    <footer className="text-center py-4 mt-auto">
      <div className="container">
        <p className="mb-2">
          <strong>Forja & Acero</strong> — proyecto academico Martin Cespedes
        </p>
        <div className="d-flex justify-content-center align-items-center gap-3">
          <small className="text-muted">
            © {new Date().getFullYear()} Todos los derechos reservados
          </small>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
