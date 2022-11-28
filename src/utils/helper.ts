export function generateNumbersBetween(start: number, end: number) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
}
