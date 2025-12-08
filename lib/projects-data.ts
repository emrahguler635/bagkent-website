/**
 * Proje verilerini merkezi olarak tutar
 * JSON dosyasından yüklenir (build sorunlarını önlemek için)
 * 
 * NOT: Bu dosya sadece type tanımları içerir.
 * Gerçek veriler hooks/useProjects.ts hook'u ile yüklenir.
 */

export interface Project {
  slug: string;
  title: string;
  description: string;
  fullDescription?: string;
  image: string;
  category: string;
}

