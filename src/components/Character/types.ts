import { DateTime } from "luxon";

export type CharacterProps = {
  id: number;
  name: string;
  rank: number;
  skill_pts: number;
  health: Stat;
  attack: Stat;
  defense: Stat;
  magik: Stat;
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

type Stat = {
  value: number;
  max_value?: number;
  type: "health" | "attack" | "defense" | "magik";
};
