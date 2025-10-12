import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-parchment min-vh-100 d-flex flex-column">
      <Header />
      <main className="flex-grow-1 container py-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
