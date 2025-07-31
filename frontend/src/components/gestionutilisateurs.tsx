import React, { useEffect, useState } from 'react';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface User {
  _id: string;
  nom: string;
  prenom: string;
  matricule: string;
}

const API_URL = 'https://iai-vote.onrender.com/api/users'; // adapte selon ton endpoint réel

const UsersPage: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ nom: '', prenom: '', matricule: '' });
  const [editUser, setEditUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<User | null>(null);

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

  const handleAdd = async () => {
    if (!newUser.nom || !newUser.prenom || !newUser.matricule) return;
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      if (res.ok) {
        setModalOpen(false);
        setNewUser({ nom: '', prenom: '', matricule: '' });
        fetchUsers();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!editUser) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/${editUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editUser),
      });
      if (res.ok) {
        setEditUser(null);
        fetchUsers();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    try {
      const res = await fetch(`${API_URL}/${deleteConfirm._id}`, { method: 'DELETE' });
      if (res.ok) {
        setDeleteConfirm(null);
        fetchUsers();
      }
    } catch (err) {
      console.error('Erreur suppression', err);
    }
  };

  const filteredUsers = users.filter(user =>
    `${user.nom} ${user.prenom} ${user.matricule}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Rechercher..."
          className="border px-4 py-2 rounded w-1/2"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          <FontAwesomeIcon icon={faPlus} /> Ajouter un utilisateur
        </button>
      </div>

      <div className="overflow-x-auto border rounded-lg shadow-lg">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Nom</th>
              <th className="px-6 py-3 text-left">Prénom</th>
              <th className="px-6 py-3 text-left">Matricule</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{user.nom}</td>
                <td className="px-6 py-4">{user.prenom}</td>
                <td className="px-6 py-4">{user.matricule}</td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => setEditUser(user)}
                    className="text-blue-500 hover:underline"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(user)}
                    className="text-red-500 hover:underline"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-400">
                  Aucun utilisateur trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Ajout */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg space-y-4">
            <h2 className="text-lg font-bold">Ajouter un utilisateur</h2>
            <input
              placeholder="Nom"
              className="w-full px-3 py-2 border rounded"
              value={newUser.nom}
              onChange={e => setNewUser({ ...newUser, nom: e.target.value })}
            />
            <input
              placeholder="Prénom"
              className="w-full px-3 py-2 border rounded"
              value={newUser.prenom}
              onChange={e => setNewUser({ ...newUser, prenom: e.target.value })}
            />
            <input
              placeholder="Matricule"
              className="w-full px-3 py-2 border rounded"
              value={newUser.matricule}
              onChange={e => setNewUser({ ...newUser, matricule: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-400 text-white rounded">Annuler</button>
              <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded">{loading ? 'Ajout...' : 'Ajouter'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Édition */}
      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg space-y-4">
            <h2 className="text-lg font-bold">Modifier utilisateur</h2>
            <input
              placeholder="Nom"
              className="w-full px-3 py-2 border rounded"
              value={editUser.nom}
              onChange={e => setEditUser({ ...editUser, nom: e.target.value })}
            />
            <input
              placeholder="Prénom"
              className="w-full px-3 py-2 border rounded"
              value={editUser.prenom}
              onChange={e => setEditUser({ ...editUser, prenom: e.target.value })}
            />
            <input
              placeholder="Matricule"
              className="w-full px-3 py-2 border rounded"
              value={editUser.matricule}
              onChange={e => setEditUser({ ...editUser, matricule: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setEditUser(null)} className="px-4 py-2 bg-gray-400 text-white rounded">Annuler</button>
              <button onClick={handleEdit} className="px-4 py-2 bg-blue-600 text-white rounded">{loading ? 'Sauvegarde...' : 'Enregistrer'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Suppression */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Confirmer la suppression</h2>
            <p>Voulez-vous vraiment supprimer <strong>{deleteConfirm.nom} {deleteConfirm.prenom}</strong> ?</p>
            <div className="mt-4 flex justify-end gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="bg-gray-400 text-white px-4 py-2 rounded">Annuler</button>
              <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
