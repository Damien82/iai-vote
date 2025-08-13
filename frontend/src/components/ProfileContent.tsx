import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ancienMotDePasse, setAncienMotDePasse] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showAncienPassword, setShowAncienPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [matricule, setMatricule] = useState<string | null>(null);

  // Récupérer le matricule depuis le localStorage au montage
  useEffect(() => {
    const storedMatricule = userData.matricule;
    setMatricule(storedMatricule);
  }, []);

  const handleAncienPasswordChange = (value: string) => {
    setAncienMotDePasse(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (confirmPassword && value !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
    } else {
      setError('');
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (password && value !== password) {
      setError('Les mots de passe ne correspondent pas');
    } else {
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
      
    e.preventDefault();

    if (!ancienMotDePasse) {
      setError("Veuillez entrer l'ancien mot de passe");
      return;
    }
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    if (!matricule) {
      setError('Matricule introuvable dans la session');
      return;
    }

    setError('');

    try {
      const token = localStorage.getItem('token');
      console.log("token dans localStorage:", token);

      const response = await fetch('https://iai-vote.onrender.com/api/changepassword', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, },
        body: JSON.stringify({
          ancienMotDePasse,
          nouveauMotDePasse: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Erreur lors du changement de mot de passe");
      } else {
        alert(data.message || "Mot de passe modifié avec succès !");
        setIsModalOpen(false);
        setAncienMotDePasse('');
        setPassword('');
        setConfirmPassword('');
        setError('');
      }
    } catch (err) {
      setError("Erreur serveur, veuillez réessayer plus tard");
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className={`text-center text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Profil
      </h1>

      {/* Avatar */}
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
          <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {userData.prenom} {userData.nom}
          </h2>
          <p className={`text-xs uppercase tracking-wide ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {userData.role}
          </p>
        </div>
      </section>

      {/* Informations personnelles */}
      <section
        className={`p-8 rounded-2xl border shadow-lg ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <h3 className={`text-xl font-bold text-center mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
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
              <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {userData.matricule || 'Non disponible'}
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
              <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
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
              <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
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
              <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
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

          {/* Bouton modal */}
          <div className="mt-6 text-center col-span-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Changer le mot de passe
            </button>
          </div>
        </div>
      </section>

      {/* Modal changement mot de passe */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={`bg-white rounded-lg p-6 max-w-md w-full relative ${
              darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 text-center">Changer le mot de passe</h2>

            <form onSubmit={handleSubmit}>
              {/* Ancien mot de passe */}
              <div className="mb-4 relative">
                <label htmlFor="ancienMotDePasse" className="block mb-1 font-semibold">
                  Ancien mot de passe
                </label>
                <input
                  id="ancienMotDePasse"
                  type={showAncienPassword ? 'text' : 'password'}
                  value={ancienMotDePasse}
                  onChange={(e) => handleAncienPasswordChange(e.target.value)}
                  className="w-full rounded border p-2 pr-10"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowAncienPassword(!showAncienPassword)}
                  className="absolute right-2 top-8 text-gray-500 focus:outline-none"
                >
                  <FontAwesomeIcon icon={showAncienPassword ? faEyeSlash : faEye} />
                </button>
              </div>

              {/* Nouveau mot de passe */}
              <div className="mb-4 relative">
                <label htmlFor="password" className="block mb-1 font-semibold">
                  Nouveau mot de passe
                </label>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  className="w-full rounded border p-2 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-8 text-gray-500 focus:outline-none"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>

              {/* Confirmation mot de passe */}
              <div className="mb-4 relative">
                <label htmlFor="confirmPassword" className="block mb-1 font-semibold">
                  Confirmer le mot de passe
                </label>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                  className="w-full rounded border p-2 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-8 text-gray-500 focus:outline-none"
                >
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                </button>
              </div>

              {error && <p className="mb-4 text-red-600 font-semibold text-center">{error}</p>}

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={
                    !ancienMotDePasse || !password || !confirmPassword || password !== confirmPassword
                  }
                >
                  Valider
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileContent;
