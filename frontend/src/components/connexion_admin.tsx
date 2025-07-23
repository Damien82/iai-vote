import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LoginForm: React.FC = () => {
  const [matricule, setMatricule] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Matricule: ${matricule}\nMot de passe: ${password}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-black">
          Connexion Admin
        </h2>

        <label className="block mb-4 relative">
          <span className="text-black font-semibold mb-1 block">Matricule</span>
          <FontAwesomeIcon
            icon={faEnvelope}
            className="absolute left-3 top-[45px] text-gray-400"
          />
          <input
            type="text"
            required
            value={matricule}
            onChange={(e) => setMatricule(e.target.value)}
            placeholder="Entrez votre matricule"
            className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>

        <label className="block mb-4 relative">
          <span className="text-black font-semibold mb-1 block">
            Mot de passe
          </span>
          <FontAwesomeIcon
            icon={faLock}
            className="absolute left-3 top-[45px] text-gray-400"
          />
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Votre mot de passe"
            className="w-full pl-10 pr-12 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[45px] text-black font-semibold focus:outline-none"
            aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </label>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          Se connecter
        </button>

        <p className="mt-6 text-center text-sm text-gray-700">
          Pas encore de compte ?{" "}
          <button
            type="button"
            onClick={() => navigate("/EnregistrementAD")}
            className="text-blue-600 hover:underline font-semibold"
          >
            S'inscrire
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
