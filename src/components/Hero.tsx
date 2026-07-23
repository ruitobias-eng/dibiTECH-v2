import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollDown = () => {
    scrollToSection('servicos');
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen pt-24 lg:pt-28 pb-12 flex items-center justify-center overflow-hidden transition-colors duration-500 bg-background"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(45deg, transparent 48%, var(--accent) 49%, var(--accent) 51%, transparent 52%)`,
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="text-center lg:text-left">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-3 leading-tight tracking-tight"
            >
              <span className="text-foreground">dibi</span>
              <span className="text-accent">TECH</span>
              <br />
              <span className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mt-1 block">
                {t.hero.engineering || "Engenharia 5.0"}
              </span>
            </motion.h1>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-4 h-1.5 w-40 lg:w-56 mx-auto lg:mx-0 bg-gradient-to-r from-yellow-400 via-amber-500 to-transparent rounded-full"
            />

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl lg:text-3xl mb-3 font-medium text-foreground"
            >
              {t.hero.tagline}
            </motion.p>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-base lg:text-lg mb-8 text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              {t.hero.description}
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                onClick={() => scrollToSection('servicos')}
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-black text-base px-7 py-4 shadow-xl transition-all duration-300 rounded-xl flex items-center justify-center"
              >
                {t.hero.ctaServices}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <Button
                onClick={() => scrollToSection('projetos')}
                size="lg"
                variant="outline"
                className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold text-base px-7 py-4 transition-all duration-300 rounded-xl"
              >
                {t.hero.ctaProjects}
              </Button>
            </motion.div>
          </div>

          {/* Right Column with Image and Floating Stats */}
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="relative mt-6 lg:mt-0"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-accent/80 bg-zinc-900 group">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e02bfb1dd3ddcbb6543743/d6607d1ad_hero_image1.jpg"
                alt="Automação Industrial - Robôs em linha de produção"
                className="w-full h-auto object-cover min-h-[320px] max-h-[500px]"
                onError={(e) => {
                  // Fallback if image fails to load
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 bg-black/85 backdrop-blur-md border border-accent/60 rounded-xl px-4 py-2">
                <p className="text-accent font-extrabold text-xs tracking-wider uppercase">
                  {t.hero.industry}
                </p>
              </div>
            </div>

            {/* Floating Stat Card 1 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.0, type: "spring", stiffness: 100 }}
              className="absolute -left-4 sm:-left-6 top-1/6 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-yellow-400/30 bg-card/95 z-20 max-w-[200px] sm:max-w-[220px]"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-yellow-400 text-black font-black shrink-0 shadow-md">
                  <TrendingUp className="w-5 h-5 text-black" />
                </div>
                <div>
                  <div className="text-sm sm:text-base font-extrabold text-foreground leading-tight">
                    {t.hero.engineering || "Engenharia 5.0"}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium mt-0.5">
                    {t.hero.projects || "Projetos Concluídos"}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Stat Card 2 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2, type: "spring", stiffness: 100 }}
              className="absolute -right-4 sm:-right-6 bottom-1/6 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-yellow-400/30 bg-card/95 z-20 max-w-[180px] sm:max-w-[200px]"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-400 text-black font-black shrink-0 shadow-md">
                  <ShieldCheck className="w-5 h-5 text-black" />
                </div>
                <div>
                  <div className="text-base font-extrabold text-foreground leading-tight">100%</div>
                  <div className="text-xs text-muted-foreground font-medium mt-0.5">
                    {t.hero.automation || "Automação"}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 cursor-pointer group"
        onClick={handleScrollDown}
      >
        <div className="w-6 h-10 rounded-full flex justify-center border-2 border-accent bg-background/50 backdrop-blur-sm group-hover:bg-accent/20 transition-all duration-300 p-1">
          <motion.div
            className="w-2 h-2 rounded-full bg-accent"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
