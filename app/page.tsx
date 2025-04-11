import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';

import HeroImg from '@/assets/hero.jpg';

import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'NextJS EduApp',
};

function Home() {
  return (
    <div className={styles.page}>
      <h1>Hi</h1>

      <Image src={HeroImg} alt='Author' width={512} />
    </div>
  );
}

export default Home;
