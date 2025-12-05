'use client';

import { motion } from 'framer-motion';
import { Building2, Users, Award, Target, Lightbulb, Shield } from 'lucide-react';
import { getImagePath } from '@/lib/imagePath';

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Güvenilirlik',
      description: 'Her projede dürüstlük ve şeffaflık ilkesiyle hareket ederiz.',
    },
    {
      icon: Target,
      title: 'Kalite',
      description: 'En yüksek kalite standartlarını koruyarak işlerimizi tamamlarız.',
    },
    {
      icon: Lightbulb,
      title: 'Yenilikçilik',
      description: 'Sektördeki yenilikleri takip eder, projelerimize uygularız.',
    },
    {
      icon: Users,
      title: 'İş Birliği',
      description: 'Ekip çalışmasına önem verir, iş ortaklarımızla güçlü bağlar kurarız.',
    },
  ];

  const milestones = [
    { year: '1990', title: 'Kuruluş', description: 'BağKent A.Ş. İstanbul\'da kuruldu' },
    { year: '2000', title: 'Büyüme', description: '100+ proje tamamlandı' },
    { year: '2010', title: 'Ödüller', description: 'Sektör ödülleri kazanıldı' },
    { year: '2024', title: 'Bugün', description: '250+ başarılı proje' },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src={getImagePath("/hakkimizda-hero.jpeg")}
            alt="BağKent Modern Konut Projesi"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Hakkımızda</h1>
            <p className="text-xl text-blue-100">
              30 yılı aşkın deneyimimizle inşaat sektöründe güvenilir ve kaliteli hizmetin adresi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Şirketimizin Hikayesi</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                BağKent A.Ş., 1990 yılında İstanbul'da kurulmuştur. Kuruluşumuzdan bu yana inşaat
                sektöründe kalite, güvenilirlik ve müşteri memnuniyeti odaklı hizmet anlayışımızı
                sürdürmekteyiz.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Uzman kadromuz, modern teknolojiler ve yenilikçi yaklaşımımızla konut, ticari yapı ve
                altyapı projelerinde sektörün önde gelen firmalarından biri haline geldik. 250'den
                fazla başarıyla tamamlanmış projemizle müşterilerimizin güvenini kazandık.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Günümüzde İstanbul ve çevresinde faaliyet gösteren şirketimiz, her geçen gün büyüyen
                kadrosu ve artan proje portföyüyle sektörde iddialı bir konumda bulunmaktadır.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={getImagePath("/hakkimizda-team.jpeg")}
                  alt="BağKent A.Ş. Modern Konut Projesi"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-blue-600 text-white p-8 rounded-xl shadow-2xl">
                <Building2 className="w-12 h-12 mb-3" />
                <p className="text-4xl font-bold mb-1">30+</p>
                <p className="text-blue-100">Yıllık Deneyim</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Değerlerimiz
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              İş yapış şeklimizi belirleyen temel değerlerimiz.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Yolculuğumuz
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-blue-50 rounded-xl p-6 hover:bg-blue-100 transition-colors">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                  <p className="text-gray-600 text-sm">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Users className="w-16 h-16 text-blue-600 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ekibimiz</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                BağKent A.Ş. olarak, alanında uzman mimar, mühendis ve teknik personelden oluşan
                güçlü bir ekibe sahibiz. Her biri kendi alanında deneyimli profesyonellerden oluşan
                ekibimiz, projelerin en iyi şekilde tamamlanması için özverili çalışmaktadır.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Sürekli eğitim ve gelişim programlarımızla ekip üyelerimizin bilgi ve becerilerini
                güncel tutuyoruz. Bu sayede sektördeki yenilikleri takip ediyor ve projelerimize
                en modern çözümleri entegre ediyoruz.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
