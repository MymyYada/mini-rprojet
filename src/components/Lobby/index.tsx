import { findOpponent } from "../../app/utils";
import { CharacterProps } from "../Character/types";
import FighterItem from "./FighterItem";
import Modal from "./Modal";

const Lobby = ({
  characters,
  attacker,
}: {
  characters: CharacterProps[];
  attacker: CharacterProps;
}) => {
  return (
    <div>
      <div className="flex">
        <FighterItem {...attacker} />
        <FighterItem {...findOpponent(attacker, characters)} />
      </div>
      <Modal {...attacker} />
    </div>
  );
};

export default Lobby;
