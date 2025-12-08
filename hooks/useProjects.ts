'use client';

import { useMemo } from 'react';
import { Project, getAllProjectsWithImages } from '@/lib/projects-data';

/**
 * Proje verilerini döndürür
 * Veriler TypeScript dosyasından direkt import edilir
 */
export function useProjects() {
  const projects = useMemo(() => getAllProjectsWithImages(), []);
  
  return { 
    projects, 
    loading: false 
  };
}

/**
 * Slug'a göre proje bulur
 */
export function useProject(slug: string) {
  const { projects } = useProjects();
  const project = projects.find(p => p.slug === slug) || null;
  return { project, loading: false };
}

