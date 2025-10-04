// src/pages/StoreMain.jsx
import { Link } from "react-router-dom";
import "../styles/original/global.css";
import "../styles/original/store.css";

export default function StoreMain() {
  return (
    <>
      <div className="game-screen store-main-bg">
        <div className="store-main-container">
          <h2 className="text-center">Elige una tienda</h2>

          <div className="store-menu row justify-content-center text-center mt-5" id="store-list">
            <div className="col-6 col-md-4 mb-4">
              <Link to="/store/blacksmith" className="shop-link">
                <img src="https://i.postimg.cc/C5jz1Yzp/blacksmith-icon.png" alt="Herrero" className="shop-icon img-fluid" />
                <p className="shop-name">Herrero</p>
              </Link>
            </div>

            <div className="col-6 col-md-4 mb-4">
              <Link to="/store/equipment" className="shop-link">
                <img src="https://i.postimg.cc/j5nDpyT5/equipment-icon.png" alt="Equipo" className="shop-icon img-fluid" />
                <p className="shop-name">Equipo</p>
              </Link>
            </div>

            <div className="col-6 col-md-4 mb-4">
              <Link to="/store/magic" className="shop-link">
                <img src="https://i.postimg.cc/jdtjXpDC/magic-icon.png" alt="Magia" className="shop-icon img-fluid" />
                <p className="shop-name">Magia</p>
              </Link>
            </div>

            <div className="col-6 col-md-4 mb-4">
              <Link to="/store/alchemy" className="shop-link">
                <img src="https://i.postimg.cc/cHv3dVRd/alchemy-icon.png" alt="Alquimia" className="shop-icon img-fluid" />
                <p className="shop-name">Alquimia</p>
              </Link>
            </div>

            <div className="col-6 col-md-4 mb-4">
              <Link to="/store/market" className="shop-link">
                <img src="https://i.postimg.cc/xTf0HLZz/market-icon.png" alt="Mercado" className="shop-icon img-fluid" />
                <p className="shop-name">Mercado</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
