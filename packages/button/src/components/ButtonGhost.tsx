import React, { CSSProperties, forwardRef } from "react";
import styled, { css } from "styled-components";

import { Typography } from "@k-art/typography";

import type { ButtonGhostProps } from "./interfaces";

interface ButtonGhostStyledProps {
  active: boolean;
  onlyIcon: boolean;
  height: CSSProperties["height"];
  appearance?: "primary" | "secondary" | "disabled" | "danger";
}

const APPEARANCES = {
  primary: ({ active }: ButtonGhostStyledProps) => css`
    --button-text-c: ${({ theme }) =>
      active ? theme.primary[500] : theme.texts.base};
    --button-text-c-h: ${({ theme }) =>
      active ? theme.primary[500] : theme.primary[300]};
    --button-text-c-a: ${({ theme }) => theme.primary[500]};
  `,

  secondary: ({ active }: ButtonGhostStyledProps) => css`
    --button-text-c: ${({ theme }) =>
      active ? theme.primary[500] : theme.texts.base};
    --button-text-c-h: ${({ theme }) =>
      active ? theme.primary[500] : theme.primary[300]};
    --button-text-c-a: ${({ theme }) => theme.primary[500]};
  `,

  danger: () => css`
    --button-text-c: ${({ theme }) => theme.texts.error};
    --button-text-c-h: ${({ theme }) => theme.texts.error};
    --button-text-c-a: ${({ theme }) => theme.texts.error};
  `,

  disabled: () => css`
    --button-text-c: ${({ theme }) => theme.texts.disabled};
    --button-text-c-h: ${({ theme }) => theme.texts.disabled};
    --button-text-c-a: ${({ theme }) => theme.texts.disabled};
  `,
} as const;

const ButtonGhostStyled = styled.button<ButtonGhostStyledProps>`
  &:not(:disabled) {
    ${(styledProps) =>
      APPEARANCES[styledProps.appearance || "primary"](styledProps)};
  }

  &:disabled {
    cursor: default;

    ${APPEARANCES.disabled}
  }

  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => `${height}px`};
  background: transparent;
  padding: ${({ onlyIcon }) => (onlyIcon ? "0 4px" : 0)};
  z-index: 20;

  transition: color 0.08s ease-in-out;
  color: var(--button-text-c);

  .common-title {
    padding: 0 8px;
    user-select: none;
    white-space: nowrap;
  }

  &:hover {
    color: var(--button-text-c-h);
  }

  &:active {
    color: var(--button-text-c-a);
  }
`;

export const ButtonGhost = forwardRef<HTMLButtonElement, ButtonGhostProps>(
  (props, ref) => {
    const {
      appearance = "primary",
      title,
      LeftIcon,
      RightIcon,
      active = false,
      height = 40,
      type = "button",
      ...rest
    } = props;

    return (
      <ButtonGhostStyled
        {...rest}
        data-ghost-button
        ref={ref}
        type={type}
        active={active}
        height={height}
        appearance={appearance}
        onlyIcon={!title && (!!LeftIcon || !!RightIcon)}
      >
        {!!LeftIcon && <LeftIcon />}

        {title && (
          <Typography type="RoundedBold14" className="common-title">
            {title}
          </Typography>
        )}

        {!!RightIcon && <RightIcon />}
      </ButtonGhostStyled>
    );
  }
);

ButtonGhost.displayName = "BtnGhost";
