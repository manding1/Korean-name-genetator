import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ireum · 이름 — Korean Name Generator',
  description: 'Discover your Korean name based on your personality. 30 seconds, 10 questions.',
  openGraph: {
    title: 'Ireum · 이름',
    description: 'What would your name be if you were born in Korea?',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700;6..12,800&family=Gowun+Dodum&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
