import { useState } from "react";
import { useAppContext } from "../../app/AppContext";
import { rollADie } from "../../app/utils";
import FighterItem from "./FighterItem";
import Modal from "./Modal";
import { DefendingProps, FightProps, TakeDamageProps } from "./types";

const Lobby = ({ attacker, opponent }: FightProps) => {
  const context = useAppContext();
  const [texts, setTexts] = useState<string[]>([]);
  const [round, setRound] = useState(1);
  const alert = (text: string) => {
    setTexts([...texts, text]);
  };
  const attacking = ({ attacker, opponent }: FightProps) => {
    const nbFace = attacker.attack.value;
    const atk = rollADie(nbFace);

    alert(`${attacker.name} attaque ${opponent.name} (1D${nbFace}: ${atk}).`);
    console.log(
      `${attacker.name} attaque ${opponent.name} (1D${nbFace}: ${atk}).`
    );

    return atk;
  };
  const defending = ({ opponent, atk }: DefendingProps) => {
    const def = opponent.defense.value;

    alert(`${opponent.name} se défend (${atk}-${def}).`);
    console.log(`${opponent.name} se défend (${atk}-${def}).`);

    return Math.max(0, atk - def);
  };
  const takeDamage = ({ opponent, damage }: TakeDamageProps) => {
    alert(`Mais ${opponent.name} est blessé ! (-${damage} health).`);
    console.log(`Mais ${opponent.name} est blessé ! (-${damage} health).`);

    return {
      ...opponent,
      health: {
        ...opponent.health,
        value: Math.max(0, opponent.health.value - damage),
      },
    };
  };
  const isDefeated = (opponent: FightProps["opponent"]) => {
    const defeated = opponent.health.value === 0;

    if (defeated) {
      alert(`${opponent.name} est vaincu !`);
      console.log(`${opponent.name} est vaincu !`);
    }

    return defeated;
  };
  const runTurn = ({ attacker, opponent }: FightProps) => {
    let atk;
    let damage;

    atk = attacking({ attacker, opponent });
    damage = defending({ opponent, atk });

    if (damage > 0) {
      return takeDamage({ opponent, damage });
    }
  };
  const runRound = () => {
    let newOpponent;
    let newAttacker;

    if (context.opponent === null || context.attacker === null) return;

    alert(`Round ${round} :`);
    console.log(`Round ${round} :`);

    newOpponent = runTurn({ attacker, opponent });
    if (newOpponent) context.setOpponent(newOpponent);
    if (isDefeated(context.opponent)) {
      //fin de combat
    } else {
      newAttacker = runTurn({ attacker: context.opponent, opponent: attacker });
      if (newAttacker) context.setAttacker(newAttacker);
      if (isDefeated(context.attacker)) {
        //fin de combat
      }
    }

    setRound(round + 1);
  };

  return (
    <div>
      <button
        onClick={() => {
          context.setAttacker(null);
          context.setOpponent(null);
        }}
      >
        Retour
      </button>
      <div className="flex">
        <FighterItem fighter={attacker} />
        <FighterItem fighter={opponent} />
      </div>
      <Modal texts={texts} />
      <button className="mx-4" onClick={runRound}>
        Attaquer
      </button>
    </div>
  );
};

export default Lobby;
