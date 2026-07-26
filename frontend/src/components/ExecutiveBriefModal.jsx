import React, { useState } from 'react';
import { Shield, X, Download, Copy, Printer, Check, FileText, AlertTriangle } from 'lucide-react';

export default function ExecutiveBriefModal({ isOpen, onClose, briefData = null }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const brief = briefData || {
    generated_at: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' IST',
    dgp_summary: "Karnataka State Police Operational Briefing for Senior Command: Overall threat level is MAINTAINED at KSP DEFCON 3 (ELEVATED). Predictive neural models flag Commercial Street & Majestic Bus Stand as critical priority sectors for night-shift deployment.",
    kpi_snapshot: {
      total_crimes: 1428,
      crimes_change: "-4.2%",
      active_cases: 87,
      hotspots: 14,
      active_hoysalas: 142,
      women_safety_index: 76.4
    },
    critical_hotspots: [
      { name: "Commercial Street & MG Road Junction", risk: "CRITICAL (0.95)", assigned_units: "Hoysala 14, 09, Pink Hoysala 04" },
      { name: "Majestic Bus Stand Annex", risk: "CRITICAL (0.92)", assigned_units: "Hoysala 08, Garuda Squad" }
    ],
    event_warnings: [
      { event: "Mysuru Dasara Grand Procession", threat: "CRITICAL (94.5)", date: "2026-10-12", rec_officers: 120 },
      { event: "IPL Match at Chinnaswamy Stadium", threat: "HIGH (86.2)", date: "2026-08-04", rec_officers: 55 }
    ],
    women_safety_index_avg: 76.4,
    key_directives: [
      "Mandate Pink Hoysala patrols at Peenya Sector 3 dark corridor between 21:00 - 02:00 IST.",
      "Maintain ANPR camera surveillance across Hebbal Flyover and Outer Ring Road intersections.",
      "Issue high alert advisory to CEN Cyber Crime units regarding ransomware probes against IT sector infrastructure."
    ]
  };

  const handleCopy = () => {
    const text = `KARNATAKA STATE POLICE EXECUTIVE BRIEFING\nGenerated At: ${brief.generated_at}\n\nSUMMARY:\n${brief.dgp_summary}\n\nKEY DIRECTIVES:\n${brief.key_directives.join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[1100] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full p-6 shadow-2xl space-y-5 font-sans text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-cyan-950 text-cyan-400 border border-cyan-500/30">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-mono font-extrabold text-cyan-400">
                KARNATAKA STATE POLICE HEADQUARTERS
              </span>
              <h2 className="text-xl font-extrabold text-slate-100">EXECUTIVE INTELLIGENCE BRIEF</h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer text-xs font-mono flex items-center space-x-1"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer text-xs font-mono flex items-center space-x-1"
            >
              <Printer className="w-4 h-4" />
              <span>Print Brief</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Timestamp & High-Sec Badge */}
        <div className="flex items-center justify-between text-xs font-mono bg-slate-950 p-3 rounded-xl border border-slate-800">
          <span className="text-slate-400">Generated: <strong className="text-cyan-300">{brief.generated_at}</strong></span>
          <span className="text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
            CONFIDENTIAL - FOR DGP / CP REVIEW ONLY
          </span>
        </div>

        {/* Executive Summary Statement */}
        <div className="space-y-1">
          <label className="text-xs font-mono font-bold text-slate-400 uppercase">Executive Summary</label>
          <p className="text-xs text-slate-200 bg-slate-950 p-4 rounded-xl border border-slate-800 leading-relaxed font-sans">
            {brief.dgp_summary}
          </p>
        </div>

        {/* KPI Snapshot Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-500 block text-[10px]">TOTAL RECORDED CRIMES</span>
            <span className="font-extrabold text-slate-100 text-base">{brief.kpi_snapshot?.total_crimes}</span>
            <span className="text-[10px] text-emerald-400 block">{brief.kpi_snapshot?.crimes_change} from last month</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-500 block text-[10px]">ACTIVE INVESTIGATIONS</span>
            <span className="font-extrabold text-amber-400 text-base">{brief.kpi_snapshot?.active_cases}</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-500 block text-[10px]">WOMEN SAFETY INDEX</span>
            <span className="font-extrabold text-rose-400 text-base">{brief.women_safety_index_avg}/100</span>
          </div>
        </div>

        {/* Critical Hotspots & Upcoming Mass Events */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="font-mono font-bold text-rose-400 text-[11px] block uppercase">CRITICAL PRIORITY HOTSPOTS</span>
            <ul className="space-y-2 font-mono">
              {brief.critical_hotspots?.map((hs, i) => (
                <li key={i} className="bg-slate-900 p-2 rounded border border-slate-800">
                  <div className="font-bold text-slate-100">{hs.name}</div>
                  <div className="text-[10px] text-rose-300">{hs.risk} • Units: {hs.assigned_units}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="font-mono font-bold text-amber-400 text-[11px] block uppercase">UPCOMING MASS EVENT RISKS</span>
            <ul className="space-y-2 font-mono">
              {brief.event_warnings?.map((ev, i) => (
                <li key={i} className="bg-slate-900 p-2 rounded border border-slate-800">
                  <div className="font-bold text-slate-100">{ev.event} ({ev.date})</div>
                  <div className="text-[10px] text-amber-300">Risk: {ev.threat} • Rec. Officers: {ev.rec_officers}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Strategic Directives */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-cyan-400 uppercase block">STRATEGIC COMMAND DIRECTIVES</label>
          <ul className="space-y-1.5 font-sans text-xs">
            {brief.key_directives?.map((dir, i) => (
              <li key={i} className="flex items-start space-x-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-slate-200">
                <span className="font-mono font-bold text-cyan-400">#{i + 1}</span>
                <span>{dir}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[10px] font-mono text-slate-500">Karnataka State Police Decision Support Engine v2.4</span>
          <button
            onClick={onClose}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-5 py-2 rounded-xl transition cursor-pointer"
          >
            Close Brief
          </button>
        </div>
      </div>
    </div>
  );
}
