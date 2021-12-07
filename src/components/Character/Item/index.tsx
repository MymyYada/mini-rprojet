import { DateTime } from "luxon";
import { useState } from "react";
import { ChangeProps, CharacterProps } from "../types";
import Stat from "./Stat";

const CharacterItem = ({
  onDelete,
  ...characterProps
}: CharacterProps & { onDelete: () => void }) => {
  const [character, setCharacter] = useState({ ...characterProps });
  const [characterTemp, setCharacterTemp] = useState({ ...characterProps });
  const onChange = ({ stat, cost }: ChangeProps) => {
    const newSkillPts = character.skill_pts - cost;
    const minStatValue = characterTemp[stat.type].value;

    if (newSkillPts >= 0 && stat.value >= minStatValue)
      setCharacter({
        ...character,
        skill_pts: newSkillPts,
        [stat.type]: stat,
      });
  };
  const updateCharacter = (character: CharacterProps) => {
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...character,
        health: character.health.value,
        max_health: character.health.max_value,
        attack: character.attack.value,
        defense: character.defense.value,
        magik: character.magik.value,
      }),
    };
    fetch("/characters/update", settings)
      .then((res) => {
        console.log(res);
        // getAllCharacters();
      })
      .catch((error) =>
        console.error(`There was an error updating the character: ${error}`)
      );
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
      <button
        onClick={() => {
          updateCharacter(character);
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
