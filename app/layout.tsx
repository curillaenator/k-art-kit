import React from 'react';
import cn from 'classnames';

import { Geist, Geist_Mono } from 'next/font/google';

import { Header } from '@/features/header';
import { Aside } from '@/features/aside';

import styles from './layout.module.scss';
import './globals.scss';

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const geist = Geist({ variable: '--font-geist', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <body className={cn(styles.body, geist.variable, geistMono.variable)}>
        {/* <Providers> */}
        <Aside />

        <div className={styles.view}>
          <Header />

          <main className={styles.main}>{children}</main>
        </div>
        {/* </Providers> */}
      </body>
    </html>
  );
}
