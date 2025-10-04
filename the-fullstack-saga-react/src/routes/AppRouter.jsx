import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import CharacterCreation from '../pages/CharacterCreation';
import Lobby from '../pages/Lobby';
import Profile from '../pages/Profile';
import StoreMain from '../pages/StoreMain';
import StoreDetail from '../pages/StoreDetail';

import NavLayout from '../layouts/NavLayout';
import BareLayout from '../layouts/BareLayout';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BareLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/character-creation" element={<CharacterCreation />} />
        </Route>

        <Route element={<NavLayout />}>
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/store-main" element={<StoreMain />} />
          <Route path="/store-detail" element={<StoreDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}