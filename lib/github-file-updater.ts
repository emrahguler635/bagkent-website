/**
 * GitHub API kullanarak dosyaları güncelleyen utility fonksiyonları
 */

const REPO_OWNER = 'emrahguler635';
const REPO_NAME = 'bagkent-website';
const BRANCH = 'main';

export interface UpdateResult {
  success: boolean;
  message: string;
  filePath?: string;
}

/**
 * Dosya içeriğini güncelle
 */
export async function updateFileOnGitHub(
  filePath: string,
  newContent: string,
  commitMessage: string,
  token: string
): Promise<UpdateResult> {
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
      if (getFileResponse.status === 404) {
        throw new Error(`Dosya bulunamadı: ${filePath}`);
      }
      throw new Error(`Dosya alınamadı: ${getFileResponse.statusText}`);
    }

    const fileData = await getFileResponse.json();
    const sha = fileData.sha;

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
          message: commitMessage,
          content: btoa(unescape(encodeURIComponent(newContent))), // UTF-8 encoding
          sha: sha,
          branch: BRANCH,
        }),
      }
    );

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json();
      throw new Error(errorData.message || `Dosya güncellenemedi: ${updateResponse.statusText}`);
    }

    return {
      success: true,
      message: `${filePath} başarıyla güncellendi`,
      filePath,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Bilinmeyen hata',
      filePath,
    };
  }
}

/**
 * React/TSX dosyası içeriğini güncelle
 */
export function updateReactFileContent(
  originalContent: string,
  updates: Record<string, any>,
  pageType: 'home' | 'about' | 'mission' | 'management' | 'contact'
): string {
  let updatedContent = originalContent;

  // Her sayfa tipi için özel güncelleme mantığı
  switch (pageType) {
    case 'home':
      // Ana sayfa güncellemeleri
      if (updates.heroTitle) {
        updatedContent = updatedContent.replace(
          /heroTitle:\s*['"](.*?)['"]/,
          `heroTitle: '${updates.heroTitle.replace(/'/g, "\\'")}'`
        );
      }
      if (updates.heroSubtitle) {
        updatedContent = updatedContent.replace(
          /heroSubtitle:\s*['"](.*?)['"]/,
          `heroSubtitle: '${updates.heroSubtitle.replace(/'/g, "\\'")}'`
        );
      }
      // ... diğer alanlar
      break;

    case 'management':
      // Yönetim sayfası güncellemeleri
      if (updates.baskanName) {
        updatedContent = updatedContent.replace(
          /baskanName:\s*['"](.*?)['"]/,
          `baskanName: '${updates.baskanName.replace(/'/g, "\\'")}'`
        );
      }
      // ... diğer alanlar
      break;

    // ... diğer sayfa tipleri
  }

  return updatedContent;
}

