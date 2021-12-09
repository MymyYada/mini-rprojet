import { useState } from "react";
import { useAppContext } from "../../app/AppContext";
import { rollADie } from "../../app/utils";
import { CharacterProps, StatProps } from "../Character/types";
import FighterItem from "./FighterItem";
import Modal from "./Modal";
import {
  DefendingProps,
  FightProps,
  TakeDamageProps,
  TurnProps,
} from "./types";

const Lobby = ({ attacker, opponent }: FightProps) => {
  const context = useAppContext();
  const [texts, setTexts] = useState<string[]>([]);
  const [round, setRound] = useState(1);
  const [endgame, setEndgame] = useState(false);
  const back = () => {
    context.setAttacker(null);
    context.setOpponent(null);
  };
  const alert = (text: string) => {
    setTexts([...texts, text]);
    console.log(text);
  };

  const attacking = ({ attacker, opponent }: FightProps) =>
    new Promise<number>((resolve) => {
      const action = () => {
        const dice = attacker.attack.value;
        const atk = rollADie(dice);
        const info = `- ${attacker.name} attaque ${opponent.name} (1D${dice}: ${atk}).`;

        alert(info);
        resolve(atk);
      };
      setTimeout(action, 1000);
    });

  const defending = ({ opponent, atk }: DefendingProps) =>
    new Promise<number>((resolve) => {
      const action = () => {
        const def = opponent.defense.value;
        const info = `- ${opponent.name} se défend (dmg:${atk} - def:${def}).`;

        alert(info);
        resolve(Math.max(0, atk - def));
      };
      setTimeout(action, 1000);
    });

  const takeDamage = ({
    attacker,
    opponent,
    damage,
    strikeback,
  }: TakeDamageProps) =>
    new Promise<CharacterProps>((resolve) => {
      const action = () => {
        const info = `- Mais ${opponent.name} est blessé ! (-${damage} health).`;
        const infoMag = `- La magie de ${attacker.name} affecte ${opponent.name} ! (-${damage} health).`;
        const mag = attacker.magik.value;
        let newOpponent;

        alert(info);

        if (damage === mag) {
          alert(infoMag);
          damage = damage * 2;
        }
        newOpponent = {
          ...opponent,
          health: {
            ...opponent.health,
            value: Math.max(0, opponent.health.value - damage),
          },
        };
        strikeback
          ? context.setAttacker(newOpponent)
          : context.setOpponent(newOpponent);

        resolve(newOpponent);
      };
      setTimeout(action, 1000);
    });

  const checkEndgame = ({ attacker, opponent }: FightProps) =>
    new Promise<Boolean>((resolve) => {
      const action = () => {
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
        }

        resolve(defeated);
      };
      setTimeout(action, 1000);
    });

  const runTurn = ({ attacker, opponent, strikeback }: TurnProps) =>
    new Promise<Boolean>((resolve) => {
      const action = () => {
        const info = `Tour de ${attacker.name} :`;

        alert(info);

        attacking({ attacker, opponent }).then((atk) =>
          defending({ opponent, atk }).then((damage) =>
            takeDamage({ attacker, opponent, damage, strikeback }).then(
              (newOpponent) =>
                resolve(checkEndgame({ attacker, opponent: newOpponent }))
            )
          )
        );
      };
      setTimeout(action, 1000);
    });

  const runRound = () => {
    const info = `Round ${round} :`;

    alert(info);

    runTurn({ attacker, opponent })
      .then((endgame) => {
        if (!endgame)
          runTurn({
            attacker: opponent,
            opponent: attacker,
            strikeback: true,
          });
        else setEndgame(true);
      })
      .then(() => setRound(round + 1));
  };

  return (
    <div>
      <div className="flex">
        <FighterItem fighter={attacker} />
        <FighterItem fighter={opponent} />
      </div>
      <Modal texts={texts} />
      {endgame ? (
        <button className="mx-4" onClick={back}>
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
