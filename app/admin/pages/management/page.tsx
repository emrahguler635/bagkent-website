'use client';

import { useState, useEffect } from 'react';
import { Save, X, Users, Upload } from 'lucide-react';
import SafeLink from '@/components/safe-link';
import { getBasePath } from '@/lib/getBasePath';

const defaultFormData = {
    heroTitle: 'Yönetim Kadromuz',
    heroSubtitle: 'Deneyimli ve profesyonel yönetim kadromuzla sektörde fark yaratıyoruz.',
    
    // Başkan
    baskanSectionTitle: 'Başkan',
    baskanTitle: 'Başkan',
    baskanName: 'Yasin YILDIZ',
    baskanImagePath: '/baskan.png',
    baskanModalTitle: 'Bağcılar Belediye Başkanı',
    baskanBioFull: `1983 yılında İstanbul'da dünyaya geldi. Aslen Gümüşhanelidir. Eskişehir Anadolu Üniversitesi İşletme Fakültesi'nden mezun oldu. İstanbul Aydın Üniversitesi'nde "Yerel Yönetimler" alanında, Yüksek Lisans yaptı.

Yıldız, 2004 yılında AK Parti Bakırköy İlçe Gençlik Kolları'nda aktif siyasete başladı.

2007 - 2009 yılları arasında Bakırköy Gençlik Kolları İlçe Başkanlığı yapan Yıldız, görev süresi boyunca gençlerin milli ve manevi değerlerine bağlı, çağın gereksinimlerine uygun bireyler olarak yetişmesi için projeler geliştirdi ve hayata geçirdi.

Yıldız daha sonra 2009 yılında, AK Parti'den İBB (İstanbul Büyükşehir Belediyesi) ve Bahçelievler Belediyesi meclis üyesi seçildi. 2012-2015 yılları arasında AK Parti İstanbul İl Gençlik Kolları Yerel Yönetimlerden Sorumlu İl Başkan Yardımcılığı görevinde bulundu.

2014 Yerel Seçimlerinden sonra Bahçelievler Belediye Başkan Yardımcılığı görevini üstlenen Yıldız, kentsel dönüşümden sosyal alanlara kadar birçok önemli projeyi yürüttü.

Yıldız, 2021 yılında AK Parti İstanbul İl Kongresi'nde İl Yönetim Kurulu Üyesi oldu. 2024 Yerel Seçimlerinde de Bağcılar Belediyesi Meclis Üyeliği'ne seçilen Yıldız, aynı dönemde Belediye Başkan Yardımcısı olarak atandı.

Önceki dönem Belediye Başkanı Abdullah Özdemir'in AK Parti İstanbul İl Başkan adayı olmasının ardından Belediye Meclisi tarafından 09.01.2025 tarihinde Bağcılar Belediye Başkanı seçildi.

Yıldız, evli ve 2 çocuk babasıdır.`,
    
    // Yönetim Kurulu Başkanı
    yonetimKuruluBaskaniSectionTitle: 'Yönetim Kurulu Başkanı',
    yonetimKuruluBaskaniTitle: 'Yönetim Kurulu Başkanı',
    yonetimKuruluBaskaniName: 'Salih KUMBAR',
    yonetimKuruluBaskaniImagePath: '/genel-mudur.png',
    yonetimKuruluBaskaniModalTitle: 'Yönetim Kurulu Başkanı',
    yonetimKuruluBaskaniBioFull: `1973 yılında Üsküdar'da doğdu. İlköğretim ve ortaöğretimini Ümraniye'de tamamladı.

1996 yılında İETT Genel Müdürlüğünde Hareket Memuru olarak göreve başladı. 1997 yılında İETT Kadıköy İşletme Şefliği, 2000 yılında İETT Anadolu Bölgesi Müdür Yardımcılığı görevlerinde bulundu.

2007 yılında Kocaeli Büyükşehir Belediyesi Kara Ulaşım Şube Müdürlüğü'ne atandı. 2014 yılında Toplu Taşıma Daire Başkanı oldu.

Toplu Taşıma Yönetim Sistemleri, Analiz Sistemleri, Kontrol Merkezleri, Elektronik Ücretlendirme ve Yolcu Bilgilendirme Sistemleri üzerine çok sayıda proje çalışması yürüttü.

Türkiye Belediyeler Birliği Ulaşım Komisyonu Toplu Taşıma Grubu Koordinatörlüğü görevini yürüttü. Bahçeşehir Üniversitesi'nde "Kentsel Sistemler ve Ulaştırma Yönetimi" alanında yüksek lisans yaptı.

28 Haziran 2019 tarihinde Kocaeli Büyükşehir Belediyesi ULAŞIMPARK AŞ Genel Müdürlüğü'ne getirildi. 2021 yılında Marmara Belediyeler Birliği'nde görev yaptı.

Ağustos 2022'den itibaren Bağcılar Belediye Başkan Danışmanı olarak görev yaparken, Temmuz 2023 itibariyle Bağcılar Belediyesi Başkan Yardımcısı olarak görevlendirildi.

Evli ve iki çocuk babasıdır.`,
};

