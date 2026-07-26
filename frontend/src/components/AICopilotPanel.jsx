import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  ShieldCheck, 
  AlertTriangle, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Compass, 
  Radio,
  Cpu
} from 'lucide-react';
import { api } from '../services/api';

export default function AICopilotPanel({ recommendations = [], selectedDistrict = "All" }) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [copilotResponse, setCopilotResponse] = useState(null);

  const presetQueries = [
    { label: '⚡ Predict Next Hotspot', query: 'Predict the highest risk hotspot zone for the next 6 hours' },
    { label: '🚔 Optimize Patrol Routes', query: 'Optimize patrol unit routes for South District high-crime sectors' },
    { label: '🛡️ SCADA Cyber Threat', query: 'Analyze the cyber malware intrusion on Substation 9 power grid' },
    { label: '💥 Gang Retaliation Risk', query: 'Evaluate retaliatory risk following the 14th street firearms discharge' }
  ];

  const handleSendQuery = async (queryText) => {
    const q = queryText || prompt;
    if (!q.trim()) return;
    setLoading(true);
    try {
      const res = await api.queryCopilot(q, selectedDistrict);
      setCopilotResponse(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20">
            <Bot className="w-7 h-7 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-slate-100">CRIMEVISION AI COPILOT</h2>
              <span className="text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/40">
                MODEL: PHOENIX-v4
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Autonomous neural intelligence assistant for tactical dispatch, pattern recognition & threat mitigation.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs text-emerald-400 bg-emerald-950/70 px-3 py-1.5 rounded-xl border border-emerald-500/30">
          <Radio className="w-4 h-4 animate-pulse" />
          <span>NEURAL ENGINE READY</span>
        </div>
      </div>

      {/* Query Bar */}
      <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-3">
        <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
          Natural Language Tactical Assistant Prompt
        </label>
        
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Sparkles className="absolute left-3.5 top-3 h-4 w-4 text-cyan-400" />
            <input
              type="text"
              placeholder="Ask AI Copilot (e.g. 'Where should we deploy patrol units tonight to minimize robberies?')..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
              className="w-full bg-slate-900 text-xs text-slate-100 placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50"
            />
          </div>

          <button
            onClick={() => handleSendQuery()}
            disabled={loading}
            className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-lg shadow-cyan-500/20 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <span className="font-mono animate-pulse">PROCESSING...</span>
            ) : (
              <>
                <span>ANALYZE</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] text-slate-500 font-mono">Quick Actions:</span>
          {presetQueries.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPrompt(item.query);
                handleSendQuery(item.query);
              }}
              className="text-xs bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 hover:border-cyan-500/40 px-2.5 py-1 rounded-lg transition font-mono cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* AI Copilot Response Card */}
      {copilotResponse && (
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/40 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-slate-100 font-mono">AI INTELLIGENCE REPORT</h3>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono text-slate-400">Risk Assessment:</span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-500/30">
                {copilotResponse.predictive_risk_score}% CRITICAL
              </span>
            </div>
          </div>

          <p className="text-xs text-cyan-200 leading-relaxed bg-cyan-950/40 p-3 rounded-xl border border-cyan-500/20">
            {copilotResponse.ai_analysis}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Key Findings */}
            <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Key Intelligence Findings</span>
              </h4>
              <ul className="space-y-1.5">
                {copilotResponse.key_findings.map((item, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start space-x-2">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tactical Actions */}
            <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Recommended Tactical Actions</span>
              </h4>
              <ul className="space-y-1.5">
                {copilotResponse.suggested_actions.map((action, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start space-x-2">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommended Units to Dispatch */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800 text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-slate-400 font-mono text-[11px]">Recommended Units:</span>
              {copilotResponse.recommended_units.map((unit, idx) => (
                <span key={idx} className="bg-slate-800 text-cyan-300 px-2.5 py-0.5 rounded-md font-mono border border-slate-700 text-[11px]">
                  {unit}
                </span>
              ))}
            </div>

            <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-3.5 py-1.5 rounded-lg transition shadow-md shadow-cyan-500/20 cursor-pointer">
              Deploy Tactical Directive
            </button>
          </div>
        </div>
      )}

      {/* AI Recommendations List Feed */}
      <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-200 flex items-center space-x-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>AI COPILOT TACTICAL RECOMMENDATION CARDS</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">{recommendations.length} Active Directives</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                  {rec.category}
                </span>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    rec.priority === 'CRITICAL'
                      ? 'bg-rose-950 text-rose-400 border border-rose-500/30'
                      : 'bg-amber-950 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {rec.priority} PRIORITY
                </span>
              </div>

              <h4 className="text-xs font-bold text-slate-100">{rec.title}</h4>
              <p className="text-xs text-slate-400">{rec.action_plan}</p>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-emerald-400 font-mono">Impact: {rec.impact_assessment}</span>
                <button className="text-cyan-400 hover:underline flex items-center space-x-1 font-mono text-[10px] cursor-pointer">
                  <span>Execute</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
