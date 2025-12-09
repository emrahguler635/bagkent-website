'use client';

import { useState, useEffect } from 'react';
import { Save, X, Home } from 'lucide-react';
import SafeLink from '@/components/safe-link';
import { getBasePath } from '@/lib/getBasePath';

const defaultFormData = {
  heroTitle: 'Geleceği İnşa Eden Güven',
  heroSubtitle: 'Modern mimari çözümler ve kaliteli yapılar ile hayallerinizi gerçeğe dönüştürüyoruz.',
  heroButton1: 'Projelerimizi Keşfedin',
  heroButton2: 'Bize Ulaşın',
  stat1Value: '250+',
  stat1Label: 'Tamamlanan Proje',
  stat2Value: '30+',
  stat2Label: 'Yıllık Deneyim',
  stat3Value: '15+',
  stat3Label: 'Ödül ve Sertifika',
  aboutTitle: 'BağKent A.Ş. Hakkında',
  aboutText1: 'BağKent A.Ş., 30 yılı aşkın süredir inşaat sektöründe faaliyet gösteren, güvenilir ve köklü bir firmadır. Modern mimari çözümler, kaliteli işçilik ve müşteri memnuniyeti odaklı yaklaşımımızla İstanbul\'un önemli projelerine imza atıyoruz.',
  aboutText2: 'Konut projelerinden ticari yapılara, altyapı çalışmalarından restorasyon projelerine kadar geniş bir yelpazede hizmet sunmaktayız. Her projede aynı özen ve kalite anlayışıyla çalışarak, sektördeki lider konumumuzu sürdürüyoruz.',
  slogan: 'BağKent Sizinle Güzel',
  ctaTitle: 'Hayalinizdeki Projeyi Birlikte Gerçekleştirelim',
  ctaText: 'Uzman ekibimiz ve 30 yıllık deneyimimizle projelerinize değer katmaya hazırız.',
};

export default function EditHomePage() {
  const [formData, setFormData] = useState(defaultFormData);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Sayfa yüklendiğinde localStorage'dan yükle
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('admin_page_home');
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
      const jsonString = JSON.stringify(formData);
      localStorage.setItem('admin_page_home', jsonString);
      // Custom event gönder
      window.dispatchEvent(new CustomEvent('localStorageUpdated', {
        detail: { key: 'admin_page_home', data: formData }
      }));
    }

    const contentJSON = JSON.stringify(formData, null, 2);
    alert('Ana sayfa içeriği güncellendi ve kaydedildi!\n\nNot: Gerçek kaydetme için app/page.tsx dosyasını düzenleyip GitHub\'a commit etmeniz gerekir.\n\nİçerik JSON:\n' + contentJSON);
    
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hero Buton 1 Metni
            </label>
            <input
              type="text"
              value={formData.heroButton1}
              onChange={(e) => setFormData({ ...formData, heroButton1: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hero Buton 2 Metni
            </label>
            <input
              type="text"
              value={formData.heroButton2}
              onChange={(e) => setFormData({ ...formData, heroButton2: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
        </div>

        <div className="border-t pt-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">İstatistikler</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İstatistik 1 - Değer
              </label>
              <input
                type="text"
                value={formData.stat1Value}
                onChange={(e) => setFormData({ ...formData, stat1Value: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="250+"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İstatistik 1 - Etiket
              </label>
              <input
                type="text"
                value={formData.stat1Label}
                onChange={(e) => setFormData({ ...formData, stat1Label: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Tamamlanan Proje"
              />
            </div>
            <div className="hidden md:block"></div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İstatistik 2 - Değer
              </label>
              <input
                type="text"
                value={formData.stat2Value}
                onChange={(e) => setFormData({ ...formData, stat2Value: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="30+"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İstatistik 2 - Etiket
              </label>
              <input
                type="text"
                value={formData.stat2Label}
                onChange={(e) => setFormData({ ...formData, stat2Label: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Yıllık Deneyim"
              />
            </div>
            <div className="hidden md:block"></div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İstatistik 3 - Değer
              </label>
              <input
                type="text"
                value={formData.stat3Value}
                onChange={(e) => setFormData({ ...formData, stat3Value: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="15+"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İstatistik 3 - Etiket
              </label>
              <input
                type="text"
                value={formData.stat3Label}
                onChange={(e) => setFormData({ ...formData, stat3Label: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Ödül ve Sertifika"
              />
            </div>
          </div>
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
