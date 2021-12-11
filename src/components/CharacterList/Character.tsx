import { useState } from "react";
import { useAppContext } from "../../app/AppContext";
import { Icons as icons } from "../../app/icons";
import { findOpponent } from "../../app/utils";
import Card, { Body, Footer, Header } from "../Card";
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
    <Card>
      <Header {...character} />
      <Body>
        <Stat
          icon={icons.stat.skill_pts}
          label={`Exp. ${character.skill_pts}`}
        />
        <CharacterStat
          label="Santé"
          icon={icons.stat.health}
          stat={character.health}
          changeCallback={changeCallback}
        />
        <CharacterStat
          label="Attaque"
          icon={icons.stat.attack}
          stat={character.attack}
          changeCallback={changeCallback}
        />
        <CharacterStat
          label="Défense"
          icon={icons.stat.defense}
          stat={character.defense}
          changeCallback={changeCallback}
        />
        <CharacterStat
          label="Magie"
          icon={icons.stat.magik}
          stat={character.magik}
          changeCallback={changeCallback}
        />
      </Body>

      <Footer>
        {character.skill_pts !== characterTemp.skill_pts && (
          <Button label="Valider" icon={icons.action.update} onClick={update} />
        )}
        <Button label="Combattre" icon={icons.action.fight} onClick={fight} />
        <Button label="Supprimer" icon={icons.action.remove} onClick={remove} />
      </Footer>
    </Card>
  );
};

export default Character;
