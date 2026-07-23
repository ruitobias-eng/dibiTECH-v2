import React from "react";
import { ShieldCheck, Cpu, Cloud, Award, Zap, CheckCircle2 } from "lucide-react";

export const TrustStats: React.FC = () => {
  const stats = [
    { value: "99.99%", label: "Guaranteed Cloud Uptime SLA", icon: Cloud, color: "text-blue-600 bg-blue-50" },
    { value: "10M+", label: "Daily API Calls Managed", icon: Zap, color: "text-indigo-600 bg-indigo-50" },
    { value: "250+", label: "Enterprise Software Builds", icon: Cpu, color: "text-blue-600 bg-blue-50" },
    { value: "SOC2", label: "Type II & ISO27001 Certified", icon: ShieldCheck, color: "text-emerald-600 bg-emerald-50" },
  ];

  return (
    <section className="py-12 bg-white border-y border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-start p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-white hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2.5 rounded-xl border border-slate-200 ${stat.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900">
                    {stat.value}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-600">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Enterprise Client Logos & Certs */}
        <div className="mt-8 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-6 text-slate-500 text-xs font-semibold uppercase tracking-wider">
          <span className="text-slate-500 font-sans">Trusted By Engineering Leaders Worldwide:</span>
          <div className="flex flex-wrap items-center gap-8 font-mono text-slate-600">
            <span className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> PaySphere Global
            </span>
            <span className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> MedSight AI
            </span>
            <span className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> TransConti Logistics
            </span>
            <span className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Apex Financial
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
