import React, { useState } from "react";
import { AuditReport } from "../types";
import {
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Code,
  Terminal,
  ArrowRight,
  Loader2,
  Zap,
  RotateCcw,
  Download,
} from "lucide-react";

interface AIAuditSandboxProps {
  onOpenContact: () => void;
}

const PRESET_SAMPLES = [
  {
    name: "Express API & Unsanitized SQL Query",
    type: "Backend Code",
    code: `// Express route with direct query concatenation and missing JWT verification
app.post('/api/user/orders', async (req, res) => {
  const userId = req.body.userId;
  const filter = req.body.filter;
  
  // Vulnerability: Unsanitized SQL query construction
  const query = "SELECT * FROM orders WHERE user_id = " + userId + " AND status = '" + filter + "'";
  const orders = await db.query(query);
  
  res.json({ status: "success", data: orders });
});`,
  },
  {
    name: "Terraform Cloud Multi-AZ Architecture",
    type: "Cloud Infrastructure",
    code: `resource "aws_db_instance" "primary" {
  allocated_storage    = 20
  engine               = "postgres"
  engine_version       = "15.3"
  instance_class       = "db.t3.micro"
  username             = "admin"
  password             = "Password123!" # Hardcoded secret
  publicly_accessible = true # Security Risk
  skip_final_snapshot  = true
}`,
  },
  {
    name: "React Unbounded Fetch Effect",
    type: "Frontend Code",
    code: `export function LiveFeed() {
  const [data, setData] = useState([]);
  
  // Infinite re-render / unbounded fetch polling defect
  useEffect(() => {
    fetch('https://api.example.com/stream')
      .then(res => res.json())
      .then(d => setData(d));
  }); // Missing dependency array!
  
  return <div>{data.length} items</div>;
}`,
  },
];

