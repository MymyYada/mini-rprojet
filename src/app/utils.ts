import { StatProps, StatType } from "../components/Character/types";

export const costCalc = (stat: StatProps, alt: number) => {
  if (stat.type !== StatType.health) {
    const cost =
      alt > 0
        ? Math.ceil(stat.value / 5) * alt
        : Math.ceil((stat.value - 1) / 5) * alt;
    return cost !== 0 ? cost : alt;
  }

  return alt;
};

export const randBetween = ({
  min = 0,
  max,
}: {
  min?: number;
  max: number;
}) => {
  return Math.floor(Math.random() * max) + min;
};

export const rollADie = (nbFace: number) => {
  if (nbFace === 0) return 0;

  return randBetween({ min: 1, max: nbFace });
};
