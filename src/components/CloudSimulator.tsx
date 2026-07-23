import React, { useState } from "react";
import { INITIAL_CLOUD_NODES } from "../data/mockData";
import { CloudNode } from "../types";
import {
  Play,
  RotateCcw,
  Zap,
  ShieldAlert,
  Plus,
  Trash2,
  Server,
  Database,
  Cpu,
  Cloud,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Layers,
  ArrowRight,
} from "lucide-react";

export const CloudSimulator: React.FC = () => {
  const [nodes, setNodes] = useState<CloudNode[]>(INITIAL_CLOUD_NODES);
  const [trafficLoad, setTrafficLoad] = useState<"light" | "medium" | "heavy" | "burst">("medium");
  const [selectedNode, setSelectedNode] = useState<CloudNode | null>(INITIAL_CLOUD_NODES[2]);
  const [chaosLog, setChaosLog] = useState<string[]>([
    "dibiTECH Sandbox Initialized. Topology: 7 Multi-AZ Cloud Nodes.",
    "Health status: ALL_ONLINE.",
  ]);

  const trafficMultipliers = {
    light: 0.5,
    medium: 1.0,
    heavy: 2.2,
    burst: 4.5,
  };

  const activeMultiplier = trafficMultipliers[trafficLoad];

  // Calculate global cluster metrics
  const totalRps = Math.round(
    nodes.reduce((acc, n) => acc + (n.status === "online" ? n.requestsPerSec : 0), 0) * activeMultiplier
  );
  const avgLatency = Math.round(
    nodes.reduce((acc, n) => acc + (n.status === "online" ? n.latencyMs : 150), 0) / nodes.length
  );
  const clusterHealthScore = Math.round(
    (nodes.filter((n) => n.status === "online").length / nodes.length) * 100
  );
  const estimatedCost = Math.round(nodes.length * 280 + activeMultiplier * 450);

  // Trigger Chaos Engineering Simulation
  const handleChaosTest = () => {
    const targetNodeIndex = Math.floor(Math.random() * nodes.length);
    const target = nodes[targetNodeIndex];

    const updated = nodes.map((n, idx) =>
      idx === targetNodeIndex ? { ...n, status: "degraded" as const, cpuUsage: 98, latencyMs: n.latencyMs * 3 } : n
    );
    setNodes(updated);

    const logMsg = `CHAOS EVENT: Node [${target.name}] simulated fault! dibiTECH auto-healing protocol triggered.`;
    setChaosLog((prev) => [logMsg, ...prev]);

    // Auto-healing after 3.5 seconds
    setTimeout(() => {
      setNodes((currentNodes) =>
        currentNodes.map((n) =>
          n.id === target.id ? { ...n, status: "online" as const, cpuUsage: Math.floor(30 + Math.random() * 30) } : n
        )
      );
      setChaosLog((prev) => [`AUTO-HEALED: Node [${target.name}] recovered by k8s cluster manager.`, ...prev]);
    }, 3500);
  };

  // Add a new replica node
  const handleAddNode = () => {
    const newNode: CloudNode = {
      id: `app-replica-${nodes.length + 1}`,
      name: `Auto-Scaled Worker Pod ${nodes.length + 1}`,
      type: "app",
      status: "online",
      cpuUsage: 32,
      memoryUsage: 45,
      latencyMs: 18,
      requestsPerSec: 1800,
      connections: ["db-1", "cache-1"],
    };
    setNodes([...nodes, newNode]);
    setSelectedNode(newNode);
    setChaosLog((prev) => [`SCALE EVENT: Deployed ${newNode.name} to balance cluster load.`, ...prev]);
  };

  // Reset topology
  const handleReset = () => {
    setNodes(INITIAL_CLOUD_NODES);
    setSelectedNode(INITIAL_CLOUD_NODES[0]);
    setTrafficLoad("medium");
    setChaosLog(["Cluster restored to baseline dibiTECH architecture."]);
  };

  const getNodeIcon = (type: CloudNode["type"]) => {
    switch (type) {
      case "dns":
      case "lb":
        return <Cloud className="w-5 h-5 text-blue-600" />;
      case "app":
        return <Server className="w-5 h-5 text-indigo-600" />;
      case "db":
        return <Database className="w-5 h-5 text-amber-600" />;
      case "cache":
        return <Layers className="w-5 h-5 text-emerald-600" />;
      case "ai":
        return <Cpu className="w-5 h-5 text-blue-600" />;
      default:
        return <Server className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <section id="sandbox" className="py-24 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              dibiTECH Infrastructure Sandbox
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Interactive Cloud Architecture Simulator
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              Test cluster traffic loads, trigger chaos failovers, and observe dibiTECH’s self-healing auto-scaling protocols in real time.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <button
              onClick={handleChaosTest}
              className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
            >
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              Inject Chaos Fault
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>

        {/* Global Cluster Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 font-mono shadow-sm">
            <span className="text-xs text-slate-500 uppercase font-bold">Traffic Ingress Rate</span>
            <div className="text-2xl font-black text-blue-600 mt-1">{totalRps.toLocaleString()} rps</div>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 font-mono shadow-sm">
            <span className="text-xs text-slate-500 uppercase font-bold">Avg Cluster Latency</span>
            <div className="text-2xl font-black text-indigo-600 mt-1">{avgLatency} ms</div>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 font-mono shadow-sm">
            <span className="text-xs text-slate-500 uppercase font-bold">Health Rating</span>
            <div className="text-2xl font-black text-emerald-600 mt-1">{clusterHealthScore}%</div>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 font-mono shadow-sm">
            <span className="text-xs text-slate-500 uppercase font-bold">Est. Monthly Cloud Spend</span>
            <div className="text-2xl font-black text-slate-900 mt-1">${estimatedCost.toLocaleString()}</div>
          </div>
        </div>

        {/* Simulation Toolbar */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-600 uppercase font-bold">Simulated Traffic Load:</span>
            <div className="flex items-center gap-1.5">
              {(["light", "medium", "heavy", "burst"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setTrafficLoad(mode)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono capitalize transition-all ${
                    trafficLoad === mode
                      ? "bg-blue-600 text-white font-bold shadow-sm"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {mode} {mode === "burst" && "🔥"}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddNode}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-200 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Auto-Scale +1 App Pod
          </button>
        </div>

        {/* Main Grid: Interactive Topology Canvas & Inspector Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Node Cards Canvas */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {nodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              const isDegraded = node.status === "degraded";

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                    isDegraded
                      ? "bg-rose-50 border-rose-300 shadow-md shadow-rose-100"
                      : isSelected
                      ? "bg-white border-blue-600 shadow-lg ring-2 ring-blue-600/20"
                      : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-sm">
                        {getNodeIcon(node.type)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{node.name}</h4>
                        <span className="text-[10px] font-mono text-slate-500 uppercase">{node.type} node</span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full ${
                        isDegraded
                          ? "bg-rose-100 text-rose-700 animate-pulse border border-rose-200"
                          : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      }`}
                    >
                      ● {node.status}
                    </span>
                  </div>

                  {/* Resource Gauges */}
                  <div className="space-y-2 pt-2 text-xs font-mono">
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                        <span>CPU Utilization</span>
                        <span className={node.cpuUsage > 80 ? "text-rose-600 font-bold" : "text-blue-600 font-bold"}>
                          {Math.round(node.cpuUsage * activeMultiplier)}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            node.cpuUsage * activeMultiplier > 80 ? "bg-rose-500" : "bg-blue-600"
                          }`}
                          style={{ width: `${Math.min(100, node.cpuUsage * activeMultiplier)}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between text-[11px] text-slate-600 pt-1">
                      <span>Latency: <span className="text-slate-900 font-bold">{node.latencyMs}ms</span></span>
                      <span>Rate: <span className="text-slate-900 font-bold">{Math.round(node.requestsPerSec * activeMultiplier)} rps</span></span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Inspector & Chaos Audit Console */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Inspector Details */}
            {selectedNode && (
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-lg space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-mono text-blue-600 font-bold uppercase tracking-wider">Node Inspector</span>
                  <span className="text-xs font-mono text-slate-400">{selectedNode.id}</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">{selectedNode.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    dibiTECH managed infrastructure instance with active health probe monitoring.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase">Connections</span>
                    <p className="text-slate-900 font-bold mt-0.5">{selectedNode.connections.length} targets</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase">Memory Usage</span>
                    <p className="text-slate-900 font-bold mt-0.5">{selectedNode.memoryUsage}%</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-xs space-y-1.5">
                  <span className="font-mono text-blue-700 font-bold">Recommended dibiTECH Optimization:</span>
                  <p className="text-slate-700 text-[11px] leading-relaxed">
                    Attach distributed Redis cache layer to drop database load spikes during {trafficLoad} traffic bursts.
                  </p>
                </div>
              </div>
            )}

            {/* Live Failover & Event Stream Log */}
            <div className="p-5 rounded-2xl bg-slate-900 text-slate-300 border border-slate-800 font-mono text-xs h-[220px] flex flex-col justify-between shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  Cluster Event Log
                </span>
                <span className="text-[10px] text-slate-500">Auto-refresh</span>
              </div>

              <div className="overflow-y-auto space-y-1.5 my-2 pr-1 text-[11px]">
                {chaosLog.map((log, idx) => (
                  <p
                    key={idx}
                    className={
                      log.includes("CHAOS")
                        ? "text-rose-400 font-bold"
                        : log.includes("AUTO-HEALED") || log.includes("SCALE")
                        ? "text-emerald-400 font-semibold"
                        : "text-slate-400"
                    }
                  >
                    ● {log}
                  </p>
                ))}
              </div>

              <div className="text-[10px] text-slate-500 border-t border-slate-800 pt-2 flex justify-between">
                <span>Self-Healing Protocol: ENABLED</span>
                <span>k8s v1.31</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
