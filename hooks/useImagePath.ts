'use client';

import { useState, useEffect } from 'react';

/**
 * GitHub Pages için görsel path'lerini düzenler
 * basePath'i otomatik olarak ekler
 */
export function useImagePath(src: string): string {
  const [imagePath, setImagePath] = useState(src);

  useEffect(() => {
    // Eğer external URL ise, olduğu gibi döndür
    if (src.startsWith('http://') || src.startsWith('https://')) {
      setImagePath(src);
      return;
    }

    // Client-side'da basePath'i window.location'dan çıkar
    if (typeof window !== 'undefined') {
      try {
        const hostname = window.location.hostname;

        // GitHub Pages kontrolü
        if (hostname.includes('github.io')) {
          // En garantili yöntem: location.href'den repository adını regex ile çıkar
          const href = window.location.href;
          const match = href.match(/github\.io\/([^\/\?]+)/);

          if (match && match[1]) {
            const repoName = match[1];
            setImagePath(`/${repoName}${src}`);
            return;
          }

          // Eğer regex çalışmazsa, pathname'den çıkar
          const pathname = window.location.pathname;
          const pathParts = pathname.split('/').filter(Boolean);
          if (pathParts.length > 0) {
            setImagePath(`/${pathParts[0]}${src}`);
            return;
          }
        }

        // Local development veya başka durumlar için
        setImagePath(src);
      } catch (e) {
        console.warn('useImagePath error:', e);
        setImagePath(src);
      }
    } else {
      setImagePath(src);
    }
  }, [src]);

  return imagePath;
}

