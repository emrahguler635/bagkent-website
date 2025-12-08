'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus, Edit, Trash2, TrendingUp, Eye } from 'lucide-react';
import SafeLink from '@/components/safe-link';
import { getAllProjectsWithImages } from '@/lib/projects-data';

export default function AdminDashboard() {
  const [projects, setProjects] = useState(getAllProjectsWithImages());

  useEffect(() => {
    setProjects(getAllProjectsWithImages());
  }, []);

  const stats = [
    {
      title: 'Toplam Proje',
      value: projects.length,
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      title: 'Konut Projeleri',
      value: projects.filter(p => p.category === 'Konut').length,
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      title: 'Ticari Projeler',
      value: projects.filter(p => p.category === 'Ticari').length,
      icon: TrendingUp,
      color: 'bg-yellow-500',
    },
    {
      title: 'Altyapı Projeleri',
      value: projects.filter(p => ['Altyapı', 'Kurumsal'].includes(p.category)).length,
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Proje yönetim paneline hoş geldiniz</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Hızlı İşlemler</h2>
        <div className="flex flex-wrap gap-4">
          <SafeLink
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Yeni Proje Ekle
          </SafeLink>
          <SafeLink
            href="/admin/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            <Edit className="w-5 h-5" />
            Tüm Projeleri Yönet
          </SafeLink>
          <SafeLink
            href="/projeler"
            target="_blank"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <Eye className="w-5 h-5" />
            Projeler Sayfasını Görüntüle
          </SafeLink>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Son Projeler</h2>
          <SafeLink
            href="/admin/projects"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Tümünü Gör →
          </SafeLink>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Proje Adı</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Kategori</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {projects.slice(0, 5).map((project) => (
                <tr key={project.slug} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{project.title}</div>
                    <div className="text-sm text-gray-500 truncate max-w-md">{project.description.substring(0, 60)}...</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                      {project.category}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <SafeLink
                        href={`/admin/projects/edit/${project.slug}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Düzenle"
                      >
                        <Edit className="w-4 h-4" />
                      </SafeLink>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

