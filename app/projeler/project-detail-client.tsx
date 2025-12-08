'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useImagePath } from '@/hooks/useImagePath';
import { Project } from '@/lib/projects-data';
import SafeLink from '@/components/safe-link';
import { ArrowLeft, Calendar, MapPin, Building2 } from 'lucide-react';

interface ProjectDetailClientProps {
  project: Project;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const projectImage = useImagePath(project.image);
  const fullDescription = project.fullDescription || project.description;

  return (
    <div className="pt-20">
      {/* Back Button */}
      <section className="bg-white border-b border-gray-200">
        <div className="container-custom py-4">
          <SafeLink
            href="/projeler"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Projelere Dön
          </SafeLink>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={projectImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="container-custom relative z-10 h-full flex items-end pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white max-w-4xl"
          >
            <div className="mb-4">
              <span className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full inline-block">
                {project.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-2xl">
              {project.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="prose prose-lg max-w-none"
            >
              {/* Description */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Proje Detayları</h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                  {fullDescription}
                </div>
              </div>

              {/* Project Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-blue-50 rounded-xl p-6 border border-blue-100"
                >
                  <div className="flex items-center mb-3">
                    <Building2 className="w-6 h-6 text-blue-600 mr-2" />
                    <h3 className="font-bold text-gray-900">Kategori</h3>
                  </div>
                  <p className="text-gray-700">{project.category}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-green-50 rounded-xl p-6 border border-green-100"
                >
                  <div className="flex items-center mb-3">
                    <MapPin className="w-6 h-6 text-green-600 mr-2" />
                    <h3 className="font-bold text-gray-900">Konum</h3>
                  </div>
                  <p className="text-gray-700">Bağcılar, İstanbul</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-purple-50 rounded-xl p-6 border border-purple-100"
                >
                  <div className="flex items-center mb-3">
                    <Calendar className="w-6 h-6 text-purple-600 mr-2" />
                    <h3 className="font-bold text-gray-900">Durum</h3>
                  </div>
                  <p className="text-gray-700">Devam Ediyor</p>
                </motion.div>
              </div>
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
              Bu Projeyi Daha Detaylı Görüşmek İster misiniz?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Projelerimiz hakkında daha fazla bilgi almak için bizimle iletişime geçebilirsiniz.
            </p>
            <SafeLink
              href="/iletisim"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-900 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-xl text-lg"
            >
              İletişime Geçin
            </SafeLink>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

