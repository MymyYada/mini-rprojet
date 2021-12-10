import { useState } from "react";
import { useAppContext } from "../../app/AppContext";
import { findOpponent } from "../../app/utils";
import { ChangeProps, CharacterProps } from "../CharacterList/types";
import Stat from "../Stat";
import Button from "./Button";
import Header from "./Header";

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
    <li className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
      <Header {...character} />

      <div className="-mt-px flex divide-x divide-gray-200">
        <div className="w-full flex flex-col px-6 py-4">
          <p className="text-gray-500 text-xs">
            {`Exp. ${character.skill_pts}`}
          </p>
          <div className="flex-col">
            <Stat stat={character.health} changeCallback={changeCallback} />
            <Stat stat={character.attack} changeCallback={changeCallback} />
            <Stat stat={character.defense} changeCallback={changeCallback} />
            <Stat stat={character.magik} changeCallback={changeCallback} />
          </div>
        </div>
      </div>

      <div className="-mt-px flex divide-x divide-gray-200">
        {character.skill_pts !== characterTemp.skill_pts && (
          <Button
            label="Update"
            icon="check"
            onClick={() => {
              context.updateCharacter(character);
              setCharacterTemp(character);
            }}
          />
        )}
        <Button
          label="Combattre"
          onClick={() => {
            const opponent = findOpponent(character, context.characters);
            if (opponent) context.setFighters([character, opponent]);
          }}
        />
        <Button
          label="Supprimer"
          icon="trash-alt"
          onClick={() => context.removeCharacter(character.id)}
        />
      </div>
    </li>
  );
};

export default CharacterItem;
