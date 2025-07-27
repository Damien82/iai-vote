import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMoon, faSun, faUser, faCog, faSignOutAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface TopbarProps {
  darkMode: boolean;
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  userMenuOpen: boolean;
  toggleUserMenu: () => void;
}

const Topbar: React.FC<TopbarProps> = ({
  darkMode,
  toggleSidebar,
  toggleDarkMode,
  userMenuOpen,
  toggleUserMenu,
}) => {
  return (
    <header
      className={`fixed top-0 left-0 right-0 h-16 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border-b shadow-sm z-50 flex items-center justify-between px-6`}
    >
      <button
        onClick={toggleSidebar}
        className={`p-2 rounded-lg hover:${darkMode ? 'bg-gray-700' : 'bg-gray-100'} transition-colors duration-200`}
        aria-label="Toggle sidebar"
      >
        <FontAwesomeIcon icon={faBars} className={darkMode ? 'text-gray-300' : 'text-gray-600'} size="lg" />
      </button>

      <div className="flex items-center space-x-4">
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-lg hover:${darkMode ? 'bg-gray-700' : 'bg-gray-100'} transition-colors duration-200`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <FontAwesomeIcon icon={faSun} className="text-yellow-500" size="lg" />
          ) : (
            <FontAwesomeIcon icon={faMoon} className={darkMode ? 'text-gray-300' : 'text-gray-600'} size="lg" />
          )}
        </button>

        <div className="relative">
          <button
            onClick={toggleUserMenu}
            className={`flex items-center space-x-2 p-2 rounded-lg hover:${darkMode ? 'bg-gray-700' : 'bg-gray-100'} transition-colors duration-200`}
            aria-label="User menu"
          >
            <FontAwesomeIcon icon={faUser} className={darkMode ? 'text-gray-300' : 'text-gray-600'} size="lg" />
            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>Jean Dupont</span>
            <FontAwesomeIcon icon={faChevronDown} className={`ml-1 transform transition-transform duration-300 ${userMenuOpen ? 'rotate-180' : 'rotate-0'} ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} size="sm"
/>

          </button>

          {userMenuOpen && (
            <div
              className={`absolute right-0 top-full mt-2 w-64 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border rounded-xl shadow-lg py-2`}
            >
              <div className="px-4 py-3">
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Jean Dupont</p>
              </div>
              <hr className={`${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />
              <button
                className={`w-full flex items-center space-x-3 px-4 py-2 hover:${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                } transition-colors duration-200`}
              >
                <FontAwesomeIcon
                  icon={faCog}
                  className={darkMode ? 'text-gray-400' : 'text-gray-500'}
                  size="sm"
                />
                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Paramètres du compte</span>
              </button>
              <hr className={`${darkMode ? 'border-gray-700' : 'border-gray-200'} my-1`} />
              <button
                className={`w-full flex items-center space-x-3 px-4 py-2 hover:${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                } transition-colors duration-200`}
              >
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  className={darkMode ? 'text-gray-400' : 'text-gray-500'}
                  size="sm"
                />
                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Déconnexion</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
