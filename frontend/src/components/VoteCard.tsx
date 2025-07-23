import React from 'react';
import Button from "../components/ui/buttons/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVoteYea } from "@fortawesome/free-solid-svg-icons";

interface VoteCardProps {
  name: string;
  image: string;
  onVote?: () => void;
}

const VoteCard: React.FC<VoteCardProps> = ({ name, image, onVote }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
    <div className="h-[300px] relative overflow-hidden">
      <img src={image} alt={name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
    </div>
    <div className="p-6">
      <h3 className="text-xl text-center font-semibold text-gray-900 mb-4">{name}</h3>
      <Button
        className="w-full bg-gray-700 text-white !rounded-button whitespace-nowrap transition-all hover:scale-105 hover:shadow-lg active:scale-95"
        onClick={onVote}
      >
        Voter <FontAwesomeIcon icon={faVoteYea} className="text-[#4A90E2] text-2xl hover:scale-110 transition-transform"/>
      </Button>
    </div>
  </div>
);

export default VoteCard;
