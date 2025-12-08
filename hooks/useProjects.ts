'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/lib/projects-data';
import { getBasePath } from '@/lib/getBasePath';

/**
 * Proje verilerini JSON dosyasından yükler
 */
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const basePath = getBasePath();
        const jsonPath = basePath ? `${basePath}/projects-data.json` : '/projects-data.json';
        const response = await fetch(jsonPath);
        const data = await response.json();
        setProjects(data.projects || []);
      } catch (error) {
        console.error('Projeler yüklenemedi:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
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

