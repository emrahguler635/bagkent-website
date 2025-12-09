'use client';

import { useState, useEffect } from 'react';
import { Upload, Download, CheckCircle, FileCode, AlertCircle, Github, Loader2 } from 'lucide-react';
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

const REPO_OWNER = 'emrahguler635';
const REPO_NAME = 'bagkent-website';
const BRANCH = 'main';

export default function ApplyToWebsitePage() {
  const [exportData, setExportData] = useState<Record<string, any>>({});
  const [applied, setApplied] = useState(false);
  const [githubToken, setGithubToken] = useState('');
  const [committing, setCommitting] = useState(false);
  const [commitStatus, setCommitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

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
      
      // Token'ı localStorage'dan yükle - HER ZAMAN kontrol et
      const savedToken = localStorage.getItem('github_token');
      if (savedToken) {
        setGithubToken(savedToken);
      }
      
      // Storage değişikliklerini dinle
      window.addEventListener('storage', loadData);
      
      // Token değişikliklerini de dinle
      const checkToken = () => {
        const currentToken = localStorage.getItem('github_token');
        if (currentToken && currentToken !== githubToken) {
          setGithubToken(currentToken);
        }
      };
      
      // Her render'da token'ı kontrol et
      checkToken();
      
      return () => {
        window.removeEventListener('storage', loadData);
      };
    }
  }, [githubToken]); // githubToken dependency eklendi

  const handleApplyToWebsite = () => {
    setApplied(true);
    
    Object.entries(pageKeys).forEach(([pageName, storageKey]) => {
      const data = exportData[pageName];
      if (data) {
        localStorage.setItem(storageKey, JSON.stringify(data));
      }
    });

    setTimeout(() => {
      alert('✅ Değişiklikler web sitesine uygulandı!\n\nSayfayı yenileyerek değişiklikleri görebilirsiniz.\n\nNot: Bu değişiklikler sadece bu tarayıcıda görünecektir. Tüm ziyaretçiler için kalıcı olması için dosyaları güncelleyip GitHub\'a commit etmeniz gerekir.');
      setApplied(false);
    }, 1000);
  };

  const saveGithubToken = () => {
    if (githubToken && githubToken.trim()) {
      localStorage.setItem('github_token', githubToken.trim());
      setGithubToken(githubToken.trim()); // State'i de güncelle
      alert('✅ GitHub token başarıyla kaydedildi!\n\nToken artık otomatik olarak yüklenecek.');
    } else {
      alert('⚠️ Lütfen geçerli bir token girin!');
    }
  };

  // Token input değiştiğinde otomatik kaydetme (opsiyonel - kullanıcı isterse)
  const handleTokenChange = (value: string) => {
    setGithubToken(value);
    // Otomatik kaydetmek isterseniz burayı açabilirsiniz:
    // if (value && value.trim()) {
    //   localStorage.setItem('github_token', value.trim());
    // }
  };

  const updateFileContent = async (filePath: string, content: string, token: string) => {
    try {
      // Önce dosyanın mevcut içeriğini al
      const getFileResponse = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}?ref=${BRANCH}`,
        {
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );

      if (!getFileResponse.ok) {
        throw new Error(`Dosya alınamadı: ${getFileResponse.statusText}`);
      }

      const fileData = await getFileResponse.json();
      const sha = fileData.sha;
      const currentContent = atob(fileData.content.replace(/\n/g, ''));

      // Yeni içeriği oluştur (bu kısım dosya tipine göre değişecek)
      // Şimdilik sadece placeholder - gerçek dosya güncelleme mantığı eklenecek
      const newContent = currentContent; // Placeholder

      // Dosyayı güncelle
      const updateResponse = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `Admin panelinden ${filePath} güncellendi`,
            content: btoa(newContent),
            sha: sha,
            branch: BRANCH,
          }),
        }
      );

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        throw new Error(errorData.message || `Dosya güncellenemedi: ${updateResponse.statusText}`);
      }

      return true;
    } catch (error: any) {
      console.error(`Error updating ${filePath}:`, error);
      throw error;
    }
  };

  const handleCommitToGithub = async () => {
    if (!githubToken) {
      alert('Lütfen önce GitHub token girin!');
      return;
    }

    if (Object.keys(exportData).length === 0) {
      alert('Uygulanacak değişiklik bulunamadı!');
      return;
    }

    const confirmed = confirm(
      '⚠️ Bu işlem dosyaları GitHub\'a commit edecektir.\n\n' +
      'Devam etmek istediğinize emin misiniz?'
    );

    if (!confirmed) return;

    setCommitting(true);
    setCommitStatus(null);

    try {
      const results: Array<{ file: string; success: boolean; message: string }> = [];

      // Önce lib/page-content.ts dosyasını bir kez al
      const contentFile = 'lib/page-content.ts';
      console.log('📥 lib/page-content.ts dosyası alınıyor...');
      
      const contentFileResponse = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${contentFile}?ref=${BRANCH}`,
        {
          headers: {
            'Authorization': `token ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );

      if (!contentFileResponse.ok) {
        throw new Error(`lib/page-content.ts dosyası alınamadı: ${contentFileResponse.statusText}`);
      }

      const contentFileData = await contentFileResponse.json();
      const contentSha = contentFileData.sha;
      
      // Base64 decode with proper UTF-8 handling
      const base64ToUtf8 = (str: string) => {
        try {
          return decodeURIComponent(escape(atob(str)));
        } catch (e) {
          // Fallback
          const binary = atob(str);
          const bytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
          }
          return new TextDecoder('utf-8').decode(bytes);
        }
      };
      
      let contentFileContent = base64ToUtf8(contentFileData.content.replace(/\n/g, ''));
      console.log('✅ lib/page-content.ts dosyası alındı');

      // Her sayfa için güncelleme yap
      for (const [pageName, data] of Object.entries(exportData)) {
        const filePath = fileMap[pageName];
        if (!filePath) {
          console.warn(`⚠️ ${pageName} için dosya yolu bulunamadı`);
          continue;
        }

        try {
          console.log(`📝 İşleniyor: ${pageName} (${filePath})`);

          // defaultContents objesini güncelle
          const pageType = pageName as keyof typeof fileMap;
          
          // JSON string'i oluştur - daha güvenli yöntem
          const formatValue = (value: any): string => {
            if (typeof value === 'string') {
              // String için escape işlemleri
              return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`;
            } else if (typeof value === 'object' && value !== null) {
              // Object için recursive
              const entries = Object.entries(value).map(([k, v]) => {
                return `    ${k}: ${formatValue(v)}`;
              });
              return `{\n${entries.join(',\n')}\n  }`;
            }
            return JSON.stringify(value);
          };
          
          // Daha iyi regex pattern - çok satırlı objeleri yakalayacak
          // Önce objenin başlangıç ve bitiş satırlarını bul
          const pageTypePattern = new RegExp(`(${pageType}:\\s*\\{[\\s\\S]*?\\})`, 'm');
          const match = contentFileContent.match(pageTypePattern);
          
          if (!match) {
            console.warn(`⚠️ ${pageType} için pattern bulunamadı, manuel ekleme deneniyor...`);
            // Pattern bulunamazsa, defaultContents objesinin sonuna eklemeyi dene
            const defaultContentsMatch = contentFileContent.match(/(const\s+defaultContents[^=]*=\s*\{)/);
            if (defaultContentsMatch) {
              const insertPos = defaultContentsMatch.index! + defaultContentsMatch[0].length;
              const beforeInsert = contentFileContent.substring(0, insertPos);
              const afterInsert = contentFileContent.substring(insertPos);
              
              // Mevcut objeyi bul ve sonuna ekle
              const lastBrace = afterInsert.lastIndexOf('}');
              if (lastBrace !== -1) {
                const beforeBrace = afterInsert.substring(0, lastBrace);
                const newEntry = `\n  ${pageType}: ${JSON.stringify(data, null, 2).replace(/\n/g, '\n  ')},\n`;
                contentFileContent = beforeInsert + beforeBrace + newEntry + afterInsert.substring(lastBrace);
              } else {
                throw new Error(`${pageType} için uygun konum bulunamadı`);
              }
            } else {
              throw new Error(`${pageType} için pattern bulunamadı ve defaultContents objesi bulunamadı`);
            }
          } else {
            // Mevcut objeyi güncelle
            const newObjStr = `${pageType}: ${JSON.stringify(data, null, 2).replace(/\n/g, '\n  ')}`;
            contentFileContent = contentFileContent.replace(pageTypePattern, newObjStr);
          }

          // Güncellenmiş içeriği GitHub'a yükle (sadece son sayfada)
          const isLastPage = pageName === Object.keys(exportData)[Object.keys(exportData).length - 1];
          
          if (isLastPage) {
            // UTF-8 encoding için doğru base64 encoding
            const utf8ToBase64 = (str: string) => {
              try {
                return btoa(unescape(encodeURIComponent(str)));
              } catch (e) {
                // Fallback: manuel UTF-8 encoding
                const utf8 = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
                  return String.fromCharCode(parseInt(p1, 16));
                });
                return btoa(utf8);
              }
            };

            const updateResponse = await fetch(
              `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${contentFile}`,
              {
                method: 'PUT',
                headers: {
                  'Authorization': `token ${githubToken}`,
                  'Accept': 'application/vnd.github.v3+json',
                  'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify({
                  message: `Admin panelinden sayfa içerikleri güncellendi: ${Object.keys(exportData).join(', ')}`,
                  content: utf8ToBase64(contentFileContent),
                  sha: contentSha,
                  branch: BRANCH,
                }),
              }
            );

            if (!updateResponse.ok) {
              const errorData = await updateResponse.json();
              throw new Error(`GitHub API hatası: ${errorData.message || updateResponse.statusText}`);
            }
            
            // Başarılı
            results.push({ file: contentFile, success: true, message: 'Güncellendi' });
            console.log(`✅ ${contentFile} başarıyla güncellendi`);
          } else {
            // Henüz son sayfa değil, sadece içeriği güncelle
            (window as any).__contentFileContent = contentFileContent;
            results.push({ file: `${pageName} (hazırlandı)`, success: true, message: 'İşlendi' });
            console.log(`✓ ${pageName} işlendi (commit bekleniyor)`);
          }

        } catch (error: any) {
          console.error(`❌ ${pageName} hatası:`, error);
          results.push({
            file: `${pageName} (${filePath})`,
            success: false,
            message: error.message || 'Bilinmeyen hata',
          });
        }
      }

      // Tüm sayfalar işlendi, şimdi lib/page-content.ts dosyasını GitHub'a commit et
      console.log('📤 lib/page-content.ts GitHub\'a yükleniyor...');
      
      try {
        // UTF-8 encoding için doğru base64 encoding
        const utf8ToBase64 = (str: string) => {
          try {
            return btoa(unescape(encodeURIComponent(str)));
          } catch (e) {
            // Fallback: manuel UTF-8 encoding
            const utf8 = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
              return String.fromCharCode(parseInt(p1, 16));
            });
            return btoa(utf8);
          }
        };

        const updateResponse = await fetch(
          `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${contentFile}`,
          {
            method: 'PUT',
            headers: {
              'Authorization': `token ${githubToken}`,
              'Accept': 'application/vnd.github.v3+json',
              'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({
              message: `Admin panelinden sayfa içerikleri güncellendi: ${Object.keys(exportData).join(', ')}`,
              content: utf8ToBase64(contentFileContent),
              sha: contentSha,
              branch: BRANCH,
            }),
          }
        );

        if (!updateResponse.ok) {
          const errorData = await updateResponse.json();
          throw new Error(`GitHub API hatası: ${errorData.message || updateResponse.statusText}`);
        }
        
        // Başarılı
        results.push({ file: contentFile, success: true, message: 'GitHub\'a commit edildi' });
        console.log(`✅ ${contentFile} başarıyla GitHub'a commit edildi`);
      } catch (error: any) {
        console.error(`❌ ${contentFile} commit hatası:`, error);
        results.push({
          file: contentFile,
          success: false,
          message: error.message || 'GitHub commit hatası',
        });
      }

      const successCount = results.filter(r => r.success).length;
      const failCount = results.filter(r => !r.success).length;

      // Hata detaylarını göster
      const failedFiles = results.filter(r => !r.success);
      const successfulFiles = results.filter(r => r.success);

      if (successCount > 0) {
        let message = `✅ ${successCount} dosya başarıyla güncellendi`;
        if (failCount > 0) {
          message += `\n\n❌ ${failCount} dosyada hata:\n`;
          failedFiles.forEach(r => {
            message += `\n• ${r.file}: ${r.message}`;
          });
        }
        setCommitStatus({
          type: failCount > 0 ? 'error' : 'success',
          message: message
        });
      } else {
        let message = `❌ Tüm dosyalarda hata oluştu:\n`;
        failedFiles.forEach(r => {
          message += `\n• ${r.file}: ${r.message}`;
        });
        setCommitStatus({
          type: 'error',
          message: message
        });
      }
      
      // Console'a da yazdır
      console.log('✅ Başarılı:', successfulFiles.map(r => r.file));
      console.log('❌ Hatalı:', failedFiles.map(r => ({ file: r.file, error: r.message })));

      // Token kaydet
      localStorage.setItem('github_token', githubToken);

    } catch (error: any) {
      setCommitStatus({
        type: 'error',
        message: `❌ Hata: ${error.message}`
      });
    } finally {
      setCommitting(false);
    }
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

      {/* GitHub Token Ayarları */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
        <div className="flex items-start gap-3">
          <Github className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">
              GitHub Otomatik Commit
            </h3>
            <p className="text-purple-800 text-sm mb-4">
              Değişiklikleri otomatik olarak GitHub'a commit etmek için Personal Access Token gerekir.
            </p>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-purple-900 mb-2">
                  GitHub Personal Access Token
                </label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={githubToken}
                    onChange={(e) => handleTokenChange(e.target.value)}
                    placeholder={githubToken ? 'Token kaydedildi (görmek için tıklayın)' : 'ghp_xxxxxxxxxxxxx'}
                    className="flex-1 px-4 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                  <button
                    onClick={saveGithubToken}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium whitespace-nowrap"
                  >
                    {githubToken && githubToken === localStorage.getItem('github_token') ? '✓ Kaydedildi' : 'Kaydet'}
                  </button>
                </div>
                {githubToken && (
                  <p className="text-xs text-purple-700 mt-2 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Token girildi - Kaydet butonuna tıklayarak kaydedin
                  </p>
                )}
                <p className="text-xs text-purple-700 mt-2">
                  Token oluşturmak için: <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" className="underline">GitHub Settings → Developer settings → Personal access tokens</a>
                </p>
                <p className="text-xs text-purple-700">
                  Gerekli izinler: <code className="bg-purple-100 px-1 rounded">repo</code> (Full control of private repositories)
                </p>
              </div>
            </div>
          </div>
        </div>
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
                  Değişiklikleri Web Sitesine Uygula (Bu Tarayıcı)
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

          {/* GitHub Commit */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-3">
              <Github className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Otomatik GitHub Commit (Tüm Ziyaretçiler İçin)
                </h3>
                <p className="text-green-800 text-sm mb-4">
                  Değişiklikleri otomatik olarak GitHub'a commit edip tüm ziyaretçiler için kalıcı hale getirin.
                  Bu işlem dosyaları otomatik olarak güncelleyecek ve GitHub'a push edecektir.
                </p>
                {commitStatus && (
                  <div className={`mb-4 p-4 rounded-lg whitespace-pre-line ${
                    commitStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    <div className="flex items-start gap-2">
                      {commitStatus.type === 'success' ? (
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 font-mono text-sm">{commitStatus.message}</div>
                    </div>
                  </div>
                )}
                <button
                  onClick={handleCommitToGithub}
                  disabled={committing || !githubToken}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {committing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Commit Ediliyor...
                    </>
                  ) : (
                    <>
                      <Github className="w-5 h-5" />
                      GitHub'a Otomatik Commit Et
                    </>
                  )}
                </button>
                {!githubToken && (
                  <p className="text-sm text-green-700 mt-2">
                    ⚠️ Önce yukarıda GitHub token girmeniz gerekiyor.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Manuel Güncelleme */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <FileCode className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-orange-900 mb-2">
                  Manuel Güncelleme (Alternatif)
                </h3>
                <p className="text-orange-800 text-sm mb-4">
                  Otomatik commit çalışmazsa, verileri indirip manuel olarak uygulayabilirsiniz.
                </p>
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
                  className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
                >
                  <Download className="w-4 h-4" />
                  Verileri JSON Olarak İndir
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
