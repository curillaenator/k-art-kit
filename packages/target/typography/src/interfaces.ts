import { fontStyles } from './fontsSettings';

export type TypeAs = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
export type ITypographyTypes = keyof typeof fontStyles;

export interface TypographyProps {
  type: ITypographyTypes;
  as?: TypeAs;
  children: string | number;
  className?: string;
  color?: string;
}
