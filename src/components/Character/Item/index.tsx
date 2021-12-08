import { DateTime } from "luxon";
import { useState } from "react";
import { useAppContext } from "../../../app/AppContext";
import { ChangeProps, CharacterProps } from "../types";
import Stat from "./Stat";

const CharacterItem = ({ ...characterProps }: CharacterProps) => {
  const context = useAppContext();
  const [character, setCharacter] = useState({ ...characterProps });
  const [characterTemp, setCharacterTemp] = useState({ ...characterProps });
  const changeCallback = ({ newStat, cost }: ChangeProps) => {
    const newSkillPts = character.skill_pts - cost;
    const minStat = characterTemp[newStat.type];

    if (newSkillPts >= 0 && newStat.value >= minStat.value)
      setCharacter({
        ...character,
        skill_pts: newSkillPts,
        [newStat.type]: newStat,
      });
  };

  return (
    <div>
      <div className="flex flex-row justify-center">
        <div style={styles.item}>{`id: ${character.id}`}</div>
        <div style={styles.item}>{`name: ${character.name}`}</div>
        <div style={styles.item}>{`rank: ${character.rank}`}</div>
        <div style={styles.item}>{`skill Pts: ${character.skill_pts}`}</div>
        <div style={styles.item}>{`available: ${character.available}`}</div>
        <div style={styles.item}>
          {`lastFight: ${character.lastFight.toLocaleString(
            DateTime.DATE_SHORT
          )}`}
        </div>
      </div>

      <div className="flex flex-row justify-center">
        <div>
          <Stat stat={character.health} changeCallback={changeCallback} />
          <Stat stat={character.attack} changeCallback={changeCallback} />
          <Stat stat={character.defense} changeCallback={changeCallback} />
          <Stat stat={character.magik} changeCallback={changeCallback} />
        </div>

        <div className="flex flex-col ml-24">
          {character.skill_pts !== characterTemp.skill_pts && (
            <button
              className="mx-4 my-2"
              onClick={() => {
                context.updateCharacter(character);
                setCharacterTemp(character);
              }}
            >
              Update
            </button>
          )}
          <button
            className="mx-4 my-2"
            onClick={() => context.setAttacker(character)}
          >
            Combattre
          </button>
          <button
            className="mx-4 my-2"
            onClick={() => context.removeCharacter(character.id)}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  item: {
    // flex: 1,
    margin: 8,
  },
};

export default CharacterItem;
