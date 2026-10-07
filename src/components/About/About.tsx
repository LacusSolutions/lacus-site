'use client';

import { Award, Target, TrendingUp, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type ReactNode } from 'react';

import { useInView } from '~/hooks';

interface MissionBullet {
  text: string;
  title: string;
}

export function About(): ReactNode {
  const t = useTranslations();
  const { ref: headerRef, isInView: headerInView } = useInView();
  const { ref: statsRef, isInView: statsInView } = useInView();
  const { ref: contentRef, isInView: contentInView } = useInView();

  const stats = [
    { icon: Users, label: t('about.stats.clients'), value: '150+' },
    { icon: Target, label: t('about.stats.projects'), value: '300+' },
    { icon: Award, label: t('about.stats.experience'), value: '8+' },
    { icon: TrendingUp, label: t('about.stats.success'), value: '98%' },
  ];

  const missionBullets = t.raw('about.mission_bullets') as MissionBullet[];

  return (
    <section id="sobre" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div
            ref={headerRef}
            className={`text-center mb-16 transition-all duration-700 ${
              headerInView ? 'animate-fade-in' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('about.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t('about.subtitle')}</p>
          </div>

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

          <div
            ref={contentRef}
            className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 delay-400 ${
              contentInView ? 'animate-fade-in' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold">
                {t('about.mission_heading_prefix')}{' '}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  {t('about.mission_heading_highlight')}
                </span>
              </h3>
              <p className="text-muted-foreground leading-relaxed">{t('about.mission_p')}</p>
              <div className="space-y-4">
                {missionBullets.map((bullet, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">{bullet.title}</strong> {bullet.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-muted/50 p-8 rounded-lg">
              <h4 className="text-xl font-bold mb-6">{t('about.experience_title')}</h4>
              <div className="space-y-4">
                <p className="text-muted-foreground">{t('about.experience_p1')}</p>
                <p className="text-muted-foreground">{t('about.experience_p2')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
