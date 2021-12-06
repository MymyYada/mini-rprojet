import { DateTime } from "luxon";
import { useState } from "react";
import { ChangeProps, CharacterProps } from "../types";
import Stat from "./Stat";

const CharacterItem = ({
  onDelete,
  ...characterProps
}: CharacterProps & { onDelete: () => void }) => {
  const [character, setCharacter] = useState({ ...characterProps });
  const [maxSpent] = useState(character.skill_pts);
  const onChange = ({ stat, cost }: ChangeProps) => {
    const skill_pts = character.skill_pts - cost;
    if (0 <= skill_pts && skill_pts <= maxSpent)
      setCharacter({
        ...character,
        skill_pts,
        [stat.type]: stat,
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
        <Stat stat={character.health} onChange={onChange} />
        <Stat stat={character.attack} onChange={onChange} />
        <Stat stat={character.defense} onChange={onChange} />
        <Stat stat={character.magik} onChange={onChange} />
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
