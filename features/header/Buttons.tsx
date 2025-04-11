'use client';

import React, { FC } from 'react';
import { useUnit } from 'effector-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

import { $appStore, toggleMode } from '@/entities/app';

import { Avatar } from '@/kit/avatar';
import { Button } from '@/kit/button';

import styles from './header.module.scss';

const Buttons: FC = () => {
  const { darkmode } = useUnit($appStore);
  const session = useSession();

  return (
    <div className={styles.buttons}>
      <Button onClick={() => toggleMode()}>{darkmode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}</Button>

      {!!session?.data && (
        <Avatar
          component={Link}
          href='/profile'
          username={session.data.user?.name || null}
          src={session.data.user?.image}
        />
      )}
    </div>
  );
};

export { Buttons };
