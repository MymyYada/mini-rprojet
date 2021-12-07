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
  return (
    <div>
      <div className="flex">
        <FighterItem {...attacker} />
        <FighterItem {...opponent} />
      </div>
      <Modal />
    </div>
  );
};

export default Lobby;
