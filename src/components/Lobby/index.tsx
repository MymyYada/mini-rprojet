import { useAppContext } from "../../app/AppContext";
import { findOpponent } from "../../app/utils";
import { CharacterProps } from "../Character/types";
import FighterItem from "./FighterItem";
import Modal from "./Modal";

const Lobby = ({ attacker }: { attacker: CharacterProps }) => {
  const context = useAppContext();
  return (
    <div>
      <div className="flex">
        <FighterItem fighter={attacker} />
        <FighterItem fighter={findOpponent(attacker, context.characters)} />
      </div>
      <Modal />
    </div>
  );
};

export default Lobby;
