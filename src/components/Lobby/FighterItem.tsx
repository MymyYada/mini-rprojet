import Card from "../Card";
import Stat from "../Card/Stat";
import { CharacterProps } from "../CharacterList/types";

const FighterItem = ({ fighter }: { fighter: CharacterProps }) => {
  return (
    <Card {...fighter}>
      <div className="-mt-px flex divide-x divide-gray-200">
        <div className="w-full flex flex-col px-6 py-4">
          <Stat icon="level-up-alt" label={`Exp. ${fighter.skill_pts}`} />
          <Stat
            icon="heart"
            label={`Santé: ${fighter.health.value}${
              fighter.health.max_value ? `/${fighter.health.max_value}` : ``
            }`}
          />
          <Stat icon="fist-raised" label={`Attaque: ${fighter.attack.value}`} />
          <Stat icon="shield-alt" label={`Défense: ${fighter.defense.value}`} />
          <Stat icon="fire" label={`Magie: ${fighter.magik.value}`} />
        </div>
      </div>
    </Card>
  );
};

export default FighterItem;
