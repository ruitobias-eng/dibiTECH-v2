import React from "react";
import { ThemeProvider } from "./components/ThemeContext";
import { LanguageProvider } from "./components/LanguageContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import IndustryComparison from "./components/IndustryComparison";
import Team from "./components/Team";
import Projects from "./components/Projects";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import VirtualAssistantChat from "./components/VirtualAssistantChat";

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-background text-foreground selection:bg-yellow-400 selection:text-black font-sans transition-colors duration-500">
          {/* Header Navigation Bar */}
          <Navbar />

          {/* Main Content Sections */}
          <main>
            {/* 1. Hero Section */}
            <Hero />

            {/* 2. Specialized Services */}
            <Services />

            {/* 3. Industry 4.0 vs 5.0 Comparison */}
            <IndustryComparison />

            {/* 4. Technical Team */}
            <Team />

            {/* 5. Success Cases & Projects */}
            <Projects />

            {/* 6. Contact & Quote Request */}
            <ContactSection />
          </main>

          {/* Footer */}
          <Footer />

          {/* 7. Floating Virtual Assistant Chatbot */}
          <VirtualAssistantChat />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
