import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles, PhoneCall, RefreshCw, ChevronDown, CheckCheck } from "lucide-react";
import assistantAvatar from "@/assets/images/dibibot_avatar_user_1784819267790.jpg";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
}

const QUICK_SUGGESTIONS = [
  "🌐 Como diagnosticar lentidão na rede ou Wi-Fi?",
  "🔒 Como proteger minha empresa contra vírus e ataques?",
  "🤖 Orçamento para Automação Industrial e CLPs",
  "💬 Como funciona o Chatbot com IA para suporte?",
  "☁️ Serviços de Infraestrutura de Nuvem e Backup",
  "📞 Falar com Engenheiro no WhatsApp",
];

const getClientFallbackResponse = (message: string): string => {
  const lowerMsg = message.toLowerCase();
  if (lowerMsg.includes("rede") || lowerMsg.includes("wifi") || lowerMsg.includes("wi-fi") || lowerMsg.includes("ip") || lowerMsg.includes("dns") || lowerMsg.includes("internet") || lowerMsg.includes("vpn")) {
    return `🌐 **Suporte e Diagnóstico de Redes & Conectividade**\n\nPara resolver ou otimizar a rede da sua empresa:\n1. **Verifique o DNS:** Teste os servidores DNS públicos (como \`1.1.1.1\` ou \`8.8.8.8\`).\n2. **Conflito de IP:** Certifique-se de que a rede utiliza DHCP configurado corretamente com faixa adequada.\n3. **Infraestrutura:** Cabos Cat6 e roteadores corporativos evitam gargalos em redes comerciais.\n4. **VPN Corporativa:** Para acesso remoto seguro à infraestrutura da empresa.\n\n💡 A **dibiTECH** projeta e gerencia redes corporativas e infraestrutura de TI de alta velocidade! Quer falar com um engenheiro no **WhatsApp (15) 98100-9064**?`;
  } else if (lowerMsg.includes("segurança") || lowerMsg.includes("firewall") || lowerMsg.includes("antivirus") || lowerMsg.includes("ransomware") || lowerMsg.includes("hacker") || lowerMsg.includes("lgpd") || lowerMsg.includes("proteger")) {
    return `🔒 **Segurança Cibernética & Proteção de Dados**\n\nPassos essenciais para proteger os sistemas da sua empresa:\n- **Firewall Dedicado:** Filtre conexões suspeitas e portas abertas desnecessárias.\n- **Autenticação em 2 Etapas (MFA):** Obrigue verificação em 2 fatores para e-mails e sistemas.\n- **Política de Backups:** Mantenha cópias isoladas fora da rede principal (Regra 3-2-1).\n- **Conscientização:** A maioria das invasões ocorre por engenharia social e e-mails de phishing.\n\n🛡️ A **dibiTECH** realiza auditorias de segurança e implementação de firewalls/VPNs corporativas!`;
  } else if (lowerMsg.includes("lento") || lowerMsg.includes("suporte") || lowerMsg.includes("formatar") || lowerMsg.includes("computador") || lowerMsg.includes("hardware") || lowerMsg.includes("chamado")) {
    return `💻 **Suporte Técnico & Manutenção de Computadores**\n\nPrincipais causas de lentidão em sistemas corporativos:\n• **Uso de HD mecânico antigo:** Substituição por SSD NVMe acelera em até 10x.\n• **Memória RAM insuficiente:** Recomenda-se no mínimo 8GB a 16GB para sistemas modernos.\n• **Processos e malwares em segundo plano:** Limpeza técnica e verificação de inicialização.\n• **Aquecimento excessivo:** Troca de pasta térmica e limpeza interna preventiva.\n\n🔧 A **dibiTECH** oferece contratos de suporte de TI preventivo e corretivo para empresas!`;
  } else if (lowerMsg.includes("banco de dados") || lowerMsg.includes("sql") || lowerMsg.includes("software") || lowerMsg.includes("sistema") || lowerMsg.includes("desenvolvimento") || lowerMsg.includes("programação")) {
    return `💻 **Desenvolvimento de Software & Banco de Dados**\n\nTrabalhamos com arquitetura moderna e escalável:\n- **Linguagens:** C#, .NET, Python, C/C++, Java, Delphi e TypeScript\n- **Bancos de Dados:** PostgreSQL, SQL Server, Firebird, MySQL e MongoDB\n- **Integração:** APIs REST/GraphQL e sincronização em tempo real\n\nPrecisa desenvolver um sistema sob medida ou otimizar seu banco de dados atual?`;
  } else if (lowerMsg.includes("orçamento") || lowerMsg.includes("quote") || lowerMsg.includes("preço") || lowerMsg.includes("valor") || lowerMsg.includes("custo")) {
    return `Elaboramos orçamentos personalizados para o seu projeto! 🛠️\n\nPodemos calcular a estimativa para:\n• **Automação Industrial & CLPs**\n• **Sistemas ERP & Software Sob Medida**\n• **Nuvem & Infraestrutura de TI**\n• **Desenvolvimento de Chatbot IA**\n\nVocê pode usar nossa calculadora de orçamento na página ou falar diretamente com nossos engenheiros pelo **WhatsApp (15) 98100-9064**, telefone **(15) 3552-2325** ou e-mail **engenharia@dibitech.com.br**!`;
  } else if (lowerMsg.includes("contato") || lowerMsg.includes("whatsapp") || lowerMsg.includes("telefone") || lowerMsg.includes("email") || lowerMsg.includes("falar")) {
    return `Você pode falar conosco através dos canais diretos:\n\n📱 **WhatsApp:** (15) 98100-9064\n📞 **Telefone:** (15) 3552-2325\n✉️ **E-mail:** engenharia@dibitech.com.br\n📍 **Endereço:** Apiaí - SP, Brasil\n\nNossa equipe técnica atende de segunda a sexta, das 08h às 18h!`;
  } else if (lowerMsg.includes("clp") || lowerMsg.includes("plc") || lowerMsg.includes("scada") || lowerMsg.includes("ihm") || lowerMsg.includes("automação")) {
    return `A dibiTECH é especialista em **Automação Industrial & Indústria 5.0**! 🤖\n\nOferecemos:\n- Programação e integração de CLPs (Siemens, Rockwell, Schneider, Delta)\n- Desenvolvimento de sistemas SCADA e telas IHMs\n- Integração de sensores, atuadores e redes industriais (Modbus, Profinet, MQTT)\n- Células com robôs e cobots para otimização da produção\n\nQuer agendar uma avaliação técnica para sua fábrica?`;
  } else if (lowerMsg.includes("chatbot") || lowerMsg.includes("ia") || lowerMsg.includes("inteligência artificial") || lowerMsg.includes("atendimento")) {
    return `Criamos **Chatbots com Inteligência Artificial** sob medida para o seu negócio! 💬✨\n\nNossos chatbots funcionam 24/7 no seu site, WhatsApp ou sistemas internos, realizando atendimentos automáticos, qualificação de leads, suporte técnico de TI e respostas para clientes.\n\nGostaria de integrar um assistente IA na sua empresa?`;
  } else if (lowerMsg.includes("nuvem") || lowerMsg.includes("cloud") || lowerMsg.includes("servidor") || lowerMsg.includes("aws") || lowerMsg.includes("azure")) {
    return `Oferecemos **Infraestrutura de Nuvem & Servidores** de alta disponibilidade ☁️:\n\n- Migração e gestão em Azure, AWS e Google Cloud\n- Rotinas automatizadas de backup (regra 3-2-1) e recuperação de desastres\n- Monitoramento de segurança Zabbix e suporte técnico especializado\n\nComo está a estrutura atual de TI da sua empresa?`;
  } else if (lowerMsg.includes("equipe") || lowerMsg.includes("rodrigo") || lowerMsg.includes("rui") || lowerMsg.includes("engenheiro")) {
    return `A equipe técnica da dibiTECH conta com engenheiros multidisciplinares de vasta experiência:\n\n👨‍💻 **Rodrigo Carvalho:** Especialista em Engenharia de Computação, Inovação Tecnológica, IoT e BI.\n👨‍🔬 **Rui Tobias Carvalho:** Especialista em Engenharia de Computação, Automação Industrial, Ciência de Dados & Indústria 4.0/5.0.`;
  } else {
    return `Olá! Sou o **DibiBot AI**, assistente virtual e consultor técnico de TI da **dibiTECH TI & Automação**. 👋\n\nPosso tirar suas dúvidas sobre:\n• **Diagnósticos de TI, Redes & Segurança Cibernética**\n• **Automação Industrial** (CLP, SCADA, IHMs)\n• **Sistemas & ERPs sob medida**\n• **Infraestrutura de Nuvem & Servidores**\n• **Chatbots com IA & Ciência de Dados**\n\nComo posso ajudar você hoje? Se desejar, também pode nos chamar no **WhatsApp (15) 98100-9064**!`;
  }
};

