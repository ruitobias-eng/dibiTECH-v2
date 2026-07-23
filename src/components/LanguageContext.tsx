import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageCode = 'pt' | 'en' | 'es';

export const translations = {
  pt: {
    nav: {
      home: 'Início',
      services: 'Serviços',
      team: 'Equipe',
      projects: 'Projetos',
      contact: 'Contato',
      quote: 'Solicitar Orçamento'
    },
    hero: {
      engineering: 'Engenharia 5.0',
      tagline: 'Soluções em Engenharia, Automação e Computação',
      description: 'Inovação e inteligência aplicadas à indústria, sistemas e TI.',
      ctaServices: 'Conheça Nossos Serviços',
      ctaProjects: 'Ver Projetos',
      industry: 'INDÚSTRIA 5.0',
      projects: 'Projetos',
      automation: 'Automação'
    },
    comparison: {
      badge: 'A EVOLUÇÃO',
      title: 'Indústria 4.0 vs',
      titleHighlight: '5.0',
      description: 'A Indústria 5.0 não substitui a 4.0, mas a complementa, utilizando tecnologias digitais para propósitos mais amplos e humanos.',
      headers: {
        feature: 'Característica',
        v4: 'Indústria 4.0',
        v5: 'Indústria 5.0 (DibiTech)'
      },
      items: [
        { f: "Foco Principal", v4: "Eficiência e Automação Total", v5: "Bem-estar Humano e Sustentabilidade" },
        { f: "Papel do Humano", v4: "Substituição por Máquinas", v5: "Colaboração com Cobots e Criatividade" },
        { f: "Tecnologia", v4: "Big Data e Sistemas Ciberfísicos", v5: "Sistemas Ciber-cognitivos e IA Ética" },
        { f: "Produção", v4: "Produção em Massa", v5: "Hiper-personalização e Experiência" },
        { f: "Objetivo", v4: "Produtividade", v5: "Resiliência e Propósitos Humanos" }
      ],
      footerNote: '"A Indústria 5.0 utiliza a tecnologia para potencializar a criatividade humana, não para substituí-la."'
    },
    services: {
      badge: 'SERVIÇOS ESPECIALIZADOS',
      title: 'Soluções Completas em',
      titleHighlight: 'Automação',
      description: 'Oferecemos uma gama abrangente de serviços especializados em engenharia de automação, projetados para atender às necessidades específicas do seu negócio.',
      items: [
        {
          title: 'Automação Industrial',
          description: 'Projetos com CLPs, IHMs e SCADA. Integração de sensores, atuadores e sistemas industriais inteligentes.',
          tags: ['CLPs', 'SCADA', 'Sensores']
        },
        {
          title: 'AI Chatbot',
          description: 'Soluções inteligentes de chatbot com IA para atendimento 24/7, escalável e multilíngue.',
          tags: ['IA', 'Chatbot', 'Automação']
        },
        {
          title: 'Infraestrutura Cloud',
          description: 'Administração de servidores, cloud computing (Azure, AWS, Google Cloud), backups e suporte técnico.',
          tags: ['Azure', 'AWS', 'Cloud']
        },
        {
          title: 'Ciência de Dados',
          description: 'Análise de dados, machine learning e inteligência artificial para otimização de processos.',
          tags: ['ML', 'IA', 'Analytics']
        },
        {
          title: 'Sistemas ERP',
          description: 'Desenvolvimento de sistemas personalizados: C, C++, Java, .NET, Python e integração de APIs.',
          tags: ['ERP', 'Java', '.NET']
        },
        {
          title: 'App Delivery',
          description: 'Desenvolvimento de aplicativos mobile para delivery e logística com rastreamento em tempo real.',
          tags: ['Mobile', 'Delivery', 'IoT']
        }
      ]
    },
    team: {
      badge: 'EQUIPE TÉCNICA',
      title: 'Profissionais com ampla',
      titleHighlight: 'experiência',
      description: 'Somos engenheiros apaixonados por tecnologia e inovação. Atuamos com desenvolvimento de sistemas, automação industrial, inteligência artificial e consultoria em TI. Com experiência em projetos públicos e privados, buscamos transformar processos através de soluções eficientes e inteligentes.',
      members: [
        {
          name: 'Rodrigo Carvalho',
          role: 'Engenharia | Inovação Tecnológica | BI',
          description: 'Especialista em soluções tecnológicas para engenharia de computação, IoT e sistemas embarcados, com sólida experiência em integração de sistemas, engenharia de computação e análise de dados aplicada ao setor financeiro. Combinando expertise técnica e visão estratégica, atua na interseção entre tecnologia e finanças, entregando projetos com eficiência e inovação.'
        },
        {
          name: 'Rui Tobias Carvalho',
          role: 'Engenharia de Computação | Ciência de Dados | Indústria 4.0',
          description: 'Expertise Multidisciplinar: Automação Industrial (CLPs, SCADA, Redes Industriais), Engenharia de Software (Java, .NET, Python, Delphi, Bancos de Dados), TI & Infraestrutura (Servidores, Cloud, Cibersegurança), Data Science (Análise de Dados, Machine Learning, IoT), Docência Técnica (Formação de profissionais em tecnologia).'
        }
      ]
    },
    projects: {
      badge: 'PROJETOS REALIZADOS',
      title: 'Casos de',
      titleHighlight: 'Sucesso',
      description: 'Conheça alguns dos nossos projetos mais recentes e veja como transformamos desafios em resultados tangíveis.',
      items: [
        {
          title: 'Automação de Linha de Produção',
          client: 'Indústria Alimentícia',
          description: 'Implementação de sistema completo de automação para linha de produção, resultando em 30% de aumento na capacidade produtiva.',
          result: '+30% produtividade'
        },
        {
          title: 'Sistema de Controle de Água',
          client: 'Estação de Tratamento',
          description: 'Modernização do sistema de controle com redução de 25% no consumo de energia e melhoria na qualidade da água tratada.',
          result: '-25% energia'
        },
        {
          title: 'Automação Predial Inteligente',
          client: 'Edifício Comercial',
          description: 'Sistema BMS integrado para controle de iluminação, climatização e segurança, com economia de 40% no consumo energético.',
          result: '-40% consumo'
        }
      ]
    },
    contact: {
      badge: 'ENTRE EM CONTATO',
      title: 'Vamos Conversar Sobre',
      titleHighlight: 'Seu Projeto',
      description: 'Entre em contato para projetos, consultorias ou parcerias em automação, TI e inovação.',
      info: {
        phone: 'Telefone',
        email: 'E-mail',
        location: 'Localização'
      },
      form: {
        title: 'Solicite um',
        titleHighlight: 'Orçamento',
        subtitle: 'Preencha o formulário e entraremos em contato em breve.',
        name: 'Nome',
        namePlaceholder: 'Seu nome',
        email: 'E-mail',
        emailPlaceholder: 'seu@email.com',
        subject: 'Assunto',
        subjectPlaceholder: 'Assunto da mensagem',
        message: 'Mensagem',
        messagePlaceholder: 'Descreva seu projeto ou necessidade...',
        submit: 'Enviar Mensagem',
        submitting: 'Enviando...',
        success: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
        error: 'Erro ao enviar mensagem. Por favor, tente novamente.'
      }
    },
    footer: {
      description: 'Especialista em Engenharia 5.0 e Indústria 5.0, transformando desafios complexos em soluções inteligentes e humanas.',
      services: 'Serviços',
      servicesList: [
        'Automação de Processos',
        'Desenvolvimento de Sistemas',
        'Infraestrutura de TI',
        'Ciência de Dados e ML',
        'Educação e Treinamento'
      ],
      company: 'Empresa',
      companyList: ['Equipe', 'Contato'],
      contactTitle: 'Contato',
      rights: '© 2026 DibiTech TI e Automação. Todos os direitos reservados.'
    }
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      team: 'Team',
      projects: 'Projects',
      contact: 'Contact',
      quote: 'Request Quote'
    },
    hero: {
      engineering: 'Engineering 5.0',
      tagline: 'Engineering, Automation and Computing Solutions',
      description: 'Innovation and intelligence applied to industry, systems and IT.',
      ctaServices: 'Discover Our Services',
      ctaProjects: 'View Projects',
      industry: 'INDUSTRY 5.0',
      projects: 'Projects',
      automation: 'Automation'
    },
    comparison: {
      badge: 'THE EVOLUTION',
      title: 'Industry 4.0 vs',
      titleHighlight: '5.0',
      description: 'Industry 5.0 does not replace 4.0, but complements it, using digital technologies for broader and human purposes.',
      headers: {
        feature: 'Feature',
        v4: 'Industry 4.0',
        v5: 'Industry 5.0 (DibiTech)'
      },
      items: [
        { f: "Main Focus", v4: "Efficiency and Total Automation", v5: "Human Well-being and Sustainability" },
        { f: "Human Role", v4: "Replacement by Machines", v5: "Collaboration with Cobots and Creativity" },
        { f: "Technology", v4: "Big Data and Cyber-physical Systems", v5: "Cyber-cognitive Systems and Ethical IA" },
        { f: "Production", v4: "Mass Production", v5: "Hyper-personalization and Experience" },
        { f: "Goal", v4: "Productivity", v5: "Resilience and Human Purpose" }
      ],
      footerNote: '"Industry 5.0 uses technology to enhance human creativity, not to replace it."'
    },
    services: {
      badge: 'SPECIALIZED SERVICES',
      title: 'Complete Solutions in',
      titleHighlight: 'Automation',
      description: 'We offer a comprehensive range of specialized automation engineering services, designed to meet your business specific needs.',
      items: [
        {
          title: 'Industrial Automation',
          description: 'Projects with PLCs, HMIs and SCADA. Integration of sensors, actuators and intelligent industrial systems.',
          tags: ['PLCs', 'SCADA', 'Sensors']
        },
        {
          title: 'AI Chatbot',
          description: 'Intelligent AI chatbot solutions for 24/7 support, scalable and multilingual.',
          tags: ['AI', 'Chatbot', 'Automation']
        },
        {
          title: 'Cloud Infrastructure',
          description: 'Server administration, cloud computing (Azure, AWS, Google Cloud), backups and technical support.',
          tags: ['Azure', 'AWS', 'Cloud']
        },
        {
          title: 'Data Science',
          description: 'Data analysis, machine learning and artificial intelligence for process optimization.',
          tags: ['ML', 'AI', 'Analytics']
        },
        {
          title: 'ERP Systems',
          description: 'Custom systems development: C, C++, Java, .NET, Python and API integration.',
          tags: ['ERP', 'Java', '.NET']
        },
        {
          title: 'Delivery App',
          description: 'Mobile app development for delivery and logistics with real-time tracking.',
          tags: ['Mobile', 'Delivery', 'IoT']
        }
      ]
    },
    team: {
      badge: 'TECHNICAL TEAM',
      title: 'Professionals with extensive',
      titleHighlight: 'experience',
      description: 'We are engineers passionate about technology and innovation. We work with systems development, industrial automation, artificial intelligence and IT consulting. With experience in public and private projects, we seek to transform processes through efficient and intelligent solutions.',
      members: [
        {
          name: 'Rodrigo Carvalho',
          role: 'Engineering | Technology Innovation | BI',
          description: 'Specialist in technological solutions for computer engineering, IoT and embedded systems, with solid experience in systems integration, computer engineering and data analysis applied to the financial sector. Combining technical expertise and strategic vision, he works at the intersection between technology and finance, delivering projects with efficiency and innovation.'
        },
        {
          name: 'Rui Tobias Carvalho',
          role: 'Computer Engineering | Data Science | Industry 4.0',
          description: 'Multidisciplinary Expertise: Industrial Automation (PLCs, SCADA, Industrial Networks), Software Engineering (Java, .NET, Python, Delphi, Databases), IT & Infrastructure (Servers, Cloud, Cybersecurity), Data Science (Data Analysis, Machine Learning, IoT), Technical Teaching (Training technology professionals).'
        }
      ]
    },
    projects: {
      badge: 'COMPLETED PROJECTS',
      title: 'Success',
      titleHighlight: 'Stories',
      description: 'Discover some of our most recent projects and see how we transform challenges into tangible results.',
      items: [
        {
          title: 'Production Line Automation',
          client: 'Food Industry',
          description: 'Implementation of complete automation system for production line, resulting in 30% increase in production capacity.',
          result: '+30% productivity'
        },
        {
          title: 'Water Control System',
          client: 'Treatment Plant',
          description: 'Control system modernization with 25% reduction in energy consumption and improvement in treated water quality.',
          result: '-25% energy'
        },
        {
          title: 'Smart Building Automation',
          client: 'Commercial Building',
          description: 'Integrated BMS system for lighting, climate and security control, with 40% savings in energy consumption.',
          result: '-40% consumption'
        }
      ]
    },
    contact: {
      badge: 'GET IN TOUCH',
      title: "Let's Talk About",
      titleHighlight: 'Your Project',
      description: 'Get in touch for projects, consulting or partnerships in automation, IT and innovation.',
      info: {
        phone: 'Phone',
        email: 'Email',
        location: 'Location'
      },
      form: {
        title: 'Request a',
        titleHighlight: 'Quote',
        subtitle: 'Fill out the form and we will contact you soon.',
        name: 'Name',
        namePlaceholder: 'Your name',
        email: 'Email',
        emailPlaceholder: 'your@email.com',
        subject: 'Subject',
        subjectPlaceholder: 'Message subject',
        message: 'Message',
        messagePlaceholder: 'Describe your project or need...',
        submit: 'Send Message',
        submitting: 'Sending...',
        success: 'Message sent successfully! We will contact you soon.',
        error: 'Error sending message. Please try again.'
      }
    },
    footer: {
      description: 'Specialist in Engineering 5.0 and Industry 5.0, transforming complex challenges into intelligent and human-centric solutions.',
      services: 'Services',
      servicesList: [
        'Process Automation',
        'Systems Development',
        'IT Infrastructure',
        'Data Science and ML',
        'Education and Training'
      ],
      company: 'Company',
      companyList: ['Team', 'Contact'],
      contactTitle: 'Contact',
      rights: '© 2026 DibiTech TI e Automação. All rights reserved.'
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      services: 'Servicios',
      team: 'Equipo',
      projects: 'Proyectos',
      contact: 'Contacto',
      quote: 'Solicitar Presupuesto'
    },
    hero: {
      engineering: 'Ingeniería 5.0',
      tagline: 'Soluciones en Ingeniería, Automatización y Computación',
      description: 'Innovación e inteligencia aplicadas a la industria, sistemas y TI.',
      ctaServices: 'Conozca Nuestros Servicios',
      ctaProjects: 'Ver Proyectos',
      industry: 'INDUSTRIA 5.0',
      projects: 'Proyectos',
      automation: 'Automatización'
    },
    comparison: {
      badge: 'LA EVOLUCIÓN',
      title: 'Industria 4.0 vs',
      titleHighlight: '5.0',
      description: 'La Industria 5.0 no reemplaza a la 4.0, sino que la complementa, utilizando tecnologías digitales para propósitos más amplios y humanos.',
      headers: {
        feature: 'Característica',
        v4: 'Industria 4.0',
        v5: 'Industria 5.0 (DibiTech)'
      },
      items: [
        { f: "Enfoque Principal", v4: "Eficiencia y Automatización Total", v5: "Bienestar Humano y Sostenibilidad" },
        { f: "Papel del Humano", v4: "Sustitución por Máquinas", v5: "Colaboración con Cobots y Creatividad" },
        { f: "Tecnología", v4: "Big Data y Sistemas Ciberfísicos", v5: "Sistemas Ciber-cognitivos e IA Ética" },
        { f: "Producción", v4: "Producción en Masa", v5: "Hiper-personalización y Experiencia" },
        { f: "Objetivo", v4: "Productividad", v5: "Resiliencia y Propósitos Humanos" }
      ],
      footerNote: '"La Industria 5.0 utiliza la tecnología para potenciar la creatividad humana, no para reemplazarla."'
    },
    services: {
      badge: 'SERVIÇOS ESPECIALIZADOS',
      title: 'Soluciones Completas en',
      titleHighlight: 'Automatización',
      description: 'Ofrecemos una amplia gama de servicios especializados en ingeniería de automatización, diseñados para satisfacer las necesidades específicas de su negocio.',
      items: [
        {
          title: 'Automatización Industrial',
          description: 'Proyectos con PLCs, HMIs y SCADA. Integración de sensores, actuadores y sistemas industriales inteligentes.',
          tags: ['PLCs', 'SCADA', 'Sensores']
        },
        {
          title: 'AI Chatbot',
          description: 'Soluciones inteligentes de chatbot con IA para atención 24/7, escalable y multilingüe.',
          tags: ['IA', 'Chatbot', 'Automatización']
        },
        {
          title: 'Infraestructura Cloud',
          description: 'Administración de servidores, cloud computing (Azure, AWS, Google Cloud), backups y soporte técnico.',
          tags: ['Azure', 'AWS', 'Cloud']
        },
        {
          title: 'Ciencia de Datos',
          description: 'Análisis de datos, machine learning e inteligencia artificial para optimización de procesos.',
          tags: ['ML', 'IA', 'Analytics']
        },
        {
          title: 'Sistemas ERP',
          description: 'Desarrollo de sistemas personalizados: C, C++, Java, .NET, Python e integración de APIs.',
          tags: ['ERP', 'Java', '.NET']
        },
        {
          title: 'App Delivery',
          description: 'Desarrollo de aplicaciones móviles para delivery y logística con seguimiento en tiempo real.',
          tags: ['Mobile', 'Delivery', 'IoT']
        }
      ]
    },
    team: {
      badge: 'EQUIPO TÉCNICO',
      title: 'Profesionales con amplia',
      titleHighlight: 'experiencia',
      description: 'Somos ingenieros apasionados por la tecnología e innovación. Trabajamos con desarrollo de sistemas, automatización industrial, inteligencia artificial y consultoría en TI. Con experiencia en proyectos públicos y privados, buscamos transformar procesos a través de soluciones eficientes e inteligentes.',
      members: [
        {
          name: 'Rodrigo Carvalho',
          role: 'Ingeniería | Innovación Tecnológica | BI',
          description: 'Especialista en soluciones tecnológicas para ingeniería informática, IoT y sistemas embebidos, con sólida experiencia en integración de sistemas, ingeniería informática y análisis de datos aplicado al sector financiero. Combinando experiencia técnica y visión estratégica, actúa en la intersección entre tecnología y finanzas, entregando proyectos con eficiencia e innovación.'
        },
        {
          name: 'Rui Tobias Carvalho',
          role: 'Ingeniería Informática | Ciencia de Datos | Industria 4.0',
          description: 'Experiencia Multidisciplinaria: Automatización Industrial (PLCs, SCADA, Redes Industriales), Ingeniería de Software (Java, .NET, Python, Delphi, Bases de Datos), TI e Infraestructura (Servidores, Cloud, Ciberseguridad), Data Science (Análisis de Datos, Machine Learning, IoT), Docencia Técnica (Formación de profesionales en tecnología).'
        }
      ]
    },
    projects: {
      badge: 'PROYECTOS REALIZADOS',
      title: 'Casos de',
      titleHighlight: 'Éxito',
      description: 'Conozca algunos de nuestros proyectos más recientes y vea cómo transformamos desafíos en resultados tangíveis.',
      items: [
        {
          title: 'Automatización de Línea de Producción',
          client: 'Industria Alimenticia',
          description: 'Implementación de sistema completo de automatización para línea de producción, resultando em 30% de aumento na capacidade produtiva.',
          result: '+30% produtividade'
        },
        {
          title: 'Sistema de Control de Agua',
          client: 'Estación de Tratamiento',
          description: 'Modernização do sistema de controle com redução do 25% no consumo de energia e melhoria na qualidade da água tratada.',
          result: '-25% energia'
        },
        {
          title: 'Automatización Predial Inteligente',
          client: 'Edifício Comercial',
          description: 'Sistema BMS integrado para controle de iluminação, climatização e segurança, com economia de 40% no consumo energético.',
          result: '-40% consumo'
        }
      ]
    },
    contact: {
      badge: 'PÓNGASE EN CONTACTO',
      title: 'Hablemos Sobre',
      titleHighlight: 'Su Proyecto',
      description: 'Póngase en contacto para proyectos, consultoría o asociaciones en automatización, TI e innovación.',
      info: {
        phone: 'Teléfono',
        email: 'Correo',
        location: 'Ubicación'
      },
      form: {
        title: 'Solicite un',
        titleHighlight: 'Presupuesto',
        subtitle: 'Complete el formulario y nos pondremos en contacto pronto.',
        name: 'Nombre',
        namePlaceholder: 'Su nombre',
        email: 'Correo',
        emailPlaceholder: 'su@correo.com',
        subject: 'Asunto',
        subjectPlaceholder: 'Asunto del mensaje',
        message: 'Mensaje',
        messagePlaceholder: 'Describa su proyecto o necesidad...',
        submit: 'Enviar Mensaje',
        submitting: 'Enviando...',
        success: '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.',
        error: 'Error al enviar mensaje. Por favor, intente nuevamente.'
      }
    },
    footer: {
      description: 'Especialista en Ingeniería 5.0 e Industria 5.0, transformando desafíos complejos en soluciones inteligentes y humanas.',
      services: 'Servicios',
      servicesList: [
        'Automatización de Procesos',
        'Desarrollo de Sistemas',
        'Infraestructura de TI',
        'Ciência de Dados e ML',
        'Educação e Treinamento'
      ],
      company: 'Empresa',
      companyList: ['Equipo', 'Contacto'],
      contactTitle: 'Contacto',
      rights: '© 2026 DibiTech TI e Automação. Todos los derechos reservados.'
    }
  }
};

type Translations = typeof translations.pt;

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageCode>(() => {
    return (localStorage.getItem("dibitech-language") as LanguageCode) || "pt";
  });

  useEffect(() => {
    localStorage.setItem("dibitech-language", language);
  }, [language]);

  const t = translations[language] || translations.pt;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
