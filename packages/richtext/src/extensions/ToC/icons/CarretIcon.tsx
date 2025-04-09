import React, { FC } from 'react';

const CarretUpIcon: FC = () => (
  <svg
    width='32'
    height='32'
    viewBox='0 0 32 32'
    fill='none'
    style={{ transform: 'rotate(180deg)' }}
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M11.5586 14L16.003 18.4444L20.4475 14'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const CarretDownIcon: FC = () => (
  <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M11.5586 14L16.003 18.4444L20.4475 14'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export { CarretUpIcon, CarretDownIcon };
