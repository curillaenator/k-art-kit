import type { FC, HTMLAttributes, SVGAttributes, PropsWithChildren } from 'react';

type IInputState = 'normal' | 'success' | 'error';

interface InputProps extends Omit<HTMLAttributes<HTMLInputElement>, 'onChage'> {
  state?: IInputState;
  icon?: FC<React.SVGAttributes<SVGElement>>;
  type?: 'text' | 'email' | 'password' | 'url';
  name: string;
  description?: string;
  value: string;
  limitSymbols?: number;
  buttonTitle?: string;
  withButton?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocusOut?: () => void;
}

interface InputStyledProps {
  state: IInputState;
  isIcon: boolean;
  isFocused: boolean;
  buttonWidth: number;
  hasValue: boolean;
}

export type { InputProps, InputStyledProps };
