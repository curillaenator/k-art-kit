import React, { forwardRef, CSSProperties } from 'react';
import styled, { FlattenSimpleInterpolation } from 'styled-components';

import { fontStyles } from './fontsSettings';
import { generateTag, getFontFamily } from './helpers';

import { TypographyProps } from './interfaces';

interface ITypographyStyled {
  fontFamily: string;
  fontStyles: FlattenSimpleInterpolation;
  color?: CSSProperties['color'];
}

const TypographyStyled = styled.span<ITypographyStyled>`
  ${({ fontFamily }) => fontFamily};
  ${({ fontStyles }) => fontStyles};

  color: ${({ color }) => color || 'inherit'};
`;

const Typography = forwardRef<HTMLDivElement, TypographyProps>((props, ref) => {
  const { type = 'TextRegular16', as = 'span', children, className, color } = props;

  return (
    <TypographyStyled
      ref={ref}
      fontFamily={getFontFamily()}
      fontStyles={fontStyles[type]}
      as={as || generateTag(type)}
      className={className || type}
      color={color}
    >
      {children}
    </TypographyStyled>
  );
});

export { Typography };
