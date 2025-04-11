'use client';

import React, { FC } from 'react';
import { useUnit } from 'effector-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import { useSession, signOut } from 'next-auth/react';
import cn from 'classnames';

import {
  TbLayoutSidebarLeftExpand,
  TbLayoutSidebarRightExpand,
  TbInfoHexagon,
  TbLayout,
  TbLogin,
  TbLogout,
  TbCat,
} from 'react-icons/tb';

import { $appStore, toggleAside } from '@/entities/app';
import { Button } from '@k-art/button';
import type { ComponentAppearance } from '@k-art/theme';

import styles from './aside.module.scss';

const NAV = [
  { title: 'Home', href: '/', Icon: TbCat },
  { title: 'Blog', href: '/posts', Icon: TbLayout },
  { title: 'My profile', href: '/profile', Icon: TbInfoHexagon },
];

const isActive = (route: string, pathname: string) => {
  if (route === '/' && pathname !== '/') return false;
  return RegExp(`^${route}.*`).test(pathname);
};

const Aside: FC = () => {
  const { isAsideOpen, darkmode } = useUnit($appStore);

  const pathname = usePathname();
  // const session = useSession();

  const buttonAppearance: ComponentAppearance = darkmode ? 'secondary' : 'secondary-alt';

  return (
    <aside
      className={cn(styles.aside, {
        [styles.aside_open]: isAsideOpen,
      })}
    >
      <header>
        <div className={styles.logo}>
          <h1>NextJS</h1>
        </div>

        <Button onClick={() => toggleAside()} appearance={buttonAppearance}>
          {isAsideOpen ? <TbLayoutSidebarRightExpand /> : <TbLayoutSidebarLeftExpand />}
        </Button>
      </header>

      <nav>
        {NAV.map(({ title, href, Icon }) => (
          <Button
            key={href}
            component={Link}
            href={href}
            fullwidth
            active={isActive(href, pathname)}
            appearance={buttonAppearance}
            children={
              <>
                <Icon /> {title}
              </>
            }
          />
        ))}
      </nav>

      <footer>
        <Button
          component={Link}
          // href={session?.data ? '#' : '/api/auth/signin'}
          href={session?.data ? '#' : '/signin'}
          fullwidth
          appearance={buttonAppearance}
          children={
            session?.data ? (
              <>
                <TbLogout /> {'Sign out'}
              </>
            ) : (
              <>
                <TbLogin /> {'Sign in'}
              </>
            )
          }
          onClick={() => {
            if (session?.data) signOut({ callbackUrl: '/' });
          }}
        />
      </footer>
    </aside>
  );
};

export { Aside };
