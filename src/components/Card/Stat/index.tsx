import { ActionIcons as icons } from "../../../app/icons";
import { costCalc } from "../../../app/utils";
import { ChangeProps, StatProps } from "../../CharacterList/types";
import Icon from "../../Icon";
import Button from "./Button";

type Props = {
  stat: StatProps;
  editable?: boolean;
  changeCallback?: (props: ChangeProps) => void;
};

const Stat = ({ stat, editable, changeCallback }: Props) => {
  const label = `${stat.label} ${stat.value}${
    stat.max_value ? `/${stat.max_value}` : ``
  }`;
  const changeStat = (alt: number) => {
    if (changeCallback)
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
    <div className="flex">
      <div className="flex flex-1 text-gray-500 text-xs my-1 items-center">
        <div className="flex h-3 w-3 mr-2 justify-center">
          <Icon icon={stat.icon} aria-hidden="true" />
        </div>
        {label}
      </div>

      {editable && changeCallback && (
        <div className="flex items-center">
          <Button icon={icons.increase} onClick={() => changeStat(+1)} />
          <Button icon={icons.decrease} onClick={() => changeStat(-1)} />
        </div>
      )}
    </div>
  );
};

export default Stat;
