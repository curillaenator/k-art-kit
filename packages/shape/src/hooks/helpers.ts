import { RADIUS_Q_ADD, RADIUS_Q_MULT, BEZIER_Q } from '../constants';

export const calc = (borderRadius: number, stroke: number) => {
  // параметр для координат положения стартовой и конечной точек безье
  // сглаженные углы требуют большего реального бордер радиуса, чем тот, который они иммитируют
  const R = borderRadius * RADIUS_Q_MULT + RADIUS_Q_ADD;

  // параметр (от 0 до 1) для координат положения управляющих точек безье в иконке
  // чем меньше, тем более "острый" будет уголок
  const S = BEZIER_Q * R;

  // отступ в ширину border или 4 пкс чтобы посcчитать path внутреней чати, дорисовывающей фон
  const SH = stroke || 4;
  // смещение контрольных точек безье внутреней чати path, дорисовывающего фон
  const Sbd = S * 1.2;
  // смещение borderPath от края на половину ширины бордера из-за специфики построения stroke по path
  const I = stroke / 2;

  const path = `M 0 ${R} C 0 ${S} ${S} 0 ${R} 0 V ${SH} C ${SH + Sbd} ${SH + Sbd} ${SH + Sbd} ${SH + Sbd} ${SH} ${R} Z`;
  const borderPath = `M ${I} ${R} C ${I} ${S} ${S} ${I} ${R} ${I}`;

  return {
    R,
    path,
    borderPath,
  };
};
