import { Layout } from '@/features/layout';

import './globals.scss';

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <Layout>{children}</Layout>
    </html>
  );
}
