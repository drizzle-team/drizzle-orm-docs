const MS_PER_DAY = 24 * 60 * 60 * 1000;
const BASE_DATE = new Date(Date.UTC(2025, 0, 1));

export function rotateArrayDaily<T>(items: T[]): T[] {
  if (items.length <= 1) return items;

  const todayUtc = Date.UTC(
    new Date().getUTCFullYear(),
    new Date().getUTCMonth(),
    new Date().getUTCDate(),
  );
  const baseUtc = Date.UTC(
    BASE_DATE.getUTCFullYear(),
    BASE_DATE.getUTCMonth(),
    BASE_DATE.getUTCDate(),
  );

  const daysPassed = Math.floor((todayUtc - baseUtc) / MS_PER_DAY);
  const offset = daysPassed % items.length;

  return [...items.slice(offset), ...items.slice(0, offset)];
}
