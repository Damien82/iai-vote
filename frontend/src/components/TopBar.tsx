import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faMoon,
  faSun,
  faUser,
  faChevronDown,
  faSignOutAlt,
  faCog,
} from '@fortawesome/free-solid-svg-icons';


export type UserDatas = {
  nom: string;
  prenom: string;
  matricule: string;
};

interface TopbarProps {
  userDatas: UserDatas;
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  userMenuOpen: boolean;
  toggleUserMenu: () => void;
  darkMode: boolean;
}


const Topbar: React.FC<TopbarProps> = ({
  userDatas,
  darkMode,
  toggleSidebar,
  toggleDarkMode,
  userMenuOpen,
  toggleUserMenu,
}) => {
  return (
    <header
      className={`fixed top-0 left-0 right-0 h-16 z-50 px-6 flex items-center justify-between shadow-md transition-all duration-300 border-b ${
        darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      }`}
    >
      {/* Sidebar toggle */}
      <button
        onClick={toggleSidebar}
        className={`p-2 rounded-lg hover:scale-105 transition-transform ${
          darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
        }`}
        aria-label="Ouvrir la sidebar"
      >
        <FontAwesomeIcon icon={faBars} className={`${darkMode ? 'text-white' : 'text-gray-700'}`} />
      </button>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full transition ${
            darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
          }`}
          aria-label="Changer le thème"
        >
          <FontAwesomeIcon
            icon={darkMode ? faSun : faMoon}
            className={darkMode ? 'text-yellow-400' : 'text-gray-600'}
          />
        </button>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={toggleUserMenu}
            className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-sm transition ${
              darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <FontAwesomeIcon icon={faUser} className={`${darkMode ? 'text-white' : 'text-gray-700'}`} />
            <div className="text-left">
              <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {userDatas?.prenom || '...'} {userDatas?.nom || ''}
              </p>
            </div>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''} ${
                darkMode ? 'text-white' : 'text-gray-700'
              }`}
            />
          </button>

          {/* Dropdown */}
          {userMenuOpen && (
            <div
              className={`absolute right-0 mt-2 w-64 rounded-xl shadow-lg z-10 border ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              <div className="px-4 py-3">
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {(userDatas?.prenom || '?') } {(userDatas?.nom || '')}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Matricule : {userDatas?.matricule || '...'}
                </p>
              </div>
              <hr className={`${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />
              <button
                className={`w-full flex items-center gap-3 px-4 py-2 hover:${
                  darkMode ? 'bg-gray-700' : 'bg-gray-100'
                } transition`}
              >
                <FontAwesomeIcon icon={faCog} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
                <span className={`${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Paramètres</span>
              </button>
              <button
                className={`w-full flex items-center gap-3 px-4 py-2 hover:${
                  darkMode ? 'bg-gray-700' : 'bg-gray-100'
                } transition`}
              >
                <FontAwesomeIcon icon={faSignOutAlt} className={darkMode ? 'text-red-400' : 'text-red-600'} />
                <span className={`font-medium ${darkMode ? 'text-red-400' : 'text-red-600'}`}>Déconnexion</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
