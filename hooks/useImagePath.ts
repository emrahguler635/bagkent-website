'use client';

import { useState, useEffect } from 'react';

/**
 * GitHub Pages için görsel path'lerini düzenler
 * basePath'i otomatik olarak ekler
 */
export function useImagePath(src: string): string {
  // Eğer external URL ise, olduğu gibi döndür
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  const [imagePath, setImagePath] = useState(src);

  useEffect(() => {
    // BasePath'i hesapla
    if (typeof window !== 'undefined') {
      try {
        const hostname = window.location.hostname;

        // Özel domain (bagkent.com, bagkent.com.tr) kontrolü - basePath gerekmez
        const isCustomDomain = hostname === 'bagkent.com' || hostname === 'bagkent.com.tr' || 
                              hostname.endsWith('.bagkent.com') || hostname.endsWith('.bagkent.com.tr');

        // Sadece GitHub Pages için basePath ekle
        if (!isCustomDomain && hostname.includes('github.io')) {
          // En garantili yöntem: location.href'den repository adını regex ile çıkar
          const href = window.location.href;
          const match = href.match(/github\.io\/([^\/\?]+)/);

          let basePath = '';
          if (match && match[1]) {
            basePath = `/${match[1]}`;
          } else {
            // Eğer regex çalışmazsa, pathname'den çıkar
            const pathname = window.location.pathname;
            const pathParts = pathname.split('/').filter(Boolean);
            if (pathParts.length > 0) {
              basePath = `/${pathParts[0]}`;
            }
          }

          if (basePath) {
            const fullPath = `${basePath}${src}`;
            setImagePath(fullPath);
          }
        } else {
          // Local development
          setImagePath(src);
        }
      } catch (e) {
        console.warn('useImagePath error:', e);
        setImagePath(src);
      }
    }
  }, [src]);

  return imagePath;
}

