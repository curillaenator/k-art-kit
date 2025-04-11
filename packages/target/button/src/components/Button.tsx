import React, { forwardRef } from "react";
import styled from "styled-components";
import { Corners, BDRS } from "@k-art/shape";
import { Typography } from "@k-art/typography";

import type { BaseButtonProps } from "./interfaces";

const BORDER_RADIUS = BDRS[20];

export const ButtonStyled = styled.button<BaseButtonProps>`
  --shp-bgc: ${({ theme, active }) =>
    active ? theme.primary[500] : theme.backgrounds.base};
  --shp-bdc: transparent;

  will-change: filter;
  position: relative;
  display: flex;
  gap: 0;
  justify-content: center;
  align-items: center;
  height: 48px;
  padding: 0 12px;

  background-color: var(--shp-bgc);
  border-radius: calc(${BORDER_RADIUS}px * 1.25 + 3px);

  color: ${({ active, theme }) => (active ? theme.white : theme.texts.base)};

  filter: ${({ active }) => (active ? "contrast(1.3)" : "contrast(1)")}
    drop-shadow(
      ${({ active, theme }) => {
        switch (true) {
          case active:
            return theme.shadows.primary;
          default:
            return "none";
        }
      }}
    );

  .title {
    user-select: none;
    white-space: nowrap;
    padding: 0 8px;
  }

  &:hover {
    color: ${({ theme, active }) =>
      active ? theme.white : theme.primary[300]};
  }

  &:active {
    color: ${({ theme, active }) =>
      active ? theme.white : theme.primary[800]};
  }
`;

export const Button = forwardRef<HTMLButtonElement, BaseButtonProps>(
  (props, ref) => {
    const { title, IconLeft, IconRight, ...rest } = props;

    return (
      //@ts-ignore
      <ButtonStyled {...rest} ref={ref} data-primary-button>
        <Corners borderRadius={BORDER_RADIUS} />

        {IconLeft && <IconLeft />}

        {title && (
          <Typography as="span" type="RoundedBold14" className="title">
            {title}
          </Typography>
        )}

        {IconRight && <IconRight />}
      </ButtonStyled>
    );
  }
);

Button.displayName = "Button";
