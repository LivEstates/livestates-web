import './globals.css';
import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata: Metadata = {
  title: 'Sticky – Framer Motion Clone',
  description: 'A React + Framer Motion recreation of a sticky-scrolling app showcase.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body className="gradient">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
