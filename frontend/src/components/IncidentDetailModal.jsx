import React from 'react';
import { X, ShieldAlert, MapPin, Clock, UserCheck, AlertTriangle, Radio, CheckCircle, Shield, PhoneCall } from 'lucide-react';

export default function IncidentDetailModal({ incident, onClose, onUpdateStatus }) {
  if (!incident) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 font-sans text-slate-100">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
              {incident.id}
            </span>
            <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
              incident.severity === 'Critical' ? 'bg-rose-950 text-rose-400' : 'bg-amber-950 text-amber-400'
            }`}>
              {incident.severity.toUpperCase()}
            </span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-100">{incident.title}</h3>
          <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono mt-1">
            <span className="flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{incident.location}</span>
            </span>
            <span>•</span>
            <span className="text-cyan-300">{incident.district}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono">
          <div>
            <span className="text-slate-500 block text-[10px]">AI RISK SCORE</span>
            <span className="font-extrabold text-cyan-400 text-base">{incident.risk_score}/100</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">ASSIGNED UNIT</span>
            <span className="font-bold text-slate-200">{incident.assigned_unit}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">CURRENT STATUS</span>
            <span className="font-bold text-emerald-400">{incident.status}</span>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono font-bold text-slate-400 uppercase">Tactical Situation Briefing</label>
          <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed">
            {incident.description || "Active police operation underway. Tactical response unit dispatched to secure site perimeter."}
          </p>
        </div>

        <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-2 text-xs">
          <label className="font-mono text-slate-400 text-[11px] block">QUICK DISPATCH STATUS OVERRIDE</label>
          <div className="flex flex-wrap items-center gap-2 font-mono">
            {['Active', 'Investigating', 'Dispatched', 'Resolved'].map((st) => (
              <button
                key={st}
                onClick={() => onUpdateStatus && onUpdateStatus(incident.id, st)}
                className={`px-3 py-1 rounded-lg text-xs transition cursor-pointer ${
                  incident.status === st
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-xs">
          <div className="flex items-center space-x-1 text-slate-500 font-mono text-[11px]">
            <Clock className="w-3.5 h-3.5" />
            <span>Logged: {incident.time_elapsed}</span>
          </div>

          <button
            onClick={onClose}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-1.5 rounded-xl transition cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
