import { useAppContext } from "../../app/AppContext";
import { CharacterProps } from "../Character/types";
import FighterItem from "./FighterItem";
import Modal from "./Modal";

const Lobby = ({
  attacker,
  opponent,
}: {
  attacker: CharacterProps;
  opponent: CharacterProps;
}) => {
  const context = useAppContext();

  return (
    <div>
      <button onClick={() => context.setAttacker(null)}>Retour</button>
      <div className="flex">
        <FighterItem fighter={attacker} />
        <FighterItem fighter={opponent} />
      </div>
      <Modal />
    </div>
  );
};

export default Lobby;
