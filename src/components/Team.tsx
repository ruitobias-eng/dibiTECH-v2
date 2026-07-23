import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/components/LanguageContext";
import { useTheme } from "@/components/ThemeContext";

export default function Team() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const memberPhotos = [
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e02bfb1dd3ddcbb6543743/e95e8e317_rodrigo.jpg',
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e02bfb1dd3ddcbb6543743/33946001a_rui.jpg'
  ];

  // 🎨 Paletas de cores por tema (Otimizadas para legibilidade técnica)
  const colorsByTheme: Record<string, {
    primary: string;
    bgSection: string;
    bgCard: string;
    borderCard: string;
    textMain: string;
    textSecondary: string;
    accentText: string;
    glow: string;
  }> = {
    light: {
      primary: "#FACC15",
      bgSection: "bg-white",
      bgCard: "bg-gray-100",
      borderCard: "border-gray-200", // Mais suave para um look clean
      textMain: "#000000", // Preto puro para contraste máximo
      textSecondary: "#374151", // text-gray-700
      accentText: "#EAB308",
      glow: "bg-yellow-400/10 blur-3xl",
    },
    dark: {
      primary: "#FACC15",
      bgSection: "bg-black", // Preto sólido ajuda o texto branco a "saltar" da tela
      bgCard: "bg-zinc-900",
      borderCard: "border-zinc-800",
      textMain: "#FFFFFF", // Branco puro em Hex para máxima nitidez no dark
      textSecondary: "#D1D5DB", // Cinza nítido (gray-300) para descrições longas
      accentText: "#FDE047", // Amarelo mais claro para destacar cargos sem sumir no fundo
      glow: "bg-yellow-500/10 blur-3xl",
    },
  };

  const colors = colorsByTheme[theme] || colorsByTheme.light;

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <section
      id="equipe"
      className={`py-24 relative overflow-hidden transition-colors duration-500 ${colors.bgSection}`}
    >
      {/* 🔳 Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(45deg, transparent 48%, ${colors.primary} 49%, ${colors.primary} 51%, transparent 52%)`,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <div
              className="px-6 py-2 border-2 rounded-full bg-opacity-20"
              style={{ backgroundColor: `${colors.primary}33`, borderColor: colors.primary }}
            >
              <span className="font-bold text-sm tracking-wider" style={{ color: colors.primary }}>
                {t.team.badge}
              </span>
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span style={{ color: colors.textMain }}>{t.team.title} </span>
            <span style={{ color: colors.primary }}>{t.team.titleHighlight}</span>
          </h2>

          <div
            className="h-1 w-48 mx-auto mb-6"
            style={{ background: `linear-gradient(to right, transparent, ${colors.primary}, transparent)` }}
          />

          <p className="text-xl max-w-4xl mx-auto leading-relaxed" style={{ color: colors.textSecondary }}>
            {t.team.description}
          </p>
        </motion.div>

        {/* Cards de membros */}
        <div className="grid md:grid-cols-2 gap-8">
          {t.team.members.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card
                className="h-full transition-all duration-300 group border-2"
                style={{ backgroundColor: colors.bgCard, borderColor: colors.borderCard }}
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-6 mb-6">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div
                        className="w-24 h-24 rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl relative z-10"
                        style={{
                          backgroundColor: colors.primary,
                          boxShadow: `0 0 25px ${colors.primary}55`,
                        }}
                      >
                        {memberPhotos[index] ? (
                          <img
                            src={memberPhotos[index]}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : null}
                        <span className="text-black font-bold text-3xl absolute">
                          {getInitials(member.name)}
                        </span>
                      </div>
                      <div
                        className={`absolute inset-0 rounded-2xl ${colors.glow} scale-95`}
                      />
                    </div>

                    {/* Informações do membro */}
                    <div>
                      <h3 className="text-3xl font-bold mb-2" style={{ color: colors.textMain }}>
                        {member.name}
                      </h3>
                      <p className="font-semibold text-sm mb-3" style={{ color: colors.primary }}>
                        {member.role}
                      </p>
                      <div className="h-1 w-16" style={{ backgroundColor: colors.primary }} />
                    </div>
                  </div>

                  <p className="leading-relaxed text-base" style={{ color: colors.textSecondary }}>
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
