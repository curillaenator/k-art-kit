import type { FC, ButtonHTMLAttributes, SVGAttributes, CSSProperties } from 'react';
import React from 'react';

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  IconLeft?: React.ElementType;
  IconRight?: React.ElementType;
  active?: boolean;
  // appearance?: 'primary' | 'secondary';
}

interface ButtonActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  LeftIcon?: FC<SVGAttributes<SVGElement>>;
  RightIcon?: FC<SVGAttributes<SVGElement>>;
  active?: boolean;
  /* LeftIcon or RightIcon should be provided to use loading prop */
  loading?: boolean;
  fullwidth?: boolean;
  height?: CSSProperties['height'];
  appearance?: 'primary' | 'secondary' | 'danger';
}

type ButtonGhostProps = ButtonActionProps;

export type { ButtonActionProps, ButtonGhostProps, BaseButtonProps };
