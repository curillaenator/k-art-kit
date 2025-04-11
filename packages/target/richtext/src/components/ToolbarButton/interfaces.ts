import { ButtonHTMLAttributes } from 'react';

interface ToolbarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  fullwidth?: boolean;
}

export type { ToolbarButtonProps };
