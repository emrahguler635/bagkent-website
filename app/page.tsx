'use client';

import HeroSection from '@/components/hero-section';
import ProjectCard from '@/components/project-card';
import FeatureCard from '@/components/feature-card';
import { Building2, Shield, Users, Wrench, TrendingUp, HeartHandshake } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useImagePath } from '@/hooks/useImagePath';

export default function Home() {
  const homepageAboutImage = useImagePath("/homepage-about.jpeg");
  
  // Projeler sayfasındaki ilk 3 projeyi kullan
  const project1Image = useImagePath('/homepage-about.jpeg');
  const project2Image = useImagePath('/park-yesil-alan.jpg');
  const project3Image = useImagePath('/kultur-tesis.jpg');

  const projects = [
    {
      title: 'Bağcılar Kentsel Dönüşüm Projeleri',
      description: 'Bağcılar ilçesinde deprem güvenliği ve modern mimari standartlarına uygun kentsel dönüşüm projeleri gerçekleştirilmektedir.',
      image: project1Image,
      category: 'Konut',
    },
    {
      title: 'Bağcılar Park ve Yeşil Alan Projeleri',
      description: 'İlçe genelinde yaşam kalitesini artırmak amacıyla kapsamlı park ve yeşil alan projeleri hayata geçirilmektedir.',
      image: project2Image,
      category: 'Altyapı',
    },
    {
      title: 'Bağcılar Kültür ve Sosyal Tesis Projeleri',
      description: 'Bağcılar\'da kültürel ve sosyal yaşamı destekleyen modern tesisler inşa edilmektedir.',
      image: project3Image,
      category: 'Ticari',
    },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Güvenilir Hizmet',
      description: '30 yıllık deneyimimiz ile her projede en yüksek kalite standartlarını garanti ediyoruz.',
    },
    {
      icon: Users,
      title: 'Uzman Ekip',
      description: 'Alanında uzman mimar ve mühendislerden oluşan profesyonel ekibimiz.',
    },
    {
      icon: Building2,
      title: 'Modern Mimari',
      description: 'Çağdaş tasarım anlayışı ile estetik ve fonksiyonel yapılar üretiyoruz.',
    },
    {
      icon: Wrench,
      title: 'Kaliteli Malzeme',
      description: 'Projelerimizde sadece birinci sınıf malzemeler kullanıyoruz.',
    },
    {
      icon: TrendingUp,
      title: 'Sürdürülebilirlik',
      description: 'Çevre dostu ve enerji verimli yapılar ile geleceğe yatırım yapıyoruz.',
    },
    {
      icon: HeartHandshake,
      title: 'Müşteri Memnuniyeti',
      description: 'Müşteri memnuniyeti bizim için her zaman öncelikli hedeftir.',
    },
  ];

  return (
    <>
      <HeroSection />

      {/* About Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                BağKent A.Ş. Hakkında
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                BağKent A.Ş., 30 yılı aşkın süredir inşaat sektöründe faaliyet gösteren, güvenilir ve
                köklü bir firmadır. Modern mimari çözümler, kaliteli işçilik ve müşteri memnuniyeti
                odaklı yaklaşımımızla İstanbul'un önemli projelerine imza atıyoruz.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Konut projelerinden ticari yapılara, altyapı çalışmalarından restorasyon projelerine
                kadar geniş bir yelpazede hizmet sunmaktayız. Her projede aynı özen ve kalite
                anlayışıyla çalışarak, sektördeki lider konumumuzu sürdürüyoruz.
              </p>
              <Link
                href="/kurumsal/hakkimizda"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
              >
                Daha Fazla Bilgi
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={homepageAboutImage}
                alt="BağKent Modern Konut Projesi"
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Neden BağKent
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Sektördeki deneyimimiz ve yenilikçi yaklaşımımızla sizlere en iyi hizmeti sunuyoruz.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Öne Çıkan Projelerimiz
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Gerçekleştirdiğimiz projelerde modern mimari ve kaliteli işçiliği bir araya getiriyoruz.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} delay={index * 0.1} />
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/projeler"
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              Tüm Projeleri Görüntüle
            </Link>
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
              Hayalinizdeki Projeyi Birlikte Gerçekleştirelim
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Uzman ekibimiz ve 30 yıllık deneyimimizle projelerinize değer katmaya hazırız.
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-900 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-xl text-lg"
            >
              Hemen İletişime Geçin
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
