import React, { useState } from "react";
import { CalculatorInputs } from "../types";
import {
  Calculator,
  CheckCircle2,
  Clock,
  DollarSign,
  ShieldCheck,
  Zap,
  ArrowRight,
  FileText,
  Sparkles,
  Loader2,
} from "lucide-react";

interface ProjectCalculatorProps {
  onQuoteGenerated: (quoteData: any) => void;
  onOpenContactWithQuote: (quoteId: string, estimatedPrice: string) => void;
}

export const ProjectCalculator: React.FC<ProjectCalculatorProps> = ({
  onQuoteGenerated,
  onOpenContactWithQuote,
}) => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    projectType: "fullstack",
    teamScale: "growth",
    timeline: "standard",
    features: ["RAG Vector Search", "CI/CD Pipeline", "Zero-Trust Auth"],
    complianceRequired: true,
    slaSupport: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [estimateResult, setEstimateResult] = useState<any>(null);

  const availableFeatures = [
    "RAG Vector Search & LLM Engine",
    "CI/CD Kubernetes Pipeline",
    "Zero-Trust Auth & IAM Governance",
    "Real-time Analytics Dashboard",
    "Multi-Region Database Failover",
    "Mobile Native Cross-Platform App",
    "Microservice API Gateway & Rate Limiter",
  ];

  const toggleFeature = (feat: string) => {
    setInputs((prev) => ({
      ...prev,
      features: prev.features.includes(feat)
        ? prev.features.filter((f) => f !== feat)
        : [...prev.features, feat],
    }));
  };

  const handleCalculate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });

      const data = await response.json();
      if (data.success) {
        setEstimateResult(data);
        onQuoteGenerated(data);
      }
    } catch (error) {
      console.error("Failed to generate estimate:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="calculator" className="py-24 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
            Instant Project Scope & Budget Estimator
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Transparent Engineering Estimate Calculator
          </h2>
          <p className="mt-2 text-base text-slate-600 max-w-2xl">
            Customize project parameters, select engineering scope, and generate a transparent cost range and timeline for your team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
            
            {/* Project Type */}
            <div>
              <label className="text-xs font-mono text-blue-600 uppercase tracking-wider block mb-3 font-bold">
                1. Select Core Engineering Focus
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: "fullstack", label: "Full-Stack Product" },
                  { id: "ai_ml", label: "Custom AI & RAG" },
                  { id: "cloud_devops", label: "Cloud & DevOps" },
                  { id: "cybersecurity", label: "Cybersecurity & Audit" },
                  { id: "mobile", label: "Mobile Application" },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setInputs({ ...inputs, projectType: type.id as any })}
                    className={`p-3 rounded-xl text-xs font-semibold text-left transition-all border ${
                      inputs.projectType === type.id
                        ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200 font-bold"
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Team Scale */}
            <div>
              <label className="text-xs font-mono text-indigo-600 uppercase tracking-wider block mb-3 font-bold">
                2. Select Dedicated Team Composition
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "starter", title: "Starter Squad", desc: "3 Engineers + PM" },
                  { id: "growth", title: "Growth Engine", desc: "6 Eng + Architect + QA" },
                  { id: "enterprise", title: "Enterprise Division", desc: "12 Eng + FinOps + Lead" },
                ].map((scale) => (
                  <button
                    key={scale.id}
                    onClick={() => setInputs({ ...inputs, teamScale: scale.id as any })}
                    className={`p-3 rounded-xl text-left transition-all border ${
                      inputs.teamScale === scale.id
                        ? "bg-blue-50 text-blue-900 border-blue-300 font-bold ring-2 ring-blue-500/20"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">{scale.title}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{scale.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Target Delivery Timeline */}
            <div>
              <label className="text-xs font-mono text-blue-600 uppercase tracking-wider block mb-3 font-bold">
                3. Target Timeline Sprint
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "rush", label: "Rush Sprint (4 Wks)" },
                  { id: "standard", label: "Standard (8 Wks)" },
                  { id: "extended", label: "Extended (12 Wks)" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setInputs({ ...inputs, timeline: t.id as any })}
                    className={`p-2.5 rounded-xl text-xs font-mono text-center transition-all border ${
                      inputs.timeline === t.id
                        ? "bg-blue-600 text-white border-blue-600 font-bold shadow-sm"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Features Checklist */}
            <div>
              <label className="text-xs font-mono text-emerald-600 uppercase tracking-wider block mb-3 font-bold">
                4. Architecture Features & Modules
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {availableFeatures.map((feat, idx) => {
                  const isChecked = inputs.features.includes(feat);
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleFeature(feat)}
                      className={`p-2.5 rounded-lg text-xs font-medium text-left flex items-center justify-between border transition-all ${
                        isChecked
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold"
                          : "bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      <span className="line-clamp-1">{feat}</span>
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 ${isChecked ? "text-emerald-600" : "text-slate-300"}`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Compliance & SLA Toggles */}
            <div className="pt-2 grid grid-cols-2 gap-4">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer shadow-sm">
                <input
                  type="checkbox"
                  checked={inputs.complianceRequired}
                  onChange={(e) => setInputs({ ...inputs, complianceRequired: e.target.checked })}
                  className="rounded bg-slate-100 border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs font-semibold text-slate-700">SOC2 / HIPAA Compliance</span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer shadow-sm">
                <input
                  type="checkbox"
                  checked={inputs.slaSupport}
                  onChange={(e) => setInputs({ ...inputs, slaSupport: e.target.checked })}
                  className="rounded bg-slate-100 border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs font-semibold text-slate-700">24/7 SLA Active Monitoring</span>
              </label>
            </div>

            {/* Action Trigger */}
            <button
              id="generate-quote-btn"
              onClick={handleCalculate}
              disabled={isLoading}
              className="w-full py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-200 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  Generating Formal Quote...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-white" />
                  Calculate Proposal & Estimate
                </>
              )}
            </button>

          </div>

          {/* Estimate Result Card Column */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xl">
            {estimateResult ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-blue-600 uppercase tracking-wider font-bold">
                      Reference ID
                    </span>
                    <h4 className="text-sm font-bold font-mono text-slate-900">{estimateResult.quoteId}</h4>
                  </div>
                  <span className="text-[11px] font-mono bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200 font-bold">
                    Valid 30 Days
                  </span>
                </div>

                {/* Big Estimated Price */}
                <div>
                  <span className="text-xs text-slate-500 font-mono font-medium">Estimated Investment Range</span>
                  <div className="text-3xl sm:text-4xl font-black font-mono text-slate-900 mt-1">
                    ${estimateResult.estimatedRange.min.toLocaleString()} - ${estimateResult.estimatedRange.max.toLocaleString()}
                  </div>
                  <span className="text-xs text-slate-500 mt-1 block">
                    Estimated Delivery: ~{estimateResult.estimatedWeeks} Weeks
                  </span>
                </div>

                {/* Breakdown List */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-xs font-mono text-slate-500 font-bold uppercase">Cost Allocation Breakdown</span>
                  <div className="space-y-1.5 text-xs font-mono text-slate-700">
                    <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <span>Architecture & Specs (20%)</span>
                      <span className="text-blue-600 font-bold">${estimateResult.breakdown.architectureDesign.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <span>Engineering & Dev (50%)</span>
                      <span className="text-indigo-600 font-bold">${estimateResult.breakdown.engineeringAndDev.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <span>QA & Security Audit (15%)</span>
                      <span className="text-blue-600 font-bold">${estimateResult.breakdown.qaAndSecurityAudit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <span>CI/CD & Deployment (15%)</span>
                      <span className="text-emerald-600 font-bold">${estimateResult.breakdown.deploymentAndDevOps.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Book Proposal Button */}
                <button
                  id="book-proposal-btn"
                  onClick={() =>
                    onOpenContactWithQuote(
                      estimateResult.quoteId,
                      `$${estimateResult.estimatedRange.min.toLocaleString()} - $${estimateResult.estimatedRange.max.toLocaleString()}`
                    )
                  }
                  className="w-full py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Submit Proposal Inquiry with This Quote
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-4">
                <div className="p-4 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
                  <Calculator className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Select Scope & Calculate</h3>
                  <p className="text-xs text-slate-600 max-w-xs mt-1">
                    Choose your project focus and team composition on the left to generate your custom dibiTECH estimate.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
