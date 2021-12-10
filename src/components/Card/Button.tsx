import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Icon from "../Icon";

type ButtonProps = {
  label: string;
  icon?: IconProp;
  disabled?: boolean;
  onClick: () => void;
};

const Button = ({ label, icon, disabled, onClick }: ButtonProps) => {
  return (
    <div className="w-0 flex-1 flex">
      <button
        className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
        disabled={disabled}
        onClick={onClick}
      >
        {icon && (
          <Icon
            icon={icon}
            className="w-5 h-5 mr-3 text-gray-400"
            aria-hidden="true"
          />
        )}
        <span className="truncate">{label}</span>
      </button>
    </div>
  );
};

export default Button;
