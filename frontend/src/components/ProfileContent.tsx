import React from "react";

interface ProfileContentProps {
  userData: {
    nom: string;
    prenom: string;
    classe: string;
    role: string;
  };
  darkMode: boolean; // ← ici on ajoute la prop darkMode
}

const ProfileContent: React.FC<ProfileContentProps> = ({ userData, darkMode = false }) => {
  return (
    <div className={`max-w-md mx-auto mt-10 p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <h2 className="text-2xl font-bold mb-4 text-center">
        Profil utilisateur
      </h2>
      <ul className="space-y-3">
        <li><strong>Nom :</strong> {userData.nom}</li>
        <li><strong>Prénom :</strong> {userData.prenom}</li>
        <li><strong>Classe :</strong> {userData.classe}</li>
        <li><strong>Rôle :</strong> {userData.role}</li>
      </ul>
    </div>
  );
};

export default ProfileContent;
