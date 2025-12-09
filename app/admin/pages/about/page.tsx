'use client';

import { useState, useEffect } from 'react';
import { Save, X, Building2 } from 'lucide-react';
import SafeLink from '@/components/safe-link';
import { getBasePath } from '@/lib/getBasePath';

// Varsayılan değerler (gerçek sayfadan alınmalı)
const defaultFormData = {
  heroTitle: 'Hakkımızda',
  heroSubtitle: '30 yılı aşkın deneyimimizle inşaat sektöründe güvenilir ve kaliteli hizmetin adresi.',
  storyTitle: 'Şirketimizin Hikayesi',
  storyText1: 'BağKent A.Ş., 1990 yılında İstanbul\'da kurulmuştur. Kuruluşumuzdan bu yana inşaat sektöründe kalite, güvenilirlik ve müşteri memnuniyeti odaklı hizmet anlayışımızı sürdürmekteyiz.',
  storyText2: 'Uzman kadromuz, modern teknolojiler ve yenilikçi yaklaşımımızla konut, ticari yapı ve altyapı projelerinde sektörün önde gelen firmalarından biri haline geldik. 250\'den fazla başarıyla tamamlanmış projemizle müşterilerimizin güvenini kazandık.',
  storyText3: 'Günümüzde İstanbul ve çevresinde faaliyet gösteren şirketimiz, her geçen gün büyüyen kadrosu ve artan proje portföyüyle sektörde iddialı bir konumda bulunmaktadır.',
  teamTitle: 'Ekibimiz',
  teamText1: 'BağKent A.Ş. olarak, alanında uzman mimar, mühendis ve teknik personelden oluşan güçlü bir ekibe sahibiz. Her biri kendi alanında deneyimli profesyonellerden oluşan ekibimiz, projelerin en iyi şekilde tamamlanması için özverili çalışmaktadır.',
  teamText2: 'Sürekli eğitim ve gelişim programlarımızla ekip üyelerimizin bilgi ve becerilerini güncel tutuyoruz. Bu sayede sektördeki yenilikleri takip ediyor ve projelerimize en modern çözümleri entegre ediyoruz.',
};

export default function EditAboutPage() {
  const [formData, setFormData] = useState(defaultFormData);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Sayfa yüklendiğinde localStorage'dan veya varsayılan değerlerden yükle
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('admin_page_about');
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
      localStorage.setItem('admin_page_about', jsonString);
      // Custom event gönder
      window.dispatchEvent(new CustomEvent('localStorageUpdated', {
        detail: { key: 'admin_page_about', data: formData }
      }));
    }

    const contentJSON = JSON.stringify(formData, null, 2);
    alert('Hakkımızda sayfası içeriği güncellendi ve kaydedildi!\n\nNot: Gerçek güncelleme için app/kurumsal/hakkimizda/page.tsx dosyasını düzenleyip GitHub\'a commit etmeniz gerekir.\n\nİçerik JSON:\n' + contentJSON);
    
    setSaving(false);
    
    // Sayfada kal, yönlendirme yapma
    // if (typeof window !== 'undefined') {
    //   const basePath = getBasePath();
    //   window.location.href = `${basePath}/admin/pages`;
    // }
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
          <Building2 className="w-8 h-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">Hakkımızda Düzenle</h1>
        </div>
        <p className="text-gray-600">Hakkımızda sayfası içeriğini düzenleyin</p>
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

        <div className="border-t pt-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Şirket Hikayesi</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Başlık
            </label>
            <input
              type="text"
              value={formData.storyTitle}
              onChange={(e) => setFormData({ ...formData, storyTitle: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Metin 1
              </label>
              <textarea
                value={formData.storyText1}
                onChange={(e) => setFormData({ ...formData, storyText1: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Metin 2
              </label>
              <textarea
                value={formData.storyText2}
                onChange={(e) => setFormData({ ...formData, storyText2: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Metin 3
              </label>
              <textarea
                value={formData.storyText3}
                onChange={(e) => setFormData({ ...formData, storyText3: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Ekibimiz</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Başlık
            </label>
            <input
              type="text"
              value={formData.teamTitle}
              onChange={(e) => setFormData({ ...formData, teamTitle: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Metin 1
              </label>
              <textarea
                value={formData.teamText1}
                onChange={(e) => setFormData({ ...formData, teamText1: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Metin 2
              </label>
              <textarea
                value={formData.teamText2}
                onChange={(e) => setFormData({ ...formData, teamText2: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Not:</strong> Değişiklikleri kalıcı olarak kaydetmek için 
            <code className="bg-blue-100 px-2 py-1 rounded">app/kurumsal/hakkimizda/page.tsx</code> dosyasını düzenleyip 
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

