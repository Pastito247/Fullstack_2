import { useEffect } from 'react'
import React from "react";

export default function ToastMessage({ mensaje, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 2500)
    return () => clearTimeout(timer)
  }, [onClose])

  if (!mensaje) return null

  return (
    <div className="toast-message position-fixed bottom-0 end-0 m-4">
      <div className="toast-body">
        {mensaje}
      </div>
    </div>
  )
}
