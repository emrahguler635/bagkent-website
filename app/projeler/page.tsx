'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/project-card';
import SafeLink from '@/components/safe-link';
import { Building2, Home, Store, Hammer } from 'lucide-react';
import { getAllProjectsWithImages, Project } from '@/lib/projects-data';
import { getPageContent } from '@/lib/page-content';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    // Sayfa içeriğini yükle
    const pageContent = getPageContent('projects');
    setContent(pageContent);

    // Projeleri yükle
    const loadProjects = () => {
      try {
        const allProjects = getAllProjectsWithImages();
        // localStorage'dan özel projeler varsa onları da ekle
        if (typeof window !== 'undefined') {
          const savedProjects = localStorage.getItem('admin_projects_list');
          if (savedProjects) {
            try {
              const parsedProjects = JSON.parse(savedProjects);
              setProjects([...allProjects, ...parsedProjects]);
            } catch (e) {
              setProjects(allProjects);
            }
          } else {
            setProjects(allProjects);
          }
        } else {
          setProjects(allProjects);
        }
      } catch (error) {
        console.error('Projeler yüklenirken hata:', error);
        setProjects([]);
      }
    };

    loadProjects();

    // localStorage değişikliklerini dinle
    const handleStorageUpdate = () => {
      loadProjects();
      const updatedContent = getPageContent('projects');
      setContent(updatedContent);
    };

    window.addEventListener('storage', handleStorageUpdate);
    window.addEventListener('localStorageUpdated', handleStorageUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageUpdate);
      window.removeEventListener('localStorageUpdated', handleStorageUpdate);
    };
  }, []);

  const categories = [
    { name: 'Tümü', icon: Building2, count: projects.length },
    { name: 'Konut', icon: Home, count: projects.filter(p => p?.category === 'Konut').length },
    { name: 'Ticari', icon: Store, count: projects.filter(p => p?.category === 'Ticari').length },
    { name: 'Altyapı', icon: Hammer, count: projects.filter(p => ['Altyapı', 'Kurumsal'].includes(p?.category ?? '')).length },
  ];

  const pageContent = content || {
    heroTitle: 'Projelerimiz',
    heroSubtitle: 'Modern mimari anlayışı ve kaliteli işçilikle hayata geçirdiğimiz projelerimizi keşfedin.',
    ctaTitle: 'Bir Sonraki Proje Sizin Olabilir',
    ctaText: 'Hayalinizdeki projeyi birlikte hayata geçirelim. Deneyimli ekibimizle sizlere en iyi hizmeti sunmak için buradayız.',
    ctaButtonText: 'Projeniz İçin Bize Ulaşın',
  };

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{pageContent.heroTitle}</h1>
            <p className="text-xl text-blue-100">
              {pageContent.heroSubtitle}
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
              <ProjectCard 
                key={project.slug} 
                slug={project.slug}
                title={project.title}
                description={project.description}
                image={project.image}
                category={project.category}
                fullProject={project}
                delay={index * 0.1} 
              />
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
              {pageContent.ctaTitle}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {pageContent.ctaText}
            </p>
            <SafeLink
              href="/iletisim"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-900 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-xl text-lg"
            >
              {pageContent.ctaButtonText}
            </SafeLink>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
