import React, { FC } from 'react';
import { BeachStyled } from './beach.styled';
import type { BackgroundProps } from './interfaces';

// @ts-expect-error no types
import beach from './assets/beach.png';
// @ts-expect-error no types
import palm2 from './assets/palm2.png';
// @ts-expect-error no types
import ocean from './assets/ocean.png';
// @ts-expect-error no types
import sky from './assets/sky.jpg';
// @ts-expect-error no types
import sand from './assets/sand.jpg';

export const Beach: FC<BackgroundProps> = ({ positionStyles }) => {
  return (
    <BeachStyled>
      <div className='cloud cloud-4' style={positionStyles.cloud4}>
        <img src={sky} alt='Cloud-4' />
      </div>

      <div className='cloud cloud-3' style={positionStyles.cloud3}>
        <img src={ocean} alt='Cloud-3' />
      </div>

      <div className='cloud cloud-2' style={positionStyles.cloud2}>
        <img src={palm2} alt='Cloud-2' />
      </div>

      <div className='cloud cloud-1' style={positionStyles.cloud1}>
        <img src={beach} alt='Cloud-1' />
        <img src={sand} alt='Sand' className='sand' />
      </div>
    </BeachStyled>
  );
};
