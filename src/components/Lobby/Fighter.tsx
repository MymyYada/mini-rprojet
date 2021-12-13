import { StatIcons as icons } from "../../app/icons";
import Card, { Body, Header } from "../Card";
import Stat from "../Card/Stat";
import { CharacterProps } from "../CharacterList/types";

const Fighter = ({ fighter }: { fighter: CharacterProps }) => {
  return (
    <Card>
      <Header {...fighter} />
      <Body skill_pts={fighter.skill_pts}>
        <Stat label="Santé" icon={icons.health} stat={fighter.health} />
        <Stat label="Attaque" icon={icons.attack} stat={fighter.attack} />
        <Stat label="Défense" icon={icons.defense} stat={fighter.defense} />
        <Stat label="Magie" icon={icons.magik} stat={fighter.magik} />
      </Body>
    </Card>
  );
};

export default Fighter;
