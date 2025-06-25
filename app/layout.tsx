import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'N8N Automations Masterclass | July 24, 2025',
  description: 'Master N8N Automations in one intensive session. From Beginner to Advanced + AI Agent Creation. Join 2,847+ automation professionals.',
  keywords: 'N8N, automation, workflow, AI agents, masterclass, training',
  openGraph: {
    title: 'N8N Automations Masterclass | July 24, 2025',
    description: 'Master N8N Automations in one intensive session. From Beginner to Advanced + AI Agent Creation.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}