import React, { useState } from 'react';
import { HeartHandshake, ShieldCheck, AlertCircle, PhoneCall, Radio, Sun, Eye, Car } from 'lucide-react';

export default function WomenSafetyIndex({ safetyAreas = [], onDispatchPinkHoysala }) {
  const [dispatchedAreas, setDispatchedAreas] = useState({});

  const handleDispatch = (id) => {
    setDispatchedAreas((prev) => ({ ...prev, [id]: true }));
    if (onDispatchPinkHoysala) onDispatchPinkHoysala(id);
  };

  const avgScore = Math.round(
    safetyAreas.reduce((acc, curr) => acc + curr.safety_score, 0) / (safetyAreas.length || 1)
  );

  return (
    <div className="bg-slate-950 p-5 rounded-2xl border border-rose-500/30 shadow-2xl space-y-5">
      {/* Panel Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-500/20 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-rose-950 text-rose-400 border border-rose-500/40">
            <HeartHandshake className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-100 flex items-center space-x-2">
              <span>WOMEN SAFETY HEAT INDEX</span>
              <span className="text-[10px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded">
                NAMMA 112 TELEMETRY
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Live spatial safety index computed from incident frequency, streetlight illumination, CCTV density & emergency calls.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 bg-rose-950/60 px-4 py-2 rounded-xl border border-rose-500/40 font-mono">
          <div>
            <span className="text-[10px] text-rose-300 block">STATEWIDE AVERAGE SCORE</span>
            <span className="text-lg font-extrabold text-rose-400">{avgScore}/100</span>
          </div>
        </div>
      </div>

      {/* Areas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {safetyAreas.map((area) => {
          const isSafe = area.safety_score >= 75;
          const isModerate = area.safety_score >= 50 && area.safety_score < 75;
          const isHighRisk = area.safety_score < 50;

          const isDispatched = dispatchedAreas[area.id];

          return (
            <div
              key={area.id}
              className={`p-4 rounded-2xl border space-y-3 transition flex flex-col justify-between ${
                isHighRisk
                  ? 'bg-gradient-to-b from-rose-950/40 to-slate-900 border-rose-500/40'
                  : isModerate
                  ? 'bg-gradient-to-b from-amber-950/30 to-slate-900 border-amber-500/30'
                  : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-400">{area.district}</span>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      isHighRisk
                        ? 'bg-rose-950 text-rose-400 border border-rose-500/40 animate-pulse'
                        : isModerate
                        ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                    }`}
                  >
                    {area.risk_status}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-100">{area.area_name}</h4>

                {/* Score Gauge Progress Bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">SAFETY HEAT SCORE</span>
                    <span
                      className={`font-extrabold text-sm ${
                        isHighRisk ? 'text-rose-400' : isModerate ? 'text-amber-400' : 'text-emerald-400'
                      }`}
                    >
                      {area.safety_score}/100
                    </span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isHighRisk
                          ? 'bg-gradient-to-r from-rose-600 to-red-500'
                          : isModerate
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                          : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                      }`}
                      style={{ width: `${area.safety_score}%` }}
                    ></div>
                  </div>
                </div>

                {/* Detailed Telemetry Stats */}
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                  <div>
                    <span className="text-slate-500 block text-[9px]">LIGHTING / CCTV</span>
                    <span className="font-bold text-slate-200">{area.lighting_cctv_pct}%</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[9px]">NAMMA 112 CALLS</span>
                    <span className="font-bold text-rose-400">{area.namma_112_calls_24h} calls/24h</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[9px]">PATROL FREQUENCY</span>
                    <span className="font-bold text-cyan-300">{area.patrol_freq_mins}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[9px]">PINK HOYSALA</span>
                    <span className="font-bold text-rose-300 text-[10px]">{area.pink_hoysala_status}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 italic">
                  Key Concern: <span className="text-slate-300">{area.key_threat}</span>
                </p>
              </div>

              {/* Action Trigger */}
              <button
                onClick={() => handleDispatch(area.id)}
                disabled={isDispatched}
                className={`w-full mt-2 font-bold text-xs py-2 rounded-xl transition cursor-pointer flex items-center justify-center space-x-1.5 ${
                  isDispatched
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 cursor-default'
                    : 'bg-rose-600 hover:bg-rose-500 text-slate-950 shadow-md shadow-rose-600/20 active:scale-95'
                }`}
              >
                <Car className="w-4 h-4" />
                <span>{isDispatched ? 'PINK HOYSALA DISPATCHED' : 'DISPATCH PINK HOYSALA PATROL'}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
