import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const choixrole: React.FC = () => {
  const navigate = useNavigate();

  // choix rôle
  const handleRoleSelect = (role: string) => {
    switch (role) {
      case "Étudiant":
        navigate("/Connexion");
        break;
      case "Administrateur":
        navigate("/ConnexionAD"); 
        break;
      case "SuperAdministrateur":
        navigate("/ConnexionSAD"); 
        break;
      default:
        break;
    }
  };

  return (
    <div className=" sm:py-5 h-screen w-full bg-gray-200 flex flex-col justify-center items-center px-6">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
        Bienvenue sur la plateforme IAI-vote !
      </h2>
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
        Qui êtes-vous ?
      </h2>
      <div className="flex justify-center gap-12 flex-wrap">
        <div
          onClick={() => handleRoleSelect("Étudiant")}
          className="w-[200px] h-[200px] bg-blue-400 rounded-xl shadow-md flex items-center justify-center text-xl font-semibold text-black cursor-pointer hover:scale-105 transition-transform duration-300"
        >
            <div className='flex flex-col'>
                <FontAwesomeIcon icon={faUserGraduate} className="text-4xl mb-4 text-black" />
                Étudiant
            </div>
        </div>

        <div
          onClick={() => handleRoleSelect("Administrateur")}
          className="w-[200px] h-[200px] bg-blue-400 rounded-xl shadow-md flex items-center justify-center text-xl font-semibold text-black cursor-pointer hover:scale-105 transition-transform duration-300"
        >
            <div className='flex flex-col'>
                <FontAwesomeIcon icon={faUserShield} className="text-4xl mb-4 text-black" />
                Administrateur
            </div>
        </div>

        <div
          onClick={() => handleRoleSelect("SuperAdministrateur")}
          className="w-[200px] h-[200px] bg-blue-400 rounded-xl shadow-md flex items-center justify-center text-xl font-semibold text-black cursor-pointer hover:scale-105 transition-transform duration-300"
        >
            <div className='flex flex-col'>
                <FontAwesomeIcon icon={faUserShield} className="text-4xl mb-4 text-black" />
                <div className="text-center">Super Administrateur</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default choixrole;
