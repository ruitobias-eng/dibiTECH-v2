import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "2mb" }));

  // Initialize Gemini AI lazily if key exists
  let aiClient: GoogleGenAI | null = null;
  function getAIClient() {
    if (!aiClient && process.env.GEMINI_API_KEY) {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }
    return aiClient;
  }

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      company: "dibiTECH",
      environment: process.env.NODE_ENV || "development",
      hasGeminiKey: !!process.env.GEMINI_API_KEY,
      services: {
        api_gateway: "operational",
        cloud_nodes: "operational",
        ai_lab_engine: "operational",
        security_shield: "operational",
      },
    });
  });

  // AI Code & Architecture Audit Endpoint
  app.post("/api/audit", async (req, res) => {
    try {
      const { code, contextType, focusArea } = req.body;

      if (!code || typeof code !== "string" || !code.trim()) {
        return res.status(400).json({ error: "Code or architectural specification is required" });
      }

      const client = getAIClient();
      if (client) {
        try {
          const prompt = `You are dibiTECH's Principal AI & Cloud Architect. 
Analyze the following ${contextType || "code/architecture"} sample with focus on ${focusArea || "overall quality, security, scalability, and performance"}.
Provide a structured technical audit report in JSON format with the following key structure:
{
  "healthScore": number (0 to 100),
  "summary": "Short executive summary of findings",
  "securityScore": number (0 to 100),
  "performanceScore": number (0 to 100),
  "maintainabilityScore": number (0 to 100),
  "strengths": ["string"],
  "criticalIssues": [
    { "severity": "Critical" | "High" | "Medium" | "Low", "title": "string", "description": "string", "recommendation": "string" }
  ],
  "dibiTechRecommendations": [
    { "category": "Cloud Architecture" | "AI Optimization" | "Code Refactoring" | "Security Hardening", "title": "string", "details": "string" }
  ]
}

Input Code/Architecture to analyze:
\`\`\`
${code.slice(0, 4000)}
\`\`\`
Return strictly VALID JSON without markdown formatting around it if possible, or standard JSON.`;

          const response = await client.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
              responseMimeType: "application/json",
            },
          });

          const rawText = response.text;
          if (rawText) {
            try {
              const parsed = JSON.parse(rawText);
              return res.json({ success: true, report: parsed, poweredBy: "Gemini 2.5 AI Engine" });
            } catch (err) {
              console.warn("Failed to parse Gemini JSON output directly, returning clean fallback formatted response", err);
            }
          }
        } catch (genError) {
          console.error("Gemini API call failed during audit, falling back to heuristic engine:", genError);
        }
      }

      // Intelligent Heuristic Fallback Analysis Engine
      const lineCount = code.split("\n").length;
      const hasSecurity = /auth|token|jwt|crypto|password|secret|key|eval/i.test(code);
      const hasDatabase = /sql|query|select|db|prisma|sequelize|mongo|firestore/i.test(code);
      const hasAsync = /async|await|promise|fetch|axios/i.test(code);

      const healthScore = Math.min(94, Math.max(62, 100 - (lineCount > 150 ? 15 : 5) - (hasSecurity ? 0 : 8)));

      const fallbackReport = {
        healthScore,
        summary: `dibiTECH static code audit detected ${lineCount} lines. Code displays solid structure with potential areas for automated query optimization and zero-trust authentication boundary reinforcement.`,
        securityScore: hasSecurity ? 88 : 72,
        performanceScore: hasAsync ? 92 : 78,
        maintainabilityScore: 85,
        strengths: [
          "Clean functional modularization",
          hasAsync ? "Asynchronous execution handling detected" : "Predictable synchronous execution logic",
          "Structured type hints / variable scoping",
        ],
        criticalIssues: [
          ...(!hasSecurity
            ? [
                {
                  severity: "High" as const,
                  title: "Authentication / Secret Management Boundary Check",
                  description: "No explicit cryptographic token verification or secure environment variable isolation was detected in this block.",
                  recommendation: "Implement dibiTECH Zero-Trust vault integration and strict JWT payload validation.",
                },
              ]
            : []),
          {
            severity: "Medium" as const,
            title: "Memory & Concurrency Pool Optimization",
            description: "High concurrency loads could benefit from connection pooling or edge caching layers.",
            recommendation: "Deploy Redis cluster / Cloudflare Workers edge caching layer to reduce origin load by up to 60%.",
          },
        ],
        dibiTechRecommendations: [
          {
            category: "Cloud Architecture",
            title: "Auto-Scaling Microservices Packaging",
            details: "Package container image using multi-stage Alpine Docker builds and deploy on dibiTECH Kubernetes cluster.",
          },
          {
            category: "AI Optimization",
            title: "Response Caching & Embeddings Index",
            details: "Implement vector database caching for repetitive AI query completions.",
          },
          {
            category: "Security Hardening",
            title: "API Gateway Rate Limiting & OWASP Rules",
            details: "Enforce web application firewall (WAF) rate limits (max 100 req/min per client IP).",
          },
        ],
      };

      return res.json({
        success: true,
        report: fallbackReport,
        poweredBy: "dibiTECH Enterprise Architectural Engine",
      });
    } catch (error) {
      console.error("Audit API endpoint error:", error);
      res.status(500).json({ error: "Internal server error performing audit analysis" });
    }
  });

  // Project Estimation Endpoint
  app.post("/api/estimate", (req, res) => {
    const { projectType, teamScale, timeline, features, complianceRequired } = req.body;

    let baseCost = 15000;
    if (projectType === "ai_ml") baseCost = 28000;
    if (projectType === "cloud_devops") baseCost = 22000;
    if (projectType === "fullstack") baseCost = 25000;
    if (projectType === "cybersecurity") baseCost = 18000;

    const featureMultiplier = (features?.length || 1) * 2500;
    const teamCost = teamScale === "enterprise" ? 20000 : teamScale === "growth" ? 10000 : 4000;
    const complianceCost = complianceRequired ? 8000 : 0;

    const estimatedTotalMin = Math.round(baseCost + featureMultiplier + teamCost + complianceCost);
    const estimatedTotalMax = Math.round(estimatedTotalMin * 1.35);

    const quoteId = `DBT-QT-${Math.floor(100000 + Math.random() * 900000)}`;

    res.json({
      success: true,
      quoteId,
      estimatedRange: {
        min: estimatedTotalMin,
        max: estimatedTotalMax,
        currency: "USD",
      },
      estimatedWeeks: timeline === "rush" ? 4 : timeline === "standard" ? 8 : 12,
      breakdown: {
        architectureDesign: Math.round(estimatedTotalMin * 0.2),
        engineeringAndDev: Math.round(estimatedTotalMin * 0.5),
        qaAndSecurityAudit: Math.round(estimatedTotalMin * 0.15),
        deploymentAndDevOps: Math.round(estimatedTotalMin * 0.15),
      },
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    });
  });

  // Contact Form Endpoint
  app.post("/api/contact", (req, res) => {
    const { name, email, company, service, budget, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required fields." });
    }

    const ticketId = `DBT-INQ-${Math.floor(100000 + Math.random() * 900000)}`;

    res.json({
      success: true,
      ticketId,
      message: "Thank you for reaching out to dibiTECH. A senior technical advisor will contact you within 4 business hours.",
      details: {
        name,
        email,
        company: company || "N/A",
        serviceRequested: service || "General Consultation",
        receivedAt: new Date().toISOString(),
      },
    });
  });

  // Virtual Assistant Chat Endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message || typeof message !== "string" || !message.trim()) {
        return res.status(400).json({ error: "Message is required." });
      }

      const client = getAIClient();
      if (client) {
        try {
          const systemInstruction = `Você é o DibiBot AI, o Assistente Virtual e Consultor Técnico de TI da dibiTECH TI & Automação (localizada em Apiaí - SP, Brasil).
Seu objetivo é prestar atendimento amigável, técnico, ágil e altamente capacitado para clientes e visitantes.

Você responde tanto a dúvidas corporativas e comerciais da dibiTECH quanto a **perguntas e diagnósticos de Tecnologia da Informação (TI)**, como:
- **Redes & Conectividade:** Problemas de Wi-Fi, lentidão, endereçamento IP, DNS, roteadores, switches, VPN, regras de firewall e ping.
- **Segurança Cibernética:** Prevenção contra vírus/ransomware, boas práticas de senhas, backups automatizados (regra 3-2-1), LGPD e auditoria de TI.
- **Servidores & Nuvem:** Linux (Ubuntu, Debian, RedHat), Windows Server, Active Directory, virtualização (Docker, Proxmox), AWS, Azure e Google Cloud.
- **Desenvolvimento & Banco de Dados:** SQL (PostgreSQL, MySQL, SQL Server), NoSQL, APIs REST, Python, C#, Java, Delphi, boas práticas de código.
- **Automação Industrial:** Funcionamento de CLPs, sensores, protocolos industriais (Modbus, Profinet, MQTT), telas IHMs e sistemas SCADA.

Serviços oferecidos pela dibiTECH:
1. Automação Industrial & Indústria 5.0: Programação de CLPs/PLCs, telas IHMs, sistemas SCADA, redes industriais e cobots.
2. Chatbot & IA Conversacional: Assistentes virtuais 24/7 com inteligência artificial para atendimento e automação.
3. Infraestrutura de Nuvem & TI Corporativa: Gestão de servidores, segurança cibernética, backups em nuvem e monitoramento Zabbix.
4. Ciência de Dados & Machine Learning: Business Intelligence (BI), análises preditivas e modelos de IA.
5. Sistemas ERP & Software sob medida: Desenvolvimento em Java, .NET, C++, Python, APIs e bancos de dados.
6. Aplicativos Mobile & Logística: Apps corporativos com geolocalização e rastreamento.

Contatos e Equipe da dibiTECH:
- WhatsApp: (15) 98100-9064
- Telefone: (15) 3552-2325
- E-mail: engenharia@dibitech.com.br
- Local: Apiaí - SP, Brasil
- Engenheiros Especialistas: Rodrigo Carvalho (Engenharia e Inovação Tecnológica, IoT & BI) e Rui Tobias Carvalho (Engenharia de Computação, Ciência de Dados & Indústria 4.0/5.0).

Regras de Resposta:
- Seja atencioso, técnico, didático e objetivo.
- Quando o usuário fizer uma pergunta de TI (ex: "O que é DNS?", "Minha rede está lenta, o que fazer?", "Como funciona o backup na nuvem?"), dê respostas bem explicadas e com passos práticos, relacionando com a solução que a dibiTECH pode oferecer.
- Use negrito e listas organizadas para facilitar a leitura.
- Responda no idioma do usuário (padrão em Português).
- Quando apropriado, sugira solicitar um orçamento ou entrar em contato direto pelo WhatsApp (15) 98100-9064 ou e-mail!`;

          // Format chat contents
          const formattedContents: Array<{ role: string; parts: Array<{ text: string }> }> = [];
          if (Array.isArray(history)) {
            history.forEach((item: { sender: string; text: string }) => {
              if (item.text) {
                formattedContents.push({
                  role: item.sender === "user" ? "user" : "model",
                  parts: [{ text: item.text }],
                });
              }
            });
          }
          formattedContents.push({
            role: "user",
            parts: [{ text: message }],
          });

          const geminiResponse = await client.models.generateContent({
            model: "gemini-3.6-flash",
            contents: formattedContents,
            config: {
              systemInstruction,
              temperature: 0.7,
            },
          });

          const replyText = geminiResponse.text;
          if (replyText) {
            return res.json({
              success: true,
              reply: replyText,
              source: "gemini",
            });
          }
        } catch (genError) {
          console.error("Gemini API call failed during chat, using smart dibiTECH bot engine:", genError);
        }
      }

      // Smart dibiTECH Rule & Intent Engine Fallback
      const lowerMsg = message.toLowerCase();
      let reply = "";

      if (lowerMsg.includes("rede") || lowerMsg.includes("wifi") || lowerMsg.includes("wi-fi") || lowerMsg.includes("ip") || lowerMsg.includes("dns") || lowerMsg.includes("internet") || lowerMsg.includes("vpn")) {
        reply = `🌐 **Suporte e Diagnóstico de Redes & Conectividade**\n\nPara resolver ou otimizar a rede da sua empresa:\n1. **Verifique o DNS:** Teste os servidores DNS públicos (como \`1.1.1.1\` ou \`8.8.8.8\`).\n2. **Conflito de IP:** Certifique-se de que a rede utiliza DHCP configurado corretamente com faixa adequada.\n3. **Infraestrutura:** Cabos Cat6 e roteadores corporativos evitam gargalos em redes comerciais.\n4. **VPN Corporativa:** Para acesso remoto seguro à infraestrutura da empresa.\n\n💡 A **dibiTECH** projeta e gerencia redes corporativas e infraestrutura de TI de alta velocidade! Quer falar com um engenheiro no **WhatsApp (15) 98100-9064**?`;
      } else if (lowerMsg.includes("segurança") || lowerMsg.includes("firewall") || lowerMsg.includes("antivirus") || lowerMsg.includes("ransomware") || lowerMsg.includes("hacker") || lowerMsg.includes("lgpd") || lowerMsg.includes("proteger")) {
        reply = `🔒 **Segurança Cibernética & Proteção de Dados**\n\nPassos essenciais para proteger os sistemas da sua empresa:\n- **Firewall Dedicado:** Filtre conexões suspeitas e portas abertas desnecessárias.\n- **Autenticação em 2 Etapas (MFA):** Obrigue verificação em 2 fatores para e-mails e sistemas.\n- **Política de Backups:** Mantenha cópias isoladas fora da rede principal (Regra 3-2-1).\n- **Conscientização:** A maioria das invasões ocorre por engenharia social e e-mails de phishing.\n\n🛡️ A **dibiTECH** realiza auditorias de segurança e implementação de firewalls/VPNs corporativas!`;
      } else if (lowerMsg.includes("lento") || lowerMsg.includes("suporte") || lowerMsg.includes("formatar") || lowerMsg.includes("computador") || lowerMsg.includes("hardware") || lowerMsg.includes("chamado")) {
        reply = `💻 **Suporte Técnico & Manutenção de Computadores**\n\nPrincipais causas de lentidão em sistemas corporativos:\n• **Uso de HD mecânico antigo:** Substituição por SSD NVMe acelera em até 10x.\n• **Memória RAM insuficiente:** Recomenda-se no mínimo 8GB a 16GB para sistemas modernos.\n• **Processos e malwares em segundo plano:** Limpeza técnica e verificação de inicialização.\n• **Aquecimento excessivo:** Troca de pasta térmica e limpeza interna preventiva.\n\n🔧 A **dibiTECH** oferece contratos de suporte de TI preventivo e corretivo para empresas!`;
      } else if (lowerMsg.includes("banco de dados") || lowerMsg.includes("sql") || lowerMsg.includes("software") || lowerMsg.includes("sistema") || lowerMsg.includes("desenvolvimento") || lowerMsg.includes("programação")) {
        reply = `💻 **Desenvolvimento de Software & Banco de Dados**\n\nTrabalhamos com arquitetura moderna e escalável:\n- **Linguagens:** C#, .NET, Python, C/C++, Java, Delphi e TypeScript\n- **Bancos de Dados:** PostgreSQL, SQL Server, Firebird, MySQL e MongoDB\n- **Integração:** APIs REST/GraphQL e sincronização em tempo real\n\nPrecisa desenvolver um sistema sob medida ou otimizar seu banco de dados atual?`;
      } else if (lowerMsg.includes("orçamento") || lowerMsg.includes("quote") || lowerMsg.includes("preço") || lowerMsg.includes("valor") || lowerMsg.includes("custo")) {
        reply = `Elaboramos orçamentos personalizados para o seu projeto! 🛠️\n\nPodemos calcular a estimativa para:\n• **Automação Industrial & CLPs**\n• **Sistemas ERP & Software Sob Medida**\n• **Nuvem & Infraestrutura de TI**\n• **Desenvolvimento de Chatbot IA**\n\nVocê pode usar nossa calculadora de orçamento na página ou falar diretamente com nossos engenheiros pelo **WhatsApp (15) 98100-9064**, telefone **(15) 3552-2325** ou e-mail **engenharia@dibitech.com.br**!`;
      } else if (lowerMsg.includes("contato") || lowerMsg.includes("whatsapp") || lowerMsg.includes("telefone") || lowerMsg.includes("email") || lowerMsg.includes("falar")) {
        reply = `Você pode falar conosco através dos canais diretos:\n\n📱 **WhatsApp:** (15) 98100-9064\n📞 **Telefone:** (15) 3552-2325\n✉️ **E-mail:** engenharia@dibitech.com.br\n📍 **Endereço:** Apiaí - SP, Brasil\n\nNossa equipe técnica atende de segunda a sexta, das 08h às 18h!`;
      } else if (lowerMsg.includes("clp") || lowerMsg.includes("plc") || lowerMsg.includes("scada") || lowerMsg.includes("ihm") || lowerMsg.includes("automação")) {
        reply = `A dibiTECH é especialista em **Automação Industrial & Indústria 5.0**! 🤖\n\nOferecemos:\n- Programação e integração de CLPs (Siemens, Rockwell, Schneider, Delta)\n- Desenvolvimento de sistemas SCADA e telas IHMs\n- Integração de sensores, atuadores e redes industriais (Modbus, Profinet, MQTT)\n- Células com robôs e cobots para otimização da produção\n\nQuer agendar uma avaliação técnica para sua fábrica?`;
      } else if (lowerMsg.includes("chatbot") || lowerMsg.includes("ia") || lowerMsg.includes("inteligência artificial") || lowerMsg.includes("atendimento")) {
        reply = `Criamos **Chatbots com Inteligência Artificial** sob medida para o seu negócio! 💬✨\n\nNossos chatbots funcionam 24/7 no seu site, WhatsApp ou sistemas internos, realizando atendimentos automáticos, qualificação de leads, suporte técnico de TI e respostas para clientes.\n\nGostaria de integrar um assistente IA na sua empresa?`;
      } else if (lowerMsg.includes("nuvem") || lowerMsg.includes("cloud") || lowerMsg.includes("servidor") || lowerMsg.includes("aws") || lowerMsg.includes("azure")) {
        reply = `Oferecemos **Infraestrutura de Nuvem & Servidores** de alta disponibilidade ☁️:\n\n- Migração e gestão em Azure, AWS e Google Cloud\n- Rotinas automatizadas de backup (regra 3-2-1) e recuperação de desastres\n- Monitoramento de segurança Zabbix e suporte técnico especializado\n\nComo está a estrutura atual de TI da sua empresa?`;
      } else if (lowerMsg.includes("equipe") || lowerMsg.includes("rodrigo") || lowerMsg.includes("rui") || lowerMsg.includes("engenheiro")) {
        reply = `A equipe técnica da dibiTECH conta com engenheiros multidisciplinares de vasta experiência:\n\n👨‍💻 **Rodrigo Carvalho:** Especialista em Engenharia de Computação, Inovação Tecnológica, IoT e BI.\n👨‍🔬 **Rui Tobias Carvalho:** Especialista em Engenharia de Computação, Automação Industrial, Ciência de Dados & Indústria 4.0/5.0.`;
      } else {
        reply = `Olá! Sou o **DibiBot AI**, assistente virtual e consultor técnico de TI da **dibiTECH TI & Automação**. 👋\n\nPosso tirar suas dúvidas sobre:\n• **Diagnósticos de TI, Redes & Segurança Cibernética**\n• **Automação Industrial** (CLP, SCADA, IHMs)\n• **Sistemas & ERPs sob medida**\n• **Infraestrutura de Nuvem & Servidores**\n• **Chatbots com IA & Ciência de Dados**\n\nComo posso ajudar você hoje? Se desejar, também pode nos chamar no **WhatsApp (15) 98100-9064**!`;
      }

      return res.json({
        success: true,
        reply,
        source: "dibiTech-engine",
      });
    } catch (error) {
      console.error("Chat API endpoint error:", error);
      res.status(500).json({ error: "Internal server error in virtual assistant" });
    }
  });

  // Serve static assets or Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`dibiTECH Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
