import React, { useState, useEffect } from 'react';

interface Parti {
  _id: string;
  nom: string;
  proprietaire: string;
  imageUrl: string;
}

interface EditPartiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: string, formData: FormData) => void;
  parti: Parti | null;
}

const EditPartiModal: React.FC<EditPartiModalProps> = ({ isOpen, onClose, onUpdate, parti }) => {
  const [nom, setNom] = useState('');
  const [proprietaire, setProprietaire] = useState('');
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (parti) {
      setNom(parti.nom);
      setProprietaire(parti.proprietaire);
      setImage(null); // reset image à chaque ouverture
    }
  }, [parti]);

  if (!isOpen || !parti) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('proprietaire', proprietaire);
    if (image) formData.append('image', image);

    onUpdate(parti._id, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className={`p-6 rounded-lg w-full max-w-md ${nom && proprietaire ? 'bg-white' : 'bg-gray-200'}`}
      >
        <h2 className="text-xl font-bold mb-4">Modifier le parti</h2>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Nom du parti"
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="text"
          value={proprietaire}
          onChange={(e) => setProprietaire(e.target.value)}
          placeholder="Nom du propriétaire"
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="mb-4"
        />
        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 rounded">
            Annuler
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPartiModal;