export const AIAuditSandbox: React.FC<AIAuditSandboxProps> = ({ onOpenContact }) => {
  const [inputCode, setInputCode] = useState(PRESET_SAMPLES[0].code);
  const [focusArea, setFocusArea] = useState<string>("overall");
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<AuditReport | null>(null);
  const [engineSource, setEngineSource] = useState<string>("");

  const handleRunAudit = async () => {
    if (!inputCode.trim()) return;

    setIsLoading(true);
    setReport(null);

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: inputCode,
          contextType: "Code & Architecture Sample",
          focusArea,
        }),
      });

      const data = await response.json();
      if (data.success && data.report) {
        setReport(data.report);
        setEngineSource(data.poweredBy || "dibiTECH AI Engine");
      }
    } catch (err) {
      console.error("Audit request failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-audit" className="py-24 bg-slate-50 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            dibiTECH AI Lab Diagnostic
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            AI Code & Architecture Vulnerability Audit
          </h2>
          <p className="mt-2 text-base text-slate-600 max-w-2xl">
            Paste your source code or cloud infrastructure specs below to run an instant AI-powered diagnostic for security flaws, concurrency bottlenecks, and scalability risks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Code Input & Controls */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            
            {/* Sample Selector Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-slate-500 mr-2 font-bold">Presets:</span>
              {PRESET_SAMPLES.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputCode(preset.code)}
                  className="px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-700 text-xs font-mono border border-slate-200 transition-all shadow-sm"
                >
                  {preset.name}
                </button>
              ))}
            </div>

            {/* Code Textarea Window */}
            <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-lg">
              <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-700">
                  <Code className="w-4 h-4 text-blue-600" />
                  <span>Audit Input Canvas</span>
                </div>
                <button
                  onClick={() => setInputCode("")}
                  className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Clear
                </button>
              </div>

              <textarea
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Paste code snippet, SQL queries, or Terraform/Kubernetes specs here..."
                rows={12}
                className="w-full p-4 bg-slate-900 font-mono text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-y"
              />

              {/* Controls Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-600 font-bold">Focus:</span>
                  <select
                    value={focusArea}
                    onChange={(e) => setFocusArea(e.target.value)}
                    className="bg-white border border-slate-200 text-xs text-slate-800 font-mono rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="overall">Overall Architecture & Quality</option>
                    <option value="security">Security & OWASP Top 10</option>
                    <option value="performance">Performance & Latency</option>
                    <option value="scalability">Multi-Cloud Scalability</option>
                  </select>
                </div>

                <button
                  id="run-ai-audit-btn"
                  onClick={handleRunAudit}
                  disabled={isLoading || !inputCode.trim()}
                  className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-200 disabled:opacity-50 transition-all flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      Analyzing AST & Vulnerabilities...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-white" />
                      Run dibiTECH Audit
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Diagnostic Report Output */}
          <div className="lg:col-span-6">
            {!report && !isLoading && (
              <div className="h-[440px] rounded-2xl bg-white border border-slate-200 border-dashed p-8 flex flex-col items-center justify-center text-center text-slate-500 space-y-4 shadow-sm">
                <div className="p-4 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
                  <Cpu className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Awaiting Source Code</h3>
                  <p className="text-xs text-slate-600 max-w-sm mt-1">
                    Select a sample preset or paste your code snippet on the left and click "Run dibiTECH Audit" to view real-time findings.
                  </p>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="h-[440px] rounded-2xl bg-white border border-slate-200 p-8 flex flex-col items-center justify-center text-center text-slate-600 space-y-4 shadow-md">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">dibiTECH AI Engine at Work</h3>
                  <p className="text-xs text-slate-500 font-mono">
                    Evaluating code syntax, sanitization rules, and cloud concurrency patterns...
                  </p>
                </div>
              </div>
            )}

            {report && !isLoading && (
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xl space-y-6">
                
                {/* Header Score Bar */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-mono font-black text-xl border ${
                        report.healthScore >= 80
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : report.healthScore >= 60
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-rose-50 text-rose-700 border-rose-200"
                      }`}
                    >
                      <span>{report.healthScore}</span>
                      <span className="text-[9px] uppercase tracking-tighter text-slate-500">Score</span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Audit Diagnostic Summary</h3>
                      <span className="text-xs font-mono text-blue-600 font-bold">{engineSource}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end text-xs font-mono">
                    <span className="text-slate-500">Security Rating</span>
                    <span className="text-emerald-600 font-extrabold text-base">{report.securityScore}%</span>
                  </div>
                </div>

                {/* Summary text */}
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200 font-sans">
                  {report.summary}
                </p>

                {/* Critical Issues */}
                {report.criticalIssues && report.criticalIssues.length > 0 && (
                  <div className="space-y-3">
                    <span className="text-xs font-mono text-rose-600 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      Flagged Flaws & Vulnerabilities ({report.criticalIssues.length})
                    </span>

                    <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                      {report.criticalIssues.map((issue, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900">{issue.title}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-100 text-rose-700 border border-rose-200 font-bold">
                              {issue.severity}
                            </span>
                          </div>
                          <p className="text-slate-600 text-[11px]">{issue.description}</p>
                          <p className="text-blue-700 font-mono text-[11px] pt-1 font-semibold">
                            ➜ Fix: {issue.recommendation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* dibiTECH Recommendations */}
                <div className="space-y-2">
                  <span className="text-xs font-mono text-indigo-600 font-bold uppercase tracking-wider">
                    dibiTECH Engineering Action Plan
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {report.dibiTechRecommendations?.map((rec, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-indigo-50 border border-indigo-100 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between text-indigo-900 font-bold">
                          <span>{rec.title}</span>
                          <span className="text-[10px] font-mono text-indigo-600 uppercase">{rec.category}</span>
                        </div>
                        <p className="text-slate-700 text-[11px]">{rec.details}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to action */}
                <div className="pt-2 flex items-center justify-between gap-4 border-t border-slate-100">
                  <span className="text-xs text-slate-600 font-mono font-medium">Need comprehensive codebase refactoring?</span>
                  <button
                    onClick={onOpenContact}
                    className="px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    Schedule Refactoring Call
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
