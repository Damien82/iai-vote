import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

interface ProfileContentProps {
  darkMode: boolean;
}

const userData = {
  nom: 'Dupont',
  prenom: 'Jean',
  classe: 'Administrateur Senior',
  role: 'Super Admin',
};

const ProfileContent: React.FC<ProfileContentProps> = ({ darkMode }) => {
  return (
    <div className="space-y-8">
        <h1 className='text-center text-lg'>Profile</h1>
      {/* Carte de profil principale */}
      <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border shadow-lg`}>
        <div className="flex flex-col items-center text-center">
          <div
            className={`w-24 h-24 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center mb-6`}
          >
            <FontAwesomeIcon icon={faUser} className={darkMode ? 'text-gray-400' : 'text-gray-500'} size="3x" />
          </div>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            {userData.prenom} {userData.nom}
          </h2>
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wide`} style={{ fontSize: '10px' }}>
            Administrateur
          </p>
        </div>
      </div>

      {/* Carte des informations détaillées */}
      <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border shadow-lg`}>
        <h3 className={`text-xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Informations Personnelles</h3>
        <div className="text-center sm:grid-cols-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label
                className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wide block mb-2`}
              >
                Nom
              </label>
              <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{userData.nom}</p>
            </div>
            <div>
              <label
                className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wide block mb-2`}
              >
                Prénom
              </label>
              <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{userData.prenom}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label
                className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wide block mb-2`}
              >
                Classe
              </label>
              <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{userData.classe}</p>
            </div>
            <div>
              <label
                className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wide block mb-2`}
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
                {userData.role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
