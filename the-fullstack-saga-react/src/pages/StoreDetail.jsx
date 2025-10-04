// src/pages/StoreDetail.jsx
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import "../styles/original/global.css";
import "../styles/original/store.css";

const SHOP_THEMES = {
  blacksmith: {
    bgClass: "blacksmith-bg",
    vendor: "https://i.postimg.cc/Zn3ydpsg/blacksmith-vendor.png",
    title: "Herrero"
  },
  equipment: {
    bgClass: "equipment-bg",
    vendor: "https://i.postimg.cc/xd4kptWh/equipment-vendor.png",
    title: "Equipo"
  },
  magic: {
    bgClass: "magic-bg",
    vendor: "https://i.postimg.cc/05pQ7k2L/magic-vendor.png",
    title: "Magia"
  },
  alchemy: {
    bgClass: "alchemy-bg",
    vendor: "https://i.postimg.cc/QNRQdxYw/alchemy-vendor.png",
    title: "Alquimia"
  },
  market: {
    bgClass: "market-bg",
    vendor: "https://i.postimg.cc/9fRX0Vng/market-vendor.png",
    title: "Mercado"
  }
};

export default function StoreDetail() {
  const { id } = useParams(); // blacksmith, equipment, etc.

  const theme = useMemo(() => {
    return SHOP_THEMES[id] || SHOP_THEMES.blacksmith;
  }, [id]);

  return (
    <>
      <div className={`game-screen ${theme.bgClass}`}>
        <div className="store-container">
          <h2 className="text-center mb-3">Tienda: {theme.title}</h2>

          <div className="store-content">
            {/* Vendedor + estantería */}
            <div className="vendor-container">
              <img
                id="vendor-avatar"
                src={theme.vendor}
                alt="Vendedor"
                className="vendor-image"
              />
              <div id="item-list" className="item-shelf">{/* items render */}</div>
            </div>

            {/* Panel de info: diálogo, carrito, detalles */}
            <div className="store-info-panel">
              <div className="info-panel-bg">
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="info-box dialogue-box">
                      <p id="vendor-dialogue">¡Bienvenido, aventurero! ¿Qué necesitas hoy?</p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="info-box cart-box">
                      <h4>Tu Carrito</h4>
                      <ul id="cart-list" className="cart-list"></ul>
                      <div className="cart-total-info">
                        <p>Total:</p>
                        <div className="gold-display">
                          <img src="https://i.postimg.cc/sfSBKPKH/golden-coin.gif" alt="Oro" className="gold-icon" />
                          <span id="cart-total-gold">0</span>
                        </div>
                      </div>
                      <button className="pixel-button btn-buy mt-3" id="buy-button">Comprar</button>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="info-box item-info-box">
                      <h4>Detalles del Objeto</h4>
                      <p id="item-info-display">Pasa el mouse sobre un objeto para ver sus detalles.</p>
                    </div>
                  </div>
                </div>{/* row */}
              </div>{/* info-panel-bg */}
            </div>{/* store-info-panel */}
          </div>{/* store-content */}
        </div>{/* store-container */}
      </div>

    </>
  );
}
