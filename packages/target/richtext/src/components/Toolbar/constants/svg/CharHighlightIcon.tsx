import React, { FC } from 'react';

const CharHighlightIcon: FC<{ color: string }> = ({ color }) => (
  <svg width='33' height='32' viewBox='0 0 33 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <mask id='mask0_6_365389' maskUnits='userSpaceOnUse' x='0' y='0' width='33' height='33'>
      <rect x='8.5' y='8.00391' width='16' height='16' rx='4' fill='#D9D9D9' />
    </mask>
    <g mask='url(#mask0_6_365389)'>
      <rect x='0.5' y='0.00390625' width='32' height='32' fill={color} />
    </g>
    <mask id='mask1_6_365389' maskUnits='userSpaceOnUse' x='0' y='0' width='33' height='33'>
      <path
        d='M19.168 20.6038L18.3269 18.2907H14.568L13.74 20.6038H12.2549L15.6852 11.4038H17.2755L20.7452 20.6038H19.168ZM16.4475 13.0861L15.028 17.029H17.8669L16.4475 13.0861Z'
        fill='white'
      />
    </mask>
    <g mask='url(#mask1_6_365389)'>
      <rect x='0.5' y='0.00390625' width='32' height='32' fill='white' />
    </g>
  </svg>
);

const BlackIcon = () => <CharHighlightIcon color='#172B4D' />;
const RedIcon = () => <CharHighlightIcon color='#DE350B' />;
const LightGreyIcon = () => <CharHighlightIcon color='#C1C7D0' />;
const BlueIcon = () => <CharHighlightIcon color='#0747A6' />;
const LightBlueIcon = () => <CharHighlightIcon color='#4C9AFF' />;
const GreenIcon = () => <CharHighlightIcon color='#00875A' />;
const DarkOrangeIcon = () => <CharHighlightIcon color='#FF8B00' />;
const LightOrangeIcon = () => <CharHighlightIcon color='#FFAB00' />;
const PurpleIcon = () => <CharHighlightIcon color='#403294' />;

export {
  BlackIcon,
  RedIcon,
  LightGreyIcon,
  BlueIcon,
  LightBlueIcon,
  GreenIcon,
  DarkOrangeIcon,
  LightOrangeIcon,
  PurpleIcon,
};
