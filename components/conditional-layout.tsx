'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const [showLayout, setShowLayout] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fullPath = window.location.pathname;
      // BasePath'i kaldır (örn: /bagkent-website/admin/login -> /admin/login)
      const basePath = fullPath.includes('/bagkent-website') ? '/bagkent-website' : '';
      const cleanPath = basePath ? fullPath.replace(basePath, '') : fullPath;
      
      // Admin sayfaları için header/footer gösterme
      if (cleanPath.startsWith('/admin')) {
        setShowLayout(false);
      } else {
        setShowLayout(true);
      }
    }
  }, []);

  // Admin sayfaları için header/footer gösterme
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

