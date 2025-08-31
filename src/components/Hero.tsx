import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Zap, Shield } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { useTypewriter } from '@/hooks/useTypewriter';

const Hero = () => {
  const { t, i18n } = useTranslation();
  
  // Get animated words based on current language
  const getAnimatedWords = () => {
    if (i18n.language === 'pt') {
      return ['Ideias', 'Visões', 'Sonhos', 'Projetos', 'Conceitos'];
    }
    return ['Ideas', 'Visions', 'Dreams', 'Projects', 'Concepts'];
  };

  const { text: animatedWord, showCursor } = useTypewriter({
    words: getAnimatedWords(),
    typeSpeed: 120,
    deleteSpeed: 80,
    delayBetweenWords: 2500,
  });

  const { ref: badgeRef, isInView: badgeInView } = useInView({ threshold: 0.3 });
  const { ref: titleRef, isInView: titleInView } = useInView({ threshold: 0.3 });
  const { ref: subtitleRef, isInView: subtitleInView } = useInView({ threshold: 0.3 });
  const { ref: buttonsRef, isInView: buttonsInView } = useInView({ threshold: 0.3 });
  const { ref: featuresRef, isInView: featuresInView } = useInView({ threshold: 0.3 });

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div 
            ref={badgeRef}
            className={`inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8 border border-primary/20 transition-all duration-700 ${
              badgeInView ? 'animate-fade-in' : 'opacity-0 translate-y-5'
            }`}
          >
            <Zap size={16} />
            {t('hero.badge')}
          </div>

          {/* Heading */}
          <h1 
            ref={titleRef}
            className={`text-5xl md:text-7xl font-bold text-white mb-6 leading-tight transition-all duration-700 delay-200 ${
              titleInView ? 'animate-slide-in-up' : 'opacity-0 translate-y-8'
            }`}
          >
            {t('hero.title')}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              {animatedWord}
              <span className={`inline-block w-1 h-[0.9em] bg-primary ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
                |
              </span>
            </span>
            {' '}{t('hero.title_end')}
          </h1>

          {/* Subheading */}
          <p 
            ref={subtitleRef}
            className={`text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-300 ${
              subtitleInView ? 'animate-fade-in' : 'opacity-0 translate-y-5'
            }`}
          >
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div 
            ref={buttonsRef}
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-700 delay-500 ${
              buttonsInView ? 'animate-slide-in-up' : 'opacity-0 translate-y-8'
            }`}
          >
            <Button variant="hero" size="lg" asChild>
              <a href="#contato" className="group">
                {t('hero.cta_primary')}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#projetos">{t('hero.cta_secondary')}</a>
            </Button>
          </div>

          {/* Features */}
          <div 
            ref={featuresRef}
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto transition-all duration-700 delay-700 ${
              featuresInView ? 'animate-fade-in' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex flex-col items-center text-center text-white/80">
              <div className="bg-primary/20 p-4 rounded-full mb-4">
                <Code className="text-primary" size={32} />
              </div>
              <h3 className="font-semibold mb-2">{t('hero.feature_1_title')}</h3>
              <p className="text-sm">{t('hero.feature_1_desc')}</p>
            </div>
            
            <div className="flex flex-col items-center text-center text-white/80">
              <div className="bg-primary/20 p-4 rounded-full mb-4">
                <Zap className="text-primary" size={32} />
              </div>
              <h3 className="font-semibold mb-2">{t('hero.feature_2_title')}</h3>
              <p className="text-sm">{t('hero.feature_2_desc')}</p>
            </div>
            
            <div className="flex flex-col items-center text-center text-white/80">
              <div className="bg-primary/20 p-4 rounded-full mb-4">
                <Shield className="text-primary" size={32} />
              </div>
              <h3 className="font-semibold mb-2">{t('hero.feature_3_title')}</h3>
              <p className="text-sm">{t('hero.feature_3_desc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </section>
  );
};

export default Hero;