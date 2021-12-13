import { StatProps } from "../CharacterList/types";
import Icon from "../Icon";

const Stat = ({ stat }: { stat: StatProps }) => {
  const label = `${stat.label} ${stat.value}${
    stat.max_value ? `/${stat.max_value}` : ``
  }`;

  return (
    <div className="flex flex-1 text-gray-500 text-xs my-1 items-center">
      <div className="flex h-3 w-3 mr-2 justify-center">
        <Icon icon={stat.icon} aria-hidden="true" />
      </div>
      {label}
    </div>
  );
};

export default Stat;
