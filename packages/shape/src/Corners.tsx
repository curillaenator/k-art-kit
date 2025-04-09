import React, { FC } from 'react';

import { useCorners } from './hooks/useCorners';
import { CornersContainerStyled } from './corners.styled';

import { CORNERS } from './constants';
import type { CornerProps } from './interfaces';

const Component: FC<CornerProps> = (props) => {
  const { path, borderPath, commonSvgProps, stroke, corners = CORNERS } = useCorners(props);

  return (
    <CornersContainerStyled>
      {corners.map((corner) => (
        <svg {...commonSvgProps} data-svg-corner='true' key={corner} className={`corner-${corner}`}>
          <path d={path} fill='var(--shp-bgc, blue)' />
          <path d={borderPath} strokeWidth={stroke} stroke='var(--shp-bdc, red)' fill='none' />
        </svg>
      ))}
    </CornersContainerStyled>
  );
};

export const Corners = React.memo(Component);

// данные смусд корнеры не используют никаких ресайз обсерверов и не используют генерацию свг на лету
// один раз при первом рендере родителя создается 4 абсолютно спозиционированные по углам
// иконки имитирующие гладкие углы.
// при дальнейших манипуляциях с размерами родительского контейнера перерасчета svg не происходит
// если не меняются ключевые параметры - stroke и borderRadius.
// иконки собой перекрывают дефолтные радиусы и содержат все необходимое для корректной отрисовки бордеров

// механизм в разы быстрее того, что лежит рядом в компоненте Shape, где происходит динамеческая генерация SVG по ResizeObserver
