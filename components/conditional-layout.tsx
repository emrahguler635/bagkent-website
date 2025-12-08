'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';

// Helper function to check if path is admin path
function isAdminPath(pathname: string): boolean {
  if (!pathname) return false;
  // BasePath'i kaldır (örn: /bagkent-website/admin/login -> /admin/login)
  const basePath = pathname.includes('/bagkent-website') ? '/bagkent-website' : '';
  const cleanPath = basePath ? pathname.replace(basePath, '') : pathname;
  return cleanPath.startsWith('/admin');
}

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  // Initial state'i pathname'e göre ayarla (SSR uyumluluğu için)
  const [showLayout, setShowLayout] = useState(() => {
    if (typeof window !== 'undefined') {
      return !isAdminPath(window.location.pathname);
    }
    return true; // Default: layout göster (server-side)
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fullPath = window.location.pathname;
      const shouldShowLayout = !isAdminPath(fullPath);
      
      if (showLayout !== shouldShowLayout) {
        setShowLayout(shouldShowLayout);
      }
      
      // Pathname değişikliklerini dinle
      const handleLocationChange = () => {
        const currentPath = window.location.pathname;
        setShowLayout(!isAdminPath(currentPath));
      };
      
      window.addEventListener('popstate', handleLocationChange);
      return () => window.removeEventListener('popstate', handleLocationChange);
    }
  }, [showLayout]);

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

