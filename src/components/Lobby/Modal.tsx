import { useAppContext } from "../../app/AppContext";
import { rollADie } from "../../app/utils";

const Modal = () => {
  const context = useAppContext();

  return (
    <div>
      <button
        className="mx-4"
        onClick={() =>
          context.attacker !== null && rollADie(context.attacker.attack.value)
        }
      >
        Lancer un dé (test)
      </button>
    </div>
  );
};

export default Modal;
