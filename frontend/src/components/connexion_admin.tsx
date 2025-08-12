import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LoginForm: React.FC = () => {
  const [matricule, setMatricule] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [matriculeError, setMatriculeError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const matriculeRegex = /^[a-zA-Z0-9]*$/;

  const handleMatriculeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (matriculeRegex.test(value)) {
      setMatricule(value);
      setMatriculeError(null);
    } else {
      const filtered = value.replace(/[^a-zA-Z0-9]/g, "");
      setMatricule(filtered);
      setMatriculeError("Seuls les caractères alphanumériques sont autorisés.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMatriculeError(null);

    if (!matricule) {
      setMatriculeError("Le matricule est requis.");
      return;
    }

    try {
      const response = await fetch("https://iai-vote.onrender.com/api/authAdmin/loginAdmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matricule, motDePasse: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Erreur lors de la connexion");
        return;
      }

      login(data.token, {
        nom: data.nom,
        prenom: data.prenom,
        matricule: data.matricule,
      });

      navigate("/SimpleDashboard");
    } catch (err) {
      setError("Erreur serveur, réessayez plus tard.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow relative">
      <h2 className="text-2xl mb-6 text-center font-bold">Connexion Admin</h2>

      <label className="block mb-5 relative">
        <FontAwesomeIcon
          icon={faEnvelope}
          className="absolute left-3 top-[18px] text-gray-400"
        />
        <input
          type="text"
          placeholder="Matricule"
          value={matricule}
          onChange={handleMatriculeChange}
          required
          className={`mb-1 w-full p-3 pl-10 border rounded ${matriculeError ? "border-red-600" : ""}`}
        />
      </label>
      {matriculeError && <p className="mb-4 text-red-600 font-semibold">{matriculeError}</p>}

      <label className="block mb-4 relative">
        <FontAwesomeIcon
          icon={faLock}
          className="absolute left-3 top-[18px] text-gray-400"
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mb-4 w-full p-3 pl-10 border rounded"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[18px] text-gray-600 focus:outline-none"
          aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </button>
      </label>

      {error && <p className="mb-4 text-red-600 font-semibold">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
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
  );
};

export default LoginForm;
