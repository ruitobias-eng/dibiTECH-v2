import React from 'react';
import { motion } from 'framer-motion';
import { Check, Cpu, Heart, Sparkles } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { useTheme } from '@/components/ThemeContext';

export default function IndustryComparison() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <section className="py-20 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-500 dark:text-yellow-400 font-bold text-xs uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.comparison.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold mb-4 tracking-tight text-foreground">
            {t.comparison.title}{' '}
            <span className="text-accent">{t.comparison.titleHighlight}</span>
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.comparison.description}
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="rounded-3xl border-2 border-border overflow-hidden bg-card/60 backdrop-blur-md shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 border-b-2 border-border bg-muted/40 font-bold text-sm uppercase tracking-wider text-muted-foreground">
            <div className="p-4 sm:p-6 md:border-r border-border flex items-center gap-2">
              <span>{t.comparison.headers.feature}</span>
            </div>
            <div className="p-4 sm:p-6 md:border-r border-border flex items-center gap-2 text-foreground/80">
              <Cpu className="w-4 h-4 text-muted-foreground" />
              <span>{t.comparison.headers.v4}</span>
            </div>
            <div className="p-4 sm:p-6 bg-yellow-400/10 text-yellow-500 dark:text-yellow-400 flex items-center gap-2 font-extrabold">
              <Heart className="w-4 h-4 fill-current" />
              <span>{t.comparison.headers.v5}</span>
            </div>
          </div>

          <div className="divide-y-2 divide-border">
            {t.comparison.items.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-3 hover:bg-accent/5 transition-colors duration-200"
              >
                <div className="p-4 sm:p-6 md:border-r border-border font-bold text-foreground text-sm sm:text-base flex items-center">
                  {item.f}
                </div>
                <div className="p-4 sm:p-6 md:border-r border-border text-muted-foreground text-sm sm:text-base flex items-center">
                  {item.v4}
                </div>
                <div className="p-4 sm:p-6 bg-yellow-400/5 text-foreground font-semibold text-sm sm:text-base flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-yellow-400/20 text-yellow-500 dark:text-yellow-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{item.v5}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-sm sm:text-base italic font-medium text-muted-foreground">
            {t.comparison.footerNote}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
