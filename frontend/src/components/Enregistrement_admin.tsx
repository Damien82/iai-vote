import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faIdBadge,
  faUser,
  faEye,
  faEyeSlash,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";

const RegisterPage: React.FC = () => {
  const [matricule, setMatricule] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [classe, setClasse] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👈

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("https://iai-vote.onrender.com/api/auth/registerAdmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matricule, nom, prenom, classe, motDePasse }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Erreur lors de l'inscription");
      } else {
        alert("Inscription réussie !");
        navigate("/connexion");
      }
    } catch (err) {
      setError("Erreur serveur, veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Inscription</h2>

        <label className="block mb-4 relative">
          <FontAwesomeIcon icon={faIdBadge} className="absolute left-3 top-[18px] text-gray-400" />
          <input
            type="text"
            placeholder="Matricule"
            value={matricule}
            onChange={(e) => setMatricule(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>

        <label className="block mb-4 relative">
          <FontAwesomeIcon icon={faUser} className="absolute left-3 top-[18px] text-gray-400" />
          <input
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>

        <label className="block mb-4 relative">
          <FontAwesomeIcon icon={faUser} className="absolute left-3 top-[18px] text-gray-400" />
          <input
            type="text"
            placeholder="Prénom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>

        <label className="block mb-4 relative">
          <FontAwesomeIcon icon={faUserGraduate} className="absolute left-3 top-[18px] text-gray-400" />
          <input
            type="text"
            placeholder="Classe"
            value={classe}
            onChange={(e) => setClasse(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>

        <label className="block mb-4 relative">
          <FontAwesomeIcon icon={faLock} className="absolute left-3 top-[18px] text-gray-400" />
          <input
            type={showPassword ? "text" : "password"} // 👈 type dynamique
            placeholder="Mot de passe"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
            className="w-full pl-10 pr-10 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="absolute right-3 top-[18px] text-gray-500 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          />
        </label>

        {error && (
          <p className="mb-4 text-red-600 font-semibold text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Inscription en cours..." : "S'inscrire"}
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

export default RegisterPage;
