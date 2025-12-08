/**
 * Sayfa iÃ§eriklerini localStorage'dan veya varsayÄ±lan deÄerlerden alÄ±r
 * Bu sayede admin panelinden yapÄ±lan deÄiÅiklikler hemen yansÄ±r
 */

// VarsayÄ±lan deÄerler
const defaultContents: Record<string, any> = {
  home: {
    heroTitle: 'GeleceÄi Ä°nÅa Eden GÃ¼ven',
    heroSubtitle: 'Modern mimari Ã§Ã¶zÃ¼mler ve kaliteli yapÄ±lar ile hayallerinizi gerÃ§eÄe dÃ¶nÃ¼ÅtÃ¼rÃ¼yoruz.',
    aboutTitle: 'BaÄKent A.Å. HakkÄ±nda',
    aboutText1: 'BaÄKent A.Å., 30 yÄ±lÄ± aÅkÄ±n sÃ¼redir inÅaat sektÃ¶rÃ¼nde faaliyet gÃ¶steren, gÃ¼venilir ve kÃ¶klÃ¼ bir firmadÄ±r. Modern mimari Ã§Ã¶zÃ¼mler, kaliteli iÅÃ§ilik ve mÃ¼Återi memnuniyeti odaklÄ± yaklaÅÄ±mÄ±mÄ±zla Ä°stanbul\'un Ã¶nemli projelerine imza atÄ±yoruz.',
    aboutText2: 'Konut projelerinden ticari yapÄ±lara, altyapÄ± Ã§alÄ±ÅmalarÄ±ndan restorasyon projelerine kadar geniÅ bir yelpazede hizmet sunmaktayÄ±z. Her projede aynÄ± Ã¶zen ve kalite anlayÄ±ÅÄ±yla Ã§alÄ±Åarak, sektÃ¶rdeki lider konumumuzu sÃ¼rdÃ¼rÃ¼yoruz.',
    slogan: 'BaÄKent Sizinle GÃ¼zel',
    ctaTitle: 'Hayalinizdeki Projeyi Birlikte GerÃ§ekleÅtirelim',
    ctaText: 'Uzman ekibimiz ve 30 yÄ±llÄ±k deneyimimizle projelerinize deÄer katmaya hazÄ±rÄ±z.',
  },
  about: {
    "heroTitle": "Hakkımızda",
    "heroSubtitle": "30 yılı aşkın deneyimimizle inşaat sektöründe güvenilir ve kaliteli hizmetin adresi.",
    "storyTitle": "Şirketimizin Hikayesi",
    "storyText1": "BağKent A.Ş. 1990 yılında İstanbul\\'da kurulmuştur. Kuruluşumuzdan bu yana inşaat sektöründe kalite, güvenilirlik ve müşteri memnuniyeti odaklı hizmet anlayışımızı sürdürmekteyiz.",
    "storyText2": "Uzman kadromuz, modern teknolojiler ve yenilikçi yaklaşımımızla konut, ticari yapı ve altyapı projelerinde sektörün önde gelen firmalarından biri haline geldik. 250\\'den fazla başarıyla tamamlanmış projemizle müşterilerimizin güvenini kazandık.",
    "storyText3": "Günümüzde İstanbul ve çevresinde faaliyet gösteren şirketimiz, her geçen gün büyüyen kadrosu ve artan proje portföyüyle sektörde iddialı bir konumda bulunmaktadır.",
    "teamTitle": "Ekibimiz",
    "teamText1": "BağKent A.Ş. olarak, alanında uzman mimar, mühendis ve teknik personelden oluşan güçlü bir ekibe sahibiz. Her biri kendi alanında deneyimli profesyonellerden oluşan ekibimiz, projelerin en iyi şekilde tamamlanması için özverili çalışmaktadır.",
    "teamText2": "Sürekli eğitim ve gelişim programlarımızla ekip üyelerimizin bilgi ve becerilerini güncel tutuyoruz. Bu sayede sektördeki yenilikleri takip ediyor ve projelerimize en modern çözümleri entegre ediyoruz."
},
  mission: {
    heroTitle: 'Misyon ve Vizyonumuz',
    heroSubtitle: 'GeleceÄi inÅa ederken deÄerlerimizden Ã¶dÃ¼n vermeden ilerliyoruz.',
    missionTitle: 'Misyonumuz',
    missionText1: 'BaÄKent A.Å. olarak misyonumuz, kaliteli ve sÃ¼rdÃ¼rÃ¼lebilir inÅaat projeleri ile mÃ¼Återilerimizin hayallerini gerÃ§eÄe dÃ¶nÃ¼ÅtÃ¼rmektir. Modern mimari anlayÄ±ÅÄ±, yenilikÃ§i teknolojileri ve Ã§evre dostu uygulamalarÄ± bir araya getirerek, yaÅam alanlarÄ±na deÄer katmayÄ± hedefliyoruz.',
    missionText2: 'Her projede en yÃ¼ksek kalite standartlarÄ±nÄ± koruyarak, gÃ¼venli ve dayanÄ±klÄ± yapÄ±lar inÅa etmekteyiz. MÃ¼Återi memnuniyetini Ã¶n planda tutarak, Åeffaf ve dÃ¼rÃ¼st bir iÅ anlayÄ±ÅÄ± ile hareket ediyoruz.',
    missionQuote: 'Kaliteli yapÄ±lar inÅa ederek topluma ve Ã§evreye deÄer katmak, gÃ¼venilir ve yenilikÃ§i Ã§Ã¶zÃ¼mler sunarak sektÃ¶rÃ¼n Ã¶ncÃ¼ firmasÄ± olmak.',
    visionTitle: 'Vizyonumuz',
    visionText1: 'Vizyonumuz, TÃ¼rkiye\'nin ve bÃ¶lgenin en saygÄ±n ve tercih edilen inÅaat firmalarÄ±ndan biri olmaktÄ±r. SÃ¼rdÃ¼rÃ¼lebilir ve Ã§evre dostu yapÄ±lar inÅa ederek gelecek nesillere daha yaÅanabilir bir dÃ¼nya bÄ±rakmayÄ± amaÃ§lÄ±yoruz.',
    visionText2: 'Teknolojik yenilikleri yakÄ±ndan takip ederek, akÄ±llÄ± bina sistemleri ve enerji verimli tasarÄ±mlar ile sektÃ¶rde Ã¶ncÃ¼ rol oynamak istiyoruz. UluslararasÄ± standartlarda projeler Ã¼reterek, global pazarda da tanÄ±nan bir marka olmayÄ± hedefliyoruz.',
    visionQuote: 'TÃ¼rkiye\'nin ve bÃ¶lgenin en gÃ¼venilir, yenilikÃ§i ve sÃ¼rdÃ¼rÃ¼lebilir inÅaat firmalarÄ±ndan biri olarak geleceÄi inÅa etmek.',
  },
  management: {
    heroTitle: 'YÃ¶netim Kadromuz',
    heroSubtitle: 'Deneyimli ve profesyonel yÃ¶netim kadromuzla sektÃ¶rde fark yaratÄ±yoruz.',
    baskanSectionTitle: 'BaÅkan',
    baskanTitle: 'BaÅkan',
    baskanName: 'Yasin YILDIZ',
    baskanImagePath: '/baskan.png',
    baskanModalTitle: 'BaÄcÄ±lar Belediye BaÅkanÄ±',
    baskanBioFull: `1983 yÄ±lÄ±nda Ä°stanbul'da dÃ¼nyaya geldi. Aslen GÃ¼mÃ¼Åhanelidir. EskiÅehir Anadolu Ãniversitesi Ä°Åletme FakÃ¼ltesi'nden mezun oldu. Ä°stanbul AydÄ±n Ãniversitesi'nde "Yerel YÃ¶netimler" alanÄ±nda, YÃ¼ksek Lisans yaptÄ±.

YÄ±ldÄ±z, 2004 yÄ±lÄ±nda AK Parti BakÄ±rkÃ¶y Ä°lÃ§e GenÃ§lik KollarÄ±'nda aktif siyasete baÅladÄ±.

2007 - 2009 yÄ±llarÄ± arasÄ±nda BakÄ±rkÃ¶y GenÃ§lik KollarÄ± Ä°lÃ§e BaÅkanlÄ±ÄÄ± yapan YÄ±ldÄ±z, gÃ¶rev sÃ¼resi boyunca genÃ§lerin milli ve manevi deÄerlerine baÄlÄ±, Ã§aÄÄ±n gereksinimlerine uygun bireyler olarak yetiÅmesi iÃ§in projeler geliÅtirdi ve hayata geÃ§irdi.

YÄ±ldÄ±z daha sonra 2009 yÄ±lÄ±nda, AK Parti'den Ä°BB (Ä°stanbul BÃ¼yÃ¼kÅehir Belediyesi) ve BahÃ§elievler Belediyesi meclis Ã¼yesi seÃ§ildi. 2012-2015 yÄ±llarÄ± arasÄ±nda AK Parti Ä°stanbul Ä°l GenÃ§lik KollarÄ± Yerel YÃ¶netimlerden Sorumlu Ä°l BaÅkan YardÄ±mcÄ±lÄ±ÄÄ± gÃ¶revinde bulundu.

2014 Yerel SeÃ§imlerinden sonra BahÃ§elievler Belediye BaÅkan YardÄ±mcÄ±lÄ±ÄÄ± gÃ¶revini Ã¼stlenen YÄ±ldÄ±z, kentsel dÃ¶nÃ¼ÅÃ¼mden sosyal alanlara kadar birÃ§ok Ã¶nemli projeyi yÃ¼rÃ¼ttÃ¼.

YÄ±ldÄ±z, 2021 yÄ±lÄ±nda AK Parti Ä°stanbul Ä°l Kongresi'nde Ä°l YÃ¶netim Kurulu Ãyesi oldu. 2024 Yerel SeÃ§imlerinde de BaÄcÄ±lar Belediyesi Meclis ÃyeliÄi'ne seÃ§ilen YÄ±ldÄ±z, aynÄ± dÃ¶nemde Belediye BaÅkan YardÄ±mcÄ±sÄ± olarak atandÄ±.

Ãnceki dÃ¶nem Belediye BaÅkanÄ± Abdullah Ãzdemir'in AK Parti Ä°stanbul Ä°l BaÅkan adayÄ± olmasÄ±nÄ±n ardÄ±ndan Belediye Meclisi tarafÄ±ndan 09.01.2025 tarihinde BaÄcÄ±lar Belediye BaÅkanÄ± seÃ§ildi.

YÄ±ldÄ±z, evli ve 2 Ã§ocuk babasÄ±dÄ±r.`,
    yonetimKuruluBaskaniSectionTitle: 'YÃ¶netim Kurulu BaÅkanÄ±',
    yonetimKuruluBaskaniTitle: 'YÃ¶netim Kurulu BaÅkanÄ±',
    yonetimKuruluBaskaniName: 'Salih KUMBAR',
    yonetimKuruluBaskaniImagePath: '/genel-mudur.png',
    yonetimKuruluBaskaniModalTitle: 'YÃ¶netim Kurulu BaÅkanÄ±',
    yonetimKuruluBaskaniBioFull: `1973 yÄ±lÄ±nda ÃskÃ¼dar'da doÄdu. Ä°lkÃ¶Äretim ve ortaÃ¶Äretimini Ãmraniye'de tamamladÄ±.

1996 yÄ±lÄ±nda Ä°ETT Genel MÃ¼dÃ¼rlÃ¼ÄÃ¼nde Hareket Memuru olarak gÃ¶reve baÅladÄ±. 1997 yÄ±lÄ±nda Ä°ETT KadÄ±kÃ¶y Ä°Åletme ÅefliÄi, 2000 yÄ±lÄ±nda Ä°ETT Anadolu BÃ¶lgesi MÃ¼dÃ¼r YardÄ±mcÄ±lÄ±ÄÄ± gÃ¶revlerinde bulundu.

2007 yÄ±lÄ±nda Kocaeli BÃ¼yÃ¼kÅehir Belediyesi Kara UlaÅÄ±m Åube MÃ¼dÃ¼rlÃ¼ÄÃ¼'ne atandÄ±. 2014 yÄ±lÄ±nda Toplu TaÅÄ±ma Daire BaÅkanÄ± oldu.

Toplu TaÅÄ±ma YÃ¶netim Sistemleri, Analiz Sistemleri, Kontrol Merkezleri, Elektronik Ãcretlendirme ve Yolcu Bilgilendirme Sistemleri Ã¼zerine Ã§ok sayÄ±da proje Ã§alÄ±ÅmasÄ± yÃ¼rÃ¼ttÃ¼.

TÃ¼rkiye Belediyeler BirliÄi UlaÅÄ±m Komisyonu Toplu TaÅÄ±ma Grubu KoordinatÃ¶rlÃ¼ÄÃ¼ gÃ¶revini yÃ¼rÃ¼ttÃ¼. BahÃ§eÅehir Ãniversitesi'nde "Kentsel Sistemler ve UlaÅtÄ±rma YÃ¶netimi" alanÄ±nda yÃ¼ksek lisans yaptÄ±.

28 Haziran 2019 tarihinde Kocaeli BÃ¼yÃ¼kÅehir Belediyesi ULAÅIMPARK AÅ Genel MÃ¼dÃ¼rlÃ¼ÄÃ¼'ne getirildi. 2021 yÄ±lÄ±nda Marmara Belediyeler BirliÄi'nde gÃ¶rev yaptÄ±.

AÄustos 2022'den itibaren BaÄcÄ±lar Belediye BaÅkan DanÄ±ÅmanÄ± olarak gÃ¶rev yaparken, Temmuz 2023 itibariyle BaÄcÄ±lar Belediyesi BaÅkan YardÄ±mcÄ±sÄ± olarak gÃ¶revlendirildi.

Evli ve iki Ã§ocuk babasÄ±dÄ±r.`,
  },
  contact: {
    heroTitle: 'Ä°letiÅim',
    heroSubtitle: 'Projeleriniz iÃ§in bizimle iletiÅime geÃ§in. Size en kÄ±sa sÃ¼rede dÃ¶nÃ¼Å yapacaÄÄ±z.',
    phone: '0212 410 06 00',
    email: 'bagkent@bagkent.com.tr',
    address: 'GÃ¼neÅli Mah. Mahmutbey Cad. No:97',
    city: 'BaÄcÄ±lar/Ä°STANBUL',
    workHoursWeekday: 'Pazartesi - Cuma: 09:00 - 18:00',
    workHoursSaturday: 'Cumartesi: 09:00 - 14:00',
    workHoursSunday: 'Pazar: KapalÄ±',
    ctaTitle: 'Ofisimizi Ziyaret Edin',
    ctaText: 'Randevu alarak ofisimizi ziyaret edebilir, projeleriniz hakkÄ±nda detaylÄ± gÃ¶rÃ¼Åme yapabilirsiniz. Sizi aramÄ±zda gÃ¶rmekten mutluluk duyarÄ±z.',
  },
};

const storageKeys: Record<string, string> = {
  home: 'admin_page_home',
  about: 'admin_page_about',
  mission: 'admin_page_mission',
  management: 'admin_page_management',
  contact: 'admin_page_contact',
};

/**
 * Sayfa iÃ§eriÄini alÄ±r (localStorage'dan veya varsayÄ±lan deÄerlerden)
 */
export function getPageContent(pageName: keyof typeof defaultContents): any {
  // Client-side kontrolÃ¼
  if (typeof window === 'undefined') {
    return defaultContents[pageName];
  }

  // localStorage'dan dene
  const storageKey = storageKeys[pageName];
  if (storageKey) {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        // localStorage'dan gelen verileri varsayÄ±lan deÄerlerle birleÅtir
        return { ...defaultContents[pageName], ...parsed };
      }
    } catch (e) {
      console.error(`Failed to load ${pageName} from localStorage:`, e);
    }
  }

  // VarsayÄ±lan deÄerleri dÃ¶ndÃ¼r
  return defaultContents[pageName];
}


