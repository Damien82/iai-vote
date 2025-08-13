import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader"; // ✅ Assure-toi que ce fichier existe

interface RequireSuperAdminProps {
  children: ReactNode;
}

const RequireSuperAdmin = ({ children }: RequireSuperAdminProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // ✅ état de chargement

  useEffect(() => {
    const checkSuperAdminAccess = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/unauthorized");
        return;
      }

      const decodedToken = JSON.parse(atob(token.split('.')[1])); // décode le payload du JWT
      const matricule = decodedToken?.matricule;

      if (!matricule) {
        navigate("/unauthorized");
        return;
      }

      try {
        const response = await fetch("https://iai-vote.onrender.com/api/superadmins/verify-superadmin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ matricule }),
        });

        if (!response.ok) {
          navigate("/unauthorized");
          return;
        }

        setLoading(false); // ✅ On arrête le chargement si ok
      } catch (err) {
        console.error("Erreur réseau :", err);
        navigate("/unauthorized");
      }
    };

    checkSuperAdminAccess();
  }, [navigate]);

  if (loading) return <Loader />; // ✅ Affichage du loader pendant la vérif

  return <>{children}</>;
};

export default RequireSuperAdmin;
