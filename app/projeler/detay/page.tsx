'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getProjectBySlug, Project } from '@/lib/projects-data';
import ProjectDetailClient from '../project-detail-client';
import SafeLink from '@/components/safe-link';
import { ArrowLeft } from 'lucide-react';

export default function ProjectDetailPage() {
  const searchParams = useSearchParams();
  const slug = searchParams?.get('slug');
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const foundProject = getProjectBySlug(slug);
      setProject(foundProject);
      setLoading(false);
    } else {
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

