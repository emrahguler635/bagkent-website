'use client';

import { useState, useEffect, useMemo } from 'react';

/**
 * GitHub Pages için görsel path'lerini düzenler
 * basePath'i otomatik olarak ekler
 */
export function useImagePath(src: string): string {
  // İlk render'da basePath'i hesapla (synchronous)
  const initialPath = useMemo(() => {
    // Eğer external URL ise, olduğu gibi döndür
    if (src.startsWith('http://') || src.startsWith('https://')) {
      return src;
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
            const fullPath = `/${repoName}${src}`;
            console.log('useImagePath:', src, '->', fullPath);
            return fullPath;
          }

          // Eğer regex çalışmazsa, pathname'den çıkar
          const pathname = window.location.pathname;
          const pathParts = pathname.split('/').filter(Boolean);
          if (pathParts.length > 0) {
            const fullPath = `/${pathParts[0]}${src}`;
            console.log('useImagePath (pathname):', src, '->', fullPath);
            return fullPath;
          }
        }
      } catch (e) {
        console.warn('useImagePath error:', e);
      }
    }

    return src;
  }, [src]);

  const [imagePath, setImagePath] = useState(initialPath);

  useEffect(() => {
    // BasePath'i güncelle (location değişirse)
    if (typeof window !== 'undefined') {
      try {
        const hostname = window.location.hostname;

        if (hostname.includes('github.io')) {
          const href = window.location.href;
          const match = href.match(/github\.io\/([^\/\?]+)/);

          if (match && match[1]) {
            const repoName = match[1];
            const newPath = `/${repoName}${src}`;
            if (newPath !== imagePath) {
              setImagePath(newPath);
            }
            return;
          }

          const pathname = window.location.pathname;
          const pathParts = pathname.split('/').filter(Boolean);
          if (pathParts.length > 0) {
            const newPath = `/${pathParts[0]}${src}`;
            if (newPath !== imagePath) {
              setImagePath(newPath);
            }
            return;
          }
        }
      } catch (e) {
        // Hata durumunda mevcut path'i koru
      }
    }
  }, [src, imagePath]);

  return imagePath;
}

