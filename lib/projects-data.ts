/**
 * Proje verilerini merkezi olarak tutar
 */

export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

/**
 * Proje görsel path mapping
 */
const projectImageMap: Record<string, string> = {
  'bagcilar-kentsel-donusum-projeleri': '/homepage-about.jpeg',
  'bagcilar-park-ve-yesil-alan-projeleri': '/park-yesil-alan.jpg',
  'bagcilar-kultur-ve-sosyal-tesis-projeleri': '/kultur-tesis.jpg',
  'bagcilar-modern-spor-tesisleri': '/spor-tesisleri.jpg',
  'bagcilar-altyapi-modernizasyon-projeleri': '/altyapi-modernizasyon.jpg',
  'bagcilar-saglik-ve-egitim-tesisleri': '/saglik-tesis.jpg',
  'bagcilar-3d-dijital-sehir-ikizi-projesi': '/3d-dijital-sehir.jpg',
  'bagcilar-enerji-verimliligi-ve-akilli-sehir': '/enerji-verimliligi.jpg',
  'bagcilar-ytu-is-birligi-ve-akademik-projeler': '/DJI_0609.JPG',
};

/**
 * Tüm proje verileri
 */
const allProjectsData: Omit<Project, 'image'>[] = [
  {
    slug: 'bagcilar-kentsel-donusum-projeleri',
    title: 'Bağcılar Kentsel Dönüşüm Projeleri',
    description: 'Bağcılar ilçesinde deprem güvenliği ve modern mimari standartlarına uygun kentsel dönüşüm projeleri gerçekleştirilmektedir. Güvenli ve kaliteli yaşam alanları oluşturarak vatandaşlarımızın yaşam standartlarını yükseltiyoruz.',
    category: 'Konut',
  },
  {
    slug: 'bagcilar-park-ve-yesil-alan-projeleri',
    title: 'Bağcılar Park ve Yeşil Alan Projeleri',
    description: 'İlçe genelinde yaşam kalitesini artırmak amacıyla kapsamlı park ve yeşil alan projeleri hayata geçirilmektedir. Çocuk oyun alanları, yürüyüş yolları ve fitness alanları ile vatandaşlarımıza modern yeşil alanlar sunuyoruz.',
    category: 'Altyapı',
  },
  {
    slug: 'bagcilar-kultur-ve-sosyal-tesis-projeleri',
    title: 'Bağcılar Kültür ve Sosyal Tesis Projeleri',
    description: 'Bağcılar\'da kültürel ve sosyal yaşamı destekleyen modern tesisler inşa edilmektedir. Kültür merkezleri, gençlik merkezleri ve kütüphaneler ile vatandaşlarımızın sosyal ihtiyaçlarını karşılıyoruz.',
    category: 'Ticari',
  },
  {
    slug: 'bagcilar-modern-spor-tesisleri',
    title: 'Bağcılar Modern Spor Tesisleri',
    description: 'Gençlerimiz ve tüm vatandaşlarımız için modern spor tesisleri projeleri gerçekleştirilmektedir. Kapalı spor salonları, futbol sahaları ve yüzme havuzları ile her yaş grubuna uygun spor imkanları sunuyoruz.',
    category: 'Altyapı',
  },
  {
    slug: 'bagcilar-altyapi-modernizasyon-projeleri',
    title: 'Bağcılar Altyapı Modernizasyon Projeleri',
    description: 'Bağcılar\'da yol, su, kanalizasyon ve elektrik sistemlerinin modernizasyonu kapsamlı olarak sürdürülmektedir. Yeni asfalt yollar, modern kanalizasyon şebekesi ve LED aydınlatma ile ilçenin altyapısını modern standartlara taşıyoruz.',
    category: 'Altyapı',
  },
  {
    slug: 'bagcilar-saglik-ve-egitim-tesisleri',
    title: 'Bağcılar Sağlık ve Eğitim Tesisleri',
    description: 'Bağcılar\'ın sağlık ve eğitim altyapısını güçlendiren modern tesis projeleri hayata geçirilmektedir. Hastaneler, sağlık merkezleri ve modern okul binaları ile vatandaşlarımıza daha iyi hizmet sunuyoruz.',
    category: 'Ticari',
  },
  {
    slug: 'bagcilar-3d-dijital-sehir-ikizi-projesi',
    title: 'Bağcılar 3D Dijital Şehir İkizi Projesi',
    description: 'Yapay zeka ve dijital teknolojiler kullanılarak Bağcılar\'ın 3 boyutlu dijital ikizi oluşturulmaktadır. Afet yönetimi, kentsel planlama ve şehir yönetimi için Coğrafi Bilgi Sistemi tabanlı çözümler sunmaktadır.',
    category: 'Altyapı',
  },
  {
    slug: 'bagcilar-enerji-verimliligi-ve-akilli-sehir',
    title: 'Bağcılar Enerji Verimliliği ve Akıllı Şehir',
    description: 'Bağcılar\'da enerji verimliliği ve çevre dostu uygulamalar yaygınlaştırılmaktadır. LED aydınlatma sistemleri, güneş enerjisi panelleri ve akıllı enerji yönetim sistemleri ile sürdürülebilir bir şehir yaratıyoruz.',
    category: 'Altyapı',
  },
  {
    slug: 'bagcilar-ytu-is-birligi-ve-akademik-projeler',
    title: 'Bağcılar YTÜ İş Birliği ve Akademik Projeler',
    description: 'Yıldız Teknik Üniversitesi ile imzalanan iş birliği protokolü kapsamında toplumsal fayda odaklı projeler gerçekleştirilmektedir. Bilimsel araştırmalar ve öğrenci staj programları ile kent ve akademi arasında köprü kuruyoruz.',
    category: 'Kurumsal',
  },
];

/**
 * Tüm projeleri görsel path'leri ile döndürür
 */
export function getAllProjectsWithImages(): Project[] {
  return allProjectsData.map(project => ({
    ...project,
    image: projectImageMap[project.slug] || '/homepage-about.jpeg',
  }));
}

/**
 * Slug'a göre proje bulur
 */
export function getProjectBySlug(slug: string): Project | null {
  const project = allProjectsData.find(p => p.slug === slug);
  if (!project) return null;
  
  return {
    ...project,
    image: projectImageMap[slug] || '/homepage-about.jpeg',
  };
}
