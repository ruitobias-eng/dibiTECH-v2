import React, { useState, useEffect } from "react";
import { ArrowRight, Terminal, Cpu, Cloud, ShieldCheck, Play, Sparkles, Code, Check } from "lucide-react";

interface HeroSectionProps {
  onOpenContact: () => void;
  onOpenCalculator: () => void;
  onScrollToAudit: () => void;
  onScrollToSandbox: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenContact,
  onOpenCalculator,
  onScrollToAudit,
  onScrollToSandbox,
}) => {
  const [terminalTab, setTerminalTab] = useState<"logs" | "architecture" | "ai">("architecture");
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [simulatedPulse, setSimulatedPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedPulse((prev) => (prev + 1) % 100);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const copyCommand = () => {
    navigator.clipboard.writeText("npx dibitech-cli audit --target cloud");
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-slate-50 text-slate-900">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-blue-100 to-indigo-50 blur-3xl opacity-60 pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-xs font-bold uppercase tracking-wider w-fit shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-ping" />
              <span>v4.2 Update Live</span>
              <span className="text-blue-300">|</span>
              <span className="text-blue-700 flex items-center gap-1 font-mono">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Gemini 2.5 Architecture
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] font-sans">
              Next-Gen <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">
                Digital Assets & AI
              </span> <br />
              Infrastructure.
            </h1>

            {/* Subheading */}
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              Build, scale, and secure high-frequency digital workflows, autonomous AI systems, and multi-cloud environments with dibiTECH's institutional-grade middleware.
            </p>

            {/* Key Capability Bullets */}
            <div className="grid grid-cols-2 gap-3 pt-1 text-sm text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <span>99.999% Multi-Cloud Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <span>Autonomous AI & RAG Agents</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <span>Sub-12ms Microservice Latency</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <span>SOC2 & Zero-Trust Governance</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                id="hero-start-project-btn"
                onClick={onOpenContact}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl text-base font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                id="hero-calculator-btn"
                onClick={onOpenCalculator}
                className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl text-base font-bold hover:bg-slate-100 transition-colors shadow-sm"
              >
                View Cost Scope
              </button>
            </div>

            {/* CLI Quick Copy Snippet */}
            <div className="pt-2 flex items-center gap-3 text-xs font-mono text-slate-500">
              <span className="text-slate-500 font-sans font-medium">Quick diagnostic CLI:</span>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 shadow-sm">
                <Terminal className="w-3.5 h-3.5 text-blue-600" />
                <span>npx dibitech-cli audit --target cloud</span>
                <button
                  onClick={copyCommand}
                  className="ml-2 text-blue-600 hover:text-blue-800 underline font-semibold text-[11px]"
                >
                  {copiedCmd ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Technical Widget Card (Matching Sleek Theme) */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-3xl blur-2xl opacity-60"></div>
              
              <div className="relative bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-6">
                
                {/* Status Bar */}
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-mono text-slate-400">// SYSTEM_STATUS_HEALTH</span>
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs font-bold text-emerald-600 font-mono">STABLE</span>
                  </div>
                </div>

                {/* Tab Switcher inside Technical Widget */}
                <div className="flex items-center justify-between bg-slate-50 p-1 rounded-xl border border-slate-200 text-xs font-mono">
                  <button
                    onClick={() => setTerminalTab("architecture")}
                    className={`flex-1 py-1.5 rounded-lg font-bold transition-colors ${
                      terminalTab === "architecture" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    Metrics
                  </button>
                  <button
                    onClick={() => setTerminalTab("logs")}
                    className={`flex-1 py-1.5 rounded-lg font-bold transition-colors ${
                      terminalTab === "logs" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    Streams
                  </button>
                  <button
                    onClick={() => setTerminalTab("ai")}
                    className={`flex-1 py-1.5 rounded-lg font-bold transition-colors ${
                      terminalTab === "ai" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    AI Lab
                  </button>
                </div>

                {/* Content Panel */}
                <div className="space-y-4">
                  {terminalTab === "architecture" && (
                    <div className="space-y-4">
                      {/* Bar Visualization */}
                      <div className="flex items-end gap-1.5 h-28 pt-2">
                        <div className="flex-1 bg-slate-100 h-1/2 rounded-t-md transition-all duration-500"></div>
                        <div className="flex-1 bg-slate-100 h-2/3 rounded-t-md transition-all duration-500"></div>
                        <div className="flex-1 bg-blue-100 h-3/4 rounded-t-md transition-all duration-500"></div>
                        <div className="flex-1 bg-blue-500 h-full rounded-t-md transition-all duration-500"></div>
                        <div className="flex-1 bg-blue-400 h-5/6 rounded-t-md transition-all duration-500"></div>
                        <div className="flex-1 bg-blue-600 h-[92%] rounded-t-md transition-all duration-500"></div>
                        <div className="flex-1 bg-blue-200 h-2/3 rounded-t-md transition-all duration-500"></div>
                        <div className="flex-1 bg-slate-100 h-1/2 rounded-t-md transition-all duration-500"></div>
                      </div>

                      {/* Metric Numbers Grid */}
                      <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-5">
                        <div>
                          <div className="text-xs text-slate-400 mb-1 font-mono">Latency</div>
                          <div className="text-xl font-mono font-bold text-slate-900">12ms</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-400 mb-1 font-mono">Throughput</div>
                          <div className="text-xl font-mono font-bold text-blue-600">
                            {(4.2 + (simulatedPulse * 0.01)).toFixed(1)}k/s
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-400 mb-1 font-mono">Success Rate</div>
                          <div className="text-xl font-mono font-bold text-emerald-500">99.9%</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {terminalTab === "logs" && (
                    <div className="p-4 rounded-xl bg-slate-950 text-slate-300 font-mono text-xs space-y-2 min-h-[160px]">
                      <p className="text-slate-500">[07:01:52] INIT_INGRESS Envoy Proxy ... [OK]</p>
                      <p className="text-emerald-400">[07:01:53] SUCCESS: Kafka Broker Cluster synced (10 topics)</p>
                      <p className="text-blue-400">[07:01:54] AI_STREAM: Gemini 2.5 API latency test - 114ms</p>
                      <p className="text-slate-400">[07:01:55] SECURITY: Zero-Trust mTLS token verified for node-3</p>
                      <p className="text-indigo-400">[07:01:56] FINOPS: Auto-throttled idle DB replicas (-$420/mo)</p>
                    </div>
                  )}

                  {terminalTab === "ai" && (
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 space-y-3">
                      <div className="flex items-center gap-2 text-blue-700 font-bold text-xs">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span>AI Code & Security Diagnostics</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Test our Gemini 2.5 powered code reviewer live in the AI Audit sandbox.
                      </p>
                      <button
                        onClick={onScrollToAudit}
                        className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
                      >
                        Launch Interactive AI Audit
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <button
                    onClick={onScrollToSandbox}
                    className="text-blue-600 font-bold hover:underline flex items-center gap-1"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Open Cloud Simulator
                  </button>
                  <span className="font-mono text-slate-400 text-[10px] uppercase tracking-wider">
                    SECURE NODE: 192.168.1.1
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Feature Grid Bar */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 bg-white border border-slate-200 rounded-2xl shadow-lg divide-y md:divide-y-0 md:divide-x divide-slate-100 overflow-hidden">
          <div className="p-6 sm:p-8 flex items-start gap-4 hover:bg-slate-50/80 transition-colors">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Hardened Security</h3>
              <p className="text-xs text-slate-500 mt-1 uppercase tracking-tight font-medium">End-to-End Encryption & Audit</p>
            </div>
          </div>

          <div className="p-6 sm:p-8 flex items-start gap-4 hover:bg-slate-50/80 transition-colors">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Zero-Latency Mesh</h3>
              <p className="text-xs text-slate-500 mt-1 uppercase tracking-tight font-medium">Edge Optimized Microservices</p>
            </div>
          </div>

          <div className="p-6 sm:p-8 flex items-start gap-4 hover:bg-slate-50/80 transition-colors">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Multi-Cloud Fabric</h3>
              <p className="text-xs text-slate-500 mt-1 uppercase tracking-tight font-medium">AWS / GCP / Azure High Availability</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
