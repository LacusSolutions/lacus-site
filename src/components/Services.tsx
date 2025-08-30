import { useTranslation } from 'react-i18next';
import { Smartphone, Globe, Database, Cog, Cloud, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInView } from '@/hooks/useInView';

const Services = () => {
  const { t } = useTranslation();
  const { ref: headerRef, isInView: headerInView } = useInView();
  const { ref: gridRef, isInView: gridInView } = useInView();
  const { ref: ctaRef, isInView: ctaInView } = useInView();

  const services = [
    {
      icon: Globe,
      title: t('services.web_dev.title'),
      description: t('services.web_dev.description'),
      features: t('services.web_dev.features', { returnObjects: true }) as string[]
    },
    {
      icon: Smartphone,
      title: t('services.mobile_dev.title'),
      description: t('services.mobile_dev.description'),
      features: t('services.mobile_dev.features', { returnObjects: true }) as string[]
    },
    {
      icon: Database,
      title: t('services.api_dev.title'),
      description: t('services.api_dev.description'),
      features: t('services.api_dev.features', { returnObjects: true }) as string[]
    }
  ];

  return (
    <section id="servicos" className="py-24 bg-background">
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
              {t('services.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>

          {/* Services Grid */}
          <div 
            ref={gridRef}
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 transition-all duration-700 delay-200 ${
              gridInView ? 'animate-slide-in-up' : 'opacity-0 translate-y-8'
            }`}
          >
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`group bg-card p-8 rounded-lg shadow-card border hover:shadow-primary/20 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                  gridInView ? `animate-slide-in-up` : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  animationDelay: gridInView ? `${index * 100 + 300}ms` : '0ms',
                  animationFillMode: 'both'
                }}
              >
                <div className="bg-gradient-primary p-3 rounded-lg w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="text-white" size={28} />
                </div>
                
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
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
            <Button variant="hero" size="lg" asChild>
              <a href="#contato">{t('services.cta')}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;