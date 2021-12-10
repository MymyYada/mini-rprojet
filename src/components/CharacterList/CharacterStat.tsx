import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { costCalc } from "../../app/utils";
import Button from "../ButtonStat";
import Stat from "../Card/Stat";
import { ChangeProps, StatProps } from "./types";

type Props = {
  label: string;
  icon: IconProp;
  stat: StatProps;
  changeCallback: (props: ChangeProps) => void;
};

const CharacterStat = ({ label, icon, stat, changeCallback }: Props) => {
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
      <Stat
        icon={icon}
        label={`${label}: ${stat.value}${
          stat.max_value ? `/${stat.max_value}` : ``
        }`}
      />
      <Button icon="plus" onClick={() => changeStat(+1)} />
      <Button icon="minus" onClick={() => changeStat(-1)} />
    </div>
  );
};

export default CharacterStat;
