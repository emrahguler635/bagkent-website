'use client';

import { motion } from 'framer-motion';
import { FileEdit, Home, Building2, Eye, Target, Users, Mail } from 'lucide-react';
import SafeLink from '@/components/safe-link';

const pages = [
  {
    id: 'home',
    title: 'Ana Sayfa',
    description: 'Ana sayfa içeriği, hero bölümü ve özellikler',
    path: '/admin/pages/home',
    icon: Home,
    color: 'bg-blue-500',
  },
  {
    id: 'about',
    title: 'Hakkımızda',
    description: 'Şirket hikayesi, değerler ve timeline',
    path: '/admin/pages/about',
    icon: Building2,
    color: 'bg-green-500',
    category: 'Kurumsal',
  },
  {
    id: 'mission',
    title: 'Misyon & Vizyon',
    description: 'Misyon, vizyon ve temel ilkeler',
    path: '/admin/pages/mission',
    icon: Target,
    color: 'bg-purple-500',
    category: 'Kurumsal',
  },
  {
    id: 'management',
    title: 'Yönetim',
    description: 'Yönetim kurulu üyeleri ve biyografiler',
    path: '/admin/pages/management',
    icon: Users,
    color: 'bg-yellow-500',
    category: 'Kurumsal',
  },
  {
    id: 'contact',
    title: 'İletişim',
    description: 'İletişim bilgileri, adres ve harita',
    path: '/admin/pages/contact',
    icon: Mail,
    color: 'bg-red-500',
  },
];

export default function AdminPagesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sayfa Yönetimi</h1>
        <p className="text-gray-600">Site içeriğini düzenleyin ve güncelleyin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page, index) => (
          <motion.div
            key={page.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <SafeLink
              href={page.path}
              className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 h-full border border-gray-200 hover:border-blue-300"
            >
              <div className="flex items-start gap-4">
                <div className={`${page.color} rounded-lg p-3 text-white flex-shrink-0`}>
                  <page.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-gray-900">{page.title}</h3>
                    {page.category && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {page.category}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{page.description}</p>
                  <div className="flex items-center text-blue-600 text-sm font-medium">
                    <FileEdit className="w-4 h-4 mr-1" />
                    Düzenle
                  </div>
                </div>
              </div>
            </SafeLink>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">💡 Bilgi</h3>
        <p className="text-blue-800 text-sm">
          Sayfa içeriklerini düzenledikten sonra, değişiklikleri kalıcı olarak uygulamak için 
          ilgili dosyaları manuel olarak güncellemeniz ve GitHub'a commit etmeniz gerekir.
        </p>
      </div>
    </div>
  );
}

