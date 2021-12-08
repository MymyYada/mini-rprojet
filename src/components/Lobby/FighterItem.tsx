import { CharacterProps } from "../Character/types";

const FighterItem = ({ fighter }: { fighter: CharacterProps }) => {
  return (
    <div>
      <div className="m-8">{`name: ${fighter.name}`}</div>
      <div className="m-8">{`${fighter.health.type}: ${fighter.health.value}/${fighter.health.max_value}`}</div>
      <div className="m-8">{`${fighter.attack.type}: ${fighter.attack.value}`}</div>
      <div className="m-8">{`${fighter.defense.type}: ${fighter.defense.value}`}</div>
      <div className="m-8">{`${fighter.magik.type}: ${fighter.magik.value}`}</div>
    </div>
  );
};

export default FighterItem;
