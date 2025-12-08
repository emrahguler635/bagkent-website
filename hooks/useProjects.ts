'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/lib/projects-data';
import projectsData from '@/lib/projects-data.json';

/**
 * Proje verilerini JSON dosyasından yükler
 * Build zamanında import edilir, runtime'da fetch edilmez
 */
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // JSON dosyası direkt import edildi, hemen yükle
    try {
      const data = projectsData as { projects: Project[] };
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Projeler yüklenemedi:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { projects, loading };
}

/**
 * Slug'a göre proje bulur
 */
export function useProject(slug: string) {
  const { projects, loading } = useProjects();
  const project = projects.find(p => p.slug === slug) || null;
  return { project, loading };
}

