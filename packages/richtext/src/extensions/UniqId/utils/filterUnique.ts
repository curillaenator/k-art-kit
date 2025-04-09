export function filterUnique<T>(arr: T[], stringify = JSON.stringify): T[] {
  const seen: Record<string, boolean> = {};

  return arr.filter((item: unknown) => {
    const key = stringify(item);

    if (Object.prototype.hasOwnProperty.call(seen, key)) {
      return false;
    }

    seen[key] = true;
    return true;
  });
}
