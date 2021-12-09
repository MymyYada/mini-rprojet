import { useState } from "react";
import { useAppContext } from "../../app/AppContext";
import { rollADie } from "../../app/utils";
import { StatProps } from "../Character/types";
import FighterItem from "./FighterItem";
import Modal from "./Modal";
import { DefendingProps, FightProps, TakeDamageProps } from "./types";

const Lobby = ({ attacker, opponent }: FightProps) => {
  const context = useAppContext();
  const [texts, setTexts] = useState<string[]>([]);
  const [round, setRound] = useState(1);
  const [endgame, setEndgame] = useState(false);
  const alert = (text: string) => {
    setTexts([...texts, text]);
  };

  const attacking = ({ attacker, opponent }: FightProps) => {
    const nbFace = attacker.attack.value;
    const atk = rollADie(nbFace);
    const info = `- ${attacker.name} attaque ${opponent.name} (1D${nbFace}: ${atk}).`;

    alert(info);
    console.log(info);

    return atk;
  };

  const defending = ({ opponent, atk }: DefendingProps) => {
    const def = opponent.defense.value;
    const info = `- ${opponent.name} se défend (dmg:${atk} - def:${def}).`;

    alert(info);
    console.log(info);

    return Math.max(0, atk - def);
  };

  const takeDamage = ({ attacker, opponent, damage }: TakeDamageProps) => {
    const info = `- Mais ${opponent.name} est blessé ! (-${damage} health).`;
    const infoMag = `- La magie de ${attacker.name} affecte ${opponent.name} ! (-${damage} health).`;
    const mag = attacker.magik.value;

    alert(info);
    console.log(info);

    if (damage === mag) {
      alert(infoMag);
      console.log(infoMag);
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

  const checkEndgame = ({ attacker, opponent }: FightProps) => {
    const info = `${opponent.name} est vaincu !`;
    const defeated = opponent.health.value === 0;
    const healing = (health: StatProps) => {
      return {
        ...health,
        value: health.max_value ? health.max_value : health.value,
      };
    };

    if (defeated) {
      alert(info);
      console.log(info);

      context.updateCharacter({
        ...attacker,
        rank: attacker.rank + 1,
        skill_pts: attacker.skill_pts + 1,
        health: healing(attacker.health),
      });
      context.updateCharacter({
        ...opponent,
        rank: Math.max(1, opponent.rank - 1),
        health: healing(opponent.health),
      });
      setEndgame(true);
    }
  };

  const runTurn = ({
    attacker,
    opponent,
    strikeback,
  }: FightProps & { strikeback?: Boolean }) => {
    const info = `Tour de ${attacker.name} :`;
    let atk;
    let damage;

    alert(info);
    console.log(info);

    atk = attacking({ attacker, opponent });
    damage = defending({ opponent, atk });

    if (damage > 0) {
      let newOpponent = takeDamage({ attacker, opponent, damage });
      strikeback
        ? context.setAttacker(newOpponent)
        : context.setOpponent(newOpponent);
      checkEndgame({ attacker, opponent: newOpponent });
    }
  };

  const runRound = () => {
    const info = `Round ${round} :`;

    alert(info);
    console.log(info);

    runTurn({ attacker, opponent });
    if (!endgame)
      runTurn({
        attacker: opponent,
        opponent: attacker,
        strikeback: true,
      });

    console.log(texts);
    setRound(round + 1);
  };

  return (
    <div>
      <div className="flex">
        <FighterItem fighter={attacker} />
        <FighterItem fighter={opponent} />
      </div>
      <Modal texts={texts} />
      {endgame ? (
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
