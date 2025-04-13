import type { Metadata } from 'next';
import { GoogleAuth, CredsAuth } from '@/features/auth';

import styles from './signin.module.scss';

export const metadata: Metadata = {
  title: 'Sign in',
};

export default async function SignIn() {
  return (
    <div className={styles.wrapper}>
      <GoogleAuth />
      <div className={styles.divider}>or</div>
      <CredsAuth />
    </div>
  );
}
