'use client';

import { ReactNode, useMemo } from 'react';

interface SafeLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  [key: string]: any;
}

/**
 * Static export için güvenli Link component'i
 * basePath'i otomatik olarak ekler
 */
export default function SafeLink({ href, children, className, onClick, ...props }: SafeLinkProps) {
  const fullPath = useMemo(() => {
    // Eğer external URL ise, olduğu gibi döndür
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return href;
    }

    // Client-side'da basePath'i window.location'dan çıkar
    if (typeof window !== 'undefined') {
      try {
        const hostname = window.location.hostname;
        
        // Özel domain (bagkent.com, bagkent.com.tr) kontrolü - basePath gerekmez
        const isCustomDomain = 
          hostname === 'bagkent.com' || 
          hostname === 'bagkent.com.tr' ||
          hostname === 'www.bagkent.com' ||
          hostname === 'www.bagkent.com.tr' ||
          hostname.endsWith('.bagkent.com') || 
          hostname.endsWith('.bagkent.com.tr');

        // Özel domainlerde basePath ekleme
        if (isCustomDomain) {
          // Path'i normalize et
          let cleanPath = href.trim();
          if (!cleanPath.startsWith('/')) {
            cleanPath = '/' + cleanPath;
          }
          return cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`;
        }

        // GitHub Pages için basePath ekle
        if (hostname.includes('github.io')) {
          // Repository adını bul
          let basePath = '';
          
          // Yöntem 1: URL'den regex ile çıkar
          const hrefMatch = window.location.href.match(/github\.io\/([^\/\?]+)/);
          if (hrefMatch && hrefMatch[1]) {
            basePath = `/${hrefMatch[1]}`;
          } else {
            // Yöntem 2: Pathname'den çıkar
            const pathname = window.location.pathname;
            const pathParts = pathname.split('/').filter(Boolean);
            if (pathParts.length > 0) {
              basePath = `/${pathParts[0]}`;
            }
          }

          // BasePath bulunduysa ekle
          if (basePath) {
            // Path'i normalize et
            let cleanPath = href.trim();
            
            // Path zaten basePath içeriyorsa çıkar
            if (cleanPath.startsWith(basePath + '/') || cleanPath === basePath) {
              cleanPath = cleanPath.substring(basePath.length);
            }
            
            // Başındaki slash'ları temizle
            while (cleanPath.startsWith('/')) {
              cleanPath = cleanPath.substring(1);
            }
            
            // Ana sayfa için
            if (!cleanPath || cleanPath === '') {
              return `${basePath}/`;
            }
            
            // Trailing slash ekle
            const finalPath = cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`;
            return `${basePath}/${finalPath}`;
          }
        }

        // Local development veya basePath bulunamadı
        let cleanPath = href.trim();
        if (!cleanPath.startsWith('/')) {
          cleanPath = '/' + cleanPath;
        }
        return cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`;
      } catch (e) {
        console.warn('SafeLink error:', e);
      }
    }

    // Server-side veya hata durumunda
    let cleanPath = href.trim();
    if (!cleanPath.startsWith('/')) {
      cleanPath = '/' + cleanPath;
    }
    return cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`;
  }, [href]);

  // External URL'ler için normal <a> tag kullan
  if (fullPath.startsWith('http://') || fullPath.startsWith('https://') || fullPath.startsWith('mailto:') || fullPath.startsWith('tel:')) {
    return (
      <a href={fullPath} className={className} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }

  // Static export için - normal <a> tag kullan
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick();
    }
    // Normal navigation - browser'ın default davranışı
  };

  return (
    <a href={fullPath} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
