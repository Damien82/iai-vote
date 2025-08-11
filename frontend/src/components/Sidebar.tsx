import logo from "../images/logo_iai.jpg"
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faUserCircle, faGavel,faUserGear,faUserShield } from '@fortawesome/free-solid-svg-icons';

interface SidebarProps {
  darkMode: boolean;
  isSidebarExpanded: boolean;
  activeTab: string;
  setActiveTab: (id: string) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isMobile: boolean; // Ajoute cette ligne
}

const menuItems = [
  { id: 'dashboard', name: 'Dashboard', icon: faChartBar },
  { id: 'profile', name: 'Profil', icon: faUserCircle },
  { id: 'gestionpartis', name: 'Gestion des partis', icon: faGavel },
  { id: 'gestionsutilisateurs', name: 'Gestion des utilisateurs', icon: faUserGear },
  { id: 'gestionsadmins', name: 'Gestion des administrateurs', icon: faUserShield },
];

const Sidebar: React.FC<SidebarProps> = ({
  darkMode,
  isSidebarExpanded,
  activeTab,
  setActiveTab,
  onMouseEnter,
  onMouseLeave,
  isMobile, // récupère la prop
}) => {
  return (
    <aside
      className={`fixed left-0 top-16 h-full ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border-r shadow-lg transition-all duration-300 z-40 ${
        isSidebarExpanded ? 'w-64' : 'w-20'
      } ${isMobile && !isSidebarExpanded ? 'translate-x-[-100%] md:translate-x-0' : 'translate-x-0'}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="p-4">
        <div className={`flex items-center ${isSidebarExpanded ? 'space-x-3' : 'justify-center'} mb-8`}>
          {/* Logo ou texte */}
          {isSidebarExpanded && (
            <span
              className={`font-bold text-lg ${
                darkMode ? 'text-white' : 'text-gray-900'
              } transition-opacity duration-300`}
            >     
              <div className="flex gap-3">
                <div> <img src={logo} alt="logo" className='w-[35px] rounded hover:scale-110 transition-transform'/> </div>
                <div>IAI-vote</div>
              </div>
            </span>
          )}
        </div>
        <nav className="space-y-2">
          <h2 className='text-gray-400 font-bold text-center border-b border-gray-400 my-5'>Menu</h2>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center ${
                isSidebarExpanded ? 'space-x-3' : 'justify-center'
              } p-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : darkMode
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FontAwesomeIcon icon={item.icon} size="lg" />
              {isSidebarExpanded && <span className="font-medium">{item.name}</span>}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
