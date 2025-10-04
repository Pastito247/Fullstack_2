import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="container py-5 home-hero">
      <div className="text-center my-5">
        <img src="https://i.postimg.cc/vTdZCjXq/logo-title.png" alt="The Fullstack Saga" className="mb-4"/>
        <h1 className="display-5 mb-3">Retoma las riendas de tu historia</h1>
        <p className="lead">Embarcate en la aventura</p>
        <div className="d-flex gap-3 justify-content-center mt-4">
          <Link className="btn btn-primary" to="/login">
            Login
          </Link>
          <Link className="btn btn-outline-light" to="/register">
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
