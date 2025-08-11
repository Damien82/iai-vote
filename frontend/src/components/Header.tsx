import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Button from "./ui/buttons/logout"; // J'utilise ton bouton standard ici
import { useAuth } from "../context/AuthContext"; // Import du contexte Auth
import logo from "../images/logo_iai.jpg"

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth(); // récupération de la fonction logout

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false); // Ferme le menu mobile après clic
  };

  const isActive = (path: string) => location.pathname === path;

  // Nouvelle fonction pour gérer la déconnexion
  const handleLogout = () => {
    logout();                  // Supprime token et met à jour contexte
    localStorage.removeItem("user"); // Supprime les infos utilisateur
    navigate("/Connexion");    // Redirige vers page connexion
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => handleNavigation("/")}
        >
          <img src={logo} alt="logo" className='w-[40px] rounded hover:scale-110 transition-transform'/>
          <span className="text-xl font-semibold text-gray-800">VoteIAI</span>
        </div>

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center space-x-8 lg:flex xl:flex 2xl:flex">
          {["/", "/vote", "/results"].map((path) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `cursor-pointer transition-all duration-300 hover:text-gray-900 transform hover:scale-105 rounded-lg whitespace-nowrap transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 group p-2 py-2 ${
                  isActive
                    ? "text-[#4A90E2] font-semibold"
                    : "text-gray-600"
                }`
              }
            >
              {path === "/" ? "Accueil" : path === "/vote" ? "Voter" : "Résultats"}
            </NavLink>
          ))}
          <Button
            onClick={handleLogout}  // <-- changement ici : appelle déconnexion
            className="!rounded-button whitespace-nowrap cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 group"
            variant="danger"
          >
            <FontAwesomeIcon
              icon={faUser}
              className="mr-2 transition-transform duration-300 group-hover:scale-110"
            />
            Déconnexion
          </Button>
        </nav>

        {/* Menu Mobile Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden lg:hidden xl:hidden 2xl:hidden text-2xl text-gray-700 focus:outline-none"
          aria-label="Menu mobile"
        >
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
        </button>
      </div>

      {/* Menu Mobile déroulant */}
      <div
        className={`md:hidden lg:hidden xl:hidden 2xl:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        } transition-all duration-300 overflow-hidden bg-white px-6 py-4 border-t border-gray-200`}
      >
        <div className="space-y-4">
          {[
            { path: "/", label: "Accueil" },
            { path: "/vote", label: "Voter" },
            { path: "/results", label: "Résultats" },
          ].map(({ path, label }) => (
            <button
              key={path}
              onClick={() => handleNavigation(path)}
              className={`block w-full text-left text-lg transition-all duration-300 ${
                isActive(path)
                  ? "text-[#4A90E2] font-semibold"
                  : "text-gray-900 hover:text-[#4A90E2] hover:font-semibold hover:scale-105 rounded-lg p-2 px-5 whitespace-nowrap cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 group"
              }`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={handleLogout} // déconnexion dans menu mobile aussi
            className="block w-full text-left text-lg text-red-600 font-semibold hover:text-red-700 rounded-lg p-2 px-5 whitespace-nowrap cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 group"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
