import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowUpRight, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projetos" className="py-24 relative overflow-hidden bg-background border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-500 dark:text-yellow-400 font-bold text-xs uppercase tracking-widest mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{t.projects.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold mb-4 tracking-tight text-foreground">
            {t.projects.title}{' '}
            <span className="text-accent">{t.projects.titleHighlight}</span>
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.projects.description}
          </p>
        </motion.div>

        {/* Projects Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {t.projects.items.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="rounded-3xl border-2 border-border bg-card/70 backdrop-blur-md p-6 flex flex-col justify-between shadow-xl hover:border-yellow-400/60 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent font-mono text-xs font-bold">
                    {project.client}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-xl font-extrabold text-foreground mb-3 group-hover:text-yellow-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">Resultado:</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-yellow-400 text-black font-extrabold text-xs shadow-sm">
                  <CheckCircle className="w-3.5 h-3.5" />
                  {project.result}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
