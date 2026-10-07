'use client';

import { ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { type ReactNode } from 'react';

import { GithubIcon } from '~/components/icons';
import { Button } from '~/components/ui';
import { useInView } from '~/hooks';

const PROJECT_IMAGES = [
  'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
];

interface ProjectItem {
  category: string;
  description: string;
  tech: string[];
  title: string;
}

export function Projects(): ReactNode {
  const t = useTranslations();
  const { ref: headerRef, isInView: headerInView } = useInView();
  const { ref: gridRef, isInView: gridInView } = useInView();
  const { ref: ctaRef, isInView: ctaInView } = useInView();

  const projects = t.raw('projects.items') as ProjectItem[];

  return (
    <section id="projetos" className="py-24 bg-muted/30" aria-labelledby="projects-title">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div
            ref={headerRef}
            className={`text-center mb-16 transition-all duration-700 ${
              headerInView ? 'animate-fade-in' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 id="projects-title" className="text-4xl md:text-5xl font-bold mb-6">
              {t('projects.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('projects.subtitle')}
            </p>
          </div>

          <div
            ref={gridRef}
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 transition-all duration-700 delay-200 ${
              gridInView ? 'animate-slide-in-up' : 'opacity-0 translate-y-8'
            }`}
          >
            {projects.map((project, index) => (
              <div
                key={index}
                className={`group bg-card rounded-lg shadow-card border overflow-hidden hover:shadow-primary/20 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                  gridInView ? 'animate-slide-in-left' : 'opacity-0 translate-x-8'
                }`}
                style={{
                  animationDelay: gridInView ? `${index * 150 + 300}ms` : '0ms',
                  animationFillMode: 'both',
                }}
              >
                <div className="relative overflow-hidden h-48">
                  <Image
                    src={PROJECT_IMAGES[index % PROJECT_IMAGES.length]}
                    alt={`${project.title} - ${t(`projects.categories.${project.category}`)}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    {t(`projects.categories.${project.category}`)}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <ExternalLink size={16} />
                      {t('projects.actions.view_live')}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <GithubIcon size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            ref={ctaRef}
            className={`text-center transition-all duration-700 delay-500 ${
              ctaInView ? 'animate-fade-in' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-muted-foreground mb-6">{t('projects.cta_subtitle')}</p>
            <Button variant="hero" size="lg" asChild>
              <a href="#contato">{t('projects.cta_button')}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
