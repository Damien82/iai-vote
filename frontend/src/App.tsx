import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Vote from "./pages/vote";
import "./assets/fonts/font.css";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Enregistrement from "./pages/Enregistrement_users";
import Connexion from "./pages/Connexion_users.tsx";
import ConnexionAD from "./pages/connexion_admin.js";
import EnregistrementAD from "./pages/Enregistrement_admin.js";
import Progression from "./pages/progression.tsx";
import Choixrole from "./pages/choixrole.tsx";
import { Analytics } from "@vercel/analytics/react"; // ✅
import { SpeedInsights } from "@vercel/speed-insights/react"
import '../src/index.css';
import './header.js';
import './headerscroll.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/vote" element={<PrivateRoute><Vote /></PrivateRoute>} />
        <Route path="/choixrole" element={<Choixrole />} />
        <Route path="/Connexion" element={<Connexion />} />
        <Route path="/ConnexionAD" element={<ConnexionAD />} />
        <Route path="/EnregistrementAD" element={<EnregistrementAD />} />
        <Route path="/results" element={<PrivateRoute><Progression /></PrivateRoute>} />
        <Route path="/Enregistrement" element={<Enregistrement />} />
      </Routes>

      {/* ✅ Ajoute ici le composant Analytics */}
      <Analytics />
      <SpeedInsights />
    </Router>
    </AuthProvider>
  );
};

export default App;
