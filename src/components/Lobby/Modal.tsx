import { rollADie } from "../../app/utils";
import { CharacterProps } from "../Character/types";

const Modal = (character: CharacterProps) => {
  return (
    <div>
      <button className="mx-4" onClick={() => rollADie(character.attack.value)}>
        Lancer un dé (test)
      </button>
    </div>
  );
};

export default Modal;
