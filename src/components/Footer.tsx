import { Github, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:contato@lacus.com.br', label: 'Email' },
    { icon: Phone, href: 'tel:+5511999999999', label: 'Telefone' }
  ];

  const quickLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Projetos', href: '#projetos' },
    { label: 'Contato', href: '#contato' }
  ];

  const services = [
    'Desenvolvimento Web',
    'Aplicativos Mobile',
    'Sistemas Customizados',
    'Cloud Computing',
    'Consultoria Tech',
    'Segurança Digital'
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src="/lovable-uploads/12c27d29-c402-47e8-8e6d-563fe50445a5.png" alt="Lacus Logo" className="w-10 h-10" />
                <div className="text-3xl font-poppins font-bold text-lacus-brand">
                  Lacus
                </div>
              </div>
              <p className="text-secondary-foreground/80 mb-6 leading-relaxed">
                Transformamos ideias em soluções tecnológicas inovadoras. 
                Especializados em desenvolvimento de software customizado 
                para impulsionar o crescimento do seu negócio.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="bg-secondary-foreground/10 p-3 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-6">Links Rápidos</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-secondary-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-bold text-lg mb-6">Serviços</h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <span className="text-secondary-foreground/80 text-sm">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-secondary-foreground/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-secondary-foreground/60 text-sm">
                © {currentYear} <span className="inline-flex items-center gap-2 font-poppins font-bold text-lacus-brand">
                  <img src="/lovable-uploads/12c27d29-c402-47e8-8e6d-563fe50445a5.png" alt="Lacus Logo" className="w-4 h-4" />
                  Lacus
                </span>. Todos os direitos reservados.
              </p>
              
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-secondary-foreground/60 hover:text-primary transition-colors">
                  Política de Privacidade
                </a>
                <a href="#" className="text-secondary-foreground/60 hover:text-primary transition-colors">
                  Termos de Uso
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;