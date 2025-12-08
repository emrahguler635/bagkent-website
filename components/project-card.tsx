'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, X, Calendar, MapPin, Building2 } from 'lucide-react';
import { useImagePath } from '@/hooks/useImagePath';
import { Project } from '@/lib/projects-data';
import SafeLink from './safe-link';

interface ProjectCardProps {
  slug?: string;
  title: string;
  description: string;
  image: string;
  category: string;
  delay?: number;
  fullProject?: Project | null; // Tam proje detayları (modal için)
}

const ProjectCard = ({ slug, title, description, image, category, delay = 0, fullProject }: ProjectCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const imagePath = useImagePath(image);
  
  // Project bilgilerini güvenli şekilde al
  const project = fullProject || null;
  const projectImage = project ? useImagePath(project.image) : imagePath;
  const fullDescription = project?.fullDescription || description;
  
  const handleCardClick = () => {
    if (slug && project) {
      setShowModal(true);
    }
  };
  
  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      onClick={handleCardClick}
      className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imagePath}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
            {category}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-blue-600 text-white rounded-full p-2 shadow-lg">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
        {slug && (
          <div className="mt-4 flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
            <span>Detayları Gör</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <>
      {cardContent}
      
      {/* Modal */}
      {showModal && project && (
          <div 
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors z-10"
                aria-label="Kapat"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Hero Image */}
              <div className="relative h-[40vh] min-h-[300px] overflow-hidden">
                <Image
                  src={projectImage}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex items-end pb-8 px-8">
                  <div className="text-white max-w-4xl">
                    <span className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full inline-block mb-4">
                      {project.category}
                    </span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                      {project.title}
                    </h1>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Proje Detayları</h2>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line text-lg mb-12">
                    {fullDescription}
                  </div>

                  {/* Info Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                      <div className="flex items-center mb-3">
                        <Building2 className="w-6 h-6 text-blue-600 mr-2" />
                        <h3 className="font-bold text-gray-900">Kategori</h3>
                      </div>
                      <p className="text-gray-700">{project.category}</p>
                    </div>

                    <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                      <div className="flex items-center mb-3">
                        <MapPin className="w-6 h-6 text-green-600 mr-2" />
                        <h3 className="font-bold text-gray-900">Konum</h3>
                      </div>
                      <p className="text-gray-700">Bağcılar, İstanbul</p>
                    </div>

                    <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                      <div className="flex items-center mb-3">
                        <Calendar className="w-6 h-6 text-purple-600 mr-2" />
                        <h3 className="font-bold text-gray-900">Durum</h3>
                      </div>
                      <p className="text-gray-700">Devam Ediyor</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-8 md:p-12">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Bu Projeyi Daha Detaylı Görüşmek İster misiniz?
                  </h2>
                  <p className="text-xl text-blue-100 mb-6">
                    Projelerimiz hakkında daha fazla bilgi almak için bizimle iletişime geçebilirsiniz.
                  </p>
                  <SafeLink
                    href="/iletisim"
                    className="inline-flex items-center px-8 py-4 bg-white text-blue-900 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-xl text-lg"
                    onClick={() => setShowModal(false)}
                  >
                    İletişime Geçin
                  </SafeLink>
                </div>
              </div>
            </motion.div>
          </div>
      )}
    </>
  );
};

export default ProjectCard;
