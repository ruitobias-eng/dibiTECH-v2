import React from 'react';
import { Linkedin, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import logoImg from '@/assets/images/dibitech_logo_badge_1784816784484.jpg';

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-card border-t border-border pt-16 pb-12 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-border">
          {/* Brand Column */}
          <div className="space-y-4">
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={scrollToTop}
            >
              <img
                src={logoImg}
                alt="DibiTech Logo"
                className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400 shadow-lg group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <h3 className="font-extrabold text-2xl text-foreground tracking-tight">
                  dibi<span className="text-accent">TECH</span>
                </h3>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                  TI & Automação
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.footer.description}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-300"
                title="LinkedIn DibiTech"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:engenharia@dibitech.com.br"
                className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-300"
                title="E-mail DibiTech"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-sm font-extrabold text-foreground uppercase tracking-wider mb-4 border-l-4 border-yellow-400 pl-3">
              {t.footer.services}
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {t.footer.servicesList.map((service, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={() => scrollToSection('servicos')}
                    className="hover:text-accent hover:translate-x-1 transition-all inline-block cursor-pointer text-left"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-sm font-extrabold text-foreground uppercase tracking-wider mb-4 border-l-4 border-yellow-400 pl-3">
              {t.footer.company}
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('equipe')}
                  className="hover:text-accent hover:translate-x-1 transition-all inline-block cursor-pointer text-left"
                >
                  {t.nav.team}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('projetos')}
                  className="hover:text-accent hover:translate-x-1 transition-all inline-block cursor-pointer text-left"
                >
                  {t.nav.projects}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('contato')}
                  className="hover:text-accent hover:translate-x-1 transition-all inline-block cursor-pointer text-left"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-sm font-extrabold text-foreground uppercase tracking-wider mb-4 border-l-4 border-yellow-400 pl-3">
              {t.footer.contactTitle}
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-yellow-500 shrink-0 mt-1" />
                <span>Apiaí - SP, Brasil</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-yellow-500 shrink-0 mt-1" />
                <div className="flex flex-col gap-0.5">
                  <a href="https://wa.me/5515981009064" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors font-medium">
                    (15) 98100-9064 <span className="text-emerald-500 text-xs">(WhatsApp)</span>
                  </a>
                  <a href="tel:+551535522325" className="hover:text-accent transition-colors text-xs text-muted-foreground">
                    (15) 3552-2325
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-yellow-500 shrink-0" />
                <a href="mailto:engenharia@dibitech.com.br" className="hover:text-accent transition-colors">
                  engenharia@dibitech.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Rights & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-medium">
          <p>{t.footer.rights}</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 border border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground font-bold transition-all cursor-pointer"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
