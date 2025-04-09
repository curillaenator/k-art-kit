import React, { FC } from 'react';
import { useShapeParams } from './hooks/useShapeParams';
import styled from 'styled-components';

import { ShapeProps } from './interfaces';

export const ShapeStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  margin: 0 auto;
`;

export const Shape: FC<ShapeProps> = (props) => {
  const { W, H, path, ref } = useShapeParams(props);

  return (
    <ShapeStyled ref={ref}>
      <svg
        data-geometry='smoothed-shape'
        className={props.className || 'rounded-shape'}
        width='100%'
        height='100%'
        version='1.1'
        shapeRendering='geometricPrecision'
        viewBox={`0 0 ${W} ${H}`}
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d={path} />
      </svg>
    </ShapeStyled>
  );
};
