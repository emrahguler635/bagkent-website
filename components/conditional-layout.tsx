'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const [showLayout, setShowLayout] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      // Admin sayfaları için header/footer gösterme
      if (pathname.startsWith('/admin')) {
        setShowLayout(false);
      } else {
        setShowLayout(true);
      }
    }
  }, []);

  if (!showLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

