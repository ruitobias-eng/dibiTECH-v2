import React from "react";
import { ServiceItem } from "../types";
import { X, CheckCircle2, ArrowRight, ShieldCheck, Cpu, Cloud, Layers } from "lucide-react";

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onRequestQuote: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onRequestQuote,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl text-slate-200 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider bg-slate-950 px-3 py-1 rounded-md border border-slate-800">
            {service.category} Pillar
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{service.title}</h2>
          <p className="text-sm text-slate-300 leading-relaxed">{service.fullDesc}</p>
        </div>

        {/* Metrics Bar */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono">
          {service.metrics.map((m, idx) => (
            <div key={idx} className="flex flex-col text-center">
              <span className="text-[10px] text-slate-400 uppercase">{m.label}</span>
              <span className="text-lg font-bold text-cyan-400 mt-0.5">{m.value}</span>
            </div>
          ))}
        </div>

        {/* Architecture Highlights */}
        <div className="space-y-3">
          <h3 className="text-sm font-mono text-indigo-400 uppercase font-bold tracking-wider">
            Architecture & Design Highlights
          </h3>
          <div className="space-y-2">
            {service.architectureHighlights.map((high, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-slate-200">{high}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature List */}
        <div className="space-y-3">
          <h3 className="text-sm font-mono text-emerald-400 uppercase font-bold tracking-wider">
            Included Capabilities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {service.features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-slate-400 uppercase">Technologies Utilized:</span>
          <div className="flex flex-wrap gap-1.5">
            {service.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="text-xs font-mono px-2.5 py-1 rounded bg-slate-950 text-slate-300 border border-slate-800"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800"
          >
            Close Detail
          </button>

          <button
            onClick={() => {
              onClose();
              onRequestQuote(service.title);
            }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-indigo-600/20 flex items-center gap-2"
          >
            Request Engagement Quote
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
