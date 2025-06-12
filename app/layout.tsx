// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { JSX, ReactNode } from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import GlobalHeader from '@/components/GlobalHeader/GlobalHeader';
import { SnowOverlayProvider } from '@/providers/SnowOverlayProvider';
import SnowOverlayWrapper from '@/components/SnowOverlayWrapper/SnowOverlayWrapper';
import AuthContextProvider from '@/context/AuthContextProvider';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Elfgorithm',
  description: 'A secret santa gift-exchange app powered by AI',
};

/**
 * A root layout of the application.
 * @param {{children: ReactNode}} props - The layout's children.
 * @returns {JSX.Element} - The rendered RootLayout Element.
 */
const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>): JSX.Element => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient`}
      >
        <AuthContextProvider>
          <SnowOverlayProvider>
            <GlobalHeader />
            <SnowOverlayWrapper />
            {children}
          </SnowOverlayProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
