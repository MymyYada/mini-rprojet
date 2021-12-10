import { useState } from "react";
import { useAppContext } from "../../app/AppContext";
import { findOpponent } from "../../app/utils";
import Card from "../Card";
import Button from "../Card/Button";
import Stat from "../Card/Stat";
import CharacterStat from "./CharacterStat";
import { ChangeProps, CharacterProps } from "./types";

const Character = ({ ...characterProps }: CharacterProps) => {
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
  const update = () => {
    context.updateCharacter(character);
    setCharacterTemp(character);
  };
  const fight = () => {
    const opponent = findOpponent(character, context.characters);
    if (opponent) context.setFighters([character, opponent]);
  };
  const remove = () => context.removeCharacter(character.id);

  return (
    <Card {...character}>
      <div className="-mt-px flex divide-x divide-gray-200">
        <div className="w-full flex flex-col px-6 py-4">
          <Stat icon="level-up-alt" label={`Exp. ${character.skill_pts}`} />
          <CharacterStat
            label="Santé"
            icon="heart"
            stat={character.health}
            changeCallback={changeCallback}
          />
          <CharacterStat
            label="Attaque"
            icon="fist-raised"
            stat={character.attack}
            changeCallback={changeCallback}
          />
          <CharacterStat
            label="Défense"
            icon="shield-alt"
            stat={character.defense}
            changeCallback={changeCallback}
          />
          <CharacterStat
            label="Magie"
            icon="fire"
            stat={character.magik}
            changeCallback={changeCallback}
          />
        </div>
      </div>

      <div className="-mt-px flex divide-x divide-gray-200">
        {character.skill_pts !== characterTemp.skill_pts && (
          <Button label="Valider" icon="check" onClick={update} />
        )}
        <Button label="Combattre" icon="fist-raised" onClick={fight} />
        <Button label="Supprimer" icon="trash-alt" onClick={remove} />
      </div>
    </Card>
  );
};

export default Character;
