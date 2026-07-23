import React, { useState } from "react";
import { CASE_STUDIES } from "../data/mockData";
import { CaseStudy } from "../types";
import { CheckCircle2, ArrowUpRight, Quote, Sparkles, Building2, TrendingUp } from "lucide-react";

interface CaseStudiesSectionProps {
  onOpenContact: (topic?: string) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onOpenContact }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [activeBeforeAfter, setActiveBeforeAfter] = useState<Record<string, boolean>>({});

  const industries = ["all", "Financial Technology", "Healthcare & Diagnostics", "Supply Chain & Fleet"];

  const filtered =
    selectedIndustry === "all"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((c) => c.clientIndustry === selectedIndustry);

  const toggleMetricView = (id: string) => {
    setActiveBeforeAfter((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="case-studies" className="py-24 bg-slate-50 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              Proven Results
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Enterprise Case Studies & Metrics
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              Explore how dibiTECH helped global enterprises resolve critical latency bottlenecks, deploy custom AI models, and achieve 99.999% availability.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-2 flex-wrap">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedIndustry === ind
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {ind === "all" ? "All Industries" : ind}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Cards */}
        <div className="space-y-12">
          {filtered.map((study) => {
            const showAfter = activeBeforeAfter[study.id] ?? true;

            return (
              <div
                key={study.id}
                className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all shadow-md hover:shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left Description */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-blue-600 font-bold uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                      {study.clientIndustry}
                    </span>
                    <span className="text-xs font-mono text-slate-500 font-medium flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      {study.clientName}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 hover:text-blue-600 transition-colors">
                    {study.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {study.summary}
                  </p>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                    <div>
                      <span className="font-bold text-slate-800">The Challenge: </span>
                      <span className="text-slate-600">{study.challenge}</span>
                    </div>
                    <div>
                      <span className="font-bold text-blue-600">dibiTECH Solution: </span>
                      <span className="text-slate-700">{study.solution}</span>
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  {study.testimonial && (
                    <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs space-y-2 relative">
                      <Quote className="w-6 h-6 text-indigo-300/60 absolute top-2 right-2" />
                      <p className="text-slate-800 italic font-serif">"{study.testimonial.quote}"</p>
                      <div className="text-[11px] font-bold text-indigo-900">
                        {study.testimonial.author} — <span className="text-slate-500 font-normal">{study.testimonial.role}</span>
                      </div>
                    </div>
                  )}

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {study.techUsed.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Key Metric Grid & Interactive Before/After Toggle */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  
                  {/* Results Metric Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {study.results.map((res, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-center flex flex-col justify-center shadow-sm"
                      >
                        <span className="text-2xl font-black text-blue-600">{res.metric}</span>
                        <span className="text-[11px] text-slate-600 mt-1 font-medium">{res.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Before vs After Comparison Card */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 font-mono text-xs shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-bold uppercase text-[10px]">Benchmark Comparison</span>
                      <button
                        onClick={() => toggleMetricView(study.id)}
                        className="text-blue-600 hover:underline text-[11px] flex items-center gap-1 font-bold"
                      >
                        <TrendingUp className="w-3 h-3" />
                        Toggle Before / After
                      </button>
                    </div>

                    <div className="p-3 rounded-lg bg-white border border-slate-200 flex justify-between items-center shadow-sm">
                      <span className="text-slate-500">Status:</span>
                      <span className={showAfter ? "text-emerald-600 font-bold" : "text-rose-600 font-bold"}>
                        {showAfter ? `AFTER: ${study.afterMetric}` : `BEFORE: ${study.beforeMetric}`}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenContact(`Case Study Request - ${study.clientName}`)}
                    className="w-full py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    Request Similar Architecture
                    <ArrowUpRight className="w-4 h-4 text-blue-400" />
                  </button>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
