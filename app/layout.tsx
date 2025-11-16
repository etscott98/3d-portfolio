import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import RootClientLayout from '@/components/shared/RootClientLayout';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'Erin Scott - UX/UI Designer & Frontend Developer',
  description: 'Portfolio of Erin Scott, UX/UI Designer and Frontend Developer specializing in AI platforms, mobile apps, and web development',
  keywords: ['UX Design', 'UI Design', 'Frontend Development', 'Product Designer', 'Portfolio'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased bg-black text-white overflow-x-hidden">
        <RootClientLayout>
          {children}
        </RootClientLayout>
      </body>
    </html>
  );
}
