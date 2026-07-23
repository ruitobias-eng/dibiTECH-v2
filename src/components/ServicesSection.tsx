import React, { useState } from "react";
import { SERVICES_DATA } from "../data/mockData";
import { ServiceItem } from "../types";
import {
  Cloud,
  Cpu,
  Code2,
  ShieldCheck,
  Database,
  RefreshCw,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Layers,
} from "lucide-react";

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onRequestQuote: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService, onRequestQuote }) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Engineering Pillars" },
    { id: "cloud", label: "Cloud & DevOps" },
    { id: "ai", label: "AI & Machine Learning" },
    { id: "engineering", label: "Product Engineering" },
    { id: "security", label: "Cybersecurity" },
    { id: "data", label: "Data & Analytics" },
    { id: "modernization", label: "Modernization" },
  ];

  const filteredServices =
    activeCategory === "all"
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.category === activeCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Cloud":
        return <Cloud className="w-6 h-6 text-blue-600" />;
      case "Cpu":
        return <Cpu className="w-6 h-6 text-indigo-600" />;
      case "Code2":
        return <Code2 className="w-6 h-6 text-blue-600" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      case "Database":
        return <Database className="w-6 h-6 text-amber-600" />;
      case "RefreshCw":
        return <RefreshCw className="w-6 h-6 text-indigo-600" />;
      default:
        return <Layers className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-slate-50 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              Engineering Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Enterprise Software & Infrastructure Pillars
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              From resilient cloud topologies to custom AI model integrations, dibiTECH delivers end-to-end technical craftsmanship built for global scale.
            </p>
          </div>

          <button
            onClick={() => onRequestQuote("General Engineering")}
            className="mt-4 md:mt-0 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-md text-xs font-bold transition-all flex items-center gap-2 w-fit"
          >
            Custom Scope Request
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-200">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="flex flex-col justify-between p-7 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all duration-300 group shadow-md hover:shadow-xl relative overflow-hidden"
            >
              {/* Top Accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Icon & Category */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 group-hover:bg-blue-100 transition-colors">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-[11px] font-mono font-bold text-blue-600 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                    {service.category}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {service.shortDesc}
                </p>

                {/* Metrics Highlights */}
                <div className="grid grid-cols-2 gap-2 mb-6 p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono">
                  {service.metrics.slice(0, 2).map((m, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-[10px] text-slate-500 uppercase">{m.label}</span>
                      <span className="text-sm font-bold text-blue-600">{m.value}</span>
                    </div>
                  ))}
                </div>

                {/* Feature Bullet List */}
                <ul className="space-y-2 mb-6 text-xs text-slate-700">
                  {service.features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {service.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => onSelectService(service)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
                >
                  View Architecture
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onRequestQuote(service.title)}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition-all flex items-center gap-1"
                >
                  Get Quote
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
