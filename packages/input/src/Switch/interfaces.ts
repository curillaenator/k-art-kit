import type { HTMLAttributes } from 'react';

interface SwitchProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  captions?: { checked: string; unchecked: string };
}

export type { SwitchProps };
