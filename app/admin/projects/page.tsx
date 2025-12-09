'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import SafeLink from '@/components/safe-link';
import { getAllProjectsWithImages, Project } from '@/lib/projects-data';
import { getBasePath } from '@/lib/getBasePath';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');

  useEffect(() => {
    try {
      const allProjects = getAllProjectsWithImages();
      setProjects(allProjects);
    } catch (error) {
      console.error('Projeler yüklenirken hata:', error);
      setProjects([]);
    }
  }, []);
  
  // getImagePath utility fonksiyonu - hook kullanmadan
  const getImagePath = (imagePath: string): string => {
    if (!imagePath) return '/placeholder.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    const basePath = getBasePath();
    return `${basePath}${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`;
  };

  const categories = ['Tümü', 'Konut', 'Ticari', 'Altyapı', 'Kurumsal'];

  const filteredProjects = projects.filter(project => {
    if (!project) return false;
    const matchesSearch = (project.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (project.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tümü' || (project.category || '') === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (slug: string) => {
    if (confirm('Bu projeyi silmek istediğinize emin misiniz?')) {
      // Not: Bu static export olduğu için gerçek silme işlemi için
      // JSON dosyasını düzenleyip GitHub'a commit etmek gerekir
      alert('Silme işlemi için projeler verisini düzenleyip GitHub\'a commit etmeniz gerekir.');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Proje Yönetimi</h1>
          <p className="text-gray-600">Tüm projeleri görüntüleyin, düzenleyin ve yönetin</p>
        </div>
        <SafeLink
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Yeni Proje Ekle
        </SafeLink>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ara</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Proje adı veya açıklama..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="relative h-48 bg-gray-200">
              <img
                src={getImagePath(project.image || '/placeholder.jpg')}
                alt={project.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Resim yüklenemezse placeholder göster
                  (e.target as HTMLImageElement).src = `${getBasePath()}/placeholder.jpg`;
                }}
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                  {project.category || 'Genel'}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{project.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">{project.description}</p>
              <div className="flex items-center gap-2">
                  <SafeLink
                    href={`/admin/projects/edit?slug=${project.slug}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    <Edit className="w-4 h-4" />
                    Düzenle
                  </SafeLink>
                <button
                  onClick={() => handleDelete(project.slug)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Sil"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <p className="text-gray-600 text-lg">Proje bulunamadı</p>
          <SafeLink
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium mt-4"
          >
            <Plus className="w-5 h-5" />
            İlk Projeyi Ekleyin
          </SafeLink>
        </div>
      )}
    </div>
  );
}

