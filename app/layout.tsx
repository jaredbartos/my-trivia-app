import type { Metadata } from 'next';
import { Inter, Andada_Pro, Quicksand } from 'next/font/google';
import './globals.css';
import QuizProvider from '@/app/lib/context/quiz-context';

const inter = Inter({ subsets: ['latin'] });
const andadaPro = Andada_Pro({ subsets: ['latin'] });
const quicksand = Quicksand({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Trivial Trivia',
  description: 'Test your knowledge with Trivial Trivia!'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QuizProvider>
      <html lang="en">
        <body
          className={`${quicksand.className} antialiased bg-[url('/space-background.png')] bg-cover bg-center`}
        >
          {children}
        </body>
      </html>
    </QuizProvider>
  );
}
