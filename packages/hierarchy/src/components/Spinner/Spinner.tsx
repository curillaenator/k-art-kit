import React, { FC } from 'react';
import styles from './icon.module.scss';

export const Spinner: FC = () => (
  <div className={styles.spinner}>
    <svg
      width={24}
      height={24}
      viewBox='0 0 33 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={styles.icon}
    >
      <defs>
        <clipPath id='spinner-path'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M16.5 26.6667C22.391 26.6667 27.1667 21.891 27.1667 16C27.1667 10.109 22.391 5.33333 16.5 5.33333C10.609 5.33333 5.83333 10.109 5.83333 16C5.83333 21.891 10.609 26.6667 16.5 26.6667ZM16.5 32C25.3366 32 32.5 24.8366 32.5 16C32.5 7.16344 25.3366 0 16.5 0C7.66344 0 0.5 7.16344 0.5 16C0.5 24.8366 7.66344 32 16.5 32Z'
          />
        </clipPath>
      </defs>

      <foreignObject x={0} y={0} width='100%' height='100%' clipPath='url(#spinner-path)'>
        <div className={styles.spinnerConic} />
      </foreignObject>

      <circle cx='16.5002' cy='2.66667' r='2.66667' />
    </svg>
  </div>
);
