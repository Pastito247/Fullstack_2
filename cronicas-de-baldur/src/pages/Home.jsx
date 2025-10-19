import React from 'react';
import Hero from '../components/Hero';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="text-center mt-5">
        <h2>Bienvenido a las Crónicas de Baldur</h2>
        <p>Explora mundos, crea personajes y comparte tus aventuras.</p>
      </div>
    </>
  );
}
