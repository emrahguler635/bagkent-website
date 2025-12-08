'use client';

import { useState, useEffect } from 'react';
import { Upload, Download, CheckCircle, FileCode, AlertCircle } from 'lucide-react';
import SafeLink from '@/components/safe-link';
import { getBasePath } from '@/lib/getBasePath';

const pageKeys = {
  home: 'admin_page_home',
  about: 'admin_page_about',
  mission: 'admin_page_mission',
  management: 'admin_page_management',
  contact: 'admin_page_contact',
};

const fileMap: Record<string, string> = {
  home: 'app/page.tsx',
  about: 'app/kurumsal/hakkimizda/page.tsx',
  mission: 'app/kurumsal/misyon-vizyon/page.tsx',
  management: 'app/kurumsal/yonetim/page.tsx',
  contact: 'app/iletisim/page.tsx',
};

export default function ApplyToWebsitePage() {
  const [exportData, setExportData] = useState<Record<string, any>>({});
  const [applied, setApplied] = useState(false);

  // Sayfa yüklendiğinde localStorage'dan verileri al
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loadData = () => {
        const data: Record<string, any> = {};
        Object.entries(pageKeys).forEach(([pageName, storageKey]) => {
          const saved = localStorage.getItem(storageKey);
          if (saved) {
            try {
              data[pageName] = JSON.parse(saved);
            } catch (e) {
              console.error(`Failed to parse ${pageName}:`, e);
            }
          }
        });
        setExportData(data);
      };
      loadData();
      
      // Storage değişikliklerini dinle
      window.addEventListener('storage', loadData);
      return () => window.removeEventListener('storage', loadData);
    }
  }, []);

  const handleApplyToWebsite = () => {
    // localStorage'daki veriler zaten gerçek sayfalar tarafından okunuyor
    // Bu butona basınca sadece bir onay mesajı gösterelim
    setApplied(true);
    
    // Tüm verileri bir daha kaydet (tetikleme için)
    Object.entries(pageKeys).forEach(([pageName, storageKey]) => {
      const data = exportData[pageName];
      if (data) {
        localStorage.setItem(storageKey, JSON.stringify(data));
      }
    });

    // Başarı mesajı
    setTimeout(() => {
      alert('✅ Değişiklikler web sitesine uygulandı!\n\nSayfayı yenileyerek değişiklikleri görebilirsiniz.\n\nNot: Bu değişiklikler sadece bu tarayıcıda görünecektir. Tüm ziyaretçiler için kalıcı olması için dosyaları güncelleyip GitHub\'a commit etmeniz gerekir.');
      setApplied(false);
    }, 1000);
  };

  const downloadUpdateScript = () => {
    const script = `
// Bu script localStorage'daki verileri kullanarak dosyaları günceller
// Kullanım: node apply-changes.js

const fs = require('fs');
const path = require('path');

// localStorage verileri (aşağıdaki JSON'dan alınacak)
const changes = ${JSON.stringify(exportData, null, 2)};

// Dosya güncelleme fonksiyonu
function updateFile(filePath, updates) {
  console.log(\`Güncelleniyor: \${filePath}\`);
  // Burada dosya güncelleme mantığı olacak
  // Manuel olarak dosyaları güncellemeniz gerekiyor
}

console.log('Değişiklikler uygulanıyor...');
Object.entries(changes).forEach(([pageName, data]) => {
  const filePath = fileMap[pageName];
  if (filePath) {
    updateFile(filePath, data);
  }
});
console.log('Tamamlandı!');
`;

    const blob = new Blob([script], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'apply-changes.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const hasChanges = Object.keys(exportData).length > 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <SafeLink
          href="/admin/pages"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-4"
        >
          ← Geri Dön
        </SafeLink>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Web Sitesine Uygula</h1>
        <p className="text-gray-600">
          Admin panelinde yaptığınız değişiklikleri web sitesine uygulayın
        </p>
      </div>

      {!hasChanges ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-6 h-6 text-yellow-600" />
            <h3 className="text-lg font-semibold text-yellow-900">Henüz Değişiklik Yok</h3>
          </div>
          <p className="text-yellow-800 text-sm">
            Web sitesine uygulamak için önce sayfa formlarında değişiklik yapıp kaydetmeniz gerekir.
          </p>
        </div>
      ) : (
        <>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-3">
              <Upload className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Değişiklikleri Web Sitesine Uygula
                </h3>
                <p className="text-blue-800 text-sm mb-4">
                  Bu butona basarak admin panelinde yaptığınız değişiklikleri web sitesine uygulayabilirsiniz. 
                  Değişiklikler anında görünecektir ve bu tarayıcıda kalıcı olacaktır.
                </p>
                <div className="bg-white rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Uygulanacak Sayfalar:</strong>
                  </p>
                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                    {Object.keys(exportData).map((pageName) => {
                      const pageNames: Record<string, string> = {
                        home: 'Ana Sayfa',
                        about: 'Hakkımızda',
                        mission: 'Misyon & Vizyon',
                        management: 'Yönetim',
                        contact: 'İletişim',
                      };
                      return (
                        <li key={pageName}>
                          {pageNames[pageName] || pageName} ({Object.keys(exportData[pageName] || {}).length} alan)
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <button
                  onClick={handleApplyToWebsite}
                  disabled={applied}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {applied ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Uygulandı!
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Web Sitesine Uygula
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <FileCode className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Kalıcı Güncelleme (GitHub)
                </h3>
                <p className="text-green-800 text-sm mb-4">
                  Değişikliklerin tüm ziyaretçiler için kalıcı olması için dosyaları güncelleyip GitHub'a commit etmeniz gerekir.
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      const json = JSON.stringify(exportData, null, 2);
                      const blob = new Blob([json], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'all-pages-data.json';
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    <Download className="w-4 h-4" />
                    Verileri JSON Olarak İndir
                  </button>
                </div>
                <div className="mt-4 bg-white rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-2">
                    <strong>Adımlar:</strong>
                  </p>
                  <ol className="text-xs text-gray-600 list-decimal list-inside space-y-1">
                    <li>Yukarıdaki butona tıklayarak JSON verisini indirin</li>
                    <li>İlgili dosyaları açın (örn: app/page.tsx, app/kurumsal/yonetim/page.tsx)</li>
                    <li>JSON'daki değerleri dosyalara manuel olarak uygulayın</li>
                    <li>GitHub'a commit edip push yapın</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">
              ⚡ Hızlı Not
            </h3>
            <p className="text-purple-800 text-sm">
              "Web Sitesine Uygula" butonu sadece bu tarayıcıda çalışır. Diğer ziyaretçilerin görmesi için 
              GitHub'a commit etmeniz gerekir. Ancak bu sayede değişiklikleri test edebilirsiniz!
            </p>
          </div>
        </>
      )}
    </div>
  );
}

