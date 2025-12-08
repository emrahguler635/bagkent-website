'use client';

import { useState, useEffect } from 'react';
import { Download, Copy, FileText, CheckCircle } from 'lucide-react';

const pageKeys = {
  home: 'admin_page_home',
  about: 'admin_page_about',
  mission: 'admin_page_mission',
  management: 'admin_page_management',
  contact: 'admin_page_contact',
};

export default function ExportPage() {
  const [exportData, setExportData] = useState<Record<string, any>>({});
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
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
    }
  }, []);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const downloadJSON = (data: any, filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateUpdateCode = (pageName: string, data: any) => {
    const fileMap: Record<string, string> = {
      home: 'app/page.tsx',
      about: 'app/kurumsal/hakkimizda/page.tsx',
      mission: 'app/kurumsal/misyon-vizyon/page.tsx',
      management: 'app/kurumsal/yonetim/page.tsx',
      contact: 'app/iletisim/page.tsx',
    };

    const fileName = fileMap[pageName];
    if (!fileName) return '';

    return `// ${fileName} dosyasında yapılacak güncellemeler:
// localStorage'dan gelen verileri kullanarak dosyayı güncelleyin

${JSON.stringify(data, null, 2)}`;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Veri Dışa Aktarma</h1>
        <p className="text-gray-600">
          Admin panelinde yaptığınız değişiklikleri dışa aktarın ve dosyalara uygulayın
        </p>
      </div>

      {Object.keys(exportData).length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <p className="text-yellow-800">
            Henüz kaydedilmiş veri bulunamadı. Önce sayfa formlarında değişiklik yapıp kaydedin.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(exportData).map(([pageName, data]) => {
            const pageNames: Record<string, string> = {
              home: 'Ana Sayfa',
              about: 'Hakkımızda',
              mission: 'Misyon & Vizyon',
              management: 'Yönetim',
              contact: 'İletişim',
            };

            const jsonString = JSON.stringify(data, null, 2);
            const updateCode = generateUpdateCode(pageName, data);

            return (
              <div key={pageName} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    {pageNames[pageName] || pageName}
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(jsonString, `${pageName}-json`)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      {copied === `${pageName}-json` ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Kopyalandı!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          JSON Kopyala
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => downloadJSON(data, `${pageName}-data.json`)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      <Download className="w-4 h-4" />
                      JSON İndir
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">JSON Verisi</label>
                    <span className="text-xs text-gray-500">
                      {Object.keys(data).length} alan
                    </span>
                  </div>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto text-xs max-h-96 overflow-y-auto">
                    {jsonString}
                  </pre>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800 mb-2">
                    <strong>Nasıl Uygulanır:</strong>
                  </p>
                  <ol className="text-sm text-blue-800 list-decimal list-inside space-y-1">
                    <li>Yukarıdaki JSON verisini kopyalayın</li>
                    <li>İlgili dosyayı açın (örn: {pageName === 'home' ? 'app/page.tsx' : 
                      pageName === 'about' ? 'app/kurumsal/hakkimizda/page.tsx' :
                      pageName === 'mission' ? 'app/kurumsal/misyon-vizyon/page.tsx' :
                      pageName === 'management' ? 'app/kurumsal/yonetim/page.tsx' :
                      'app/iletisim/page.tsx'})
                    </li>
                    <li>JSON'daki değerleri ilgili yerlere yapıştırın</li>
                    <li>GitHub'a commit edip push yapın</li>
                  </ol>
                </div>
              </div>
            );
          })}

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Tüm Verileri Toplu İndir</h3>
            <button
              onClick={() => downloadJSON(exportData, 'all-pages-data.json')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              <Download className="w-5 h-5" />
              Tüm Verileri İndir (JSON)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

