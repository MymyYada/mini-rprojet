import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { StatProps } from "../CharacterList/types";
import Icon from "../Icon";

type Props = {
  label: string;
  icon: IconProp;
  stat?: StatProps;
};

const Stat = ({ icon, label, stat }: Props) => {
  label = `${label}${
    stat ? `: ${stat.value}${stat.max_value ? `/${stat.max_value}` : ``}` : ``
  }`;

  return (
    <div className="flex flex-1 text-gray-500 text-xs my-1 items-center">
      <div className="flex h-3 w-3 mr-2 justify-center">
        <Icon icon={icon} aria-hidden="true" />
      </div>
      {label}
    </div>
  );
};

export default Stat;
