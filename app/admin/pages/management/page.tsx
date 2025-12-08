'use client';

import { useState } from 'react';
import { Save, X, Users } from 'lucide-react';
import SafeLink from '@/components/safe-link';
import { getBasePath } from '@/lib/getBasePath';

export default function EditManagementPage() {
  const [formData, setFormData] = useState({
    heroTitle: 'Yönetim Kadromuz',
    heroSubtitle: 'Deneyimli ve profesyonel yönetim kadromuzla sektörde fark yaratıyoruz.',
    baskanTitle: 'Başkan',
    baskanName: 'Yasin YILDIZ',
    baskanBio: 'BağKent A.Ş. Yönetim Kurulu Başkanı Yasin YILDIZ, inşaat sektöründe 30 yılı aşkın deneyime sahip bir isimdir. Modern mimari anlayışı ve yenilikçi yaklaşımıyla şirketin büyümesine öncülük etmektedir.',
    genelMudurTitle: 'Genel Müdür',
    genelMudurName: 'Ahmet DEMİR',
    genelMudurBio: 'Genel Müdür Ahmet DEMİR, mühendislik ve proje yönetimi alanlarında uzmanlaşmış, sektörde başarılı projelerin gerçekleştirilmesinde önemli rol oynamıştır.',
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const contentJSON = JSON.stringify(formData, null, 2);
    alert('Yönetim sayfası içeriği güncellendi!\n\nNot: Gerçek güncelleme için app/kurumsal/yonetim/page.tsx dosyasını düzenleyip GitHub\'a commit etmeniz gerekir.\n\nİçerik JSON:\n' + contentJSON);
    
    if (typeof window !== 'undefined') {
      const basePath = getBasePath();
      window.location.href = `${basePath}/admin/pages`;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <SafeLink
          href="/admin/pages"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-4"
        >
          <X className="w-5 h-5" />
          Geri Dön
        </SafeLink>
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-8 h-8 text-yellow-600" />
          <h1 className="text-3xl font-bold text-gray-900">Yönetim Düzenle</h1>
        </div>
        <p className="text-gray-600">Yönetim sayfası içeriğini düzenleyin</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 md:p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hero Başlık
          </label>
          <input
            type="text"
            value={formData.heroTitle}
            onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hero Alt Başlık
          </label>
          <textarea
            value={formData.heroSubtitle}
            onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        <div className="border-t pt-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Yönetim Kurulu Başkanı</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ünvan
              </label>
              <input
                type="text"
                value={formData.baskanTitle}
                onChange={(e) => setFormData({ ...formData, baskanTitle: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İsim
              </label>
              <input
                type="text"
                value={formData.baskanName}
                onChange={(e) => setFormData({ ...formData, baskanName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Biyografi
              </label>
              <textarea
                value={formData.baskanBio}
                onChange={(e) => setFormData({ ...formData, baskanBio: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Genel Müdür</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ünvan
              </label>
              <input
                type="text"
                value={formData.genelMudurTitle}
                onChange={(e) => setFormData({ ...formData, genelMudurTitle: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İsim
              </label>
              <input
                type="text"
                value={formData.genelMudurName}
                onChange={(e) => setFormData({ ...formData, genelMudurName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Biyografi
              </label>
              <textarea
                value={formData.genelMudurBio}
                onChange={(e) => setFormData({ ...formData, genelMudurBio: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Not:</strong> Değişiklikleri kalıcı olarak kaydetmek için 
            <code className="bg-blue-100 px-2 py-1 rounded">app/kurumsal/yonetim/page.tsx</code> dosyasını düzenleyip 
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
            href="/admin/pages"
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

