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
        // pathname'i al: /bagkent-website/ veya /bagkent-website/kurumsal/yonetim/ veya /
        let pathname = window.location.pathname;
        
        // pathname'i parçala: ['bagkent-website'] veya ['bagkent-website', 'kurumsal', 'yonetim'] veya []
        const pathParts = pathname.split('/').filter(Boolean);
        
        // Eğer pathParts varsa, ilk segment repository adıdır (basePath)
        if (pathParts.length > 0) {
          const basePath = `/${pathParts[0]}`;
          return `${basePath}${src}`;
        }
        
        // Eğer pathname sadece '/' ise (ana sayfa), location.href'den tam URL'i al
        // GitHub Pages'te: https://emrahguler635.github.io/bagkent-website/
        // pathname '/' olabilir ama repository adı URL'de var
        if (pathname === '/' || pathname === '') {
          const href = window.location.href;
          const url = new URL(href);
          // pathname'i tekrar al (bazen '/' olabilir)
          const hrefPathname = url.pathname;
          const hrefParts = hrefPathname.split('/').filter(Boolean);
          
          // Eğer hrefParts varsa, ilk segment basePath
          if (hrefParts.length > 0) {
            return `/${hrefParts[0]}${src}`;
          }
          
          // Son çare: location.origin ve pathname'i birleştirip çıkar
          // Ama bu da çalışmayabilir, çünkü pathname '/' ise
          // En basit çözüm: Sabit repository adını kullan (bagkent-website)
          // Ama bu ideal değil, daha dinamik bir çözüm bulalım
          
          // Alternatif: Tüm script tag'lerini kontrol et ve basePath'i çıkar
          // Veya document.querySelector('base')?.href kullan
          const baseElement = document.querySelector('base');
          if (baseElement?.href) {
            try {
              const baseUrl = new URL(baseElement.href);
              const basePathname = baseUrl.pathname;
              const baseParts = basePathname.split('/').filter(Boolean);
              if (baseParts.length > 0) {
                return `/${baseParts[0]}${src}`;
              }
            } catch (e) {
              // base URL parse hatası
            }
          }
          
          // Son çare: URL'den manuel çıkarma
          // https://emrahguler635.github.io/bagkent-website/ formatından
          // bagkent-website'yi çıkar
          const match = href.match(/github\.io\/([^\/]+)/);
          if (match && match[1]) {
            return `/${match[1]}${src}`;
          }
        }
      }
    } catch (e) {
      console.warn('getImagePath error:', e);
    }
  }
  
  // Server-side veya basePath bulunamazsa, olduğu gibi döndür
  return src;
}

