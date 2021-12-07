import { costCalc } from "../../../app/utils";
import { ChangeProps, StatProps } from "../types";

const Stat = ({
  stat,
  changeCallback,
}: {
  stat: StatProps;
  changeCallback: (props: ChangeProps) => void;
}) => {
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
    <div className="flex flex-row justify-center">
      <div style={styles.item}>
        {`${stat.type}: ${stat.value}`}
        {stat.max_value && `/${stat.max_value}`}
      </div>
      <button className="mx-4" onClick={() => changeStat(+1)}>
        +
      </button>
      <button className="mx-4" onClick={() => changeStat(-1)}>
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
