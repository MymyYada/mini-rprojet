import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Icon from "../Icon";

type ButtonProps = {
  icon: IconProp;
  disabled?: boolean;
  onClick: () => void;
};

const ButtonStat = ({ icon, disabled, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      className="inline-flex items-center h-6 w-6 p-1 m-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      disabled={disabled}
      onClick={onClick}
    >
      <Icon icon={icon} className="h-2 w-2" aria-hidden="true" />
    </button>
  );
};

export default ButtonStat;
