import { filterUnique } from './filterUnique';

type PrimitiveType = string | number | boolean | null | undefined | Date;

export function findDuplicates<T extends PrimitiveType>(arr: T[]): T[] {
  const duplicates = arr.filter((item, index) => arr.indexOf(item) !== index);
  return filterUnique(duplicates);
}
