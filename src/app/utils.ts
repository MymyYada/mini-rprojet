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
