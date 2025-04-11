import { toPairs } from 'lodash';

const levelToFoldableMap = (level: Record<string, number>) => toPairs(level);

export { levelToFoldableMap };
