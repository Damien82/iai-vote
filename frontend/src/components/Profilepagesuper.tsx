import React, { useEffect, useState } from "react";
import ProfileContent from "./SuperProfileContent";

interface UserData {
  matricule: string;
  nom: string;
  prenom: string;
  classe: string;
  role: string;
}

const ProfilePageSuper = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token récupéré :", token);
    if (!token) return;

    fetch("https://iai-vote.onrender.com/api/superadmins/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    
      .then(async (res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement du profile");
        const data = await res.json();
          console.log("Profil reçu :", data); 
        setUserData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  

  if (!userData) return <p className="text-center text-gray-500">Chargement...</p>;

  return <ProfileContent userData={userData} darkMode={false} />;

};

export default ProfilePageSuper;
