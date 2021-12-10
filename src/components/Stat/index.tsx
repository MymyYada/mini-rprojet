import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { costCalc } from "../../app/utils";
import { ChangeProps, StatProps } from "../CharacterList/types";
import Icon from "../Icon";
import Button from "./Button";

type Props = {
  label: string;
  icon: IconProp;
  stat: StatProps;
  changeCallback: (props: ChangeProps) => void;
};

const Stat = ({ label, icon, stat, changeCallback }: Props) => {
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
      <div className="flex-1 text-gray-500 text-xs">
        <Icon icon={icon} className="h-3 w-3 mr-2" aria-hidden="true" />
        {`${label}: ${stat.value}`}
        {stat.max_value && `/${stat.max_value}`}
      </div>
      <div>
        <Button icon="plus" onClick={() => changeStat(+1)} />
        <Button icon="minus" onClick={() => changeStat(-1)} />
      </div>
    </div>
  );
};

export default Stat;
