import type { BDRSVal } from './interfaces';

const RADIUS_Q_ADD = 3;
const RADIUS_Q_MULT = 1.25;
const BEZIER_Q = 0.19;

const bdrs = (radius: number) => (radius - 3) / 1.25;
const BDRS = Object.fromEntries([12, 16, 20, 24, 32, 48, 64].map((v) => [v, bdrs(v)])) as Record<BDRSVal, number>;

const CORNERS = ['tl', 'tr', 'br', 'bl'];

export { RADIUS_Q_ADD, RADIUS_Q_MULT, BEZIER_Q, CORNERS, BDRS };
