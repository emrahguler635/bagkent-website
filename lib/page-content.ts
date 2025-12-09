/**
 * Sayfa içeriklerini localStorage'dan veya varsayılan değerlerden alır
 * Bu sayede admin panelinden yapılan değişiklikler hemen yansır
 */

// Varsayılan değerler
const defaultContents: Record<string, any> = {
  home: {
    "heroTitle": "Geleceği İnşa Eden Güven",
    "heroSubtitle": "Modern mimari çözümler ve kaliteli yapılar ile hayallerinizi gerçeğe dönüştürüyoruz.",
    "aboutTitle": "BağKent A.Ş. Hakkında",
    "aboutText1": "BağKent A.Ş. 1 yılı aşkın süredir inşaat sektöründe faaliyet gösteren, güvenilir ve köklü bir firmadır. Modern mimari çözümler, kaliteli işçilik ve müşteri memnuniyeti odaklı yaklaşımımızla İstanbul'un önemli projelerine imza atıyoruz.",
    "aboutText2": "Konut projelerinden ticari yapılara, altyapı çalışmalarından restorasyon projelerine kadar geniş bir yelpazede hizmet sunmaktayız. Her projede aynı özen ve kalite anlayışıyla çalışarak, sektördeki lider konumumuzu sürdürüyoruz.",
    "slogan": "BağKent Sizinle Güzel",
    "ctaTitle": "Hayalinizdeki Projeyi Birlikte Gerçekleştirelim",
    "ctaText": "Uzman ekibimiz ve 30 yıllık deneyimimizle projelerinize değer katmaya hazırız."
  },
  about: {
    "heroTitle": "Hakkımızda",
    "heroSubtitle": "1 yılı aşkın deneyimimizle inşaat sektöründe güvenilir ve kaliteli hizmetin adresi.",
    "storyTitle": "Şirketimizin Hikayesi",
    "storyText1": "BağKent A.Ş. 2025 yılında İstanbul'da kurulmuştur. Kuruluşumuzdan bu yana inşaat sektöründe kalite, güvenilirlik ve müşteri memnuniyeti odaklı hizmet anlayışımızı sürdürmekteyiz.",
    "storyText2": "Uzman kadromuz, modern teknolojiler ve yenilikçi yaklaşımımızla konut, ticari yapı ve altyapı projelerinde sektörün önde gelen firmalarından biri haline geldik. 250'den fazla başarıyla tamamlanmış projemizle müşterilerimizin güvenini kazandık.",
    "storyText3": "Günümüzde İstanbul ve çevresinde faaliyet gösteren şirketimiz, her geçen gün büyüyen kadrosu ve artan proje portföyüyle sektörde iddialı bir konumda bulunmaktadır.",
    "teamTitle": "Ekibimiz",
    "teamText1": "BağKent A.Ş. olarak, alanında uzman mimar, mühendis ve teknik personelden oluşan güçlü bir ekibe sahibiz. Her biri kendi alanında deneyimli profesyonellerden oluşan ekibimiz, projelerin en iyi şekilde tamamlanması için özverili çalışmaktadır.",
    "teamText2": "Sürekli eğitim ve gelişim programlarımızla ekip üyelerimizin bilgi ve becerilerini güncel tutuyoruz. Bu sayede sektördeki yenilikleri takip ediyor ve projelerimize en modern çözümleri entegre ediyoruz."
  },
  mission: {
    heroTitle: 'Misyon ve Vizyonumuz',
    heroSubtitle: 'Geleceği inşa ederken değerlerimizden ödün vermeden ilerliyoruz.',
    missionTitle: 'Misyonumuz',
    missionText1: 'BağKent A.Ş. olarak misyonumuz, kaliteli ve sürdürülebilir inşaat projeleri ile müşterilerimizin hayallerini gerçeğe dönüştürmektir. Modern mimari anlayışı, yenilikçi teknolojileri ve çevre dostu uygulamaları bir araya getirerek, yaşam alanlarına değer katmayı hedefliyoruz.',
    missionText2: 'Her projede en yüksek kalite standartlarını koruyarak, güvenli ve dayanıklı yapılar inşa etmekteyiz. Müşteri memnuniyetini ön planda tutarak, şeffaf ve dürüst bir iş anlayışı ile hareket ediyoruz.',
    missionQuote: 'Kaliteli yapılar inşa ederek topluma ve çevreye değer katmak, güvenilir ve yenilikçi çözümler sunarak sektörün öncü firması olmak.',
    visionTitle: 'Vizyonumuz',
    visionText1: 'Vizyonumuz, Türkiye\'nin ve bölgenin en saygın ve tercih edilen inşaat firmalarından biri olmaktır. Sürdürülebilir ve çevre dostu yapılar inşa ederek gelecek nesillere daha yaşanabilir bir dünya bırakmayı amaçlıyoruz.',
    visionText2: 'Teknolojik yenilikleri yakından takip ederek, akıllı bina sistemleri ve enerji verimli tasarımlar ile sektörde öncü rol oynamak istiyoruz. Uluslararası standartlarda projeler üreterek, global pazarda da tanınan bir marka olmayı hedefliyoruz.',
    visionQuote: 'Türkiye\'nin ve bölgenin en güvenilir, yenilikçi ve sürdürülebilir inşaat firmalarından biri olarak geleceği inşa etmek.',
  },
  management: {
    "heroTitle": "Yönetim Kadromuz",
    "heroSubtitle": "Deneyimli ve profesyonel yönetim kadromuzla sektörde fark yaratıyoruz.",
    "baskanSectionTitle": "Başkan",
    "baskanTitle": "Başkan",
    "baskanName": "Yasin YILDIZ",
    "baskanImagePath": "/baskan.png",
    "baskanModalTitle": "Bağcılar Belediye Başkanı",
    "baskanBioFull": "1983 yılında İstanbul'da dünyaya geldi. Aslen Gümüşhanelidir. Eskişehir Anadolu Üniversitesi İşletme Fakültesi'nden mezun oldu. İstanbul Aydın Üniversitesi'nde \"Yerel Yönetimler\" alanında, Yüksek Lisans yaptı.\n\nYıldız, 2004 yılında AK Parti Bakırköy İlçe Gençlik Kolları'nda aktif siyasete başladı.\n\n2007 - 2009 yılları arasında Bakırköy Gençlik Kolları İlçe Başkanlığı yapan Yıldız, görev süresi boyunca gençlerin milli ve manevi değerlerine bağlı, çağın gereksinimlerine uygun bireyler olarak yetişmesi için projeler geliştirdi ve hayata geçirdi.\n\nYıldız daha sonra 2009 yılında, AK Parti'den İBB (İstanbul Büyükşehir Belediyesi) ve Bahçelievler Belediyesi meclis üyesi seçildi. 2012-2015 yılları arasında AK Parti İstanbul İl Gençlik Kolları Yerel Yönetimlerden Sorumlu İl Başkan Yardımcılığı görevinde bulundu.\n\n2014 Yerel Seçimlerinden sonra Bahçelievler Belediye Başkan Yardımcılığı görevini üstlenen Yıldız, kentsel dönüşümden sosyal alanlara kadar birçok önemli projeyi yürüttü.\n\nYıldız, 2021 yılında AK Parti İstanbul İl Kongresi'nde İl Yönetim Kurulu Üyesi oldu. 2024 Yerel Seçimlerinde de Bağcılar Belediyesi Meclis Üyeliği'ne seçilen Yıldız, aynı dönemde Belediye Başkan Yardımcısı olarak atandı.\n\nÖnceki dönem Belediye Başkanı Abdullah Özdemir'in AK Parti İstanbul İl Başkan adayı olmasının ardından Belediye Meclisi tarafından 09.01.2025 tarihinde Bağcılar Belediye Başkanı seçildi.\n\nYıldız, evli ve 2 çocuk babasıdır.",
    "yonetimKuruluBaskaniSectionTitle": "Yönetim Kurulu Başkanı",
    "yonetimKuruluBaskaniTitle": "Yönetim Kurulu Başkanı",
    "yonetimKuruluBaskaniName": "Salih KUMBAR",
    "yonetimKuruluBaskaniImagePath": "/genel-mudur.png",
    "yonetimKuruluBaskaniModalTitle": "Yönetim Kurulu Başkanı",
    "yonetimKuruluBaskaniBioFull": "1973 yılında Üsküdar'da doğdu. İlköğretim ve ortaöğretimini Ümraniye'de tamamladı.\n\n1996 yılında İETT Genel Müdürlüğünde Hareket Memuru olarak göreve başladı. 1997 yılında İETT Kadıköy İşletme Şefliği, 2000 yılında İETT Anadolu Bölgesi Müdür Yardımcılığı görevlerinde bulundu.\n\n2007 yılında Kocaeli Büyükşehir Belediyesi Kara Ulaşım Şube Müdürlüğü'ne atandı. 2014 yılında Toplu Taşıma Daire Başkanı oldu.\n\nToplu Taşıma Yönetim Sistemleri, Analiz Sistemleri, Kontrol Merkezleri, Elektronik Ücretlendirme ve Yolcu Bilgilendirme Sistemleri üzerine çok sayıda proje çalışması yürüttü.\n\nTürkiye Belediyeler Birliği Ulaşım Komisyonu Toplu Taşıma Grubu Koordinatörlüğü görevini yürüttü. Bahçeşehir Üniversitesi'nde \"Kentsel Sistemler ve Ulaştırma Yönetimi\" alanında yüksek lisans yaptı.\n\n28 Haziran 2019 tarihinde Kocaeli Büyükşehir Belediyesi ULAŞIMPARK AŞ Genel Müdürlüğü'ne getirildi. 2021 yılında Marmara Belediyeler Birliği'nde görev yaptı.\n\nAğustos 2022'den itibaren Bağcılar Belediye Başkan Danışmanı olarak görev yaparken, Temmuz 2023 itibariyle Bağcılar Belediyesi Başkan Yardımcısı olarak görevlendirildi.\n\nEvli ve iki çocuk babasıdır."
  },
  contact: {
    heroTitle: 'İletişim',
    heroSubtitle: 'Projeleriniz için bizimle iletişime geçin. Size en kısa sürede dönüş yapacağız.',
    phone: '0212 410 06 00',
    email: 'bagkent@bagkent.com.tr',
    address: 'Güneşli Mah. Mahmutbey Cad. No:97',
    city: 'Bağcılar/İSTANBUL',
    workHoursWeekday: 'Pazartesi - Cuma: 09:00 - 18:00',
    workHoursSaturday: 'Cumartesi: 09:00 - 14:00',
    workHoursSunday: 'Pazar: Kapalı',
    ctaTitle: 'Ofisimizi Ziyaret Edin',
    ctaText: 'Randevu alarak ofisimizi ziyaret edebilir, projeleriniz hakkında detaylı görüşme yapabilirsiniz. Sizi aramızda görmekten mutluluk duyarız.',
  },
  projects: {
    heroTitle: 'Projelerimiz',
    heroSubtitle: 'Modern mimari anlayışı ve kaliteli işçilikle hayata geçirdiğimiz projelerimizi keşfedin.',
    ctaTitle: 'Bir Sonraki Proje Sizin Olabilir',
    ctaText: 'Hayalinizdeki projeyi birlikte hayata geçirelim. Deneyimli ekibimizle sizlere en iyi hizmeti sunmak için buradayız.',
    ctaButtonText: 'Projeniz İçin Bize Ulaşın',
  },
};

const storageKeys: Record<string, string> = {
  home: 'admin_page_home',
  projects: 'admin_page_projects',
  about: 'admin_page_about',
  mission: 'admin_page_mission',
  management: 'admin_page_management',
  contact: 'admin_page_contact',
};

/**
 * Sayfa içeriğini alır (localStorage'dan veya varsayılan değerlerden)
 */
export function getPageContent(pageName: keyof typeof defaultContents): any {
  // Client-side kontrolü
  if (typeof window === 'undefined') {
    return defaultContents[pageName];
  }

  // localStorage'dan dene
  const storageKey = storageKeys[pageName];
  if (storageKey) {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        // UTF-8 encoding ile parse et
        const parsed = JSON.parse(saved);
        // localStorage'dan gelen verileri varsayılan değerlerle birleştir
        return { ...defaultContents[pageName], ...parsed };
      }
    } catch (e) {
      console.error(`Failed to load ${pageName} from localStorage:`, e);
    }
  }

  // Varsayılan değerleri döndür
  return defaultContents[pageName];
}
