'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function FaviconUpdater() {
  const pathname = usePathname();

  useEffect(() => {
    // BasePath'i bul - sadece GitHub Pages için gerekli
    let basePath = '';
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      // Özel domain (bagkent.com, bagkent.com.tr) kontrolü - daha kapsamlı kontrol
      const isCustomDomain = 
        hostname === 'bagkent.com' || 
        hostname === 'bagkent.com.tr' ||
        hostname === 'www.bagkent.com' ||
        hostname === 'www.bagkent.com.tr' ||
        hostname.endsWith('.bagkent.com') || 
        hostname.endsWith('.bagkent.com.tr');
      
      // Özel domainlerde basePath hiç olmamalı - direkt root'tan yükle
      if (isCustomDomain) {
        basePath = '';
      } 
      // Sadece GitHub Pages ise basePath ekle
      else if (hostname.includes('github.io')) {
        const href = window.location.href;
        const match = href.match(/github\.io\/([^\/\?]+)/);
        if (match && match[1]) {
          basePath = `/${match[1]}`;
        }
      }
    }

    // Favicon link'lerini güncelle
    const updateFavicon = (href: string) => {
      // Eski favicon link'lerini kaldır
      const existingLinks = document.querySelectorAll("link[rel*='icon']");
      existingLinks.forEach(link => link.remove());

      // Yeni favicon link'i ekle
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/png';
      link.href = basePath ? `${basePath}/bagkent-logo.png` : '/bagkent-logo.png';
      document.head.appendChild(link);

      // Shortcut icon
      const shortcutLink = document.createElement('link');
      shortcutLink.rel = 'shortcut icon';
      shortcutLink.type = 'image/png';
      shortcutLink.href = basePath ? `${basePath}/bagkent-logo.png` : '/bagkent-logo.png';
      document.head.appendChild(shortcutLink);

      // Apple touch icon
      const appleLink = document.createElement('link');
      appleLink.rel = 'apple-touch-icon';
      appleLink.href = basePath ? `${basePath}/bagkent-logo.png` : '/bagkent-logo.png';
      document.head.appendChild(appleLink);

      // Favicon.ico alternatifi
      const faviconIco = document.createElement('link');
      faviconIco.rel = 'icon';
      faviconIco.type = 'image/x-icon';
      faviconIco.href = basePath ? `${basePath}/bagkent-logo.png` : '/bagkent-logo.png';
      document.head.appendChild(faviconIco);
    };

    updateFavicon(`${basePath}/bagkent-logo.png`);
  }, [pathname]);

  return null;
}

