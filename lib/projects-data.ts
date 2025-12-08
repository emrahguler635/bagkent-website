/**
 * Proje verilerini merkezi olarak tutar
 */

export interface Project {
  slug: string;
  title: string;
  description: string;
  fullDescription?: string; // Detay sayfası için tam açıklama
  image: string;
  category: string;
}

/**
 * Başlıktan URL-friendly slug oluşturur
 */
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Proje görsellerinin path'lerini döndürür
 * Bu fonksiyon useImagePath hook'unu kullanmak yerine path string döndürür
 * (Detay sayfasında hook kullanılacak)
 */
export function getProjectImagePath(imageName: string): string {
  return imageName.startsWith('/') ? imageName : `/${imageName}`;
}

/**
 * Tüm proje verileri
 * Bu veriler hem liste hem detay sayfalarında kullanılır
 */
export const allProjects: Omit<Project, 'image'>[] = [
  {
    slug: 'bagcilar-kentsel-donusum-projeleri',
    title: 'Bağcılar Kentsel Dönüşüm Projeleri',
    description: 'Bağcılar ilçesinde deprem güvenliği ve modern mimari standartlarına uygun kentsel dönüşüm projeleri gerçekleştirilmektedir. Güvenli ve kaliteli yaşam alanları oluşturarak vatandaşlarımızın yaşam standartlarını yükseltiyoruz. Modern konut alanları, sosyal donatılar ve yeşil alanlar ile bütünleşik projeler.',
    fullDescription: `Bağcılar ilçesinde deprem güvenliği ve modern mimari standartlarına uygun kentsel dönüşüm projeleri gerçekleştirilmektedir. Güvenli ve kaliteli yaşam alanları oluşturarak vatandaşlarımızın yaşam standartlarını yükseltiyoruz.

Modern konut alanları, sosyal donatılar ve yeşil alanlar ile bütünleşik projeler hayata geçiriyoruz. Bu projeler kapsamında:

• Deprem yönetmeliğine uygun yapılar
• Modern mimari tasarımlar
• Sosyal tesisler ve donatılar
• Yeşil alan entegrasyonu
• Çevre dostu yapı malzemeleri
• Erişilebilirlik standartları

Vatandaşlarımızın güvenli ve konforlu yaşam alanlarına kavuşması için çalışmalarımız devam etmektedir.`,
    category: 'Konut',
  },
  {
    slug: 'bagcilar-park-ve-yesil-alan-projeleri',
    title: 'Bağcılar Park ve Yeşil Alan Projeleri',
    description: 'İlçe genelinde yaşam kalitesini artırmak amacıyla kapsamlı park ve yeşil alan projeleri hayata geçirilmektedir. Çocuk oyun alanları, yürüyüş yolları, fitness alanları ve dinlenme mekanları ile vatandaşlarımıza nefes alabilecekleri modern yeşil alanlar sunuyoruz. Her mahallede erişilebilir park projeleri ile şehir dokusunu zenginleştiriyoruz.',
    fullDescription: `İlçe genelinde yaşam kalitesini artırmak amacıyla kapsamlı park ve yeşil alan projeleri hayata geçirilmektedir. Çocuk oyun alanları, yürüyüş yolları, fitness alanları ve dinlenme mekanları ile vatandaşlarımıza nefes alabilecekleri modern yeşil alanlar sunuyoruz.

Her mahallede erişilebilir park projeleri ile şehir dokusunu zenginleştiriyoruz. Projelerimiz kapsamında:

• Çocuk oyun alanları ve güvenli ekipmanlar
• Yürüyüş ve bisiklet yolları
• Fitness ve spor alanları
• Dinlenme mekanları ve oturma alanları
• Ağaçlandırma ve peyzaj çalışmaları
• Çevre dostu aydınlatma sistemleri
• Güvenlik ve güvenlik kameraları

Bağcılar'ı daha yeşil ve yaşanabilir bir kent haline getirmek için çalışmalarımız sürüyor.`,
    category: 'Altyapı',
  },
  {
    slug: 'bagcilar-kultur-ve-sosyal-tesis-projeleri',
    title: 'Bağcılar Kültür ve Sosyal Tesis Projeleri',
    description: 'Bağcılar\'da kültürel ve sosyal yaşamı destekleyen modern tesisler inşa edilmektedir. Kültür merkezleri, gençlik merkezleri, kütüphaneler ve toplum merkezleri ile vatandaşlarımızın sosyal ihtiyaçlarını karşılıyoruz. Sanat etkinlikleri, eğitim programları ve sosyal aktiviteler için uygun mekanlar oluşturuyoruz. Modern mimari tasarımlı kitap şeklinde kütüphane binası gibi özgün projelerle şehrimize değer katıyoruz.',
    fullDescription: `Bağcılar'da kültürel ve sosyal yaşamı destekleyen modern tesisler inşa edilmektedir. Kültür merkezleri, gençlik merkezleri, kütüphaneler ve toplum merkezleri ile vatandaşlarımızın sosyal ihtiyaçlarını karşılıyoruz.

Sanat etkinlikleri, eğitim programları ve sosyal aktiviteler için uygun mekanlar oluşturuyoruz. Modern mimari tasarımlı kitap şeklinde kütüphane binası gibi özgün projelerle şehrimize değer katıyoruz.

Projelerimiz kapsamında:

• Modern kültür merkezleri
• Gençlik merkezleri ve aktivite alanları
• Kütüphaneler ve okuma salonları
• Toplum merkezleri ve toplantı salonları
• Sanat atölyeleri ve sergi alanları
• Eğitim ve seminer odaları
• Sosyal etkinlik mekanları

Bağcılar halkının kültürel ve sosyal gelişimine katkı sağlayacak tesisler inşa ediyoruz.`,
    category: 'Ticari',
  },
  {
    slug: 'bagcilar-modern-spor-tesisleri',
    title: 'Bağcılar Modern Spor Tesisleri',
    description: 'Gençlerimiz ve tüm vatandaşlarımız için modern spor tesisleri projeleri gerçekleştirilmektedir. Kapalı spor salonları, futbol sahaları, basketbol ve voleybol sahaları, yüzme havuzları ve açık spor alanları ile her yaş grubuna uygun spor imkanları sunuyoruz. Sağlıklı yaşam için altyapıyı güçlendiriyoruz.',
    fullDescription: `Gençlerimiz ve tüm vatandaşlarımız için modern spor tesisleri projeleri gerçekleştirilmektedir. Kapalı spor salonları, futbol sahaları, basketbol ve voleybol sahaları, yüzme havuzları ve açık spor alanları ile her yaş grubuna uygun spor imkanları sunuyoruz.

Sağlıklı yaşam için altyapıyı güçlendiriyoruz. Projelerimiz kapsamında:

• Kapalı spor salonları ve antrenman alanları
• FIFA standartlarında futbol sahaları
• Basketbol ve voleybol sahaları
• Modern yüzme havuzları
• Fitness ve kondisyon merkezleri
• Açık hava spor alanları
• Tribün ve seyirci alanları
• Güvenlik ve sağlık tesisleri

Bağcılar'ı spor şehri haline getirmek için modern tesisler inşa ediyoruz.`,
    category: 'Altyapı',
  },
  {
    slug: 'bagcilar-altyapi-modernizasyon-projeleri',
    title: 'Bağcılar Altyapı Modernizasyon Projeleri',
    description: 'Bağcılar\'da yol, su, kanalizasyon, elektrik ve aydınlatma sistemlerinin modernizasyonu kapsamlı olarak sürdürülmektedir. Yeni asfalt yollar, modern kanalizasyon şebekesi, güvenli su dağıtım sistemi ve LED aydınlatma ile ilçenin altyapısını 21. yüzyıl standartlarına taşıyoruz. Daha güvenli ve konforlu bir şehir için altyapı yatırımlarına devam ediyoruz.',
    fullDescription: `Bağcılar'da yol, su, kanalizasyon, elektrik ve aydınlatma sistemlerinin modernizasyonu kapsamlı olarak sürdürülmektedir. Yeni asfalt yollar, modern kanalizasyon şebekesi, güvenli su dağıtım sistemi ve LED aydınlatma ile ilçenin altyapısını 21. yüzyıl standartlarına taşıyoruz.

Daha güvenli ve konforlu bir şehir için altyapı yatırımlarına devam ediyoruz. Projelerimiz kapsamında:

• Yeni asfalt yollar ve kaldırımlar
• Modern kanalizasyon şebekesi
• Güvenli su dağıtım sistemi
• LED aydınlatma sistemleri
• Trafik yönetim sistemleri
• Telekomünikasyon altyapısı
• Atık yönetim sistemleri

Bağcılar'ın altyapısını modern standartlara taşıyoruz.`,
    category: 'Altyapı',
  },
  {
    slug: 'bagcilar-saglik-ve-egitim-tesisleri',
    title: 'Bağcılar Sağlık ve Eğitim Tesisleri',
    description: 'Bağcılar\'ın sağlık ve eğitim altyapısını güçlendiren modern tesis projeleri hayata geçirilmektedir. Bağcılar Hastanesi gibi büyük ölçekli sağlık tesisleri, aile sağlık merkezleri, sağlık ocakları, modern okul binaları ve eğitim tesisleri ile vatandaşlarımıza daha iyi hizmet sunuyoruz. Çocuklarımızın ve gençlerimizin kaliteli eğitim alması, tüm vatandaşlarımızın sağlık hizmetlerine kolay erişmesi için çalışıyoruz.',
    fullDescription: `Bağcılar'ın sağlık ve eğitim altyapısını güçlendiren modern tesis projeleri hayata geçirilmektedir. Bağcılar Hastanesi gibi büyük ölçekli sağlık tesisleri, aile sağlık merkezleri, sağlık ocakları, modern okul binaları ve eğitim tesisleri ile vatandaşlarımıza daha iyi hizmet sunuyoruz.

Çocuklarımızın ve gençlerimizin kaliteli eğitim alması, tüm vatandaşlarımızın sağlık hizmetlerine kolay erişmesi için çalışıyoruz. Projelerimiz kapsamında:

• Modern hastane binaları ve sağlık kompleksleri
• Aile sağlık merkezleri
• Sağlık ocakları ve poliklinikler
• Modern okul binaları
• Eğitim ve öğretim tesisleri
• Laboratuvar ve araştırma merkezleri
• Acil sağlık hizmetleri

Sağlık ve eğitim alanında modern tesisler inşa ediyoruz.`,
    category: 'Ticari',
  },
  {
    slug: 'bagcilar-3d-dijital-sehir-ikizi-projesi',
    title: 'Bağcılar 3D Dijital Şehir İkizi Projesi',
    description: 'Yapay zeka ve dijital teknolojiler kullanılarak Bağcılar\'ın 3 boyutlu dijital ikizi oluşturulmaktadır. İstanbul Kalkınma Ajansı desteği ile gerçekleştirilen bu proje, afet yönetimi, kentsel planlama ve şehir yönetimi için Coğrafi Bilgi Sistemi tabanlı çözümler sunmaktadır. Akıllı şehir uygulamaları ile Bağcılar\'ı geleceğe taşıyoruz.',
    fullDescription: `Yapay zeka ve dijital teknolojiler kullanılarak Bağcılar'ın 3 boyutlu dijital ikizi oluşturulmaktadır. İstanbul Kalkınma Ajansı desteği ile gerçekleştirilen bu proje, afet yönetimi, kentsel planlama ve şehir yönetimi için Coğrafi Bilgi Sistemi tabanlı çözümler sunmaktadır.

Akıllı şehir uygulamaları ile Bağcılar'ı geleceğe taşıyoruz. Projelerimiz kapsamında:

• 3D şehir modelleme ve görselleştirme
• Coğrafi Bilgi Sistemi (CBS) entegrasyonu
• Afet yönetimi ve erken uyarı sistemleri
• Kentsel planlama ve simülasyon araçları
• Veri analitiği ve raporlama
• IoT sensör entegrasyonu
• Yapay zeka destekli karar destek sistemleri

Bağcılar'ı dijital çağa taşıyan akıllı şehir teknolojileri geliştiriyoruz.`,
    category: 'Altyapı',
  },
  {
    slug: 'bagcilar-enerji-verimliligi-ve-akilli-sehir',
    title: 'Bağcılar Enerji Verimliliği ve Akıllı Şehir',
    description: 'Bağcılar\'da enerji verimliliği ve çevre dostu uygulamalar yaygınlaştırılmaktadır. Belediye binalarında ve kamu tesislerinde LED aydınlatma sistemleri, çatılarda kurulan güneş enerjisi panelleri ve akıllı enerji yönetim sistemleri ile sürdürülebilir bir şehir yaratıyoruz. Kamu alanlarında enerji tasarrufu sağlayan teknolojiler ile hem çevreyi koruyor hem de bütçe tasarrufu sağlıyoruz. Yenilenebilir enerji kaynaklarının kullanımı ile karbon ayak izimizi azaltıyoruz.',
    fullDescription: `Bağcılar'da enerji verimliliği ve çevre dostu uygulamalar yaygınlaştırılmaktadır. Belediye binalarında ve kamu tesislerinde LED aydınlatma sistemleri, çatılarda kurulan güneş enerjisi panelleri ve akıllı enerji yönetim sistemleri ile sürdürülebilir bir şehir yaratıyoruz.

Kamu alanlarında enerji tasarrufu sağlayan teknolojiler ile hem çevreyi koruyor hem de bütçe tasarrufu sağlıyoruz. Yenilenebilir enerji kaynaklarının kullanımı ile karbon ayak izimizi azaltıyoruz.

Projelerimiz kapsamında:

• LED aydınlatma sistemleri
• Güneş enerjisi panelleri ve sistemleri
• Akıllı enerji yönetim sistemleri
• Enerji verimliliği iyileştirmeleri
• Yenilenebilir enerji kaynakları
• Karbon ayak izi azaltma projeleri
• Çevre dostu teknolojiler

Sürdürülebilir ve çevre dostu bir Bağcılar için çalışıyoruz.`,
    category: 'Altyapı',
  },
  {
    slug: 'bagcilar-ytu-is-birligi-ve-akademik-projeler',
    title: 'Bağcılar YTÜ İş Birliği ve Akademik Projeler',
    description: 'Yıldız Teknik Üniversitesi ile imzalanan iş birliği protokolü kapsamında toplumsal fayda odaklı projeler gerçekleştirilmektedir. Bilimsel araştırmalar, kültürel miras çalışmaları, öğrenci staj programları ve uluslararası hibe projeleri ile kent ve akademi arasında köprü kuruyoruz. Gençlerimizin eğitimi ve kentimizin gelişimi için akademik iş birliklerini destekliyoruz.',
    fullDescription: `Yıldız Teknik Üniversitesi ile imzalanan iş birliği protokolü kapsamında toplumsal fayda odaklı projeler gerçekleştirilmektedir. Bilimsel araştırmalar, kültürel miras çalışmaları, öğrenci staj programları ve uluslararası hibe projeleri ile kent ve akademi arasında köprü kuruyoruz.

Gençlerimizin eğitimi ve kentimizin gelişimi için akademik iş birliklerini destekliyoruz. Projelerimiz kapsamında:

• Bilimsel araştırma projeleri
• Kültürel miras çalışmaları
• Öğrenci staj programları
• Uluslararası hibe projeleri
• Akademik yayınlar ve çalışmalar
• Teknik danışmanlık hizmetleri
• Ortak geliştirme projeleri

Bağcılar'ı bilim ve teknoloji merkezi haline getirmek için akademik iş birlikleri yürütüyoruz.`,
    category: 'Kurumsal',
  },
];

/**
 * Görsel path mapping
 */
export const projectImageMap: Record<string, string> = {
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
 * Slug'a göre proje bulur
 */
export function getProjectBySlug(slug: string): Project | null {
  const project = allProjects.find(p => p.slug === slug);
  if (!project) return null;
  
  return {
    ...project,
    image: projectImageMap[slug] || '/homepage-about.jpeg',
  };
}

/**
 * Tüm projeleri görsel path'leri ile döndürür
 * useImagePath hook'u ile kullanılacak
 */
export function getAllProjectsWithImages(): Project[] {
  return allProjects.map(project => ({
    ...project,
    image: projectImageMap[project.slug] || '/homepage-about.jpeg',
  }));
}

