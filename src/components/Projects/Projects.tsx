import { useTranslation } from 'react-i18next';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '~/components/ui';
import { useInView } from '~/hooks';

export function Projects() {
  const { t } = useTranslation();
  const { ref: headerRef, isInView: headerInView } = useInView();
  const { ref: gridRef, isInView: gridInView } = useInView();
  const { ref: ctaRef, isInView: ctaInView } = useInView();

  const projects = [
    {
      title: 'Sistema ERP Corporativo',
      description: 'Desenvolvimento completo de sistema ERP para gestão empresarial com módulos financeiro, estoque e vendas.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      category: t('projects.categories.web'),
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop'
    },
    {
      title: 'Aplicativo de Delivery',
      description: 'App mobile completo para delivery com geolocalização, pagamentos integrados e painel administrativo.',
      tech: ['React Native', 'Firebase', 'Stripe', 'Maps API'],
      category: t('projects.categories.mobile'),
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop'
    },
    {
      title: 'Plataforma E-learning',
      description: 'Sistema de ensino online com videoaulas, exercícios interativos e acompanhamento de progresso.',
      tech: ['Next.js', 'TypeScript', 'MongoDB', 'Video.js'],
      category: t('projects.categories.web'),
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop'
    },
    {
      title: 'Dashboard Analytics',
      description: 'Painel de business intelligence com visualização de dados em tempo real e relatórios customizáveis.',
      tech: ['Vue.js', 'D3.js', 'Python', 'Docker'],
      category: t('projects.categories.web'),
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
    },
    {
      title: 'API de Integração',
      description: 'Desenvolvimento de API robusta para integração entre sistemas legados e novas aplicações.',
      tech: ['Node.js', 'Express', 'Redis', 'JWT'],
      category: t('projects.categories.api'),
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop'
    },
    {
      title: 'Sistema IoT Industrial',
      description: 'Solução IoT para monitoramento industrial com sensores, alertas automáticos e controle remoto.',
      tech: ['React', 'MQTT', 'InfluxDB', 'Grafana'],
      category: t('projects.categories.api'),
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop'
    }
  ];

  return (
    <section id="projetos" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            ref={headerRef}
            className={`text-center mb-16 transition-all duration-700 ${
              headerInView ? 'animate-fade-in' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('projects.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('projects.subtitle')}
            </p>
          </div>

          {/* Projects Grid */}
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
                  animationFillMode: 'both'
                }}
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={`${project.title} - ${project.category}`}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="400"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    {project.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
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

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <ExternalLink size={16} />
                      {t('projects.actions.view_live')}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Github size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            ref={ctaRef}
            className={`text-center transition-all duration-700 delay-500 ${
              ctaInView ? 'animate-fade-in' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-muted-foreground mb-6">
              {t('projects.cta_subtitle')}
            </p>
            <Button variant="hero" size="lg" asChild>
              <a href="#contato">{t('projects.cta_button')}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
