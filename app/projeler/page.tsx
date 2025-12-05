'use client';

import { motion } from 'framer-motion';
import ProjectCard from '@/components/project-card';
import { Building2, Home, Store, Hammer } from 'lucide-react';

export default function ProjectsPage() {
  const projects = [
    {
      title: 'Modern Konut Kompleksi - Küçükçekmece',
      description: 'İstanbul Küçükçekmece bölgesinde modern mimari anlayışla tasarlanmış 200 daireli lüks konut projesi. Sosyal donatı alanları, yeşil alanlar ve kapalı otopark ile.',
      image: 'https://damasturk.com/uploads/2023/53cc16f2ed70640c890660c01598af66e286.png',
      category: 'Konut',
    },
    {
      title: 'Vakko Ofis Binası',
      description: 'Modern mimari tasarımla İstanbul\'un en prestijli ofis binalarından biri. Akıllı bina sistemleri ve enerji verimli tasarımıyla dikkat çeken ticari proje.',
      image: 'https://www.e-architect.com/wp-content/uploads/2023/09/istanbul-vakko-offices-by-hq-architects-h140923-h2.png',
      category: 'Ticari',
    },
    {
      title: 'Payallar Rezidans Kompleksi',
      description: 'Doğa ile iç içe, modern yaşam alanları sunan lüks rezidans projesi. Geniş balkonlar, manzara ve kaliteli malzeme kullanımı ile öne çıkan konut projesi.',
      image: 'https://obj.hayatestate.com/storage/real-estates/108/108700/00g-1.jpg',
      category: 'Rezidans',
    },
    {
      title: 'Terra İstanbul Apartmanları',
      description: 'İstanbul\'da konumlanmış, çarpıcı mimari tasarıma sahip apartman kompleksi. Modern yaşam alanları ve güvenli yaşam konsepti ile tasarlanmıştır.',
      image: 'https://terrarealestate.com/img/803/-5be5425d5e062.jpg',
      category: 'Konut',
    },
    {
      title: 'Vakko Fashion Center',
      description: 'Modern ticari yapı tasarımının en iyi örneklerinden. Alışveriş merkezi ve ofis alanlarını bir araya getiren çok fonksiyonlu bina projesi.',
      image: 'https://images.divisare.com//image/upload/c_fit,f_jpg,q_80,w_1200/v1/project_images/1883950/VAKKO_05_Credit-Iwan-Baan.jpg',
      category: 'Ticari',
    },
    {
      title: 'Alanya Mound House',
      description: 'Alanya\'da modern mimari detaylarla tasarlanmış özel villa projesi. Deniz manzarası ve çağdaş tasarım anlayışı ile dikkat çeker.',
      image: 'https://amazingarchitecture.com/storage/4182/1-mound_house_alanya_ware_studio.jpg',
      category: 'Villa',
    },
    {
      title: 'Quartz Plaza İstanbul',
      description: 'İstanbul\'un modern ofis binalarından biri. Cam cephe tasarımı ve sürdürülebilir mimari yaklaşımıyla sektörde örnek gösterilen proje.',
      image: 'https://www.e-architect.com/wp-content/uploads/2025/09/quartz-plaza-istanbul-turkey-office-building-s230925-c-1.webp',
      category: 'Ticari',
    },
    {
      title: 'İnşaat Altyapı Projeleri',
      description: 'Türkiye genelinde gerçekleştirdiğimiz altyapı ve sanayi projeleri. Yüksek kalite standartları ve modern ekipmanlarla tamamlanan projeler.',
      image: 'https://static.birgun.net/resim/haber/2025/11/18/more-than-just-exploitation.jpg',
      category: 'Altyapı',
    },
    {
      title: 'Ticari ve Kurumsal Yapılar',
      description: 'Türk inşaat sektöründe yüksek kaliteli ticari yapı projeleri. Modern tasarım ve fonksiyonel alan kullanımı ile öne çıkan projelerimiz.',
      image: 'https://cdnuploads.aa.com.tr/uploads/Contents/2021/03/18/thumbs_b_c_e0cac4bf5a4b81fdcbc65613d83348c7.jpg?v=160553',
      category: 'Kurumsal',
    },
  ];

  const categories = [
    { name: 'Tümü', icon: Building2, count: projects.length },
    { name: 'Konut', icon: Home, count: projects.filter(p => p?.category === 'Konut').length },
    { name: 'Ticari', icon: Store, count: projects.filter(p => p?.category === 'Ticari').length },
    { name: 'Altyapı', icon: Hammer, count: projects.filter(p => ['Altyapı', 'Kurumsal', 'Rezidans', 'Villa'].includes(p?.category ?? '')).length },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url(https://damasturk.com/uploads/2023/53cc16f2ed70640c890660c01598af66e286.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Projelerimiz</h1>
            <p className="text-xl text-blue-100">
              Modern mimari anlayışı ve kaliteli işçilikle hayata geçirdiğimiz projelerimizi keşfedin.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all cursor-pointer group"
              >
                <category.icon className="w-10 h-10 text-blue-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-gray-500 text-sm">{category.count} Proje</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} delay={index * 0.1} />
            ))}
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
              Bir Sonraki Proje Sizin Olabilir
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Hayalinizdeki projeyi birlikte hayata geçirelim. Deneyimli ekibimizle sizlere en iyi
              hizmeti sunmak için buradayız.
            </p>
            <a
              href="/iletisim"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-900 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-xl text-lg"
            >
              Projeniz İçin Bize Ulaşın
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
