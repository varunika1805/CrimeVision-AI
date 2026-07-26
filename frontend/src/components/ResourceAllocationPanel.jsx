import React, { useState } from 'react';
import { Cpu, Users, Car, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function ResourceAllocationPanel({ hotspots = [] }) {
  const [allocatedHotspots, setAllocatedHotspots] = useState({});

  const handleApproveAllocation = (id) => {
    setAllocatedHotspots((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-2xl space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/30">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-100 flex items-center space-x-2">
              <span>AI RESOURCE ALLOCATION RECOMMENDATIONS</span>
              <span className="text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded">
                KSP DISPATCH MATRIX
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Automated precinct officer and patrol vehicle allocation computed per crime hotspot with explainable rationale.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs text-cyan-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Hotspots Analyzed: {hotspots.length}</span>
        </div>
      </div>

      {/* Hotspots Allocation Table / Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {hotspots.map((hs) => {
          const isApproved = allocatedHotspots[hs.id];

          return (
            <div
              key={hs.id}
              className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between hover:border-slate-700 transition"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                      {hs.id}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{hs.district}</span>
                  </div>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      hs.risk_level === 'CRITICAL'
                        ? 'bg-rose-950 text-rose-400 border border-rose-500/40'
                        : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {hs.risk_level} THREAT
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-100">{hs.name}</h4>
                <p className="text-xs text-slate-400 font-mono">
                  Primary Risk Threat: <strong className="text-rose-300">{hs.primary_threat}</strong>
                </p>

                {/* Resource Allocation Breakdown */}
                <div className="grid grid-cols-2 gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-cyan-400" />
                    <div>
                      <span className="text-slate-500 text-[10px] block">RECOMMENDED OFFICERS</span>
                      <span className="font-extrabold text-cyan-300 text-sm">{hs.recommended_officers} Officers</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Car className="w-5 h-5 text-amber-400" />
                    <div>
                      <span className="text-slate-500 text-[10px] block">PATROL VEHICLES</span>
                      <span className="font-bold text-amber-300 text-xs">{hs.recommended_vehicles}</span>
                    </div>
                  </div>
                </div>

                {/* Explainable Rationale */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                    AI ALLOCATION RATIONALE & EXPLANATION
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {hs.allocation_reasoning}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleApproveAllocation(hs.id)}
                disabled={isApproved}
                className={`w-full mt-3 font-bold text-xs py-2 rounded-xl transition cursor-pointer flex items-center justify-center space-x-1.5 ${
                  isApproved
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 cursor-default'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20 active:scale-95'
                }`}
              >
                {isApproved ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>RESOURCE ALLOCATION DEPLOYED</span>
                  </>
                ) : (
                  <span>CONFIRM & DEPLOY RESOURCE ALLOCATION</span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
