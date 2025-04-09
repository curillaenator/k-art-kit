import React, { FC, CSSProperties } from 'react';
import styled, { keyframes } from 'styled-components';

const ROTATE = keyframes`
   0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const DASH = keyframes`
  0% {
    stroke-dasharray: 0, 50;
    stroke-dashoffset: 0px;
  }
  50% {
    stroke-dasharray: 50, 50;
    stroke-dashoffset: 0px;
  }
  100% {
    stroke-dasharray: 50, 50;
    stroke-dashoffset: -50px;
  }
`;

interface LoaderProps {
  view?: 'fullscreen' | 'fit-parent' | 'fit-content';
  iconSize?: CSSProperties['width'];
  iconPadding?: CSSProperties['padding'];
}

interface LoaderStyledProps {
  width: CSSProperties['width'];
  height: CSSProperties['height'];
  iconSize: CSSProperties['width'];
  iconPadding?: CSSProperties['padding'];
}

const LoaderStyled = styled.div<LoaderStyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: ${({ iconPadding }) => iconPadding || 0};

  & > svg {
    transform-origin: center center;
    width: ${({ iconSize }) => iconSize};
    height: ${({ iconSize }) => iconSize};

    .animatedCircle {
      fill: none;
      stroke: ${({ theme }) => theme.primary[500] || '#524F54'};
      stroke-width: 2px;
      transform-origin: center;
      stroke-linecap: round;
      animation:
        ${DASH} 1.6s linear infinite,
        ${ROTATE} 2s linear infinite;
    }
  }
`;

const getCssValue = (view: LoaderProps['view'], fsUnits: 'vw' | 'vh' = 'vw') => {
  if (view === 'fit-parent') return '100%';
  if (view === 'fullscreen') return '100'.concat(fsUnits);
  return 'fit-content';
};

export const Loader: FC<LoaderProps> = (props) => {
  const { view = 'fit-content', iconSize = '32px', iconPadding = 0 } = props;

  return (
    <LoaderStyled
      width={getCssValue(view)}
      height={getCssValue(view, 'vh')}
      iconSize={iconSize}
      iconPadding={iconPadding}
    >
      <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
        <circle className='animatedCircle' cx='12' cy='12' r='8' />
      </svg>
    </LoaderStyled>
  );
};
