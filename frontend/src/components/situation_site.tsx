import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';

const SituationSite: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [isSystemActive, setIsSystemActive] = useState(false);
  const [loading, setLoading] = useState(true);

  // Charger l'état actuel depuis le backend
  useEffect(() => {
    fetch("https://iai-vote.onrender.com/api/system/getsystemstate")
      .then((res) => res.json())
      .then((data) => {
        setIsSystemActive(data.isActive);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement de l'état :", err);
        setLoading(false);
      });
  }, []);

  // Fonction pour changer l'état (démarrer ou arrêter)
  const updateSystemState = (newState: boolean) => {
    fetch("https://iai-vote.onrender.com/api/system/togglesystemstate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: newState }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsSystemActive(data.isActive);
        console.log(
          `Système de vote ${data.isActive ? "démarré" : "arrêté"}`
        );
      })
      .catch((err) => console.error("Erreur lors de la mise à jour :", err));
  };

  const handleStart = () => updateSystemState(true);
  const handleStop = () => updateSystemState(false);

  return (
    <div
      className={`min-h-screen w-full flex flex-col justify-center items-center px-6 py-12 transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-2xl w-full">
        <h1
          className={`text-3xl md:text-4xl font-bold text-center mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Gestion du Système de Vote
        </h1>
        <p
          className={`text-center text-lg mb-12 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          Contrôlez l'état du système de vote en utilisant les boutons ci-dessous
        </p>

        {/* Indicateur d'état */}
        <div className={`mb-8 text-center`}>
          {loading ? (
            <div className="text-gray-500">Chargement...</div>
          ) : (
            <div
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                isSystemActive
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full mr-2 ${
                  isSystemActive ? 'bg-green-500' : 'bg-red-500'
                }`}
              ></div>
              {isSystemActive ? 'Système Actif' : 'Système Inactif'}
            </div>
          )}
        </div>

        {/* Boutons */}
        <div className="flex flex-row sm:flex-row justify-center items-center gap-6">
          <button
            onClick={handleStart}
            disabled={isSystemActive || loading}
            className={`w-full h-[100px] sm:w-auto flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
              isSystemActive || loading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                : 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            }`}
          >
            <FontAwesomeIcon icon={faPlay} className="mr-3 text-xl" />
            Démarrer
          </button>

          <button
            onClick={handleStop}
            disabled={!isSystemActive || loading}
            className={`w-full h-[100px] sm:w-auto flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
              !isSystemActive || loading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                : 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
            }`}
          >
            <FontAwesomeIcon icon={faStop} className="mr-3 text-xl" />
            Arrêter
          </button>
        </div>

        {/* Texte bas */}
        <div
          className={`mt-12 text-center text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          {loading
            ? <p>Chargement de l'état...</p>
            : <p>Le système de vote est actuellement {isSystemActive ? 'actif ✅' : 'inactif 🚫'}</p>}
        </div>
      </div>
    </div>
  );
};

export default SituationSite;
