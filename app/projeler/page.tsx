'use client';

import { motion } from 'framer-motion';
import ProjectCard from '@/components/project-card';
import { Building2, Home, Store, Hammer } from 'lucide-react';

export default function ProjectsPage() {
  const projects = [
    {
      title: 'Bağcılar Kentsel Dönüşüm Projeleri',
      description: 'Bağcılar ilçesinde deprem güvenliği ve modern mimari standartlarına uygun kentsel dönüşüm projeleri gerçekleştirilmektedir. Güvenli ve kaliteli yaşam alanları oluşturarak vatandaşlarımızın yaşam standartlarını yükseltiyoruz. Modern konut alanları, sosyal donatılar ve yeşil alanlar ile bütünleşik projeler.',
      image: 'https://www.imtilak.net/storage/posts/image_1608792757_xzMoEGJbDHRYRflVyv2tzGYLCy6DhNSlaoxhOUM6.jpeg',
      category: 'Konut',
    },
    {
      title: 'Bağcılar Park ve Yeşil Alan Projeleri',
      description: 'İlçe genelinde yaşam kalitesini artırmak amacıyla kapsamlı park ve yeşil alan projeleri hayata geçirilmektedir. Çocuk oyun alanları, yürüyüş yolları, fitness alanları ve dinlenme mekanları ile vatandaşlarımıza nefes alabilecekleri modern yeşil alanlar sunuyoruz. Her mahallede erişilebilir park projeleri ile şehir dokusunu zenginleştiriyoruz.',
      image: 'https://damasturk.com/uploads/2023/53cc16f2ed70640c890660c01598af66e286.png',
      category: 'Altyapı',
    },
    {
      title: 'Bağcılar Kültür ve Sosyal Tesis Projeleri',
      description: 'Bağcılar\'da kültürel ve sosyal yaşamı destekleyen modern tesisler inşa edilmektedir. Kültür merkezleri, gençlik merkezleri, kütüphaneler ve toplum merkezleri ile vatandaşlarımızın sosyal ihtiyaçlarını karşılıyoruz. Sanat etkinlikleri, eğitim programları ve sosyal aktiviteler için uygun mekanlar oluşturuyoruz.',
      image: 'https://www.e-architect.com/wp-content/uploads/2025/09/quartz-plaza-istanbul-turkey-office-building-s230925-c-1.webp',
      category: 'Ticari',
    },
    {
      title: 'Bağcılar Modern Spor Tesisleri',
      description: 'Gençlerimiz ve tüm vatandaşlarımız için modern spor tesisleri projeleri gerçekleştirilmektedir. Kapalı spor salonları, futbol sahaları, basketbol ve voleybol sahaları, yüzme havuzları ve açık spor alanları ile her yaş grubuna uygun spor imkanları sunuyoruz. Sağlıklı yaşam için altyapıyı güçlendiriyoruz.',
      image: 'https://terrarealestate.com/img/803/-5be5425d5e062.jpg',
      category: 'Altyapı',
    },
    {
      title: 'Bağcılar Altyapı Modernizasyon Projeleri',
      description: 'Bağcılar\'da yol, su, kanalizasyon, elektrik ve aydınlatma sistemlerinin modernizasyonu kapsamlı olarak sürdürülmektedir. Yeni asfalt yollar, modern kanalizasyon şebekesi, güvenli su dağıtım sistemi ve LED aydınlatma ile ilçenin altyapısını 21. yüzyıl standartlarına taşıyoruz. Daha güvenli ve konforlu bir şehir için altyapı yatırımlarına devam ediyoruz.',
      image: 'https://static.birgun.net/resim/haber/2025/11/18/more-than-just-exploitation.jpg',
      category: 'Altyapı',
    },
    {
      title: 'Bağcılar Sağlık ve Eğitim Tesisleri',
      description: 'Bağcılar\'ın sağlık ve eğitim altyapısını güçlendiren modern tesis projeleri hayata geçirilmektedir. Aile sağlık merkezleri, sağlık ocakları, modern okul binaları ve eğitim tesisleri ile vatandaşlarımıza daha iyi hizmet sunuyoruz. Çocuklarımızın ve gençlerimizin kaliteli eğitim alması, tüm vatandaşlarımızın sağlık hizmetlerine kolay erişmesi için çalışıyoruz.',
      image: 'https://cdnuploads.aa.com.tr/uploads/Contents/2021/03/18/thumbs_b_c_e0cac4bf5a4b81fdcbc65613d83348c7.jpg?v=160553',
      category: 'Ticari',
    },
    {
      title: 'Bağcılar 3D Dijital Şehir İkizi Projesi',
      description: 'Yapay zeka ve dijital teknolojiler kullanılarak Bağcılar\'ın 3 boyutlu dijital ikizi oluşturulmaktadır. İstanbul Kalkınma Ajansı desteği ile gerçekleştirilen bu proje, afet yönetimi, kentsel planlama ve şehir yönetimi için Coğrafi Bilgi Sistemi tabanlı çözümler sunmaktadır. Akıllı şehir uygulamaları ile Bağcılar\'ı geleceğe taşıyoruz.',
      image: 'https://www.e-architect.com/wp-content/uploads/2023/09/istanbul-vakko-offices-by-hq-architects-h140923-h2.png',
      category: 'Altyapı',
    },
    {
      title: 'Bağcılar Enerji Verimliliği ve Akıllı Şehir',
      description: 'Bağcılar\'da enerji verimliliği ve çevre dostu uygulamalar yaygınlaştırılmaktadır. Belediye binalarında LED aydınlatma sistemleri, güneş enerjisi panelleri ve akıllı enerji yönetim sistemleri kurulmaktadır. Kamu alanlarında enerji tasarrufu sağlayan teknolojiler ile hem çevreyi koruyor hem de bütçe tasarrufu sağlıyoruz.',
      image: 'https://images.divisare.com//image/upload/c_fit,f_jpg,q_80,w_1200/v1/project_images/1883950/VAKKO_05_Credit-Iwan-Baan.jpg',
      category: 'Altyapı',
    },
    {
      title: 'Bağcılar YTÜ İş Birliği ve Akademik Projeler',
      description: 'Yıldız Teknik Üniversitesi ile imzalanan iş birliği protokolü kapsamında toplumsal fayda odaklı projeler gerçekleştirilmektedir. Bilimsel araştırmalar, kültürel miras çalışmaları, öğrenci staj programları ve uluslararası hibe projeleri ile kent ve akademi arasında köprü kuruyoruz. Gençlerimizin eğitimi ve kentimizin gelişimi için akademik iş birliklerini destekliyoruz.',
      image: 'https://obj.hayatestate.com/storage/real-estates/108/108700/00g-1.jpg',
      category: 'Kurumsal',
    },
  ];

  const categories = [
    { name: 'Tümü', icon: Building2, count: projects.length },
    { name: 'Konut', icon: Home, count: projects.filter(p => p?.category === 'Konut').length },
    { name: 'Ticari', icon: Store, count: projects.filter(p => p?.category === 'Ticari').length },
    { name: 'Altyapı', icon: Hammer, count: projects.filter(p => ['Altyapı', 'Kurumsal'].includes(p?.category ?? '')).length },
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
