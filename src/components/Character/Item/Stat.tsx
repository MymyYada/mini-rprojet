import { costCalc } from "../../../app/utils";
import Button from "../../ButtonStat";
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
      <Button icon="cog" onClick={() => changeStat(+1)} />
      <Button icon="play" onClick={() => changeStat(-1)} />
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
