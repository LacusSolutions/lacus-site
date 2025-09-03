import { CheckCircle, Mail, MapPin, Phone, Send } from 'lucide-react';
import { type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '~/components/ui';
import { useInView, useToast } from '~/hooks';

export function Contact(): ReactNode {
  const { t } = useTranslation();
  const { ref: headerRef, isInView: headerInView } = useInView();
  const { ref: contentRef, isInView: contentInView } = useInView();

  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.info.email'),
      content: 'contato@lacus.com.br',
      link: 'mailto:contato@lacus.com.br',
    },
    {
      icon: Phone,
      title: t('contact.info.phone'),
      content: '+55 (11) 9999-9999',
      link: 'tel:+5511999999999',
    },
    {
      icon: MapPin,
      title: t('contact.info.address'),
      content: 'São Paulo, SP - Brasil',
      link: '#',
    },
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: t('contact.form.success'),
        description: t('contact.form.success'),
      });
      setFormData({ name: '', email: '', company: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <section id="contato" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            ref={headerRef}
            className={`text-center mb-16 transition-all duration-700 ${
              headerInView ? 'animate-fade-in' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('contact.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>

          <div
            ref={contentRef}
            className={`grid lg:grid-cols-2 gap-16 transition-all duration-700 delay-300 ${
              contentInView ? 'animate-fade-in' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-bold mb-8">{t('nav.talk_to_us')}</h3>

              <div className="space-y-6 mb-12">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="bg-gradient-primary p-3 rounded-lg">
                      <info.icon className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{info.title}</h4>
                      <a
                        href={info.link}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {info.content}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <div className="bg-muted/50 p-6 rounded-lg">
                <h4 className="font-bold mb-4">{t('contact.benefits.title')}</h4>
                <div className="space-y-3">
                  {(t('contact.benefits.items', { returnObjects: true }) as string[]).map(
                    (benefit: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className="text-primary" size={16} />
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card p-8 rounded-lg shadow-card border">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      {t('contact.form.name')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder={t('contact.form.name_placeholder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      {t('contact.form.email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder={t('contact.form.email_placeholder')}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    {t('contact.form.company')}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder={t('contact.form.company_placeholder')}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {t('contact.form.message')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    placeholder={t('contact.form.message_placeholder')}
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    t('contact.form.sending')
                  ) : (
                    <>
                      {t('contact.form.submit')}
                      <Send size={20} />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
