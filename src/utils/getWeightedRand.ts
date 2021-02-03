type Weights = Record<string, number>;
type Range = {
  from: number;
  to: number;
  key: string;
};

const inRange = ({ from, to }: Range, n: number): boolean => {
  return n >= from && n <= to;
}

export default function getWeightedRand(weights: Weights): string {
  const ranges = Object.entries(weights).reduce<Range[]>((acc, [key, val]) => {
    const last = acc[acc.length - 1] || { to: 0 };
    acc.push({
      from: last.to,
      to: last.to + val,
      key,
    });
    return acc;
  }, []);
  const rand = Math.random();
  const match = ranges.filter((r) => inRange(r, rand));
  
  if (match[0]) {
      return match[0].key;
  }

  return '';
}
