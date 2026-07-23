import React, { useState } from "react";
import { TECH_STACK } from "../data/mockData";
import { TechStackItem } from "../types";
import { Cpu, CheckCircle2, Layers, Shield, Terminal, Code2 } from "lucide-react";

export const TechStackMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Frontend", "Backend", "Cloud & DevOps", "AI & Data", "Security"];

  const filtered =
    selectedCategory === "All"
      ? TECH_STACK
      : TECH_STACK.filter((item) => item.category === selectedCategory);

  return (
    <section id="tech-stack" className="py-24 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              Technology Stack
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Production-Proven Tech Matrix
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              We leverage modern language runtimes, cloud-native frameworks, and specialized AI vector engines engineered for zero technical debt.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-white hover:shadow-lg transition-all flex flex-col justify-between space-y-3 group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-wider bg-white px-2.5 py-0.5 rounded-full border border-slate-200 shadow-sm">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 font-medium">{item.level}</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {item.name}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">{item.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>dibiTECH Core Competency</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
