import { CharacterProps } from "../Character/types";

export type FightProps = {
  attacker: CharacterProps;
  opponent: CharacterProps;
};

export type DefendingProps = {
  opponent: FightProps["opponent"];
  atk: number;
};

export type TakeDamageProps = {
  attacker: FightProps["attacker"];
  opponent: FightProps["opponent"];
  damage: number;
  strikeback?: Boolean;
};

export type TurnProps = {
  attacker: FightProps["attacker"];
  opponent: FightProps["opponent"];
  strikeback?: Boolean;
};

export type ReportProps = {
  attacker: CharacterProps;
  opponent: CharacterProps;
  damage?: number;
  strikeback?: Boolean;
};
