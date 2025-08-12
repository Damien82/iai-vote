import React, { useEffect, useState } from 'react';

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


  // Fetch data
  const fetchPartis = async () => {
    try {
      const res = await fetch(API_URL);
      const text = await res.text();
      console.log('Réponse brute du serveur:', text);
      const data = JSON.parse(text);
      setPartis(data);
    } catch (error) {
      console.error('Erreur fetch:', error);
    }
  };

  useEffect(() => {
    fetchPartis();
  }, []);




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
          className={`px-4 py-2 rounded-lg border w-full sm:w-1/2 focus:outline-blue ${
            darkMode
              ? 'bg-gray-800 text-white border-gray-600'
              : 'bg-white text-gray-800 border-gray-300'
          }`}
        />
      </div>

      {/* Table */}
      <div className={`overflow-x-auto rounded-2xl border shadow-lg ${darkMode ? 'border-gray-900 bg-gray-800' : ' bg-white'}`}>
        <table className="min-w-full">
          <thead className={darkMode ? 'bg-gray-400' : 'bg-gray-100'}>
            <tr>
              <th className="px-6 py-3 text-center text-sm font-bold">Image</th>
              <th className="px-6 py-3 text-center text-sm font-bold">Nom</th>
              <th className="px-6 py-3 text-center text-sm font-bold">Propriétaire</th>
            </tr>
          </thead>
          <tbody>
            {filteredPartis.map(parti => (
              <tr key={parti._id} className="hover:bg-gray-600 dark: hover:bg-gray-100">
                <td className="px-6 py-4">
                  <img src={parti.imageUrl} alt={parti.nom} className="w-12 h-12 object-cover rounded-full mx-auto" />
                </td>
                <td className={`px-6 py-4 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>{parti.nom}</td>
                <td className={`px-6 py-4 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>{parti.proprietaire}</td>
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

    </div>
  );
};

export default PartisPage;
