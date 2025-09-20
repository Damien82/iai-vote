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
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

const RegisterPage: React.FC = () => {
  const [matricule, setMatricule] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [classe, setClasse] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [questiondesecurite, setquestiondesecurite] = useState("");
  const [reponsedesecurite, setreponsedesecurite] = useState("");  
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showAnswer, setshowAnswer] = useState(false);  

  const navigate = useNavigate();

  // Regexs autorisés
  const matriculeRegex = /^[a-zA-Z0-9]*$/;
  const nameRegex = /^[a-zA-Z\s'-]*$/; // Lettres, espaces, apostrophes et traits d’union
  const classeRegex = /^[a-zA-Z0-9\s-]*$/; // Lettres, chiffres, espaces, traits d’union
  const reponsedesecuriteRegex = /^[a-zA-Z0-9\s-]*$/; // lettres, chiffres, espaces, traits d’union

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
      setErrors(prev => ({ ...prev, [fieldName]: null }));
    } else {
      const filtered = value.replace(new RegExp(`[^${regex.source.replace(/^\^|\$$/g, "")}]`, "g"), "");
      setter(filtered);
      setErrors(prev => ({ ...prev, [fieldName]: errorMsg }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Optionnel: vérifier ici que tous les champs sont valides avant submit
    if (Object.values(errors).some(e => e !== null)) {
      setError("Veuillez corriger les erreurs dans le formulaire.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://iai-vote.onrender.com/api/authAdmin/registerAdmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matricule, nom, prenom, classe, motDePasse, questiondesecurite, reponsedesecurite }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Erreur lors de l'inscription");
      } else {
        alert("Inscription réussie !");
        navigate("/connexionAD");
      }
    } catch (err) {
      setError("Erreur serveur, veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 p-6">
      <form
        onSubmit={handleSubmit}
        className=" p-8 rounded-lg shadow-lg w-full max-w-md bg-gray-800"
      >
        <h2 className="text-2xl text-white font-bold mb-6 text-center">Inscription Admin</h2>

        <label className="block mb-4 relative">
          <FontAwesomeIcon icon={faIdBadge} className="absolute left-3 top-[18px] text-gray-300" />
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
            className={`w-full pl-10 pr-4 py-3 rounded-md border text-white bg-gray-700 border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.matricule ? "border-red-600" : ""
            }`}
          />
        </label>
        {errors.matricule && (
          <p className="mb-4 text-red-600 font-semibold">{errors.matricule}</p>
        )}

        <label className="block mb-4 relative">
          <FontAwesomeIcon icon={faUser} className="absolute left-3 top-[18px] text-gray-300" />
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
            className={`w-full pl-10 pr-4 py-3 rounded-md border bg-gray-700 text-white border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.nom ? "border-red-600" : ""
            }`}
          />
        </label>
        {errors.nom && (
          <p className="mb-4 text-red-600 font-semibold">{errors.nom}</p>
        )}

        <label className="block mb-4 relative">
          <FontAwesomeIcon icon={faUser} className="absolute left-3 top-[18px] text-gray-300" />
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
            className={`w-full pl-10 pr-4 py-3 rounded-md border bg-gray-700 text-white border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.prenom ? "border-red-600" : ""
            }`}
          />
        </label>
        {errors.prenom && (
          <p className="mb-4 text-red-600 font-semibold">{errors.prenom}</p>
        )}

        <label className="block mb-4 relative">
          <FontAwesomeIcon icon={faUserGraduate} className="absolute left-3 top-[18px] text-gray-300" />
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
            className={`w-full pl-10 pr-4 py-3 rounded-md border bg-gray-700 text-white border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.classe ? "border-red-600" : ""
            }`}
          />
        </label>
        {errors.classe && (
          <p className="mb-4 text-red-600 font-semibold">{errors.classe}</p>
        )}

        <label className="block mb-4 relative">
          <FontAwesomeIcon icon={faLock} className="absolute left-3 top-[18px] text-gray-300" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
            className="w-full pl-10 pr-10 py-3 rounded-md border bg-gray-700 text-white border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                {/* 🔹 Sélection question de sécurité */}
        <label className="block mb-4 relative">
          <FontAwesomeIcon icon={faQuestionCircle} className="absolute left-3 top-[18px] text-gray-300" />
          <select
            value={questiondesecurite}
            onChange={(e) => setquestiondesecurite(e.target.value)}
            required
            className="w-full pl-10 pr-3 py-3 text-white rounded-md border bg-gray-700 text-white border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Sélectionnez une question de sécurité --</option>
            <option value="Quel est le prénom de votre mère ?">Quel est le prénom de votre mère ?</option>
            <option value="Quel est le nom de votre premier animal ?">Quel est le nom de votre premier animal ?</option>
            <option value="Quelle est votre ville de naissance ?">Quelle est votre ville de naissance ?</option>
            <option value="Quel est le nom de votre meilleur ami d’enfance ?">Quel est le nom de votre meilleur ami d’enfance ?</option>
          </select>
        </label>
        
        {/* 🔹 Réponse à la question */}
        <label className="block mb-4 relative">
          <FontAwesomeIcon icon={faLock} className="absolute left-3 top-[18px] text-gray-300" />
          <input
            type={showAnswer ? "text" : "password"} // toggle affichage réponse
            placeholder="Votre réponse secrète"
            value={reponsedesecurite}
            onChange={(e) =>
              handleInputChange(
                e,
                setreponsedesecurite,
                reponsedesecuriteRegex,
                "reponsedesecurite",
                "Votre réponse doit contenir uniquement des lettres ou chiffres (3 à 30 caractères)."
              )
            }
            required
            className={`w-full pl-10 pr-10 py-3 rounded-md border text-white bg-gray-700 border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.reponsedesecurite ? "border-red-600" : ""
            }`}
          />
          <FontAwesomeIcon
            icon={showAnswer ? faEyeSlash : faEye}
            className="absolute right-3 top-[18px] text-gray-500 cursor-pointer"
            onClick={() => setshowAnswer((prev) => !prev)}
          />
        </label>
        
        {errors.reponsedesecurite && (
          <p className="mb-4 text-red-600 font-semibold">{errors.reponsedesecurite}</p>
        )}        

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Inscription en cours..." : "S'inscrire"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-100">
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
