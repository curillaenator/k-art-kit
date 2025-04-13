'use client';
import React, { FC } from 'react';

// import { signIn } from 'next-auth/react';

import { Button } from '@k-art/button';
import { FcGoogle } from 'react-icons/fc';

export const GoogleAuth: FC = () => (
  <Button
    // onClick={() => signIn('google', { callbackUrl: '/profile' })}
    appearance='primary'
  >
    <FcGoogle /> Sign in with Google
  </Button>
);
