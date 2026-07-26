import React, { useState } from 'react';
import { Calendar, Users, ShieldAlert, CheckCircle, Radio, Camera, Cpu, AlertTriangle } from 'lucide-react';

export default function FestivalEventPredictor({ events = [] }) {
  const [authorizedEvents, setAuthorizedEvents] = useState({});

  const handleAuthorize = (eventId) => {
    setAuthorizedEvents((prev) => ({ ...prev, [eventId]: true }));
  };

  return (
    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-2xl space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-amber-950 text-amber-400 border border-amber-500/30">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-100 flex items-center space-x-2">
              <span>FESTIVAL & MASS EVENT RISK PREDICTOR</span>
              <span className="text-[10px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded">
                KSP CROWD RISK AI
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Predictive risk scoring for religious festivals, IPL matches, political rallies & high-footfall gatherings across Karnataka.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs text-amber-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
          <Users className="w-4 h-4 text-amber-400" />
          <span>Tracked Crowd Events: {events.length}</span>
        </div>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {events.map((evt) => {
          const isAuthorized = authorizedEvents[evt.id];
          const rec = evt.recommended_deployment || {};

          return (
            <div
              key={evt.id}
              className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3 flex flex-col justify-between hover:border-slate-700 transition"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold bg-slate-950 text-amber-400 px-2 py-0.5 rounded border border-slate-800">
                    {evt.event_date}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      evt.threat_level === 'CRITICAL'
                        ? 'bg-rose-950 text-rose-400 border border-rose-500/40'
                        : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    RISK SCORE: {evt.risk_score}
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-100">{evt.event_name}</h4>
                <p className="text-xs text-slate-400 font-mono">{evt.location}</p>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">EXPECTED FOOTFALL:</span>
                  <span className="font-extrabold text-cyan-400">{evt.expected_crowd}</span>
                </div>

                {/* Risk Factors */}
                <div className="space-y-1 pt-1">
                  <label className="text-[11px] font-mono font-bold text-slate-400 uppercase">
                    AI Flagged Vulnerabilities
                  </label>
                  <ul className="space-y-1 text-xs text-slate-300 font-sans">
                    {evt.risk_factors.map((rf, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="text-[11px] text-slate-300">{rf}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Deployment Breakdown */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                  <label className="text-[10px] font-mono font-bold text-cyan-400 uppercase block">
                    RECOMMENDED DEPLOYMENT MATRIX
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div className="bg-slate-900 p-1.5 rounded border border-slate-800 text-slate-300">
                      Officers: <strong className="text-cyan-300">{rec.officers || 0}</strong>
                    </div>
                    <div className="bg-slate-900 p-1.5 rounded border border-slate-800 text-slate-300">
                      Hoysalas: <strong className="text-cyan-300">{rec.hoysala_vehicles || 0}</strong>
                    </div>
                    <div className="bg-slate-900 p-1.5 rounded border border-slate-800 text-slate-300">
                      Pink Hoysala: <strong className="text-rose-300">{rec.pink_hoysalas || 0}</strong>
                    </div>
                    <div className="bg-slate-900 p-1.5 rounded border border-slate-800 text-slate-300">
                      Drones: <strong className="text-amber-300">{rec.drone_squads || 0}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleAuthorize(evt.id)}
                disabled={isAuthorized}
                className={`w-full mt-2 font-bold text-xs py-2 rounded-xl transition cursor-pointer flex items-center justify-center space-x-1.5 ${
                  isAuthorized
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 cursor-default'
                    : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 shadow-md shadow-amber-500/20 active:scale-95'
                }`}
              >
                {isAuthorized ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>DEPLOYMENT PLAN AUTHORIZED</span>
                  </>
                ) : (
                  <span>AUTHORIZE DEPLOYMENT PLAN</span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
