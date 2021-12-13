import Card, { Body, Header } from "../Card";
import Stat from "../Card/Stat";
import { CharacterProps } from "../CharacterList/types";

const Fighter = ({ fighter }: { fighter: CharacterProps }) => {
  return (
    <Card>
      <Header {...fighter} />
      <Body skill_pts={fighter.skill_pts}>
        <Stat stat={fighter.health} />
        <Stat stat={fighter.attack} />
        <Stat stat={fighter.defense} />
        <Stat stat={fighter.magik} />
      </Body>
    </Card>
  );
};

export default Fighter;
