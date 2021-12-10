import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Icon from "../Icon";

type ButtonProps = {
  label: string;
  icon?: IconProp;
  color?: string;
  disabled?: boolean;
  onClick: () => void;
};

const Button = ({
  label,
  icon,
  color = "indigo",
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center px-4 py-2 m-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-${color}-600 hover:bg-${color}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && (
        <Icon icon={icon} className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
      )}
      {label}
    </button>
  );
};

export default Button;
