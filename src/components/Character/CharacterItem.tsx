import { DateTime } from "luxon";
import { CharacterProps } from "./types";

const CharacterItem = ({
  id,
  name,
  rank,
  health,
  attack,
  defense,
  magik,
  available,
  lastFight,
  onDelete,
}: CharacterProps & { onDelete: () => void }) => {
  return (
    <div className="flex flex-row justify-center">
      <div style={styles.item}>{`id: ${id}`}</div>
      <div style={styles.item}>{`name: ${name}`}</div>
      <div style={styles.item}>{`rank: ${rank}`}</div>
      <div style={styles.item}>
        {`health: ${health.value}/${health.max_value}`}
      </div>
      <div style={styles.item}>{`attack: ${attack.value}`}</div>
      <div style={styles.item}>{`defense: ${defense.value}`}</div>
      <div style={styles.item}>{`magik: ${magik.value}`}</div>
      <div style={styles.item}>{`available: ${available}`}</div>
      <div style={styles.item}>{`lastFight: ${lastFight.toLocaleString(
        DateTime.DATE_SHORT
      )}`}</div>
      <button onClick={onDelete}>Supprimer</button>
    </div>
  );
};

const styles = {
  item: {
    // flex: 1,
    margin: 8,
  },
};

export default CharacterItem;
