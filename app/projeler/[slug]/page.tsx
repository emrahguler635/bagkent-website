import { notFound } from 'next/navigation';
import { getAllProjectsWithImages, getProjectBySlug } from '@/lib/projects-data';
import ProjectDetailClient from './project-detail-client';

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

// Static export için generateStaticParams
export async function generateStaticParams() {
  const projects = getAllProjectsWithImages();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}