export default function VirtualAssistantChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Olá! Sou o **DibiBot AI**, o assistente virtual e consultor de TI da **dibiTECH TI & Automação**. 👋\n\nPosso tirar dúvidas técnicas de TI (redes, segurança, servidores, sistemas) e ajudar você no seu projeto de engenharia ou automação. Como posso ajudar hoje?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customText) setInput("");
    setIsLoading(true);

    try {
      // Send chat history and current message to backend server
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: messages.map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });

      const data = await response.json();

      if (data.success && data.reply) {
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: data.reply,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error(data.error || "Failed to parse reply");
      }
    } catch (err) {
      console.warn("Server chat API unavailable or on static host, using client-side smart engine:", err);
      const fallbackReply = getClientFallbackResponse(textToSend);
      const fallbackMsg: Message = {
        id: `bot-fallback-${Date.now()}`,
        sender: "bot",
        text: fallbackReply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: "welcome-reset",
        sender: "bot",
        text: "Histórico reiniciado! Como posso ajudar você agora?",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/5515981009064?text=Olá,%20estou%20no%20site%20da%20dibiTECH%20e%20gostaria%20de%20atendimento.", "_blank");
  };

  // Helper to render bold text and line breaks from markdown-like responses
  const renderFormattedText = (content: string) => {
    return content.split("\n").map((line, lineIdx) => {
      // Parse bold **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={lineIdx} className={lineIdx > 0 ? "mt-1.5" : ""}>
          {parts.map((part, pIdx) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={pIdx} className="font-semibold text-yellow-300">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 bg-slate-900/90 hover:bg-slate-900 border-2 border-yellow-400 text-white rounded-full p-2 pr-5 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
          title="Atendimento Virtual dibiTECH"
        >
          <div className="relative">
            <img
              src={assistantAvatar}
              alt="DibiBot Virtual Assistant"
              className="w-12 h-12 rounded-full object-cover border border-yellow-400/80 shadow-md"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full animate-pulse" />
          </div>

          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-yellow-400 tracking-wide uppercase">DibiBot IA</span>
              <Sparkles className="w-3 h-3 text-yellow-400 animate-spin" style={{ animationDuration: "3s" }} />
            </div>
            <span className="text-xs font-semibold text-slate-200">Atendimento 24/7</span>
          </div>

          {hasUnread && (
            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-[11px] font-extrabold text-black shadow-lg">
              1
            </span>
          )}
        </button>
      )}

      {/* Expanded Chat Drawer / Widget */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[540px] bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-slate-900 border-b border-slate-800 px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={assistantAvatar}
                  alt="DibiBot Avatar"
                  className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400 shadow-md"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm text-white">DibiBot</h3>
                  <span className="text-[10px] bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 px-1.5 py-0.5 rounded font-mono font-medium">
                    dibiTECH
                  </span>
                </div>
                <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                  Online • Assistente Virtual
                </p>
              </div>
            </div>

            {/* Header Action Tools */}
            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={openWhatsApp}
                className="p-1.5 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition-colors"
                title="Atendimento via WhatsApp (15) 3552-2325"
              >
                <PhoneCall className="w-4 h-4" />
              </button>
              <button
                onClick={handleClearHistory}
                className="p-1.5 hover:text-yellow-400 hover:bg-slate-800 rounded-lg transition-colors"
                title="Limpar Conversa"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-slate-800">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 max-w-[85%] ${
                  msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-yellow-400" />
                  </div>
                )}

                <div>
                  <div
                    className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-yellow-500 text-slate-950 font-medium rounded-br-xs shadow-md"
                        : "bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-xs shadow-sm"
                    }`}
                  >
                    {renderFormattedText(msg.text)}
                  </div>
                  <span
                    className={`text-[10px] text-slate-500 mt-1 block ${
                      msg.sender === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 mr-auto max-w-[80%]">
                <div className="w-7 h-7 rounded-full bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-yellow-400 animate-pulse" />
                </div>
                <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl rounded-bl-xs text-slate-400 text-xs flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  <span>DibiBot digitando...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Chips */}
          <div className="px-3 py-2 bg-slate-900/60 border-t border-slate-800/80 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
            {QUICK_SUGGESTIONS.map((sugg, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(sugg)}
                disabled={isLoading}
                className="text-[11px] bg-slate-800/80 hover:bg-yellow-400/20 hover:text-yellow-300 border border-slate-700/60 hover:border-yellow-400/40 text-slate-300 px-2.5 py-1 rounded-full transition-all shrink-0 active:scale-95 disabled:opacity-50"
              >
                {sugg}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Digite sua dúvida ou mensagem..."
              disabled={isLoading}
              className="flex-1 bg-slate-950 border border-slate-800 focus:border-yellow-400 text-slate-100 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:outline-none transition-colors placeholder:text-slate-500"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="p-2.5 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-40 text-slate-950 font-bold rounded-xl transition-all shadow-md active:scale-95 shrink-0"
              title="Enviar mensagem"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
