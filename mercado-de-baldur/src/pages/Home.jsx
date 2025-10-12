import Hero from "../components/Hero";
export default function Home() {
  return (
    <>
      <Hero/>
    <div className="text-center">
      <h1 className="text-gold medieval-title mb-4">¡Bienvenido al Mercado de Baldur!</h1>
      <p className="lead text-dark parchment-box">
        Aquí los héroes forjan su destino... y venden sus tesoros.
      </p>
      <img
        src="https://i.ibb.co/1rx2zC9/dnd-market.jpg"
        alt="Mercado medieval"
        className="img-fluid rounded shadow-lg mt-3"
      />
    </div>
    </>
  );
}
