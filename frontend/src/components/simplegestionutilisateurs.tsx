import React, { useEffect, useState } from 'react';
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
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [exportModal, setExportModal] = useState(false); // 🔹 nouveau modal
  const [exportFormat, setExportFormat] = useState<'excel' | 'pdf'>('excel');
  const [pdfTitle, setPdfTitle] = useState("Liste des utilisateurs");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(API_URL);
      const data: User[] = await res.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      console.error('Erreur lors du chargement des utilisateurs', err);
    }
  };

     // 🔹 Export Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredUsers.map(u => ({
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
  const exportToPDF = (filename: string, title: string) => {
    const doc = new jsPDF();
      // Ajouter un titre en haut
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(title, doc.internal.pageSize.getWidth() / 2, 15, { align: "center" });
    const tableData = filteredUsers.map(u => [u.matricule, u.nom, u.prenom, u.classe]);
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
    exportToPDF('Utilisateurs', pdfTitle);
    }
    setExportModal(false);
  };


  // Filtrer les non votants
  const showNonVoters = async () => {
    try {
      const res = await fetch('https://iai-vote.onrender.com/api/voters/voters-matricules');
      const votedMatricules: string[] = await res.json();
      const nonVoters = users.filter(user => !votedMatricules.includes(user.matricule));
      setFilteredUsers(nonVoters);
      setPdfTitle("Liste des utilisateurs ayant voté"); 
    } catch (err) {
      console.error('Erreur récupération non votants :', err);
    }
  };

  // Filtrer les votants
  const showVoters = async () => {
    try {
      const res = await fetch('https://iai-vote.onrender.com/api/voters/voters-matricules');
      const votedMatricules: string[] = await res.json();
      const voters = users.filter(user => votedMatricules.includes(user.matricule));
      setFilteredUsers(voters);
      setPdfTitle("Liste des utilisateurs ayant voté"); 
    } catch (err) {
      console.error('Erreur récupération votants :', err);
    }
  };

  const resetTable = () => setFilteredUsers(users);

  const displayedUsers = filteredUsers.filter(user =>
    `${user.nom} ${user.prenom} ${user.matricule}`.toLowerCase().includes(search.toLowerCase())
  );
  const inputClass = `w-full px-3 py-2 border rounded ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black'}`;
  const tableClass = `${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`;

  return (
    <div className={`p-4 space-y-6 ${darkMode ? 'bg-gray-900 text-white' : 'text-black'}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <input
          type="text"
          placeholder="Rechercher..."
          className={`px-4 py-2 rounded-lg border border-gray-600 w-full sm:w-1/2 focus:outline-blue ${darkMode ? 'bg-gray-800 text-white border-gray-600' : ''}`}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-row justify-center gap-6  tel:flex-col sm:flex-col lg:flex-col">
        <button
          onClick={showNonVoters}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Non votants
        </button>
        <button
          onClick={showVoters}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Votants
        </button>
        <button
          onClick={resetTable}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
        >
          Tables des utilisateurs
        </button>

        <button
            onClick={() => setExportModal(true)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            Exporter
          </button>
      </div>

      <div className={`overflow-x-auto border border-gray-300 rounded-lg shadow-lg ${darkMode ? 'border-gray-700' : ''}`}>
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
            {displayedUsers.map(user => (
              <tr key={user._id} className={`${darkMode ? 'bg-gray-800 hover:bg-gray-600' : 'hover:bg-gray-400'}`}>
                <td className="px-6 py-4">{user.matricule}</td>
                <td className="px-6 py-4">{user.nom}</td>
                <td className="px-6 py-4">{user.prenom}</td>
                <td className="px-6 py-4">{user.classe}</td>
              </tr>
            ))}
            {displayedUsers.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-400">
                  Aucun utilisateur trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
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
