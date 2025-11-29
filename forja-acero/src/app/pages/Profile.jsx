import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import apiClient from "../../api/apiClient";

export default function Profile() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const [character, setCharacter] = useState(null);
  const [charLoading, setCharLoading] = useState(true);
  const [charError, setCharError] = useState(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    const loadCharacter = async () => {
      if (!user || user.role !== "PLAYER") {
        setCharLoading(false);
        return;
      }
      try {
        const res = await apiClient.get("/api/characters/me");
        setCharacter(res.data);
      } catch (err) {
        console.error(err);
        setCharError("No se pudo cargar tu personaje");
      } finally {
        setCharLoading(false);
      }
    };

    loadCharacter();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return <div className="container py-5">Cargando...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Perfil de usuario</h1>

      {/* Datos del usuario */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Datos de la cuenta</h5>
          <p className="mb-1">
            <strong>Usuario:</strong> {user.username}
          </p>
          <p className="mb-1">
            <strong>Correo:</strong> {user.email}
          </p>
          <p className="mb-1">
            <strong>Rol:</strong> {user.role}
          </p>

          <button
            className="btn btn-outline-danger mt-3"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Personaje del jugador */}
      {user.role === "PLAYER" && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Tu personaje</h5>

            {charLoading && <p>Cargando personaje...</p>}
            {charError && <p className="text-danger">{charError}</p>}

            {!charLoading && !charError && !character && (
              <p className="text-muted">
                Aún no tienes un personaje asignado en ninguna campaña.
              </p>
            )}

            {character && (
              <>
                <div className="d-flex gap-3 align-items-center mb-3">
                  <div
                    className="bg-dark rounded"
                    style={{ width: 96, height: 96, overflow: "hidden" }}
                  >
                    {character.imageUrl ? (
                      <img
                        src={character.imageUrl}
                        alt={character.name}
                        className="img-fluid h-100 w-100 object-fit-cover"
                      />
                    ) : (
                      <div className="h-100 w-100 d-flex align-items-center justify-content-center text-muted">
                        Sin imagen
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="mb-1">{character.name}</h4>
                    <p className="mb-1">
                      {character.dndClass} · {character.race}
                    </p>
                    <p className="mb-1">Nivel {character.level}</p>
                    <p className="mb-0 text-muted">
                      Campaña: {character.campaignName}
                    </p>
                  </div>
                </div>

                <div className="mb-3">
                  <h6>Dinero</h6>
                  <p className="mb-1">
                    PP: {character.pp} · GP: {character.gp} · EP:{" "}
                    {character.ep} · SP: {character.sp} · CP: {character.cp}
                  </p>
                </div>

                <div>
                  <h6>Inventario</h6>
                  {!character.inventory ||
                  character.inventory.length === 0 ? (
                    <p className="text-muted">
                      No tienes objetos en tu inventario todavía.
                    </p>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-dark table-striped align-middle">
                        <thead>
                          <tr>
                            <th>Objeto</th>
                            <th>Categoría</th>
                            <th>Cantidad</th>
                            <th>Daño</th>
                            <th>Precio base (gp)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {character.inventory.map((it) => (
                            <tr key={it.itemId}>
                              <td>{it.name}</td>
                              <td>{it.category || "-"}</td>
                              <td>{it.quantity}</td>
                              <td>
                                {it.damageDice
                                  ? `${it.damageDice} ${
                                      it.damageType ? `(${it.damageType})` : ""
                                    }`
                                  : "-"}
                              </td>
                              <td>{it.basePriceGold}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
