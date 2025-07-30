import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/TopBar';
import DashboardContent from '../components/DashboardContent';
import ProfileContent from '../components/ProfileContent';
import PartisPage from '../components/gestionpartis';

interface UserData {
  nom: string;
  prenom: string;
  classe: string;
  role: string;
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth < 768);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarCollapsed(mobile);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Chargement des données user au montage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorUser("Utilisateur non connecté");
      setLoadingUser(false);
      return;
    }

    fetch('https://iai-vote.onrender.com/api/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const errData = await res.json().catch(() => null);
          throw new Error(errData?.message || 'Erreur lors du chargement du profil');
        }
        return res.json();
      })
      .then(data => {
        // Adapter en fonction de la structure renvoyée par ton API
        setUserData({
          nom: data.nom,
          prenom: data.prenom,
          classe: data.classe,
          role: data.role,
        });
        setErrorUser(null);
      })
      .catch(err => {
        setErrorUser(err.message);
        setUserData(null);
      })
      .finally(() => {
        setLoadingUser(false);
      });
  }, []);

  const isSidebarExpanded = isMobile ? !sidebarCollapsed : !sidebarCollapsed || sidebarHovered;

  const toggleSidebar = () => setSidebarCollapsed(prev => !prev);
  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const toggleUserMenu = () => setUserMenuOpen(prev => !prev);
  const handleSidebarMouseEnter = () => { if (!isMobile && sidebarCollapsed) setSidebarHovered(true); };
  const handleSidebarMouseLeave = () => { if (!isMobile) setSidebarHovered(false); };
  const handleSetActiveTab = (id: string) => {
    setActiveTab(id);
    if (isMobile) setSidebarCollapsed(true);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Topbar
        darkMode={darkMode}
        toggleSidebar={toggleSidebar}
        toggleDarkMode={toggleDarkMode}
        userMenuOpen={userMenuOpen}
        toggleUserMenu={toggleUserMenu}
      />

      <Sidebar
        darkMode={darkMode}
        isSidebarExpanded={isSidebarExpanded}
        activeTab={activeTab}
        setActiveTab={handleSetActiveTab}
        onMouseEnter={handleSidebarMouseEnter}
        onMouseLeave={handleSidebarMouseLeave}
        isMobile={isMobile}
      />

      {isMobile && !sidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}

      <main
        className="transition-all duration-300 mt-16 p-8"
        style={{ marginLeft: isMobile ? 0 : isSidebarExpanded ? '16rem' : '5rem' }}
      >
        {activeTab === 'dashboard' && <DashboardContent darkMode={darkMode} />}

        {activeTab === 'profile' && (
          loadingUser ? (
            <p className="text-center text-gray-500">Chargement du profil...</p>
          ) : errorUser ? (
            <p className="text-center text-red-500">{errorUser}</p>
          ) : userData ? (
            <ProfileContent darkMode={darkMode} userData={userData} />
          ) : (
            <p className="text-center text-gray-500">Aucune donnée utilisateur</p>
          )
        )}

        {activeTab === 'gestionpartis' && <PartisPage darkMode={darkMode} />}
      </main>
    </div>
  );
};

export default Dashboard;
