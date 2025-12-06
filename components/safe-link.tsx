'use client';

import { ReactNode } from 'react';

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
  const getFullPath = (path: string) => {
    // Eğer external URL ise, olduğu gibi döndür
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('mailto:') || path.startsWith('tel:')) {
      return path;
    }

    // Client-side'da basePath'i window.location'dan çıkar
    if (typeof window !== 'undefined') {
      try {
        const hostname = window.location.hostname;
        const currentPathname = window.location.pathname;
        
        // Özel domain (bagkent.com, bagkent.com.tr) kontrolü - basePath gerekmez
        const isCustomDomain = 
          hostname === 'bagkent.com' || 
          hostname === 'bagkent.com.tr' ||
          hostname === 'www.bagkent.com' ||
          hostname === 'www.bagkent.com.tr' ||
          hostname.endsWith('.bagkent.com') || 
          hostname.endsWith('.bagkent.com.tr');

        // Sadece GitHub Pages için basePath ekle
        if (!isCustomDomain && hostname.includes('github.io')) {
          const href = window.location.href;
          const match = href.match(/github\.io\/([^\/\?]+)/);
          
          if (match && match[1]) {
            const basePath = `/${match[1]}`;
            
            // Path'den önce basePath varsa çıkar (zaten ekli olabilir)
            let cleanPath = path;
            if (cleanPath.startsWith(basePath)) {
              cleanPath = cleanPath.substring(basePath.length);
            }
            
            // Path zaten basePath ile başlıyorsa ve mevcut pathname'de de varsa, sadece path'i kullan
            if (currentPathname.includes(basePath) && path.startsWith(basePath)) {
              cleanPath = path.substring(basePath.length);
            }
            
            // Eğer cleanPath boşsa veya sadece '/' ise, basePath + '/' döndür
            if (!cleanPath || cleanPath === '/') {
              return `${basePath}/`;
            }
            
            // Trailing slash ekle (Next.js static export için)
            const fullPath = `${basePath}${cleanPath.startsWith('/') ? cleanPath : '/' + cleanPath}`;
            return fullPath.endsWith('/') ? fullPath : `${fullPath}/`;
          }
        }
        
        // Özel domain veya local development - trailing slash ekle
        // Path zaten trailing slash ile bitiyorsa olduğu gibi döndür
        return path.endsWith('/') ? path : `${path}/`;
      } catch (e) {
        console.warn('SafeLink error:', e);
      }
    }

    // Server-side veya hata durumunda - trailing slash ekle
    return path.endsWith('/') ? path : `${path}/`;
  };

  const fullPath = getFullPath(href);

  // External URL'ler için normal <a> tag kullan
  if (fullPath.startsWith('http://') || fullPath.startsWith('https://') || fullPath.startsWith('mailto:') || fullPath.startsWith('tel:')) {
    return (
      <a href={fullPath} className={className} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }

  // Static export için - Next.js Link yerine normal <a> tag kullan
  // Bu, client-side routing hatalarını önler
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

