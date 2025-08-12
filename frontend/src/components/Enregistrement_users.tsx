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
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Regex autorisés pour chaque champ
  const matriculeRegex = /^[a-zA-Z0-9]*$/;
  const nameRegex = /^[a-zA-Z\s'-]*$/; // lettres, espaces, apostrophes, traits d’union
  const classeRegex = /^[a-zA-Z0-9\s-]*$/; // lettres, chiffres, espaces, traits d’union

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>,
    regex: RegExp,
    fieldName: string,
    errorMsg: string
  ) => {
    const value = e.target.value;
    if (regex.test(value)) {
      setter(value);
      setErrors((prev) => ({ ...prev, [fieldName]: null }));
    } else {
      // Supprime tous les caractères non autorisés
      const filtered = value.replace(new RegExp(`[^${regex.source.replace(/^\^|\$$/g, "")}]`, "g"), "");
      setter(filtered);
      setErrors((prev) => ({ ...prev, [fieldName]: errorMsg }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (Object.values(errors).some((e) => e !== null)) {
      setError("Veuillez corriger les erreurs dans le formulaire.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://iai-vote.onrender.com/api/auth/register", {
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
            onChange={(e) =>
              handleInputChange(
                e,
                setMatricule,
                matriculeRegex,
                "matricule",
                "Seuls les caractères alphanumériques sont autorisés."
              )
            }
            required
            className={`w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.matricule ? "border-red-600" : ""
            }`}
          />
        </label>
        {errors.matricule && (
          <p className="mb-4 text-red-600 font-semibold">{errors.matricule}</p>
        )}

        <label className="block mb-4 relative">
          <FontAwesomeIcon icon={faUser} className="absolute left-3 top-[18px] text-gray-400" />
          <input
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={(e) =>
              handleInputChange(
                e,
                setNom,
                nameRegex,
                "nom",
                "Seules les lettres, espaces, apostrophes et traits d’union sont autorisés."
              )
            }
            required
            className={`w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.nom ? "border-red-600" : ""
            }`}
          />
        </label>
        {errors.nom && (
          <p className="mb-4 text-red-600 font-semibold">{errors.nom}</p>
        )}

        <label className="block mb-4 relative">
          <FontAwesomeIcon icon={faUser} className="absolute left-3 top-[18px] text-gray-400" />
          <input
            type="text"
            placeholder="Prénom"
            value={prenom}
            onChange={(e) =>
              handleInputChange(
                e,
                setPrenom,
                nameRegex,
                "prenom",
                "Seules les lettres, espaces, apostrophes et traits d’union sont autorisés."
              )
            }
            required
            className={`w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.prenom ? "border-red-600" : ""
            }`}
          />
        </label>
        {errors.prenom && (
          <p className="mb-4 text-red-600 font-semibold">{errors.prenom}</p>
        )}

        <label className="block mb-4 relative">
          <FontAwesomeIcon icon={faUserGraduate} className="absolute left-3 top-[18px] text-gray-400" />
          <input
            type="text"
            placeholder="Classe"
            value={classe}
            onChange={(e) =>
              handleInputChange(
                e,
                setClasse,
                classeRegex,
                "classe",
                "Seules les lettres, chiffres, espaces et traits d’union sont autorisés."
              )
            }
            required
            className={`w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.classe ? "border-red-600" : ""
            }`}
          />
        </label>
        {errors.classe && (
          <p className="mb-4 text-red-600 font-semibold">{errors.classe}</p>
        )}

        <label className="block mb-4 relative">
          <FontAwesomeIcon icon={faLock} className="absolute left-3 top-[18px] text-gray-400" />
          <input
            type={showPassword ? "text" : "password"} // type dynamique
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
            onClick={() => navigate("/connexion")}
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
