import React, { useState } from 'react';
import { Clock, Shield, CheckCircle2, AlertCircle, UserCheck, Play, Check } from 'lucide-react';

export default function OfficerActionTimeline({ timelineItems = [] }) {
  const [items, setItems] = useState(timelineItems);

  const toggleStatus = (index) => {
    setItems((prev) =>
      prev.map((item, idx) => {
        if (idx !== index) return item;
        const nextStatus =
          item.status === 'PENDING'
            ? 'EXECUTING'
            : item.status === 'EXECUTING'
            ? 'EXECUTED'
            : 'PENDING';
        return { ...item, status: nextStatus };
      })
    );
  };

  const activeItems = items.length > 0 ? items : timelineItems;

  return (
    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-2xl space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/30">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-100 flex items-center space-x-2">
              <span>6-HOUR CONTROL ROOM OFFICER ACTION TIMELINE</span>
              <span className="text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded">
                KSP CONTROL ROOM
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Prioritized tactical action sequence for the upcoming 6-hour control room operational shift.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
          <Shield className="w-4 h-4 text-cyan-400" />
          <span>Next 6h Shift Plan</span>
        </div>
      </div>

      {/* Timeline Items List */}
      <div className="space-y-4 relative before:absolute before:inset-0 before:left-6 before:w-0.5 before:bg-slate-800">
        {activeItems.map((item, idx) => {
          const isCritical = item.priority === 'CRITICAL';
          const isHigh = item.priority === 'HIGH';
          const isExecuted = item.status === 'EXECUTED';
          const isExecuting = item.status === 'EXECUTING';

          return (
            <div key={idx} className="relative flex items-start space-x-4 pl-3">
              {/* Timeline Marker Node */}
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 z-10 font-mono text-[10px] font-bold ${
                  isExecuted
                    ? 'bg-emerald-950 border-emerald-500 text-emerald-400'
                    : isExecuting
                    ? 'bg-cyan-950 border-cyan-400 text-cyan-300 animate-pulse'
                    : 'bg-slate-900 border-slate-700 text-slate-400'
                }`}
              >
                {idx + 1}
              </div>

              {/* Action Card */}
              <div
                className={`flex-1 p-4 rounded-xl border space-y-2 transition ${
                  isExecuting
                    ? 'bg-slate-900 border-cyan-500/50 shadow-lg shadow-cyan-950/40'
                    : isExecuted
                    ? 'bg-slate-950/80 border-emerald-500/30 opacity-80'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-extrabold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                      {item.time}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        isCritical
                          ? 'bg-rose-950 text-rose-400 border border-rose-500/40'
                          : isHigh
                          ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {item.priority}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleStatus(idx)}
                    className={`text-[11px] font-mono font-bold px-3 py-1 rounded-lg transition cursor-pointer flex items-center space-x-1 ${
                      isExecuted
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        : isExecuting
                        ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    {isExecuted ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>DONE</span>
                      </>
                    ) : isExecuting ? (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>EXECUTING...</span>
                      </>
                    ) : (
                      <span>MARK EXECUTING</span>
                    )}
                  </button>
                </div>

                <p className="text-sm font-bold text-slate-100">{item.action}</p>

                <div className="flex flex-wrap items-center justify-between text-xs font-mono pt-1 text-slate-400 border-t border-slate-800/80">
                  <span>Assigned Command: <strong className="text-cyan-300">{item.assigned_to}</strong></span>
                  <span>Impact Target: <strong className="text-emerald-400">{item.impact}</strong></span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
