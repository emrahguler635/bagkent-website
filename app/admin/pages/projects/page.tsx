'use client';

import { useState, useEffect } from 'react';
import { Save, X, Plus, Trash2, Edit, FolderKanban } from 'lucide-react';
import SafeLink from '@/components/safe-link';
import { getBasePath } from '@/lib/getBasePath';
import { getAllProjectsWithImages, Project } from '@/lib/projects-data';

const defaultFormData = {
  heroTitle: 'Projelerimiz',
  heroSubtitle: 'Modern mimari anlayışı ve kaliteli işçilikle hayata geçirdiğimiz projelerimizi keşfedin.',
  ctaTitle: 'Bir Sonraki Proje Sizin Olabilir',
  ctaText: 'Hayalinizdeki projeyi birlikte hayata geçirelim. Deneyimli ekibimizle sizlere en iyi hizmeti sunmak için buradayız.',
  ctaButtonText: 'Projeniz İçin Bize Ulaşın',
};

export default function EditProjectsPage() {
  const [formData, setFormData] = useState(defaultFormData);
  const [projects, setProjects] = useState<Project[]>([]);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);

  // Sayfa yüklendiğinde localStorage'dan yükle
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Form verilerini yükle
      const savedData = localStorage.getItem('admin_page_projects');
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          setFormData({ ...defaultFormData, ...parsed });
        } catch (e) {
          console.error('Failed to parse saved data:', e);
        }
      }

      // Projeleri yükle
      try {
        const allProjects = getAllProjectsWithImages();
        // localStorage'dan özel projeler varsa onları da ekle
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
      } catch (error) {
        console.error('Projeler yüklenirken hata:', error);
        setProjects([]);
      }

      setLoaded(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // localStorage'a kaydet
    if (typeof window !== 'undefined') {
      const jsonString = JSON.stringify(formData);
      localStorage.setItem('admin_page_projects', jsonString);
      
      // Custom event gönder
      window.dispatchEvent(new CustomEvent('localStorageUpdated', {
        detail: { key: 'admin_page_projects' }
      }));

      setTimeout(() => {
        setSaving(false);
        alert('Projeler sayfası içeriği kaydedildi!');
      }, 300);
    }
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    const updatedProjects = projects.map(p => 
      p.slug === editingProject.slug ? editingProject : p
    );
    
    // Yeni proje ekleniyorsa
    if (!projects.find(p => p.slug === editingProject.slug)) {
      updatedProjects.push(editingProject);
    }

    setProjects(updatedProjects);
    
    // localStorage'a kaydet (sadece eklenen/özelleştirilen projeler)
    const customProjects = updatedProjects.filter(p => {
      // Orijinal projeler listesinde yoksa özel projedir
      try {
        const originalProjects = getAllProjectsWithImages();
        return !originalProjects.find(op => op.slug === p.slug);
      } catch {
        return true;
      }
    });
    
    localStorage.setItem('admin_projects_list', JSON.stringify(customProjects));
    setEditingProject(null);
    setShowProjectForm(false);
    
    // Custom event gönder
    window.dispatchEvent(new CustomEvent('localStorageUpdated', {
      detail: { key: 'admin_projects_list' }
    }));

    alert('Proje kaydedildi!');
  };

  const handleDeleteProject = (slug: string) => {
    if (!confirm('Bu projeyi silmek istediğinize emin misiniz?')) return;

    // Sadece özel projeleri silebiliriz (localStorage'dan)
    const customProjects = JSON.parse(localStorage.getItem('admin_projects_list') || '[]');
    const updated = customProjects.filter((p: Project) => p.slug !== slug);
    localStorage.setItem('admin_projects_list', JSON.stringify(updated));
    
    // Listeyi güncelle
    const allProjects = getAllProjectsWithImages();
    setProjects([...allProjects, ...updated]);
    
    alert('Proje silindi! (Not: Orijinal projeler lib/projects-data.ts dosyasından silinmelidir)');
  };

  if (!loaded) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Yükleniyor...</p>
      </div>
    );
  }

  const basePath = getBasePath();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <SafeLink
          href={`${basePath}/admin/pages`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-4"
        >
          <X className="w-5 h-5" />
          Geri Dön
        </SafeLink>
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-indigo-500 rounded-lg p-2 text-white">
            <FolderKanban className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Projeler Sayfası Düzenle</h1>
        </div>
        <p className="text-gray-600">Projeler sayfasının içeriğini ve proje listesini yönetin</p>
      </div>

      {/* Ana İçerik Formu */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Sayfa İçeriği</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hero Başlık
            </label>
            <input
              type="text"
              value={formData.heroTitle}
              onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Projelerimiz"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hero Alt Başlık
            </label>
            <textarea
              value={formData.heroSubtitle}
              onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Modern mimari anlayışı..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CTA Başlık
            </label>
            <input
              type="text"
              value={formData.ctaTitle}
              onChange={(e) => setFormData({ ...formData, ctaTitle: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CTA Metin
            </label>
            <textarea
              value={formData.ctaText}
              onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CTA Buton Metni
            </label>
            <input
              type="text"
              value={formData.ctaButtonText}
              onChange={(e) => setFormData({ ...formData, ctaButtonText: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>

      {/* Proje Listesi */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Projeler</h2>
          <button
            onClick={() => {
              setEditingProject({
                slug: '',
                title: '',
                description: '',
                image: '/homepage-about.jpeg',
                category: 'Konut',
              });
              setShowProjectForm(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Yeni Proje Ekle
          </button>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{project.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-1">{project.description}</p>
                <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                  {project.category}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingProject(project);
                    setShowProjectForm(true);
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Düzenle"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteProject(project.slug)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Sil"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Proje Düzenleme Modal */}
      {showProjectForm && editingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingProject.slug ? 'Proje Düzenle' : 'Yeni Proje Ekle'}
                </h3>
                <button
                  onClick={() => {
                    setShowProjectForm(false);
                    setEditingProject(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleProjectSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Proje Başlığı *
                  </label>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      const newSlug = newTitle
                        .toLowerCase()
                        .replace(/ğ/g, 'g')
                        .replace(/ü/g, 'u')
                        .replace(/ş/g, 's')
                        .replace(/ı/g, 'i')
                        .replace(/ö/g, 'o')
                        .replace(/ç/g, 'c')
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/^-+|-+$/g, '');
                      setEditingProject({ ...editingProject, title: newTitle, slug: newSlug });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug (Otomatik)
                  </label>
                  <input
                    type="text"
                    value={editingProject.slug}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Açıklama *
                  </label>
                  <textarea
                    value={editingProject.description}
                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Görsel Path
                  </label>
                  <input
                    type="text"
                    value={editingProject.image}
                    onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="/homepage-about.jpeg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori *
                  </label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                  >
                    <option value="Konut">Konut</option>
                    <option value="Ticari">Ticari</option>
                    <option value="Altyapı">Altyapı</option>
                    <option value="Kurumsal">Kurumsal</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowProjectForm(false);
                      setEditingProject(null);
                    }}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Kaydet
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

