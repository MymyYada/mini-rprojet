import { useState } from "react";
import { useAppContext } from "../../app/AppContext";
import icons from "../../app/icons";
import { expUpdate, findOpponent } from "../../app/utils";
import Card, { Body, Footer, Header } from "../Card";
import Button from "../Card/Button";
import CharacterStat from "./CharacterStat";
import { ChangeProps, CharacterProps } from "./types";

const Character = ({ ...characterProps }: CharacterProps) => {
  const context = useAppContext();
  const [character, setCharacter] = useState({ ...characterProps });
  const [characterTemp, setCharacterTemp] = useState({ ...characterProps });
  const editable = !(
    character.skill_pts.value === 0 &&
    character.skill_pts.value === characterTemp.skill_pts.value
  );
  const changeCallback = ({ newStat, cost }: ChangeProps) => {
    const newSkillPts = expUpdate(character.skill_pts, -cost);
    const minStat = characterTemp[newStat.type];

    if (newSkillPts.value >= 0 && newStat.value >= minStat.value)
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
      <Body skill_pts={character.skill_pts}>
        <CharacterStat
          stat={character.health}
          editable={editable}
          changeCallback={changeCallback}
        />
        <CharacterStat
          stat={character.attack}
          editable={editable}
          changeCallback={changeCallback}
        />
        <CharacterStat
          stat={character.defense}
          editable={editable}
          changeCallback={changeCallback}
        />
        <CharacterStat
          stat={character.magik}
          editable={editable}
          changeCallback={changeCallback}
        />
      </Body>

      <Footer>
        {character.skill_pts.value !== characterTemp.skill_pts.value && (
          <Button label="Valider" icon={icons.action.update} onClick={update} />
        )}
        <Button label="Combattre" icon={icons.action.fight} onClick={fight} />
        <Button label="Supprimer" icon={icons.action.remove} onClick={remove} />
      </Footer>
    </Card>
  );
};

export default Character;
