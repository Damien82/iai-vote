import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faShieldAlt,
  faUserShield,
  faVoteYea,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-white py-16 mt-20">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-wrap justify-between gap-8 md:flex-row">
        {/* Logo + description */}
        <div className="md:w-full">
          <Link to="/" className="flex items-center space-x-2 mb-6 cursor-pointer">
           <FontAwesomeIcon
             icon={faVoteYea}
             className="text-[#4A90E2] text-2xl hover:scale-110 transition-transform"
            />
            <span className="text-xl font-semibold">VoteIAI</span>
          </Link>
          <p className="text-gray-400">
            Plateforme de vote en ligne sécurisée pour une démocratie moderne.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Navigation</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link
                to="/"
                className="hover:text-white transition-all hover:translate-x-1 block"
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link
                to="/vote"
                className="hover:text-white transition-all hover:translate-x-1 block"
              >
                Voter
              </Link>
            </li>
            <li>
              <Link
                to="/results"
                className="hover:text-white transition-all hover:translate-x-1 block"
              >
                Résultats
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-gray-400">
            <li>contact@voteIAI.cmr</li>
            <li>+237 73720992</li>
            <li>Yaoundé, Cameroun</li>
          </ul>
        </div>

        {/* Sécurité */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Sécurité</h4>
          <div className="flex space-x-4">
            <FontAwesomeIcon
              icon={faLock}
              className="text-[#4A90E2] text-2xl cursor-pointer transform transition-all duration-300 hover:scale-110"
            />
            <FontAwesomeIcon
              icon={faShieldAlt}
              className="text-[#4A90E2] text-2xl cursor-pointer transform transition-all duration-300 hover:scale-110"
            />
            <FontAwesomeIcon
              icon={faUserShield}
              className="text-[#4A90E2] text-2xl cursor-pointer transform transition-all duration-300 hover:scale-110"
            />
          </div>
        </div>
      </div>

      {/* Séparateur */}
      <div className="h-px bg-gray-800 my-8" />

      {/* Bas de page */}
      <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 space-y-4 md:space-y-0">
        <p>© 2025 VoteIAI. Tous droits réservés.</p>
        <div className="flex space-x-4">
          <FontAwesomeIcon
            icon={faFacebookF}
            className="hover:text-blue-500 transition-transform transform hover:scale-110"
            aria-label="Facebook"
          />
          <FontAwesomeIcon
            icon={faTwitter}
            className="hover:text-blue-500 transition-transform transform hover:scale-110"
            aria-label="Twitter"
          />
          <FontAwesomeIcon
            icon={faLinkedinIn}
            className="hover:text-blue-500 transition-transform transform hover:scale-110"
            aria-label="LinkedIn"
          />
        </div>
      </div>
    </div>
  </footer>
);

export default Footer; 