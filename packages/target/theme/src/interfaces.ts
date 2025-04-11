type ColorKey = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type ColorSet = Record<ColorKey, string>;

interface ModedSet {
  texts: {
    base: string;
    inversedBase: string;
    disabled: string;

    codeblock: string;

    info: string;
    warn: string;
    success: string;
    error: string;

    placeholder: string;
    inputColor: string;
  };

  borders: {
    base: string;
    light: string;
  };

  backgrounds: {
    base: string;
    base20: string;
    base40: string;

    dark: string;
    light: string;

    danger: string;
    'danger-h': string;
    'danger-a': string;

    error: string;
    succes: string;
    warn: string;
    info: string;

    codeblock: string;
  };
}

interface ShadowsSet {
  base: string;
  danger: string;
  primary: string;
}

interface LaunchColors extends ModedSet {
  white: string;
  black: string;
  primary: ColorSet;
  accent: ColorSet;
  neutral: ColorSet;
  secondary: ColorSet;
  shadows: ShadowsSet;
}

type LaunchThemeID = 'classic' | 'awesome' | 'wine' | 'violet' | 'radioactive' | 'sunset' | 'mint' | 'yellow';

export type { LaunchColors, LaunchThemeID, ColorSet, ColorKey, ModedSet, ShadowsSet };
