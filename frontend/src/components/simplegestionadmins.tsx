import React, { useEffect, useState } from 'react';

interface User {
  _id: string;
  nom: string;
  prenom: string;
  matricule: string;
  classe: string;
}

const API_URL = 'https://iai-vote.onrender.com/api/listeadmin';

const UsersPage: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Erreur lors du chargement des utilisateurs', err);
    }
  };


  const filteredUsers = users.filter(user =>
    `${user.nom} ${user.prenom} ${user.matricule}`.toLowerCase().includes(search.toLowerCase())
  );
  const tableClass = `${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`;

  return (
    <div className={`p-4 space-y-6 ${darkMode ? 'bg-gray-900 text-white' : ' text-black'}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <input
          type="text"
          placeholder="Rechercher..."
          className={`px-4 py-2 rounded-lg border w-full sm:w-1/2 focus:outline-blue ${darkMode ? 'bg-gray-800 text-white border-gray-600' : ''}`}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className={`overflow-x-auto border rounded-lg shadow-lg ${darkMode ? 'border-gray-700' : ''}`}>
        <table className={`min-w-full ${tableClass}`}>
          <thead className={darkMode ? 'bg-gray-500 text-black' : 'bg-gray-400'}>
            <tr>
              <th className="px-6 py-3 text-left">Matricule</th>
              <th className="px-6 py-3 text-left">Nom</th>
              <th className="px-6 py-3 text-left">Prénom</th>
              <th className="px-6 py-3 text-left">Classe</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user._id} className={`${darkMode ? ' bg-gray-800 hover:bg-gray-600' : 'hover:bg-gray-400'}`}>
                <td className="px-6 py-4">{user.matricule}</td>
                <td className="px-6 py-4">{user.nom}</td>
                <td className="px-6 py-4">{user.prenom}</td>
                <td className="px-6 py-4">{user.classe}</td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-400">
                  Aucun utilisateur trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
