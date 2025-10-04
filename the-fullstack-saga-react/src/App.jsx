import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ⬇️ usa shared
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

// Páginas
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CharacterCreation from "./pages/CharacterCreation";
import Lobby from "./pages/Lobby";
import Profile from "./pages/Profile";
import StoreMain from "./pages/StoreMain";
import StoreDetail from "./pages/StoreDetail";

function LayoutNoNav({ children }) {
  return (
    <div id="app-layout">
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function LayoutWithNav({ children }) {
  return (
    <div id="app-layout">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* SIN NAV */}
        <Route path="/" element={<LayoutNoNav><Home /></LayoutNoNav>} />
        <Route path="/login" element={<LayoutNoNav><Login /></LayoutNoNav>} />
        <Route path="/register" element={<LayoutNoNav><Register /></LayoutNoNav>} />
        <Route path="/character-creation" element={<LayoutNoNav><CharacterCreation /></LayoutNoNav>} />

        {/* CON NAV */}
        <Route path="/lobby" element={<LayoutWithNav><Lobby /></LayoutWithNav>} />
        <Route path="/profile" element={<LayoutWithNav><Profile /></LayoutWithNav>} />
        <Route path="/store-main" element={<LayoutWithNav><StoreMain /></LayoutWithNav>} />
        <Route path="/store/:id" element={<LayoutWithNav><StoreDetail /></LayoutWithNav>} />
      </Routes>
    </Router>
  );
}
