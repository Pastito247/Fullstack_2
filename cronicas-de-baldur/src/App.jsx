import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import Characters from "./pages/Characters.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Campaigns from "./pages/Campaigns.jsx";
import CharacterSheet from "./pages/CharacterSheet.jsx";

export default function App() {
  return (
    <Router>
      <Navbar />
      <main className="container my-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/characters/:id" element={<CharacterSheet />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
