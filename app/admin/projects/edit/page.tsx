'use client';

import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import SafeLink from '@/components/safe-link';
import { getAllProjectsWithImages, getProjectBySlug, Project } from '@/lib/projects-data';
import { getBasePath } from '@/lib/getBasePath';

export default function EditProjectPage() {
  const [slug, setSlug] = useState('');
  const [formData, setFormData] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // URL'den slug'ı al
      const urlParams = new URLSearchParams(window.location.search);
      const slugParam = urlParams.get('slug');
      
      if (slugParam) {
        setSlug(slugParam);
        const project = getProjectBySlug(slugParam);
        if (project) {
          setFormData(project);
        }
      } else {
        // Eğer slug yoksa projeler listesini göster
        setProjects(getAllProjectsWithImages());
      }
    }
  }, []);

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
    if (formData) {
      setFormData({
        ...formData,
        title,
        slug: generateSlug(title),
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setSaving(true);

    // Düzenlenen projeyi localStorage'a kaydet (geçici olarak)
    const existingDrafts = JSON.parse(localStorage.getItem('admin_projects_draft') || '[]');
    const draftIndex = existingDrafts.findIndex((p: any) => p.slug === slug);
    
    if (draftIndex >= 0) {
      existingDrafts[draftIndex] = {
        ...formData,
        updatedAt: new Date().toISOString(),
      };
    } else {
      existingDrafts.push({
        ...formData,
        id: Date.now(),
        updatedAt: new Date().toISOString(),
      });
    }
    
    localStorage.setItem('admin_projects_draft', JSON.stringify(existingDrafts));

    // JSON formatında göster
    const projectJSON = JSON.stringify(formData, null, 2);
    alert('Proje düzenlemesi kaydedildi!\n\nNot: Gerçek kaydetme için lib/projects-data.ts dosyasını düzenleyip GitHub\'a commit etmeniz gerekir.\n\nDüzenlenen Proje JSON:\n' + projectJSON);
    
    if (typeof window !== 'undefined') {
      const basePath = getBasePath();
      window.location.href = `${basePath}/admin/projects`;
    }
  };

  // Eğer slug yoksa proje seçim listesi göster
  if (!slug && projects.length > 0) {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Proje Düzenle</h1>
          <p className="text-gray-600">Düzenlemek istediğiniz projeyi seçin</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <SafeLink
                key={project.slug}
                href={`/admin/projects/edit?slug=${project.slug}`}
                className="block p-4 border border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors"
              >
                <h3 className="font-bold text-gray-900 mb-1">{project.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
              </SafeLink>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Yükleniyor...</p>
      </div>
    );
  }

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Proje Düzenle</h1>
        <p className="text-gray-600">{formData.title}</p>
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
            required
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
            URL Slug
          </label>
          <input
            id="slug"
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-gray-50"
          />
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
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Açıklama <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            required
          />
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Not:</strong> Değişiklikleri kalıcı olarak kaydetmek için 
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
            {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
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

