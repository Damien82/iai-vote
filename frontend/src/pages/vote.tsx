import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/ui/buttons/button";
import VoteCard from "../components/VoteCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChartBar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

interface Parti {
  name: string;
  image: string;
  votes?: number;
}

const VotePage: React.FC = () => {
  const navigate = useNavigate();

  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [parties, setParties] = useState<Parti[]>([]);

  // Vérification de l'état du système
  useEffect(() => {
    fetch("https://iai-vote.onrender.com/api/system/getsystemstate")
      .then((res) => res.json())
      .then((data) => {
        setAllowed(data.isActive);
        setLoading(false);
      });
  }, []);

const handleVote = async (partyName: string) => {
  try {
    await fetch("https://iai-vote.onrender.com/api/partis/vote", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ partyName })
    });

    alert(`Vous avez voté pour ${ partyName}`);
  } catch (error) {
    alert("Impossible d'envoyer le vote, réessayez.");
  }
};


  // Récupération des partis
useEffect(() => {
  if (!allowed) return;
  const fetchParties = async () => {
    try {
      const res = await fetch("https://iai-vote.onrender.com/api/partissecond/getAllPartis");
      if (!res.ok) throw new Error(`Erreur HTTP ! status: ${res.status}`);
      const data = await res.json();
      console.log("Partis récupérés:", data); 
      const formattedParties = data.map((p: any) => ({
        name: p.name,   
        image: p.image,  
        votes: p.votes ?? 0
      }));
      setParties(formattedParties);
    } catch (error) {
      console.error("Erreur récupération partis:", error);
    }
  };
  fetchParties();
}, [allowed]);


  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="ml-5 font-bold">Chargement en cours...</p>
    </div>
  );

  if (!allowed) {
    return (
      <div>
        <p className="text-red-500 text-center mt-[350px]">La page n’est pas encore activée 🚫</p>
        <div className="flex justify-center items-center">
          <Button
            onClick={() => navigate("/")}
            className="!rounded-button whitespace-nowrap bg-blue-500 text-gray-900 mt-[50px] hover:bg-blue-600 transform hover:scale-105 hover:shadow-lg active:scale-95"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="ml-2 animate-bounce-left" />
            Retourner à la page d'accueil
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-16">
      <Header />
      <section className="py-24 bg-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Choisissez Votre Candidat</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-8">
            {parties.map((party, index) => (
              <VoteCard
                key={index}
                name={party.name || "Nom manquant"} 
                image={party.image || "https://via.placeholder.com/300"}
                onVote={() => handleVote(party.name)}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              onClick={() => navigate("/results")}
              className="!rounded-button bg-gray-700 text-white whitespace-nowrap transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Voir les Résultats
              <FontAwesomeIcon icon={faChartBar} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default VotePage;
