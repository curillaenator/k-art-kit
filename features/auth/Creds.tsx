'use client';

import React, { FC } from 'react';
// import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { TbLogin, TbMail, TbLockPassword } from 'react-icons/tb';

import { Button } from '@k-art/button';
import { Input } from '@k-art/input';

import styles from './creds.module.scss';

export const CredsAuth: FC = () => {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // const res = await signIn('credentials', {
    //   email: formData.get('email'),
    //   password: formData.get('password'),
    //   redirect: false, // disable redirect to default nextjs signin form
    // });

    // if (!!res && !res.error) {
    if (true) {
      router.push('/');
    } else {
      alert('Ops');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input leftElement={<TbMail />} type='email' name='email' required placeholder='email' autoComplete='off' />

      <Input
        leftElement={<TbLockPassword />}
        type='password'
        name='password'
        required
        placeholder='password'
        autoComplete='new-password'
      />

      <Button type='submit' appearance='primary'>
        <TbLogin /> Sign in with creds
      </Button>
    </form>
  );
};
