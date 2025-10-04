import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CharacterCreation from "../pages/CharacterCreation";
import Lobby from "../pages/Lobby";
import Profile from "../pages/Profile";
import StoreMain from "../pages/StoreMain";
import StoreDetail from "../pages/StoreDetail";
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/character-creation" element={<CharacterCreation />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/store-main" element={<StoreMain />} />
        <Route path="/store-detail" element={<StoreDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
