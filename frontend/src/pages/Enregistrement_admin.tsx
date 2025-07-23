import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faIdBadge, faUser, faUsers, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const RegisterForm: React.FC = () => {
  const [matricule, setMatricule] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [classe, setClasse] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    alert(
      `Matricule: ${matricule}\nNom: ${nom}\nPrénom: ${prenom}\nClasse: ${classe}\nMot de passe: ${password}`
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-black">
          Inscription Admin
        </h2>

        {/* Matricule */}
        <label className="block mb-4 relative">
          <span className="text-black font-semibold mb-1 block">Matricule</span>
          <FontAwesomeIcon
            icon={faIdBadge}
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

        {/* Nom */}
        <label className="block mb-4 relative">
          <span className="text-black font-semibold mb-1 block">Nom</span>
          <FontAwesomeIcon
            icon={faUser}
            className="absolute left-3 top-[45px] text-gray-400"
          />
          <input
            type="text"
            required
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Entrez votre nom"
            className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>

        {/* Prénom */}
        <label className="block mb-4 relative">
          <span className="text-black font-semibold mb-1 block">Prénom</span>
          <FontAwesomeIcon
            icon={faUser}
            className="absolute left-3 top-[45px] text-gray-400"
          />
          <input
            type="text"
            required
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            placeholder="Entrez votre prénom"
            className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>

        {/* Classe */}
        <label className="block mb-4 relative">
          <span className="text-black font-semibold mb-1 block">Classe</span>
          <FontAwesomeIcon
            icon={faUsers}
            className="absolute left-3 top-[45px] text-gray-400"
          />
          <input
            type="text"
            required
            value={classe}
            onChange={(e) => setClasse(e.target.value)}
            placeholder="Entrez votre classe"
            className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>

        {/* Mot de passe */}
        <label className="block mb-4 relative">
          <span className="text-black font-semibold mb-1 block">Mot de passe</span>
          <FontAwesomeIcon
            icon={faLock}
            className="absolute left-3 top-[45px] text-gray-400"
          />
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Entrez votre mot de passe"
            className="w-full pl-10 pr-12 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] text-black font-semibold focus:outline-none"
            aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </label>

        {/* Confirmer mot de passe */}
        <label className="block mb-4 relative">
          <span className="text-black font-semibold mb-1 block">
            Confirmer le mot de passe
          </span>
          <FontAwesomeIcon
            icon={faLock}
            className="absolute left-3 top-[45px] text-gray-400"
          />
          <input
            type={showPassword ? "text" : "password"}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmez votre mot de passe"
            className="w-full pl-10 pr-12 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] text-black font-semibold focus:outline-none"
            aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </label>

        {error && (
          <p className="text-red-600 mb-4 text-center font-semibold">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          S'inscrire
        </button>

        <p className="mt-6 text-center text-sm text-gray-700">
          Déjà un compte ?{" "}
          <button
            type="button"
            onClick={() => navigate("/connexionAD")}
            className="text-blue-600 hover:underline font-semibold"
          >
            Connexion
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
