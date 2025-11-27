// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/Components/layout/Header';
import Footer from '@/Components/layout/Footer';
import { ThemeProvider } from '@/Components/common/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Comax Web - Đọc truyện tranh online',
  description: 'Trang đọc truyện tranh chất lượng cao, cập nhật nhanh chóng và hoàn toàn miễn phí.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}