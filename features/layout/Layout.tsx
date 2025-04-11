import React from 'react';

import { PropsWithChildren, FC } from 'react';

import { Geist, Geist_Mono } from 'next/font/google';
import cn from 'classnames';

// import { Providers } from '../providers';
import { Header } from '../header';
import { Aside } from '../aside';

import styles from './layout.module.scss';

const inter = Geist({ variable: '--font-geist', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <body className={cn(styles.body, inter.variable, geistMono.variable)}>
      {/* <Providers> */}
      <Aside />

      <div className={styles.view}>
        <Header />

        <main className={styles.main}>{children}</main>
      </div>
      {/* </Providers> */}
    </body>
  );
};

export { Layout };
