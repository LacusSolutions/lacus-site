import { Users, Target, Award, TrendingUp } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, label: 'Clientes Atendidos', value: '150+' },
    { icon: Target, label: 'Projetos Entregues', value: '300+' },
    { icon: Award, label: 'Anos de Experiência', value: '8+' },
    { icon: TrendingUp, label: 'Taxa de Sucesso', value: '98%' },
  ];

  return (
    <section id="sobre" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Sobre a <span className="bg-gradient-primary bg-clip-text text-transparent">TechSolutions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Somos uma empresa especializada em desenvolvimento de software customizado, 
              transformando desafios complexos em soluções tecnológicas inovadoras.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h3 className="text-2xl font-bold mb-6">Nossa Missão</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Capacitar empresas através da tecnologia, desenvolvendo soluções sob medida que 
                otimizam processos, aumentam a eficiência e impulsionam o crescimento sustentável 
                dos nossos clientes.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Com uma equipe experiente e apaixonada por inovação, trabalhamos lado a lado 
                com nossos parceiros para entender suas necessidades específicas e entregar 
                resultados excepcionais.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-card p-6 rounded-lg shadow-card border">
                <h4 className="text-lg font-semibold mb-3 text-primary">Experiência Comprovada</h4>
                <p className="text-muted-foreground">
                  Mais de 8 anos desenvolvendo soluções para diversos segmentos, desde startups até grandes corporações.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-card border">
                <h4 className="text-lg font-semibold mb-3 text-primary">Tecnologia de Ponta</h4>
                <p className="text-muted-foreground">
                  Utilizamos as mais modernas tecnologias e metodologias ágeis para garantir qualidade e agilidade.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-card border">
                <h4 className="text-lg font-semibold mb-3 text-primary">Suporte Contínuo</h4>
                <p className="text-muted-foreground">
                  Oferecemos suporte técnico especializado e manutenção contínua para todos os nossos projetos.
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-primary p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <stat.icon className="text-white" size={32} />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;