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
    try {
      const hostname = window.location.hostname;
      
      // GitHub Pages kontrolü
      if (hostname.includes('github.io')) {
        // En garantili yöntem: location.href'den repository adını regex ile çıkar
        // https://emrahguler635.github.io/bagkent-website/ formatından bagkent-website'yi al
        const href = window.location.href;
        const match = href.match(/github\.io\/([^\/\?]+)/);
        
        if (match && match[1]) {
          const repoName = match[1];
          return `/${repoName}${src}`;
        }
        
        // Eğer regex çalışmazsa, pathname'den çıkar
        const pathname = window.location.pathname;
        const pathParts = pathname.split('/').filter(Boolean);
        if (pathParts.length > 0) {
          return `/${pathParts[0]}${src}`;
        }
      }
    } catch (e) {
      console.warn('getImagePath error:', e);
    }
  }
  
  // Server-side veya basePath bulunamazsa, olduğu gibi döndür
  return src;
}

