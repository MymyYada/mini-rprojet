import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { DateTime } from "luxon";

export type CharacterProps = {
  id: number;
  name: string;
  rank: number;
  skill_pts: number;
  health: StatProps;
  attack: StatProps;
  defense: StatProps;
  magik: StatProps;
  available: boolean;
  lastFight: DateTime;
};

export type CharacterRequest = {
  name: string;
  rank?: number;
  skill_pts?: number;
  health?: number;
  max_health?: number;
  attack?: number;
  defense?: number;
  magik?: number;
};

export type CharacterResponse = {
  id: number;
  name: string;
  rank: number;
  skill_pts: number;
  health: number;
  max_health: number;
  attack: number;
  defense: number;
  magik: number;
};

export enum StatType {
  health = "health",
  attack = "attack",
  defense = "defense",
  magik = "magik",
}

export type StatProps = {
  value: number;
  max_value?: number;
  type: StatType;
  icon: IconProp;
};

export type ChangeProps = {
  newStat: StatProps;
  cost: number;
};
