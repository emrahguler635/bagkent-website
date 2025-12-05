/**
 * GitHub Pages için görsel path'lerini düzenler
 * basePath'i otomatik olarak ekler
 */
export function getImagePath(src: string): string {
  // Eğer external URL ise, olduğu gibi döndür
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  
  // Client-side'da basePath'i window.location'dan çıkar
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname;
    const hostname = window.location.hostname;
    
    // GitHub Pages kontrolü
    if (hostname.includes('github.io')) {
      // pathname'i parçala: /bagkent-website/ veya /bagkent-website/kurumsal/yonetim/
      const pathParts = pathname.split('/').filter(Boolean);
      
      // Eğer pathname '/' ise (ana sayfa), repository adını pathname'den çıkaramayız
      // Ama GitHub Pages'te ana sayfa URL'i: https://user.github.io/repo-name/
      // Bu durumda pathname '/' olabilir, ama basePath yine de /repo-name olmalı
      
      // Çözüm: Eğer pathname '/' ise, document.baseURI veya location.href'den çıkar
      if (pathname === '/' || pathname === '') {
        // location.href'den basePath'i çıkar: https://user.github.io/repo-name/
        const fullUrl = window.location.href;
        const urlPath = new URL(fullUrl).pathname;
        if (urlPath !== '/' && urlPath !== '') {
          const urlParts = urlPath.split('/').filter(Boolean);
          if (urlParts.length > 0) {
            return `/${urlParts[0]}${src}`;
          }
        }
      } else {
        // pathname '/' değilse, ilk segment'i basePath olarak kullan
        if (pathParts.length > 0) {
          const basePath = `/${pathParts[0]}`;
          return `${basePath}${src}`;
        }
      }
    }
  }
  
  // Server-side veya basePath bulunamazsa, olduğu gibi döndür
  return src;
}

