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
  const [end, setEnd] = useState(false);
  const alert = (text: string) => {
    setTexts([...texts, text]);
  };
  const attacking = ({ attacker, opponent }: FightProps) => {
    const nbFace = attacker.attack.value;
    const atk = rollADie(nbFace);

    alert(`- ${attacker.name} attaque ${opponent.name} (1D${nbFace}: ${atk}).`);
    console.log(
      `- ${attacker.name} attaque ${opponent.name} (1D${nbFace}: ${atk}).`
    );

    return atk;
  };
  const defending = ({ opponent, atk }: DefendingProps) => {
    const def = opponent.defense.value;

    alert(`- ${opponent.name} se défend (dmg:${atk} - def:${def}).`);
    console.log(`- ${opponent.name} se défend (dmg:${atk} - def:${def}).`);

    return Math.max(0, atk - def);
  };
  const takeDamage = ({ attacker, opponent, damage }: TakeDamageProps) => {
    const mag = attacker.magik.value;

    alert(`- Mais ${opponent.name} est blessé ! (-${damage} health).`);
    console.log(`- Mais ${opponent.name} est blessé ! (-${damage} health).`);

    if (damage === mag) {
      alert(
        `- La magie de ${attacker.name} affecte ${opponent.name} ! (-${damage} health).`
      );
      console.log(
        `- La magie de ${attacker.name} affecte ${opponent.name} ! (-${damage} health).`
      );
      damage = damage * 2;
    }

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
      return takeDamage({ attacker, opponent, damage });
    }
  };
  const runRound = () => {
    let newOpponent;
    let newAttacker;

    if (context.opponent === null || context.attacker === null) return;

    alert(`Round ${round} :`);
    console.log(`Round ${round} :`);

    alert(`Tour de ${attacker.name} :`);
    console.log(`Tour de ${attacker.name} :`);

    newOpponent = runTurn({ attacker, opponent });
    if (newOpponent) context.setOpponent(newOpponent);
    if (newOpponent && isDefeated(newOpponent)) {
      context.updateCharacter({
        ...attacker,
        rank: attacker.rank + 1,
        skill_pts: attacker.skill_pts + 1,
        health: {
          ...attacker.health,
          value: attacker.health.max_value
            ? attacker.health.max_value
            : attacker.health.value,
        },
      });
      context.updateCharacter({
        ...newOpponent,
        rank: Math.max(1, newOpponent.rank - 1),
        health: {
          ...newOpponent.health,
          value: newOpponent.health.max_value
            ? newOpponent.health.max_value
            : newOpponent.health.value,
        },
      });
      setEnd(true);
    } else {
      alert(`Tour de ${opponent.name} :`);
      console.log(`Tour de ${opponent.name} :`);

      newAttacker = runTurn({ attacker: context.opponent, opponent: attacker });
      if (newAttacker) context.setAttacker(newAttacker);
      if (newAttacker && isDefeated(newAttacker)) {
        context.updateCharacter({
          ...newAttacker,
          rank: Math.max(1, newAttacker.rank - 1),
          health: {
            ...newAttacker.health,
            value: newAttacker.health.max_value
              ? newAttacker.health.max_value
              : newAttacker.health.value,
          },
        });
        context.updateCharacter({
          ...opponent,
          rank: opponent.rank + 1,
          skill_pts: opponent.skill_pts + 1,
          health: {
            ...opponent.health,
            value: opponent.health.max_value
              ? opponent.health.max_value
              : opponent.health.value,
          },
        });
        setEnd(true);
      }
    }

    setRound(round + 1);
  };

  return (
    <div>
      <div className="flex">
        <FighterItem fighter={attacker} />
        <FighterItem fighter={opponent} />
      </div>
      <Modal texts={texts} />
      {end ? (
        <button
          onClick={() => {
            context.setAttacker(null);
            context.setOpponent(null);
          }}
        >
          Retour
        </button>
      ) : (
        <button className="mx-4" onClick={runRound}>
          Attaquer
        </button>
      )}
    </div>
  );
};

export default Lobby;
