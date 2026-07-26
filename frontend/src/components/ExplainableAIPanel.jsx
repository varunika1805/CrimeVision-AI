import React from 'react';
import { HelpCircle, Layers, Cpu, ShieldCheck, Activity, BarChart2, Zap } from 'lucide-react';

export default function ExplainableAIPanel({ factorsData = null }) {
  const data = factorsData || {
    engine_version: "KSP Neural Phoenix-v4.2 (Explainable AI)",
    overall_confidence: "94.8%",
    contributing_factors: [
      { factor: "Recent Incident Recency & Density (7-Day Surge)", weight: 38, color: "from-rose-500 to-red-600" },
      { factor: "Temporal Risk Window (21:00 - 02:00 IST Shift)", weight: 27, color: "from-amber-500 to-orange-600" },
      { factor: "Crowd & Festival Event Proximity", weight: 20, color: "from-cyan-500 to-blue-600" },
      { factor: "Infrastructure Blindspots (Low CCTV / Streetlight Failure)", weight: 15, color: "from-purple-500 to-indigo-600" }
    ],
    historical_baseline_comparison: "Crime likelihood in Commercial Street & MG Road is +24% higher than last year's July baseline due to weekend shopping surge.",
    model_justification: "Model identified 3 clusters of snatching incidents within 400m radius over the past 48 hours combined with 35% street lighting deficiency."
  };

  return (
    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-2xl space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-purple-950 text-purple-400 border border-purple-500/30">
            <HelpCircle className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-100 flex items-center space-x-2">
              <span>EXPLAINABLE AI RISK REASONING PANEL</span>
              <span className="text-[10px] font-mono font-bold bg-purple-950 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded">
                XAI TRANSPARENCY
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Clear model explanations detailing why specific sectors were categorized as high risk for transparent officer decision support.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
          <Cpu className="w-4 h-4 text-purple-400" />
          <span>{data.engine_version}</span>
        </div>
      </div>

      {/* Model Confidence & Baseline Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">MODEL CONFIDENCE SCORE</span>
          <p className="text-xl font-extrabold text-cyan-400 font-mono">{data.overall_confidence}</p>
          <p className="text-[11px] text-slate-400">Calibrated over 120,000 Karnataka police case files.</p>
        </div>

        <div className="md:col-span-2 bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">HISTORICAL BASELINE COMPARISON</span>
          <p className="text-xs text-slate-200 font-sans leading-relaxed">
            {data.historical_baseline_comparison}
          </p>
        </div>
      </div>

      {/* Contributing Factors Breakdown (Feature Importance Weights) */}
      <div className="space-y-3">
        <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
          AI Risk Score Weight Factor Attribution
        </label>
        <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          {data.contributing_factors.map((cf, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300">{cf.factor}</span>
                <span className="font-bold text-purple-300">{cf.weight}% Impact Weight</span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`bg-gradient-to-r ${cf.color} h-full rounded-full transition-all duration-500`}
                  style={{ width: `${cf.weight * 2.2}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Model Rationale Justification */}
      <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
        <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase flex items-center space-x-1.5">
          <Zap className="w-3.5 h-3.5" />
          <span>NEURAL MODEL SYNTHESIS JUSTIFICATION</span>
        </span>
        <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-950 p-3 rounded-xl border border-slate-800">
          {data.model_justification}
        </p>
      </div>
    </div>
  );
}
