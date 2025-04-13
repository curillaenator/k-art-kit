import type { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftElement?: ReactNode;
  rightElement?: ReactNode;
}

export type { InputProps };
