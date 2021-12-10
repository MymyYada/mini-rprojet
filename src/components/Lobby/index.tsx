import { useState } from "react";
import { useAppContext } from "../../app/AppContext";
import { healing, hurting, rollADie } from "../../app/utils";
import FighterItem from "./FighterItem";
import Modal from "./Modal";
import { FightProps, ReportProps } from "./types";

const Lobby = ({ attacker, opponent }: FightProps) => {
  const context = useAppContext();
  const [texts, setTexts] = useState<string[]>([]);
  const [round, setRound] = useState(1);
  const [endgame, setEndgame] = useState(false);

  const runRound = () => {
    alert(`Round ${round} :`);

    runTurn({ attacker, opponent })
      .then((report) => runTurn(report).catch((report) => runEnd(report)))
      .catch((report) => runEnd(report))
      .then(() => setRound(round + 1));
  };

  const runTurn = (report: ReportProps) =>
    new Promise<ReportProps>((resolve) => {
      const action = () => {
        alert(`Tour de ${report.attacker.name} :`);

        attacking(report)
          .then((report) => defending(report))
          .then((report) => takeDamage(report))
          .then((report) => takeExtraDamage(report))
          .then((report) => resolve(repeatOrNot(report)));
      };
      setTimeout(action, 1000);
    });

  const runEnd = ({ attacker, opponent }: FightProps) =>
    new Promise(() => {
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
    });

  const attacking = ({ damage, ...report }: ReportProps) =>
    new Promise<ReportProps>((resolve) => {
      const action = () => {
        const dice = report.attacker.attack.value;
        const atk = rollADie(dice);
        const info = `- ${report.attacker.name} attaque ${report.opponent.name} (1D${dice}: ${atk}).`;

        alert(info);
        resolve({ damage: atk, ...report });
      };
      setTimeout(action, 1000);
    });

  const defending = ({ damage = 0, ...report }: ReportProps) =>
    new Promise<ReportProps>((resolve) => {
      const action = () => {
        const def = report.opponent.defense.value;
        const info = `- ${report.opponent.name} se défend (dmg:${damage} - def:${def}).`;

        alert(info);
        resolve({ damage: Math.max(0, damage - def), ...report });
      };
      setTimeout(action, 1000);
    });

  const takeDamage = ({ opponent, damage = 0, ...report }: ReportProps) =>
    new Promise<ReportProps>((resolve) => {
      const action = () => {
        const info = `- Mais ${opponent.name} est blessé ! (-${damage} health).`;
        let newOpponent;

        if (damage > 0) {
          alert(info);

          newOpponent = {
            ...opponent,
            health: hurting(opponent.health, damage),
          };
          report.strikeback
            ? context.setAttacker(newOpponent)
            : context.setOpponent(newOpponent);
        }

        resolve({ opponent: newOpponent || opponent, ...report });
      };
      setTimeout(action, 1000);
    });

  const takeExtraDamage = ({ opponent, damage = 0, ...report }: ReportProps) =>
    new Promise<ReportProps>((resolve) => {
      const action = () => {
        const mag = report.attacker.magik.value;
        const info = `- La magie de ${report.attacker.name} affecte ${opponent.name} ! (-${damage} health).`;
        let newOpponent;

        if (damage > 0 && damage === mag) {
          alert(info);

          newOpponent = {
            ...opponent,
            health: hurting(opponent.health, damage),
          };
          report.strikeback
            ? context.setAttacker(newOpponent)
            : context.setOpponent(newOpponent);
        }

        resolve({ opponent: newOpponent || opponent, ...report });
      };
      setTimeout(action, 1000);
    });

  const repeatOrNot = ({ attacker, opponent, strikeback }: ReportProps) =>
    new Promise<ReportProps>((resolve, reject) => {
      const action = () => {
        const defeated = opponent.health.value === 0;

        if (defeated) {
          alert(`${opponent.name} est vaincu !`);

          reject({ attacker, opponent });
        } else
          resolve({
            attacker: opponent,
            opponent: attacker,
            strikeback: !strikeback,
          });
      };
      setTimeout(action, 1000);
    });

  const back = () => {
    context.setAttacker(null);
    context.setOpponent(null);
  };
  const alert = (text: string) => setTexts((prevTexts) => [...prevTexts, text]);

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
