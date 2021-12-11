import { StatIcons as icons } from "../../app/icons";
import Card, { Body, Header } from "../Card";
import Stat from "../Card/Stat";
import { CharacterProps } from "../CharacterList/types";

const FighterItem = ({ fighter }: { fighter: CharacterProps }) => {
  return (
    <Card>
      <Header {...fighter} />
      <Body>
        <Stat icon={icons.skill_pts} label={`Exp. ${fighter.skill_pts}`} />
        <Stat
          icon={icons.health}
          label={`Santé: ${fighter.health.value}${
            fighter.health.max_value ? `/${fighter.health.max_value}` : ``
          }`}
        />
        <Stat icon={icons.attack} label={`Attaque: ${fighter.attack.value}`} />
        <Stat
          icon={icons.defense}
          label={`Défense: ${fighter.defense.value}`}
        />
        <Stat icon={icons.magik} label={`Magie: ${fighter.magik.value}`} />
      </Body>
    </Card>
  );
};

export default FighterItem;
