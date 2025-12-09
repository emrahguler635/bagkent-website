'use client';

import { motion } from 'framer-motion';
import { Building2, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useImagePath } from '@/hooks/useImagePath';
import { getPageContent } from '@/lib/page-content';

export default function YonetimPage() {
  const [showBioModal, setShowBioModal] = useState(false);
  const [showGenelMudurBioModal, setShowGenelMudurBioModal] = useState(false);
  const [content, setContent] = useState(getPageContent('management'));
  
  // localStorage'dan güncellemeleri dinle
  useEffect(() => {
    const updateContent = () => {
      const newContent = getPageContent('management');
      setContent(newContent);
      console.log('📝 Yönetim sayfası içeriği güncellendi:', newContent);
    };
    
    // İlk yükleme
    updateContent();
    
    // Storage değişikliklerini dinle (farklı tab'lardan)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'admin_page_management') {
        updateContent();
      }
    };
    
    // Custom event dinle (aynı sayfadan)
    const handleLocalStorageUpdated = (e: CustomEvent) => {
      if (e.detail?.key === 'admin_page_management') {
        updateContent();
      }
    };
    
    // Event listener'ları ekle
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageUpdated', handleLocalStorageUpdated as EventListener);
    
    // Her 500ms'de bir kontrol et (daha hızlı güncelleme için)
    const interval = setInterval(updateContent, 500);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageUpdated', handleLocalStorageUpdated as EventListener);
      clearInterval(interval);
    };
  }, []);
  
  // Görsel path'leri hook ile al
  const hakkimizdaHeroPath = useImagePath("/hakkimizda-hero.jpeg");
  const baskanImagePath = useImagePath(content.baskanImagePath || "/baskan.png");
  const genelMudurImagePath = useImagePath(content.yonetimKuruluBaskaniImagePath || "/genel-mudur.png");
  
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src={hakkimizdaHeroPath}
            alt="BağKent Yönetim"
            className="object-cover w-full h-full"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{content.heroTitle || 'Yönetim Kadromuz'}</h1>
            <p className="text-xl text-blue-100">
              {content.heroSubtitle || 'Deneyimli ve profesyonel yönetim kadromuzla sektörde fark yaratıyoruz.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Başkan Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-4">
              <Building2 className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{content.baskanSectionTitle || 'Başkan'}</h2>
            </div>
          </motion.div>

          {/* Başkan Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div 
              onClick={() => setShowBioModal(true)}
              className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-2xl overflow-hidden cursor-pointer hover:shadow-3xl hover:scale-[1.02] transition-all duration-300"
            >
              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                  {/* Profile Image */}
                  <div className="flex-shrink-0">
                    <div className="relative w-40 h-40">
                      <div className="absolute inset-0 rounded-full border-4 border-white shadow-xl overflow-hidden">
                        <img
                          src={baskanImagePath}
                          alt={content.baskanName || 'Yasin YILDIZ'}
                          className="w-full h-full object-cover"
                          loading="eager"
                          fetchPriority="high"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="flex-1 text-center md:text-left">
                    {/* Name and Title */}
                    <h3 className="text-2xl font-bold text-white mb-2">{(content.baskanTitle || 'BAŞKAN').toUpperCase()}</h3>
                    <p className="text-xl text-blue-50 font-semibold mb-6">{content.baskanName || 'Yasin YILDIZ'}</p>

                    {/* Click to view bio hint */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white flex items-center justify-center">
                      <p className="text-sm text-blue-50">
                        📋 Özgeçmişi görüntülemek için tıklayın
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Yönetim Kurulu Başkanı Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-4">
              <Building2 className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{content.yonetimKuruluBaskaniSectionTitle || 'Yönetim Kurulu Başkanı'}</h2>
            </div>
          </motion.div>

          {/* Yönetim Kurulu Başkanı Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div 
              onClick={() => setShowGenelMudurBioModal(true)}
              className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-2xl overflow-hidden cursor-pointer hover:shadow-3xl hover:scale-[1.02] transition-all duration-300"
            >
              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                  {/* Profile Image */}
                  <div className="flex-shrink-0">
                    <div className="relative w-40 h-40">
                      <div className="absolute inset-0 rounded-full border-4 border-white shadow-xl overflow-hidden">
                        <img
                          src={genelMudurImagePath}
                          alt={content.yonetimKuruluBaskaniName || 'Salih KUMBAR'}
                          className="w-full h-full object-cover"
                          loading="eager"
                          fetchPriority="high"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="flex-1 text-center md:text-left">
                    {/* Name and Title */}
                    <h3 className="text-2xl font-bold text-white mb-2">{(content.yonetimKuruluBaskaniTitle || 'YÖNETİM KURULU BAŞKANI').toUpperCase()}</h3>
                    <p className="text-xl text-blue-50 font-semibold mb-6">{content.yonetimKuruluBaskaniName || 'Salih KUMBAR'}</p>

                    {/* Click to view bio hint */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white flex items-center justify-center">
                      <p className="text-sm text-blue-50">
                        📋 Özgeçmişi görüntülemek için tıklayın
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Başkan Biography Modal */}
      {showBioModal && (
        <div 
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setShowBioModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowBioModal(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors z-10"
              aria-label="Kapat"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
              <div className="flex items-center gap-6">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <div className="absolute inset-0 rounded-full border-4 border-white shadow-xl overflow-hidden">
                    <img
                      src={baskanImagePath}
                      alt="Yasin YILDIZ"
                      className="w-full h-full object-cover"
                      loading="eager"
                      fetchPriority="high"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-2">{content.baskanName || 'Yasin YILDIZ'}</h3>
                  <p className="text-xl text-blue-100">{content.baskanModalTitle || 'Bağcılar Belediye Başkanı'}</p>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="prose prose-lg max-w-none">
                <div className="space-y-4 text-gray-700 leading-relaxed whitespace-pre-line">
                  {content.baskanBioFull ? (
                    content.baskanBioFull.split('\n\n').map((paragraph: string, index: number) => (
                      <p key={index}>{paragraph}</p>
                    ))
                  ) : (
                    <>
                      <p>
                        1983 yılında İstanbul'da dünyaya geldi. Aslen Gümüşhanelidir. Eskişehir Anadolu Üniversitesi İşletme Fakültesi'nden mezun oldu. İstanbul Aydın Üniversitesi'nde "Yerel Yönetimler" alanında, Yüksek Lisans yaptı.
                      </p>
                      <p>
                        Yıldız, 2004 yılında AK Parti Bakırköy İlçe Gençlik Kolları'nda aktif siyasete başladı.
                      </p>
                      <p>
                        2007 - 2009 yılları arasında Bakırköy Gençlik Kolları İlçe Başkanlığı yapan Yıldız, görev süresi boyunca gençlerin milli ve manevi değerlerine bağlı, çağın gereksinimlerine uygun bireyler olarak yetişmesi için projeler geliştirdi ve hayata geçirdi.
                      </p>
                      <p>
                        Yıldız daha sonra 2009 yılında, AK Parti'den İBB (İstanbul Büyükşehir Belediyesi) ve Bahçelievler Belediyesi meclis üyesi seçildi. 2012-2015 yılları arasında AK Parti İstanbul İl Gençlik Kolları Yerel Yönetimlerden Sorumlu İl Başkan Yardımcılığı görevinde bulundu.
                      </p>
                      <p>
                        2014 Yerel Seçimlerinden sonra Bahçelievler Belediye Başkan Yardımcılığı görevini üstlenen Yıldız, kentsel dönüşümden sosyal alanlara kadar birçok önemli projeyi yürüttü.
                      </p>
                      <p>
                        Yıldız, 2021 yılında AK Parti İstanbul İl Kongresi'nde İl Yönetim Kurulu Üyesi oldu. 2024 Yerel Seçimlerinde de Bağcılar Belediyesi Meclis Üyeliği'ne seçilen Yıldız, aynı dönemde Belediye Başkan Yardımcısı olarak atandı.
                      </p>
                      <p>
                        Önceki dönem Belediye Başkanı Abdullah Özdemir'in AK Parti İstanbul İl Başkan adayı olmasının ardından Belediye Meclisi tarafından 09.01.2025 tarihinde Bağcılar Belediye Başkanı seçildi.
                      </p>
                      <p className="font-semibold text-blue-700">
                        Yıldız, evli ve 2 çocuk babasıdır.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowBioModal(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Kapat
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Yönetim Kurulu Başkanı Biography Modal */}
      {showGenelMudurBioModal && (
        <div 
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setShowGenelMudurBioModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowGenelMudurBioModal(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors z-10"
              aria-label="Kapat"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
              <div className="flex items-center gap-6">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <div className="absolute inset-0 rounded-full border-4 border-white shadow-xl overflow-hidden">
                    <img
                      src={genelMudurImagePath}
                      alt="Salih KUMBAR"
                      className="w-full h-full object-cover"
                      loading="eager"
                      fetchPriority="high"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-2">{content.yonetimKuruluBaskaniName || 'Salih KUMBAR'}</h3>
                  <p className="text-xl text-blue-100">{content.yonetimKuruluBaskaniModalTitle || 'Yönetim Kurulu Başkanı'}</p>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="prose prose-lg max-w-none">
                <div className="space-y-4 text-gray-700 leading-relaxed whitespace-pre-line">
                  {content.yonetimKuruluBaskaniBioFull ? (
                    content.yonetimKuruluBaskaniBioFull.split('\n\n').map((paragraph: string, index: number) => (
                      <p key={index}>{paragraph}</p>
                    ))
                  ) : (
                    <>
                      <p>
                        1973 yılında Üsküdar'da doğdu. İlköğretim ve ortaöğretimini Ümraniye'de tamamladı.
                      </p>
                      <p>
                        1996 yılında İETT Genel Müdürlüğünde Hareket Memuru olarak göreve başladı. 1997 yılında İETT Kadıköy İşletme Şefliği, 2000 yılında İETT Anadolu Bölgesi Müdür Yardımcılığı görevlerinde bulundu.
                      </p>
                      <p>
                        2007 yılında Kocaeli Büyükşehir Belediyesi Kara Ulaşım Şube Müdürlüğü'ne atandı. 2014 yılında Toplu Taşıma Daire Başkanı oldu.
                      </p>
                      <p>
                        Toplu Taşıma Yönetim Sistemleri, Analiz Sistemleri, Kontrol Merkezleri, Elektronik Ücretlendirme ve Yolcu Bilgilendirme Sistemleri üzerine çok sayıda proje çalışması yürüttü.
                      </p>
                      <p>
                        Türkiye Belediyeler Birliği Ulaşım Komisyonu Toplu Taşıma Grubu Koordinatörlüğü görevini yürüttü. Bahçeşehir Üniversitesi'nde "Kentsel Sistemler ve Ulaştırma Yönetimi" alanında yüksek lisans yaptı.
                      </p>
                      <p>
                        28 Haziran 2019 tarihinde Kocaeli Büyükşehir Belediyesi ULAŞIMPARK AŞ Genel Müdürlüğü'ne getirildi. 2021 yılında Marmara Belediyeler Birliği'nde görev yaptı.
                      </p>
                      <p>
                        Ağustos 2022'den itibaren Bağcılar Belediye Başkan Danışmanı olarak görev yaparken, Temmuz 2023 itibariyle Bağcılar Belediyesi Başkan Yardımcısı olarak görevlendirildi.
                      </p>
                      <p className="font-semibold text-blue-700">
                        Evli ve iki çocuk babasıdır.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowGenelMudurBioModal(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Kapat
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
