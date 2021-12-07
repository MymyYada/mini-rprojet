import { DateTime } from "luxon";
import { useState } from "react";
import { ChangeProps, CharacterProps } from "../types";
import Stat from "./Stat";

const CharacterItem = ({
  onUpdate,
  onDelete,
  ...characterProps
}: CharacterProps & {
  onUpdate: (character: CharacterProps) => void;
  onDelete: () => void;
}) => {
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
        <button className="mx-4" onClick={onDelete}>
          Supprimer
        </button>
      </div>

      <div>
        <Stat stat={character.health} changeCallback={changeCallback} />
        <Stat stat={character.attack} changeCallback={changeCallback} />
        <Stat stat={character.defense} changeCallback={changeCallback} />
        <Stat stat={character.magik} changeCallback={changeCallback} />
      </div>
      <button
        onClick={() => {
          onUpdate(character);
          setCharacterTemp(character);
        }}
      >
        update
      </button>
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
