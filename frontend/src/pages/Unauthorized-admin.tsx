
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft,} from '@fortawesome/free-solid-svg-icons';
import Button from "../components/ui/buttons/button";
const Unauthorized = () => {
      const navigate = useNavigate();
  return (
    <div className="text-center mt-20 text-red-500 text-xl">
      <p>❌ Accès refusé. Vous n’êtes pas un utilisateur autorisé.</p>
        <Button
            onClick={() => navigate("/")}
            className="!rounded-button whitespace-nowrap bg-blue-500 text-gray-900 mt-[200px] hover:bg-blue-600 transform hover:scale-105 hover:shadow-lg active:scale-95"
            >
            <FontAwesomeIcon icon={faArrowLeft} className="ml-2 animate-bounce-left" />
            Cliquez ici pour retourner a la page d'acceuil
        </Button>
    </div>
  );
};

export default Unauthorized;
