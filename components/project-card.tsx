'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useImagePath } from '@/hooks/useImagePath';
import { Project } from '@/lib/projects-data';

interface ProjectCardProps {
  slug?: string;
  title: string;
  description: string;
  image: string;
  category: string;
  delay?: number;
  fullProject?: Project;
}

const ProjectCard = ({ slug, title, description, image, category, delay = 0, fullProject }: ProjectCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imagePath = useImagePath(image);
  const project = fullProject || { slug, title, description, image, category };
  const projectImagePath = useImagePath(project.image);
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        onClick={() => setIsModalOpen(true)}
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
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
        </div>
      </motion.div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors z-10"
              aria-label="Kapat"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Content */}
            <div className="relative h-64 md:h-96 w-full">
              <Image
                src={projectImagePath}
                alt={project.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full mb-2 inline-block">
                  {project.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{project.title}</h2>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="prose max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;
