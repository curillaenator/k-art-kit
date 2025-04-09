import { colorsLib } from './colors';
import type { LaunchThemeID, ColorSet } from './interfaces';

const THEME_NAMES: Record<LaunchThemeID, string> = {
  classic: 'Classic',
  wine: 'Wine',
  yellow: 'Sunflower',
  radioactive: 'Green',
  awesome: 'Awesome',
  violet: 'Violet',
  sunset: 'Sunset',
  mint: 'Mint',
};

const THEME_SET: Record<LaunchThemeID, { primary: ColorSet; secondary: ColorSet }> = {
  classic: {
    primary: colorsLib.ultra,
    secondary: colorsLib.ultra,
  },

  wine: {
    primary: colorsLib.wine,
    secondary: colorsLib.wine,
  },

  violet: {
    primary: colorsLib.electroviolet,
    secondary: colorsLib.electroviolet,
  },

  awesome: {
    primary: colorsLib.awesome,
    secondary: colorsLib.awesome,
  },

  radioactive: {
    primary: colorsLib.nika,
    secondary: colorsLib.nika,
  },

  sunset: {
    primary: colorsLib.orange,
    secondary: colorsLib.orange,
  },

  mint: {
    primary: colorsLib.mint,
    secondary: colorsLib.mint,
  },

  yellow: {
    primary: colorsLib.yellow,
    secondary: colorsLib.yellow,
  },
};

export { THEME_NAMES, THEME_SET };
