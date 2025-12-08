'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SafeLink from './safe-link';
import { useImagePath } from '@/hooks/useImagePath';

interface ProjectCardProps {
  slug?: string;
  title: string;
  description: string;
  image: string;
  category: string;
  delay?: number;
}

const ProjectCard = ({ slug, title, description, image, category, delay = 0 }: ProjectCardProps) => {
  // Static export için query string kullan
  const projectUrl = slug ? `/projeler/detay?slug=${slug}` : '#';
  const imagePath = useImagePath(image);
  
  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
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

  if (slug) {
    return (
      <SafeLink href={projectUrl} className="block">
        {cardContent}
      </SafeLink>
    );
  }

  return cardContent;
};

export default ProjectCard;
