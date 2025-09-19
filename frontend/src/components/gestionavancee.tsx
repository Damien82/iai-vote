import React, { useState } from 'react';

interface PurgeUploadPageProps {
  darkMode: boolean;
}


const PurgeUploadPage: React.FC<PurgeUploadPageProps> = ({ darkMode }) => {
  const [purgeModal, setPurgeModal] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [processingModal, setProcessingModal] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const inputClass = `w-full px-3 py-2 border rounded ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black'}`;

  // 🔹 Purge backend
// 🔹 Purge toutes les bases
const handlePurgeAll = async () => {
  setPurgeModal(false);
  setProcessingModal(true);
  setProcessingMessage('Veuillez patienter pendant la vidange de toutes les bases...');

  try {
    const res = await fetch('https://iai-vote.onrender.com/api/admin/purge', {
      method: 'POST', // POST pour une action côté serveur
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (res.ok) {
      setProcessingMessage('Vidange de toutes les bases terminée !');
    } else {
      setProcessingMessage('Erreur lors de la vidange : ' + (data.message || ''));
    }
  } catch (err: any) {
    setProcessingMessage('Erreur lors de la vidange : ' + err.message);
  }
};



  // 🔹 Upload backend
  const handleUpload = async () => {
    if (!file) {
      alert('Veuillez sélectionner un fichier Excel');
      return;
    }
    setUploadModal(false);
    setProcessingModal(true);
    setProcessingMessage('Téléversement en cours...');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('database', "UtilisateursRef");

      const res = await fetch(`https://iai-vote.onrender.com/api/admin/upload`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setProcessingMessage('Téléversement terminé !');
      } else {
        const data = await res.json();
        setProcessingMessage('Erreur lors du téléversement : ' + (data.message || ''));
      }
    } catch (err: any) {
      setProcessingMessage('Erreur lors du téléversement : ' + err.message);
    }
  };

  return (
    <div className={`p-6 space-y-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-2xl font-bold mb-4">Purge avancée & Téléversement</h1>

      <div className="flex gap-6">
        <button
          onClick={() => setPurgeModal(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Purger toutes les bases
        </button>

        <button
          onClick={() => setUploadModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Téléverser un fichier Excel
        </button>
      </div>

      {/* 🔹 Modal de confirmation purge */}
      {purgeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className={`p-6 rounded shadow-lg w-96 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <h2 className="text-lg font-bold mb-4">Confirmer la purge</h2>
            <p><strong>Voulez-vous vraiment purger toutes les bases ?</strong></p>
            <div className="mt-4 flex justify-end gap-3">
              <button onClick={() => setPurgeModal(false)} className="bg-gray-400 px-4 py-2 rounded text-white">Annuler</button>
              <button onClick={handlePurgeAll} className="bg-red-600 px-4 py-2 rounded text-white">Continuer</button>
            </div>
          </div>
        </div>
      )}

{/* 🔹 Modal téléversement */}
{uploadModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className={`p-6 rounded shadow-lg w-96 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h2 className="text-lg font-bold mb-4">Téléverser un fichier Excel</h2>

      <label className="block mb-2">Choisir le fichier :</label>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={e => setFile(e.target.files?.[0] || null)}
        className={inputClass}
      />

      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => setUploadModal(false)}
          className="bg-gray-400 px-4 py-2 rounded text-white"
        >
          Annuler
        </button>
        <button
          onClick={handleUpload}
          className="bg-blue-600 px-4 py-2 rounded text-white"
        >
          Téléverser
        </button>
      </div>
    </div>
  </div>
)}


      {/* 🔹 Modal traitement */}
      {processingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className={`p-6 rounded shadow-lg w-96 flex flex-col items-center ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <p>{processingMessage}</p>
            <button onClick={() => setProcessingModal(false)} className="bg-gray-400 mt-3 px-4 py-2 rounded text-white">Terminer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurgeUploadPage;
