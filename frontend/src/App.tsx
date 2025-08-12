import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequireAdmin from "./components/RequireAdmin";
import RequireSuperAdmin from './components/RequireSuperAdmin.tsx';
import RequireUser from "./components/RequireUser";
import Unauthorized from "./pages/Unauthorized.tsx";
import UnauthorizedAD from "./pages/Unauthorized-admin.tsx";
import Home from "./pages/home";
import Vote from "./pages/vote";
import "./assets/fonts/font.css";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import SimpleDashboard from "./pages/SimpleDashboard";
import { ThemeProvider } from './context/ThemeContext';
import Enregistrement from "./pages/Enregistrement_users";
import Connexion from "./pages/Connexion_users.tsx";
import ConnexionAD from "./pages/connexion_admin.js";
import EnregistrementAD from "./pages/Enregistrement_admin.js";
import Progression from "./pages/progression.tsx";
import Choixrole from "./pages/choixrole.tsx";
import ConnexionSAD from "./pages/connexion_superadmin.tsx"
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
        <Route path="/Dashboard" element={<PrivateRoute><RequireSuperAdmin><ThemeProvider><Dashboard /></ThemeProvider></RequireSuperAdmin></PrivateRoute>} />
        <Route path="/SimpleDashboard" element={<PrivateRoute><RequireAdmin><ThemeProvider><SimpleDashboard /></ThemeProvider></RequireAdmin></PrivateRoute>} />
        <Route path="/vote" element={<PrivateRoute><RequireUser><Vote /></RequireUser></PrivateRoute>} />
        <Route path="/choixrole" element={<Choixrole />} />
        <Route path="/Connexion" element={<Connexion />} />
        <Route path="/ConnexionAD" element={<ConnexionAD />} />
        <Route path="/EnregistrementAD" element={<EnregistrementAD />} />
        <Route path="/results" element={<PrivateRoute><Progression /></PrivateRoute>} />
        <Route path="/Enregistrement" element={<Enregistrement />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/unauthorizedAD" element={<UnauthorizedAD />} />
        <Route path="/ConnexionSAD" element={<ConnexionSAD />} />
      </Routes>

      {/* ✅ Ajoute ici le composant Analytics */}
      <Analytics />
      <SpeedInsights />
    </Router>
    </AuthProvider>
  );
};

export default App;
