import React, { useState } from "react";
import { TEAM_MEMBERS, FAQS } from "../data/mockData";
import { Globe, Users, Award, ShieldCheck, ChevronDown, ChevronUp, MapPin, Sparkles } from "lucide-react";

export const AboutSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const offices = [
    { city: "San Francisco", region: "Americas HQ", desc: "Cloud & AI Research Lab" },
    { city: "London", region: "EMEA Division", desc: "FinTech & Security Audit" },
    { city: "Singapore", region: "APAC Hub", desc: "High-Throughput Microservices" },
    { city: "Tokyo", region: "East Asia Office", desc: "Robotics & Edge Computing" },
  ];

  return (
    <section id="about" className="py-24 bg-slate-50 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            About dibiTECH
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            The Enterprise Engineering Standard
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            dibiTECH was founded by senior principal engineers from Google Cloud, Stanford AI Lab, and AWS to build resilient software infrastructure that scales effortlessly.
          </p>
        </div>

        {/* Global Office Hubs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {offices.map((off, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2 hover:border-blue-300 transition-colors shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-2 text-blue-600 font-mono text-xs font-bold">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>{off.region}</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900">{off.city}</h4>
              <p className="text-xs text-slate-600">{off.desc}</p>
            </div>
          ))}
        </div>

        {/* Leadership Team Grid */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-slate-900">Engineering Leadership</h3>
            <p className="text-sm text-slate-600 mt-1">
              Veteran architects leading dibiTECH's specialized engineering taskforces.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((m) => (
              <div
                key={m.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all flex flex-col justify-between space-y-4 shadow-sm hover:shadow-lg group"
              >
                <div>
                  <img
                    src={m.avatar}
                    alt={m.name}
                    className="w-20 h-20 rounded-2xl object-cover mb-4 border border-slate-200 group-hover:border-blue-500 transition-colors"
                  />
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {m.name}
                  </h4>
                  <span className="text-xs font-mono text-blue-600 font-bold block mt-0.5">{m.role}</span>
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">{m.bio}</p>
                </div>

                <div className="flex flex-wrap gap-1 pt-3 border-t border-slate-100">
                  {m.expertise.map((exp, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-4xl mx-auto pt-8 border-t border-slate-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h3>
            <p className="text-xs text-slate-500 mt-1 font-mono">Everything you need to know about engaging dibiTECH.</p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-white border border-slate-200 overflow-hidden transition-colors shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left text-sm font-bold text-slate-900 flex items-center justify-between gap-4"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-blue-600 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 font-sans">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
