/**
 * GitHub Pages için basePath'i bulur
 * Client-side ve server-side uyumludur
 */
export function getBasePath(): string {
  if (typeof window === 'undefined') {
    // Server-side: environment variable'dan al
    return process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}` : '';
  }

  // Client-side: window.location'dan al
  try {
    const hostname = window.location.hostname;
    
    // Özel domain kontrolü - basePath gerekmez
    const isCustomDomain = 
      hostname === 'bagkent.com' || 
      hostname === 'bagkent.com.tr' ||
      hostname === 'www.bagkent.com' ||
      hostname === 'www.bagkent.com.tr' ||
      hostname.endsWith('.bagkent.com') || 
      hostname.endsWith('.bagkent.com.tr');

    if (isCustomDomain) {
      return '';
    }

    // GitHub Pages için basePath bul
    if (hostname.includes('github.io')) {
      const fullUrl = window.location.href;
      const pathname = window.location.pathname;
      
      // Yöntem 1: Full URL'den regex ile çıkar (EN GARANTİLİ)
      // https://emrahguler635.github.io/bagkent-website/ formatından bagkent-website'yi al
      const urlMatch = fullUrl.match(/https?:\/\/[^\/]+\.github\.io\/([^\/\?]+)/);
      if (urlMatch && urlMatch[1]) {
        return `/${urlMatch[1]}`;
      }

      // Yöntem 2: Pathname'den çıkar
      // /bagkent-website/ veya /bagkent-website/projeler/ formatından bagkent-website'yi al
      const pathParts = pathname.split('/').filter(Boolean);
      if (pathParts.length > 0 && pathParts[0] !== '') {
        return `/${pathParts[0]}`;
      }
    }
  } catch (e) {
    console.warn('getBasePath error:', e);
  }

  return '';
}

