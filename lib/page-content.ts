/**
 * Sayfa iÃÂ§eriklerini localStorage'dan veya varsayÃÂ±lan deÃÂerlerden alÃÂ±r
 * Bu sayede admin panelinden yapÃÂ±lan deÃÂiÃÂiklikler hemen yansÃÂ±r
 */

// VarsayÃÂ±lan deÃÂerler
const defaultContents: Record<string, any> = {
  home: {
    heroTitle: 'GeleceÃÂi ÃÂ°nÃÂa Eden GÃÂ¼ven',
    heroSubtitle: 'Modern mimari ÃÂ§ÃÂ¶zÃÂ¼mler ve kaliteli yapÃÂ±lar ile hayallerinizi gerÃÂ§eÃÂe dÃÂ¶nÃÂ¼ÃÂtÃÂ¼rÃÂ¼yoruz.',
    aboutTitle: 'BaÃÂKent A.ÃÂ. HakkÃÂ±nda',
    aboutText1: 'BaÃÂKent A.ÃÂ., 30 yÃÂ±lÃÂ± aÃÂkÃÂ±n sÃÂ¼redir inÃÂaat sektÃÂ¶rÃÂ¼nde faaliyet gÃÂ¶steren, gÃÂ¼venilir ve kÃÂ¶klÃÂ¼ bir firmadÃÂ±r. Modern mimari ÃÂ§ÃÂ¶zÃÂ¼mler, kaliteli iÃÂÃÂ§ilik ve mÃÂ¼ÃÂteri memnuniyeti odaklÃÂ± yaklaÃÂÃÂ±mÃÂ±mÃÂ±zla ÃÂ°stanbul\'un ÃÂ¶nemli projelerine imza atÃÂ±yoruz.',
    aboutText2: 'Konut projelerinden ticari yapÃÂ±lara, altyapÃÂ± ÃÂ§alÃÂ±ÃÂmalarÃÂ±ndan restorasyon projelerine kadar geniÃÂ bir yelpazede hizmet sunmaktayÃÂ±z. Her projede aynÃÂ± ÃÂ¶zen ve kalite anlayÃÂ±ÃÂÃÂ±yla ÃÂ§alÃÂ±ÃÂarak, sektÃÂ¶rdeki lider konumumuzu sÃÂ¼rdÃÂ¼rÃÂ¼yoruz.',
    slogan: 'BaÃÂKent Sizinle GÃÂ¼zel',
    ctaTitle: 'Hayalinizdeki Projeyi Birlikte GerÃÂ§ekleÃÂtirelim',
    ctaText: 'Uzman ekibimiz ve 30 yÃÂ±llÃÂ±k deneyimimizle projelerinize deÃÂer katmaya hazÃÂ±rÃÂ±z.',
  },
  about: {
    "heroTitle": "Hakkımızda",
    "heroSubtitle": "30 yılı aşkın deneyimimizle inşaat sektöründe güvenilir ve kaliteli hizmetin adresi.",
    "storyTitle": "Şirketimizin Hikayesi",
    "storyText1": "BağKent A.Ş. 2025 yılında İstanbul\\'da kurulmuştur. Kuruluşumuzdan bu yana inşaat sektöründe kalite, güvenilirlik ve müşteri memnuniyeti odaklı hizmet anlayışımızı sürdürmekteyiz.",
    "storyText2": "Uzman kadromuz, modern teknolojiler ve yenilikçi yaklaşımımızla konut, ticari yapı ve altyapı projelerinde sektörün önde gelen firmalarından biri haline geldik. 250\\'den fazla başarıyla tamamlanmış projemizle müşterilerimizin güvenini kazandık.",
    "storyText3": "Günümüzde İstanbul ve çevresinde faaliyet gösteren şirketimiz, her geçen gün büyüyen kadrosu ve artan proje portföyüyle sektörde iddialı bir konumda bulunmaktadır.",
    "teamTitle": "Ekibimiz",
    "teamText1": "BağKent A.Ş. olarak, alanında uzman mimar, mühendis ve teknik personelden oluşan güçlü bir ekibe sahibiz. Her biri kendi alanında deneyimli profesyonellerden oluşan ekibimiz, projelerin en iyi şekilde tamamlanması için özverili çalışmaktadır.",
    "teamText2": "Sürekli eğitim ve gelişim programlarımızla ekip üyelerimizin bilgi ve becerilerini güncel tutuyoruz. Bu sayede sektördeki yenilikleri takip ediyor ve projelerimize en modern çözümleri entegre ediyoruz."
},
  mission: {
    heroTitle: 'Misyon ve Vizyonumuz',
    heroSubtitle: 'GeleceÃÂi inÃÂa ederken deÃÂerlerimizden ÃÂ¶dÃÂ¼n vermeden ilerliyoruz.',
    missionTitle: 'Misyonumuz',
    missionText1: 'BaÃÂKent A.ÃÂ. olarak misyonumuz, kaliteli ve sÃÂ¼rdÃÂ¼rÃÂ¼lebilir inÃÂaat projeleri ile mÃÂ¼ÃÂterilerimizin hayallerini gerÃÂ§eÃÂe dÃÂ¶nÃÂ¼ÃÂtÃÂ¼rmektir. Modern mimari anlayÃÂ±ÃÂÃÂ±, yenilikÃÂ§i teknolojileri ve ÃÂ§evre dostu uygulamalarÃÂ± bir araya getirerek, yaÃÂam alanlarÃÂ±na deÃÂer katmayÃÂ± hedefliyoruz.',
    missionText2: 'Her projede en yÃÂ¼ksek kalite standartlarÃÂ±nÃÂ± koruyarak, gÃÂ¼venli ve dayanÃÂ±klÃÂ± yapÃÂ±lar inÃÂa etmekteyiz. MÃÂ¼ÃÂteri memnuniyetini ÃÂ¶n planda tutarak, ÃÂeffaf ve dÃÂ¼rÃÂ¼st bir iÃÂ anlayÃÂ±ÃÂÃÂ± ile hareket ediyoruz.',
    missionQuote: 'Kaliteli yapÃÂ±lar inÃÂa ederek topluma ve ÃÂ§evreye deÃÂer katmak, gÃÂ¼venilir ve yenilikÃÂ§i ÃÂ§ÃÂ¶zÃÂ¼mler sunarak sektÃÂ¶rÃÂ¼n ÃÂ¶ncÃÂ¼ firmasÃÂ± olmak.',
    visionTitle: 'Vizyonumuz',
    visionText1: 'Vizyonumuz, TÃÂ¼rkiye\'nin ve bÃÂ¶lgenin en saygÃÂ±n ve tercih edilen inÃÂaat firmalarÃÂ±ndan biri olmaktÃÂ±r. SÃÂ¼rdÃÂ¼rÃÂ¼lebilir ve ÃÂ§evre dostu yapÃÂ±lar inÃÂa ederek gelecek nesillere daha yaÃÂanabilir bir dÃÂ¼nya bÃÂ±rakmayÃÂ± amaÃÂ§lÃÂ±yoruz.',
    visionText2: 'Teknolojik yenilikleri yakÃÂ±ndan takip ederek, akÃÂ±llÃÂ± bina sistemleri ve enerji verimli tasarÃÂ±mlar ile sektÃÂ¶rde ÃÂ¶ncÃÂ¼ rol oynamak istiyoruz. UluslararasÃÂ± standartlarda projeler ÃÂ¼reterek, global pazarda da tanÃÂ±nan bir marka olmayÃÂ± hedefliyoruz.',
    visionQuote: 'TÃÂ¼rkiye\'nin ve bÃÂ¶lgenin en gÃÂ¼venilir, yenilikÃÂ§i ve sÃÂ¼rdÃÂ¼rÃÂ¼lebilir inÃÂaat firmalarÃÂ±ndan biri olarak geleceÃÂi inÃÂa etmek.',
  },
  management: {
    heroTitle: 'YÃÂ¶netim Kadromuz',
    heroSubtitle: 'Deneyimli ve profesyonel yÃÂ¶netim kadromuzla sektÃÂ¶rde fark yaratÃÂ±yoruz.',
    baskanSectionTitle: 'BaÃÂkan',
    baskanTitle: 'BaÃÂkan',
    baskanName: 'Yasin YILDIZ',
    baskanImagePath: '/baskan.png',
    baskanModalTitle: 'BaÃÂcÃÂ±lar Belediye BaÃÂkanÃÂ±',
    baskanBioFull: `1983 yÃÂ±lÃÂ±nda ÃÂ°stanbul'da dÃÂ¼nyaya geldi. Aslen GÃÂ¼mÃÂ¼ÃÂhanelidir. EskiÃÂehir Anadolu ÃÂniversitesi ÃÂ°ÃÂletme FakÃÂ¼ltesi'nden mezun oldu. ÃÂ°stanbul AydÃÂ±n ÃÂniversitesi'nde "Yerel YÃÂ¶netimler" alanÃÂ±nda, YÃÂ¼ksek Lisans yaptÃÂ±.

YÃÂ±ldÃÂ±z, 2004 yÃÂ±lÃÂ±nda AK Parti BakÃÂ±rkÃÂ¶y ÃÂ°lÃÂ§e GenÃÂ§lik KollarÃÂ±'nda aktif siyasete baÃÂladÃÂ±.

2007 - 2009 yÃÂ±llarÃÂ± arasÃÂ±nda BakÃÂ±rkÃÂ¶y GenÃÂ§lik KollarÃÂ± ÃÂ°lÃÂ§e BaÃÂkanlÃÂ±ÃÂÃÂ± yapan YÃÂ±ldÃÂ±z, gÃÂ¶rev sÃÂ¼resi boyunca genÃÂ§lerin milli ve manevi deÃÂerlerine baÃÂlÃÂ±, ÃÂ§aÃÂÃÂ±n gereksinimlerine uygun bireyler olarak yetiÃÂmesi iÃÂ§in projeler geliÃÂtirdi ve hayata geÃÂ§irdi.

YÃÂ±ldÃÂ±z daha sonra 2009 yÃÂ±lÃÂ±nda, AK Parti'den ÃÂ°BB (ÃÂ°stanbul BÃÂ¼yÃÂ¼kÃÂehir Belediyesi) ve BahÃÂ§elievler Belediyesi meclis ÃÂ¼yesi seÃÂ§ildi. 2012-2015 yÃÂ±llarÃÂ± arasÃÂ±nda AK Parti ÃÂ°stanbul ÃÂ°l GenÃÂ§lik KollarÃÂ± Yerel YÃÂ¶netimlerden Sorumlu ÃÂ°l BaÃÂkan YardÃÂ±mcÃÂ±lÃÂ±ÃÂÃÂ± gÃÂ¶revinde bulundu.

2014 Yerel SeÃÂ§imlerinden sonra BahÃÂ§elievler Belediye BaÃÂkan YardÃÂ±mcÃÂ±lÃÂ±ÃÂÃÂ± gÃÂ¶revini ÃÂ¼stlenen YÃÂ±ldÃÂ±z, kentsel dÃÂ¶nÃÂ¼ÃÂÃÂ¼mden sosyal alanlara kadar birÃÂ§ok ÃÂ¶nemli projeyi yÃÂ¼rÃÂ¼ttÃÂ¼.

YÃÂ±ldÃÂ±z, 2021 yÃÂ±lÃÂ±nda AK Parti ÃÂ°stanbul ÃÂ°l Kongresi'nde ÃÂ°l YÃÂ¶netim Kurulu ÃÂyesi oldu. 2024 Yerel SeÃÂ§imlerinde de BaÃÂcÃÂ±lar Belediyesi Meclis ÃÂyeliÃÂi'ne seÃÂ§ilen YÃÂ±ldÃÂ±z, aynÃÂ± dÃÂ¶nemde Belediye BaÃÂkan YardÃÂ±mcÃÂ±sÃÂ± olarak atandÃÂ±.

ÃÂnceki dÃÂ¶nem Belediye BaÃÂkanÃÂ± Abdullah ÃÂzdemir'in AK Parti ÃÂ°stanbul ÃÂ°l BaÃÂkan adayÃÂ± olmasÃÂ±nÃÂ±n ardÃÂ±ndan Belediye Meclisi tarafÃÂ±ndan 09.01.2025 tarihinde BaÃÂcÃÂ±lar Belediye BaÃÂkanÃÂ± seÃÂ§ildi.

YÃÂ±ldÃÂ±z, evli ve 2 ÃÂ§ocuk babasÃÂ±dÃÂ±r.`,
    yonetimKuruluBaskaniSectionTitle: 'YÃÂ¶netim Kurulu BaÃÂkanÃÂ±',
    yonetimKuruluBaskaniTitle: 'YÃÂ¶netim Kurulu BaÃÂkanÃÂ±',
    yonetimKuruluBaskaniName: 'Salih KUMBAR',
    yonetimKuruluBaskaniImagePath: '/genel-mudur.png',
    yonetimKuruluBaskaniModalTitle: 'YÃÂ¶netim Kurulu BaÃÂkanÃÂ±',
    yonetimKuruluBaskaniBioFull: `1973 yÃÂ±lÃÂ±nda ÃÂskÃÂ¼dar'da doÃÂdu. ÃÂ°lkÃÂ¶ÃÂretim ve ortaÃÂ¶ÃÂretimini ÃÂmraniye'de tamamladÃÂ±.

1996 yÃÂ±lÃÂ±nda ÃÂ°ETT Genel MÃÂ¼dÃÂ¼rlÃÂ¼ÃÂÃÂ¼nde Hareket Memuru olarak gÃÂ¶reve baÃÂladÃÂ±. 1997 yÃÂ±lÃÂ±nda ÃÂ°ETT KadÃÂ±kÃÂ¶y ÃÂ°ÃÂletme ÃÂefliÃÂi, 2000 yÃÂ±lÃÂ±nda ÃÂ°ETT Anadolu BÃÂ¶lgesi MÃÂ¼dÃÂ¼r YardÃÂ±mcÃÂ±lÃÂ±ÃÂÃÂ± gÃÂ¶revlerinde bulundu.

2007 yÃÂ±lÃÂ±nda Kocaeli BÃÂ¼yÃÂ¼kÃÂehir Belediyesi Kara UlaÃÂÃÂ±m ÃÂube MÃÂ¼dÃÂ¼rlÃÂ¼ÃÂÃÂ¼'ne atandÃÂ±. 2014 yÃÂ±lÃÂ±nda Toplu TaÃÂÃÂ±ma Daire BaÃÂkanÃÂ± oldu.

Toplu TaÃÂÃÂ±ma YÃÂ¶netim Sistemleri, Analiz Sistemleri, Kontrol Merkezleri, Elektronik ÃÂcretlendirme ve Yolcu Bilgilendirme Sistemleri ÃÂ¼zerine ÃÂ§ok sayÃÂ±da proje ÃÂ§alÃÂ±ÃÂmasÃÂ± yÃÂ¼rÃÂ¼ttÃÂ¼.

TÃÂ¼rkiye Belediyeler BirliÃÂi UlaÃÂÃÂ±m Komisyonu Toplu TaÃÂÃÂ±ma Grubu KoordinatÃÂ¶rlÃÂ¼ÃÂÃÂ¼ gÃÂ¶revini yÃÂ¼rÃÂ¼ttÃÂ¼. BahÃÂ§eÃÂehir ÃÂniversitesi'nde "Kentsel Sistemler ve UlaÃÂtÃÂ±rma YÃÂ¶netimi" alanÃÂ±nda yÃÂ¼ksek lisans yaptÃÂ±.

28 Haziran 2019 tarihinde Kocaeli BÃÂ¼yÃÂ¼kÃÂehir Belediyesi ULAÃÂIMPARK AÃÂ Genel MÃÂ¼dÃÂ¼rlÃÂ¼ÃÂÃÂ¼'ne getirildi. 2021 yÃÂ±lÃÂ±nda Marmara Belediyeler BirliÃÂi'nde gÃÂ¶rev yaptÃÂ±.

AÃÂustos 2022'den itibaren BaÃÂcÃÂ±lar Belediye BaÃÂkan DanÃÂ±ÃÂmanÃÂ± olarak gÃÂ¶rev yaparken, Temmuz 2023 itibariyle BaÃÂcÃÂ±lar Belediyesi BaÃÂkan YardÃÂ±mcÃÂ±sÃÂ± olarak gÃÂ¶revlendirildi.

Evli ve iki ÃÂ§ocuk babasÃÂ±dÃÂ±r.`,
  },
  contact: {
    heroTitle: 'ÃÂ°letiÃÂim',
    heroSubtitle: 'Projeleriniz iÃÂ§in bizimle iletiÃÂime geÃÂ§in. Size en kÃÂ±sa sÃÂ¼rede dÃÂ¶nÃÂ¼ÃÂ yapacaÃÂÃÂ±z.',
    phone: '0212 410 06 00',
    email: 'bagkent@bagkent.com.tr',
    address: 'GÃÂ¼neÃÂli Mah. Mahmutbey Cad. No:97',
    city: 'BaÃÂcÃÂ±lar/ÃÂ°STANBUL',
    workHoursWeekday: 'Pazartesi - Cuma: 09:00 - 18:00',
    workHoursSaturday: 'Cumartesi: 09:00 - 14:00',
    workHoursSunday: 'Pazar: KapalÃÂ±',
    ctaTitle: 'Ofisimizi Ziyaret Edin',
    ctaText: 'Randevu alarak ofisimizi ziyaret edebilir, projeleriniz hakkÃÂ±nda detaylÃÂ± gÃÂ¶rÃÂ¼ÃÂme yapabilirsiniz. Sizi aramÃÂ±zda gÃÂ¶rmekten mutluluk duyarÃÂ±z.',
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
 * Sayfa iÃÂ§eriÃÂini alÃÂ±r (localStorage'dan veya varsayÃÂ±lan deÃÂerlerden)
 */
export function getPageContent(pageName: keyof typeof defaultContents): any {
  // Client-side kontrolÃÂ¼
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
        // localStorage'dan gelen verileri varsayÃÂ±lan deÃÂerlerle birleÃÂtir
        return { ...defaultContents[pageName], ...parsed };
      }
    } catch (e) {
      console.error(`Failed to load ${pageName} from localStorage:`, e);
    }
  }

  // VarsayÃÂ±lan deÃÂerleri dÃÂ¶ndÃÂ¼r
  return defaultContents[pageName];
}


