import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';

const SituationSite: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [isSystemActive, setIsSystemActive] = useState(false);

  const handleStart = () => {
    setIsSystemActive(true);
    console.log('Système de vote démarré');
  };

  const handleStop = () => {
    setIsSystemActive(false);
    console.log('Système de vote arrêté');
  };

  return (
    <div className={`min-h-screen w-full flex flex-col justify-center items-center px-6 py-12 transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-2xl w-full">
        <h1 className={`text-3xl md:text-4xl font-bold text-center mb-4 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Gestion du Système de Vote
        </h1>
        <p className={`text-center text-lg mb-12 ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Contrôlez l'état du système de vote en utilisant les boutons ci-dessous
        </p>

        <div className={`mb-8 text-center`}>
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
            isSystemActive 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${
              isSystemActive ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
            {isSystemActive ? 'Système Actif' : 'Système Inactif'}
          </div>
        </div>

        <div className="flex flex-row sm:flex-row justify-center items-center gap-6">
          <button
            onClick={handleStart}
            disabled={isSystemActive}
            className={`w-full h-[100px] sm:w-auto flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
              isSystemActive
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                : 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            }`}
          >
            <FontAwesomeIcon icon={faPlay} className="mr-3 text-xl" />
            Démarrer
          </button>

          <button
            onClick={handleStop}
            disabled={!isSystemActive}
            className={`w-full h-[100px] sm:w-auto flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
              !isSystemActive
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                : 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
            }`}
          >
            <FontAwesomeIcon icon={faStop} className="mr-3 text-xl" />
            Arrêter
          </button>
        </div>

        <div className={`mt-12 text-center text-sm ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <p>Le système de vote est actuellement {isSystemActive ? 'actif' : 'inactif'}</p>
        </div>
      </div>
    </div>
  );
};

export default SituationSite;
