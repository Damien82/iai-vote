import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/ui/buttons/button";
import VoteCard from "../components/VoteCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import { parties } from "../data/parties";
import { useNavigate } from "react-router-dom";

const VotePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <section className="py-24 bg-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Choisissez Votre Candidat</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-8">
            {parties.map((party, index) => (
              <VoteCard
                key={index}
                name={party.name}
                image={party.image}
                onVote={() => alert(`Vous avez voté pour ${party.name}`)}
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default VotePage;