export default function EditManagementPage() {
  const [formData, setFormData] = useState(defaultFormData);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Sayfa yüklendiğinde localStorage'dan yükle
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('admin_page_management');
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
      localStorage.setItem('admin_page_management', JSON.stringify(formData));
    }

    const contentJSON = JSON.stringify(formData, null, 2);
    alert('Yönetim sayfası içeriği güncellendi ve kaydedildi!\n\nNot: Gerçek güncelleme için app/kurumsal/yonetim/page.tsx dosyasını düzenleyip GitHub\'a commit etmeniz gerekir.\n\nİçerik JSON:\n' + contentJSON);
    
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
          <h3 className="text-xl font-bold text-gray-900 mb-4">Başkan</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bölüm Başlığı
              </label>
              <input
                type="text"
                value={formData.baskanSectionTitle}
                onChange={(e) => setFormData({ ...formData, baskanSectionTitle: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Başkan"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ünvan (Kartta görünecek)
              </label>
              <input
                type="text"
                value={formData.baskanTitle}
                onChange={(e) => setFormData({ ...formData, baskanTitle: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="BAŞKAN"
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
                placeholder="Yasin YILDIZ"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resim Yolu (public klasöründen)
              </label>
              <input
                type="text"
                value={formData.baskanImagePath}
                onChange={(e) => setFormData({ ...formData, baskanImagePath: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="/baskan.png"
              />
              <p className="text-xs text-gray-500 mt-1">
                Örnek: /baskan.png (resim public klasöründe olmalı)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modal Başlık (Özgeçmiş modalında görünecek ünvan)
              </label>
              <input
                type="text"
                value={formData.baskanModalTitle}
                onChange={(e) => setFormData({ ...formData, baskanModalTitle: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Bağcılar Belediye Başkanı"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Detaylı Özgeçmiş (Modal içinde gösterilecek)
              </label>
              <textarea
                value={formData.baskanBioFull}
                onChange={(e) => setFormData({ ...formData, baskanBioFull: e.target.value })}
                rows={15}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent font-mono text-sm"
                placeholder="Detaylı özgeçmiş metnini buraya yazın..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Her paragrafı yeni satırda yazın. Paragraflar otomatik olarak ayrılacaktır.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Yönetim Kurulu Başkanı</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bölüm Başlığı
              </label>
              <input
                type="text"
                value={formData.yonetimKuruluBaskaniSectionTitle}
                onChange={(e) => setFormData({ ...formData, yonetimKuruluBaskaniSectionTitle: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Yönetim Kurulu Başkanı"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ünvan (Kartta görünecek)
              </label>
              <input
                type="text"
                value={formData.yonetimKuruluBaskaniTitle}
                onChange={(e) => setFormData({ ...formData, yonetimKuruluBaskaniTitle: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="YÖNETİM KURULU BAŞKANI"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İsim
              </label>
              <input
                type="text"
                value={formData.yonetimKuruluBaskaniName}
                onChange={(e) => setFormData({ ...formData, yonetimKuruluBaskaniName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Salih KUMBAR"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resim Yolu (public klasöründen)
              </label>
              <input
                type="text"
                value={formData.yonetimKuruluBaskaniImagePath}
                onChange={(e) => setFormData({ ...formData, yonetimKuruluBaskaniImagePath: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="/genel-mudur.png"
              />
              <p className="text-xs text-gray-500 mt-1">
                Örnek: /genel-mudur.png (resim public klasöründe olmalı)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modal Başlık (Özgeçmiş modalında görünecek ünvan)
              </label>
              <input
                type="text"
                value={formData.yonetimKuruluBaskaniModalTitle}
                onChange={(e) => setFormData({ ...formData, yonetimKuruluBaskaniModalTitle: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Yönetim Kurulu Başkanı"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Detaylı Özgeçmiş (Modal içinde gösterilecek)
              </label>
              <textarea
                value={formData.yonetimKuruluBaskaniBioFull}
                onChange={(e) => setFormData({ ...formData, yonetimKuruluBaskaniBioFull: e.target.value })}
                rows={15}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent font-mono text-sm"
                placeholder="Detaylı özgeçmiş metnini buraya yazın..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Her paragrafı yeni satırda yazın. Paragraflar otomatik olarak ayrılacaktır.
              </p>
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

