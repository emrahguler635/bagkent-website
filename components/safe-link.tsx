'use client';

import { ReactNode, useMemo } from 'react';
import { getBasePath } from '@/lib/getBasePath';

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

    // BasePath'i al (GitHub Pages için otomatik eklenir)
    const basePath = getBasePath();
    
    // Path'i normalize et
    let cleanPath = href.trim();
    
    // Path zaten basePath içeriyorsa çıkar (çift eklenmesini önle)
    if (basePath && (cleanPath.startsWith(basePath + '/') || cleanPath === basePath)) {
      cleanPath = cleanPath.substring(basePath.length);
    }
    
    // Başındaki slash'ları temizle
    while (cleanPath.startsWith('/')) {
      cleanPath = cleanPath.substring(1);
    }
    
    // Ana sayfa için (`/` veya boş)
    if (!cleanPath || cleanPath === '') {
      return basePath ? `${basePath}/` : '/';
    }
    
    // Trailing slash ekle (Next.js static export için)
    const finalPath = cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`;
    
    // BasePath varsa mutlaka ekle, yoksa direkt path'i döndür
    return basePath ? `${basePath}/${finalPath}` : `/${finalPath}`;
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
