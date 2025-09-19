import React, { useEffect, useState } from 'react';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface User {
  _id: string;
  nom: string;
  prenom: string;
  matricule: string;
  classe: string;
}

const API_URL = 'https://iai-vote.onrender.com/api/listeusers';

const UsersPage: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ nom: '', prenom: '', matricule: '', classe: '' });
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<User | null>(null);
  const [filteredUser, setFilteredUser] = useState<User[]>([]);
  const [exportModal, setExportModal] = useState(false); // 🔹 nouveau modal
  const [exportFormat, setExportFormat] = useState<'excel' | 'pdf'>('excel');

  const validTextRegex = /^[a-zA-ZÀ-ÿ0-9 \-']*$/;
  const [nomError, setNomError] = useState('');
  const [prenomError, setPrenomError] = useState('');
  const [matriculeError, setMatriculeError] = useState('');
  const [pdfTitle, setPdfTitle] = useState("Liste des utilisateurs");

  

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(API_URL);
      const data: User[] = await res.json();
      setUsers(data);
      setFilteredUser(data);
    } catch (err) {
      console.error('Erreur lors du chargement des utilisateurs', err);
    }
  };

  const showNonVoters = async () => {
    try {
      // Récupérer les utilisateurs les plus récents
      const resUsers = await fetch(API_URL);
      const allUsers: User[] = await resUsers.json();

      // Récupérer les matricules des votants
      const resVoters = await fetch("https://iai-vote.onrender.com/api/voters/voters-matricules");
      const votedMatricules: string[] = await resVoters.json();

      // Filtrer ceux qui n'ont pas voté
      const nonVoters = allUsers.filter(user => !votedMatricules.includes(user.matricule));
      setFilteredUser(nonVoters);
      setPdfTitle("Liste des utilisateurs n’ayant pas voté");
    } catch (err) {
      console.error("Erreur récupération non votants :", err);
    }
  };


    const showVoters = async () => {
    try {
      const resVoters = await fetch("https://iai-vote.onrender.com/api/voters/voters-matricules");
      const votedMatricules: string[] = await resVoters.json();

      const voters = users.filter(user => votedMatricules.includes(user.matricule));
      setFilteredUser(voters);
      setPdfTitle("Liste des utilisateurs ayant voté"); 
    } catch (err) {
      console.error("Erreur récupération votants :", err);
    }
  };


  const resetTable = async () => {
    try {
      const resUsers = await fetch(API_URL);
      const allUsers: User[] = await resUsers.json();
      setFilteredUser(allUsers);
      setPdfTitle("Liste des utilisateurs");
    } catch (err) {
      console.error("Erreur réinitialisation table :", err);
    }
  };

  const handleAdd = async () => {
    if (!newUser.nom || !newUser.prenom || !newUser.matricule || !newUser.classe) {
      alert("Tous les champs sont requis");
      return;
    }

    if (nomError || prenomError || matriculeError) {
      alert("Veuillez corriger les erreurs dans le formulaire");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      if (res.ok) {
        alert("Ajout réussi");
        setModalOpen(false);
        setNewUser({ nom: '', prenom: '', matricule: '', classe: '' });
        fetchUsers();
      } else {
        alert("Erreur lors de l'ajout");
      }
    } catch (err) {
      alert("Erreur réseau");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (res.ok) {
        alert("Suppression réussie");
        fetchUsers();
      } else {
        alert("Erreur : " + data.message);
      }
    } catch (err) {
      alert("Erreur réseau");
      console.error(err);
    }
  };

   // 🔹 Export Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredUser.map(u => ({
        Matricule: u.matricule,
        Nom: u.nom,
        Prénom: u.prenom,
        Classe: u.classe,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Utilisateurs");
    XLSX.writeFile(workbook, "utilisateurs.xlsx");
  };

  // 🔹 Export PDF
  const exportToPDF = ( data: User[], filename: string, title: string) => {
    const doc = new jsPDF();
      // Ajouter un titre en haut
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(title, doc.internal.pageSize.getWidth() / 2, 15, { align: "center" });
    const tableData = filteredUser.map(u => [u.matricule, u.nom, u.prenom, u.classe]);
    autoTable(doc, {
      startY: 25, 
      head: [['Matricule', 'Nom', 'Prénom', 'Classe']],
      body: tableData,
    });
    doc.save(filename + '.pdf');
  };

  const handleExport = () => {
    if (exportFormat === 'excel') {
      exportToExcel();
    } else {
    exportToPDF(filteredUser, 'Utilisateurs', pdfTitle);
    }
    setExportModal(false);
  };


  const filteredUsers = filteredUser.filter(user =>
    `${user.nom} ${user.prenom} ${user.matricule}`.toLowerCase().includes(search.toLowerCase())
  );

  const inputClass = `w-full px-3 py-2 border rounded ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black'}`;
  const tableClass = `${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`;

  return (
    <div className={`p-4 space-y-6 ${darkMode ? 'bg-gray-900 text-white' : 'text-black'}`}>
      <div className="flex flex-col sm:items-center sm:justify-between gap-4">
        <input
          type="text"
          placeholder="Rechercher..."
          className={`px-4 py-2 rounded-lg border border-gray-600 w-full sm:w-1/2 focus:outline-blue ${darkMode ? 'bg-gray-800 text-white border-gray-600' : ''}`}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div className='flex flex-row gap-6 items-center justify-center tel:flex-col sm:flex-col lg:flex-col'>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} /> Ajouter un utilisateur
          </button>

          <button
            onClick={showNonVoters}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            Liste des non votants
          </button>

           <button
            onClick={showVoters}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            Liste des votants
          </button>

          <button
            onClick={resetTable}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            Tables utilisateurs
          </button>

          
          <button
            onClick={() => setExportModal(true)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            Exporter
          </button>
        </div>
      </div>
      <div className={`overflow-x-auto border border-gray-300 rounded-lg shadow-lg ${darkMode ? 'border-gray-700' : ''}`}>
        <table className={`min-w-full ${tableClass}`}>
          <thead className={darkMode ? 'bg-gray-500 text-black' : 'bg-gray-400'}>
            <tr>
              <th className="px-6 py-3 text-left">Matricule</th>
              <th className="px-6 py-3 text-left">Nom</th>
              <th className="px-6 py-3 text-left">Prénom</th>
              <th className="px-6 py-3 text-left">Classe</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user._id} className={`${darkMode ? 'bg-gray-800 hover:bg-gray-600' : 'hover:bg-gray-400'}`}>
                <td className="px-6 py-4">{user.matricule}</td>
                <td className="px-6 py-4">{user.nom}</td>
                <td className="px-6 py-4">{user.prenom}</td>
                <td className="px-6 py-4">{user.classe}</td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => setDeleteConfirm(user)}
                    className="text-red-500 hover:text-red-700 bg-red-200 py-2 px-3 rounded"
                  >
                    <FontAwesomeIcon icon={faTrash} /> Supprimer
                  </button>
                </td>
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

      {/* Modal Ajout */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className={`p-6 rounded shadow-lg space-y-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <h2 className="text-lg font-bold">Ajouter un utilisateur</h2>

            <input
              placeholder="Matricule"
              className={inputClass}
              value={newUser.matricule}
              onChange={e => {
                const value = e.target.value;
                if (validTextRegex.test(value)) {
                  setNewUser({ ...newUser, matricule: value });
                  setMatriculeError('');
                } else {
                  setMatriculeError('Caractère non autorisé');
                }
              }}
            />
            {matriculeError && <p className="text-red-500 text-sm mb-1">{matriculeError}</p>}

            <input
              placeholder="Nom"
              className={inputClass}
              value={newUser.nom}
              onChange={e => {
                const value = e.target.value;
                if (validTextRegex.test(value)) {
                  setNewUser({ ...newUser, nom: value });
                  setNomError('');
                } else {
                  setNomError('Caractère non autorisé');
                }
              }}
            />
            {nomError && <p className="text-red-500 text-sm mb-1">{nomError}</p>}

            <input
              placeholder="Prénom"
              className={inputClass}
              value={newUser.prenom}
              onChange={e => {
                const value = e.target.value;
                if (validTextRegex.test(value)) {
                  setNewUser({ ...newUser, prenom: value });
                  setPrenomError('');
                } else {
                  setPrenomError('Caractère non autorisé');
                }
              }}
            />
            {prenomError && <p className="text-red-500 text-sm mb-1">{prenomError}</p>}

            <input
              placeholder="Classe"
              className={inputClass}
              value={newUser.classe}
              onChange={e => setNewUser({ ...newUser, classe: e.target.value })}
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-400 text-white rounded">Annuler</button>
              <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded">{loading ? 'Ajout...' : 'Ajouter'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Suppression */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className={`p-6 rounded shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <h2 className="text-lg font-bold mb-4">Confirmer la suppression</h2>
            <p>Voulez-vous vraiment supprimer <strong>{deleteConfirm.nom} {deleteConfirm.prenom}</strong> ?</p>
            <div className="mt-4 flex justify-end gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="bg-gray-400 text-white px-4 py-2 rounded">Annuler</button>
              <button
                onClick={() => { if (deleteConfirm) handleDelete(deleteConfirm._id); setDeleteConfirm(null); }}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* 🔹 Modal Export */}
      {exportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className={`p-6 rounded shadow-lg space-y-4 w-96 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <h2 className="text-lg font-bold">Exporter les données</h2>

            <label className="block text-sm mb-2">Choisir le format :</label>
            <select
              value={exportFormat}
              onChange={e => setExportFormat(e.target.value as 'excel' | 'pdf')}
              className={inputClass}
            >
              <option value="excel">Excel (.xlsx)</option>
              <option value="pdf">PDF (.pdf)</option>
            </select>

            <div className="flex justify-end gap-2">
              <button onClick={() => setExportModal(false)} className="px-4 py-2 bg-gray-400 text-white rounded">Annuler</button>
              <button onClick={handleExport} className="px-4 py-2 bg-blue-600 text-white rounded">Exporter</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default UsersPage;
