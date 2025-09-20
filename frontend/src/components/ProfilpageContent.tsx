// src/pages/ProfilePage.tsx
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/ui/buttons/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface UserData {
  matricule: string;
  nom: string;
  prenom: string;
  classe?: string;
}

interface ProfilePageProps {
  darkMode: boolean;
}

const ProfilpageContent: React.FC<ProfilePageProps> = ({ darkMode }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [editPassword, setEditPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  // 🔹 Récupérer les données utilisateur
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("https://iai-vote.onrender.com/api/userssecond/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.error("Erreur récupération profil:", err);
      }
    };
    fetchUser();
  }, []);

  const handlePasswordUpdate = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage("Tous les champs sont requis !");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("Les nouveaux mots de passe ne correspondent pas !");
      return;
    }

    try {
      const res = await fetch("https://iai-vote.onrender.com/api/userssecond/profile/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Mot de passe mis à jour avec succès !");
        setEditPassword(false);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage(data.message || "Erreur lors de la mise à jour");
      }
    } catch (err) {
      setMessage("Erreur réseau");
      console.error(err);
    }
  };
  useEffect(() => {
  if (!message) return; // si pas de message, ne rien faire

  const timer = setTimeout(() => {
    setMessage(""); // vider le message après 5 secondes
  }, 5000);

  return () => clearTimeout(timer); // nettoyer le timer si le composant se démonte ou message change
}, [message]);

  if (!userData)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-5 font-semibold">Chargement du profil...</p>
      </div>
    );

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen`}>
      <Header />

      <div className="max-w-4xl mx-auto py-11 px-6 my-12">
        <div className={`rounded-2xl shadow-2xl ${darkMode ? "bg-gray-800" : "bg-white"} overflow-hidden`}>
          <div className="px-8 py-6 border-b border-gray-300 dark:border-gray-700">
            <h1 className="text-3xl font-bold text-center mb-2">Mon Profil</h1>
            <p className="text-center text-gray-500 dark:text-gray-400">Gérez vos informations et mot de passe</p>
          </div>

          <div className="px-8 py-6 space-y-8 text-center">
            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 xl:grid-cols-2 gap-6">
              <div className="space-y-1">
                <h3 className="font-semibold text-lg text-gray-600 dark:text-gray-300">Matricule : {userData.matricule}</h3>
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-lg text-gray-600 dark:text-gray-300">Nom : {userData.nom} </h3>
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-lg text-gray-600 dark:text-gray-300">Prénom : {userData.prenom}</h3>
              </div>
              {userData.classe && (
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg text-gray-600 dark:text-gray-300">Classe : {userData.classe}</h3>
                </div>
              )}
            </div>

            {/* 🔹 Modifier mot de passe */}
            {!editPassword ? (
              <div className="text-center">
                <Button
                  onClick={() => setEditPassword(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full shadow-md transform transition duration-300 hover:scale-105"
                >
                  Modifier le mot de passe
                </Button>
              </div>
            ) : (
              <div className="space-y-4 relative w-full">
            <div className="relative w-full">
                <input
                    type={showOldPassword ? "text" : "password"}
                    placeholder="Ancien mot de passe"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-400 transition ${
                    darkMode
                    ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                    : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"
                    } pr-10`} 
                />
                <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                >
                    <FontAwesomeIcon icon={showOldPassword ? faEyeSlash : faEye} />
                </button>
            </div>
            <div className="relative w-full">                
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Nouveau mot de passe"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-400 transition ${
                    darkMode
                      ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                      : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"
                  }`}
                />
                <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                >
                    <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                </button>
            </div>     

            <div  className="relative w-full">   
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmer mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-400 transition ${
                    darkMode
                      ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                      : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"
                  }`}
                />
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                >
                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                </button>
            </div>    

                <div className="flex justify-end gap-4 mt-2">
                  <Button
                    onClick={() => setEditPassword(false)}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-full"
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={handlePasswordUpdate}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full"
                  >
                    Enregistrer
                  </Button>
                </div>
              </div>
            )}

            {message && (
              <p
                className={`text-center font-medium ${
                  message.includes("succès") ? "text-green-500" : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilpageContent;
