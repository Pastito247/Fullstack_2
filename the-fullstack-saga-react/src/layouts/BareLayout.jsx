import Footer from '../shared/Footer';
import { Outlet } from 'react-router-dom';

export default function BareLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}