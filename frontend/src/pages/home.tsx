import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faShieldAlt,
  faUserLock,
  faChartBar,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Button from "../components/ui/buttons/button";
import Header from "../components/Header";
import Footer from "../components/Footer";
import hero from '../assets/images/banner2.jpg';
import propos from '../assets/images/vote.jpg';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const features: [IconDefinition, string][] = [
    [faShieldAlt, 'Sécurité de niveau bancaire'],
    [faUserLock, 'Authentification renforcée'],
    [faChartBar, 'Résultats en temps réel'],
  ];

  return (
    <div className="relative min-h-screen bg-white flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Section Héros */}
        <section>
          <div
            className="relative h-[924px] bg-cover bg-center w-full"
            style={{ backgroundImage: `url(${hero})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent">
              <div className="max-w-7xl mx-auto px-6 h-full flex items-center">
                <div className="max-w-2xl text-white">
                  <h1 className="text-5xl font-bold mb-6">Votre Voix Compte</h1>
                  <p className="text-xl mb-8">
                    Participez à la démocratie numérique avec notre système de vote en ligne sécurisé et transparent.
                  </p>
                  <Button
                    onClick={() => navigate("/vote")}
                    className="!rounded-button whitespace-nowrap bg-white text-gray-900 hover:bg-blue-200 transform hover:scale-105 hover:shadow-lg active:scale-95"
                  >
                    Commencer à Voter
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section À propos */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row gap-16 items-center">
              <div className="w-full sm:w-1/2">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">À Propos de Notre Plateforme</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Notre système de vote en ligne combine sécurité avancée et facilité d'utilisation pour garantir un processus démocratique transparent et accessible à tous.
                </p>
                <div className="space-y-4">
                  {features.map(([icon, text], i) => (
                    <div key={i} className="flex items-center space-x-3 hover:translate-x-2 transition-transform">
                      <FontAwesomeIcon icon={icon} className="text-[#4A90E2] text-xl" />
                      <span className="text-gray-700">{text}</span>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => navigate("/vote")}
                  className="mt-8 !rounded-button text-white bg-gray-800 whitespace-nowrap transform hover:scale-105 hover:shadow-lg active:scale-95"
                >
                  Découvrir le Vote
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </Button>
              </div>

              <div
                className="w-full sm:w-1/2 relative h-[350px] rounded-lg overflow-hidden shadow-xl hover:scale-105 transition-transform"
                style={{
                  backgroundImage: `url(${propos})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '350px',
                  width: '100%',
                }}
              ></div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
