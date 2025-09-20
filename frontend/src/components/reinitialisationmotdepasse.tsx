import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // pour redirection
import Button from "../components/ui/buttons/button";
import { securityQuestions } from "../utils/question";

const ResetPassword: React.FC = () => {
  const [matricule, setMatricule] = useState("");
  const [questiondesecurite, setquestiondesecurite] = useState(securityQuestions[0]);
  const [reponsedesecurite, setreponsedesecurite] = useState("");
  const [nouveauMotDePasse, setnouveauMotDePasse] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // pour différencier succès/erreur
  const navigate = useNavigate();

  const handleReset = async () => {
    if (!matricule || !reponsedesecurite || !nouveauMotDePasse || !confirmPassword) {
      setMessage("Tous les champs sont requis");
      setIsSuccess(false);
      return;
    }
    if (nouveauMotDePasse !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas");
      setIsSuccess(false);
      return;
    }

    try {
      const res = await fetch("https://iai-vote.onrender.com/api/auth/resetpassworduser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matricule, questiondesecurite, reponsedesecurite, nouveauMotDePasse })
      });

      const data = await res.json();
      setMessage(data.message);

      if (res.ok) {
        setIsSuccess(true);
        setMatricule("");
        setreponsedesecurite("");
        setnouveauMotDePasse("");
        setConfirmPassword("");

        // Redirection automatique après 3 secondes
        setTimeout(() => {
          navigate("/Connexion");
        }, 3000);
      } else {
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage("Erreur serveur.");
      setIsSuccess(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-gray-800 dark:bg-gray-800 p-8 rounded-2xl shadow-lg space-y-6">
      <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
        Réinitialisation du mot de passe
      </h1>

      <input
        value={matricule}
        onChange={e => setMatricule(e.target.value)}
        placeholder="Matricule"
        className="w-full px-4 py-3 rounded-xl border bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
      />

      <select
        value={questiondesecurite}
        onChange={e => setquestiondesecurite(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
      >
        {securityQuestions.map((q, i) => (
          <option key={i} value={q}>{q}</option>
        ))}
      </select>

      <input
        value={reponsedesecurite}
        onChange={e => setreponsedesecurite(e.target.value)}
        placeholder="Réponse"
        className="w-full px-4 py-3 rounded-xl border bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
      />

      <input
        type="password"
        value={nouveauMotDePasse}
        onChange={e => setnouveauMotDePasse(e.target.value)}
        placeholder="Nouveau mot de passe"
        className="w-full px-4 py-3 rounded-xl border bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
      />

      <input
        type="password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        placeholder="Confirmer mot de passe"
        className="w-full px-4 py-3 rounded-xl border bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
      />

      <Button onClick={handleReset} className="w-full bg-blue-600 hover:bg-blue-700 transition text-white rounded-xl">
        Réinitialiser
      </Button>

      {message && (
        <p
          className={`text-center font-medium ${
            isSuccess ? "text-green-500" : "text-red-500"
          }`}
        >
          {message} {isSuccess && "⏳ Redirection dans 3 secondes..."}
        </p>
      )}
    </div>
  );
};

export default ResetPassword;
