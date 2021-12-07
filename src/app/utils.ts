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

export const rollADie = (nbFace: number) => {
  if (nbFace === 0) return 0;
  const res = Math.floor(Math.random() * nbFace) + 1;

  console.log(`Roll 1D${nbFace}. Result: ${res}`);

  return res;
};
