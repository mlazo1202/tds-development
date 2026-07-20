import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import '../styles/tailwind.css';
import { Toaster } from 'sonner';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'SeñasIA — Traducción de Lengua de Señas en Tiempo Real',
  description: 'SeñasIA traduce lengua de señas a texto en tiempo real con IA, ayudando a personas sordas y con discapacidad auditiva a comunicarse.',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={manrope.variable}>
      <body className={manrope.className}>
        {children}
        <Toaster position="bottom-right" richColors />
</body>
    </html>
  );
}