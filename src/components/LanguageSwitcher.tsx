import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useLanguage, LanguageCode } from '@/components/LanguageContext';

const languages: { code: LanguageCode; label: string; name: string }[] = [
  { code: 'pt', label: 'PT', name: 'Português' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'es', label: 'ES', name: 'Español' }
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-background border border-border hover:border-yellow-400 transition-all duration-300 text-foreground text-xs font-bold shadow-sm"
      >
        <Globe className="w-3.5 h-3.5 text-yellow-400" />
        <span>{languages.find(l => l.code === language)?.label}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full right-0 mt-2 bg-card border-2 border-yellow-400 rounded-xl overflow-hidden shadow-2xl shadow-yellow-500/20 z-50 min-w-[140px]"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left transition-colors flex items-center justify-between gap-3 text-xs ${
                    language === lang.code
                      ? 'bg-yellow-400 text-black font-extrabold'
                      : 'text-foreground hover:bg-yellow-400/10'
                  }`}
                >
                  <span>{lang.name}</span>
                  <span className="font-bold">{lang.label}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
