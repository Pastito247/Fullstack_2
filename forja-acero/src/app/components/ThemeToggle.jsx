import { useEffect, useState } from "react"
import React from "react";

export default function ThemeToggle() {
  const [modoLuz, setModoLuz] = useState(false)

  // Cargar preferencia al montar
  useEffect(() => {
    const guardado = localStorage.getItem("forja_acero_tema") === "luz"
    setModoLuz(guardado)
    document.body.classList.toggle("modo-luz", guardado)
  }, [])

  // Cambiar tema
  const toggleTema = () => {
    const nuevoModo = !modoLuz
    setModoLuz(nuevoModo)
    document.body.classList.toggle("modo-luz", nuevoModo)
    localStorage.setItem("forja_acero_tema", nuevoModo ? "luz" : "oscuro")
  }

  return (
    <button
      className="btn btn-toggle-tema"
      onClick={toggleTema}
      title={modoLuz ? "Activar modo oscuro" : "Activar luz de forja"}
    >
      {modoLuz ? "🌞 Luz de Forja" : "🌑 Modo Forja"}
    </button>
  )
}
