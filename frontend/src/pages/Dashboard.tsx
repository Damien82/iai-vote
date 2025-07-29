import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import DashboardContent from '../components/DashboardContent';
import ProfileContent from '../components/profileContent';
import PartisPage from '../components/gestionpartis';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth < 768); // contracté par défaut en mobile
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarCollapsed(mobile); // auto contracter en mobile
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSidebarExpanded = isMobile ? !sidebarCollapsed : !sidebarCollapsed || sidebarHovered;

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen((prev) => !prev);
  };

  const handleSidebarMouseEnter = () => {
    if (!isMobile && sidebarCollapsed) setSidebarHovered(true);
  };

  const handleSidebarMouseLeave = () => {
    if (!isMobile) setSidebarHovered(false);
  };

  // 🔁 Quand on clique sur un lien de la sidebar, on change de tab et ferme la sidebar (si mobile)
  const handleSetActiveTab = (id: string) => {
    setActiveTab(id);
    if (isMobile) {
      setSidebarCollapsed(true); // referme la sidebar automatiquement en mobile
    }
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
        setActiveTab={handleSetActiveTab} // 👈 fonction modifiée
        onMouseEnter={handleSidebarMouseEnter}
        onMouseLeave={handleSidebarMouseLeave}
        isMobile={isMobile}
      />

      {/* Overlay noir semi-transparent quand sidebar mobile est ouverte */}
      {isMobile && !sidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}

      <main
        className={`transition-all duration-300 mt-16 p-8`}
        style={{
          marginLeft: isMobile ? 0 : isSidebarExpanded ? '16rem' : '5rem', // 👈 gestion automatique de l'espace central
        }}
      >
        {activeTab === 'dashboard' && <DashboardContent darkMode={darkMode} />}
        {activeTab === 'profile' && <ProfileContent darkMode={darkMode} />}
        {activeTab === 'gestionpartis' && <PartisPage darkMode={darkMode} />}
      </main>
    </div>
  );
};

export default Dashboard;
