import { ActionIcons as icons } from "../../app/icons";
import { costCalc } from "../../app/utils";
import Button from "../ButtonStat";
import Stat from "../Card/Stat";
import { ChangeProps, StatProps } from "./types";

type Props = {
  stat: StatProps;
  changeCallback: (props: ChangeProps) => void;
};

const CharacterStat = ({ stat, changeCallback }: Props) => {
  const changeStat = (alt: number) => {
    changeCallback({
      newStat: {
        ...stat,
        value: stat.value + alt,
        max_value: stat.max_value && stat.max_value + alt,
      },
      cost: costCalc(stat, alt),
    });
  };

  return (
    <div className="flex flex-row items-center">
      <Stat stat={stat} />
      <Button icon={icons.increase} onClick={() => changeStat(+1)} />
      <Button icon={icons.decrease} onClick={() => changeStat(-1)} />
    </div>
  );
};

export default CharacterStat;
