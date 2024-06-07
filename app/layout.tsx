import type { Metadata } from 'next';
import { Inter, Andada_Pro, Quicksand } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const andadaPro = Andada_Pro({ subsets: ['latin'] });
const quicksand = Quicksand({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My Trivia App',
  description: 'Brand New Trivia App'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.className} antialiased bg-[url('/space-background.png')] bg-cover bg-center`}
      >
        {children}
      </body>
    </html>
  );
}
