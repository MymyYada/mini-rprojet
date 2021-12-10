import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Icon from "../Icon";

type Props = {
  icon: IconProp;
  label: string;
};

const Stat = ({ icon, label }: Props) => {
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
