import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Zap, Shield } from 'lucide-react';

const Hero = () => {
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
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8 border border-primary/20">
            <Zap size={16} />
            Soluções Tecnológicas Inovadoras
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Transformamos
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Ideias </span>
            em Software
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Desenvolvemos soluções customizadas que impulsionam o crescimento do seu negócio com tecnologia de ponta e inovação.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button variant="hero" size="lg" asChild>
              <a href="#contato" className="group">
                Iniciar Projeto
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#projetos">Ver Nossos Projetos</a>
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center text-white/80">
              <div className="bg-primary/20 p-4 rounded-full mb-4">
                <Code className="text-primary" size={32} />
              </div>
              <h3 className="font-semibold mb-2">Desenvolvimento Customizado</h3>
              <p className="text-sm">Soluções sob medida para suas necessidades específicas</p>
            </div>
            
            <div className="flex flex-col items-center text-center text-white/80">
              <div className="bg-primary/20 p-4 rounded-full mb-4">
                <Zap className="text-primary" size={32} />
              </div>
              <h3 className="font-semibold mb-2">Tecnologia Moderna</h3>
              <p className="text-sm">Utilizamos as mais recentes tecnologias do mercado</p>
            </div>
            
            <div className="flex flex-col items-center text-center text-white/80">
              <div className="bg-primary/20 p-4 rounded-full mb-4">
                <Shield className="text-primary" size={32} />
              </div>
              <h3 className="font-semibold mb-2">Segurança Garantida</h3>
              <p className="text-sm">Desenvolvimento focado em segurança e performance</p>
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