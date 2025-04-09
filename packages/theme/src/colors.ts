import { hsla, colors } from './utils';
import type { ModedSet, ColorSet, ShadowsSet, ColorKey } from './interfaces';

const colorsLib = {
  white: 'hsl(0, 0%, 100%)',
  black: 'hsl(0, 0%, 0%)',

  electroviolet: colors(263, 75, 56), //  hsl(263, 100%, 59%)
  awesome: colors(346, 96, 56), //  hsl(346, 96%, 56%)
  danger: colors(4, 100, 46), //  hsl(4, 100%, 46%)
  ultra: colors(220, 92, 57), //  hsl(223, 86%, 57%)
  orange: colors(18, 100, 54), //  hsl(18, 100%, 54%)
  nika: colors(94, 92, 40), //  hsl(86, 81%, 38%)
  yellow: colors(44, 97, 43),
  mint: colors(161, 62, 46),
  wine: colors(332, 76, 34),
};

const getLightModeColors = (neutral: ColorSet): ModedSet => ({
  texts: {
    base: neutral[900],
    inversedBase: neutral[100],
    disabled: neutral[200],

    codeblock: neutral[100],

    info: colorsLib.ultra[500],
    success: colorsLib.nika[500],
    warn: colorsLib.orange[500],
    error: colorsLib.danger[500],

    placeholder: neutral[200],
    inputColor: neutral[900],
  },

  borders: {
    base: neutral[200],
    light: neutral[100],
  },

  backgrounds: {
    base: colorsLib.white,
    base20: hsla(colorsLib.white, 0.2),
    base40: hsla(colorsLib.white, 0.4),

    dark: neutral[200],
    light: neutral[100],

    danger: colorsLib.danger[500],
    'danger-h': colorsLib.danger[700],
    'danger-a': colorsLib.danger[300],

    error: colorsLib.danger[100],
    succes: colorsLib.nika[100],
    warn: colorsLib.yellow[100],
    info: colorsLib.ultra[100],

    codeblock: neutral[700],
  },
});

const getDarkModeColors = (neutral: ColorSet): ModedSet => ({
  texts: {
    base: neutral[100],
    inversedBase: neutral[900],
    disabled: neutral[800],

    codeblock: neutral[100],

    info: colorsLib.danger[500],
    success: colorsLib.nika[500],
    warn: colorsLib.orange[500],
    error: colorsLib.danger[500],

    placeholder: neutral[500],
    inputColor: neutral[100],
  },

  borders: {
    base: neutral[400],
    light: neutral[300],
  },

  backgrounds: {
    base: neutral[900],
    base20: hsla(neutral[900], 0.4),
    base40: hsla(neutral[900], 0.6),

    dark: neutral[800],
    light: neutral[600],

    danger: colorsLib.danger[500],
    'danger-h': colorsLib.danger[700],
    'danger-a': colorsLib.danger[300],

    error: colorsLib.danger[900],
    succes: colorsLib.nika[900],
    warn: colorsLib.yellow[900],
    info: colorsLib.ultra[900],

    codeblock: neutral[600],
  },
});

const getDarkModePrimarySet = (primaryColorSet: ColorSet): ColorSet =>
  // @ts-expect-error
  Object.fromEntries(
    Object.keys(primaryColorSet).map((colorkey) => [
      (1000 - +colorkey) as ColorKey,
      primaryColorSet[+colorkey as ColorKey] as string,
    ]),
  );

const getLightModeShadows = (primarySet: ColorSet, neutralSet: ColorSet): ShadowsSet => ({
  base: `0px 0px 8px ${hsla(neutralSet[900], 0.25)}`,
  primary: `0px 0px 8px ${hsla(primarySet[500], 0.3)}`,
  danger: `0px 2px 6px ${hsla(colorsLib.danger[500], 0.8)}`,
});

const getDarkModeShadows = (primarySet: ColorSet, neutralSet: ColorSet): ShadowsSet => ({
  base: `0px 0px 8px ${hsla(neutralSet[700], 0.5)}`,
  primary: `0px 0px 8px ${hsla(primarySet[500], 0.3)}`,
  danger: `0px 2px 6px ${hsla(colorsLib.danger[500], 0.8)}`,
});

export {
  colorsLib,
  getLightModeColors,
  getDarkModeColors,
  getLightModeShadows,
  getDarkModeShadows,
  getDarkModePrimarySet,
};
