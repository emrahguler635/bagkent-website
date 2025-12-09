'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getPageContent } from '@/lib/page-content';

export default function ContactPage() {
  const [content, setContent] = useState(getPageContent('contact'));

  // localStorage'dan güncellemeleri dinle
  useEffect(() => {
    const updateContent = () => {
      const newContent = getPageContent('contact');
      setContent(newContent);
    };
    
    // İlk yükleme
    updateContent();
    
    // Storage değişikliklerini dinle (farklı tab'lardan)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'admin_page_contact') {
        updateContent();
      }
    };
    
    // Custom event dinle (aynı sayfadan)
    const handleLocalStorageUpdated = (e: CustomEvent) => {
      if (e.detail?.key === 'admin_page_contact') {
        updateContent();
      }
    };
    
    // Event listener'ları ekle
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageUpdated', handleLocalStorageUpdated as EventListener);
    
    // Her 500ms'de bir kontrol et
    const interval = setInterval(updateContent, 500);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageUpdated', handleLocalStorageUpdated as EventListener);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url(https://images.pexels.com/photos/29043804/pexels-photo-29043804/free-photo-of-panoramic-view-of-ankara-cityscape.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{content.heroTitle || 'İletişim'}</h1>
            <p className="text-xl text-blue-100">
              {content.heroSubtitle || 'Projeleriniz için bizimle iletişime geçin. Size en kısa sürede dönüş yapacağız.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Map */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">İletişim Bilgileri</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Telefon</h3>
                    <a
                      href={`tel:${content.phone?.replace(/\s/g, '') || '02124100600'}`}
                      className="text-blue-600 hover:text-blue-700 transition-colors text-lg"
                    >
                      {content.phone || '0212 410 06 00'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">E-posta</h3>
                    <a
                      href={`mailto:${content.email || 'bagkent@bagkent.com.tr'}`}
                      className="text-blue-600 hover:text-blue-700 transition-colors text-lg"
                    >
                      {content.email || 'bagkent@bagkent.com.tr'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Adres</h3>
                    <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: (content.address || 'Güneşli Mah. Mahmutbey Cad. No:97<br />Bağcılar/İSTANBUL').replace(/\n/g, '<br />') }} />
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Çalışma Saatleri</h3>
                    <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: (content.workingHours || 'Pazartesi - Cuma: 09:00 - 18:00\nCumartesi: 09:00 - 14:00\nPazar: Kapalı').replace(/\n/g, '<br />') }} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Konum</h2>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[500px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.2476788574784!2d28.8567!3d41.0384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAyJzE4LjIiTiAyOMKwNTEnMjQuMSJF!5e0!3m2!1sen!2str!4v1234567890123!5m2!1sen!2str"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="BağKent A.Ş. Konum"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-3xl p-12 md:p-16 text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ofisimizi Ziyaret Edin
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Randevu alarak ofisimizi ziyaret edebilir, projeleriniz hakkında detaylı görüşme
              yapabilirsiniz. Sizi aramızda görmekten mutluluk duyarız.
            </p>
            <a
              href={`tel:${content.phone?.replace(/\s/g, '') || '02124100600'}`}
              className="inline-flex items-center px-8 py-4 bg-white text-blue-900 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-xl text-lg"
            >
              <Phone className="w-5 h-5 mr-2" />
              Hemen Arayın
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
