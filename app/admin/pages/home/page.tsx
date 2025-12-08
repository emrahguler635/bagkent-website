'use client';

import { useState } from 'react';
import { Save, X, Home } from 'lucide-react';
import SafeLink from '@/components/safe-link';
import { getBasePath } from '@/lib/getBasePath';

export default function EditHomePage() {
  const [formData, setFormData] = useState({
    heroTitle: 'Geleceği İnşa Eden Güven',
    heroSubtitle: 'Modern mimari çözümler ve kaliteli yapılar ile hayallerinizi gerçeğe dönüştürüyoruz.',
    aboutTitle: 'BağKent A.Ş. Hakkında',
    aboutText1: 'BağKent A.Ş., 30 yılı aşkın süredir inşaat sektöründe faaliyet gösteren, güvenilir ve köklü bir firmadır. Modern mimari çözümler, kaliteli işçilik ve müşteri memnuniyeti odaklı yaklaşımımızla İstanbul\'un önemli projelerine imza atıyoruz.',
    aboutText2: 'Konut projelerinden ticari yapılara, altyapı çalışmalarından restorasyon projelerine kadar geniş bir yelpazede hizmet sunmaktayız. Her projede aynı özen ve kalite anlayışıyla çalışarak, sektördeki lider konumumuzu sürdürüyoruz.',
    slogan: 'BağKent Sizinle Güzel',
    ctaTitle: 'Hayalinizdeki Projeyi Birlikte Gerçekleştirelim',
    ctaText: 'Uzman ekibimiz ve 30 yıllık deneyimimizle projelerinize değer katmaya hazırız.',
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // JSON formatında göster
    const contentJSON = JSON.stringify(formData, null, 2);
    alert('Ana sayfa içeriği güncellendi!\n\nNot: Gerçek güncelleme için app/page.tsx dosyasını düzenleyip GitHub\'a commit etmeniz gerekir.\n\nİçerik JSON:\n' + contentJSON);
    
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
          <Home className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Ana Sayfa Düzenle</h1>
        </div>
        <p className="text-gray-600">Ana sayfa içeriğini düzenleyin</p>
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
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hakkında Başlık
          </label>
          <input
            type="text"
            value={formData.aboutTitle}
            onChange={(e) => setFormData({ ...formData, aboutTitle: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hakkında Metin 1
          </label>
          <textarea
            value={formData.aboutText1}
            onChange={(e) => setFormData({ ...formData, aboutText1: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hakkında Metin 2
          </label>
          <textarea
            value={formData.aboutText2}
            onChange={(e) => setFormData({ ...formData, aboutText2: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slogan
          </label>
          <input
            type="text"
            value={formData.slogan}
            onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Not:</strong> Değişiklikleri kalıcı olarak kaydetmek için 
            <code className="bg-blue-100 px-2 py-1 rounded">app/page.tsx</code> dosyasını düzenleyip 
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

