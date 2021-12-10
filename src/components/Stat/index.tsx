import { costCalc } from "../../app/utils";
import { ChangeProps, StatProps } from "../CharacterList/types";
import Button from "./Button";

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
      <Button icon="plus" onClick={() => changeStat(+1)} />
      <Button icon="minus" onClick={() => changeStat(-1)} />
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
