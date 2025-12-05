'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Compass, TrendingUp } from 'lucide-react';
import Image from 'next/image';

export default function MissionVisionPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url(https://www.e-architect.com/wp-content/uploads/2025/09/quartz-plaza-istanbul-turkey-office-building-s230925-c-1.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Misyon ve Vizyonumuz</h1>
            <p className="text-xl text-blue-100">
              Geleceği inşa ederken değerlerimizden ödün vermeden ilerliyoruz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Misyonumuz</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                BağKent A.Ş. olarak misyonumuz, kaliteli ve sürdürülebilir inşaat projeleri ile
                müşterilerimizin hayallerini gerçeğe dönüştürmektir. Modern mimari anlayışı,
                yenilikçi teknolojileri ve çevre dostu uygulamaları bir araya getirerek, yaşam
                alanlarına değer katmayı hedefliyoruz.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Her projede en yüksek kalite standartlarını koruyarak, güvenli ve dayanıklı yapılar
                inşa etmekteyiz. Müşteri memnuniyetini ön planda tutarak, şeffaf ve dürüst bir
                iş anlayışı ile hareket ediyoruz.
              </p>
              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-600">
                <p className="text-gray-700 font-medium italic">
                  "Kaliteli yapılar inşa ederek topluma ve çevreye değer katmak, güvenilir ve
                  yenilikçi çözümler sunarak sektörün öncü firması olmak."
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="https://cdnuploads.aa.com.tr/uploads/Contents/2021/03/18/thumbs_b_c_e0cac4bf5a4b81fdcbc65613d83348c7.jpg?v=160553"
                alt="BağKent Misyon"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="https://amazingarchitecture.com/storage/4182/1-mound_house_alanya_ware_studio.jpg"
                alt="BağKent Vizyon"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Vizyonumuz</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Vizyonumuz, Türkiye'nin ve bölgenin en saygın ve tercih edilen inşaat firmalarından
                biri olmaktır. Sürdürülebilir ve çevre dostu yapılar inşa ederek gelecek nesillere
                daha yaşanabilir bir dünya bırakmayı amaçlıyoruz.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Teknolojik yenilikleri yakından takip ederek, akıllı bina sistemleri ve enerji
                verimli tasarımlar ile sektörde öncü rol oynamak istiyoruz. Uluslararası
                standartlarda projeler üreterek, global pazarda da tanınan bir marka olmayı
                hedefliyoruz.
              </p>
              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-600">
                <p className="text-gray-700 font-medium italic">
                  "Türkiye'nin ve bölgenin en güvenilir, yenilikçi ve sürdürülebilir inşaat
                  firmalarından biri olarak geleceği inşa etmek."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Temel İlkelerimiz
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Misyon ve vizyonumuzu hayata geçirirken rehberimiz olan ilkeler.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all"
            >
              <Compass className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sürdürülebilirlik</h3>
              <p className="text-gray-600">
                Çevre dostu malzemeler ve enerji verimli tasarımlarla doğaya saygılı projeler üretiyoruz.
                Gelecek nesillere yaşanabilir bir dünya bırakmak önceliğimizdir.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all"
            >
              <TrendingUp className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Yenilikçilik</h3>
              <p className="text-gray-600">
                Sektördeki yenilikleri yakından takip ediyor, en son teknolojileri projelerimizde
                kullanarak modern ve akıllı yapılar inşa ediyoruz.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all"
            >
              <Target className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Kalite Odaklılık</h3>
              <p className="text-gray-600">
                Her projede en yüksek kalite standartlarını uygulayarak, güvenli, dayanıklı ve
                estetik açıdan mükemmel yapılar ortaya koyuyoruz.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Birlikte Geleceği İnşa Edelim
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Misyon ve vizyonumuz doğrultusunda sizlere en iyi hizmeti sunmak için buradayız.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
