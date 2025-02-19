import { useState } from "react";
import { useAppContext } from "../../app/AppContext";
import { ActionIcons as icons } from "../../app/icons";
import { expUpdate, healing, hurting, rollADie } from "../../app/utils";
import Button from "../Button";
import Fighter from "./Fighter";
import Journal from "./Journal";
import { FightProps, ReportProps } from "./types";

const Lobby = ({ attacker, opponent }: FightProps) => {
  const context = useAppContext();
  const [texts, setTexts] = useState<string[]>([]);
  const [round, setRound] = useState(1);
  const [loading, setLoading] = useState(false);

  const runRound = () => {
    alert(`Round ${round} :`);
    setLoading(true);

    runTurn({ attacker, opponent })
      .then((report) => runTurn(report).catch((report) => runEnd(report)))
      .catch((report) => runEnd(report))
      .then(() => {
        setRound(round + 1);
        setLoading(false);
      });
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
        skill_pts: expUpdate(attacker.skill_pts, +1),
        health: healing(attacker.health),
      });
      context.updateCharacter({
        ...opponent,
        rank: Math.max(1, opponent.rank - 1),
        health: healing(opponent.health),
      });

      setRound(0);
    });

  const attacking = ({ damage, ...report }: ReportProps) =>
    new Promise<ReportProps>((resolve) => {
      const action = () => {
        const dice = report.attacker.attack.value;
        const atk = rollADie(dice);
        const info = `${report.attacker.name} attaque ${report.opponent.name} (1D${dice}: ${atk}).`;

        alert(info);
        resolve({ damage: atk, ...report });
      };
      setTimeout(action, 1000);
    });

  const defending = ({ damage = 0, ...report }: ReportProps) =>
    new Promise<ReportProps>((resolve) => {
      const action = () => {
        const def = report.opponent.defense.value;
        const info = `${report.opponent.name} se défend (dmg:${damage} - def:${def}).`;

        alert(info);
        resolve({ damage: Math.max(0, damage - def), ...report });
      };
      setTimeout(action, 1000);
    });

  const takeDamage = ({ opponent, damage = 0, ...report }: ReportProps) =>
    new Promise<ReportProps>((resolve) => {
      const action = () => {
        const info = `Mais ${opponent.name} est blessé ! (-${damage} health).`;

        if (damage > 0) {
          alert(info);

          opponent = {
            ...opponent,
            health: hurting(opponent.health, damage),
          };
          context.updateFighter(opponent);
        }

        resolve({ opponent, ...report });
      };
      setTimeout(action, 1000);
    });

  const takeExtraDamage = ({ opponent, damage = 0, ...report }: ReportProps) =>
    new Promise<ReportProps>((resolve) => {
      const action = () => {
        const mag = report.attacker.magik.value;
        const info = `La magie de ${report.attacker.name} affecte ${opponent.name} ! (-${damage} health).`;

        if (damage > 0 && damage === mag) {
          alert(info);

          opponent = {
            ...opponent,
            health: hurting(opponent.health, damage),
          };
          context.updateFighter(opponent);
        }

        resolve({ opponent, ...report });
      };
      setTimeout(action, 1000);
    });

  const repeatOrNot = ({ attacker, opponent }: ReportProps) =>
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
          });
      };
      setTimeout(action, 1000);
    });

  const back = () => context.setFighters([]);
  const alert = (text: string) => setTexts((prevTexts) => [...prevTexts, text]);

  return (
    <div className="flex flex-1 p-10 items-center justify-center">
      <div className="flex">
        <div>
          <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
            <Fighter fighter={attacker} />
            <Fighter fighter={opponent} />
          </ul>
          {round === 0 ? (
            <Button label="Retour" onClick={back} />
          ) : (
            <div className="flex gap-2">
              <Button
                label="Attaquer"
                icon={icons.runRound}
                onClick={runRound}
                disabled={loading}
              />
              <Button
                label="Fuir"
                icon={icons.flee}
                onClick={back}
                disabled={loading}
              />
            </div>
          )}
        </div>
        <Journal texts={texts} />
      </div>
    </div>
  );
};

export default Lobby;
