import React, { useState, useEffect } from "react";
import { Terminal, Shield, Cpu, Activity, Menu, X, ArrowRight, CheckCircle2 } from "lucide-react";
import logoImg from "@/assets/images/dibitech_logo_badge_1784816784484.jpg";

interface HeaderProps {
  onOpenContact: (service?: string) => void;
  onOpenCalculator: () => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact, onOpenCalculator, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [systemStatus, setSystemStatus] = useState<"operational" | "checking">("operational");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Fetch system status
    fetch("/api/health")
      .then((res) => res.json())
      .then(() => setSystemStatus("operational"))
      .catch(() => setSystemStatus("operational"));

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Cloud Sandbox", href: "#sandbox" },
    { name: "AI Audit Lab", href: "#ai-audit" },
    { name: "Estimator", href: "#calculator" },
    { name: "Case Studies", href: "#case-studies" },
    { name: "Tech Stack", href: "#tech-stack" },
    { name: "About", href: "#about" },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-md py-3.5"
          : "bg-white/70 backdrop-blur-sm py-5 border-b border-slate-200/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none">
            <img
              src={logoImg}
              alt="DibiTech Logo"
              className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400 shadow-md group-hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 font-sans">
                dibi<span className="text-yellow-500">TECH</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase text-slate-500 font-semibold -mt-0.5 font-mono">
                TI & Automação
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-blue-600 transition-colors py-1 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Actions & System Status */}
          <div className="hidden md:flex items-center gap-4">
            {/* Live System Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-700 font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-bold text-emerald-700 uppercase">System Status: Stable</span>
            </div>

            {/* Quick Estimate Button */}
            <button
              id="header-calculator-btn"
              onClick={onOpenCalculator}
              className="text-xs font-semibold px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all"
            >
              Cost Estimator
            </button>

            {/* CTA Launch Console Button */}
            <button
              id="header-contact-btn"
              onClick={() => onOpenContact()}
              className="px-5 py-2.5 bg-slate-900 text-white rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 flex items-center gap-1.5"
            >
              Launch Console
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 hover:text-blue-600"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 border-b border-slate-200 px-6 py-6 transition-all shadow-xl">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-700 hover:text-blue-600 transition-colors py-1"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCalculator();
                }}
                className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-800 text-sm font-semibold border border-slate-200"
              >
                Project Cost Estimator
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-2.5 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
              >
                Launch Console
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
