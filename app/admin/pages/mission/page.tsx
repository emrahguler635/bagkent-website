'use client';

import { useState, useEffect } from 'react';
import { Save, X, Target } from 'lucide-react';
import SafeLink from '@/components/safe-link';
import { getBasePath } from '@/lib/getBasePath';

const defaultFormData = {
    heroTitle: 'Misyon ve Vizyonumuz',
    heroSubtitle: 'Geleceği inşa ederken değerlerimizden ödün vermeden ilerliyoruz.',
    missionTitle: 'Misyonumuz',
    missionText1: 'BağKent A.Ş. olarak misyonumuz, kaliteli ve sürdürülebilir inşaat projeleri ile müşterilerimizin hayallerini gerçeğe dönüştürmektir. Modern mimari anlayışı, yenilikçi teknolojileri ve çevre dostu uygulamaları bir araya getirerek, yaşam alanlarına değer katmayı hedefliyoruz.',
    missionText2: 'Her projede en yüksek kalite standartlarını koruyarak, güvenli ve dayanıklı yapılar inşa etmekteyiz. Müşteri memnuniyetini ön planda tutarak, şeffaf ve dürüst bir iş anlayışı ile hareket ediyoruz.',
    missionQuote: 'Kaliteli yapılar inşa ederek topluma ve çevreye değer katmak, güvenilir ve yenilikçi çözümler sunarak sektörün öncü firması olmak.',
    visionTitle: 'Vizyonumuz',
    visionText1: 'Vizyonumuz, Türkiye\'nin ve bölgenin en saygın ve tercih edilen inşaat firmalarından biri olmaktır. Sürdürülebilir ve çevre dostu yapılar inşa ederek gelecek nesillere daha yaşanabilir bir dünya bırakmayı amaçlıyoruz.',
    visionText2: 'Teknolojik yenilikleri yakından takip ederek, akıllı bina sistemleri ve enerji verimli tasarımlar ile sektörde öncü rol oynamak istiyoruz. Uluslararası standartlarda projeler üreterek, global pazarda da tanınan bir marka olmayı hedefliyoruz.',
    visionQuote: 'Türkiye\'nin ve bölgenin en güvenilir, yenilikçi ve sürdürülebilir inşaat firmalarından biri olarak geleceği inşa etmek.',
};

export default function EditMissionPage() {
  const [formData, setFormData] = useState(defaultFormData);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Sayfa yüklendiğinde localStorage'dan yükle
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('admin_page_mission');
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          setFormData(parsed);
        } catch (e) {
          console.error('Failed to parse saved data:', e);
          setFormData(defaultFormData);
        }
      }
      setLoaded(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // localStorage'a kaydet
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_page_mission', JSON.stringify(formData));
    }

    const contentJSON = JSON.stringify(formData, null, 2);
    alert('Misyon & Vizyon sayfası içeriği güncellendi ve kaydedildi!\n\nNot: Gerçek güncelleme için app/kurumsal/misyon-vizyon/page.tsx dosyasını düzenleyip GitHub\'a commit etmeniz gerekir.\n\nİçerik JSON:\n' + contentJSON);
    
    setSaving(false);
  };

  if (!loaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

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
          <Target className="w-8 h-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">Misyon & Vizyon Düzenle</h1>
        </div>
        <p className="text-gray-600">Misyon ve Vizyon sayfası içeriğini düzenleyin</p>
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
          <h3 className="text-xl font-bold text-gray-900 mb-4">Misyon</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Başlık
            </label>
            <input
              type="text"
              value={formData.missionTitle}
              onChange={(e) => setFormData({ ...formData, missionTitle: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Metin 1
              </label>
              <textarea
                value={formData.missionText1}
                onChange={(e) => setFormData({ ...formData, missionText1: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Metin 2
              </label>
              <textarea
                value={formData.missionText2}
                onChange={(e) => setFormData({ ...formData, missionText2: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alıntı Metin
              </label>
              <textarea
                value={formData.missionQuote}
                onChange={(e) => setFormData({ ...formData, missionQuote: e.target.value })}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Vizyon</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Başlık
            </label>
            <input
              type="text"
              value={formData.visionTitle}
              onChange={(e) => setFormData({ ...formData, visionTitle: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Metin 1
              </label>
              <textarea
                value={formData.visionText1}
                onChange={(e) => setFormData({ ...formData, visionText1: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Metin 2
              </label>
              <textarea
                value={formData.visionText2}
                onChange={(e) => setFormData({ ...formData, visionText2: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alıntı Metin
              </label>
              <textarea
                value={formData.visionQuote}
                onChange={(e) => setFormData({ ...formData, visionQuote: e.target.value })}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Not:</strong> Değişiklikleri kalıcı olarak kaydetmek için 
            <code className="bg-blue-100 px-2 py-1 rounded">app/kurumsal/misyon-vizyon/page.tsx</code> dosyasını düzenleyip 
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

