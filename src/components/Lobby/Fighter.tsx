import Card, { Body, Header } from "../Card";
import Stat from "../Card/Stat";
import { CharacterProps } from "../CharacterList/types";

const Fighter = ({ fighter }: { fighter: CharacterProps }) => {
  return (
    <Card>
      <Header {...fighter} />
      <Body skill_pts={fighter.skill_pts}>
        <Stat label="Santé:" stat={fighter.health} />
        <Stat label="Attaque:" stat={fighter.attack} />
        <Stat label="Défense:" stat={fighter.defense} />
        <Stat label="Magie:" stat={fighter.magik} />
      </Body>
    </Card>
  );
};

export default Fighter;
