import { CharacterProps } from "../Character/types";

export type FightProps = {
  attacker: CharacterProps;
  opponent: CharacterProps;
};

export type ReportProps = {
  attacker: FightProps["attacker"];
  opponent: FightProps["opponent"];
  damage?: number;
  strikeback?: Boolean;
};
