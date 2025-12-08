'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProjectBySlug, Project } from '@/lib/projects-data';
import ProjectDetailClient from './project-detail-client';

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const foundProject = getProjectBySlug(slug);
      setProject(foundProject);
      setLoading(false);
    }
  }, [slug]);

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

  if (!project) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Proje bulunamadı</h1>
          <a
            href="/projeler"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
          >
            ← Projelere Dön
          </a>
        </div>
      </div>
    );
  }

  return <ProjectDetailClient project={project} />;
}

