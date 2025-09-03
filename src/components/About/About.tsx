import { Award, Target, TrendingUp, Users } from 'lucide-react';
import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { useInView } from '~/hooks';

export function About(): ReactNode {
  const { t } = useTranslation();
  const { ref: headerRef, isInView: headerInView } = useInView();
  const { ref: statsRef, isInView: statsInView } = useInView();
  const { ref: contentRef, isInView: contentInView } = useInView();

  const stats = [
    { icon: Users, label: t('about.stats.clients'), value: '150+' },
    { icon: Target, label: t('about.stats.projects'), value: '300+' },
    { icon: Award, label: t('about.stats.experience'), value: '8+' },
    { icon: TrendingUp, label: t('about.stats.success'), value: '98%' },
  ];

  return (
    <section id="sobre" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            ref={headerRef}
            className={`text-center mb-16 transition-all duration-700 ${
              headerInView ? 'animate-fade-in' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('about.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t('about.subtitle')}</p>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className={`grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 transition-all duration-700 delay-200 ${
              statsInView ? 'animate-slide-in-up' : 'opacity-0 translate-y-8'
            }`}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center group transition-all duration-500 delay-${index * 100}`}
              >
                <div className="bg-gradient-primary p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="text-white w-8 h-8" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Content */}
          <div
            ref={contentRef}
            className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 delay-400 ${
              contentInView ? 'animate-fade-in' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Mission */}
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold">
                Nossa{' '}
                <span className="bg-gradient-primary bg-clip-text text-transparent">Missão</span>
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Democratizar o acesso à tecnologia de ponta, oferecendo soluções customizadas que se
                adaptam perfeitamente às necessidades específicas de cada cliente. Acreditamos que a
                tecnologia deve servir ao negócio, não o contrário.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Inovação Constante:</strong> Mantemo-nos
                    atualizados com as últimas tecnologias
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Qualidade Garantida:</strong> Rigorosos
                    processos de teste e validação
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Suporte Dedicado:</strong> Acompanhamento
                    completo antes, durante e após o projeto
                  </p>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="bg-muted/50 p-8 rounded-lg">
              <h4 className="text-xl font-bold mb-6">Experiência Comprovada</h4>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Com mais de <strong className="text-primary">5 anos</strong> no mercado, já
                  entregamos soluções para empresas de diversos segmentos.
                </p>
                <p className="text-muted-foreground">
                  Nossa equipe combina expertise técnica com visão de negócio, garantindo que cada
                  projeto agregue valor real ao cliente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
