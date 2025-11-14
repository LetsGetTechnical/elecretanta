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
import Script from 'next/script';
import Toaster from '@/components/Toaster/Toaster';
import UserFeedbackButton from '@/components/UserFeedbackButton/UserFeedbackButton';

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
  title: 'Secret Santa Exchange',
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
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-solid-green`}
      >
        <AuthContextProvider>
          <SnowOverlayProvider>
            <GlobalHeader />
            <SnowOverlayWrapper />
            <UserFeedbackButton />
            {children}
          </SnowOverlayProvider>
          <Toaster />
        </AuthContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
