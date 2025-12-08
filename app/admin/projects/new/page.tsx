'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Save, X, Upload } from 'lucide-react';
import SafeLink from '@/components/safe-link';
import { Project } from '@/lib/projects-data';

export default function NewProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<Omit<Project, 'image'> & { image: string }>({
    slug: '',
    title: '',
    description: '',
    image: '/homepage-about.jpeg',
    category: 'Konut',
  });
  const [saving, setSaving] = useState(false);

  // Slug'ı başlıktan otomatik oluştur
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Yeni projeyi localStorage'a kaydet (geçici olarak)
    const existingProjects = JSON.parse(localStorage.getItem('admin_projects_draft') || '[]');
    existingProjects.push({
      ...formData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem('admin_projects_draft', JSON.stringify(existingProjects));

    // JSON formatında göster
    const projectJSON = JSON.stringify(formData, null, 2);
    alert('Proje taslağı kaydedildi!\n\nNot: Gerçek kaydetme için lib/projects-data.ts dosyasını düzenleyip GitHub\'a commit etmeniz gerekir.\n\nProje JSON:\n' + projectJSON);
    
    router.push('/admin/projects');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <SafeLink
          href="/admin/projects"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-4"
        >
          <X className="w-5 h-5" />
          Geri Dön
        </SafeLink>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Yeni Proje Ekle</h1>
        <p className="text-gray-600">Yeni bir proje oluşturun</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 md:p-8 space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Proje Başlığı <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="Örn: Bağcılar Yeni Konut Projesi"
            required
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
            URL Slug (otomatik oluşturulur)
          </label>
          <input
            id="slug"
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-gray-50"
            placeholder="bagcilar-yeni-konut-projesi"
          />
          <p className="mt-1 text-sm text-gray-500">URL-friendly versiyon (tire ile ayrılmış küçük harfler)</p>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Kategori <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            required
          >
            <option value="Konut">Konut</option>
            <option value="Ticari">Ticari</option>
            <option value="Altyapı">Altyapı</option>
            <option value="Kurumsal">Kurumsal</option>
          </select>
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
            Görsel Yolu <span className="text-red-500">*</span>
          </label>
          <input
            id="image"
            type="text"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="/proje-gorseli.jpg"
            required
          />
          <p className="mt-1 text-sm text-gray-500">Görsel public/ klasöründe olmalıdır (örn: /homepage-about.jpeg)</p>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Açıklama <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="Projenin detaylı açıklaması..."
            required
          />
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Not:</strong> Bu yönetim paneli static export olduğu için, değişiklikleri kalıcı olarak kaydetmek için 
            <code className="bg-blue-100 px-2 py-1 rounded">lib/projects-data.ts</code> dosyasını düzenleyip 
            GitHub'a commit etmeniz gerekir.
          </p>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
          <SafeLink
            href="/admin/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            <X className="w-5 h-5" />
            İptal
          </SafeLink>
        </div>
      </form>
    </div>
  );
}

