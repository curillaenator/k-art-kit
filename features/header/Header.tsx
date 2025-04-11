import React, { FC } from 'react';
import { Buttons } from './Buttons';
import styles from './header.module.scss';

const Header: FC = () => (
  <header className={styles.header}>
    <div />
    <Buttons />
  </header>
);

export { Header };
