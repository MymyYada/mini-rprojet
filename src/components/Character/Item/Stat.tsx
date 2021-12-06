import { ChangeProps, StatProps } from "../types";

const Stat = ({
  stat,
  onChange,
}: {
  stat: StatProps;
  onChange: ({ stat, cost }: ChangeProps) => void;
}) => {
  const change = (alt: number) => {
    onChange({
      stat: {
        ...stat,
        value: stat.value + alt,
        max_value: stat.max_value && stat.max_value + alt,
      },
      cost: alt,
    });
  };

  return (
    <div className="flex flex-row justify-center">
      <div style={styles.item}>
        {`${stat.type}: ${stat.value}`}
        {stat.max_value && `/${stat.max_value}`}
      </div>
      <button className="mx-4" onClick={() => change(+1)}>
        +
      </button>
      <button className="mx-4" onClick={() => change(-1)}>
        -
      </button>
    </div>
  );
};

const styles = {
  item: {
    // flex: 1,
    margin: 8,
  },
};

export default Stat;
