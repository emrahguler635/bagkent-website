'use client';

import { useEffect, useState } from 'react';
import { getProjectBySlug, Project } from '@/lib/projects-data';
import ProjectDetailClient from '../project-detail-client';
import SafeLink from '@/components/safe-link';
import { ArrowLeft } from 'lucide-react';

// Query parametresini parse et
function getQueryParam(name: string): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

export default function ProjectDetailPage() {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    // Query parametresini al
    const querySlug = getQueryParam('slug');
    setSlug(querySlug);
    
    if (querySlug) {
      const foundProject = getProjectBySlug(querySlug);
      setProject(foundProject);
      setLoading(false);
    } else {
      setLoading(false);
    }

    // URL değişikliklerini dinle (query string değiştiğinde)
    const handleLocationChange = () => {
      const newSlug = getQueryParam('slug');
      setSlug(newSlug);
      if (newSlug) {
        const foundProject = getProjectBySlug(newSlug);
        setProject(foundProject);
      } else {
        setProject(null);
      }
    };
    
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!project || !slug) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Proje bulunamadı</h1>
          <SafeLink
            href="/projeler"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Projelere Dön
          </SafeLink>
        </div>
      </div>
    );
  }

  return <ProjectDetailClient project={project} />;
}

