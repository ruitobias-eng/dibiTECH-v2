import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/components/LanguageContext';
import { useTheme } from '@/components/ThemeContext';

export default function Services() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const serviceImageUrls = [
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e02bfb1dd3ddcbb6543743/c21f235c2_automao.png',
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e02bfb1dd3ddcbb6543743/e0389ce11_chatbotAI.png',
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e02bfb1dd3ddcbb6543743/cc44e2bd4_cloud.png',
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e02bfb1dd3ddcbb6543743/e94d042cc_dianalytic.png',
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e02bfb1dd3ddcbb6543743/e855b9176_erp.png',
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e02bfb1dd3ddcbb6543743/92f3583e8_delivery.png'
  ];

  const colorsByTheme = {
    light: {
      primary: '#FACC15',       
      bgSection: 'bg-white',
      bgCard: 'bg-gray-50',
      borderCard: 'border-gray-200',
      textMain: '#000000',
      textSecondary: 'text-gray-700',
      accentText: 'text-[#FACC15]',
    },
    dark: {
      primary: '#FACC15',
      bgSection: 'bg-black',
      bgCard: 'bg-zinc-900',
      borderCard: 'border-zinc-800',
      textMain: '#FFFFFF',
      textSecondary: '#D1D5DB',
      accentText: '#FDE047',
    },
  };

  const colors = colorsByTheme[theme === 'dark' ? 'dark' : 'light'];

  return (
    <section
      id="servicos"
      className={`py-24 relative overflow-hidden transition-colors duration-500 ${colors.bgSection}`}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(45deg, transparent 48%, ${colors.primary} 49%, ${colors.primary} 51%, transparent 52%)`,
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <div
              className="px-6 py-2 border-2 rounded-full bg-yellow-400/20 border-yellow-400"
            >
              <span className="font-extrabold text-xs tracking-widest uppercase text-yellow-500 dark:text-yellow-400">
                {t.services.badge}
              </span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
            <span style={{ color: colors.textMain }}>{t.services.title} </span>
            <span style={{ color: colors.primary }}>{t.services.titleHighlight}</span>
          </h2>

          <div
            className="h-1.5 w-48 mx-auto mb-6 rounded-full"
            style={{ background: `linear-gradient(to right, transparent, ${colors.primary}, transparent)` }}
          />

          <p className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: colors.textSecondary }}>
            {t.services.description}
          </p>
        </motion.div>

        {/* Services Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.services.items.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
            >
              <Card
                className="h-full transition-all duration-300 group border-2 overflow-hidden shadow-lg rounded-2xl"
                style={{ backgroundColor: colors.bgCard, borderColor: colors.borderCard }}
              >
                <div className="relative h-56 overflow-hidden bg-zinc-950">
                  <img
                    src={serviceImageUrls[index]}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).style.opacity = '0.5';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full border border-yellow-400/40 text-[11px] font-mono font-bold text-yellow-400">
                    Pillar 0{index + 1}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3
                    className="text-2xl font-extrabold mb-3 group-hover:text-yellow-400 transition-colors"
                    style={{ color: colors.textMain }}
                  >
                    {service.title}
                  </h3>
                  <p className="mb-6 leading-relaxed text-sm" style={{ color: colors.textSecondary }}>
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
                    {service.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 border text-xs font-bold rounded-full font-mono bg-yellow-400/10 border-yellow-400/40 text-yellow-500 dark:text-yellow-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
