import React from "react";
import ProfilpageContent from "../components/ProfilpageContent";

interface ProfilpageProps {
  darkMode: boolean;
}

const Profilpage: React.FC<ProfilpageProps> = ({ darkMode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <ProfilpageContent darkMode={darkMode} />
    </div>
  );
};

export default Profilpage;
