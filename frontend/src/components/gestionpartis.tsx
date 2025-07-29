import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

interface Parti {
  _id: string;
  nom: string;
  proprietaire: string;
  imageUrl: string;
}

const API_URL = 'https://iai-vote.onrender.com/api/partis'; // à adapter

const PartisPage: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [partis, setPartis] = useState<Parti[]>([]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [newNom, setNewNom] = useState('');
  const [newProprietaire, setNewProprietaire] = useState('');
  const [newImage, setNewImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch data
  const fetchPartis = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPartis(data);
    } catch (error) {
      console.error('Erreur fetch:', error);
    }
  };

  useEffect(() => {
    fetchPartis();
  }, []);

  // Add a new party
  const handleAdd = async () => {
    if (!newNom || !newProprietaire || !newImage) return alert("Tous les champs sont requis");

    const formData = new FormData();
    formData.append('nom', newNom);
    formData.append('proprietaire', newProprietaire);
    formData.append('image', newImage);

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setNewNom('');
        setNewProprietaire('');
        setNewImage(null);
        setModalOpen(false);
        fetchPartis();
      } else {
        alert("Erreur lors de l'ajout");
      }
    } catch (error) {
      console.error('Erreur ajout:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce parti ?')) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) fetchPartis();
    } catch (error) {
      console.error('Erreur suppression:', error);
    }
  };

  const filteredPartis = partis.filter(p =>
    p.nom.toLowerCase().includes(search.toLowerCase()) ||
    p.proprietaire.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={`px-4 py-2 rounded-lg border w-full sm:w-1/2 focus:outline-none ${
            darkMode
              ? 'bg-gray-800 text-white border-gray-600'
              : 'bg-white text-gray-800 border-gray-300'
          }`}
        />

        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faPlus} />
          Ajouter un parti
        </button>
      </div>

      {/* Table */}
      <div className={`overflow-x-auto rounded-2xl border shadow-lg ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
        <table className="min-w-full">
          <thead className={darkMode ? 'bg-gray-900' : 'bg-gray-100'}>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Image</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Nom</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Propriétaire</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPartis.map(parti => (
              <tr key={parti._id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="px-6 py-4">
                  <img src={parti.imageUrl} alt={parti.nom} className="w-12 h-12 object-cover rounded-full" />
                </td>
                <td className={`px-6 py-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{parti.nom}</td>
                <td className={`px-6 py-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{parti.proprietaire}</td>
                <td className="px-6 py-4 flex gap-4 text-sm">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FontAwesomeIcon icon={faEdit} /> Modifier
                  </button>
                  <button onClick={() => handleDelete(parti._id)} className="text-red-500 hover:text-red-700">
                    <FontAwesomeIcon icon={faTrash} /> Supprimer
                  </button>
                </td>
              </tr>
            ))}
            {filteredPartis.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-400">Aucun parti trouvé.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg w-full max-w-md ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <h2 className="text-xl mb-4 font-bold">Ajouter un nouveau parti</h2>
            <input
              type="text"
              placeholder="Nom du parti"
              value={newNom}
              onChange={e => setNewNom(e.target.value)}
              className="w-full mb-3 px-4 py-2 rounded border focus:outline-none"
            />
            <input
              type="text"
              placeholder="Nom du propriétaire"
              value={newProprietaire}
              onChange={e => setNewProprietaire(e.target.value)}
              className="w-full mb-3 px-4 py-2 rounded border focus:outline-none"
            />
            <input
              type="file"
              accept="image/*"
              onChange={e => setNewImage(e.target.files?.[0] || null)}
              className="mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded bg-gray-400 text-white hover:bg-gray-500"
                onClick={() => setModalOpen(false)}
              >
                Annuler
              </button>
              <button
                disabled={loading}
                onClick={handleAdd}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                {loading ? 'Ajout...' : 'Ajouter'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartisPage;
