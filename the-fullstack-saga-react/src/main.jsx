import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/global.css';
// Importados
import "./styles/original/global.css";
import "./styles/original/forms.css";
import "./styles/original/lobby.css";
import "./styles/original/creation.css";
import "./styles/original/store.css";
import "./styles/original/profile.css";

import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
