import React, { FC } from 'react';

const TableCellFillIcon: FC<{ color: string }> = ({ color }) => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect x='2' y='2' width='20' height='20' rx='4' fill={color} stroke='var(--theme-borders-base)' strokeWidth={1} />
  </svg>
);

export { TableCellFillIcon };
