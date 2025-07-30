import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

interface ProfileContentProps {
  darkMode: boolean;
  userData: {
    matricule: string;
    nom: string;
    prenom: string;
    classe: string;
    role: string;
  };
} 

const ProfileContent: React.FC<ProfileContentProps> = ({ darkMode, userData }) => {
  return (
    <div className="space-y-8">
      <h1 className={`text-center text-lg font-semibold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Profil</h1>

      {/* Avatar et nom */}
      <section
        className={`p-8 rounded-2xl border shadow-lg ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <div className="flex flex-col items-center text-center">
          <div
            className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${
              darkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}
          >
            <FontAwesomeIcon
              icon={faUser}
              size="3x"
              className={darkMode ? 'text-gray-400' : 'text-gray-500'}
            />
          </div>
          <h2
            className={`text-2xl font-bold mb-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {userData.prenom} {userData.nom}
          </h2>
          <p
            className={`text-xs uppercase tracking-wide ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            {userData.role}
          </p>
        </div>
      </section>

      {/* Détails du profil */}
      <section
        className={`p-8 rounded-2xl border shadow-lg ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <h3
          className={`text-xl font-bold text-center mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Informations Personnelles
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-2 text-center sm:text-left">
          <div className="space-y-4">
            <div>
              <label
                className={`block mb-2 text-sm font-medium uppercase tracking-wide ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Matricule
              </label>
              <p
                className={`text-lg font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {userData.matricule}
              </p>
            </div>
            <div>
              <label
                className={`block mb-2 text-sm font-medium uppercase tracking-wide ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Nom
              </label>
              <p
                className={`text-lg font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {userData.nom}
              </p>
            </div>
            <div>
              <label
                className={`block mb-2 text-sm font-medium uppercase tracking-wide ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Prénom
              </label>
              <p
                className={`text-lg font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {userData.prenom}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label
                className={`block mb-2 text-sm font-medium uppercase tracking-wide ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Classe
              </label>
              <p
                className={`text-lg font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {userData.classe}
              </p>
            </div>
            <div>
              <label
                className={`block mb-2 text-sm font-medium uppercase tracking-wide ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Rôle
              </label>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  darkMode
                    ? 'bg-blue-900 text-blue-200 border border-blue-800'
                    : 'bg-blue-100 text-blue-800 border border-blue-200'
                }`}
              >
                Administrateur
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileContent;
